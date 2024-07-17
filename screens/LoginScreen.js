import React, { useState, useEffect } from 'react';
import { 
    View, 
    Text, 
    TextInput,
    Button, 
    StyleSheet, 
    ActivityIndicator,
    KeyboardAvoidingView,
    TouchableOpacity, 
    Platform,
    SafeAreaView,
 } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { login, fetchUserData } from '../redux/authSlice';
import CustomButton from '../components/CustomButtons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('cityslicka');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      dispatch(fetchUserData(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token, navigation]);

  const handleLogin = () => {
    dispatch(login({ email, password }));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <View style={{flex:0.5}}>
      <View style={{ borderWidth: 1, borderColor: '#E6E6FA', borderRadius: 5, width:40, marginBottom: 20 }}>
          <TouchableOpacity style={{ padding: 5 }} onPress={() => navigation.navigate('Welcome')} >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
        <SafeAreaView style={styles.form}>

            <Text style={styles.title}>Hello Dr!</Text>
            <Text style={styles.titlesub}>Fill your details or continue with social media</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <View style={styles.passwordContainer}>
            <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            secureTextEntry={!showPassword}
            value={password}
            onChangeText={setPassword}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="gray" />
            </TouchableOpacity>
            </View>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <CustomButton title="Login" onPress={handleLogin} />
                
            )}
            {error && <Text style={styles.error}>{error.error || 'Login failed. Please check your credentials and try again.'}</Text>}
            <View style={styles.containerss}>
              <View style={styles.lines}></View>
              <Text style={styles.texts}>Or sign in with</Text>
              <View style={styles.lines}></View>
            </View>

        <TouchableOpacity style={styles.regbutton} onPress={() => navigation.navigate('')}>
          <Ionicons name="logo-google" size={24} color="#DB4437" style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>Sign Up with Google </Text>
        </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingTop: 20 }}>
              <Text style={{ color: '#717171' }}>Don't have account?</Text>
              <Button title="Register" onPress={() => navigation.navigate('Register')} />
            </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    backgroundColor: "#f5f5f5",
  },
  form: {
    padding: 20,
    borderRadius: 10,
    // justifyContent:'flex-end',
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
    fontWeight: "bold",
    marginBottom: 20,
  },
  titlesub: {
    fontSize: 17,
    marginBottom: 15,
    color: '#717171',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
  },
  passwordContainer: {
    width: '100%',
    height: 40,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    padding: 5,
  },
  forgotPassword: {
    textAlign: "right",
    marginBottom: 15,
  },
  containerss: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  lines: {
    flex: 1,
    height: 1,
    backgroundColor: '#C2BCBC',
  },
  texts: {
    marginHorizontal: 10,
    color: '#717171',
    fontSize: 16,
  },
  regbutton: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#555555',
    fontSize: 18,
  },
});
