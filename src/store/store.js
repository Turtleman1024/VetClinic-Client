import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import rootSaga from '../sagas';

// https://redux.js.org/usage/migrating-to-modern-redux
const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

const store = configureStore({
  reducer: rootReducer,
  middleware,
  preloadedState: initialState,
});

sagaMiddleware.run(rootSaga);

if (process.env.NODE_ENV !== 'production') {
  window.store = store;
}

export default store;
