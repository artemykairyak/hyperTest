import imageCompression from 'browser-image-compression';

export const convertToBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };

};

export const compressFile = (file, callback) =>  {
    imageCompression(file, {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 700,
    }).then(compressedFile => {
        convertToBase64(compressedFile, callback)
    })
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