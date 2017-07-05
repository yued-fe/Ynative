import React, {Component, PropTypes} from 'react';
import {Image,ListView,TouchableHighlight,StyleSheet,View,Text,Dimensions,Platform,InteractionManager,ActivityIndicator} from 'react-native';
import NavigationBar from 'react-native-navigationbar'
import MultiTitleComponent from '../components/multiTitleComponent';
import SingleDataComponent from '../components/singleDataComponent';
import px2dp from '../utils/pxtodpUtil';
import theme from '../utils/themeUtil';
import LoadingTemplate from '../components/loadingTemplate';
import LoadFailTemplate from '../components/loadFailTemplate';

class CategoryPage extends Component{

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds,
            didMount: false,
            hasError: false
        };
        this.KEY = 'YWQDFINISH';
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            storage.sync = this.fetchData;
            storage.load({
                key: this.KEY,
                syncInBackground: false
            }).then(result => {
                let resData = [{categoryName:"最新完结",subList:[],more:""},{categoryName:"经典必读",subList:[],more:""},{categoryName:"畅销完本",subList:[],more:""}];
                resData[0].subList = result.data.new;
                resData[0].more = result.data.newMore;
                resData[1].subList = result.data.classic;
                resData[1].more = result.data.classicMore;
                resData[2].subList = result.data.hot;
                resData[2].more = result.data.hotMore;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(resData),
                    didMount: true
                });
            }).catch(err => {
                this.fetchData();
            })
        });
    }

    fetchData() {
        fetch('https://m.readnovel.com/majax/channel/finish')
            .then(response => response.json())
            .then((result) => {
                let resData = [{categoryName:"最新完结",subList:[],more:""},{categoryName:"经典必读",subList:[],more:""},{categoryName:"畅销完本",subList:[],more:""}];
                resData[0].subList = result.data.new;
                resData[0].more = result.data.newMore;
                resData[1].subList = result.data.classic;
                resData[1].more = result.data.classicMore;
                resData[2].subList = result.data.hot;
                resData[2].more = result.data.hotMore;
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(resData),
                    didMount: true
                });
                //保存
                storage.save({
                    key: this.KEY,
                    data: result,
                    expires: 1000 * 3600
                });
            })
            .catch((error)=>{
                this.setState({
                    didMount: false,
                    hasError: true
                });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <NavigationBar title="完本"
                    barTintColor = {theme.barTintColor}
                    titleColor = {theme.barTitleColor}
                    backColor = {theme.barTitleColor}
                    statusbarPadding = {(Platform.OS === 'android' ? false : true)}
                    backFunc = {() => {
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
                        <LoadFailTemplate/>
                        :
                        <LoadingTemplate/>
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
                    customLeft={rowId == 2 ? "hotfinish" : ""}
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
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    },
    content: {
        marginBottom: px2dp(1)
    },
    listContainer:{
        flex:1
    },
    info : {
        flex:1
    }
});

export default CategoryPage;