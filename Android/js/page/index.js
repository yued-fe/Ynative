'use strict';

import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux';
// import * as Actions from '../../actions/requestIndexData';
import {StyleSheet, View, Text} from 'react-native';

class IndexPage extends Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <Text style={styles.container}>
                hello world
            </Text>
        );
    }

    _fetchData(){
        //this.props.actions.fetchDataIfNeed(getCurrentDate());
    }

    componentDidMount(){
        //store.dispatch(fetchStarList());
        //store.dispatch(initialSettingsStateFacade());
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:"#f4f4f4"
    }
});

// const mapStateToProps = (state) => {
//     return {
//         loading: state.homeDataState.loading,
//         hasData: state.homeDataState.hasData,
//         dataSource: state.homeDataState.dataSource,
//         dataTime: state.homeDataState.dataTime,
//         error: state.homeDataState.error,
//         mainThemeColor: state.settingState.colorScheme.mainThemeColor,
//         pageBackgroundColor: state.settingState.colorScheme.pageBackgroundColor,
//         rowItemBackgroundColor: state.settingState.colorScheme.rowItemBackgroundColor,
//         segmentColor: state.settingState.colorScheme.segmentColor,
//         displayOrder: state.settingState.displayOrder
//     };
// };

// const mapDispatchToProps = (dispatch) => {
//     return {
//         actions: bindActionCreators(Actions, dispatch)
//     };
// };
export default IndexPage
// export default connect(mapStateToProps, mapDispatchToProps)(IndexPage);