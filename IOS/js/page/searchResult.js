'use strict';

import React, {Component, PropTypes} from 'react';
import {
    AsyncStorage,
    Image,ListView,TouchableHighlight,TouchableOpacity,StyleSheet,View,Text,ScrollView,Dimensions,TouchableNativeFeedback,Platform,InteractionManager,ActivityIndicator} from 'react-native';
import NavigationBar from 'react-native-navigationbar'
import SearchTopNav from '../components/SearchTopNav';
import theme from '../utils/themeUtil';
import SingleDataComponent from '../components/singleDataComponent';
import LoadingTemplate from '../components/loadingTemplate';
import LoadFailTemplate from '../components/loadFailTemplate';

class SearchResult extends Component{

    constructor(props){
        super(props);
        this.tabarRef = null;
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            keyword: props.keyword,
            results: ds.cloneWithRows([]),
            sortType: [
                { code: 0, name: '综合', selected: true },
                { code: 9, name: '字数', selected: false },
                { code: 17, name: '点击', selected: false },
                { code: 3, name: '时间', selected: false },
            ],
            didMount: false,
            hasError: false
        };

        //this.getResults(this.state.sortType[0]);
        this.pushHistoryKeyword();
    }

    pushHistoryKeyword() {
        var keyword = this.props.keyword;
        AsyncStorage.getItem('searchHistory', (err, rawHistory) => {
            if (err) { return null; }
            var history = JSON.parse(rawHistory) || [];
            if (history.indexOf(keyword) > -1) {
                return
            } else {
                history.unshift(keyword);
                AsyncStorage.setItem('searchHistory', JSON.stringify(history));
            }
        })
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.getResults(this.state.sortType[0]);
        });
    }

    getResults(type) {
        fetch('https://m.readnovel.com/majax/search/list?kw='+this.state.keyword+'&orderBy='+type.code)
            .then(response => response.json())
            .then((result) => {
                console.log(result.data.bookInfo.records)
                this.setState({
                    sortType: this.state.sortType.map((t) => {
                        return {
                            code: t.code,
                            name: t.name,
                            selected: t == type 
                        }
                    }),
                    results: this.state.results.cloneWithRows(result.data.bookInfo.records),
                    didMount: true
                });
            })
            .catch((error) => {
                this.setState({
                    didMount: true,
                    hasError: true
                });
            })
    }

    selectType(type) {
        this.getResults(type)
    }
  
    goBack () {
        this.props.navigator.pop();
    }

    render(){
        return(
            <View style={styles.container}>
                <SearchTopNav
                    value={this.props.keyword}
                    navigator={this.props.navigator}
                    onCancelButtonPress={() => {
                        this.goBack();
                    }}
                    onChangeText={(text) => {

                    }}
                    onSubmitEditing={(event) => {
                    }}
                 />
                <View style={styles.tabsContainer}>
                    { this.state.sortType.map((type, index) => {
                        return (
                            <TouchableOpacity 
                                key={index}
                                style={[styles.tabItem, type.selected && styles.tabItemActive]} 
                                onPress={() => this.selectType(type)}>
                            <View>
                                <Text style={type.selected && styles.tabTextActive}>{type.name}</Text>
                            </View>
                            </TouchableOpacity>

                        );
                    }) }
                </View>
                {
                    this.state.didMount ?
                    <ListView
                        style={styles.content}
                        dataSource={this.state.results}
                        renderRow={(rowData) => this._renderRow(rowData)}
                        enableEmptySections={true}
                        automaticallyAdjustContentInsets={false}
                    />
                    :
                    this.state.hasError ?
                        <LoadFailTemplate/>
                        :
                        <LoadingTemplate/>
                }
            </View>
        );
    }
    _renderRow(rowData,sectionId,rowId) {
        return (
            <SingleDataComponent
                item = {rowData}
                index = {rowId}
                key = {rowId}
                navigator = {this.props.navigator}
            />
        );
    }

}


const styles = StyleSheet.create({
     tabsContainer: {
        // height: 1000,
        // flex: 1,
        marginTop:5,
        flexDirection: 'row',
        borderColor: "#f0f1f2",
        justifyContent: "flex-start",
        marginLeft:20,
        flexWrap: 'wrap', 
        alignItems: 'flex-start'
      },
      scrollView: {
        backgroundColor: 'yellow'
      },
      tabItem: {
        // flex: 1,
        marginRight:10,
        height:10,
        marginTop:10,
        // borderWidth:1,
        alignItems: 'center',
        justifyContent: 'center'
      },
      tabItemActive:{
        marginRight:10,
        marginTop:5,
        height:19,
        alignItems: 'center',
        justifyContent: 'center',    
        borderBottomWidth:1,
        borderBottomColor:'#ff3955',
      },
      tabTextActive:{
        color:'#ff3955',
      },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    header: {
        height:44,
        borderWidth: 1,
        borderColor: "#f0f1f2",
        justifyContent: "center"
    },
    headertext: {
        marginLeft:10,
        color: "#33373d"
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    content: {
        marginTop: 10,
        marginBottom: 10
    },
    listContainer:{
        paddingBottom:20,
        paddingLeft:20,
        paddingRight:20,
        flex:1,
        marginBottom: 5,
        marginRight:20,
        justifyContent:'center',
        flexDirection:'row'
    },
    green: {
        color: "#65c541"
    },
    blue: {
        color: "#3988ff"
    },
    title: {
        flexDirection: "row",
        marginBottom: 5
    },
    titlefontsize: {
        fontSize: 16,
        color: "#33373e"
    },
    infoitem: {
        flex:1,
        flexDirection: 'row',
        justifyContent: 'center',
        padding: 20,
        marginLeft:10,
        marginRight:10,
        borderStyle: 'solid',
        borderBottomWidth: 1,
        borderBottomColor: '#f0f1f2',
    },
    infoimg: {
        width:60,
        height:80,
        marginRight:5,
        shadowColor: '#000000',
        shadowOffset: {
          width: 0,
          height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    infometa:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
        justifyContent: "flex-end"
    },
    infoword: {
        justifyContent: "center"
    },
    infocategory:{
        borderColor:'#ffa100',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        padding:2,
        height:15,
        alignContent: "center", 
        marginRight:5,
    },
    infocategorytxt:{
        color:'#ffa100',
        fontSize:8
    },
    infostatus:{
        borderColor:'#ff3955',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: "flex-end",
        alignContent: "center", 
        padding:2,
        height:15,
        marginRight:5,
    },
    infostatustxt:{
        color:'#ff3955',
        fontSize:8,

    },
    infowordscnt:{
        borderColor:'#4284ee',
        borderWidth: 1,
        padding:2,
        height:15,
        alignContent: "center", 
        flexDirection: 'row',
        justifyContent: "flex-end",
        marginLeft:5,
    },
    infowordscnttxt:{
        color:'#4284ee',
        fontSize:8
    },
    infoauth:{
        flex:1,
        flexDirection: 'row',
        justifyContent: "center",
        color:'#969ba3',
        marginLeft:5,
    },
    desc:{
        flex:1, //height (according to its parent),
        flexDirection: 'row',
        padding:5,
        marginRight:10,
        color:'#969ba3',
        alignItems: 'center',
        justifyContent: 'center',
    },
    infoname: {
        fontWeight:"bold",
        fontSize:16,
        color:"#000",
        marginLeft:5
    },
    infonum: {
        color:"#969ba3"
    }
});

export default SearchResult
