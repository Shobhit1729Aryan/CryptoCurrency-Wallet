import React, { useContext } from 'react';
import styles from './styles.module.scss';
import TextField from './../../Components/FormUI/TextField';
import SubmitBtn from './../../Components/FormUI/SubmitBtn';
import { Formik, Form } from 'formik';
import { Web3Context } from './../../Context/web3/provider';
import * as Yup from 'yup';
import commonErrorMessages from './../../Utils/commonErrorMessages.json';

const TransactionForm = () => {
  const { account, isLoadingWeb3,
    connectToWallet, stellar, validChain, sendPayment } = useContext(Web3Context);

  const INITIAL_FORM_STATE = {
    receiver: '',
    message: '',
    amount: '1',
  };

  const FORM_VALIDATION = Yup.object().shape({
    receiver: Yup.string()
      .required('Required'),
    message: Yup.string(),
    amount: Yup.number()
      .required('Required'),
  });

  const transferFunds = async values => sendPayment(values);

  const invalidChainMsg = process.env.NODE_ENV === 'development'
    ? commonErrorMessages.switchToDevelopmentChain : commonErrorMessages.switchToProductionChain;

  return (
    <div className={styles.transferForm} data-testid="transactionForm">

      <div>
        <h1>
          Transfer XLM
        </h1>
        <p>
          Use this form to send Stellar Lumens to another address.
        </p>
      </div>

      <Formik
        initialValues={{
          ...INITIAL_FORM_STATE
        }}
        validationSchema={FORM_VALIDATION}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await transferFunds(values)
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
        <Form>
          {isSubmitting && (
            <div className={styles.transferingOverlay}>
              <div className={styles.orbit}>
                <span className={styles.coin}>XLM</span>
              </div>
              <strong>Transferring XLM</strong>
              <p>Broadcasting your Stellar payment...</p>
            </div>
          )}

          <TextField name="from" label="From" value={account} disabled />

          <TextField name="receiver" label="Receiver" placeholder="Gxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" />

          <TextField name="message" label="Message (Optional)" />

          <TextField name="amount" label="Amount (XLM)" />

          {isLoadingWeb3 ? null : stellar ? validChain ? account ? (
            <SubmitBtn type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send'}
            </SubmitBtn>
          ) : (
            <SubmitBtn type="button" onClick={() => connectToWallet()}>
              Connect Wallet
            </SubmitBtn>
          ) : (
            <div>
              {invalidChainMsg}
            </div>
          ) : (
            <div>
              Please install Freighter
            </div>
          )}

        </Form>
        )}
      </Formik>
    </div>
  );
};

export default TransactionForm;
