import * as React from "react";
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

import Typography from "@mui/material/Typography";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";

function preventDefault(event) {
    event.preventDefault();
}

export default function ChartBox({ quantity, country, generationType, mode, data }) {
    const lastUpdateDate = new Date();

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
                        generationType={generationType}
                    />
                )}
                <Typography variant="body2" color="text.secondary" align="left">
                    {"Last update: "}
                    {lastUpdateDate.toString()}
                </Typography>

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
                    <Button sx={{ mr: 4 }} variant="outlined">
                        Download image
                    </Button>
                    <Button variant="outlined">Download Data</Button>
                </Box>
            </Paper>
        </Grid>
    );
}
