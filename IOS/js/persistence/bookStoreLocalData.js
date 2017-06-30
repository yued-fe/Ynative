'use strict';

import {AsyncStorage} from 'react-native';

const KEY = 'YW_QD_BOOKSTORE_DATA';

export default class BookStoreLocalData{

    save(json){
        let data = {
            content: json
        };
        try {
            AsyncStorage.setItem(KEY, JSON.stringify(data));
        } catch (error) {

        }
    }

    remove(){
        AsyncStorage.removeItem(YW_QD_BOOKSTORE_DATA);
    }

    fetchLocalData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(KEY, (error, result)=>{
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