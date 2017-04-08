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
          } else {
            return (
              <View style={styles.convertionContainer}>
                <TextInput
                  style={{ height: 40 }}
                  placeholder="Type currency value to convert here!"
                  keyboardType="numeric"
                  onChangeText={(text) => this.setState({ currencyFromValue: Number(text) })}
                />
                <View>
                  <Text>From</Text>
                  <Picker
                    selectedValue={this.state.currencyFrom}
                    onValueChange={(from) => this.setState({ currencyFrom: from })}>
                    <Picker.Item label="AED" value="aed" />
                    <Picker.Item label="AFN" value="afn" />
                    <Picker.Item label="ALL" value="all" />
                    <Picker.Item label="AMD" value="amd" />
                    <Picker.Item label="ANG" value="ang" />
                    <Picker.Item label="AOA" value="aoa" />
                    <Picker.Item label="ARS" value="ars" />
                    <Picker.Item label="AUD" value="aud" />
                    <Picker.Item label="AWG" value="awg" />
                    <Picker.Item label="AZN" value="azn" />
                    <Picker.Item label="BAM" value="bam" />
                    <Picker.Item label="BBD" value="bbd" />
                    <Picker.Item label="BDT" value="bdt" />
                    <Picker.Item label="BGN" value="bgn" />
                    <Picker.Item label="BHD" value="bhd" />
                    <Picker.Item label="BIF" value="bif" />
                    <Picker.Item label="BND" value="bnd" />
                    <Picker.Item label="BOB" value="bob" />
                    <Picker.Item label="BRL" value="brl" />
                    <Picker.Item label="BSD" value="bsd" />
                    <Picker.Item label="BTC" value="btc" />
                    <Picker.Item label="BTN" value="btn" />
                    <Picker.Item label="BWP" value="bwp" />
                    <Picker.Item label="BYR" value="byr" />
                    <Picker.Item label="BZD" value="bzd" />
                    <Picker.Item label="CAD" value="cad" />
                    <Picker.Item label="CDF" value="cdf" />
                    <Picker.Item label="CHF" value="chf" />
                    <Picker.Item label="CLP" value="clp" />
                    <Picker.Item label="CNY" value="cny" />
                    <Picker.Item label="COP" value="cop" />
                    <Picker.Item label="CRC" value="crc" />
                    <Picker.Item label="CUP" value="cup" />
                    <Picker.Item label="CVE" value="cve" />
                    <Picker.Item label="CZK" value="czk" />
                    <Picker.Item label="DJF" value="djf" />
                    <Picker.Item label="DKK" value="dkk" />
                    <Picker.Item label="DOP" value="dop" />
                    <Picker.Item label="DZD" value="dzd" />
                    <Picker.Item label="EGP" value="egp" />
                    <Picker.Item label="ERN" value="ern" />
                    <Picker.Item label="ETB" value="etb" />
                    <Picker.Item label="EUR" value="eur" />
                    <Picker.Item label="FJD" value="fjd" />
                    <Picker.Item label="FKP" value="fkp" />
                    <Picker.Item label="GBP" value="gbp" />
                    <Picker.Item label="GEL" value="gel" />
                    <Picker.Item label="GHS" value="ghs" />
                    <Picker.Item label="GIP" value="gip" />
                    <Picker.Item label="GMD" value="gmd" />
                    <Picker.Item label="GNF" value="gnf" />
                    <Picker.Item label="GTQ" value="gtq" />
                    <Picker.Item label="GYD" value="gyd" />
                    <Picker.Item label="HKD" value="hkd" />
                    <Picker.Item label="HNL" value="hnl" />
                    <Picker.Item label="HRK" value="hrk" />
                    <Picker.Item label="HTG" value="htg" />
                    <Picker.Item label="HUF" value="huf" />
                    <Picker.Item label="IDR" value="idr" />
                    <Picker.Item label="ILS" value="ils" />
                    <Picker.Item label="INR" value="inr" />
                    <Picker.Item label="IQD" value="iqd" />
                    <Picker.Item label="IRR" value="irr" />
                    <Picker.Item label="ISK" value="isk" />
                    <Picker.Item label="JMD" value="jmd" />
                    <Picker.Item label="JOD" value="jod" />
                    <Picker.Item label="JPY" value="jpy" />
                    <Picker.Item label="KES" value="kes" />
                    <Picker.Item label="KGS" value="kgs" />
                    <Picker.Item label="KHR" value="khr" />
                    <Picker.Item label="KMF" value="kmf" />
                    <Picker.Item label="KPW" value="kpw" />
                    <Picker.Item label="KRW" value="krw" />
                    <Picker.Item label="KWD" value="kwd" />
                    <Picker.Item label="KYD" value="kyd" />
                    <Picker.Item label="KZT" value="kzt" />
                    <Picker.Item label="LAK" value="lak" />
                    <Picker.Item label="LBP" value="lbp" />
                    <Picker.Item label="LKR" value="lkr" />
                    <Picker.Item label="LRD" value="lrd" />
                    <Picker.Item label="LSL" value="lsl" />
                    <Picker.Item label="LVL" value="lvl" />
                    <Picker.Item label="LYD" value="lyd" />
                    <Picker.Item label="MAD" value="mad" />
                    <Picker.Item label="MDL" value="mdl" />
                    <Picker.Item label="MGA" value="mga" />
                    <Picker.Item label="MKD" value="mkd" />
                    <Picker.Item label="MMK" value="mmk" />
                    <Picker.Item label="MNT" value="mnt" />
                    <Picker.Item label="MOP" value="mop" />
                    <Picker.Item label="MRO" value="mro" />
                    <Picker.Item label="MUR" value="mur" />
                    <Picker.Item label="MVR" value="mvr" />
                    <Picker.Item label="MWK" value="mwk" />
                    <Picker.Item label="MXN" value="mxn" />
                    <Picker.Item label="MYR" value="myr" />
                    <Picker.Item label="MZN" value="mzn" />
                    <Picker.Item label="NAD" value="nad" />
                    <Picker.Item label="NGN" value="ngn" />
                    <Picker.Item label="NIO" value="nio" />
                    <Picker.Item label="NOK" value="nok" />
                    <Picker.Item label="NPR" value="npr" />
                    <Picker.Item label="NZD" value="nzd" />
                    <Picker.Item label="OMR" value="omr" />
                    <Picker.Item label="PAB" value="pab" />
                    <Picker.Item label="PEN" value="pen" />
                    <Picker.Item label="PGK" value="pgk" />
                    <Picker.Item label="PHP" value="php" />
                    <Picker.Item label="PKR" value="pkr" />
                    <Picker.Item label="PLN" value="pln" />
                    <Picker.Item label="PYG" value="pyg" />
                    <Picker.Item label="QAR" value="qar" />
                    <Picker.Item label="RON" value="ron" />
                    <Picker.Item label="RSD" value="rsd" />
                    <Picker.Item label="RUB" value="rub" />
                    <Picker.Item label="RWF" value="rwf" />
                    <Picker.Item label="SAR" value="sar" />
                    <Picker.Item label="SBD" value="sbd" />
                    <Picker.Item label="SCR" value="scr" />
                    <Picker.Item label="SDG" value="sdg" />
                    <Picker.Item label="SEK" value="sek" />
                    <Picker.Item label="SGD" value="sgd" />
                    <Picker.Item label="SHP" value="shp" />
                    <Picker.Item label="SLL" value="sll" />
                    <Picker.Item label="SOS" value="sos" />
                    <Picker.Item label="SRD" value="srd" />
                    <Picker.Item label="STD" value="std" />
                    <Picker.Item label="SYP" value="syp" />
                    <Picker.Item label="SZL" value="szl" />
                    <Picker.Item label="THB" value="thb" />
                    <Picker.Item label="TJS" value="tjs" />
                    <Picker.Item label="TMT" value="tmt" />
                    <Picker.Item label="TND" value="tnd" />
                    <Picker.Item label="TOP" value="top" />
                    <Picker.Item label="TRY" value="try" />
                    <Picker.Item label="TTD" value="ttd" />
                    <Picker.Item label="TWD" value="twd" />
                    <Picker.Item label="TZS" value="tzs" />
                    <Picker.Item label="UAH" value="uah" />
                    <Picker.Item label="UGX" value="ugx" />
                    <Picker.Item label="USD" value="usd" />
                    <Picker.Item label="UYU" value="uyu" />
                    <Picker.Item label="UZS" value="uzs" />
                    <Picker.Item label="VEF" value="vef" />
                    <Picker.Item label="VND" value="vnd" />
                    <Picker.Item label="VUV" value="vuv" />
                    <Picker.Item label="WST" value="wst" />
                    <Picker.Item label="XAF" value="xaf" />
                    <Picker.Item label="XCD" value="xcd" />
                    <Picker.Item label="XDR" value="xdr" />
                    <Picker.Item label="XOF" value="xof" />
                    <Picker.Item label="XPF" value="xpf" />
                    <Picker.Item label="YER" value="yer" />
                    <Picker.Item label="ZAR" value="zar" />
                    <Picker.Item label="ZMW" value="zmw" />
                  </Picker>
                  <Text>To</Text>
                  <Picker
                    selectedValue={this.state.currencyTo}
                    onValueChange={(to) => this.setState({ currencyTo: to })}>
                    <Picker.Item label="AED" value="aed" />
                    <Picker.Item label="AFN" value="afn" />
                    <Picker.Item label="ALL" value="all" />
                    <Picker.Item label="AMD" value="amd" />
                    <Picker.Item label="ANG" value="ang" />
                    <Picker.Item label="AOA" value="aoa" />
                    <Picker.Item label="ARS" value="ars" />
                    <Picker.Item label="AUD" value="aud" />
                    <Picker.Item label="AWG" value="awg" />
                    <Picker.Item label="AZN" value="azn" />
                    <Picker.Item label="BAM" value="bam" />
                    <Picker.Item label="BBD" value="bbd" />
                    <Picker.Item label="BDT" value="bdt" />
                    <Picker.Item label="BGN" value="bgn" />
                    <Picker.Item label="BHD" value="bhd" />
                    <Picker.Item label="BIF" value="bif" />
                    <Picker.Item label="BND" value="bnd" />
                    <Picker.Item label="BOB" value="bob" />
                    <Picker.Item label="BRL" value="brl" />
                    <Picker.Item label="BSD" value="bsd" />
                    <Picker.Item label="BTC" value="btc" />
                    <Picker.Item label="BTN" value="btn" />
                    <Picker.Item label="BWP" value="bwp" />
                    <Picker.Item label="BYR" value="byr" />
                    <Picker.Item label="BZD" value="bzd" />
                    <Picker.Item label="CAD" value="cad" />
                    <Picker.Item label="CDF" value="cdf" />
                    <Picker.Item label="CHF" value="chf" />
                    <Picker.Item label="CLP" value="clp" />
                    <Picker.Item label="CNY" value="cny" />
                    <Picker.Item label="COP" value="cop" />
                    <Picker.Item label="CRC" value="crc" />
                    <Picker.Item label="CUP" value="cup" />
                    <Picker.Item label="CVE" value="cve" />
                    <Picker.Item label="CZK" value="czk" />
                    <Picker.Item label="DJF" value="djf" />
                    <Picker.Item label="DKK" value="dkk" />
                    <Picker.Item label="DOP" value="dop" />
                    <Picker.Item label="DZD" value="dzd" />
                    <Picker.Item label="EGP" value="egp" />
                    <Picker.Item label="ERN" value="ern" />
                    <Picker.Item label="ETB" value="etb" />
                    <Picker.Item label="EUR" value="eur" />
                    <Picker.Item label="FJD" value="fjd" />
                    <Picker.Item label="FKP" value="fkp" />
                    <Picker.Item label="GBP" value="gbp" />
                    <Picker.Item label="GEL" value="gel" />
                    <Picker.Item label="GHS" value="ghs" />
                    <Picker.Item label="GIP" value="gip" />
                    <Picker.Item label="GMD" value="gmd" />
                    <Picker.Item label="GNF" value="gnf" />
                    <Picker.Item label="GTQ" value="gtq" />
                    <Picker.Item label="GYD" value="gyd" />
                    <Picker.Item label="HKD" value="hkd" />
                    <Picker.Item label="HNL" value="hnl" />
                    <Picker.Item label="HRK" value="hrk" />
                    <Picker.Item label="HTG" value="htg" />
                    <Picker.Item label="HUF" value="huf" />
                    <Picker.Item label="IDR" value="idr" />
                    <Picker.Item label="ILS" value="ils" />
                    <Picker.Item label="INR" value="inr" />
                    <Picker.Item label="IQD" value="iqd" />
                    <Picker.Item label="IRR" value="irr" />
                    <Picker.Item label="ISK" value="isk" />
                    <Picker.Item label="JMD" value="jmd" />
                    <Picker.Item label="JOD" value="jod" />
                    <Picker.Item label="JPY" value="jpy" />
                    <Picker.Item label="KES" value="kes" />
                    <Picker.Item label="KGS" value="kgs" />
                    <Picker.Item label="KHR" value="khr" />
                    <Picker.Item label="KMF" value="kmf" />
                    <Picker.Item label="KPW" value="kpw" />
                    <Picker.Item label="KRW" value="krw" />
                    <Picker.Item label="KWD" value="kwd" />
                    <Picker.Item label="KYD" value="kyd" />
                    <Picker.Item label="KZT" value="kzt" />
                    <Picker.Item label="LAK" value="lak" />
                    <Picker.Item label="LBP" value="lbp" />
                    <Picker.Item label="LKR" value="lkr" />
                    <Picker.Item label="LRD" value="lrd" />
                    <Picker.Item label="LSL" value="lsl" />
                    <Picker.Item label="LVL" value="lvl" />
                    <Picker.Item label="LYD" value="lyd" />
                    <Picker.Item label="MAD" value="mad" />
                    <Picker.Item label="MDL" value="mdl" />
                    <Picker.Item label="MGA" value="mga" />
                    <Picker.Item label="MKD" value="mkd" />
                    <Picker.Item label="MMK" value="mmk" />
                    <Picker.Item label="MNT" value="mnt" />
                    <Picker.Item label="MOP" value="mop" />
                    <Picker.Item label="MRO" value="mro" />
                    <Picker.Item label="MUR" value="mur" />
                    <Picker.Item label="MVR" value="mvr" />
                    <Picker.Item label="MWK" value="mwk" />
                    <Picker.Item label="MXN" value="mxn" />
                    <Picker.Item label="MYR" value="myr" />
                    <Picker.Item label="MZN" value="mzn" />
                    <Picker.Item label="NAD" value="nad" />
                    <Picker.Item label="NGN" value="ngn" />
                    <Picker.Item label="NIO" value="nio" />
                    <Picker.Item label="NOK" value="nok" />
                    <Picker.Item label="NPR" value="npr" />
                    <Picker.Item label="NZD" value="nzd" />
                    <Picker.Item label="OMR" value="omr" />
                    <Picker.Item label="PAB" value="pab" />
                    <Picker.Item label="PEN" value="pen" />
                    <Picker.Item label="PGK" value="pgk" />
                    <Picker.Item label="PHP" value="php" />
                    <Picker.Item label="PKR" value="pkr" />
                    <Picker.Item label="PLN" value="pln" />
                    <Picker.Item label="PYG" value="pyg" />
                    <Picker.Item label="QAR" value="qar" />
                    <Picker.Item label="RON" value="ron" />
                    <Picker.Item label="RSD" value="rsd" />
                    <Picker.Item label="RUB" value="rub" />
                    <Picker.Item label="RWF" value="rwf" />
                    <Picker.Item label="SAR" value="sar" />
                    <Picker.Item label="SBD" value="sbd" />
                    <Picker.Item label="SCR" value="scr" />
                    <Picker.Item label="SDG" value="sdg" />
                    <Picker.Item label="SEK" value="sek" />
                    <Picker.Item label="SGD" value="sgd" />
                    <Picker.Item label="SHP" value="shp" />
                    <Picker.Item label="SLL" value="sll" />
                    <Picker.Item label="SOS" value="sos" />
                    <Picker.Item label="SRD" value="srd" />
                    <Picker.Item label="STD" value="std" />
                    <Picker.Item label="SYP" value="syp" />
                    <Picker.Item label="SZL" value="szl" />
                    <Picker.Item label="THB" value="thb" />
                    <Picker.Item label="TJS" value="tjs" />
                    <Picker.Item label="TMT" value="tmt" />
                    <Picker.Item label="TND" value="tnd" />
                    <Picker.Item label="TOP" value="top" />
                    <Picker.Item label="TRY" value="try" />
                    <Picker.Item label="TTD" value="ttd" />
                    <Picker.Item label="TWD" value="twd" />
                    <Picker.Item label="TZS" value="tzs" />
                    <Picker.Item label="UAH" value="uah" />
                    <Picker.Item label="UGX" value="ugx" />
                    <Picker.Item label="USD" value="usd" />
                    <Picker.Item label="UYU" value="uyu" />
                    <Picker.Item label="UZS" value="uzs" />
                    <Picker.Item label="VEF" value="vef" />
                    <Picker.Item label="VND" value="vnd" />
                    <Picker.Item label="VUV" value="vuv" />
                    <Picker.Item label="WST" value="wst" />
                    <Picker.Item label="XAF" value="xaf" />
                    <Picker.Item label="XCD" value="xcd" />
                    <Picker.Item label="XDR" value="xdr" />
                    <Picker.Item label="XOF" value="xof" />
                    <Picker.Item label="XPF" value="xpf" />
                    <Picker.Item label="YER" value="yer" />
                    <Picker.Item label="ZAR" value="zar" />
                    <Picker.Item label="ZMW" value="zmw" />  
                  </Picker>
                  <Text stype={styles.currencyValue}>{(this.state.currencyToValue !== 0) ? this.state.currencyToValue : ''}</Text>
                  <View stype={styles.buttonConvert}>
                  <TouchableOpacity onPress={this.convertCurrency.bind(this)}>
                    <Text>Convert</Text>
                  </TouchableOpacity>
                  </View>
                </View>
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
