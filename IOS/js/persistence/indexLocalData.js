'use strict';

import {AsyncStorage} from 'react-native';

const YW_QD_INDEX_DATA = 'YW_QD_INDEX_DATA';

//TODO:增加过期时间、参数来控制缓存的逻辑
export default class IndexLocalData{

    save(json){
        let data = {
            content: json
        };
        try {
            AsyncStorage.setItem(YW_QD_INDEX_DATA, JSON.stringify(data));
        } catch (error) {

        }
    }

    fetchLocalData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(YW_QD_INDEX_DATA, (error, result)=>{
                if(!error){
                    const data = JSON.parse(result);
                    if(data) {
                        resolve(data.content);
                    }else{
                        reject(null);
                    }
                }else{
                    reject(null);
                }
            });
        });
    }
}