import { BinaryInfo } from '../swap/downloader';
import { SwapLog } from './swap';

export interface Provider {
  multiAddr: string;
  peerId: string;
  testnet: boolean;
}

export interface ExtendedProvider extends Provider {
  price: number;
  minSwapAmount: number;
  maxSwapAmount: number;
  uptimeSeconds: number;
  downtimeSeconds: number;
  age: number;
  relevancy: number;
}

export interface Swap {
  state: SwapState | null;
  logs: SwapLog[];
  stdOut: string;
  processRunning: boolean;
  provider: Provider | null;
}

export interface SwapState {
  type: SwapStateType;
}

export enum SwapStateType {
  DOWNLOADING_BINARY = 'downloading binary',
  INITIATED = 'initiated',
  RECEIVED_QUOTE = 'received quote',
  WAITING_FOR_BTC_DEPOSIT = 'waiting for btc deposit',
  STARTED = 'started',
  BTC_LOCK_TX_IN_MEMPOOL = 'btc lock tx is in mempool',
  Jude_LOCK_TX_IN_MEMPOOL = 'Jude lock tx is in mempool',
  Jude_REDEEM_IN_MEMPOOL = 'Jude redeem tx is in mempool',
  PROCESS_EXITED = 'process exited',
}

export interface SwapStateDownloadingBinary extends SwapState {
  type: SwapStateType.DOWNLOADING_BINARY;
  binaryInfo: BinaryInfo;
  totalDownloadedBytes: number;
  contentLengthBytes: number;
}

export interface SwapStateInitiated extends SwapState {
  type: SwapStateType.INITIATED;
}

export interface SwapStateReceivedQuote extends SwapState {
  type: SwapStateType.RECEIVED_QUOTE;
  price: number;
  minimumSwapAmount: number;
  maximumSwapAmount: number;
}

export interface SwapStateWaitingForBtcDeposit extends SwapState {
  type: SwapStateType.WAITING_FOR_BTC_DEPOSIT;
  depositAddress: string;
  maxGiveable: number;
}

export interface SwapStateStarted extends SwapState {
  type: SwapStateType.STARTED;
  id: string;
  btcAmount: number;
  bobBtcLockTxFees: number;
}

export interface SwapStateBtcLockInMempool extends SwapState {
  type: SwapStateType.BTC_LOCK_TX_IN_MEMPOOL;
  bobBtcLockTxId: string;
  bobBtcLockTxConfirmations: number;
}

export interface SwapStateJudeLockInMempool extends SwapState {
  type: SwapStateType.Jude_LOCK_TX_IN_MEMPOOL;
  aliceJudeLockTxId: string;
  aliceJudeLockTxConfirmations: number;
}

export interface SwapStateJudeRedeemInMempool extends SwapState {
  type: SwapStateType.Jude_REDEEM_IN_MEMPOOL;
  bobJudeRedeemTxId: string;
}

export interface SwapStateProcessExited extends SwapState {
  type: SwapStateType.PROCESS_EXITED;
  exitCode: number | null;
  exitSignal: NodeJS.Signals | null | undefined;
}