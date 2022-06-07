import * as React from "react";
import TextField from "@mui/material/TextField";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";

//compare moment date to current date

export default function BasicDateTimePicker({ date, setDate }) {
    const [value, setValueState] = React.useState(date);
    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <DateTimePicker
                renderInput={(props) => <TextField {...props} />}
                label="Date from:"
                minDate={moment("January 1, 2022 00:00:00")}
                disableFuture
                value={value}
                sx={{ width: "100%" }}
                onChange={(newValue) => {
                    setDate(newValue);
                    setValueState(newValue);
                }}
            />
        </LocalizationProvider>
    );
}
