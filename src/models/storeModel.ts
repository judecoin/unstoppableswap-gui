import { BinaryInfo } from '../swap/downloader';
import { SwapLog } from './swapModel';

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
  jude_LOCK_TX_IN_MEMPOOL = 'jude lock tx is in mempool',
  jude_REDEEM_IN_MEMPOOL = 'jude redeem tx is in mempool',
  PROCESS_EXITED = 'process exited',
}

export interface SwapStateDownloadingBinary extends SwapState {
  type: SwapStateType.DOWNLOADING_BINARY;
  binaryInfo: BinaryInfo;
  totalDownloadedBytes: number;
  contentLengthBytes: number;
}

export function isSwapStateDownloadingBinary(
  state?: SwapState | null
): state is SwapStateDownloadingBinary {
  return state?.type === SwapStateType.DOWNLOADING_BINARY;
}

export interface SwapStateInitiated extends SwapState {
  type: SwapStateType.INITIATED;
}

export function isSwapStateInitiated(
  state?: SwapState | null
): state is SwapStateInitiated {
  return state?.type === SwapStateType.INITIATED;
}

export interface SwapStateReceivedQuote extends SwapState {
  type: SwapStateType.RECEIVED_QUOTE;
  price: number;
  minimumSwapAmount: number;
  maximumSwapAmount: number;
}

export function isSwapStateReceivedQuote(
  state?: SwapState | null
): state is SwapStateReceivedQuote {
  return state?.type === SwapStateType.RECEIVED_QUOTE;
}

export interface SwapStateWaitingForBtcDeposit extends SwapState {
  type: SwapStateType.WAITING_FOR_BTC_DEPOSIT;
  depositAddress: string;
  maxGiveable: number;
}

export function isSwapStateWaitingForBtcDeposit(
  state?: SwapState | null
): state is SwapStateWaitingForBtcDeposit {
  return state?.type === SwapStateType.WAITING_FOR_BTC_DEPOSIT;
}

export interface SwapStateStarted extends SwapState {
  type: SwapStateType.STARTED;
  id: string;
}

export function isSwapStateStarted(
  state?: SwapState | null
): state is SwapStateStarted {
  return state?.type === SwapStateType.STARTED;
}

export interface SwapStateBtcLockInMempool extends SwapState {
  type: SwapStateType.BTC_LOCK_TX_IN_MEMPOOL;
  bobBtcLockTxId: string;
  bobBtcLockTxConfirmations: number;
}

export function isSwapStateBtcLockInMempool(
  state?: SwapState | null
): state is SwapStateBtcLockInMempool {
  return state?.type === SwapStateType.BTC_LOCK_TX_IN_MEMPOOL;
}

export interface SwapStatejudeLockInMempool extends SwapState {
  type: SwapStateType.jude_LOCK_TX_IN_MEMPOOL;
  alicejudeLockTxId: string;
  alicejudeLockTxConfirmations: number;
}

export function isSwapStatejudeLockInMempool(
  state?: SwapState | null
): state is SwapStatejudeLockInMempool {
  return state?.type === SwapStateType.jude_LOCK_TX_IN_MEMPOOL;
}

export interface SwapStatejudeRedeemInMempool extends SwapState {
  type: SwapStateType.jude_REDEEM_IN_MEMPOOL;
  bobjudeRedeemTxId: string;
}

export function isSwapStatejudeRedeemInMempool(
  state?: SwapState | null
): state is SwapStatejudeRedeemInMempool {
  return state?.type === SwapStateType.jude_REDEEM_IN_MEMPOOL;
}

export interface SwapStateProcessExited extends SwapState {
  type: SwapStateType.PROCESS_EXITED;
  exitCode: number | null;
  exitSignal: NodeJS.Signals | null | undefined;
}

export function isSwapStateProcessExited(
  state?: SwapState | null
): state is SwapStateProcessExited {
  return state?.type === SwapStateType.PROCESS_EXITED;
}
