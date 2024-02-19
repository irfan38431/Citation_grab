import React from "react";
import { Link } from "react-router-dom";
// const scholarLogo = require("../static/scholar-logo.png");
const appLogo = require("../static/logo512.png");

const Menu = () => {
  return (
    <React.Fragment>
      {/* <img
        src={appLogo}
        style={{ width: "100%", height: "auto" }}
        alt="Citation Grab logo"
      /> */}
      <div className="ui fluid two item stackable labeled icon inverted menu">
        <Link to="/citation-grab/" className="item">
          <img
            style={{ width: "30px", height: "auto", paddingBottom: "10px" }}
            src={appLogo}
            alt="homepage"
          />
          Search
        </Link>
        <Link to="/citation-grab/list" className="item">
          <i className="list icon" />
          List
        </Link>
      </div>
    </React.Fragment>
  );
};

export default Menu;
