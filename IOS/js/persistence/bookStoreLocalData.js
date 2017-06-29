'use strict';

import {AsyncStorage} from 'react-native';

const YW_QD_BOOKSTORE_DATA = 'YW_QD_BOOKSTORE_DATA';

export default class BookStoreLocalData{

    save(json){
        let data = {
            content: json
        };
        try {
            AsyncStorage.setItem(YW_QD_BOOKSTORE_DATA, JSON.stringify(data));
        } catch (error) {

        }
    }

    remove(){
        AsyncStorage.removeItem(YW_QD_BOOKSTORE_DATA);
    }

    fetchLocalData(){
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(YW_QD_BOOKSTORE_DATA, (error, result)=>{
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