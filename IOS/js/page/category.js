import React, {Component, PropTypes} from 'react';
import {Image,ListView,TouchableHighlight,StyleSheet,View,Text,Dimensions,Platform,InteractionManager,ActivityIndicator} from 'react-native';
import NavigationBar from 'react-native-navigationbar'
import CatDetailPage from './catdetail';
import MultiTitleComponent from '../components/multiTitleComponent';
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
<<<<<<< HEAD
                <NavigationBar title="分类"
                    barStyle={styles.navBar}
                    backHidden={false}
                    barTintColor='white'
=======
                <NavigationBar title = "分类"
                    barTintColor = {theme.barTintColor}
                    titleColor = {theme.barTitleColor}
                    backColor = {theme.barTitleColor}
>>>>>>> de4ab646571a984e374900c377e5e8ccedef2372
                    statusbarPadding = {(Platform.OS === 'android' ? false : true)}
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
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    infowrapper: {
        height:px2dp(76),
        width:(Dimensions.get('window').width)/2
    },
    infowrapperbc: {
       backgroundColor: "#f6f7f9" 
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