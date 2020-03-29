import * as axios from "axios";
import {baseUrl} from "../constants";

const instance = axios.create({
    baseURL: baseUrl,
    // withCredentials: true,
    // headers: {"API-KEY": 'c5c7df60-607d-46ff-82fa-93b7998d3eff'}
});

export const testsAPI = {
    getTests() {
        return instance.get(`tests`)
            .then(response => {
                return response.data
            })
    },

    getTest(testID) {
        return instance.get(`tests/${testID}`)
            .then(response => response.data)
    },

    createTest(test) {
        return instance.post(`tests`, test)
            .then(response => response.data)
            .catch((error) => {
                console.log(error.response);
                return error.response.data
            });
    },
};

export const authAPI = {
    auth() {
        let queryString = window.location.search;
        return instance.post(`auth`, {
            'query': queryString.slice(1)
        }).then(response => {
            console.log(response.data);
            return response.data;
        })
    }
}