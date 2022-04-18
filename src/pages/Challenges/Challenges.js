import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Topbar from "../Components/Topbar/Topbar";
import "./Challenges.css";
function Challenges(){

    return(
        <>
            <Topbar text="Challenges"/>
            <div className="empty-container" style={{maxWidth:"640px", margin:"auto"}}>
                <FontAwesomeIcon icon={faEarth} className="icon"/>
                <h1>Challenges will be released soon</h1>
                <span>Browse the top community created challenges or share your cookies with the world!</span>
            </div>
        </>
    )
}

export default Challenges;