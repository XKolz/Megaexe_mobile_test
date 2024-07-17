import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButtons/CustomButton';

const images = [
  require('../assets/onboarding/1.png'),
  require('../assets/onboarding/2.png'),
  require('../assets/onboarding/3.png'),
  require('../assets/onboarding/4.png'),
  // Add more images as needed
];

const OnboardingScreen = ({ navigation }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <ImageBackground 
      source={images[currentImageIndex]} 
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image
            source={require("../assets/onboarding/OnLogo.png")}
            style={styles.logo}
          />
        </View>

        <View style={styles.main}>
          <View style={{marginBottom: 20}}>
            <Text style={styles.text}>Convenient Telehealth: Virtual Consultations and Follow-up... Anytime, Anywhere</Text>
            <Text style={{color: 'red'}}>With Hospyta</Text>
          </View>
          <View>
            <CustomButton title="Sign In" onPress={() => navigation.navigate('Login')} />
            <TouchableOpacity style={styles.regbutton} onPress={() => navigation.navigate('Register')}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  logoContainer: {
    position: 'absolute',
    top: 20,
    left: -10,
  },
  logo: {
    width: 200,
    height: 70,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: 'flex-end'
  },
  main: {
    marginTop: 100,
    flex: 0.5,
    justifyContent:'space-between',
    marginBottom: 16,
  },
  text: {
    paddingRight: 40,
    fontSize: 24,
    fontWeight: "bold",
    color: '#fff', // Change text color for better visibility on the background image
  },
  regbutton: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 20,
    padding: 15,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    // fontWeight: 'bold',
  },
});
