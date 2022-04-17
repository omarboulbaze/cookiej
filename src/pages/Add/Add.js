
//React components
import { useState } from "react";
import Topbar from "../Components/Topbar/Topbar";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faImage } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp, faCamera, faCheckCircle, faPlus, faRankingStar, faTag } from "@fortawesome/free-solid-svg-icons";

//CSS
import "./Add.css";

// #region Time ago 
const epochs = [
    ['year', 31536000],
    ['month', 2592000],
    ['day', 86400],
    ['hour', 3600],
    ['minute', 60],
    ['second', 1]
];

const getDuration = (timeAgoInSeconds) => {
    for (let [name, seconds] of epochs) {
        const interval = Math.floor(timeAgoInSeconds / seconds);
        if (interval >= 1) {
            return {
                interval: interval,
                epoch: name
            };
        }
    }
};

const timeAgo = (date) => {
    const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
    const {interval, epoch} = getDuration(timeAgoInSeconds);
    const suffix = interval === 1 ? '' : 's';
    return `${interval} ${epoch}${suffix} ago`;
};

// #endregion

function Add(){

    const today = new Date().toLocaleDateString('en-CA');
    const [date, setDate] = useState(today);
    
    //tagsOpen
    const [tagsOpen, setTagsOpen] = useState(false)

    //is the image uploaded ?
    const [image, setImage] = useState(false)
    
    function dateChecker(e){
        if(e.target.value>today){
            alert("You can't add a cookie in the future.");
            setDate(today);
        }else{
            setDate(e.target.value);
        }
        
    }

    return(
        <>
            <Topbar text="New Cookie"/>
            <div className="add_form">

                <div className="input-group">
                    <input type="text" className="input" placeholder=" " style={{"borderBottom":"0px"}}/>
                    <label className="placeholder">Title</label>
                </div>

                <div className="input-group">
                    <textarea type="text" className="input" placeholder=" " /> 
                    <label className="placeholder">Description</label>
                </div>

                <div className="input-container">
                    <div>
                        <FontAwesomeIcon icon={faCalendar} className="icon"/>
                        <label className="label">{date===today ? "Today" : timeAgo(date)}</label>
                    </div>
                    <input type="date" defaultValue={date} value={date} max={today} onChange={(e)=> dateChecker(e)} required/>
                </div>

                <div className="input-container">
                    <div>
                        <FontAwesomeIcon icon={faRankingStar} className="icon"/>
                        <label className="label">Rank</label>
                    </div>
                    <select className="select">
                        <option className="bronze">🟤 Bronze</option>
                        <option className="silver">⚪️ Silver</option>
                        <option className="gold">🟡 Gold</option>
                        <option className="platinum">🔵 Platinum</option>
                        <option className="diamond">🟣 Diamond</option>
                    </select>
                </div>
                <div className="tags-container">
                    <div className="lineOne" onClick={ tagsOpen ? ()=>setTagsOpen(false) : ()=>setTagsOpen(true)}>
                        <div>
                            <FontAwesomeIcon icon={faTag} className="icon"/>
                            <label className="label">Tags</label>
                        </div>
                        {tagsOpen ? <FontAwesomeIcon icon={faAngleUp} className="icon"/> : <FontAwesomeIcon icon={faAngleDown} className="icon"/>}
                    </div>
                    {
                    tagsOpen ? 
                    <>
                    <hr style={{opacity:"0.2", margin:"1rem", marginBottom:"1.5rem"}}/>
                    <div className="lineTwo">
                        <span className="tag">Fitness</span>
                        <span className="tag">Education</span>
                        <span className="tag">Job</span>
                        <span className="tag"><FontAwesomeIcon icon={faPlus} className="icon" style={{fontSize:"1rem"}}/></span>
                    </div>
                    </> 
                    : null
                    }
                </div>
                <div className="input-container">
                    <div>
                        <FontAwesomeIcon icon={faImage} className="icon"/>
                        <label className="label">Image</label>
                    </div>
                    <label htmlFor="file">{image ? <FontAwesomeIcon icon={faCheckCircle} className="icon" style={{color:"#ffae44"}}/> : <FontAwesomeIcon icon={faCamera} className="icon"/> }</label>
                    <input id="file" capture="environment" accept="image/*" type="file" style={{display:"none"}} onChange={()=> setImage(true)}/>
                </div>
               
            </div>
        
        </>
    )
}

export default Add;