import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItem from "@mui/material/ListItem";

import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import LayersIcon from "@mui/icons-material/Layers";
import AssignmentIcon from "@mui/icons-material/Assignment";
import IconButton from "@mui/material/IconButton";
import AddchartOutlinedIcon from "@mui/icons-material/AddchartOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector, useDispatch } from "react-redux";
import {
    addDataChart,
    deleteDataChart,
    toggleEditScreen,
    saveChartParams,
} from "../redux/actions/generalActions";

export default function DrawerList() {
    const dataCharts = useSelector((state) => state.general.dataCharts);
    const dispatch = useDispatch();

    const addChart = () => {
        const newChartIndex = dataCharts.length;
        dispatch(addDataChart());
        dispatch(toggleEditScreen(newChartIndex));
    };

    const editChart = (index) => {
        dispatch(toggleEditScreen(index));
    };

    const removeChart = (i) => {
        dispatch(deleteDataChart(i));
    };

    return (
        <React.Fragment>
            {dataCharts.map((chart, index) => (
                <ListItem key={index}>
                    <ListItemIcon>
                        <BarChartOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText
                        primary={"LineChart " + (index + 1).toString()}
                    />
                    <IconButton
                        onClick={() => editChart(index)}
                        sx={{ mr: 1 }}
                        edge="end"
                        aria-label="comments">
                        <EditIcon />
                    </IconButton>
                    <IconButton
                        onClick={() => removeChart(index)}
                        edge="end"
                        aria-label="comments">
                        <DeleteOutlineOutlinedIcon />
                    </IconButton>
                </ListItem>
            ))}

            <ListItemButton onClick={addChart}>
                <ListItemIcon>
                    <AddchartOutlinedIcon />
                </ListItemIcon>
                <ListItemText primary="Add chart" />
            </ListItemButton>
        </React.Fragment>
    );
}
