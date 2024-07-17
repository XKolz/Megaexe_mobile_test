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
import { register } from '../redux/authSlice';
import CustomButton from '../components/CustomButtons/CustomButton';
import Ionicons from '@expo/vector-icons/Ionicons';
import { CheckBox } from 'react-native-elements';

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState('eve.holt@reqres.in');
  const [password, setPassword] = useState('pistol');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const { token, loading, error } = useSelector((state) => state.auth);
  const [isChecked, setIsChecked] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if (token) {
      navigation.navigate('Home');
    }
  }, [token, navigation]);

  const handleRegister = () => {
    dispatch(register({ email, password }));
  };

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={Platform.OS === "ios" ? 100 : 0}
      style={styles.container}
    >
      <SafeAreaView style={styles.form}>
        <View style={{ borderWidth: 1, borderColor: '#E6E6FA', borderRadius: 5, width:40, marginTop: 10, marginBottom: 20 }}>
          <TouchableOpacity style={{ alignItems: 'center', padding: 5 }} onPress={() => navigation.navigate('Welcome')} >
            <Ionicons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={styles.title}>Register Account</Text>
        <Text style={styles.titlesub}>Fill your details or continue with social media</Text>
        <TextInput
          style={styles.input}
          placeholder="First name"
          placeholderTextColor="#000000" // Add this line
        />
        <TextInput
          style={styles.input}
          placeholder="Last name"
          placeholderTextColor="#000000" // Add this line
        />
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
        <View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
            <CheckBox
              checked={isChecked}
              onPress={() => setIsChecked(!isChecked)}
            />
            <Text style={{ }}>I accept all the Terms & Conditions</Text>
          </View>
        </View>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <CustomButton title="Register" onPress={handleRegister} />
        )}
        {error && <Text style={styles.error}>{error.error || 'Registration failed. Please try again.'}</Text>}
        <View style={styles.containerss}>
          <View style={styles.lines}></View>
          <Text style={styles.texts}>Or sign in with</Text>
          <View style={styles.lines}></View>
        </View>
        <TouchableOpacity style={styles.regbutton} onPress={() => navigation.navigate('')}>
          <Ionicons name="logo-google" size={24} color="#DB4437" style={{ marginRight: 10 }} />
          <Text style={styles.buttonText}>Sign Up with Google </Text>
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: '#717171' }}>Already have account?</Text>
          <Button title="Sign in" onPress={() => navigation.navigate('Login')} />
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
  },
  title: {
    fontSize: 30,
    marginBottom: 10,
    textAlign: 'center',
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
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
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
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 10,
  },
  passwordInput: {
    flex: 1,
  },
  eyeIcon: {
    padding: 5,
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
