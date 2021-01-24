import React from "react";
import { View, Text, TouchableOpacity, Platform } from "react-native";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Home from "../screens/Tabs/Home";
import Search from "../screens/Tabs/Search";
import Notifications from "../screens/Tabs/Notifications";
import Profile from "../screens/Tabs/Profile";
import MessageLink from "../components/MassagesLink";
import NavIcon from "../components/NavIcon";
import { AntDesign } from '@expo/vector-icons'; 
import constants from "../constants";
import styled from 'styled-components/native';
import styles from "../styles";


const stackFactory = (initialRoute, customConfig) =>
  createStackNavigator({
    InitialRoute: {
      screen: initialRoute,
      navigationOptions: { ...customConfig }
    }
  });
  const Image = styled.Image`
  margin: -30px 0;
  width: ${constants.width / 3};
`;

export default createBottomTabNavigator(
  {
    Home: {
      screen: stackFactory(Home, {
        headerRight: <MessageLink />,
        headerTitle: <Image resizeMode={"contain"} source={require("../assets/logo.png")} />
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused}
            name={Platform.OS === "ios"? focused ? "home-sharp" : "home-outline" : focused ? "home-sharp" : "home-outline"} size={26} />
        )
      }
    },
    Search: {
      screen: stackFactory(Search, {
        title: "Search"
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused} name={Platform.OS === "ios" ? focused ? "ios-search-sharp" : "ios-search-outline" : focused ? "md-search-sharp" : "md-search-outline"} size={26}  />
        )
      }
    },
    Add: {
      screen: View,
      navigationOptions: {
        tabBarOnPress: ({ navigation }) =>
          navigation.navigate("PhotoNavigation"),
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused} name={Platform.OS === "ios" ? "ios-add" : "md-add"} size={32} />
        )
      }
    },
    Notifications: {
      screen: stackFactory(Notifications, {
        title: "Notifications"
      }),
      navigationOptions: {
        tabBarIcon: ({ focused }) => (
         <AntDesign focused={focused} name={Platform.OS === "ios" ? focused ? "star" : "staro" : focused ? "star" : "staro"} size={26} color={focused ? styles.navyColor : styles.darkGreyColor} />
        )
      }
    },
    Profile: {
      screen: stackFactory(Profile, {
        title: "Profile"
      }),
      navigationOptions: {
        tabBarIcon: ({focused}) => (
          <NavIcon
            focused={focused} name={Platform.OS === "ios"? focused ? "person" : "person-outline" : focused ? "person" : "person-outline"} size={26} />
        )
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    }
  }
);

