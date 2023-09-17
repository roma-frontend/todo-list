import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import TodoList from "../components/todo/Todo";

export default createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [{ path: "/", element: <TodoList /> }],
  },
]);
