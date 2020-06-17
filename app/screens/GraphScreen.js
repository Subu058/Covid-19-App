import React from 'react'
import {
    PieChart
} from "react-native-chart-kit";
import { Dimensions } from "react-native";
const screenWidth = Dimensions.get("window").width;

class Graph extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data: props.graphicalData ? props.graphicalData[0] : props.navigation.state.params ? props.navigation.state.params.graphicalData[0] : [],
            pieData: []
        };
    }

    componentWillMount() {
        if (this.state.data) {
            let pieData = [
                {
                    name: 'TotalCases',
                    cases: parseInt(this.state.data.total_Cases_text === "N/A" || this.state.data.total_Cases_text === "" ? 0 : this.state.data.total_Cases_text.replace(/[\s,]+/g,'').trim()),
                    color: 'rgba(131, 167, 234, 1)',
                    legendFontColor: '#000000',
                    legendFontSize: 12,
                },
                {
                    name: 'TotalDeath',
                    cases: parseInt(this.state.data.total_Deaths_text === "N/A" || this.state.data.total_Deaths_text === "" ? 0 : this.state.data.total_Deaths_text.replace(/[\s,]+/g,'').trim()),
                    color: '#F00',
                    legendFontColor: '#000000',
                    legendFontSize: 12,
                },
                {
                    name: 'Recovered',
                    cases: parseInt(this.state.data.total_Recovered_text === "N/A" || this.state.data.total_Recovered_text === "" ? 0 : this.state.data.total_Recovered_text.replace(/[\s,]+/g,'').trim()),
                    color: 'red',
                    legendFontColor: '#000000',
                    legendFontSize: 12,
                },
                {
                    name: 'ActiveCases',
                    cases: parseInt(this.state.data.active_Cases_text === "N/A" || this.state.data.active_Cases_text === "" ? 0 : this.state.data.active_Cases_text.replace(/[\s,]+/g,'').trim()),
                    color: 'blue',
                    legendFontColor: '#000000',
                    legendFontSize: 12,
                }
            ];
            this.setState({
                pieData: pieData
            });
        }
    }

    render() {
        const chartConfig = {
            backgroundColor: '#e26a00',
            backgroundGradientFrom: '#fb8c00',
            backgroundGradientTo: '#ffa726',
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`
        };


        return (
            <PieChart
                data={this.state.pieData}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor="cases"
                backgroundColor="transparent"
                absolute={true}
            />
        )
    }

}

export default Graph