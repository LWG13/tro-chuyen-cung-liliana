import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./global.scss"
import Navigation from "./components/navigation";
import  authReducer  from "./components/ReduxToolkit/authSlice"
import { configureStore, } from "@reduxjs/toolkit"
import { Provider } from "react-redux"
import { ToastContainer } from "react-toastify"
import Home from "./components/home"
import Login from "./components/login"
import Background from "./components/background"
import Signup from "./components/signup"
import AuthRoute from "./authRoute"
import Chat from "./components/chat"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Setting from "./components/setting"
import Account from "./components/account"
import 'highlight.js/styles/github-dark.css';


const queryClient = new QueryClient();
const store = configureStore({
  reducer: {
    auth: authReducer
  }
})
const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigation />,
    children: [
      {
        element: <AuthRoute />,
        children: [
          {
            path: "/",
            element: <Home />,
            children: [
              {
                path: "/",
                element: <Chat />
              },
               {
            path: "/setting",
            element: <Setting />
               },
              {
                path: "/account",
                element: <Account />
              },
              {
                path: "/background",
                element: <Background />
              }
            ]
          },
         
        ]
      }
      
    ]
  }, {
    path: "/login",
    element: <Login />
  },
  {
    path: "/sign-up",
    element: <Signup />
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store} >
       <QueryClientProvider client={queryClient}>
                  <ToastContainer />
    <RouterProvider router={router} />
        </QueryClientProvider>
  </Provider>
  </React.StrictMode>
);