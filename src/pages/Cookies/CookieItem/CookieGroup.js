// React
import { useEffect, useState } from "react";
// Components
import CookieItem from "./CookieItem";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCaretUp,
  faCaretDown,
  faTags,
} from "@fortawesome/free-solid-svg-icons";

function CookieGroup(props) {
  const [collapsed, setCollapsed] = useState(true);
  const [groupBackground, setGroupBackground] = useState();

  function collpaseGroup() {
    if (collapsed) {
      setCollapsed(false);
    } else {
      setCollapsed(true);
    }
  }

  // Change the background of the group depending of the rank (props.group.name) on Component Mount
  useEffect(() => {
    switch (props.group.name) {
      case "bronze":
        setGroupBackground("rgb(250, 232, 214)");
        break;
      case "silver":
        setGroupBackground("rgb(237, 237, 237)");
        break;
      case "gold":
        setGroupBackground("rgb(250, 244, 214)");
        break;
      case "platinum":
        setGroupBackground("rgb(250, 214, 250)");
        break;
      case "diamond":
        setGroupBackground("rgb(214, 238, 250");
        break;

      default:
        break;
    }
  }, [props.group.name]);

  if (props.groupBy === "rank") {
    return (
      <div
        className={
          collapsed ? "cookie-group-tag collapsed" : "cookie-group-tag"
        }
        style={{ backgroundColor: groupBackground }}
      >
        <div className="cookie-group-head" onClick={() => collpaseGroup()}>
          <span className="cookie-group-title">
            <span className="cookie-group-length">
              {props.group.content.length}
            </span>
            {props.group.name.replace(/./, (c) => c.toUpperCase())}
          </span>
          <FontAwesomeIcon
            icon={collapsed ? faCaretDown : faCaretUp}
            className="icon"
          />
        </div>
        {props.group.content.map((c) => {
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
    );
  } else if (props.groupBy === "tag") {
    return (
      <div
        className={
          collapsed ? "cookie-group-tag collapsed" : "cookie-group-tag"
        }
      >
        <div className="cookie-group-head" onClick={() => collpaseGroup()}>
          <span className="cookie-group-title">
            <span className="cookie-group-length">
              {props.group.content.length}
            </span>
            {props.group.name ? (
              props.group.name.replace(/./, (c) => c.toUpperCase())
            ) : (
              <FontAwesomeIcon icon={faTags} />
            )}
          </span>
          <FontAwesomeIcon
            icon={collapsed ? faCaretDown : faCaretUp}
            className="icon"
          />
        </div>
        {props.group.content.map((c) => {
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
    );
  }
}

export default CookieGroup;
