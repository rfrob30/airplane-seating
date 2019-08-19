import React, { Component } from "react";
import FeaturedCard from "./FeaturedCard";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

function CarouselCard(props) {
  return (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
      <FeaturedCard
        imageUri={require("../assets/images/robot-dev.png")}
        name="Coming Soon.."
      />
      <FeaturedCard
        imageUri={require("../assets/images/robot-prod.png")}
        name="Coming Soon.."
      />
      <FeaturedCard
        imageUri={require("../assets/images/react-logo.png")}
        name="Coming Soon.."
      />
    </ScrollView>
  );
}
export default CarouselCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
