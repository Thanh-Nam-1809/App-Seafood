import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState, useContext} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {isValidEmail, isValidPassword} from '../../../constants/Validations';
import {hardData} from '../../../constants';
const {COLORS, FONTSIZES, IMAGES} = hardData;

import {UserContext} from '../UserContext';

export default function ConfirmPassword(props) {
  const {navigation} = props;
  const {navigate, goBack} = navigation;
  const {onConfirmPassword} = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [errorComfirmPassword, setErrorComfirmPassword] = useState('');
  const [comfirmPasswordVisible, setcomfirmPasswordVisible] = useState(true);

  const isValidationOk = () =>
    email.length > 0 &&
    password.length > 0 &&
    comfirmPassword.length > 0 &&
    isValidEmail(email) === true &&
    isValidPassword(password) === true &&
    password.length === comfirmPassword.length;

  const confirm_Password = async () => {
    const res = await onConfirmPassword(email, password, comfirmPassword);
    res === true
      ? (ToastAndroid.show('Đổi mật khẩu thanh cong', ToastAndroid.CENTER),
        navigate('Login'))
      : ToastAndroid.show('Đổi mật khẩu khong thanh cong', ToastAndroid.CENTER);
  };

  const isValidationPasswordEye = () => password.length > 0;
  const isValidationComfirmPasswordEye = () => comfirmPassword.length > 0;

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
              {isValidationPasswordEye() === true ? (
                <Icon
                  disabled={isValidationPasswordEye() === false}
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

          <View>
            <Text style={styles.txtPassword}>Comfirm Password:</Text>
            <View style={styles.textInputContainer}>
              <Icon
                name="lock"
                style={styles.icon}
                size={20}
                color={COLORS.white}
              />
              <TextInput
                onChangeText={text => {
                  setErrorComfirmPassword(
                    text.length > 0
                      ? comfirmPassword === text
                        ? ''
                        : 'Invalid confirmation password!'
                      : 'Cannot to blank!',
                  );
                  setComfirmPassword(text);
                }}
                style={styles.txtinputPassword}
                value={comfirmPassword}
                secureTextEntry={comfirmPasswordVisible}
                placeholder="Enter your confirm password"
                placeholderTextColor="#93C3FF"
              />
              {isValidationComfirmPasswordEye() === true ? (
                <Icon
                  disabled={isValidationComfirmPasswordEye() === false}
                  name={comfirmPasswordVisible ? 'eye' : 'eye-slash'}
                  size={20}
                  onPress={() =>
                    setcomfirmPasswordVisible(!comfirmPasswordVisible)
                  }
                />
              ) : (
                ''
              )}
            </View>

            <Text style={styles.errorPassword}>{errorComfirmPassword}</Text>
          </View>
        </View>

        <View style={styles.containerBottom}>
          <TouchableOpacity
            disabled={isValidationOk() === false}
            onPress={confirm_Password}
            style={[
              styles.btnLogin,
              {
                backgroundColor:
                  isValidationOk() === true ? COLORS.white : COLORS.text,
              },
            ]}>
            <Text style={styles.txtLogin}>Submit</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => goBack()} style={styles.btnLogin2}>
            <Text style={styles.txtLogin}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  icon: {
    padding: 8,
  },
  txtLogin: {
    padding: 8,
    fontSize: FONTSIZES.h2,
    fontWeight: '600',
    color: COLORS.background,
  },
  btnLogin2: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 18,
    backgroundColor: COLORS.white,
    marginLeft: 4,
  },
  btnLogin: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    borderRadius: 18,
    marginRight: 4,
  },
  containerBottom: {
    flex: 20,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 24,
  },
  errorPassword: {
    color: 'red',
    fontSize: FONTSIZES.h6,
    marginBottom: 10,
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
    marginBottom: 10,
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
