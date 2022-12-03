import React, { useState } from 'react';
import {
  Button,
  DialogActions,
  DialogContent,
  makeStyles,
} from '@material-ui/core';
import { resetSwap } from 'store/features/swap/swapSlice';
import SwapDialogTitle from '../SwapDialogTitle';
import SwapStopAlert from './SwapStopAlert';
import { useAppDispatch } from '../../../../store/hooks';
import {
  Swap,
  SwapState,
  SwapStateBtcLockInMempool,
  SwapStateDownloadingBinary,
  SwapStateInitiated,
  SwapStateProcessExited,
  SwapStateReceivedQuote,
  SwapStateType,
  SwapStateWaitingForBtcDeposit,
  SwapStateJudeLockInMempool,
  SwapStateJudeRedeemInMempool,
} from '../../../../models/store';
import SwapStateStepper from './SwapStateStepper';
import DownloadingBinaryPage from './pages/happy/DownloadingBinaryPage';
import InitiatedPage from './pages/happy/InitiatedPage';
import WaitingForBitcoinDepositPage from './pages/happy/WaitingForBitcoinDepositPage';
import StartedPage from './pages/happy/StartedPage';
import BitcoinLockTxInMempoolPage from './pages/happy/BitcoinLockTxInMempoolPage';
import JudeLockTxInMempoolPage from './pages/happy/JudeLockInMempoolPage';
import ProcessExitedPage from './pages/happy/ProcessExitedPage';
import JudeRedeemInMempoolPage from './pages/happy/JudeRedeemInMempoolPage';
import ReceivedQuotePage from './pages/happy/ReceivedQuotePage';

const useStyles = makeStyles({
  content: {
    overflow: 'hidden',
    minHeight: '25rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
});

function InnerContent({ state }: { state: SwapState }) {
  switch (state.type) {
    case SwapStateType.DOWNLOADING_BINARY:
      return (
        <DownloadingBinaryPage state={state as SwapStateDownloadingBinary} />
      );
    case SwapStateType.INITIATED:
      return <InitiatedPage state={state as SwapStateInitiated} />;
    case SwapStateType.RECEIVED_QUOTE:
      return <ReceivedQuotePage state={state as SwapStateReceivedQuote} />;
    case SwapStateType.WAITING_FOR_BTC_DEPOSIT:
      return (
        <WaitingForBitcoinDepositPage
          state={state as SwapStateWaitingForBtcDeposit}
        />
      );
    case SwapStateType.STARTED:
      return <StartedPage />;
    case SwapStateType.BTC_LOCK_TX_IN_MEMPOOL:
      return (
        <BitcoinLockTxInMempoolPage
          state={state as SwapStateBtcLockInMempool}
        />
      );
    case SwapStateType.Jude_LOCK_TX_IN_MEMPOOL:
      return (
        <JudeLockTxInMempoolPage state={state as SwapStateJudeLockInMempool} />
      );
    case SwapStateType.Jude_REDEEM_IN_MEMPOOL:
      return (
        <JudeRedeemInMempoolPage state={state as SwapStateJudeRedeemInMempool} />
      );
    case SwapStateType.PROCESS_EXITED:
      return <ProcessExitedPage state={state as SwapStateProcessExited} />;
    default:
      return <pre>{JSON.stringify(state, null, '\t')}</pre>;
  }
}

export default function SwapStatePage({ swap }: { swap: Swap }) {
  const classes = useStyles();
  const [openCancelAlert, setOpenCancelAlert] = useState(false);
  const dispatch = useAppDispatch();

  function onCancel() {
    if (swap.processRunning) {
      setOpenCancelAlert(true);
    } else {
      dispatch(resetSwap());
    }
  }

  return (
    <>
      <SwapDialogTitle title="Swapping BTC for Jude" />

      <DialogContent dividers className={classes.content}>
        <InnerContent state={swap.state as SwapState} />
        <SwapStateStepper state={swap.state as SwapState} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancel} variant="text">
          Cancel
        </Button>
      </DialogActions>

      <SwapStopAlert
        open={openCancelAlert}
        onClose={() => setOpenCancelAlert(false)}
      />
    </>
  );
}