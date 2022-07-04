import * as React from "react";
import { useCallback, forwardRef, useRef, useImperativeHandle } from "react";
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
import Typography from "@mui/material/Typography";
import FileSaver from "file-saver";

const formatXAxis = (tickItem) => {
    return moment(tickItem).format("DD/MM/YYYY HH:mm");
};

// replaces spaces with dashes in string
const formatTitle = (str) => {
    return str.replace(/\s/g, "_");
};

const Chart = forwardRef(
    ({ quantity, country, generationType, data, dateFrom }, childRef) => {
        const theme = useTheme();

        // This will be called from the parent component to download the chart as a PNG
        useImperativeHandle(childRef, () => ({
            downloadPng() {
                handleChartDownload();
            },
        }));

        const [getChartPng, { ref: chartRef }] = useCurrentPng();

        const handleChartDownload = useCallback(async () => {
            const png = await getChartPng();

            if (png) {
                FileSaver.saveAs(
                    png,
                    `${formatTitle(quantity)}_${formatTitle(
                        country
                    )}_${formatTitle(generationType)}_${moment(dateFrom).format(
                        "DD_MM_YYYY_h:mm"
                    )}.png`
                );
            }
        }, [getChartPng, quantity, country, generationType]);

        // console.log(data);
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
                {data?.length == 0 && (
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}>
                        <Typography
                            sx={{
                                color: "red",
                                fontSize: 20,
                                fontWeight: "bold",
                            }}>
                            No data available
                        </Typography>
                    </Box>
                )}

                <div></div>

                <ResponsiveContainer width={"99%"} height={400}>
                    <LineChart
                        data={data}
                        ref={chartRef}
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
);

export default Chart;
