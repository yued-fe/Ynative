'use strict';

import * as types from '../actions/actionTypes';

const initialState = {
    loading: false,
    hasData: false,
    error: false,
    dataSource: {}
}

export default function indexDataState(state=initialState, action){
    switch (action.type){
        case types.FETCH_INDEX_DATE_REQUEST:
            return Object.assign({}, state, {
                ...state,//展开运算符，将数组、对象展开
                loading: true,
                error: false
            });

        case types.FETCH_INDEX_DATA_SUCCESS:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                hasData: true,
                dataSource: action.dataSource
            });

        case types.FETCH_INDEX_DATA_FAILURE:
            return Object.assign({}, state, {
                ...state,
                loading: false,
                error: true
            });

        default:
            return state;
    }
}