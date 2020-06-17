//import liraries
import React, { Component } from "react";
import {
    StyleSheet,
    Dimensions,
} from "react-native";
import { TabView, SceneMap } from 'react-native-tab-view';
import AllCasesScreen from '../screens/AllCasesScreen';
import Countrysearch from '../screens/CountryScreen';

const initialLayout = { width: Dimensions.get('window').width };


// create a component
class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { key: 'allcases', title: 'All Cases' },
                { key: 'countrysearch', title: 'Country Search' }
            ]
        };
    }

    setIndex = (index) => {
        this.setState({
            index: index
        })
    }

    render() {
        const renderScene = SceneMap({
            allcases: AllCasesScreen,
            countrysearch: Countrysearch,
        });
        return (
            <TabView
                navigationState={this.state}
                renderScene={renderScene}
                onIndexChange={this.setIndex}
                initialLayout={initialLayout}
            />
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column"
    }
});

//make this component available to the app
export default HomeScreen;
