import React, { useState, useEffect } from "react";

import { StyleSheet, View, ScrollView, ActivityIndicator } from "react-native";
import { Text } from "react-native-ui-kitten";
import { _storeInput } from "../Redux/Action/Action";
import { connect } from "react-redux";
import SeatsLayout from "../components/SeatsLayout";
import FeaturedSection from "../components/FeaturedSection";

const OutputScreen = props => {
  const [someFetch, setsomeFetch] = useState(true);
  //main function to generate and allocate seats
  //The fundamental of the algorithm is to initalize the cell in the arrays with its corresponding label (e.g. A for aisle, W for window)
  //each cell contains ["A", 1] which represents the type of seat Aisle(used for styling) and passenger number 1
  const gen_seats = (input_arr, passenger) => {
    var seats = [];
    //initialize seats with its W x H and fill with M
    input_arr.forEach(e => {
      var width = e[0];
      var height = e[1];
      var arr = makeArray(width, height);
      seats.push(arr);
    });
    allocate_seats(seats); //fill with A and W
    var col = get_max(input_arr, 0);
    var row = get_max(input_arr, 1);
    var arr_length = input_arr.length;
    row = row < arr_length ? arr_length : row;
    var counter = 1;
    //fill seats with its passenger number
    counter = fill_seats(seats, passenger, counter, col, row, "A");
    counter = fill_seats(seats, passenger, counter, col, row, "W");
    fill_seats(seats, passenger, counter, col, row, "M");
    return seats;
  };

  // initalize array with M to represent middle, some will be overwritten by A and W
  const makeArray = (w, h) => {
    var arr = [];
    for (var i = 0; i < h; i++) {
      arr[i] = [];
      for (var j = 0; j < w; j++) {
        arr[i][j] = ["M"];
      }
    }
    return arr;
  };

  //fill corresponding cells with "A" and "W"
  const allocate_seats = seats => {
    for (var i = 0; i < seats.length; i++) {
      for (var j = 0; j < seats[i].length; j++) {
        seats[i][j][0] = ["A"];
        seats[i][j][seats[i][j].length - 1] = ["A"];
        if (i === 0) {
          seats[i][j][0] = ["W"];
        } else if (i === seats.length - 1) {
          seats[i][j][seats[i][j].length - 1] = ["W"];
        }
      }
    }
  };

  //get max col and row from input to be used for upper bound of loop in fill_seats()
  const get_max = (input, col) => {
    var max = Math.max.apply(
      Math,
      input.map(row => {
        return row[col];
      })
    );
    return max;
  };

  //fill the cells with its corresponding passenger number
  const fill_seats = (seats, passenger, counter, col, row, pos) => {
    if (counter > passenger) {
      return counter;
    }
    for (var i = 0; i < col; i++) {
      for (var j = 0; j < row; j++) {
        if (seats[j] === undefined || seats[j][i] === undefined) {
          continue;
        }
        for (var k = 0; k < seats[j][i].length; k++) {
          if (
            seats[j] !== undefined &&
            seats[j][i] !== undefined &&
            seats[j][i][k][0] === pos
          ) {
            seats[j][i][k].push(counter);
            counter += 1;
          }
          if (counter > passenger) {
            return counter;
          }
        }
      }
    }

    return counter;
  };

  //let's pretend we are fetching from an API
  useEffect(() => {
    setTimeout(() => {
      setsomeFetch(false);
    }, 1000);
  });

  const seats = gen_seats(props.array, props.passenger);
  const legend = [
    { name: "aisle", style: styles.aisle },
    { name: "window", style: styles.window },
    { name: "middle", style: styles.middle }
  ];

  return someFetch ? (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="white" />
    </View>
  ) : (
    <View style={styles.container}>
      <Text style={styles.header} category="h4">
        Seating Allocation
      </Text>
      <View style={styles.seatView}>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
          {seats.map((e, index) => {
            return <SeatsLayout key={index} seats={e} />;
          })}
        </ScrollView>
      </View>
      <View style={styles.labelView}>
        <Text style={styles.subheading}>Legend:</Text>
        <View style={styles.legend}>
          {legend.map(e => {
            return (
              <View key={e.name} style={styles.legendItems}>
                <View style={e.style} />
                <Text>{e.name}</Text>
              </View>
            );
          })}
        </View>
      </View>
      {/* <View style={styles.contact}>
        <Text style={styles.subheading}>Other Features</Text>
        <FeaturedSection />
      </View> */}
      <View style={styles.bottom}>
        <Text style={styles.bottomText}>Powered by React Native.</Text>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightblue"
  },
  seatView: {
    flex: 0,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "white"
  },
  text: {
    marginVertical: 16,
    alignItems: "center"
  },
  labelView: {
    backgroundColor: "white",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  contact: {
    marginTop: 10,
    backgroundColor: "white",
    paddingHorizontal: 10,
    paddingVertical: 15
  },
  aisle: {
    width: 20,
    height: 20,
    backgroundColor: "steelblue",
    marginLeft: 10,
    marginRight: 5
  },
  window: {
    width: 20,
    height: 20,
    backgroundColor: "yellowgreen",
    marginLeft: 10,
    marginRight: 5
  },
  middle: {
    width: 20,
    height: 20,
    backgroundColor: "indianred",
    marginLeft: 10,
    marginRight: 5
  },
  legend: {
    flexDirection: "row"
  },
  legendItems: {
    marginVertical: 10,
    flexDirection: "row"
  },
  header: {
    textAlign: "center",
    paddingTop: 20,
    color: "white"
  },
  subheading: {
    textAlign: "left",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 25
  },
  bottomText: {
    textAlign: "center",
    color: "white",
    fontSize: 12
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const mapStateToProps = state => {
  return {
    array: state.array.array,
    passenger: state.array.passenger
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //   _storeInput: user => dispatch(_storeInput(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OutputScreen);
