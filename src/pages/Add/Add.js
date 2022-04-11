import { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Topbar from "../Components/Topbar/Topbar";
import "./Add.css";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
function Add(){

    const date = new Date();
    const defaultValue = date.toLocaleDateString('en-CA');

    const inputRef = useRef(null);
    const handleClick = () => {
        inputRef.current.click();
      };


    return(
        <>
            <Topbar/>
            <div className="add_form">
                <div className="input-group">
                    <input type="text" className="input" placeholder=" "/>
                    <label className="placeholder">Title</label>
                </div>
                <div className="input-group">
                    <textarea type="text" className="input" placeholder=" " /> 
                    <label className="placeholder">Description</label>
                </div>
                <div className="input-container">
                    <FontAwesomeIcon icon={faCalendar} className="icon"/>
                    <label className="label">Today</label>
                    <input ref={inputRef} type="date" defaultValue={defaultValue}/>
                    <FontAwesomeIcon icon={faPencil} className="icon edit" onClick={handleClick}/>
                </div>
               
            </div>
        
        </>
    )
}

export default Add;