import * as React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import countries from "./countries.json";
import generationTypes from "./generationTypes.json";
import quantities from "./quantities.json";

export default function CountrySelector({ propVal, setPropVal, mode }) {
    const [value, setValue] = React.useState(propVal);
    let options = [];
    let label = "";
    if (mode === "countryFrom") {
        options = countries;
        label = "Country From";
    } else if (mode === "countryTo") {
        options = countries;
        label = "Country To";
    } else if (mode === "quantity") {
        options = quantities;
        label = "Quantity";
    } else if (mode === "generationType") {
        options = generationTypes;
        label = "Generation Type";
    } else if (mode === "country") {
        options = countries;
        label = "Country";
    }

    const handleChange = (event) => {
        setPropVal(event.target.value);
        setValue(event.target.value);
    };

    return (
        <Box sx={{ minWidth: "40vw" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    error={value === ""}
                    defaultValue={propVal}
                    label={label}
                    onChange={handleChange}>
                    {options.map((opt, i) => (
                        <MenuItem key={i} value={opt.ref}>
                            {opt.name}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Box>
    );
}
