import React, { useEffect, useState } from "react"
import {connect, useDispatch} from "react-redux"
import { loadAllCommitsRequest } from '../redux/actions';
import {Button, ButtonGroup} from "react-bootstrap";
import Table from './Table';
import Graph from "./Graph";
import Files from "./Files";

const MainPage = (props) => {
    const dispatch = useDispatch();
    const [isGraphPageVisible, setGraphPageVisible] = useState(true);
    const [isCommitsPageVisible, setCommitsPageVisible] = useState(false);
    const [isFilesPageVisible, setFilesPageVisible] = useState(false);

    useEffect(() => {
        dispatch(loadAllCommitsRequest());
    }, [dispatch]);

    const onGraphClick = () => {
        setGraphPageVisible(true);
        setCommitsPageVisible(false);
        setFilesPageVisible(false);
    }

    const onCommitsClick = () => {
        setGraphPageVisible(false);
        setCommitsPageVisible(true);
        setFilesPageVisible(false);
    }

    const onFilesClick = () => {
        setGraphPageVisible(false);
        setCommitsPageVisible(false);
        setFilesPageVisible(true);
    }

    const renderSelectedComponent = () => {
        if(isCommitsPageVisible) {
            return Table(props.allCommits)
        }

        if(isGraphPageVisible) {
            return Graph(props.allCommits)
        }

        if(isFilesPageVisible) {
            return Files(props.allCommits)
        }

        return null;
    }


    const renderMainPage = () => {
        return (
            <div style={{display: "grid"}}>
                <ButtonGroup aria-label="Basic example">
                    <Button onClick={onGraphClick} variant="secondary">Graph</Button>
                    <Button onClick={onCommitsClick} variant="secondary">Commits</Button>
                    <Button onClick={onFilesClick} variant="secondary">Files</Button>
                </ButtonGroup>
                {renderSelectedComponent()}
            </div>
        );
    }

    return (
        props.loading ?
            renderLoadingComponent() :
            renderMainPage()
    )
};

const renderLoadingComponent = () => {
    return (
        <div style={{ textAlign: 'center' }}>
            <h1>LOADING</h1>
        </div>
    )
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