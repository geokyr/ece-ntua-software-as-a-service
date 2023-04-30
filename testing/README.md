# Testing

## JMeter

To test our software we used [JMeter](https://jmeter.apache.org/).

More specifically, we set JMeter as a proxy server while browsing our [Web Application](https://saas2022-19.web.app/) and we captured the http(s) requests triggered by the usage of the UI with the help of [JMeter Script Recorder](https://jmeter.apache.org/usermanual/jmeter_proxy_step_by_step.html).

Then after capturing all the traffic produced, we ran simultaneously the requests related to a specific front-end action (requests produced by extending a plan, adding a new ATL chart etc). The number of threads running the test was initially set to 10000, but it ended up being 1000 for each request to avoid extra billing on firebase. Finally, after succesfully running the tests for each front-end action, we simulated the complete scenario (all the http requests produced based on the usage of the web application, with the implementation of think time as well) with number of threads again set on 1000. All the tests were **successful with 0% Error.**
  
## Script

The script directory contains the .jmx file that was used both for the script recording and the testing based on the recorded requests.

## Results

The results directory contains the subdirectories for every distinct action of the web app. Each subdirectory contains a .csv file for every request with the corresponding information. It also contains a .csv file with the information of all the requests and a .png file that contains the Aggregate Graph. There is, also, a CompleteScenarioExecution directory which has the results of the complete testing of the web app. 

Below, you can see the **Aggregate Graph** of the complete scenario:

<img width="1073" alt="TotalScenarioAggregateGraph" src="https://user-images.githubusercontent.com/58773659/177205380-02aa3220-b373-4c9a-b949-21232001fdd0.png">
