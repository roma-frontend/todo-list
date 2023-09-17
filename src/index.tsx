import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import store from "./store/store";
import router from "./routes/routes";

const rootElement = document.getElementById("root");
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  );
}
