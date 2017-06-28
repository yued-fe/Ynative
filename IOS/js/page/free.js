import React, {Component, PropTypes} from 'react';
import {Image,ListView,TouchableHighlight,StyleSheet,View,Text,Dimensions,Platform,InteractionManager,ActivityIndicator} from 'react-native';
import NavigationBar from 'react-native-navigationbar'
import MultiTitleComponent from '../components/multiTitleComponent';
import SingleDataComponent from '../components/singleDataComponent';
import TestPage from './index';
import px2dp from '../utils/pxtodpUtil';

class CategoryPage extends Component{

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            didMount: false,
            hasError: false
        };
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            this.fetchData();
        });
    }

    fetchData() {
        fetch('https://m.readnovel.com/majax/channel/free')
            .then(response => response.json())
            .then((result) => {
                let resData = [{categoryName:"人气免费",subList:[],more:""},{categoryName:"新书免费",subList:[],more:""}];
                resData[0].subList = result.data.pop;
                resData[0].more = result.data.popMore;
                resData[1].subList = result.data.new;
                resData[1].more = result.data.newMore;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(resData),
                    didMount: true
                });
            })
            .catch((error)=>{
                this.setState({
                    didMount: true,
                    hasError: true
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title="免费"
<<<<<<< HEAD
                    barStyle={styles.navBar}
                    backHidden={false}
                    barTintColor='white'
=======
                    barTintColor = {theme.barTintColor}
                    titleColor = {theme.barTitleColor}
                    backColor = {theme.barTitleColor}
>>>>>>> de4ab646571a984e374900c377e5e8ccedef2372
                    statusbarPadding = {(Platform.OS === 'android' ? false : true)}
                    actionName = "测试"
                    actionTextColor = {theme.barTitleColor}
                    actionFunc = {this.goTestPage.bind(this)}
                    backFunc={() => {
                        this.props.navigator.pop()
                    }}/>
                {this.state.didMount ?
                    <ListView
                        style={styles.content}
                        dataSource={this.state.dataSource}
                        renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,sectionId,rowId)}
                        automaticallyAdjustContentInsets={false}
                    />
                    :
                    this.state.hasError ?
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <Text style={{marginTop: 10}}>页面错误</Text>
                        </View>
                        :
                        <View style={{flex: 1, justifyContent:'center', alignItems:'center'}}>
                            <ActivityIndicator size="large"/>
                            <Text style={{marginTop: 10}}>拼命加载中</Text>
                        </View>
                }

            </View>
        );
    }

    _renderRow(rowData,sectionId,rowId) {

        return (
            <View style={styles.listContainer}>
                <MultiTitleComponent
                    categoryName={rowData.categoryName}
                    borderColor={"red"}
                    hasMoreBtn={true}
                    moreType={"catdetail"}
                    moreParams={rowData.more}
                    customLeft={rowId == 0 ? "hotfree" : ""}
                    navigator = {this.props.navigator}
                />
                <View style={styles.info}>
                    {
                        rowData.subList.map((item, index) => {
                            return <SingleDataComponent
                                item = {item}
                                index = {index}
                                key = {rowData.categoryName+index}
                                navigator = {this.props.navigator}
                            />
                        })
                    }
                </View>
            </View>
        );
    }


    goTestPage(){
        this.props.navigator.push({
            component: TestPage
        });
    }
}

const styles = StyleSheet.create({
    navBar: {
        // height:20
    },
    container: {
        flex: 1,
        backgroundColor: "#fff"
    },
    content: {
        marginBottom: px2dp(16)
    },
    listContainer:{
        flex:1
    },
    info : {
        flex:1
    }
});

export default CategoryPage;