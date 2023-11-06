# ece-ntua-software-as-a-service-technologies

Semester Project for the [Software-as-a-Service Technologies](https://www.ece.ntua.gr/en/undergraduate/courses/3399) course, during the 8th semester of the School of Electrical and Computer Engineering at the National Technical University of Athens.

## Contributors
- [Apostolis Garos](https://github.com/ApostolisGaros)
- [Georgios Angelis](https://github.com/GeorgeAngelis)
- [Georgios Kyriakopoulos](https://github.com/geokyr)
- [Nikos Vlachakis](https://github.com/NikosVlachakis)
- [Serafeim Tzelepis](https://github.com/sertze)

## Project Description
We have developed a SaaS web application, [Energy Live 2022](https://saas2022-19.web.app), that allows users to monitor electricity market prices in Europe through their browser. The data, which is made available as open data, will be collected automatically by the application, through an API connection, and will be displayed on the website as a chart. Users must have a valid paid subscription to the application to be able to use it. 

## Supported Functions
- Selection of energy market quantity (Actual total load, Generation per type, Cross border flows), country and, if applicable, other parameters, as well as the starting date of the visualisation
- Display of the values of the quantity in a chart, starting from the selected date and ending at the current date, with the option to update the chart when new data are added
- Option to download the data in a CSV file, or download the chart image
- Sign in via the "Sign in with Google" service

## Tools
For the development of the application, we used the following tools:

- Design and architecture: [Visual Paradigm CE](https://www.visual-paradigm.com/download/community.jsp)
- Development: [Node.js](https://nodejs.org/en), [Express.js](https://expressjs.com/), [React.js](https://react.dev/), [Recharts](https://recharts.org/en-US/), [Google Firebase](https://firebase.google.com/)
- Source code and agile project management: [GitHub](https://github.com/)
- Deployment: [Google Cloud Firestore](https://firebase.google.com/docs/firestore), [Google Firebase Hosting](https://firebase.google.com/docs/hosting), [Google Cloud Run](https://cloud.google.com/run)
- Testing: [jMeter](https://jmeter.apache.org/)

## Agile Software Development
For the development of our web application, we used the Scrum framework. The development was split into 3 main sprints.

The initial sprint had, mostly, to do with the architecture of our project and the listing of the different microservices needed. The second sprint was dedicated to the development of the application's codebase, as well as an initial deployment of the various microservices on the cloud. During the third sprint we made our final touches or changes to the codebase and architecture, while performing the testing of our application, after it had been redeployed on the cloud.

## Deployment
We used Google Cloud Firestore, Google Firebase Hosting and Google Cloud Run to deploy components of our project.

The NoSQL database is deployed on the Google Cloud Firestore. Our data is stored, updated and retrieved through the useful tools provided by the framework, using the Node.js SDK.

The web application is deployed on Google Firebase Hosting. The link for our web application is available at the top of this README. This was done through the Firebase CLI (and npm) using the following commands under the `/frontend` directory:

```
firebase init
npm run build
firebase deploy
```

The microservices were deployed on the Google Cloud Run service. Each microservice was deployed as a separate service, inside a container and running on a specific port, specified in each `/microservice-directory/config/dev.env` PORT variable. This was done through the GCloud CLI using the following command for each microservice (region is set to "europe-west3"):

```
gcloud run deploy --source microservice-directory --port PORT
```

## Setup - Keys
For the SDK Setup, place the following, together with the config based on the app configuration found [here](https://console.firebase.google.com/u/0/project/saas2022-19/settings/general/web:NmNjNTk5MDEtNThkNi00ZjBjLTg1MzEtM2FmNjdmNThhODhj), at `/frontend/src/Firebase/firebase.js`:

```
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const config = {
// Add the SDK firebase config here
};

const app = initializeApp(config);
export const auth = getAuth(app);
export default app;
```

For the Firebase Admin SDK, generate a new private key [here](https://console.firebase.google.com/u/0/project/saas2022-19/settings/serviceaccounts/adminsdk) and place it under all the following folders:
- `/agpt-send-data/config/`
- `/agpt-update-DB/config/`
- `/atl-send-data/config/`
- `/atl-update-DB/config/`
- `/ff-send-data/config/`
- `/ff-update-DB/config/`
- `/handle-plan/config/`
- `/login-session/config/`
- `/orchestrator/config/`
