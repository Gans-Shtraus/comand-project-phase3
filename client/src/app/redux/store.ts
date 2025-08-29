import { configureStore } from "@reduxjs/toolkit";
import userSlice from "@/entities/User/redux/slice/userSlice";
import taskSlice from "@/entities/Task/redux/slice/taskSlice";
import questionSlice from "@/entities/Question/redux/slice/questionSlice";
import themeSlice from "@/entities/Theme/redux/slice/theme.slice";

const storeOptions = {
  reducer: {
    // * Все редюсеры
    // ? advice: adviceSlice,
    userReducer: userSlice,
    taskSlice,
    questionSlice,
    themeSlice,
  },
};
// * Создание store
export const store = configureStore(storeOptions);
// * Типизация store
export type RootState = ReturnType<typeof store.getState>;
// * Типизация despatch
export type AppDispatch = typeof store.dispatch;
