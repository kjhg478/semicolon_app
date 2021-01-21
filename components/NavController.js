import { useIsLoggedIn } from "../AuthContext";
import React from "react";
import { View } from "react-native";
import TabNavigation from "../navigation/TabNavigation";
import AuthNavigation from "../navigation/AuthNavigation";
import MainNavigation from "../navigation/MainNavigation";


export default () => {

    const isLoggedIn = true;
  return (
    <View style={{ flex: 1}}>
        {isLoggedIn ? <MainNavigation/> : <AuthNavigation/>}
    </View>
  );
}



