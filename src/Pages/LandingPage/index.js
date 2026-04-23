import React from 'react';
import TransactionForm from './../../Components/TransactionForm';
import TransferHistory from '../../Components/TransferHistory';
import { Grid, Column } from './../../Components/GridUI';

const LandingPage = () => {
  return (
    <Grid>
      <Column width={12}>
        <main data-testid="landingPage">
          <Grid nestedGrid={true}>
            <Column width={12}>
              <TransactionForm />
            </Column>
            <Column width={12}>
              <TransferHistory />
            </Column>
          </Grid>
        </main>
      </Column>
    </Grid>
  );
};

export default LandingPage;
