import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions, Switch, TouchableOpacity, Image } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const DashboardScreen = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const slides = [
    { day: 'Tue', date: '29', name: 'Tanvir Ahmed', condition: 'High Blood Pressure', time: '01:30' },
    { day: 'Tue', date: '29', name: 'Tanvir Ahmed', condition: 'High Blood Pressure', time: '01:30' },
  ];

  const images = [
    require("../assets/Dashboard/1.png"),
    require("../assets/Dashboard/2.png"),
  ];

  const onScroll = (event) => {
    const slideIndex = Math.round(event.nativeEvent.contentOffset.x / width);
    setActiveSlide(slideIndex);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <ScrollView
          horizontal
          pagingEnabled
          onScroll={onScroll}
          scrollEventThrottle={16}
          showsHorizontalScrollIndicator={false}
        >
          {slides.map((slide, index) => (
            <View key={index} style={styles.slideContainer}>
              <View style={styles.slides}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ backgroundColor: '#6DB', borderRadius: 10, padding: 10 }}>
                    <Text style={styles.text}>{slide.date}</Text>
                    <Text>{slide.day}</Text>
                    <Text>{slide.day}</Text>
                  </View>
                  <View style={{ flexDirection: 'column' }}>
                    <Text style={styles.text}>Pending appointment</Text>
                    <Text style={styles.text}>{slide.name}</Text>
                    <Text style={styles.text}>{slide.condition}</Text>
                  </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                  <Text style={styles.text}>{slide.time}</Text>
                  <View style={{ backgroundColor: '#6DB', borderRadius: 10, padding: 5 }}>
                    <Text style={styles.text}>View Patient</Text>
                  </View>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.pagination}>
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { opacity: index === activeSlide ? 1 : 0.5 }
              ]}
            />
          ))}
        </View>

        <View style={{padding:10, gap:20, marginTop:10}}>
          <View style={{backgroundColor:'#7AE3', width:'100%', padding:10, borderRadius:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Text style={{color:'green', fontSize:15}}>I am Available</Text>
            <Switch
              value={isDarkMode}
              onValueChange={() => setIsDarkMode(previousState => !previousState)}
            />
          </View>
          <View style={{backgroundColor:'#fff', width:'100%', padding:10, borderRadius:10, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Ionicons name="calendar" size={24} color="black" />
            <Text>Schedule appointment calender</Text>
            <TouchableOpacity style={{ padding: 5 }}>
              <Ionicons name="arrow-forward" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.comfeed}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 10 }}>
            <Text>Community Feeds</Text>
            <Text>View All</Text>
          </View>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            {images.map((image, index) => (
              <View key={index} style={styles.comslidesContainer}>
                <Image source={image} style={styles.comslides} />
              </View>
            ))}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  slideContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slides: {
    paddingLeft: 20,
    justifyContent: "center",
    backgroundColor: "#643FDB",
    padding: 20,
    margin: 10,
    borderRadius: 10,
    flexDirection: 'column',
    width: '90%',
  },
  text: {
    color: "#fff",
    fontSize: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#643FDB',
    marginHorizontal: 5,
  },
  comfeed: {
    padding: 10,
  },
  comslidesContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  comslides: {
    width: 300,
    height: 135,
    borderRadius: 20,
  },
});
