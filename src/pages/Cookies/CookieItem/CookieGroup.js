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


function CookieGroup(props) {

    const [collapsed, setCollapsed] = useState(true);

    function collpaseGroup() {
      if (collapsed) {
        setCollapsed(false);
      } else {
        setCollapsed(true);
      }
    }


  if(true){
    return (
      <>
        <div
          className={
            collapsed ? "cookie-group-tag collapsed" : "cookie-group-tag"
          }
        >
          <div className="cookie-group-head" onClick={() => collpaseGroup()}>
            <span className="cookie-group-title">
            <span className="cookie-group-length">{props.group.content.length}</span>
              {props.group.name ? (
                props.group.name.replace(/./, c => c.toUpperCase())
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
      </>
    );
  }else{
    return(<h1>broski</h1>)
  }}
    

  export default CookieGroup;