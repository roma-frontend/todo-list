import { configureStore } from "@reduxjs/toolkit";
import  todoSlice  from "./slice/todo.slice";

const store = configureStore({
    reducer: {
        todo: todoSlice,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export default store;
