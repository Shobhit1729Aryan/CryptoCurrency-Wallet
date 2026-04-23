import types from './types';

export const INITIAL_STATE = {
  stellar: null,
  provider: null,
  chainId: null,
  validChain: null,
  account: '',
  balance: null,
  isLoadingWeb3: true,
  transfers: [],
  isFetching: true
};

const reducer = (state, action) => {
  switch (action.type) {
    case types.GET_WEB3:
      return {
        ...state,
        ...action.payload
      }
    case types.SET_IS_FETCHING:
      return {
        ...state,
        isFetching: action.payload
      }
    case types.SET_ACCOUNT:
      return {
        ...state,
        account: action.payload
      }
    case types.SET_TRANSFERS:
      return {
        ...state,
        transfers: action.payload,
        isFetching: false
      }
    case types.SET_BALANCE:
      return {
        ...state,
        balance: action.payload
      }
    case types.SET_CHAIN_ID:
      return {
        ...state,
        chainId: action.payload.chainId,
        validChain: action.payload.validChain,
        isFetching: action.payload.validChain ? state.isFetching : false,
      }
    default:
      return state;
  }
};

export default reducer;
