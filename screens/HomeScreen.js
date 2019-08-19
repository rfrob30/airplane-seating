import * as WebBrowser from "expo-web-browser";
import React, { useState, useEffect } from "react";
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity
} from "react-native";

import { Input } from "react-native-ui-kitten";
import FadeInView from "../components/FadeInView";

const HomeScreen = props => {
  const text = [
    {
      text: "Airplane Seating Algorithm",
      style: styles.heading
    },
    {
      text: "Tap anywhere to start!",
      style: styles.subheading
    }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => props.navigation.navigate("Input")}
      >
        <ScrollView contentContainerStyle={styles.contentContainer}>
          <View style={styles.welcomeContainer}>
            <Image
              source={
                __DEV__
                  ? require("../assets/images/react-logo-black.png")
                  : require("../assets/images/robot-prod.png")
              }
              style={styles.welcomeImage}
            />
          </View>
          <FadeInView>
            {text.map((e, index) => {
              return (
                <Text key={index} style={e.style}>
                  {e.text}
                </Text>
              );
            })}
          </FadeInView>
        </ScrollView>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;

//left this in case you need the links for expo documentation
function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/development-mode/"
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    "https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes"
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue"
  },
  developmentModeText: {
    marginBottom: 20,
    color: "rgba(0,0,0,0.4)",
    fontSize: 14,
    lineHeight: 19,
    textAlign: "center"
  },
  contentContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    paddingBottom: 50
  },
  welcomeContainer: {
    alignItems: "center",
    marginTop: 10,
    marginBottom: 20
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: "contain",
    marginTop: 3,
    marginLeft: -10
  },
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50
  },
  heading: {
    fontSize: 20,
    color: "white",
    lineHeight: 24,
    textAlign: "center"
  },
  subheading: {
    fontSize: 16,
    color: "white",
    lineHeight: 24,
    textAlign: "center"
  }
});
