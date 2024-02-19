import React, { useRef, useState } from "react";

const Accordion = (props) => {
  const [selectedSearch, setSelectedSearch] = useState("");
  const [citations, setCitations] = useState(null);

  const inputRef = useRef(null);

  const copyToClipboard = async (event) => {
    await navigator.clipboard.writeText(inputRef.current.value);
  };

  const onTitleClick = async (selectedSearch) => {
    setSelectedSearch(selectedSearch);

    setCitations(null);
    const response = await props.getCitations(selectedSearch);
    setCitations(response);
  };

  const renderedCitations = citations ? (
    citations.map((citation) => {
      return (
        <div key={citation.title} className="item">
          <div className="right floated content">
            <div
              className="ui vertical animated button"
              tabIndex="0"
              onClick={copyToClipboard}
            >
              <div className="hidden content">Copy</div>
              <div className="visible content">
                <i className="copy icon"></i>
              </div>
            </div>
          </div>

          <div className="content">
            <div className="header">{citation.title}</div>
          </div>
          <form className="ui form">
            <input
              ref={inputRef}
              value={citation.snippet}
              readOnly
              style={{ maxWidth: "70%" }}
              onFocus={(e) => e.target.select()}
            />
          </form>
        </div>
      );
    })
  ) : (
    <h3>Loading...</h3>
  );

  const renderedSearches = props.searches.map((search) => {
    const active = search.result_id === selectedSearch ? "active" : "";

    return (
      <React.Fragment key={search.result_id}>
        <div
          className={`title ${active}`}
          onClick={() => onTitleClick(search.result_id)} // arrow function necessary
        >
          <i className="dropdown icon"></i>
          <h3>{search.title}</h3>
          <p>
            <a href={search.link} target="blank">
              {search.snippet}
            </a>
          </p>
        </div>
        <div className={`content ${active}`}>
          <h4>Citations</h4>
          <div className="ui middle aligned divided list">
            {renderedCitations}
          </div>
          <hr />
          <p>Type: {search.type}</p>
          <p>Publication Info: {search.publication_info.summary}</p>
          <p>
            Author(s):{" "}
            {search.publication_info.authors
              ? search.publication_info.authors.map((author) => author.name)
              : null}
          </p>
        </div>
      </React.Fragment>
    );
  });

  return <div className="ui styled fluid accordion">{renderedSearches}</div>;
};

export default Accordion;
