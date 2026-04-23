import * as StellarSdk from '@stellar/stellar-sdk';
import {
  getAddress,
  getNetwork,
  isConnected,
  requestAccess,
  signTransaction,
} from '@stellar/freighter-api';

export const stellarTestnet = {
  name: 'Stellar Testnet',
  network: 'TESTNET',
  networkPassphrase: StellarSdk.Networks.TESTNET,
  horizonUrl: 'https://horizon-testnet.stellar.org',
  currencySymbol: 'XLM',
  blockExplorerUrl: 'https://stellar.expert/explorer/testnet',
};

const getHorizonServer = () => new StellarSdk.Horizon.Server(stellarTestnet.horizonUrl);

const normalizeFreighterValue = value => {
  if (value && typeof value === 'object') {
    if (value.error) throw new Error(value.error.message || value.error);
    return value;
  }

  return value;
};

const extractAddress = value => {
  if (!value) return '';
  if (typeof value === 'string') return value;
  if (typeof value.address === 'string') return value.address;
  if (value.address) return extractAddress(value.address);
  if (typeof value.publicKey === 'string') return value.publicKey;

  return '';
};

const getFreighterAddress = async () => {
  const response = normalizeFreighterValue(await getAddress());
  return extractAddress(response);
};

const getFreighterNetwork = async () => {
  const response = normalizeFreighterValue(await getNetwork());

  return {
    network: response?.network || response,
    networkPassphrase: response?.networkPassphrase,
  };
};

const hasFreighterConnection = async () => {
  try {
    const response = normalizeFreighterValue(await isConnected());
    return Boolean(response?.isConnected ?? response);
  } catch (err) {
    console.log(err);
    return false;
  }
};

export const isValidStellarNetwork = networkDetails => (
  networkDetails?.network === stellarTestnet.network
  || networkDetails?.networkPassphrase === stellarTestnet.networkPassphrase
);

export const getStellar = async () => {
  const hasFreighter = await hasFreighterConnection();
  let account = '';
  let networkDetails = null;

  try {
    if (hasFreighter) {
      networkDetails = await getFreighterNetwork();
      account = await getFreighterAddress();
    }
  } catch (err) {
    console.log(err);
  }

  const validChain = isValidStellarNetwork(networkDetails);

  return {
    stellar: hasFreighter ? { name: 'Freighter' } : null,
    provider: getHorizonServer(),
    chainId: networkDetails?.network || null,
    validChain,
    account,
    isLoadingWeb3: false,
    isFetching: Boolean(account && validChain),
  };
};

export const connectFreighter = async () => {
  const response = normalizeFreighterValue(await requestAccess());
  return extractAddress(response);
};

export const getNativeBalance = async account => {
  if (!account) return null;

  const stellarAccount = await getHorizonServer().loadAccount(account);
  const nativeBalance = stellarAccount.balances.find(balance => balance.asset_type === 'native');

  return nativeBalance?.balance || '0';
};

export const getTransfersForAccount = async account => {
  if (!account) return [];

  const payments = await getHorizonServer()
    .payments()
    .forAccount(account)
    .order('desc')
    .limit(20)
    .call();

  return payments.records
    .filter(payment => payment.type === 'payment' && payment.asset_type === 'native')
    .map(payment => ({
      fromAddress: payment.from,
      toAddress: payment.to,
      amount: payment.amount,
      assetCode: stellarTestnet.currencySymbol,
      message: '',
      timestamp: payment.created_at,
      transactionHash: payment.transaction_hash,
    }));
};

export const sendStellarPayment = async ({ fromAddress, toAddress, amount, message }) => {
  const server = getHorizonServer();
  const sourceAccount = await server.loadAccount(fromAddress);
  const fee = await server.fetchBaseFee();
  const memo = message
    ? StellarSdk.Memo.text(message.slice(0, 28))
    : StellarSdk.Memo.none();

  const transaction = new StellarSdk.TransactionBuilder(sourceAccount, {
    fee: fee.toString(),
    networkPassphrase: stellarTestnet.networkPassphrase,
  })
    .addOperation(StellarSdk.Operation.payment({
      destination: toAddress,
      asset: StellarSdk.Asset.native(),
      amount: amount.toString(),
    }))
    .addMemo(memo)
    .setTimeout(180)
    .build();

  const signedResponse = normalizeFreighterValue(await signTransaction(transaction.toXDR(), {
    address: fromAddress,
    networkPassphrase: stellarTestnet.networkPassphrase,
  }));
  const signedXdr = signedResponse?.signedTxXdr || signedResponse?.signedTransaction || signedResponse;
  const signedTransaction = StellarSdk.TransactionBuilder.fromXDR(
    signedXdr,
    stellarTestnet.networkPassphrase
  );

  return server.submitTransaction(signedTransaction);
};
