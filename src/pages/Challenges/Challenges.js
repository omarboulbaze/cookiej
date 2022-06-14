import { useReducer } from "react";
import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Topbar from "../Components/Topbar/Topbar";
import "./Challenges.css";

const countReducer = (state,action)=>{
    if(action.type==="INCREMENT"){
        return {value: state.value + action.value}
    }
}

function Challenges() {

  document.title = "Challenges | Cookie Jar";

  const [count, dispatchCount] = useReducer( countReducer, {value: null})

  return (
    <>
      <Topbar text="Challenges" />
      <div
        className="empty-container"
        style={{ maxWidth: "640px", margin: "auto" }}
      >
        <FontAwesomeIcon icon={faEarth} className="icon" onClick={()=>dispatchCount({type:"INCREMENT", value:1})}/>
        <h1>Challenges will be released soon {count.value}</h1>
        <span>
          Browse the top community created challenges or share your cookies with
          the world!
        </span>
      </div>
    </>
  );
}

export default Challenges;
