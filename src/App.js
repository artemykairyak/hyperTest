import React, {useEffect} from 'react';
import './App.css';
import {Switch, Route, BrowserRouter as Router} from 'react-router-dom';
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import store from "./redux/store";
import MainScreenContainer from "./components/MainScreen/MainScreenContainer";
import {Box} from "@material-ui/core";
import HeaderTabsContainer from "./components/Common/Header/HeaderTabsContainer";
import {parseURL} from "./components/helpers/helpers";
import {authAPI} from "./api/api";
import {authUser} from "./redux/reducers/userReducer";

const App = ({authUser}) => {
    useEffect(() => {
        //this.props.initializeApp();
        authUser();
    }, []);

    return (
        <>
            <Box>
                <HeaderTabsContainer/>
                <Switch>
                    <Route exact path="/">
                        <MainScreenContainer/>
                    </Route>
                </Switch>
            </Box>


        </>
    );
};

const mapStateToProps = state => ({
    //initialized: state.app.initialized,
});

const AppContainer = compose(
    connect(mapStateToProps, {authUser}))(App);

const MainApp = () => {
    return (
        <Router>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </Router>
    )
};

export default MainApp;