import * as React from "react";
import { useCallback, forwardRef, useRef, useImperativeHandle } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Chart from "./Chart.js";
import LoadingChart from "./LoadingChart.js";
import ExtendChart from "./ExtendChart.js";
import IconButton from "@mui/material/IconButton";
import RefreshIcon from "@mui/icons-material/Refresh";
import Typography from "@mui/material/Typography";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import { useAuth } from "../Firebase/firebaseAuthContext";
import { useSelector, useDispatch } from "react-redux";
import {
    saveChartParams,
    setEditChartIndex,
} from "../redux/actions/generalActions";
import { getATLData, getAGPTData, getFFData } from "../fetchFunctions";
import moment from "moment";

export default function ChartBox({
    quantity,
    country,
    generationType,
    mode,
    data,
    lastUpdateDate,
    dateFrom,
    ...props
}) {
    const auth = useAuth();
    const dispatch = useDispatch();

    const refreshChart = async () => {
        console.log("auth.user.token", auth.currentUser.accessToken);

        let returnedData;
        if (quantity === "Actual total load") {
            returnedData = await getATLData(
                auth.currentUser.accessToken,
                moment(dateFrom)._d,
                props.countryFrom
            );
        } else if (quantity === "Generation per type") {
            returnedData = await getAGPTData(
                auth.currentUser.accessToken,
                moment(dateFrom)._d,
                props.countryFrom,
                generationType
            );
        } else {
            returnedData = await getFFData(
                auth.currentUser.accessToken,
                moment(dateFrom)._d,
                props.countryFrom,
                props.countryTo
            );
        }

        await dispatch(setEditChartIndex(props.index));

        dispatch(
            saveChartParams({
                quantity: quantity,
                dateFrom: moment(dateFrom)._d,
                generationType: generationType,
                countryFrom: props.countryFrom,
                countryTo: props.countryTo,
                data: returnedData,
                lastUpdateDate: new Date().toString(),
            })
        );
    };

    const downloadFile = ({ data, fileName, fileType }) => {
        const blob = new Blob([data], { type: fileType });

        const a = document.createElement("a");
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        const clickEvt = new MouseEvent("click", {
            view: window,
            bubbles: true,
            cancelable: true,
        });
        a.dispatchEvent(clickEvt);
        a.remove();
    };

    const exportToCsv = (e) => {
        // console.log("data to csv", data);
        e.preventDefault();

        // Headers for each column
        let headers = ["timestamp,amount"];

        // Convert users data to a csv
        let dataCsv = data.reduce((acc, data) => {
            const { time, amount } = data;
            acc.push([time, amount].join(","));
            return acc;
        }, []);

        downloadFile({
            data: [...headers, ...dataCsv].join("\n"),
            fileName: `${quantity.replace(/\s+/g, "_")}_${country.replace(
                /\s+/g,
                "_"
            )}_${generationType.replace(/\s+/g, "_")}_${moment(dateFrom).format(
                "DD_MM_YYYY_h:mm"
            )}.csv`,
            fileType: "text/csv",
        });
    };

    const childRef = useRef();

    return (
        <Grid item xs={12} md={8} lg={9}>
            <Paper
                sx={{
                    p: 2,
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "50vh",
                    width: "100%",
                    mb: 4,
                    // backgroundColor:"red"
                }}>
                {mode === "loading" ? (
                    <LoadingChart
                        quantity={quantity}
                        country={country}
                        generationType={generationType}
                    />
                ) : mode === "extend" ? (
                    <ExtendChart
                        quantity={quantity}
                        country={country}
                        generationType={generationType}
                    />
                ) : (
                    <Chart
                        quantity={quantity}
                        country={country}
                        data={data}
                        dateFrom={dateFrom}
                        generationType={generationType}
                        ref={childRef}
                    />
                )}
                <Box
                    component="main"
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        // height: "10px",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        // overflow: "auto",
                        // backgroundColor: "red",
                    }}>
                    <IconButton
                        onClick={() => refreshChart()}
                        edge="end"
                        aria-label="comments">
                        <RefreshIcon />
                    </IconButton>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="left"
                        ml={2}>
                        {"Last update: "}
                        {lastUpdateDate ? lastUpdateDate.toString() : "N/A"}
                    </Typography>
                </Box>
                <Box
                    component="main"
                    sx={{
                        display: "flex",
                        flexGrow: 1,
                        // height: "10px",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "flex-end",

                        // overflow: "auto",
                        // backgroundColor: "red",
                    }}>
                    <Button
                        disabled={data?.length === 0 || mode !== "normal"}
                        onClick={() => childRef.current.downloadPng()}
                        sx={{ mr: 4 }}
                        variant="outlined">
                        Download image
                    </Button>
                    <Button
                        disabled={data?.length === 0 || mode !== "normal"}
                        onClick={exportToCsv}
                        variant="outlined">
                        Download Data
                    </Button>
                </Box>
            </Paper>
        </Grid>
    );
}
