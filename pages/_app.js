'use client'
import { Navbar } from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";
import store from "@/redux/store";
import "@/styles/globals.css";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Provider store={store}>
        <Navbar></Navbar>
        <Component {...pageProps} />
      </Provider>
    </AuthProvider>
  );
}
