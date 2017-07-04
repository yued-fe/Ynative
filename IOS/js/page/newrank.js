'use strict';

import React, { Component} from 'react';
import {
    Image,
    ListView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    ActivityIndicator,
    Platform,
    InteractionManager
} from 'react-native';
import NavigationBar from 'react-native-navigationbar';
import theme from '../utils/themeUtil';

class NewRankPage extends Component {
    constructor(props) {
        super(props);
        let dsCategory = new ListView.DataSource({
            getRowData: (data, sectionId, rowId) => {
                return data[sectionId][rowId];
            },
            getSectionHeaderData: (data, sectionId) => {
                return data[sectionId];
            },
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        });

        let dsProduct = new ListView.DataSource({
            getRowData: (data, sectionId, rowId) => {
                return data[sectionId][rowId];
            },
            getSectionHeaderData: (data, sectionId) => {
                return data[sectionId];
            },
            rowHasChanged: (row1, row2) => row1 !== row2,
            sectionHeaderHasChanged: (section1, section2) => section1 !== section2,
        });
        this.state = {
            dsCategory: dsCategory,
            dsProduct: dsProduct
        }
        this.categories = ['风云榜','畅销单','点击榜','推荐榜','打赏榜','更新榜','签约榜','新书榜','红包榜'];
        this.products = [0];
        this.curCategoryIndex = 0;
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {

        });
    }

    render() {

        return(
            <View style={styles.container}>
                <NavigationBar
                    title="排行榜"
                    titleColor={theme.barTitleColor}
                    backIconHidden={true}
                    barTintColor={theme.barTintColor}
                />
                <View style={styles.mainWrap}>
                    <ListView style={styles.categoryList}
                              dataSource={this.state.dsCategory.cloneWithRows(this.categories)}
                              renderRow={this._renderRowCategory.bind(this)}
                              enableEmptySections={true}
                    />
                    <ListView style={styles.productList}
                              dataSource={this.state.dsProduct.cloneWithRows(this.products)}
                              renderRow={this._renderRowProduct.bind(this)}
                              enableEmptySections={true}
                    />
                </View>
            </View>
        );
    }

    _renderRowCategory(category, sectionId, rowId) {
        let categoryItemStyle = [styles.categoryItem];
        if (this.curCategoryIndex == rowId) {
            categoryItemStyle.push(styles.categoryItemActive);
        }
        return (
            <TouchableOpacity
                onPress={this._onPressCategory.bind(this, rowId)}
            >
                <View style={categoryItemStyle}>
                    <Text>{category}</Text>
                </View>
                {this.curCategoryIndex == rowId ? <View style={styles.tabLeftline}></View> : null}
            </TouchableOpacity>
        );
    }

    _onPressCategory(rowId) {
        this.curCategoryIndex = rowId;
        this.products = [rowId];
        this.forceUpdate();
    }

    _renderRowProduct(product, sectionId, rowId) {
        return (
            <TouchableOpacity onPress={this._onPressProduct.bind(this, product.id)}>
                <View style={styles.productItem}>
                    <Text>{product}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    _onPressProduct(product_id) {
        InteractionManager.runAfterInteractions(() => {

        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.containerBackgroundColor
    },
    mainWrap: {
        flex:1,
        flexDirection:'row',
    },
    categoryList: {
        flexGrow:0,//固定宽度
        flexShrink:0,//固定宽度
        backgroundColor: '#eee',
        width: 80
    },
    productList: {
        flex: 1
    },
    line:{
        backgroundColor:'#eef0f3',
        height:1,
    },
    categoryItem:{
        alignItems: 'center',    //水平居中
        justifyContent: 'center',//垂直居中
        height:50,
    },
    categoryItemActive: {
        backgroundColor: '#fff',
    },
    category_bg_select:{
        backgroundColor:'#d7ead6',
    },
    category_bg_normal:{
        backgroundColor:'#fff',
    },
    productItem: {
        height: 80,
        flexDirection:'row',
        padding: 15,
        marginBottom: 1,
        backgroundColor:'#fff',
    },
    tabLeftline: {
        position: 'absolute',
        width: 2,
        height: 40,
        marginTop:5,
        backgroundColor: 'red',
        left: 0
    }
});

export default NewRankPage
