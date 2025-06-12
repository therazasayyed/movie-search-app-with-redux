import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_MOVIES_REQUEST,
    FETCH_MOVIES_SUCCESS,
    FETCH_MOVIES_FAILURE
} from './movieReducer';

const OMDB_API_KEY = process.env.REACT_APP_OMDB_API_KEY;

function* fetchMoviesSaga(action) {
    const { query, page } = action.payload;
    const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${query}&page=${page}`;

    try {
        const response = yield call(fetch, url);
        const data = yield response.json();

        if (data.Response === 'True') {
            const totalResults = parseInt(data.totalResults, 10);
            yield put({
                type: FETCH_MOVIES_SUCCESS,
                payload: {
                    results: data.Search,
                    totalPages: Math.ceil(totalResults / 10),
                    page
                }
            });
        } else {
            yield put({ type: FETCH_MOVIES_FAILURE, error: data.Error });
        }
    } catch (error) {
        yield put({ type: FETCH_MOVIES_FAILURE, error: error.message });
    }
}

export default function* rootSaga() {
    yield takeLatest(FETCH_MOVIES_REQUEST, fetchMoviesSaga);
}