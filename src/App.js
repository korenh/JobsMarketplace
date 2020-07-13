import React from "react";
import Signin from "./components/sign/Signin";
import Signup from "./components/sign/Signup";
import Header from "./components/Main/Header";
import Nav from "./components/Main/Nav";
import Search from "./components/jobs/Search";
import Jobs from "./components/jobs/Jobs";
import Myjobs from "./components/jobs/Myjobs";
import { BrowserRouter as Router, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Signin} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/main" component={Header} />
      <Route path="/main" component={Nav} />
      <Route path="/main/search" exact component={Search} />
      <Route path="/main/jobs" exact component={Jobs} />
      <Route path="/main/myjobs" exact component={Myjobs} />
    </Router>
  );
}

export default App;
