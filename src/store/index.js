import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import movieReducer from './movieReducer';
import rootSaga from './movieSaga';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    movies: movieReducer
});

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;