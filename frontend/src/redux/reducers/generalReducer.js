const DEFAULT_DATA_CHART = {
    quantity: "",
    dateFrom: "",
    generationType: "",
    countryFrom: "",
    countryTo: "",
    lastUpdateDate: "",
    // data: [],
};

const INITIAL_STATE = {
    dataCharts: [DEFAULT_DATA_CHART],
    theme: "dark",
    extendScreenShown: false,
    editScreenShown: false,
    editChartIndex: -1,
    planEndingDate: null,
};

const removeFromArray = (arr, i) => {
    const temparr = [...arr];
    temparr.splice(i, 1);

    return temparr;
};

const generalReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case "ADD_CHART":
            return {
                ...state,
                dataCharts: [...state.dataCharts, DEFAULT_DATA_CHART],
            };
        case "DELETE_CHART":
            return {
                ...state,
                dataCharts: removeFromArray(state.dataCharts, action.payload),
            };
        case "TOGGLE_THEME":
            return {
                ...state,
                theme: state.theme === "light" ? "dark" : "light",
            };
        case "TOGGLE_EXTEND_SCREEN":
            return {
                ...state,
                extendScreenShown: !state.extendScreenShown,
            };
        case "TOGGLE_EDIT_SCREEN":
            return {
                ...state,
                editScreenShown: !state.editScreenShown,
                editChartIndex: action.payload,
            };
        case "SET_EDIT_CHART_INDEX":
            return {
                ...state,
                editChartIndex: action.payload,
            };
        case "SAVE_CHART_PARAMS":
            let newDataCharts = [];
            // copy state.dataCharts in newDataCharts
            state.dataCharts.forEach((chart, i) => {
                newDataCharts.push({ ...chart });
            });
            newDataCharts[state.editChartIndex] = action.payload;
            console.log(
                "NEW CHART SHOULD BE",
                newDataCharts[state.editChartIndex]
            );

            return {
                ...state,
                dataCharts: newDataCharts,
                editScreenShown: false,
                editChartIndex: -1,
            };
        case "SET_PLAN_ENDING_DATE":
            return {
                ...state,
                planEndingDate: action.payload,
            };

        case "SET_INITIAL_STATE_GENERAL":
            return INITIAL_STATE;
        default:
            return state;
    }
};

export default generalReducer;
