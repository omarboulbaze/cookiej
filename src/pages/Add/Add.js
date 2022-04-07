import Topbar from "../Components/Topbar/Topbar";
import "./Add.css";
function Add(){

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
               
            </div>
        
        </>
    )
}

export default Add;