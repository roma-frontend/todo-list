import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const initialState: Task[] = [
  { id: 1, text: "Create new React app", completed: true },
  { id: 2, text: "Create Todo List", completed: true },
  { id: 3, text: "Design Todo List", completed: false },
];

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<Task>) => {
      state.push(action.payload);
    },
    updateTask: (state, action: PayloadAction<{ id: number; text: string }>) => {
      const task = state.find((todo) => todo.id === action.payload.id);
      if (task) {
        task.text = action.payload.text;
      }
    },
    toggleTaskCompletion: (state, action: PayloadAction<number>) => {
      const task = state.find((todo) => todo.id === action.payload);
      if (task) {
        task.completed = !task.completed;
      }
    },
    deleteTask: (state, action: PayloadAction<number>) => {
      return state.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTask, updateTask, toggleTaskCompletion, deleteTask } =
  todoSlice.actions;

export default todoSlice.reducer;