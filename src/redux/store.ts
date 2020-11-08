import { createStore, applyMiddleware } from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import { rootSaga } from './root-saga';
import { logger } from 'redux-logger';

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware, logger),
);

sagaMiddleware.run(rootSaga);
