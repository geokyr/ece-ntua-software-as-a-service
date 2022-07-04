// Import FirebaseAuth and firebase.
import React, { useEffect, useRef, useState } from "react";
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
    deleteDataChart,
    toggleEditScreen,
    saveChartParams,
} from "../redux/actions/generalActions";
import { useSelector, useDispatch } from "react-redux";
import DateTimePicker from "./DateTimePicker";
import Selector from "./Selector";
import moment from "moment";
import { getATLData, getAGPTData, getFFData } from "../fetchFunctions";

function EditChartParameters() {
    const auth = useAuth();
    const dispatch = useDispatch();

    const editChartIndex = useSelector((state) => state.general.editChartIndex);
    const dataChart = useSelector(
        (state) => state.general.dataCharts[editChartIndex]
    );

    // const quantity = useRef(dataChart.quantity);
    const [quantity, setQuantity] = useState(dataChart.quantity);
    const dateFrom = useRef(moment(dataChart.dateFrom));
    const generationType = useRef(dataChart.generationType);
    const countryFrom = useRef(dataChart.countryFrom);
    const countryTo = useRef(dataChart.countryTo);

    const setDateFrom = (date) => {
        dateFrom.current = date;
    };

    const setGenerationType = (gt) => {
        generationType.current = gt;
    };

    const setCountryFrom = (ct) => {
        countryFrom.current = ct;
    };

    const setCountryTo = (ct) => {
        countryTo.current = ct;
    };

    const removeChart = (i) => {
        dispatch(toggleEditScreen(-1));
        dispatch(deleteDataChart(i));
    };

    const cancelEdit = (i) => {
        if (dataChart.dateFrom === "") {
            removeChart(i);
        } else {
            dispatch(toggleEditScreen(-1));
        }
    };

    //check if all fields are set
    const isAllFieldsSet = () => {
        if (
            (quantity === "Actual total load" &&
                dateFrom.current._isValid &&
                countryFrom.current) ||
            (quantity === "Generation per type" &&
                dateFrom.current._isValid &&
                generationType.current) ||
            (quantity === "Cross border flows" &&
                dateFrom.current._isValid &&
                countryFrom.current &&
                countryTo.current)
        ) {
            return true;
        } else {
            return false;
        }
    };

    const saveChart = async () => {
        if (isAllFieldsSet()) {
            // dispatch(toggleEditScreen(-1));
            let returnedData;
            if (quantity === "Actual total load") {
                returnedData = await getATLData(
                    auth.currentUser.accessToken,
                    dateFrom.current._d,
                    countryFrom.current
                );
            } else if (quantity === "Generation per type") {
                returnedData = await getAGPTData(
                    auth.currentUser.accessToken,
                    dateFrom.current._d,
                    countryFrom.current,
                    generationType.current
                );
            } else {
                returnedData = await getFFData(
                    auth.currentUser.accessToken,
                    dateFrom.current._d,
                    countryFrom.current,
                    countryTo.current
                );
            }
            dispatch(
                saveChartParams({
                    quantity: quantity,
                    dateFrom: dateFrom.current._d,
                    generationType: generationType.current,
                    countryFrom: countryFrom.current,
                    countryTo: countryTo.current,
                    data: returnedData,
                    lastUpdateDate: new Date(),
                })
            );
        } else alert("Please fill all fields");
    };

    return (
        <Box
            sx={{
                width: "100vw",
                height: "100vh",
                // backgroundColor: "red",
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
            }}
            onClick={() => {
                if (isAllFieldsSet()) dispatch(toggleEditScreen(-1));
            }}>
            <Box
                sx={{
                    px: 5,
                    py: 5,
                    minWidth: "50vw",
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
                }}
                onClick={(e) => e.stopPropagation()}>
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
                    LineChart {editChartIndex + 1} Parameters
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
                    <DateTimePicker
                        date={dateFrom.current}
                        setDate={(d) => setDateFrom(d)}
                    />
                    <Selector
                        propVal={quantity}
                        setPropVal={(q) => setQuantity(q)}
                        mode={"quantity"}
                    />

                    {quantity == "Actual total load" && (
                        <Selector
                            propVal={countryFrom.current}
                            setPropVal={(ct) => setCountryFrom(ct)}
                            mode={"country"}
                        />
                    )}

                    {quantity == "Generation per type" && (
                        <>
                            <Selector
                                propVal={countryFrom.current}
                                setPropVal={(ct) => setCountryFrom(ct)}
                                mode={"country"}
                            />
                            <Selector
                                propVal={generationType.current}
                                setPropVal={(gt) => setGenerationType(gt)}
                                mode={"generationType"}
                            />
                        </>
                    )}

                    {quantity == "Cross border flows" && (
                        <>
                            <Selector
                                propVal={countryFrom.current}
                                setPropVal={(ct) => setCountryFrom(ct)}
                                mode={"countryFrom"}
                            />
                            <Selector
                                propVal={countryTo.current}
                                setPropVal={(ct) => setCountryTo(ct)}
                                mode={"countryTo"}
                            />
                        </>
                    )}
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
                    <Button onClick={saveChart} variant="contained">
                        Save
                    </Button>
                    <Button
                        onClick={() => cancelEdit(editChartIndex)}
                        sx={{ ml: 2 }}
                        variant="outlined">
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}

export default EditChartParameters;
