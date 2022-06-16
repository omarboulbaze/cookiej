// React
import { useState } from "react";
// Components
import CookieItem from "./CookieItem";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

// CookieGroup Component

function CookieGroup(props) {

    const [collapsed, setCollapsed] = useState(true);

    function collpaseGroup() {
      if (collapsed) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }
  // #endregion Cookie grouping

    return (
      <>
        <div
          className={
            collapsed ? "cookie-group-tag collapsed" : "cookie-group-tag"
          }
        >
          <div className="cookie-group-head" onClick={() => collpaseGroup()}>
            <span className="cookie-group-title">
            <span className="cookie-group-length">{props.tag.content.length}</span>
              {props.tag.name ? (
                props.tag.name
              ) : (
                <FontAwesomeIcon icon={faTags} />
              )}
            </span>
            <FontAwesomeIcon
              icon={collapsed ? faCaretDown : faCaretUp}
              className="icon"
            />
          </div>
          {props.tag.content.map((c) => {
            if (
              c.title.toLowerCase().includes(props.searchText.toLowerCase()) ||
              c.description.toLowerCase().includes(props.searchText.toLowerCase())
            ) {
              return (
                <CookieItem
                  key={"tag" + c._id}
                  id={c._id}
                  image={c.image}
                  title={c.title}
                  description={c.description}
                  date={c.date}
                  rank={c.rank}
                  tag={c.tag}
                />
              );
            }
            return null;
          })}
        </div>
      </>
    );
  }

  export default CookieGroup;