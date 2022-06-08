import urls from "./urls.json";

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

async function getATLData(token, dateFrom, mapCode) {
  // arguments: token, dateFrom, mapCode
  // returns: data
  let data = null;
  await fetch(urls.atl_send_data_url + "/getATLData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      dateFrom: dateFrom,
      mapCode: mapCode,
    }),
  })
    .then((response) => response.json())
    .then((dt) => {
      data = dt;
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data;
}

async function getAGPTData(token, dateFrom, mapCode, productionType) {
  // arguments: token, dateFrom, mapCode, productionType
  // returns: data
  let data = null;
  await fetch(urls.agpt_send_data_url + "/getAGPTData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      dateFrom: dateFrom,
      mapCode: mapCode,
      productionType: productionType,
    }),
  })
    .then((response) => response.json())
    .then((dt) => {
      data = dt;
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data;
}

async function getFFData(token, dateFrom, InMapCode, OutMapCode) {
  // arguments: token, dateFrom, InMapCode, OutMapCode
  // returns: data
  let data = null;
  await fetch(urls.ff_send_data_url + "/getFFData", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({
      dateFrom: dateFrom,
      InMapCode: InMapCode,
      OutMapCode: OutMapCode,
    }),
  })
    .then((response) => response.json())
    .then((dt) => {
      data = dt;
    })
    .catch((err) => {
      console.log("err", err);
    });
  return data;
}

export { getUserData, extendPlan, getATLData, getAGPTData, getFFData };
