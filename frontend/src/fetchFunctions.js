import urls from "./urls.json";

function loginSession() {
    // arguments: token
    // returns: successcode
}

async function extendPlan(token, days) {
    // arguments: token, extendDays
    // returns: successcode, newEndingDate
    let data = null;
    await fetch(urls.hanle_plan_url + "/extendPlan", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            extendDays: days,
        }),
    })
        .then((response) => response.json())
        .then((dt) => {
            data = dt;
        });
    return data;
}

async function getUserData(token) {
    let data = null;
    await fetch(urls.orchestrator_url + "/orchestrator", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
        },
        body: JSON.stringify({
            function: "getUserData",
        }),
    })
        .then((response) => response.json())
        .then((dt) => {
            data = dt;
        });
    return data;
}

export { getUserData, loginSession, extendPlan };
