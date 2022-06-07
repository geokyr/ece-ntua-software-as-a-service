import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toggleExtendScreen } from "../redux/actions/generalActions";

const ClickText = styled(Typography, {
    shouldForwardProp: (prop) => prop,
})({
    textDecoration: "none",
    "&:hover": {
        cursor: "pointer",
    },
    "user-select": "none",
});

export default function Footer({ serviceStatus, daysLeft }) {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    return (
        <Box
            component="main"
            position={"absolute"}
            bottom={"0px"}
            mt={3}
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === "light"
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                display: "flex",
                position: "absolute",
                alignItems: "center",
                justifyContent: "center",
                // height: "10vh",
                padding: "1vw",
                width: "100vw",
                borderTopColor: (theme) => theme.palette.grey[300],
                borderTopStyle: "solid",
                borderTopWidth: 1,
                // overflow: "auto",
            }}>
            <Typography
                component="h1"
                variant="h6"
                color={(theme) => theme.palette.text.secondary}
                noWrap
                sx={{ flexGrow: 1 }}>
                Service status: {serviceStatus}
            </Typography>

            <Typography
                component="h1"
                variant="h6"
                color={(theme) =>
                    daysLeft > 0
                        ? theme.palette.text.secondary
                        : theme.palette.error.main
                }
                noWrap
                sx={{ flexGrow: 1 }}>
                Days left: {daysLeft}
            </Typography>
            <ClickText
                component="h1"
                variant="h6"
                color={(theme) => theme.palette.text.secondary}
                noWrap
                sx={{ flexGrow: 1 }}
                onClick={() => dispatch(toggleExtendScreen())}>
                Extend Plan
            </ClickText>
        </Box>
    );
}
