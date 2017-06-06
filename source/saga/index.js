/**
 * Created by kim on 2017/6/2.
 */

import {fork} from "redux-saga/effects";

import userWatch from "./user";

export default function* rootSaga() {
  yield [fork(userWatch)];
}