import {authAPI, testsAPI} from "../../api/api";
import {setIsLoaded, setTests} from "./mainReducer";
import bridge from '@vkontakte/vk-bridge';

const SET_TOKEN = 'SET_TOKEN';
const SET_ID = 'SET_ID';

let initialState = {
    token: null,
    id: null
};

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            return {
                ...state,
                token: action.token
            };
        case SET_ID:
            return {
                ...state,
                id: action.id
            };
        default:
            return state;
    }
};

export const setToken = (token) => ({type: SET_TOKEN, token});
export const setId = (id) => ({type: SET_ID, id});

const getVKData = () => {
    console.log('inVKDATA')
    bridge.send('VKWebAppInit');
    bridge.subscribe(e => console.log(e));
    bridge.send("VKWebAppGetUserInfo", {}).then(res => console.log(res));
}

export const authUser = () => async (dispatch) => {
    console.log('here')
    dispatch(setIsLoaded(false));
    let response = await authAPI.auth();
    console.log(response);
    dispatch(setToken(response.access_token));
    // Sends event to client
    await getVKData();

// Subscribes to event, sended by client


    // dispatch(setTotalUsers(response.totalCount));
    // dispatch(setCurrentPage(page));
    dispatch(setIsLoaded(true));
};



export default userReducer;