import {
  persistStore,
  REHYDRATE,
  PURGE,
  persistCombineReducers,
  persistReducer
} from "redux-persist";
import thunk from "redux-thunk";
import rootReducer from "./Reducer/Reducer";
import storage from "redux-persist/lib/storage";
import { createStore, applyMiddleware, compose, promise } from "redux";

const config = {
  key: "primary",
  storage
};

const persistedReducer = persistReducer(config, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    undefined,
    compose(applyMiddleware(thunk))
  );
  const persistor = persistStore(store, null, () => {
    store.getState();
  });
  return { store, persistor };
};
