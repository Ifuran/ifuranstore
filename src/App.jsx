import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { RouterProvider } from "react-router-dom";
import RouterApp from "./router";
import { Provider } from "react-redux";
import store from "./app/store";

function App() {
  return (
    <>
      <Provider store={store}>
        <RouterProvider router={RouterApp} />
      </Provider>
    </>
  );
}

export default App;
