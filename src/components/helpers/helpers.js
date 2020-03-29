import imageCompression from 'browser-image-compression';
import {allowedImageFormats} from '../../constants';

export const convertToBase64 = (file, cb) => {
    if(file) {
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function () {
            cb(reader.result)
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
    } else {
        cb(null);
    }
};

export const compressFile = (file, callback) =>  {
    if(allowedImageFormats.includes(file.type)) {
        imageCompression(file, {
            maxSizeMB: 0.3,
            maxWidthOrHeight: 700,
        }).then(compressedFile => {
            convertToBase64(compressedFile, callback)
        })
    } else {
        convertToBase64(null, callback)
    }
};

export const generateNewIndex = (iteratedArr, idField) => {
    let sortedIds = [];
    if (iteratedArr.length === 0) {
        sortedIds.push(-1);
    } else {
        iteratedArr.forEach(item => {
            sortedIds.push(item[idField]);
        });
    }

    return sortedIds.sort()[sortedIds.length - 1] + 1;
};

export const cropText = (text, length) => {
    if (text.length > length) {
        return text.slice(0, length) + '...';
    }
    return text;
};

export const lengthValidation = (text, length=255) => {
    console.log(text, length)
    return text.length > length
};

export const parseURL = () => {
    let url = new URL(window.location.href);

    function convertQueryParamsToObject(queryString) {
        let params = queryString.substr(1).split('&');
        let paramsObj = {},
            i, param;

        if (params !== "") {
            for (i = 0; i < params.length; i += 1) {
                param = params[i].split('=');
                if (param.length === 2) {
                    paramsObj[param[0]] =
                        decodeURIComponent(param[1].replace(/\+/g, " "));
                }
            }
        }

        return paramsObj;
    }

    return convertQueryParamsToObject(url.search);
};