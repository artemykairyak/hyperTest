import * as axios from "axios";
import {allTestsPageSize, appId, baseUrl, pageSize} from "../constants";
import bridge from '@vkontakte/vk-bridge';

let _token = null;

const instance = axios.create({
    baseURL: baseUrl,
    // headers: {'Authorization': `Bearer ${_token}`}
});

export const testsAPI = {
    getAllTests(page) {
        console.log('PAGE', page)
        return instance.get(`tests?page=${page}&page_size=${allTestsPageSize}`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log(response.data)
                return response.data
            })
    },

    getTest(testID) {
        return instance.get(`tests/${testID}`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => response.data)
    },

    createTest(test) {
        return instance.post(`tests/my`, test, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => response.data)
            .catch((error) => {
                console.log(error.response);
                return error.response.data
            });
    },
};

export const myTestsAPI = {
    getMyUnpublishedTests(page) {
        return instance.get(`tests/my?isPublished=0&page=${page}&page_size=${pageSize}`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log('MYTESTS', response.data);
                return response.data
            })
    },

    getMyPublishedTests(page) {
        return instance.get(`tests/my?isPublished=1&page=${page}&page_size=${pageSize}`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log('PUBLISHED', response.data);
                return response.data
            })
    },

    getMyPassedTests(page) {
        return instance.get(`tests/passed`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log('PASSED', response.data);
                return response.data
            })
    },

    publishMyTest(id, test) {
        return instance.put(`tests/my/${id}`, test, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log('published', response.data);
                return response.data
            })
    },

    getMyTest(testID) {
        return instance.get(`tests/my/${testID}`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => response.data)
    },

    deleteMyTest(id) {
        return instance.delete(`tests/my/${id}`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log('deleted', response.data);
                return response.data
            })
    },
};

export const testAPI = {
    testPassed(id) {
        return instance.post(`tests/${id}/pass`, {
            'id': id
        }, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log(response.data);
                return response.data;
            })
    }
};

export const authAPI = {
    auth() {
        console.log('AUTH')
        // let queryString = window.location.search;
        let queryString = '?vk_access_token_settings=notify&vk_app_id=7339321&vk_are_notifications_enabled=0&vk_is_app_user=1&vk_is_favorite=0&vk_language=ru&vk_platform=desktop_web&vk_ref=other&vk_user_id=131120542&sign=lKAHqeSFV77Rp2D8E4K_g6K4x1dlKKh_McYnvHRTUkY'
        instance.defaults.headers.common['Authorization'] = 'Bearer ' + null;
        return instance.post(`auth`, {
            'query': queryString.slice(1)
        }).then(response => {
            console.log(response.data);
            _token = response.data.access_token;
            return response.data;
        })
    },

    getUserData() {
        return instance.get(`profile`, {headers: {'Authorization': `Bearer ${_token}`}})
            .then(response => {
                console.log(response.data);
                return response.data;
            })
    }
};

export const VKAPI = {
    buyCoins() {
        console.log('BUYCOUNS');
        bridge.send("VKWebAppOpenPayForm", {"app_id": appId, "action": "transfer-to-user", "params": {}});
    },

    wallPost(message, photo) {
        console.log('WALLPOST');
        bridge.send("VKWebAppShowWallPostBox", {"message": message});
    }
};