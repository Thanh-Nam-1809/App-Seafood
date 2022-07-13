import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  ToastAndroid,
} from 'react-native';
import React, {useState, useContext} from 'react';

import Icon from 'react-native-vector-icons/FontAwesome5';

import {isValidEmail, isValidPassword} from '../../../constants/Validations';
import {hardData} from '../../../constants';
const {COLORS, FONTSIZES, IMAGES} = hardData;

import {UserContext} from '../UserContext';

export default function Register(props) {
  const {navigation} = props;
  const {navigate, goBack} = navigation;
  const {onRegister} = useContext(UserContext);
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [comfirmPasswordVisible, setcomfirmPasswordVisible] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [comfirmPassword, setComfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [dateOgBirth, setDateOgBirth] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [errorEmail, setErrorEmail] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [errorComfirmPassword, setErrorComfirmPassword] = useState('');
  const [errorName, setErrorName] = useState('');
  const [errorDateOfBirth, setErrorDateOfBirth] = useState('');
  const [errorPhone, setErrorPhone] = useState('');
  const [errorAddress, setErrorAddress] = useState('');

  const [shouldShow, setShouldShow] = useState(false);

  const register = async () => {
    const res = await onRegister(
      email,
      password,
      comfirmPassword,
      name,
      dateOgBirth,
      phone,
      address,
    );
    res === true
      ? (ToastAndroid.show('Change password successfully', ToastAndroid.CENTER),
        navigate('Login'))
      : ToastAndroid.show('Password change failed', ToastAndroid.CENTER);
  };

  const isValidationOk = () =>
    email.length > 0 &&
    password.length > 0 &&
    comfirmPassword.length > 0 &&
    name.length > 0 &&
    dateOgBirth.length > 0 &&
    phone.length > 0 &&
    address.length > 0 &&
    isValidEmail(email) === true &&
    isValidPassword(password) === true &&
    password.length === comfirmPassword.length;

  const isValidationPasswordEye = () => password.length > 0;
  const isValidationComfirmPasswordEye = () => comfirmPassword.length > 0;

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.background} />
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
                  placeholder="Email"
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
                value={password.length.trim}
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
                      ? password === text
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

          <View style={styles.personalInformationContainer}>
            <Icon
              name={!shouldShow ? 'angle-right' : 'angle-down'}
              style={styles.icon}
              size={20}
              color={COLORS.white}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShouldShow(!shouldShow)}>
              <Text style={styles.PersonalInformation}>
                Enter personal information
              </Text>
            </TouchableOpacity>
            <Icon
              name={!shouldShow ? 'angle-left' : 'angle-down'}
              style={styles.icon}
              size={20}
              color={COLORS.white}
            />
          </View>

          {shouldShow ? (
            <View style={styles.productInfoContainer}>
              <View>
                <Text style={styles.txtEmail}>Name:</Text>
                <View>
                  <View style={styles.textInputContainer}>
                    <Icon
                      name="user"
                      style={styles.icon}
                      size={20}
                      color={COLORS.white}
                    />
                    <TextInput
                      onChangeText={text => {
                        setErrorName(text.length > 0 ? '' : 'Cannot to blank!');
                        setName(text);
                      }}
                      style={styles.txtinputEmail}
                      placeholder="Name..."
                      placeholderTextColor="#93C3FF"
                      value={name}
                    />
                  </View>

                  <Text style={styles.errorEmail}>{errorName}</Text>
                </View>
              </View>
              <View>
                <Text style={styles.txtEmail}>Date of birth:</Text>
                <View>
                  <View style={styles.textInputContainer}>
                    <Icon
                      name="calendar"
                      style={styles.icon}
                      size={20}
                      color={COLORS.white}
                    />
                    <TextInput
                      onChangeText={text => {
                        setErrorDateOfBirth(
                          text.length > 0 ? '' : 'Cannot to blank!',
                        );
                        setDateOgBirth(text);
                      }}
                      style={styles.txtinputEmail}
                      placeholder="DD/MM/YYYY"
                      placeholderTextColor="#93C3FF"
                      value={dateOgBirth}
                    />
                  </View>

                  <Text style={styles.errorEmail}>{errorDateOfBirth}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.txtEmail}>Phone:</Text>
                <View>
                  <View style={styles.textInputContainer}>
                    <Icon
                      name="phone"
                      style={styles.icon}
                      size={20}
                      color={COLORS.white}
                    />
                    <TextInput
                      onChangeText={text => {
                        setErrorPhone(
                          text.length > 0 ? '' : 'Cannot to blank!',
                        );
                        setPhone(text);
                      }}
                      style={styles.txtinputEmail}
                      placeholder="039..."
                      placeholderTextColor="#93C3FF"
                      value={phone}
                      keyboardType="phone-pad"
                    />
                  </View>

                  <Text style={styles.errorEmail}>{errorPhone}</Text>
                </View>
              </View>

              <View>
                <Text style={styles.txtEmail}>Address:</Text>
                <View>
                  <View style={styles.textInputContainer}>
                    <Icon
                      name="map"
                      style={styles.icon}
                      size={20}
                      color={COLORS.white}
                    />
                    <TextInput
                      onChangeText={text => {
                        setErrorAddress(
                          text.length > 0 ? '' : 'Cannot to blank!',
                        );
                        setAddress(text);
                      }}
                      style={styles.txtinputEmail}
                      placeholder="Address"
                      placeholderTextColor="#93C3FF"
                      value={address}
                    />
                  </View>

                  <Text style={styles.errorEmail}>{errorAddress}</Text>
                </View>
              </View>
            </View>
          ) : null}
        </View>

        <View style={styles.containerBottom}>
          <TouchableOpacity
            disabled={isValidationOk() === false}
            onPress={register}
            style={[
              styles.btnLogin,
              {
                backgroundColor:
                  isValidationOk() === true ? COLORS.white : COLORS.text,
              },
            ]}>
            <Text style={styles.txtLogin}>Register</Text>
          </TouchableOpacity>

          <View style={styles.siguUpContainer}>
            <Text style={styles.txtRegister}>
              Are you ready to create an account?
            </Text>
            <TouchableOpacity
              onPress={() => goBack()}
              style={styles.btnRegister}>
              <Text style={styles.txtRegister2}>Login</Text>
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
    marginVertical: 15,
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
  containerBottom: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  PersonalInformation: {
    fontSize: FONTSIZES.h1,
    fontWeight: 'bold',
    color: COLORS.white,
  },
  personalInformationContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    flexDirection: 'row',
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
    marginBottom: 5,
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
    width: 300,
    height: 300,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
});
