import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

function FeaturedCard(props) {
  return (
    <View style={styles.carouselCard}>
      <View style={{ flex: 2 }}>
        <Image source={props.imageUri} style={styles.carouselImage} />
      </View>
      <View style={styles.carouselInfo}>
        <Text>{props.name}</Text>
        <Text style={styles.cardDescription}>Coming Soon..</Text>
      </View>
    </View>
  );
}
export default FeaturedCard;

const styles = StyleSheet.create({
  cardDescription: {
    fontSize: 12,
    color: "#d3d3d3"
  },
  carouselInfo: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
    marginLeft: 5
  },
  carouselImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover"
  },
  carouselCard: {
    height: 150,
    width: 150,
    marginLeft: 20,
    borderWidth: 0.5,
    borderColor: "#dddddd",
    overflow: "hidden"
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});
