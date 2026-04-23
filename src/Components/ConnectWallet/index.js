import React, { useContext } from 'react';
import styles from './styles.module.scss';
import { Web3Context } from './../../Context/web3/provider';
import commonErrorMessages from './../../Utils/commonErrorMessages.json';

const ConnectWallet = () => {
  const { isLoadingWeb3, stellar, account,
    connectToWallet, disconnectWallet, validChain, balance } = useContext(Web3Context);

  const invalidChainMsg = process.env.NODE_ENV === 'development'
    ? commonErrorMessages.switchToDevelopmentChain : commonErrorMessages.switchToProductionChain;

  return isLoadingWeb3 ? null : stellar ? validChain ? !account ? (
    <div className={styles.connectWallet} data-testid="connectWallet">
      <div className={styles.wrap}>
        <button className={styles.btn} onClick={() => connectToWallet()}>
          Connect Freighter
        </button>
      </div>
    </div>
  ) : (
    <div className={styles.connectWallet} data-testid="connectWallet">
      <div className={styles.wrap}>
        <button className={[styles.btn, styles.disconnect].join(' ')} onClick={() => disconnectWallet()}>
          LogOut
        </button>
        <div className={styles.address}>
          {account}
        </div>
        <div className={styles.balance}>
          {balance} XLM
        </div>
      </div>
    </div>
  ) : (
    <div className={styles.connectWallet} data-testid="connectWallet">
      <div className={styles.wrap}>
        <div className={styles.invalidChainMsg}>
          {invalidChainMsg}
        </div>
      </div>
    </div>

  ) : (
    <div className={styles.connectWallet} data-testid="connectWallet">
      <div className={styles.wrap}>
        <a className={[styles.btn, styles.link].join(' ')} href="https://www.freighter.app" target="_blank" rel="noopener noreferrer">
          Install Freighter
        </a>
      </div>
    </div>
  );
};

export default ConnectWallet;
