
//React components
import { useState } from "react";
import Topbar from "../Components/Topbar/Topbar";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faRankingStar } from "@fortawesome/free-solid-svg-icons";

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
 

    return(
        <>
            <Topbar/>
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
                    <input type="date" defaultValue={date} max={today} onChange={(e)=> setDate(e.target.value)} required/>
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
               
            </div>
        
        </>
    )
}

export default Add;