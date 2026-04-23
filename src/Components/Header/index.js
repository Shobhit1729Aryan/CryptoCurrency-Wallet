import React from 'react';
import ConnectWallet from '../ConnectWallet';
import styles from './styles.module.scss';

const Header = () => {
  return (
    <header className={styles.header} data-testid="header">
      <div className={styles.wrap}>
        <div className={styles.logo}>
          <i className="fa-solid fa-star"></i>
          Stellar Wallet
        </div>
        <ConnectWallet />
      </div>
    </header>
  );
};

export default Header;
