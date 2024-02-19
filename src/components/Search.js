import React from "react";

import Accordion from "./Accordion";
import serp from "../api/serp";

const KEY = "3018ce951102942258f6aeb445eaf00aa76be24ca95d9474faf00822b803c8c5";

class Search extends React.Component {
  state = {
    value: "Rubik's Cube",
    searches: [],
  };

  componentDidMount() {
    this.onFormSubmit(new Event("submit"));
  }

  onFormSubmit = async (event) => {
    event.preventDefault();

    this.setState({ searches: null });

    const sch_response = await serp.get("/search", {
      params: {
        engine: "google_scholar",
        q: this.state.value,
        hl: "en",
        api_key: KEY,
      },
    });

    this.setState({ searches: sch_response.data.organic_results });
  };

  getCitations = async (value) => {
    const cit_response = await serp.get("/search", {
      params: {
        engine: "google_scholar_cite",
        q: value,
        hl: "en",
        api_key: KEY,
      },
    });

    return cit_response.data.citations;
  };

  renderResults() {
    if (!this.state.searches) return <h2>Loading...</h2>;

    return (
      <Accordion
        searches={this.state.searches}
        getCitations={this.getCitations}
      />
    );
  }

  render() {
    return (
      <div>
        <form
          ref={this.formRef}
          className="ui form"
          onSubmit={this.onFormSubmit}
        >
          <div className="field">
            <label>Search citations</label>
            <div className="ui icon input">
              <input
                type="text"
                value={this.state.value}
                placeholder="Example: Functional Programming"
                onChange={(e) => this.setState({ value: e.target.value })}
              />
              <i className="search icon" />
            </div>
          </div>
        </form>
        {this.renderResults()}
      </div>
    );
  }
}

export default Search;
