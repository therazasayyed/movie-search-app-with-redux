const initialState = {
    results: [],
    loading: false,
    error: null,
    totalPages: 1,
    page: 1
};

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST';
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS';
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE';

export const fetchMovies = (payload) => ({
    type: FETCH_MOVIES_REQUEST,
    payload
});

const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_MOVIES_REQUEST:
            return { ...state, loading: true, error: null };
        case FETCH_MOVIES_SUCCESS:
            return {
                ...state,
                loading: false,
                results: action.payload.results,
                totalPages: action.payload.totalPages,
                page: action.payload.page
            };
        case FETCH_MOVIES_FAILURE:
            return { ...state, loading: false, error: action.error };
        default:
            return state;
    }
};

export default movieReducer;