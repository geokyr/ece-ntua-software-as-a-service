const axios = require("axios");
const express = require("express");
const fs = require("fs");
const nodeCron = require("node-cron");
const app = express();
const port = 3022;

let flag = true;

async function job() {
  //console.log("flag", flag)
  if (flag) {
    fs.readFile("tr_id_FF.txt", "utf8", async (err, data) => {
      if (err) {
        return console.error(err);
      }
      //console.log("filename from local storage:", data);

      let params = {
        fileName: data,
      };

      let r
      try {//////
        r = await axios.post(
          "https://data-provider-hwoybovacq-ey.a.run.app/checkNewFFFile",
          //"http://localhost:3006/checkNewFFFile",
          params
        );
      } catch (err) {
        console.log("checking new data error:", err);
      }

  
      //console.log("----")
      // .then(res => {
      //     console.log(res.data)
      // });
      //console.log(r.data);
      if (r.data == true) {
        flag = false;
        console.log("updating db...");
        //console.log("ok")
        // let r2 = await axios.post(
        //   "https://actual-total-load-hwoybovacq-ey.a.run.app/updateDatabase"
        // );
        let r2;
        try {
          r2 = await axios.post(
            "https://ff-update-db-hwoybovacq-ey.a.run.app/updateFFDatabase",
            //"http://localhost:3005/updateFFDatabase",
            {},
            {
              headers: {
                Authorization:
                  "Basic " +
                  Buffer.from("admin" + ":" + "admin").toString("base64"),
              },
            }
          );
        } catch (err) {
          console.log("checking error ft. vlachakis: ", err);
        }
        //console.log("point 1 reached")
        //console.log(r2?.data);
        //console.log("returned from nick's api title:", r2.data["title"]);
        //console.log(JSON.parse(r2.data));
        //console.log("now we ask vlach to change")

        if (r2?.data) {
          fs.writeFile("tr_id_FF.txt", r2.data["title"], (err, data) => {
            if (err) {
              return console.error(err);
            }
            flag = true;
          });
        }
        else {
          flag = true;
        }

        // // fs.readFile('tr_id_ATL.txt', 'utf8', (err, data) => {
        //     console.log(data)
        // });
      }
    });
  }
}

const startBroker = (req, res) => {
  nodeCron.schedule("*/5 * * * * *", job);
  res.sendStatus(200);
};
app.get("/startBroker", startBroker);

app.listen(port, () => {
  console.log("FFBroker listening to port:", port);
});
