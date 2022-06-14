import { combineReducers } from 'redux';
import { LOAD_ALL_COMMITS_REQUEST, LOAD_ALL_COMMITS_SUCCESSFULLY } from './types';

const commits = (state = { data:{}, loading: true}, action) => {
    switch (action.type) {
        case LOAD_ALL_COMMITS_REQUEST:
            return { ...state, loading: true };
        case LOAD_ALL_COMMITS_SUCCESSFULLY:
            return { ...state, data: action.payload, loading: false }
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    commits: commits,
});

export default rootReducer;