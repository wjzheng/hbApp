/**
 * Created by kim on 2017/6/5.
 */
import React, {Component} from "react";
import {Button, DeviceEventEmitter, Keyboard, StyleSheet, TextInput, View} from "react-native";
import Toast from "@remobile/react-native-toast";
import {ComponentStyles} from "../style";

import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as userAction from "../action/user";
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      login: '18016052872',
      password: ''
    }
  }

  componentWillMount() {

  }

  componentWillReceiveProps(nextProps) {
    let {user, navigation} = nextProps;
    if (user.res && user.res.code === 0) {
      if (user.res.isSuc) {
        DeviceEventEmitter.emit('login', true);
        navigation.goBack()
      } else {
        Toast.show('密码错误');
      }
    }
  }

  doLogin() {
    let {password, login} = this.state;
    if (!password) {
      Toast.show('请输入密码')
      return
    }
    const {userAction} = this.props;
    userAction.login(login, password);
    Keyboard.dismiss();
  }

  render() {
    return (
      <View style={ ComponentStyles.container }>
        <TextInput style={ComponentStyles.input_control}
                   placeholder="请输入账户"
                   keyboardType="email-address"
                   onChangeText={(text) => this.setState({'login': text})}
                   defaultValue={this.state.login}
                   placeholderTextColor="red"
          // value={this.state.login}
        />
        <TextInput style={ComponentStyles.input_control}
                   placeholder="请输入密码"
                   secureTextEntry={true}
                   onChangeText={(text) => this.setState({'password': text})}
          // value={this.state.password}
        />
        <Button onPress={this.doLogin.bind(this)} title='登录' style={ComponentStyles.btn_block}/>
        {/*{this.renderMask()}*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  mask: {
    backgroundColor: 'red',
    opacity: 0.25
  }
});

export default connect(state => ({
  user: state.user
}), dispatch => ({
  userAction: bindActionCreators(userAction, dispatch)
}))(Login)