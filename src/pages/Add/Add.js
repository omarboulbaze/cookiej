
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import Topbar from "../Components/Topbar/Topbar";
import "./Add.css";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
function Add(){

    const date = new Date();
    const defaultValue = date.toLocaleDateString('en-CA');

 
  

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
                    <div>
                        <FontAwesomeIcon icon={faCalendar} className="input-icon"/>
                        <label className="label">Today</label>
                    </div>
                    <div className="edit">
                        <input  id="datepicker" type="date" defaultValue={defaultValue} />
                        <label htmlFor="datepicker"><FontAwesomeIcon icon={faPencil} className="input-icon"/></label>
                    </div>
                    
                </div>
               
            </div>
        
        </>
    )
}

export default Add;