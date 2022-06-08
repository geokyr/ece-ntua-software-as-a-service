import { useState, useEffect } from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import DrawerList from "./DrawerList.js";
import Footer from "./Footer";
import ChartBox from "./ChartBox";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { useSelector, useDispatch } from "react-redux";
import { useAuth } from "../Firebase/firebaseAuthContext";
import {
  toggleTheme,
  setPlanEndingDate,
} from "../redux/actions/generalActions";
import { useNavigate } from "react-router-dom";
import ExtendPlanScreen from "../ExtendPlanScreen/ExtendPlanScreen";
import EditChartParameters from "./EditChartParameters";
import Backdrop from "@mui/material/Backdrop";
import countries from "./countries.json";
import { getUserData, loginSession, extendPlan } from "../fetchFunctions";
import moment from "moment";
const drawerWidth = 400;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const ClickText = styled(Typography, {
  shouldForwardProp: (prop) => prop,
})({
  textDecoration: "none",
  "&:hover": {
    cursor: "pointer",
  },
  "user-select": "none",
});

// const mdTheme = createTheme();

const hasPlanDaysLeft = true;

// compare DD/MM/YYYY to now moment
const compareDates = (date) => {
  const now = new Date();

  var dateMomentObject = moment(date, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
  var dateToCompare = dateMomentObject.toDate(); // convert moment.js object to
  if (dateToCompare.getTime() > now.getTime()) {
    return true;
  } else {
    return false;
  }
};

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

function Main() {
  const dataCharts = useSelector((state) => state.general.dataCharts);
  const extendScreenShown = useSelector(
    (state) => state.general.extendScreenShown
  );

  const [ready, setReady] = useState(false);
  const planEndingDate = useSelector((state) => state.general.planEndingDate);

  const [open, setOpen] = useState(true);
  const theme = useSelector((state) => state.general.theme);
  const { editChartIndex, editScreenShown } = useSelector(
    (state) => state.general
  );
  const { logout } = useAuth();
  const auth = useAuth();
  const currentUser = auth.currentUser;
  const dispatch = useDispatch();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const changeTheme = () => {
    dispatch(toggleTheme());
  };

  useEffect(() => {
    // setTimeout(() => {
    //     setReady(true);
    // }, 1000);
    getUserData(currentUser.accessToken).then((data) => {
      console.log("userData", data);

      dispatch(setPlanEndingDate(data.expirationDate));
      setReady(true);
    });
  }, []);

  // return country name using ref from countries.json
  const getCountryName = (countryRef) => {
    const countryFound = countries.find(
      (country) => country.ref === countryRef
    );
    if (countryFound) {
      return countryFound.name;
    } else return "";
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <CssBaseline />
      <AppBar position="absolute" open={open}>
        <Toolbar
          sx={{
            pr: "24px", // keep right padding when drawer closed
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{
              marginRight: "36px",
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            component="h1"
            variant="h4"
            color="inherit"
            noWrap
            sx={{
              flexGrow: 1,
              float: "left",
              // backgroundColor: "red",
              textAlign: "left",
            }}
          >
            Energy Live 2022
          </Typography>

          <Box
            // sx={{ flexGrow: 5 }}

            // flexDirection={"row"}
            // backgroundColor={"red"}
            position={"absolute"}
            right={"3%"}
            noWrap
            flexGrow
          >
            <IconButton
              onClick={changeTheme}
              sx={{ mr: 3, float: "left" }}
              color="inherit"
            >
              {theme === "dark" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              fontWeight={"normal"}
              noWrap
              // position={"relative"}
              sx={{ float: "left" }}
              marginRight={3}
            >
              {currentUser?.email || "email@gmail.com"}
            </Typography>

            <ClickText
              component="h1"
              variant="h5"
              color="inherit"
              fontWeight={"normal"}
              onClick={logout}
              noWrap
              sx={{
                float: "right",
                textDecoration: "none",
                "&:hover": {
                  cursor: "pointer",
                },
              }}
            >
              Sign Out
            </ClickText>
          </Box>

          {/* <IconButton color="inherit">
              <Badge badgeContent={4} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <Toolbar
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
            px: [1],
          }}
        >
          <IconButton onClick={toggleDrawer}>
            <ChevronLeftIcon />
          </IconButton>
        </Toolbar>
        <Divider />
        <List component="nav">
          <DrawerList />
        </List>
      </Drawer>
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode == "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Container
          maxWidth="lg"
          sx={{
            mt: 4,
            mb: "5vw",
          }}
        >
          {dataCharts.length <= 0 && (
            <Box
              sx={{
                width: "100%",
                height: "100%",
                // backgroundColor: "green",
              }}
            >
              <Typography
                component="h1"
                variant="h6"
                fontWeight={"normal"}
                noWrap
                // position={"relative"}
                sx={{
                  float: "center",
                  color: (theme) =>
                    theme.palette.mode == "light"
                      ? theme.palette.grey[900]
                      : theme.palette.grey[100],
                }}
                marginRight={3}
              >
                No chart available
              </Typography>
            </Box>
          )}
          {dataCharts.map((chart, index) => {
            console.log("chart", chart);
            return (
              <ChartBox
                quantity={chart.quantity}
                country={
                  getCountryName(chart.countryFrom) +
                  (chart.countryTo
                    ? "->" + getCountryName(chart.countryTo)
                    : "")
                }
                generationType={chart.generationType}
                data={chart.data}
                // mode={
                //   !ready
                //     ? "loading"
                //     : compareDates(planEndingDate)
                //     ? "normal"
                //     : "extend"
                // }
                mode={"normal"}
              />
            );
          })}
        </Container>
      </Box>
      <Footer
        daysLeft={getDaysDifference(planEndingDate)}
        serviceStatus={"Live"}
      />
      {extendScreenShown && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <ExtendPlanScreen />
        </Backdrop>
      )}
      {editScreenShown && (
        <Backdrop
          sx={{
            color: "#fff",
            zIndex: (theme) => theme.zIndex.drawer + 1,
          }}
          open={true}
        >
          <EditChartParameters />
        </Backdrop>
      )}
    </Box>
  );
}

export default function MainScreen() {
  return <Main />;
}
