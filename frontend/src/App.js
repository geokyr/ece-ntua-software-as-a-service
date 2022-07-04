import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import MainScreen from "./MainScreen/MainScreen";
import SignInScreen from "./SignInScreen/SignInScreen";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Navigation from "./Navigation";
// import Firebase, { FirebaseContext } from "./Firebase";
import { AuthProvider } from "./Firebase/firebaseAuthContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "./redux/actions/generalActions";
import ExtendPlanScreen from "./ExtendPlanScreen/ExtendPlanScreen";

const darkTheme = createTheme({
    palette: {
        mode: "dark",
    },
});

const lightTheme = createTheme({
    palette: {
        mode: "light",
    },
});

function App() {
    const theme = useSelector((state) => state.general.theme);

    // Set head title
    useEffect(() => {
        document.title = "Energy Live 2022";
    }, []);

    return (
        <ThemeProvider theme={theme === "light" ? darkTheme : lightTheme}>
            <div className="App">
                <header className="App-header">
                    <Router>
                        <AuthProvider>
                            <Routes>
                                <Route
                                    exact
                                    path={"/"}
                                    element={<SignInScreen />}
                                />
                                <Route
                                    path="/main"
                                    element={
                                        <PrivateRoute>
                                            <MainScreen />
                                        </PrivateRoute>
                                    }
                                />
                                <Route
                                    path="/extend"
                                    element={
                                        <PrivateRoute>
                                            <ExtendPlanScreen />
                                        </PrivateRoute>
                                    }
                                />
                            </Routes>
                        </AuthProvider>
                    </Router>
                </header>
            </div>
        </ThemeProvider>
    );
}

export default App;
