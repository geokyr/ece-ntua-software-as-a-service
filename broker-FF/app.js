const axios = require("axios");
const express = require("express");
const fs = require("fs");
const nodeCron = require("node-cron");
const app = express();
const port = 3022;

let flag = true;

async function job() {
  if (flag) {
    fs.readFile("tr_id_FF.txt", "utf8", async (err, data) => {
      if (err) {
        return console.error(err);
      }

      let params = {
        fileName: data,
      };

      let r
      try {//////
        r = await axios.post(
          "https://data-provider-hwoybovacq-ey.a.run.app/checkNewFFFile",
          params
        );
      } catch (err) {
        console.log("checking new data error:", err);
      }

      if (r.data == true) {
        flag = false;
        console.log("updating db...");
        let r2;
        try {
          r2 = await axios.post(
            "https://ff-update-db-hwoybovacq-ey.a.run.app/updateFFDatabase",
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
