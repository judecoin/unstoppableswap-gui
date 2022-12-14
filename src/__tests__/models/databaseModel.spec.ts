import { merge } from 'lodash';
import {
  DbState,
  DbStateType,
  getTypeOfDbState,
  isBtcCancelledDbState,
  isBtcLockedDbState,
  isBtcRedeemedDbState,
  isCancelTimelockExpiredDbState,
  isDoneBtcPunishedDbState,
  isDonejudeRedeemedDbState,
  isEncSigSentDbState,
  isExecutionSetupDoneDbState,
  isMergedBtcCancelledDbState,
  isMergedBtcLockedDbState,
  isMergedBtcRedeemedDbState,
  isMergedCancelTimelockExpiredDbState,
  isMergedDoneBtcPunishedDbState,
  isMergedDonejudeRedeemedDbState,
  isMergedEncSigSentDbState,
  isMergedExecutionSetupDoneDbState,
  isMergedjudeLockedDbState,
  isMergedjudeLockProofReceivedDbState,
  isjudeLockedDbState,
  isjudeLockProofReceivedDbState,
  MergedBtcCancelledDbState,
  MergedBtcLockedDbState,
  MergedBtcRedeemedDbState,
  MergedCancelTimelockExpiredDbState,
  MergedDbState,
  MergedDoneBtcPunishedDbState,
  MergedDonejudeRedeemedDbState,
  MergedEncSigSentDbState,
  MergedExecutionSetupDoneDbState,
  MergedjudeLockedDbState,
  MergedjudeLockProofReceivedDbState,
} from '../../models/databaseModel';

const executionSetupDoneState = require('./example_states/execution_setup_done.json');
const btcLockedState = require('./example_states/btc_locked.json');
const judeLockProofReceivedState = require('./example_states/jude_lock_proof_received.json');
const judeLockedState = require('./example_states/jude_locked.json');
const encSigSentState = require('./example_states/enc_sig_sent.json');
const btcRedeemedState = require('./example_states/btc_redeemed.json');
const donejudeRedeemedState = require('./example_states/done_jude_redeemed.json');
const cancelTimelockExpiredState = require('./example_states/cancel_timelock_expired.json');
const btcCancelledState = require('./example_states/btc_cancelled.json');
const doneBtcPunished = require('./example_states/done_btc_punished.json');

/*
TODO!
Add btc refunded case
 */

const allSingleStates = [
  executionSetupDoneState,
  btcLockedState,
  judeLockProofReceivedState,
  judeLockedState,
  encSigSentState,
  btcRedeemedState,
  donejudeRedeemedState,
  btcCancelledState,
  doneBtcPunished,
  cancelTimelockExpiredState,
];

const exampleSwapId = '15de9d95-a1f8-45e8-98a7-5327b940fc41';

const mergedExecutionSetupDoneState: MergedExecutionSetupDoneDbState = {
  swapId: exampleSwapId,
  type: DbStateType.EXECUTION_SETUP_DONE,
  state: merge({}, executionSetupDoneState),
};

const mergedBtcLockedState: MergedBtcLockedDbState = {
  swapId: exampleSwapId,
  type: DbStateType.BTC_LOCKED,
  state: merge({}, executionSetupDoneState, btcLockedState),
};

const mergedjudeLockProofReceivedState: MergedjudeLockProofReceivedDbState = {
  swapId: exampleSwapId,
  type: DbStateType.jude_LOCK_PROOF_RECEIVED,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    judeLockProofReceivedState
  ),
};

const mergedjudeLockedState: MergedjudeLockedDbState = {
  swapId: exampleSwapId,
  type: DbStateType.jude_LOCKED,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    judeLockProofReceivedState,
    judeLockedState
  ),
};

const mergedEncSigSentState: MergedEncSigSentDbState = {
  swapId: exampleSwapId,
  type: DbStateType.ENC_SIG_SENT,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    judeLockProofReceivedState,
    judeLockedState,
    encSigSentState
  ),
};

const mergedBtcRedeemedState: MergedBtcRedeemedDbState = {
  swapId: exampleSwapId,
  type: DbStateType.BTC_REDEEMED,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    judeLockProofReceivedState,
    judeLockedState,
    encSigSentState,
    btcRedeemedState
  ),
};

const mergedjudeRedeemedState: MergedDonejudeRedeemedDbState = {
  swapId: exampleSwapId,
  type: DbStateType.DONE_jude_REDEEMED,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    judeLockProofReceivedState,
    judeLockedState,
    encSigSentState,
    btcRedeemedState,
    donejudeRedeemedState
  ),
};

const mergedTimelockExpiredState: MergedCancelTimelockExpiredDbState = {
  swapId: exampleSwapId,
  type: DbStateType.CANCEL_TIMELOCK_EXPIRED,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    cancelTimelockExpiredState
  ),
};

const mergedBtcCancelled: MergedBtcCancelledDbState = {
  swapId: exampleSwapId,
  type: DbStateType.BTC_CANCELLED,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    cancelTimelockExpiredState,
    btcCancelledState
  ),
};

const mergedBtcPunished: MergedDoneBtcPunishedDbState = {
  swapId: exampleSwapId,
  type: DbStateType.DONE_BTC_PUNISHED,
  state: merge(
    {},
    executionSetupDoneState,
    btcLockedState,
    cancelTimelockExpiredState,
    btcCancelledState,
    doneBtcPunished
  ),
};

const allMergedStates = [
  mergedExecutionSetupDoneState,
  mergedBtcLockedState,
  mergedjudeLockProofReceivedState,
  mergedjudeLockedState,
  mergedEncSigSentState,
  mergedBtcRedeemedState,
  mergedjudeRedeemedState,
  mergedTimelockExpiredState,
  mergedBtcCancelled,
  mergedBtcPunished,
];

/*
TODO!
Add test case for btc refunded

const mergedBtcRefunded: MergedDoneBtcRefundedDbState = {
  swapId: exampleSwapId,
  type: DbStateType.DONE_BTC_REFUNDED,
  state: merge({}, executionSetupDoneState, btcLockedState, btcCancelledState, ),
}; */

test('should correctly get type of state', () => {
  expect(getTypeOfDbState(executionSetupDoneState)).toBe(
    DbStateType.EXECUTION_SETUP_DONE
  );
  expect(getTypeOfDbState(btcLockedState)).toBe(DbStateType.BTC_LOCKED);
  expect(getTypeOfDbState(judeLockProofReceivedState)).toBe(
    DbStateType.jude_LOCK_PROOF_RECEIVED
  );
  expect(getTypeOfDbState(judeLockedState)).toBe(DbStateType.jude_LOCKED);
  expect(getTypeOfDbState(encSigSentState)).toBe(DbStateType.ENC_SIG_SENT);
  expect(getTypeOfDbState(btcRedeemedState)).toBe(DbStateType.BTC_REDEEMED);
  expect(getTypeOfDbState(donejudeRedeemedState)).toBe(
    DbStateType.DONE_jude_REDEEMED
  );
  expect(getTypeOfDbState(cancelTimelockExpiredState)).toBe(
    DbStateType.CANCEL_TIMELOCK_EXPIRED
  );
  expect(getTypeOfDbState(btcCancelledState)).toBe(DbStateType.BTC_CANCELLED);
  expect(getTypeOfDbState(doneBtcPunished)).toBe(DbStateType.DONE_BTC_PUNISHED);

  expect.assertions(allSingleStates.length);
});

describe('should correctly assess type guards for single states', () => {
  const statesAndTypeGuards: [
    state: DbState,
    typeGuardFunc: (state: DbState) => boolean
  ][] = [
    [executionSetupDoneState, isExecutionSetupDoneDbState],
    [btcLockedState, isBtcLockedDbState],
    [judeLockProofReceivedState, isjudeLockProofReceivedDbState],
    [judeLockedState, isjudeLockedDbState],
    [encSigSentState, isEncSigSentDbState],
    [btcRedeemedState, isBtcRedeemedDbState],
    [donejudeRedeemedState, isDonejudeRedeemedDbState],
    [cancelTimelockExpiredState, isCancelTimelockExpiredDbState],
    [btcCancelledState, isBtcCancelledDbState],
    [doneBtcPunished, isDoneBtcPunishedDbState],
  ];

  test.each(statesAndTypeGuards)(`%o`, (state, typeGuardFunc) => {
    allSingleStates.forEach((s) => {
      expect(typeGuardFunc(s)).toBe(s === state);
    });

    expect.assertions(allSingleStates.length);
  });

  test('correct amount of single states', () => {
    expect(statesAndTypeGuards.length).toBe(allSingleStates.length);
    expect(allSingleStates.length).toBe(allMergedStates.length);
  });
});

describe('should correctly assess type guards for encapsulated states', () => {
  const mergedStatesAndTypeGuards: [
    state: MergedDbState,
    typeGuardFunc: (state: MergedDbState) => boolean
  ][] = [
    [mergedExecutionSetupDoneState, isMergedExecutionSetupDoneDbState],
    [mergedBtcLockedState, isMergedBtcLockedDbState],
    [mergedjudeLockProofReceivedState, isMergedjudeLockProofReceivedDbState],
    [mergedjudeLockedState, isMergedjudeLockedDbState],
    [mergedEncSigSentState, isMergedEncSigSentDbState],
    [mergedBtcRedeemedState, isMergedBtcRedeemedDbState],
    [mergedjudeRedeemedState, isMergedDonejudeRedeemedDbState],
    [mergedTimelockExpiredState, isMergedCancelTimelockExpiredDbState],
    [mergedBtcCancelled, isMergedBtcCancelledDbState],
    [mergedBtcPunished, isMergedDoneBtcPunishedDbState],
  ];

  test.each(mergedStatesAndTypeGuards)(`%o`, (state, typeGuardFunc) => {
    allMergedStates.forEach((s) => {
      expect(typeGuardFunc(s)).toBe(s === state);
    });

    expect.assertions(allMergedStates.length);
  });

  test('correct amount of merged states', () => {
    expect(mergedStatesAndTypeGuards.length).toBe(allMergedStates.length);
    expect(allMergedStates.length).toBe(allSingleStates.length);
  });
});
