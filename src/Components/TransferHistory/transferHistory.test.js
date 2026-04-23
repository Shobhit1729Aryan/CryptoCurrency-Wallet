import { render } from '@testing-library/react';
import TransferHistory from './index';
import { Web3Context } from './../../Context/web3/provider';

test('TransferHistory Renders without Error', () => {
  const { queryByTestId } = render(
    <Web3Context.Provider value={{
      isLoadingWeb3: false,
      validChain: true,
      isFetching: false,
      transfers: [{
        amount: '1.5000000',
        assetCode: 'XLM',
        timestamp: '2026-04-23T00:00:00Z'
      }],
    }}>
      <TransferHistory />
    </Web3Context.Provider>
  );
  const component = queryByTestId('transferHistory');
  expect(component).toBeTruthy();
});
