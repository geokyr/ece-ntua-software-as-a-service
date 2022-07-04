// Import FirebaseAuth and firebase.
import React, { useEffect, useState } from "react";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
// import { getAuth, setPersistence, signInWithEmailAndPassword, browserSessionPersistence } from "firebase/auth";
import { useAuth } from "../Firebase/firebaseAuthContext";
import { auth as authFire } from "../Firebase/firebase.js";
import { Navigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import Background from "../assets/Background.jpg";

// Configure Firebase.
const config = {
    apiKey: "AIzaSyCxeLOUly9QclsHAxctDUcwSR7r5YfAGww",
    authDomain: "saas2022-19.firebaseapp.com",
    projectId: "saas2022-19",
    storageBucket: "saas2022-19.appspot.com",
    messagingSenderId: "773408762688",
    appId: "1:773408762688:web:8fa88ec3b0504832b9a8a5",
    measurementId: "G-00PHCGWNKN",
};

// firebase.initializeApp(config);

// Configure FirebaseUI.
const uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: "popup",
    // "matchMedia" in window &&
    // window.matchMedia("(display-mode: standalone)").matches
    //     ? "popup"
    //     : "redirect",
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: "/main",
    // We will display Google and Facebook as auth providers.
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
        // Avoid redirects after sign-in.
        signInSuccessWithAuthResult: () => false,
    },
};

function SignInScreen() {
    const [isSignedIn, setIsSignedIn] = useState(false); // Local signed-in state.
    const auth = useAuth();

    useEffect(() => {
        // Listen to the Firebase Auth state and set the local state.
        setIsSignedIn(!!auth.currentUser);
    }, [auth]);

    if (!isSignedIn) {
        return (
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(" + Background + ")",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) =>
                            t.palette.mode === "light"
                                ? t.palette.grey[50]
                                : t.palette.grey[900],
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid
                    item
                    xs={12}
                    sm={8}
                    md={5}
                    component={Paper}
                    elevation={6}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            padding: 3,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[300]
                                    : t.palette.grey[900],
                            borderRadius: "5%",
                            border: "2px solid",
                            borderColor: (t) =>
                                t.palette.mode === "dark"
                                    ? t.palette.grey[300]
                                    : t.palette.grey[900],
                        }}>
                        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <StyledFirebaseAuth
                            uiConfig={uiConfig}
                            firebaseAuth={authFire}
                        />
                    </Box>
                </Grid>
            </Grid>
        );
    }
    return <Navigate to="/main" />;
}

export default SignInScreen;
