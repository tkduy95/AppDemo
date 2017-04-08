/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Text,
  Navigator,
  TouchableOpacity,
  StyleSheet,
  AppRegistry,
  ListView,
  View,
  TextInput,
  Picker,
  Alert
} from 'react-native';

export default class AwesomeProject extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      routes: [
        {
          title: 'Information of Rate',
          content: [
            {
              id: 'AUD',
              name: 'AUST.DOLLAR',
              buyCash: 17131.72,
              buyTransfer: 17235.13,
              sell: 17388.85
            },
            {
              id: 'CAD',
              name: 'CANADIAN DOLLAR',
              buyCash: 16816.44,
              buyTransfer: 16969.16,
              sell: 17189.13
            },
            {
              id: 'CHF',
              name: 'SWISS FRANCE',
              buyCash: 22407.14,
              buyTransfer: 22565.10,
              sell: 22857.61
            },
            {
              id: 'DKK',
              name: 'DANISH KRONE',
              buyCash: null,
              buyTransfer: 3215.69,
              sell: 3316.55
            },
            {
              id: 'EUR',
              name: 'EURO',
              buyCash: 24101.49,
              buyTransfer: 24174.01,
              sell: 24389.62
            },
            {
              id: 'GBP',
              name: 'BRITISH POUND',
              buyCash: 28186.19,
              buyTransfer: 28384.88,
              sell: 28638.05
            },
            {
              id: 'HKD',
              name: 'HONGKONG DOLLAR',
              buyCash: 2884.09,
              buyTransfer: 2904.42,
              sell: 2947.96
            },
            {
              id: 'INR',
              name: 'INDIAN RUPEE',
              buyCash: null,
              buyTransfer: 349.80,
              sell: 363.53
            },
            {
              id: 'JPY',
              name: 'JAPANESE YEN',
              buyCash: 201.34,
              buyTransfer: 203.37,
              sell: 205.19
            },
            {
              id: 'KRW',
              name: 'SOUTH KOREAN WON',
              buyCash: 18.85,
              buyTransfer: 19.84,
              sell: 21.08
            },
            {
              id: 'KWD',
              name: 'KUWAITI DINAR',
              buyCash: null,
              buyTransfer: 74497.97,
              sell: 77422.43
            },
            {
              id: 'MYR',
              name: 'MALAYSIAN RINGGIT',
              buyCash: null,
              buyTransfer: 5107.24,
              sell: 5173.45
            },
            {
              id: 'NOK',
              name: 'NORWEGIAN KRONER',
              buyCash: null,
              buyTransfer: 2610.58,
              sell: 2692.46
            },
            {
              id: 'RUB',
              name: 'RUSSIAN RUBLE',
              buyCash: null,
              buyTransfer: 367.51,
              sell: 449.57
            },
            {
              id: 'SAR',
              name: 'SAUDI RIAL',
              buyCash: null,
              buyTransfer: 6049.07,
              sell: 6286.53
            },
            {
              id: 'SEK',
              name: 'SWEDISH KRONA',
              buyCash: null,
              buyTransfer: 2509.58,
              sell: 2572.80
            },
            {
              id: 'SGD',
              name: 'SINGAPORE DOLLAR',
              buyCash: 16086.67,
              buyTransfer: 16200.07,
              sell: 16377.28
            },
            {
              id: 'THB',
              name: 'THAI BAHT',
              buyCash: 649.69,
              buyTransfer: 649.69,
              sell: 676.80
            },
            {
              id: 'USD',
              name: 'US DOLLAR',
              buyCash: 22700.00,
              buyTransfer: 22700.00,
              sell: 22770.00
            },
          ],
          index: 0
        },
        {
          title: 'Currency conversion',
          index: 1
        },
      ],
      dataInfor: ds.cloneWithRows([]),
      currencyFromValue: 0,
      currencyFrom: 'aed',
      currencyTo: 'aed',
      currencyToValue: 0
    };
  }
  componentDidMount() {
    this.setState({ dataInfor: this.state.dataInfor.cloneWithRows(this.state.routes[0].content) })
  }
  convertCurrency() {
    let from = this.state.currencyFrom
    let to = this.state.currencyTo
    let valueTo = this.state.currencyFromValue
    let url = 'http://free.currencyconverterapi.com/api/v3/convert?q=' + from + '_' + to
    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }
    }).then((response) => response.json())
      .then((responseJson) => Object.values(responseJson.results)[0].val)
      .then((data) => {
        this.setState({ currencyToValue: valueTo * data })
      }).catch((error) => {
        console.error(error);
      });
  }

  render() {
    return (
      <Navigator
        initialRoute={this.state.routes[0]}
        initialRouteStack={this.state.routes}
        renderScene={(route, navigator) => {
          if (route.index === 0) {
            return (
              <View style={styles.listInfor}>
                <View style={styles.itemListInfor}>
                  <Text style={styles.itemCode}>Code</Text>
                  <Text style={styles.itemName}>Name</Text>
                  <Text style={styles.itemCash}>Cash</Text>
                  <Text style={styles.itemTransfer}>Transfer</Text>
                  <Text style={styles.itemSell}>Sell</Text>
                </View>
                <ListView
                  dataSource={this.state.dataInfor}
                  renderRow={(rowData) =>
                    <View style={styles.itemListInfor}>
                      <Text style={styles.itemCode}>{rowData.id}</Text>
                      <Text style={styles.itemName}>{rowData.name}</Text>
                      <Text style={styles.itemCash}>{rowData.buyCash}</Text>
                      <Text style={styles.itemTransfer}>{rowData.buyTransfer}</Text>
                      <Text style={styles.itemSell}>{rowData.sell}</Text>
                    </View>
                  }
                />
              </View>
            )
          } 
        }}
        configureScene={(route, routeStack) =>
          Navigator.SceneConfigs.FadeAndroid}
        navigationBar={
          <Navigator.NavigationBar
            routeMapper={{
              LeftButton: (route, navigator, index, navState) => {
                if (route.index === 0) {
                  return (
                    <TouchableOpacity onPress={() => navigator.push(this.state.routes[index + 1])}>
                      <Text style={styles.barButton}> Next</Text>
                    </TouchableOpacity>);
                } else {
                  return (
                    <TouchableOpacity onPress={() => navigator.pop()}>
                      <Text style={styles.barButton}>Back</Text>
                    </TouchableOpacity>
                  );
                }
              },
              RightButton: (route, navigator, index, navState) =>
              { return null; },
              Title: (route, navigator, index, navState) =>
              { return (<Text style={styles.barTitle}>{route.title}</Text>); },
            }}
            style={styles.navigation}
          />
        }
        style={styles.screen}
      />
    );
  }
}

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: 'cornflowerblue'
  },
  barTitle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  barButton: {
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: 'white'
  },
  screen: {
    paddingTop: 60
  },
  listInfor: {
    flex: 1,
    margin: 10
  },
  itemListInfor: {
    flexDirection: 'row'
  },
  itemCode: {
    flex: 0.2,
    padding: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'blue',
    borderTopWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1
  },
  itemName: {
    flex: 0.5,
    padding: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'blue',
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  itemCash: {
    flex: 0.5,
    padding: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'blue',
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  itemTransfer: {
    flex: 0.5,
    padding: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'blue',
    borderTopWidth: 1,
    borderRightWidth: 1,
  }
  ,
  itemSell: {
    flex: 0.5,
    padding: 2,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderColor: 'blue',
    borderTopWidth: 1,
    borderRightWidth: 1,
  },
  convertionContainer: {
    flex: 1,
    margin: 20
  },
  currencyValue: {
    textAlign: 'center',
    padding: 50
  },
  buttonConvert: {
    backgroundColor: 'blue',
    width: 100, height: 50
  }
});

AppRegistry.registerComponent('AwesomeProject', () => AwesomeProject);
