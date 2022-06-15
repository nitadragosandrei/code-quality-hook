import React, { useEffect } from "react"
import { connect, useDispatch } from "react-redux"
import { all } from "redux-saga/effects";
import { loadAllCommitsRequest } from '../redux/actions';

const MainPage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllCommitsRequest());
    }, [dispatch]);

    return (
        props.loading ?
            renderLoadingComponent() :
            commitsAsTable(props.allCommits)
    )
};

const renderLoadingComponent = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>LOADING</h1>
        </div>
    )
}

const commitsAsTable = (allCommits) => {
    console.log("allCommits", allCommits);
        return (
        <div className="container">
            <h3 className="p-3 text-center">React - Display a list of commits</h3>
            <table className="table table-striped table-bordered">
                <thead>
                <tr>
                    <th>Sha</th>
                    <th>Author</th>
                    <th>Message</th>
                    <th>Files</th>
                </tr>
                </thead>
                <tbody>
                {allCommits[0] && allCommits[0].length > 0 && allCommits[0].map(item =>
                    <tr key={item.sha}>
                        <td>{item.sha}</td>
                        <td>{item.commit.author.name}</td>
                        <td>{item.commit.message}</td>
                        <td>{extractFilenames(item.files)}</td>
                        <td>{}</td>
                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );

    
}

const extractFilenames = (files) => {
    return files.map(file => file.filename + " ");
}

const mapStateToProps = state => {
    return {
        allCommits: state.commits.data,
        loading: state.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onPokemonDetailsClick: (pokemon) => {
            console.log("onPokemonDetailsClick", pokemon);
        },
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)