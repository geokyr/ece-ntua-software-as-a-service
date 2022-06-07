import * as React from "react";
import { useTheme } from "@mui/material/styles";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    Label,
    ResponsiveContainer,
} from "recharts";
import Title from "./Title";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const data = [
    createData("00:00", 0),
    createData("03:00", 300),
    createData("06:00", 600),
    createData("09:00", 800),
    createData("12:00", 1500),
    createData("15:00", 2000),
    createData("18:00", 2400),
    createData("21:00", 2400),
    createData("24:00", undefined),
];

export default function Chart({ quantity, country, generationType }) {
    const theme = useTheme();

    return (
        <React.Fragment>
            <Box
                sx={{
                    display: "flex",
                    // backgroundColor:"red",
                    alignItems: "center",
                    justifyContent: "space-between",
                }}>
                <Title>{quantity}</Title>
                <Title>{generationType}</Title>

                <Title>{country}</Title>
            </Box>

            <div></div>
            <Box
                width={"99%"}
                height={400}
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode == "light"
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "column",
                }}>
                <Typography
                    variant="title"
                    color="text.secondary"
                    align="center">
                    Loading
                </Typography>
                <CircularProgress />
            </Box>
        </React.Fragment>
    );
}
