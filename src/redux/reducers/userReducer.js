import {authAPI} from "../../api/api";
import bridge from '@vkontakte/vk-bridge';

const SET_TOKEN = 'SET_TOKEN';
const SET_NAME = 'SET_NAME';
const SET_LASTNAME = 'SET_LASTNAME';
const SET_ID = 'SET_ID';
const SET_SEX = 'SET_SEX';
const SET_AVATAR = 'SET_AVATAR';
const SET_COINS = 'SET_COINS';

let initialState = {
    token: null,
    id: null,
    name: '',
    lastName: '',
    sex: null,
    avatar: null,
    coins: 0
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
        case SET_NAME:
            return {
                ...state,
                id: action.id
            };
        case SET_LASTNAME:
            return {
                ...state,
                lastName: action.lastName
            };
        case SET_SEX:
            return {
                ...state,
                sex: action.sex
            };
        case SET_AVATAR:
            return {
                ...state,
                avatar: action.avatar
            };
        case SET_COINS:
            return {
                ...state,
                coins: action.coins
            };
        default:
            return state;
    }
};

export const setToken = (token) => ({type: SET_TOKEN, token});
export const setId = (id) => ({type: SET_ID, id});
export const setName = (name) => ({type: SET_NAME, name});
export const setLastName = (lastName) => ({type: SET_LASTNAME, lastName});
export const setSex = (sex) => ({type: SET_SEX, sex});
export const setAvatar = (avatar) => ({type: SET_AVATAR, avatar});
export const setCoins = (coins) => ({type: SET_COINS, coins});

export const getVKData = () => async (dispatch) => {
    console.log('inVKDATA')
    await bridge.send('VKWebAppInit');
    await bridge.subscribe(e => console.log(e));
    let response = await bridge.send("VKWebAppGetUserInfo", {});
    dispatch(setId(response.id));
    dispatch(setName(response.first_name));
    dispatch(setLastName(response.last_name));
    dispatch(setSex(response.sex));
    dispatch(setAvatar(response.photo_100));
};

export const authUser = () => async (dispatch) => {
    let response = await authAPI.auth();
    console.log(response);
    dispatch(setToken(response.access_token));
    await getVKData();
    let userData = await authAPI.getUserData();
    dispatch(setCoins(userData.coins))
};


export default userReducer;