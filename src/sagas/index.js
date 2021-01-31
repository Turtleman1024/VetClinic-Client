import { all, call, spawn } from 'redux-saga/effects';
import ownerSaga from './owner';
import patientSaga from './patient';

export default function* rootSaga() {
  const sagas = [ownerSaga, patientSaga];
  yield all(
    sagas.map((saga) =>
      spawn(function* () {
        while (true) {
          try {
            yield call(saga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
