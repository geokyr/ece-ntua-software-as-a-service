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
import moment from "moment";
import { useCurrentPng } from "recharts-to-png";

// Generate Sales Data
function createData(time, amount) {
    return { time, amount };
}

const formatXAxis = (tickItem) => {
    return moment(tickItem).format("DD/MM/YYYY HH:mm");
};

export default function Chart({ quantity, country, generationType, data }) {
    const theme = useTheme();
    const [getPng, { ref, isLoading }] = useCurrentPng();

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
            <ResponsiveContainer width={"99%"} height={400}>
                <LineChart
                    data={data}
                    margin={{
                        top: 16,
                        right: 16,
                        bottom: 0,
                        left: 24,
                    }}>
                    <XAxis
                        dataKey="time"
                        tickFormatter={formatXAxis}
                        interval={"preserveStartEnd"}
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}
                    />
                    <YAxis
                        stroke={theme.palette.text.secondary}
                        style={theme.typography.body2}>
                        <Label
                            angle={270}
                            position="left"
                            style={{
                                textAnchor: "middle",
                                fill: theme.palette.text.primary,
                                ...theme.typography.body1,
                            }}></Label>
                    </YAxis>
                    <Line
                        isAnimationActive={false}
                        type="monotone"
                        dataKey="amount"
                        stroke={theme.palette.primary.main}
                        dot={false}
                    />
                </LineChart>
            </ResponsiveContainer>
        </React.Fragment>
    );
}
