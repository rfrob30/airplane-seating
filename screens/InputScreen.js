import React, { useState, useEffect } from "react";

import { StyleSheet, View } from "react-native";
import { Layout, Text, Button, Input } from "react-native-ui-kitten";
// import { Ionicons } from "@expo/vector-icons";
// import { _signInAsync } from "../Redux/Action/Action";
import { _storeInput } from "../Redux/Action/Action";
import { connect } from "react-redux";

// class SignInScreen extends React.Component {
const InputScreen = props => {
  const [array, setArray] = useState("");
  const [passenger, setPassenger] = useState("");
  const [errCheck, setErrCheck] = useState(false);

  //store input in redux store so we can access it in OuputScreen
  const _storeInput = () => {
    if (array === "") {
      setErrCheck(true);
      return;
    } else {
      setErrCheck(false);
    }
    var tempArray = array.split("|");
    var finalArray = [];
    for (var i = 0; i < tempArray.length; i++) {
      finalArray[i] = tempArray[i].split(",").map(e => {
        return parseInt(e);
      });
    }
    props._storeInput({ array: finalArray, passenger: passenger });
    props.navigation.navigate("Output");
  };

  return (
    <Layout style={styles.container}>
      <View style={styles.headerView}>
        <Text style={styles.headerText} category="h4">
          Enter Your Input
        </Text>
      </View>
      <View>
        <Input
          style={styles.fields}
          type={"string"}
          value={array}
          placeholder="Enter your array (e.g. 3,2|4,3|2,3|3,4)"
          onChangeText={arr => setArray(arr)}
        />
        {errCheck && (
          <Text style={styles.errText}>Array input is required!</Text>
        )}
        <Input
          style={styles.fields}
          type={"string"}
          value={passenger}
          placeholder="Number of passenger(e.g. 30)"
          onChangeText={pass => setPassenger(pass)}
        />
        <Button
          style={styles.placeButton}
          onPress={() => {
            _storeInput();
          }}
        >
          Place seats
        </Button>
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  fields: {
    marginTop: 16
  },
  container: {
    flex: 1,
    paddingTop: 30,
    alignItems: "stretch",
    backgroundColor: "lightblue",
    paddingHorizontal: 20
  },
  text: {
    marginVertical: 16,
    alignItems: "center"
  },
  headerView: {
    paddingHorizontal: 20
  },
  headerText: {
    color: "white",
    textAlign: "center",
    padding: 20,
    marginBottom: 5,
    borderBottomColor: "white",
    borderBottomWidth: 2
  },
  placeButton: {
    backgroundColor: "lightgreen",
    borderColor: "lightgreen",
    marginTop: 16
  },
  errText: {
    color: "red",
    fontSize: 12,
    marginLeft: 5
  }
});

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => {
  return {
    _storeInput: user => dispatch(_storeInput(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InputScreen);
