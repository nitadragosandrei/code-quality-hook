import React, { useEffect } from "react"
import {connect, useDispatch, useSelector} from "react-redux"
import { loadAllCommitsRequest } from '../redux/actions';
import NavBar from "./NavBar";

const MainPage = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadAllCommitsRequest());
    }, [dispatch]);

    return (
        props.loading ?
            renderLoadingComponent() :
            <NavBar props={props}/>
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