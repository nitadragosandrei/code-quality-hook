import {getAllCommits, getCommitByShaId, getAllBranches,getCommitByBranchName} from '../services/git';
import { put, takeLatest, all, call } from 'redux-saga/effects';
import {
    LOAD_ALL_COMMITS_REQUEST,
    LOAD_ALL_COMMITS_SUCCESSFULLY
} from "./types";

function* fetchAllCommits() {
    const allBranches  = yield getAllBranches();
    // const allCommits = yield getAllBranches();
    // console.log(allBranches);
    const branchShas = allBranches.map(branch => branch.commit.sha)
    
    // console.log(branchShas);
    // const branch = branchShas.map(commit => commit)
    // console.log(branch);
    const allBranchesByShaId = yield loadCommitsByShaIds(branchShas, true);
    console.log("allBranchesByShaId",allBranchesByShaId);

    var allCommitsShaIds = [];
    allBranchesByShaId.forEach((item)=>{
        item.forEach((commit)=>{
            if(!allCommitsShaIds.includes(commit.sha)) {
                allCommitsShaIds.push(commit.sha);
            }
        })
    });
    
    console.log("commitsShaId",allCommitsShaIds);
    
    const allCommitsByShaId = yield loadCommitsByShaIds(allCommitsShaIds);
    
    console.log("allCommitsByShaId", allCommitsByShaId);

    yield put({ type: LOAD_ALL_COMMITS_SUCCESSFULLY, payload: allCommitsByShaId });
}

function* loadAllCommitsWatcher() {
    yield takeLatest(LOAD_ALL_COMMITS_REQUEST, fetchAllCommits)
}

function* loadCommitsByShaIds(shaIds, page) {
    return yield shaIds.map(shaId => {
        return call(getCommitByShaId, shaId, page)
    })
}

export default function* rootSaga() {
    yield all([
        loadAllCommitsWatcher()
    ]);
}