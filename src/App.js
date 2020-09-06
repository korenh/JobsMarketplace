import React from "react";
import Signin from "./components/sign/Signin";
import Signup from "./components/sign/Signup";
import Header from "./components/Main/Header";
import Particles from "react-particles-js";
import Nav from "./components/Main/Nav";
import PublishManage from "./components/jobs/publishmanage/PublishManage";
import Jobs from "./components/jobs/jobs/Jobs";
import Myjobs from "./components/jobs/myjobs/Myjobs";
import { UserProvider } from "./components/protected/UserContext";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <UserProvider>
      <Router>
        <Particles
          className="Particles"
          params={{
            particles: {
              number: {
                value: 100,
                density: {
                  enable: true,
                  value_area: 1000,
                },
              },
            },
          }}
        />
        <Route path="/" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <Route path="/main" component={Header} />
        <Route path="/main" component={Nav} />
        <Route path="/main/publishmanage" exact component={PublishManage} />
        <Route path="/main/jobs" exact component={Jobs} />
        <Route path="/main/myjobs" exact component={Myjobs} />
        <Redirect to="/" />
      </Router>
    </UserProvider>
  );
}

export default App;
