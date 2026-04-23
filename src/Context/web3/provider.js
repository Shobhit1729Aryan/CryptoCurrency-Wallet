import React, { createContext, useReducer, useEffect, useCallback } from 'react';
import { WatchWalletChanges } from '@stellar/freighter-api';
import reducer, { INITIAL_STATE } from './reducer';
import types from './types';
import {
  connectFreighter,
  getNativeBalance,
  getStellar,
  getTransfersForAccount,
  sendStellarPayment,
} from './utils';

export const Web3Context = createContext({
  ...INITIAL_STATE
});

const Web3Provider = props => {
  const [store, dispatch] = useReducer(reducer, INITIAL_STATE);
  const {
    stellar,
    provider,
    chainId,
    validChain,
    account,
    balance,
    isLoadingWeb3,
    transfers,
    isFetching
  } = store;

  const initStellar = async () => {
    dispatch({
      type: types.GET_WEB3,
      payload: await getStellar(),
    });
  };

  const connectToWallet = async () => {
    try {
      const connectedAccount = await connectFreighter();

      dispatch({
        type: types.SET_ACCOUNT,
        payload: connectedAccount
      });

      await initStellar();
    } catch (err) {
      console.log(err);
    }
  };

  const disconnectWallet = () => {
    window && window.location.reload();
  };

  const setIsFetching = useCallback(isFetching => {
    dispatch({
      type: types.SET_IS_FETCHING,
      payload: isFetching
    });
  }, []);

  const getAllTransfers = useCallback(async () => {
    try {
      const _transfers = await getTransfersForAccount(account);
      dispatch({
        type: types.SET_TRANSFERS,
        payload: _transfers
      });

    } catch (err) {
      console.log(err);
      setIsFetching(false);
    }
  }, [account, setIsFetching]);

  const sendPayment = useCallback(async payment => {
    await sendStellarPayment({
      fromAddress: account,
      toAddress: payment.receiver,
      amount: payment.amount,
      message: payment.message,
    });

    await getAllTransfers();
  }, [account, getAllTransfers]);

  useEffect(() => {
    initStellar();

  }, []);

  useEffect(() => {
    if (!stellar) return undefined;

    const reload = () => window && window.location.reload();
    const watcher = new WatchWalletChanges(1000);

    watcher.watch(wallet => {
      const walletAddress = typeof wallet?.address === 'string'
        ? wallet.address
        : wallet?.address?.address;

      if (walletAddress !== account || wallet?.network !== chainId) reload();
    });

    return () => watcher.stop();
  }, [stellar, account, chainId]);

  useEffect(() => {
    const getBalance = async _account => {
      try {
        const _balance = await getNativeBalance(_account);

        dispatch({
          type: types.SET_BALANCE,
          payload: _balance
        });
      } catch (err) {
        console.log(err);
      }
    };

    if (account && validChain) getBalance(account);
  }, [account, validChain]);

  return (
    <Web3Context.Provider value={{
      stellar,
      provider,
      chainId,
      validChain,
      account,
      balance,
      isLoadingWeb3,
      transfers,
      isFetching,
      connectToWallet,
      disconnectWallet,
      getAllTransfers,
      sendPayment,
      setIsFetching,
    }}>
      {props.children}
    </Web3Context.Provider>
  )
}

export default Web3Provider;
