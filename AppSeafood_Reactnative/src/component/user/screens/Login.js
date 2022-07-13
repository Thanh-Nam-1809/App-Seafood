import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ToastAndroid,
} from 'react-native';
import React, {useState, useContext} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {isValidEmail, isValidPassword} from '../../../constants/Validations';
import {hardData} from '../../../constants';
const {COLORS, FONTSIZES, IMAGES} = hardData;

import {UserContext} from '../UserContext';

export default function Login(props) {
  const {navigation} = props;
  const {navigate} = navigation;
  const {onLogin} = useContext(UserContext);

  const [email, setEmail] = useState('vothanhnam@gmail.com');
  const [password, setPassword] = useState('123456789');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);

  const login = async () => {
    const res = await onLogin(email, password);
    res === false
      ? ToastAndroid.show('Login unsuccessful!', ToastAndroid.CENTER)
      : ToastAndroid.show('Logged in successfully', ToastAndroid.CENTER);
  };

  const isValidationOk = () =>
    email.length > 0 &&
    password.length > 0 &&
    isValidEmail(email) === true &&
    isValidPassword(password) === true;

  const isValidationEye = () => password.length > 0;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.containerTop}>
          <Image style={styles.imageLogo} source={IMAGES.Logo} />
        </View>
        <View style={styles.containerCenter}>
          <View>
            <Text style={styles.txtEmail}>Email:</Text>
            <View>
              <View style={styles.textInputContainer}>
                <Icon
                  name="envelope"
                  style={styles.icon}
                  size={20}
                  color={COLORS.white}
                />
                <TextInput
                  onChangeText={text => {
                    setErrorEmail(
                      text.length > 0
                        ? isValidEmail(text) === true
                          ? ''
                          : 'Please enter correct Email!'
                        : 'Cannot to blank!',
                    );
                    setEmail(text);
                  }}
                  style={styles.txtinputEmail}
                  placeholder="HyNam@gmail.com"
                  placeholderTextColor="#93C3FF"
                  value={email}
                  keyboardType="email-address"
                />
              </View>

              <Text style={styles.errorEmail}>{errorEmail}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.txtPassword}>Password:</Text>
            <View style={styles.textInputContainer}>
              <Icon
                name="lock"
                style={styles.icon}
                size={20}
                color={COLORS.white}
              />
              <TextInput
                onChangeText={text => {
                  setErrorPassword(
                    text.length > 0
                      ? isValidPassword(text) === true
                        ? ''
                        : 'Passwords over 6 characters!'
                      : 'Cannot to blank!',
                  );
                  setPassword(text);
                }}
                style={styles.txtinputPassword}
                value={password}
                secureTextEntry={passwordVisible}
                placeholder="Enter your password"
                placeholderTextColor="#93C3FF"
              />
              {isValidationEye() === true ? (
                <Icon
                  disabled={isValidationEye() === false}
                  name={passwordVisible ? 'eye' : 'eye-slash'}
                  size={20}
                  onPress={() => setPasswordVisible(!passwordVisible)}
                />
              ) : (
                ''
              )}
            </View>

            <Text style={styles.errorPassword}>{errorPassword}</Text>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <View style={styles.txtForgotPassContainer}>
            <TouchableOpacity onPress={() => navigate('ConfirmPassword')}>
              <Text style={styles.txtForgotPass}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            disabled={isValidationOk() === false}
            onPress={login}
            style={[
              styles.btnLogin,
              {
                backgroundColor:
                  isValidationOk() === true ? COLORS.white : COLORS.text,
              },
            ]}>
            <Text style={styles.txtLogin}>Login</Text>
          </TouchableOpacity>

          <View style={styles.siguUpContainer}>
            <Text style={styles.txtRegister}>Don't have an Account?</Text>
            <TouchableOpacity
              onPress={() => navigate('Register')}
              style={styles.btnRegister}>
              <Text style={styles.txtRegister2}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 8,
  },
  txtRegister2: {
    fontWeight: 'bold',
    fontSize: FONTSIZES.h6,
    color: COLORS.white,
  },
  txtRegister: {
    fontSize: FONTSIZES.h6,
    color: COLORS.white,
    alignSelf: 'center',
  },
  btnRegister: {padding: 5},
  siguUpContainer: {
    flexDirection: 'row',
    marginVertical: 40,
  },
  txtLogin: {
    padding: 8,
    fontSize: FONTSIZES.h2,
    fontWeight: '600',
    color: COLORS.background,
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    alignSelf: 'center',
    borderRadius: 18,
  },
  txtForgotPass: {
    color: COLORS.white,
    fontSize: FONTSIZES.h5,
    marginBottom: 10,
    alignSelf: 'flex-end',
  },
  txtForgotPassContainer: {
    width: '100%',
  },
  containerBottom: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  errorPassword: {
    color: 'red',
    fontSize: FONTSIZES.h6,
    marginBottom: 5,
  },
  txtinputPassword: {
    color: 'black',
    width: '80%',
  },
  txtPassword: {
    color: COLORS.white,
    fontSize: FONTSIZES.h4,
    fontWeight: '600',
    marginBottom: 5,
  },
  containerCenter: {
    flex: 30,
    paddingHorizontal: 24,
  },
  txtEmail: {
    color: COLORS.white,
    fontSize: FONTSIZES.h4,
    fontWeight: '600',
    marginBottom: 5,
  },
  errorEmail: {
    color: COLORS.error,
    fontSize: FONTSIZES.h6,
    marginBottom: 15,
  },
  txtinputEmail: {
    color: 'black',
  },
  textInputContainer: {
    backgroundColor: '#69A7F0',
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  containerTop: {
    flex: 30,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  imageLogo: {
    width: 350,
    height: 350,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
