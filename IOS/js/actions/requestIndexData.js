'use strict';

import * as types from './actionTypes';
import requestUrl from '../api/api';
import IndexLocalData from '../persistence/indexLocalData';

function requestData() {
    return {
        type: types.FETCH_INDEX_DATE_REQUEST,
    };
}

function fetchSuccess(json){
    return {
        type: types.FETCH_INDEX_DATA_SUCCESS,
        dataSource: json
    }
}

function fetchFailure() {
    return {
        type: types.FETCH_INDEX_DATA_FAILURE
    };
}


export function fetchData() {
    const url = requestUrl.getBookStoreInfo;
    return (dispatch) => {
        dispatch(requestData());//相当于showloading 
        let indexLocalDataAction = new IndexLocalData(); 
        indexLocalDataAction.fetchLocalData().then((localData) => {
            dispatch(fetchSuccess(localData));
        }, (localData)=>{
            //注释部分可开启跨域post请求
            // let formData = new FormData();  
            // formData.append("name","admin");  
            // formData.append("password","admin123");
            fetch(url,{
                //method: "POST",
                method: "GET",
                //mode: 'cors',
                // cache: 'default',
                // headers: {
                //     'Content-Type': 'application/x-www-form-urlencoded',
                //     'Access-Control-Allow-Origin':'*',
                //     'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT, DELETE',
                // },
                //body: formData
            }).then(response => response.json()).then(json => {
                    indexLocalDataAction.save(json.data);
                    dispatch(fetchSuccess(json.data));
                }).catch((error)=>{
                    dispatch(fetchFailure());
                });
            });
    }
}