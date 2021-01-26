import React from "react";
import styled from "styled-components/native";
import { withNavigation } from "react-navigation";
import { Platform } from "react-native";
import NavIcon from "./NavIcon";
import { MaterialIcons } from '@expo/vector-icons'; 
import { Text } from "react-native";

const Container = styled.TouchableOpacity`
  padding-right: 20px;
`;

export default withNavigation(({ navigation }) => {
  return <Container onPress={() => navigation.navigate("Upload", { photo: navigation.getParam("photo") })}>
      {/* <MaterialIcons name="navigate-next" size={24} color="black" /> */}
      <Text> Next </Text>
  </Container>
});