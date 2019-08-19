import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import InputScreen from "../screens/InputScreen";
import OutputScreen from "../screens/OutputScreen";

// const config = Platform.select({
//   web: { headerMode: "none" },
//   default: {}
// });

const mainNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      headerVisible: false,
      header: null
    })
  },
  Input: {
    screen: InputScreen,
    headerMode: "none",
    navigationOptions: ({ navigation }) => ({
      headerVisible: false
    })
  },
  Output: {
    screen: OutputScreen,
    headerMode: "None",
    navigationOptions: ({ navigation }) => ({
      headerVisible: false
    })
  }
});

export default mainNavigator;
