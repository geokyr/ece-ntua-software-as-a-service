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
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import ButtonGroup from "@mui/material/ButtonGroup";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import {
    setPlanEndingDate,
    toggleExtendScreen,
} from "../redux/actions/generalActions";
import { useSelector, useDispatch } from "react-redux";
// import TextField from "@mui/material/TextField";
import moment from "moment";
// const planEndDate = new Date("December 17, 2022 23:59:59");
import { getUserData, loginSession, extendPlan } from "../fetchFunctions";

// return day difference between a date and now
const getDaysDifference = (date) => {
    const now = new Date();
    var dateMomentObject = moment(date, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
    var dateObject = dateMomentObject.toDate(); // convert moment.js object to
    const diff = dateObject.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 3600 * 24)) > 0
        ? Math.ceil(diff / (1000 * 3600 * 24))
        : 0;
};

const Item = ({ title, value }) => {
    return (
        <Box
            sx={{
                px: 3,
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                // backgroundColor: "red",
            }}>
            <Typography
                component="main"
                variant="h6"
                noWrap
                sx={{
                    // flexGrow: 1,
                    float: "left",
                    // backgroundColor: "red",
                    textAlign: "left",
                    color: (t) =>
                        t.palette.mode === "dark"
                            ? t.palette.grey[300]
                            : t.palette.grey[900],
                }}>
                {title}
            </Typography>
            <Box
                sx={{
                    px: 3,
                    py: 1,
                    ml: 3,
                    width: "40vw",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (theme) =>
                        theme.palette.mode == "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    borderColor: (t) =>
                        t.palette.mode === "dark"
                            ? t.palette.grey[300]
                            : t.palette.grey[900],
                    borderRadius: "20px",
                    borderWidth: 1,
                    borderStyle: "solid",
                }}>
                <Typography
                    component="main"
                    variant="h6"
                    // noWrap
                    sx={{
                        // flexGrow: 1,
                        float: "left",
                        // backgroundColor: "red",
                        textAlign: "center",
                        color: (t) =>
                            t.palette.mode === "dark"
                                ? t.palette.grey[300]
                                : t.palette.grey[600],
                    }}>
                    {value}
                </Typography>
            </Box>
        </Box>
    );
};

function ExtendPlanScreen() {
    const auth = useAuth();
    const dispatch = useDispatch();
    const [extendDays, setExtendDays] = useState(3);
    const [lastLogin, setLastLogin] = useState("");

    const planEndingDate = useSelector((state) => state.general.planEndingDate);

    const getLastLogin = async () => {
        let ll = null;
        await auth.currentUser.getIdTokenResult().then((result) => {
            const { issuedAtTime, expirationTime } = result;
            ll = issuedAtTime;
        });
        return moment(ll).local().format("MMMM Do YYYY, h:mm:ss a");
    };

    useEffect(() => {
        getLastLogin().then((lastLog) => {
            setLastLogin(lastLog.toLocaleString("gr-GR"));
        });
    }, []);

    const extendPlanClick = () => {
        if (extendDays > 0) {
            dispatch(toggleExtendScreen());
            extendPlan(auth.currentUser.accessToken, extendDays).then((res) => {
                dispatch(setPlanEndingDate(res.finalDate));

                alert("Plan extended by " + extendDays + " days");
            });
        } else alert("extend days must be greater than 0");
    };

    return (
        // <Box
        //     sx={{
        //         width: "100vw",
        //         height: "100vh",
        //         position: "absolute",
        //         display: "flex",
        //         flexDirection: "column",
        //         alignItems: "center",
        //         justifyContent: "center",
        //         backgroundColor: "rgba(0,0,0,0.8)",
        //         borderColor: (t) =>
        //             t.palette.mode === "dark"
        //                 ? t.palette.grey[300]
        //                 : t.palette.grey[900],
        //     }}>
        <ClickAwayListener onClickAway={() => dispatch(toggleExtendScreen())}>
            <Box
                sx={{
                    px: 5,
                    py: 5,
                    borderRadius: "10px",
                    position: "absolute",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: (theme) =>
                        theme.palette.mode == "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    borderColor: (t) =>
                        t.palette.mode === "dark"
                            ? t.palette.grey[300]
                            : t.palette.grey[900],
                }}>
                <Typography
                    component="h3"
                    variant="h4"
                    noWrap
                    sx={{
                        // flexGrow: 1,
                        float: "left",
                        // mb: 2,
                        // backgroundColor: "red",
                        textAlign: "left",
                        color: (t) =>
                            t.palette.mode === "dark"
                                ? t.palette.grey[300]
                                : t.palette.grey[900],
                    }}>
                    Extend Plan
                </Typography>
                <hr
                    style={{
                        width: "100%",
                        textAlign: "center",
                        marginLeft: 0,
                        marginBottom: 30,
                        marginTop: 30,
                    }}></hr>
                <Stack spacing={2}>
                    <Item
                        title={"Username:"}
                        value={auth.currentUser.displayName}
                    />
                    <Item title={"Email:"} value={auth.currentUser.email} />
                    <Item title={"Last login:"} value={lastLogin} />
                    <Item
                        title={"Days left:"}
                        value={getDaysDifference(planEndingDate)}
                    />
                </Stack>
                <Box
                    sx={{
                        px: 3,
                        mt: 2,
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        // backgroundColor: "red",
                    }}>
                    <Typography
                        component="main"
                        variant="h6"
                        noWrap
                        sx={{
                            // flexGrow: 1,
                            float: "left",
                            // backgroundColor: "red",
                            textAlign: "left",
                            color: (t) =>
                                t.palette.mode === "dark"
                                    ? t.palette.grey[300]
                                    : t.palette.grey[900],
                        }}>
                        Extend by:
                    </Typography>
                    <Box
                        sx={{
                            px: 3,
                            ml: 3,
                            py: 1,

                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: (theme) =>
                                theme.palette.mode == "light"
                                    ? theme.palette.grey[100]
                                    : theme.palette.grey[900],
                            borderColor: (t) =>
                                t.palette.mode === "dark"
                                    ? t.palette.grey[300]
                                    : t.palette.grey[900],
                            // borderRadius: "20px",
                            // borderWidth: 1,
                            // borderStyle: "solid",
                        }}>
                        <TextField
                            id="outlined-number"
                            label="Days"
                            type="number"
                            sx={{ width: 80 }}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            error={extendDays <= 0}
                            defaultValue={extendDays}
                            onChange={(e) => setExtendDays(e.target.value)}
                        />
                    </Box>
                    <Button onClick={extendPlanClick} variant="contained">
                        Extend
                    </Button>

                    {/* <ButtonGroup
                        sx={{ ml: 3 }}
                        disableElevation
                        variant="contained">
                        <Button>-</Button>
                    </ButtonGroup> */}
                </Box>
            </Box>
        </ClickAwayListener>
    );
}

export default ExtendPlanScreen;
