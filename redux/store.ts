import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";
import { createWrapper } from "next-redux-wrapper";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  persistReducer,
  persistStore,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";

const makeStore = () => {
  const isServer = typeof window === "undefined";
  if (isServer) {
    return configureStore({
      reducer: rootReducer,
    });
  } else {
    const persistConfig = {
      key: "nextjs",
      whitelist: ["user"], // make sure it does not clash with server keys
      storage,
    };
    const persistedReducer = persistReducer(persistConfig, rootReducer);
    let store: any = configureStore({
      reducer: persistedReducer,
      middleware(getDefaultMiddleware) {
        return getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
          },
        });
      },
    });
    store.__persistor = persistStore(store);
    return store;
  }
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = ReturnType<AppStore["dispatch"]>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;

export const wrapper = createWrapper(makeStore);
