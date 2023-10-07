import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import store from "./store";
import { Provider } from "react-redux";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";

import PrivateRoute from "./components/PrivateRoute.jsx";
import HomeScreen from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { ProfileScreen } from "./screens/ProfileScreen";
import { AdminHomeScreen } from "./screens/adminScreens/AdminHomeScreen";
import AdminLoginScreen from "./screens/adminScreens/AdminLoginScreen.jsx";
import { UserManagementScreen } from "./screens/adminScreens/UserManagementScreen.jsx";
import AdminPrivateRoute from "./components/adminComponents/AdminPrivate.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>

      <Route index={true} path="/" element={<HomeScreen />} />

      <Route path="/login" element={<LoginScreen />} />

      <Route path="/register" element={<RegisterScreen />} />

      {/* Private Routes */}
      <Route path="" element={<PrivateRoute />}>

        <Route path="/profile" element={<ProfileScreen />} />

      </Route>

     
  
  
      <Route path="/admin" element={<AdminHomeScreen />} />
      <Route path="/admin/login" element={<AdminLoginScreen />} />


      {/* Private Routes */}
      <Route path="" element={<AdminPrivateRoute/>}>
      <Route path="/admin/get-user" element={<UserManagementScreen/>} />
      </Route>
      {/* Private Routes */}
  



    </Route>
    




  )
);
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);