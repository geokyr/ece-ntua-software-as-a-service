export const addDataChart = (route) => ({
    type: "ADD_CHART",
});

export const deleteDataChart = (index) => ({
    type: "DELETE_CHART",
    payload: index,
});

export const toggleTheme = () => ({
    type: "TOGGLE_THEME",
});

export const toggleExtendScreen = () => ({
    type: "TOGGLE_EXTEND_SCREEN",
});

export const toggleEditScreen = (index) => ({
    type: "TOGGLE_EDIT_SCREEN",
    payload: index,
});

export const saveChartParams = (chart) => ({
    type: "SAVE_CHART_PARAMS",
    payload: chart,
});

export const setPlanEndingDate = (date) => ({
    type: "SET_PLAN_ENDING_DATE",
    payload: date,
});
