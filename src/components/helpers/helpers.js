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

export const generateNewIndex = (iteratedArr, idField) => {
    console.log('ITER', iteratedArr)
    let sortedIds = [];
    iteratedArr.forEach(item => {
        sortedIds.push(item[idField]);
    });

    return sortedIds.sort()[sortedIds.length - 1] + 1;
};