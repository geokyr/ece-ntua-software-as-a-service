# NTUA ECE SaaS 2022 Project
  
[**Energy Live 2022**](https://saas2022-19.web.app)

This is our project for the Software as a Service course of the 8th semester at the National Technical University of Athens.
It is available on the link provided above.

## Team 19 - Members

* [**Angelis Georgios**](https://github.com/ag-george)
* [**Garos Apostolis**](https://github.com/ApostolisGaros)
* [**Kyriakopoulos George**](https://github.com/geokyr)
* [**Tzelepis Serafeim**](https://github.com/sertze)
* [**Vlachakis Nikos**](https://github.com/NikosVlachakis)

## Project Description

We have developed a SaaS web application, called Energy Live 2022, that allows users to monitor electricity market prices in Europe through their browser. The data, which is made available as open data, will be collected automatically by the application, through an API connection, and will be displayed on the website as a chart. Users must have a valid paid subscription to the application to be able to use it. 

## Supported Functions

* Selection of energy market quantity (Actual total load, Generation per type, Cross border flows), country and, if applicable, other parameters, as well as the starting date of the visualisation
* Display of the values of the quantity in a chart, starting from the selected date and ending at the current date, with the option to update the chart when new data are added
* Option to download the data in a CSV file, or download the chart image
* Sign in via the "Sign in with Google" service

## Tools

For the development of the application, we used the following tools:

* Design and architecture: **Visual Paradigm CE**
* Development: **Node.js**, **Express.js**, **React.js**, **Recharts**, **Google Firebase**
* Source code and agile project management: **GitHub**
* Deployment: **Google Cloud Firestore**, **Google Firebase Hosting**, **Google Cloud Run**
* Testing: **jMeter**

## Agile Software Development

For the development of our web application, we used the Scrum framework. The development was split into 3 main sprints (as shown on our [GitHub Projects page](https://github.com/ntua/saas2022-19/projects?query=is%3Aclosed&type=classic)).

The initial sprint had, mostly, to do with the architecture of our project and the listing of the different microservices needed. The second sprint was dedicated to the development of the application's codebase, as well as an initial deployment of the various microservices on the cloud. During the third sprint we made our final touches or changes to the codebase and architecture, while performing the testing of our application, after it had been redeployed on the cloud.

## Deployment

We used Google Cloud Firestore, Google Firebase Hosting and Google Cloud Run to deploy components of our project.

The NoSQL database is deployed on the Google Cloud Firestore. Our data is stored, updated and retrieved through the useful tools provided by the framework, using the Node.js SDK.

The web application is deployed on Google Firebase Hosting. The link for our web application is provided on the [start of this README](https://github.com/ntua/saas2022-19#ntua-ece-saas-2022-project). This was done through the Firebase CLI (and npm) using the following commands under the ```/frontend``` directory:

```
$ firebase init
$ npm run build
$ firebase deploy
```

The microservices were deployed on the Google Cloud Run service. Each microservice was deployed as a separate service, inside a container and running on a specific port, specified in each ```/microservice-directory/config/dev.env``` PORT variable. This was done through the GCloud CLI using the following command for each microservice (region is set to "europe-west3"):

```
$ gcloud run deploy --source microservice-directory --port PORT
```

## Setup - Keys

For the SDK Setup, find the `firebase.js` under `/frontend/src/Firebase`, and edit the config base on the app configuration found [here](https://console.firebase.google.com/u/0/project/saas2022-19/settings/general/web:NmNjNTk5MDEtNThkNi00ZjBjLTg1MzEtM2FmNjdmNThhODhj).

For the Firebase Admin SDK, generate a new private key [here](https://console.firebase.google.com/u/0/project/saas2022-19/settings/serviceaccounts/adminsdk) and place it under the following folders:
* `/agpt-send-data/config/`
* `/agpt-update-DB/config/`
* `/atl-send-data/config/`
* `/atl-update-DB/config/`
* `/ff-send-data/config/`
* `/ff-update-DB/config/`
* `/handle-plan/config/`
* `/login-session/config/`
* `/orchestrator/config/`
