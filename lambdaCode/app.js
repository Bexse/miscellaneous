import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Home } from "./Home";
import { InterestingFacts } from "./component/Posts/InterestingFacts/InterestingFacts";
import { MyArchitecture } from "./component/Posts/MyArchitecture/MyArchitecture";
import { WhatIsAws } from "./component/Posts/WhatIsAws/WhatIsAws";
import { AwsSaa } from "./component/Posts/AwsSaa/AwsSaa";
import { NotFound } from "./404";

class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/Blog/MyArchitecture" component={MyArchitecture} />
            <Route path="/Blog/InterestingFacts" component={InterestingFacts} />
            <Route path="/Blog/WhatIsAws" component={WhatIsAws} />
            <Route path="/Blog/AwsSaa" component={AwsSaa} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;
