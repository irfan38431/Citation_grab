import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Search from "./Search";
import Menu from "./Menu";

class App extends React.Component {
  render() {
    return (
      <div className="ui container">
        <BrowserRouter>
          <Menu />
          <Route path="/citation-grab/" exact component={Search} />
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
