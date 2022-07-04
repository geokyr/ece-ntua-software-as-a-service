# For the testing process of our software we used [JMeter](https://jmeter.apache.org/).
More specifically, we set JMeter as a proxy server while browsing our [site](https://saas2022-19.web.app/) and we captured the http(s) requests
triggered by the usage of the UI with the help of [JMeter Script Recorder](https://jmeter.apache.org/usermanual/jmeter_proxy_step_by_step.html).
Then after capturing all the traffic produced, we ran simultaneously the requests related to a specific Front-End action(requests produced: by extending plan,
, adding a new ATL chart etc.). The number of threads running the test was initially set to 10000, but it ended up being 1000 for each request to avoid extra 
billing on firebase.
  Finally after succesfully running the tests for each Front-End action, we simulated the complete scenario(all the http requests produced based by the complete usage of the web application, with the implementation of think time as well) with number of threads again set on 1000. All the tests were **_successful with 0% Error._**
  
Script folder
------
Script folder contains the .jmx file that was used both for the script recording and the testing based on the recorded requests.

Results folder
-------
Results folder contains the subfolders for every distinct action of the web app. Each subfolder contains a .csv file for every request with the corresponding
information. It also contains a .csv file with the information of all the requests and a .png file that contains the Aggregate Graph.
Also there is a CompleteScenarioExecution folder which has the results of the complete testing of the web app. Below you can see the Aggregate Graph of the complete Scenario:
<img width="1073" alt="TotalScenarioAggregateGraph" src="https://user-images.githubusercontent.com/58773659/177205380-02aa3220-b373-4c9a-b949-21232001fdd0.png">
