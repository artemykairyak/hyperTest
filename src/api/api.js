import * as axios from "axios";

const instance = axios.create({
    baseURL: 'https://cors-anywhere.herokuapp.com/http://37.230.114.75:8000/api',
    // withCredentials: true,
    // headers: {"API-KEY": 'c5c7df60-607d-46ff-82fa-93b7998d3eff'}
});

export const testsAPI = {
    getTests() {
        return instance.get(`tests`)
            .then(response => {return response.data})
    },

    getTest(testID) {
        return instance.get(`tests/${testID}`)
            .then(response => response.data)
    },

    createTest(test) {
        return instance.post(`tests`, test)
            .then(response => response.data)
    },
};