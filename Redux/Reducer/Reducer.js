const initState = {
  array: [],
  passenger: 0
};

const Reducer = (state = initState, action) => {
  switch (action.type) {
    case "NEW_INPUT":
      return {
        array: action.array,
        passenger: action.passenger
      };

    default:
      return state;
  }
};

export default Reducer;
