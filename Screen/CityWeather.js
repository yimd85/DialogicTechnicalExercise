import React, { Component } from 'react';
import { View } from 'react-native';
import { Text, Card, Button, Header, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import axios from 'axios';

class CityWeather extends Component {
    state = {};

    componentWillMount() {
        axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=60afea3590031181d52028e97285a22f&q=${this.props.shitty.name},us&cnt=9&units=imperial`)
            .then(response => this.setState({ 
                todayTemp: response.data.list[0].main.temp.toFixed(0),  
                todayTempMin: response.data.list[0].main.temp_min.toFixed(0),  
                todayTempMax: response.data.list[0].main.temp_max.toFixed(0),  
                todayDesc: response.data.list[0].weather[0].description.toUpperCase(), 
                todayWind: response.data.list[0].wind.speed, 
                tommorrowTemp: response.data.list[8].main.temp.toFixed(0),  
                tommorrowDesc: response.data.list[8].weather[0].description.toUpperCase(), 
                tommorrowWind: response.data.list[8].wind.speed, 
                tommorrowTempMin: response.data.list[8].main.temp_min.toFixed(0),  
                tommorrowTempMax: response.data.list[8].main.temp_max.toFixed(0),  
            }))
            .catch(() => { console.log('could not get')});
    }

    componentDidMount() {
        this.refreshWeather = setInterval( function () {
            console.log(this.state);
            axios.get(`https://api.openweathermap.org/data/2.5/forecast?appid=60afea3590031181d52028e97285a22f&q=${this.props.shitty.name},us&cnt=9&units=imperial`)
                .then(response => this.setState({ 
                    todayTemp: response.data.list[0].main.temp.toFixed(0),  
                    todayTempMin: response.data.list[0].main.temp_min.toFixed(0),  
                    todayTempMax: response.data.list[0].main.temp_max.toFixed(0),  
                    todayDesc: response.data.list[0].weather[0].description.toUpperCase(), 
                    todayWind: response.data.list[0].wind.speed, 
                    tommorrowTemp: response.data.list[8].main.temp.toFixed(0),  
                    tommorrowDesc: response.data.list[8].weather[0].description.toUpperCase(), 
                    tommorrowWind: response.data.list[8].wind.speed, 
                    tommorrowTempMin: response.data.list[8].main.temp_min.toFixed(0),  
                    tommorrowTempMax: response.data.list[8].main.temp_max.toFixed(0),  
                }))
                .catch(() => { console.log('could not get')});
        }.bind(this), 600000);
    }

    componentWillUnmount() {
        clearInterval(this.refreshWeather);
        this.refreshWeather = false;
    }

    // backtoLanding = async () => {
    //     await this.props.navigation.navigate('WeatherLanding');
    // }

    render() {        
        return (
            <View>
                <Header 
                centerComponent={{ text: 'My Weather App', style: { color: '#fff' } }}
                // rightComponent={{ 
                //     icon: 'home', 
                //     color: '#fff',
                //     // onPress: this.deleteStore.bind(this)
                //     onPress: () => this.props.navigation.navigate('WeatherLanding')
                // }}
                />
                <Card
                    title={this.props.shitty.name}
                    image={{ uri: this.props.shitty.avatar }}
                >
                    <Text style={{marginBottom: 5, fontSize: 40}}>
                        {this.state.todayTemp}° F 
                    </Text>
                    <Text style={{marginBottom: 5}}>
                        {this.state.todayDesc}
                    </Text>
                    <Text style={{marginBottom: 5}}>
                       High: {this.state.todayTempMax}° | Low: {this.state.todayTempMin}° 
                    </Text>
                    <Text style={{marginBottom: 5}}>
                        Winds at {this.state.todayWind} MPH 
                    </Text>
                    <Text style={{marginBottom: 5, marginTop: 20, fontSize: 25}}>
                        Tomorrow
                    </Text>
                    <Text style={{marginBottom: 5, fontSize: 20}}>
                        {this.state.tommorrowTemp}° F 
                    </Text>
                    <Text style={{marginBottom: 5}}>
                        {this.state.tommorrowDesc}
                    </Text>
                    <Text style={{marginBottom: 5}}>
                       High: {this.state.tommorrowTempMax}° | Low: {this.state.tommorrowTempMin}° 
                    </Text>
                    <Text style={{marginBottom: 5}}>
                        Winds at {this.state.tommorrowWind} MPH
                    </Text>
                </Card>
                <Button
                    icon={<Icon name='code' color='#ffffff' />}
                    backgroundColor='#03A9F4'
                    buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                    title='Back To List'
                    onPress={() => this.props.navigation.navigate('WeatherLanding')}
                />
            </View>
        );
    }
}

function mapStateToProps(state){
    return {
        shitty: state.CityReducers
    }
}

export default connect(mapStateToProps)(CityWeather);
