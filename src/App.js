import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
import "./App.css";

import AddTutorial from "./components/AddTutorial";
import Tutorial from "./components/Tutorial";
import TutorialsList from "./components/TutorialsList";

import AddTestCases from "./components/AddTestCases";
import TestCase from "./components/TestCase";
import TestCaseList from "./components/TestCaseList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/tutorials" className="navbar-brand">
          Build techknowledge
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/tutorials"} className="nav-link">
              TutorialsList
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addTutorial"} className="nav-link">
              AddTutorial
            </Link>
          </li>
        
          <li className="nav-item">
            <Link to={"/testcases"} className="nav-link">
              TestCases List
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/addTestCase"} className="nav-link">
              AddTestCase
            </Link>
          </li>
        </div>
      </nav>

      <div className="container mt-3">
        <Switch>
          <Route exact path={["/", "/tutorials"]} component={TutorialsList} />
          <Route exact path="/addTutorial" component={AddTutorial} />
          <Route path="/tutorials/:id" component={Tutorial} />
          <Route exact path={["/", "/testcases"]} component={TestCaseList} />
          <Route exact path="/addTestCase" component={AddTestCases} />
          <Route path="/testcases/:id" component={TestCase} />



        </Switch>
      </div>
    </div>
  );
}

export default App;
