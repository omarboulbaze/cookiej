
//React components
import { useState, useRef, useEffect } from "react";
import Topbar from "../Components/Topbar/Topbar";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp, faCamera, faCheckCircle, faPlus, faRankingStar, faTag } from "@fortawesome/free-solid-svg-icons";

//CSS
import "./Add.css";

// Cookie Background image
import cookieBg from "../../assets/cookiebg.jpg";

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

    //is the image uploaded ?
    const [imageUploaded, setImageUploaded] = useState(false)
    
    // useState from Title, Description, Date, Rank, Tags, Image.
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(today);
    const [rank, setRank] = useState("bronze");
    const [tag, setTag] = useState("");
    const [image, setImage] = useState(null);
    

    function dateChecker(e){
        if(e.target.value>today){
            alert("You can't add a cookie in the future.");
            setDate(today);
        }else if(!e.target.value){
            setDate(today);
        }
        else{
            setDate(e.target.value);
        }
        
    }

    //Creating the reference of the <input/> in html.
    const imageInputFile = useRef(null);
    function divClick(){
        imageInputFile.current.click();
    }
    //When user uploads an image
    const [imgData, setImgData] = useState(null);

    function onImageUpload(e){
        setImageUploaded(true);
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            const reader = new FileReader(); //Reading the image from user input
            reader.addEventListener("load", () => {
              setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
          }
    }
   
    //#region Tag
    const [tagsOpen, setTagsOpen] = useState(false) //are tags openned ?
    const [tagPlusVisible, setTagPlusVisible] = useState(true) //if the tag plus button is visible ?
    const [tagInput, setTagInput] = useState("")
    const tagInputRef = useRef(null);

    //Adding new custom tags
    function addTag(){
        setTagPlusVisible(false);
    }
    function tagInputonChange(e){
        setTagInput(e.target.value);
        setTag(e.target.value)
    }
    
    //#endregion Tag
    
    // Reacting to tagPlusVisible state change. Since tagInputRef is null when executing addTag() function. 
    useEffect(() => {
        if(!tagPlusVisible) tagInputRef.current.focus();  
      }, [tagPlusVisible]);

    return(
        <>
            <Topbar text="New Cookie"/>
            <form className="add_form" style={{maxWidth:"640px", margin:"auto"}}>
                {/* Image input */}
                <div className="img-container" onClick={()=> divClick()}>
                        <img src={imageUploaded ? imgData : cookieBg} alt="Cookie Background"/>
                        <label>{imageUploaded ? <FontAwesomeIcon icon={faCheckCircle} className="icon" style={{color:"#ffae44"}}/> : <FontAwesomeIcon icon={faCamera} className="icon"/> }</label>
                        {/* Input is hidden. Only the label is visible which is linked to the input tag. */}
                        <input ref={imageInputFile} capture="environment" accept="image/*" type="file" style={{display:"none"}} onChange={ e => onImageUpload(e)}/>
                        <label className="label" style={{padding:"0.5rem"}}>{imageUploaded ? "Image successfully added!" : "Add Image"}</label>
                </div>
                {/* Title input */}
                <div className="input-group">
                    <input type="text" className="input" placeholder=" " style={{"borderBottom":"0px"}} required value={title} onChange={e =>setTitle(e.target.value)}/>
                    <label className="placeholder">Title</label>
                </div>
                {/* Description input */}
                <div className="input-group">
                    <textarea type="text" className="input" placeholder=" " value={description} onChange={e =>setDescription(e.target.value)}/> 
                    <label className="placeholder">Description</label>
                </div>
                {/* Date input */}
                <div className="input-container">
                    <div>
                        <FontAwesomeIcon icon={faCalendar} className="icon"/>
                        <label className="label">{date===today ? "Today" : timeAgo(date)}</label>
                    </div>
                    <input required type="date" value={date} max={today} onChange={ e=> dateChecker(e)} style={{fontSize:"1rem"}}/>
                </div>
                {/* Rank input */}
                <div className="input-container">
                    <div>
                        <FontAwesomeIcon icon={faRankingStar} className="icon"/>
                        <label className="label">Rank</label>
                    </div>
                    <select className="select" style={{fontSize:"1rem"}} value={rank} onChange={e => setRank(e.target.value)}>
                        <option value="bronze" className="bronze">🟤 Bronze</option>
                        <option value="silver" className="silver">⚪️ Silver</option>
                        <option value="gold" className="gold">🟡 Gold</option>
                        <option value="platinum" className="platinum">🔵 Platinum</option>
                        <option value="diamond" className="diamond">🟣 Diamond</option>
                    </select>
                </div>
                {/* Tags input */}
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
                        {
                            tagPlusVisible 
                            ? 
                            <span className="tag-input" onClick={()=> addTag()}><FontAwesomeIcon icon={faPlus} className="icon" style={{fontSize:"1rem"}}/></span> 
                            : 
                            <input ref={tagInputRef} value={tagInput} onChange={e =>tagInputonChange(e)} className={tagInput === tag ? "tag-input active" : "tag-input" } onClick={()=> setTag(tagInput)} style={{width: `${tagInput.length}ch`,minWidth:"3rem"}} />
                        }
                        
                    </div>
                    </> 
                    : null
                    }
                </div>
                
                <div className="button-container">
                    <button type="submit">Add Cookie</button>
                </div>
               
            </form>
        
        </>
    )
}

export default Add;