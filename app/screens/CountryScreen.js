//import liraries
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    SafeAreaView,
    Dimensions,
    Text,
    TextInput
} from "react-native";
import axios from 'axios';
import { scale } from '../utils/scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import Graph from './GraphScreen';

const { width } = Dimensions.get('window');

// create a component
class CountryScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            text: ''
        };
    }

    searchFilterFunction(text) {
        this.setState({
            text: text
        });
    }

    async searchMethod() {
        if (this.state.text) {
            let response;
            try {
                let url = `https://covid-19.dataflowkit.com/v1/${this.state.text}`;
                response = await axios.get(url);
            } catch (e) {
                console.log(`Failed to fetch countries: ${e.message}`, e);
                return;
            }
            if (response && response.status === 200) {
                let data = [];
                data = [{
                    active_Cases_text: response.data["Active Cases_text"],
                    country_text: response.data.Country_text,
                    last_Update: response.data["Last Update"],
                    new_Cases_text: response.data["New Cases_text"],
                    new_Deaths_text: response.data["New Deaths_text"],
                    total_Cases_text: response.data["Total Cases_text"],
                    total_Deaths_text: response.data["Total Deaths_text"],
                    total_Recovered_text: response.data["Total Recovered_text"]
                }];
                this.setState({
                    data: data
                });
            }
        }
    }

    clearSearchFilter() {
        this.setState({
            data: [],
            text: ''
        });
    }

    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <View style={styles.searchbarStyle}>
                        <View style={styles.searchContainer}>
                            <View style={styles.searchbar}>
                                <TextInput
                                    style={styles.textInputStyleClass}
                                    onChangeText={(text) => this.searchFilterFunction(text)}
                                    value={this.state.text}
                                    underlineColorAndroid='transparent'
                                    placeholder="Search Here"
                                />
                                <Text style={styles.textIcon}
                                    onPress={this.searchMethod.bind(this)}
                                >
                                    <Icon name="search" size={25} />
                                </Text>
                                <Text style={styles.textIcon}
                                    onPress={() => this.clearSearchFilter()}
                                >
                                    <Icon name="times" size={25} />
                                </Text>
                            </View>
                        </View>
                    </View>

                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        {this.state.data.length === 0 ?
                            <View>
                                <Text>No Stats available</Text>
                            </View> :
                            <View>
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    data={this.state.data}
                                    keyExtractor={(item, index) => item.title}
                                    renderItem={({ item: rowData }) => {
                                        return (
                                            <View style={styles.card}>
                                                <View style={styles.cardcontent}>
                                                    <Text>{rowData.country_text}</Text>
                                                </View>
                                                <View style={styles.cardcontent}>
                                                    <View style={styles.leftContent}>
                                                        <Text>Total Cases:</Text>
                                                        <Text>New Cases:</Text>
                                                        <Text>Total Deaths:</Text>
                                                        <Text>New Deaths:</Text>
                                                        <Text>Recovered:</Text>
                                                        <Text>Active Cases:</Text>
                                                    </View>
                                                    <View style={styles.rightContent}>
                                                        <Text>{rowData.total_Cases_text}</Text>
                                                        <Text>{rowData.new_Cases_text}</Text>
                                                        <Text>{rowData.total_Deaths_text}</Text>
                                                        <Text>{rowData.new_Deaths_text}</Text>
                                                        <Text>{rowData.total_Recovered_text}</Text>
                                                        <Text>{rowData.active_Cases_text}</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        }
                        {this.state.data.length > 0 &&
                            <View>
                                <Graph graphicalData={this.state.data} />
                            </View>
                        }
                    </ScrollView>
                </View>
            </SafeAreaView>
        );
    }
}

// define your styles
const styles = StyleSheet.create({
    container: {
        flexDirection: "column"
    },
    searchbar: {
        flexDirection: 'row',
        margin: 0,
        height: scale(45),
        paddingLeft: 5
    },
    searchContainer: {
        width: width - scale(50),
        height: scale(45),
        flex: 1
    },
    searchbarStyle: {
        flexDirection: 'row',
        borderBottomWidth: 0,
        maxWidth: scale(400)
    },
    textInputStyleClass: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: '#009688',
        borderRadius: 7,
        backgroundColor: "#FFFFFF",
        paddingHorizontal: 10,
        margin: 5,
    },
    textIcon: {
        top: 10,
        width: scale(25),
        margin: 2
    },
    card: {
        marginTop: -2,
        paddingHorizontal: 0,
        flexDirection: 'column',
        flex: 1,
        borderRadius: 1,
        borderRightWidth: 0,
        overflow: 'hidden',
        paddingVertical: 5,
        borderColor: 'black',
        borderWidth: 1
    },
    cardcontent: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        maxWidth: width - 10
    },
    leftContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    rightContent: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-end'
    }
});

//make this component available to the app
export default CountryScreen;
