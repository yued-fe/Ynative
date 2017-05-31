import React, {Component, PropTypes} from 'react';
import {Image,ListView,TouchableHighlight,StyleSheet,View,Text,ScrollView,Dimensions,TouchableNativeFeedback} from 'react-native';

class CategoryPage extends Component{

    constructor(props){
        super(props);
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows(DATA)
        };
    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headertext} onPress={() => this.goBack()}>分类</Text>
                </View>
                <ListView
                    style={styles.content}
                    dataSource={this.state.dataSource}
                    renderRow={(rowData,sectionId,rowId) => this._renderRow(rowData,rowId)}
                    automaticallyAdjustContentInsets={false}
                />
            </View>
        );
    }

    _renderRow(rowData,rowId) {

        return (
            <View style={styles.listContainer}>
                <View style={styles.title}>
                    {rowId == 0 ? <Text style={styles.green}>| </Text> : <Text style={styles.blue}>| </Text>}
                    <Text style={styles.titlefontsize}>{rowData.categoryName}</Text>
                </View>
                <View style={styles.info}>
                    {rowData.subList.map((item, index) => {
                        return(
                            <View style={[styles.infowrapper,((index+2)%4 ==0 || (index+1)%4 ==0)?{backgroundColor: "#fff"}:{backgroundColor: "#f6f7f9"}]} key={index}>
                                <View onPress={this.goDetailPage()} style={styles.infoitem}>
                                    <Image style={styles.infoimg} source={{uri:item.img}} />
                                    <View style={styles.infoword}>
                                        <Text style={styles.infoname}>{item.name}</Text>
                                        <Text style={styles.infonum}>{item.num}本</Text>
                                    </View>
                                </View>
                            </View>
                        )})
                    }
                </View>
            </View>
        );
    }

    goDetailPage () {
        
    }

    goBack () {
        this.props.navigator.pop();
    }
};

const DATA = [
    {
        categoryName:"女生频道",
        subList:[
            {
                name: "现代言情",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "古代言情",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "浪漫青春",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "玄幻言情",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "现代言情",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "古代言情",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "浪漫青春",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "玄幻言情",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            }
        ]
    },
    {
        categoryName:"男生频道",
        subList:[
            {
                name: "玄幻",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "奇幻",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "武侠",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "仙侠",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "玄幻",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "奇幻",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "武侠",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            },
            {
                name: "仙侠",
                num: 25633,
                img: "https://qidian.qpic.cn/qdbimg/349573/c_25377889000533901/90"  
            }

        ]
    }
];

const styles = StyleSheet.create({
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
        flex:1,
        marginBottom: 5,
        marginLeft:10,
        marginRight:10
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
        color: "#33373d"
    },
    info : {
        flexDirection: "row",
        justifyContent: "flex-start",
        flexWrap: "wrap"
    },
    infowrapper: {
        height:80,
        width:(Dimensions.get('window').width-20)/2
    },
    infowrapperbc: {
       backgroundColor: "#f6f7f9" 
    },
    infoitem: {
        marginTop:10,
        marginBottom:10,
        flexDirection: "row"
    },
    infoimg: {
        width:40,
        height:60,
        marginRight:5
    },
    infoword: {
        justifyContent: "center"
    },
    infoname: {
        fontWeight:"bold",
        fontSize:16,
        color:"#000"
    },
    infonum: {
        color:"#969ba3"
    }
});

export default CategoryPage;