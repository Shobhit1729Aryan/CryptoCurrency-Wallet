import React, { useContext, useEffect } from 'react';
import styles from './styles.module.scss';
import { Web3Context } from './../../Context/web3/provider';
import commonErrorMessages from './../../Utils/commonErrorMessages.json';

const TransferHistory = () => {
  const { account, isFetching, isLoadingWeb3,
    stellar, validChain, getAllTransfers, transfers, setIsFetching } = useContext(Web3Context);

  useEffect(() => {
    if (validChain) {
      if (account) getAllTransfers();
      else setIsFetching(false);
    }

  }, [validChain, account, getAllTransfers, setIsFetching])

  const shouldRender = {
    component: Array.isArray(transfers) && transfers.length > 0,
  };

  const invalidChainMsg = process.env.NODE_ENV === 'development'
    ? commonErrorMessages.switchToDevelopmentChain : commonErrorMessages.switchToProductionChain;

  return shouldRender.component ? (
    <div className={styles.transferHistory} data-testid="transferHistory">

      <h1>
        Latest Transfers
      </h1>

      {transfers.map((transfer, pos) => {
        const fromAddress = transfer?.fromAddress;
        const toAddress = transfer?.toAddress;
        const amount = transfer?.amount;
        const _amount = amount;
        const message = transfer?.message;
        const timestamp = transfer?.timestamp;
        const createdAt = timestamp && new Date(timestamp).toLocaleString();

        return (
          <div key={pos} className={styles.transfer}>
            <div className={styles.details}>

              <div className={styles.detail}>
                <strong>
                  From:
                </strong>
                {fromAddress}
              </div>

              <div className={styles.detail}>
                <strong>
                  To:
                </strong>
                {toAddress}
              </div>

              <div className={styles.detail}>
                {_amount} {transfer?.assetCode || 'XLM'}
              </div>

              {message && (
                <div className={`${styles.detail} ${styles.msg}`}>
                  <strong>
                    Message:
                  </strong>
                  {message}
                </div>
              )}

              <div className={`${styles.detail} ${styles.timestamp}`}>
                {createdAt}
              </div>

            </div>
          </div>
        )
      })}
    </div>
  ) : (isLoadingWeb3 || isFetching) ? null : stellar ? validChain ? account ? (
    <div className={styles.wrongNetwork} data-testid="transferHistory">
      <i className="fa-solid fa-money-bill-transfer"></i>
      <p>
        No transfers yet!
      </p>
    </div>
  ) : (
    <div className={styles.wrongNetwork} data-testid="transferHistory">
      <i className="fa-solid fa-wallet"></i>
      <p>
        Please connect your wallet
      </p>
    </div>
  ) : (
    <div className={styles.wrongNetwork} data-testid="transferHistory">
      <i className="fa-solid fa-hand"></i>
      <p>
        {invalidChainMsg}
      </p>
    </div>
  ) : (
    <div className={styles.wrongNetwork} data-testid="transferHistory">
      <i className="fa-solid fa-triangle-exclamation"></i>
      <p>
        Please install Freighter
      </p>
    </div>
  )
};

export default TransferHistory;
