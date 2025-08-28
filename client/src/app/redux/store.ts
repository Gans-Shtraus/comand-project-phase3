import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/entities/User/redux/slice/userSlice";
import taskSlice from "@/entities/Task/redux/slice/taskSlice";

const storeOptions = {
  reducer: {
    // * Все редюсеры
    // ? advice: adviceSlice,
    userReducer: userSlice,
    taskSlice,
  },
};
// * Создание store
export const store = configureStore(storeOptions);
// * Типизация store
export type RootState = ReturnType<typeof store.getState>;
// * Типизация despatch
export type AppDispatch = typeof store.dispatch;
