export const request = (url, method, body) => {
    let isSuccess;
    return new Promise((resolve, reject) => {
        fetch(getUrl(url), {
            method,
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body
        })
        .then((response) => {
            if (response.code === 0) {
                isSuccess = true;
            } else {
                isSuccess = false;
            }
            return response.json();
        })
        .then((responseData) => {
            if (isSuccess) {
                resolve(responseData);
            } else {
                reject(responseData);
            }
        })
        .catch((error) => {
            reject(error);
        });
    });
};