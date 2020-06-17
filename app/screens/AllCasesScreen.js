//import liraries
import React, { Component } from "react";
import {
    View,
    StyleSheet,
    FlatList,
    ScrollView,
    SafeAreaView,
    TouchableOpacity,
    Dimensions,
    Text
} from "react-native";
import axios from 'axios';
import { withNavigation } from 'react-navigation';

const { width, height } = Dimensions.get('window');

// create a component
class AllCasesScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    componentWillMount() {
        this.getAllCases();
    }

    async getAllCases() {
        let response;
        try {
            response = await axios.get('https://covid-19.dataflowkit.com/v1');
        } catch (e) {
            console.log(`Failed to fetch countries: ${e.message}`, e);
            return;
        }
        if (response && response.status === 200) {
            let data = [];
            data = response.data.map(function (item) {
                return {
                    active_Cases_text: item[Object.keys(item)[0]],
                    country_text: item.Country_text,
                    last_Update: item[Object.keys(item)[2]],
                    new_Cases_text: item[Object.keys(item)[3]],
                    new_Deaths_text: item[Object.keys(item)[4]],
                    total_Cases_text: item[Object.keys(item)[5]],
                    total_Deaths_text: item[Object.keys(item)[6]],
                    total_Recovered_text: item[Object.keys(item)[7]]
                };
            })
            this.setState({
                data: data
            });
        }
    }

    showGraphView = (country_text) => {
        if (this.state.data.length > 0) {
            let selectedData = this.state.data.filter(a => a.country_text === country_text);
            this.props.navigation.navigate('Graph', { graphicalData: selectedData });
        }
    }


    render() {
        return (
            <SafeAreaView>
                <View style={styles.container}>
                    <ScrollView
                        showsVerticalScrollIndicator={false}
                    >
                        <FlatList
                            showsHorizontalScrollIndicator={false}
                            data={this.state.data}
                            keyExtractor={(item, index) => item.Country_text}
                            renderItem={({ item: rowData }) =>
                                <TouchableOpacity
                                    onPress={() => {
                                        this.showGraphView(rowData.country_text)
                                    }}
                                >
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
                                </TouchableOpacity>
                            }
                        />
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
    },
});

//make this component available to the app
export default withNavigation(AllCasesScreen);
