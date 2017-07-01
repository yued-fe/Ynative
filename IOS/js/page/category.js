import React, {Component, PropTypes} from 'react';
import {Image,ListView,TouchableHighlight,StyleSheet,View,Text,Dimensions,Platform,InteractionManager,ActivityIndicator} from 'react-native';
import NavigationBar from 'react-native-navigationbar'
import CatDetailPage from './catdetail';
import MultiTitleComponent from '../components/multiTitleComponent';
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
        this.KEY = 'YWQDCATEGORY';
    }

    componentDidMount(){
        InteractionManager.runAfterInteractions(() => {
            storage.sync = this.fetchData;
            storage.load({
                key: this.KEY,
                syncInBackground: false
            }).then(result => {
                let resData = [{categoryName:"女生频道",subList:[]},{categoryName:"男生频道",subList:[]}];
                resData[0].subList = result.data.info.female;
                resData[1].subList = result.data.info.male;
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
        fetch('https://m.readnovel.com/majax/category')
            .then(response => response.json())
            .then((result) => {
                let resData = [{categoryName:"女生频道",subList:[]},{categoryName:"男生频道",subList:[]}];
                resData[0].subList = result.data.info.female;
                resData[1].subList = result.data.info.male;
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
                    didMount: true,
                    hasError: true
                });
            });
    }

    render() {
        /*
        * https://www.npmjs.com/package/react-native-navigationbar
        */
        return (
            <View style={styles.container}>
                <NavigationBar title = "分类"
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
                    borderColor={rowId == 0 ? "red" : "blue"}
                    hasMoreBtn={false}
                />
                <View style={styles.info}>
                    {rowData.subList.map((item, index) => {
                        return(
                            <View style={[styles.infowrapper,((index+2)%4 ==0 || (index+1)%4 ==0)?{backgroundColor: "#fff"}:{backgroundColor: "#f6f7f9"}]} key={index}>
                                <TouchableHighlight onPress={() => this.goCatDetailPage()}>
                                    <View style={styles.infoitem}>
                                        <Image style={styles.infoimg} source={{uri:"https://qidian.qpic.cn/qdbimg/349573/c_"+item.coverBid+"/90"}} />
                                        <View style={styles.infoword}>
                                            <Text style={styles.infoname}>{item.catName}</Text>
                                            <Text style={styles.infonum}>{item.catNum}本</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            </View>
                        )})
                    }
                </View>
            </View>
        );
    }

    goCatDetailPage (catId) {
        this.switchPage(CatDetailPage,{catId:catId});
    }

    switchPage(component,args){
        this.props.navigator.push({
            component: component,
            args:args
        });
    }
};

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
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    infowrapper: {
        height:px2dp(76),
        width:(Dimensions.get('window').width)/2
    },
    infoitem: {
        marginTop:px2dp(12),
        marginBottom:px2dp(12),
        flexDirection: "row",
        paddingLeft: px2dp(16),
        paddingRight: px2dp(16)
    },
    infoimg: {
        width:px2dp(39),
        height:px2dp(52),
        marginRight:px2dp(12)
    },
    infoword: {
        justifyContent: "center"
    },
    infoname: {
        fontWeight:"bold",
        fontSize:px2dp(16),
        color:"#000"
    },
    infonum: {
        fontSize:px2dp(12),
        color:"#969ba3"
    }
});

export default CategoryPage;