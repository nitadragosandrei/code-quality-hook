import {getAllCommits, getCommitByShaId} from '../services/git';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
    LOAD_ALL_COMMITS_REQUEST,
    LOAD_ALL_COMMITS_SUCCESSFULLY
} from "./types";

function* fetchAllCommits() {
    const allCommits = yield getAllCommits();
    const shaIds = allCommits.map(commit => commit.sha)

    const allCommitsByShaId = yield loadCommitsByShaIds(shaIds);

    yield put({ type: LOAD_ALL_COMMITS_SUCCESSFULLY, payload: allCommitsByShaId });
}
function* loadAllCommitsWatcher() {
    yield takeLatest(LOAD_ALL_COMMITS_REQUEST, fetchAllCommits)
}

function* loadCommitsByShaIds(shaIds) {
    return yield shaIds.map(shaId => {
        return call(getCommitByShaId, shaId)
    })
}

export default function* rootSaga() {
    yield all([
        loadAllCommitsWatcher()
    ]);
}