import Topbar from "../Components/Topbar/Topbar";
import "./Add.css";
function Add(){

    return(
        <>
            <Topbar/>
            <div className="add_form">
                <input placeholder="Title" className="text_form"/> 
                <textarea placeholder="Description" className="text_form description"/> 

            </div>
        
        </>
    )
}

export default Add;