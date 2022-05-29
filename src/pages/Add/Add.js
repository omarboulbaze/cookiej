
//React components
import { useState, useRef, useEffect } from "react";
import Topbar from "../Components/Topbar/Topbar";
import Alert from "../Components/Alert/Alert";

//Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendar, faXmarkCircle } from "@fortawesome/free-regular-svg-icons";
import { faAngleDown, faAngleUp, faCamera, faCheckCircle, faPlus, faTag, faTrash, faTrophy } from "@fortawesome/free-solid-svg-icons";

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
// Exporting this function so it can be imported and used in other file like Cookies.js
export const timeAgo = (date) => {
    if(!date) return "Long time ago" // Avoiding an error when the date entered is undefined
        const timeAgoInSeconds = Math.floor((new Date() - new Date(date)) / 1000);
        const {interval, epoch} = getDuration(timeAgoInSeconds);
        const suffix = interval === 1 ? '' : 's';
        return `${interval} ${epoch}${suffix} ago`;
};
// #endregion


function Add(){

    document.title = "New Cookie | Cookie Jar";

    const today = new Date().toLocaleDateString('en-CA');
    
    // useState from Title, Description, Date, Rank, Tags, Image.
    const [image, setImage] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [date, setDate] = useState(today);
    const [rank, setRank] = useState("bronze");
    const [tag, setTag] = useState(null);

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

    // Creating the reference of the <input/> in html.
    const imageInputFile = useRef(null);
    function divClick(){
        if(imageUploaded){
            setOverlayVisibility(true)
        }else{
            imageInputFile.current.click();
        }
        
    }
    // is the image uploaded ?
    const [imageUploaded, setImageUploaded] = useState(false)
    // When user uploads an image
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
    
    // Using useEffect to react to tagPlusVisible state change (When the use clicks on the plus sign in the tag area),
    // since tagInputRef is null (not rendered) when executing addTag() function.
    useEffect(() => {
        if(!tagPlusVisible) tagInputRef.current.focus();  
      }, [tagPlusVisible]);

    // #region Adding the cookie to the database
    
    //Using dotenv variable dynamically depending on the status of the app (developement or production)
    const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;

    // Importing axios
    const axios = require("axios");

    function addCookie(e){
        e.preventDefault();
        // console.table({image:image,title:title,description:description,date:date,rank:rank,tag:tag})
        axios.post(apiUrl + `/addCookie`, {
            image: image,
            title: title,
            description: description,
            date: date,
            rank: rank,
            tag: tag
        },{headers: {'Content-Type': 'multipart/form-data'}})
        .then(()=>{
            setAlert(<Alert boldText="Congratulations!" text=" Your cookie has been added to your cookie jar." hue="120" icon={faCheckCircle}/>);
            setImage(null);
            setImageUploaded(false);
            setTitle("");
            setDescription("");
            setDate(today);
            setRank("bronze");
            setTag(null);
            setTagInput("");
            setTagPlusVisible(true);
        }
        )
          .catch( error => {
            setAlert(<Alert boldText="Oops," text=" something went wrong. Please try again later." hue="0" icon={faXmarkCircle}/>);
            console.log(error);
          });
// Setting Alert to null so the event can be triggered again, otherwise the "alert state" stays the same and the pop up happens only once.
        setAlert(null);
    }

    // Image overlay
    const [overlayVisibility, setOverlayVisibility] = useState(false);

    function deleteImage(){
        if(window.confirm("Delete the image ?")){
            setImageUploaded(false);
            setImage(null);
        }
    }

    // Alert management
    const [alert, setAlert] = useState(null);
    
    return(
        <>  
            {alert}
            <Topbar text="New Cookie"/>
            <form className="add_form" style={{maxWidth:"640px", margin:"auto"}} onSubmit={e=>addCookie(e)}>
                {/* Image input */}
                <div className="img-container" onClick={()=> divClick()}>
                        <img src={imageUploaded ? imgData : cookieBg} alt="Cookie Preview"/>
                        <label>{imageUploaded ? <FontAwesomeIcon icon={faCheckCircle} className="icon" style={{color:"white"}}/> : <FontAwesomeIcon icon={faCamera} className="icon"/> }</label>
                        {/* Input is hidden. Only the label is visible which is linked to the input tag. */}
                        <input ref={imageInputFile} accept="image/*" type="file" style={{display:"none"}} onChange={ e => onImageUpload(e)}/>
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
                        <FontAwesomeIcon icon={faTrophy} className="icon"/>
                        <label className="label">Rank</label>
                    </div>
                    <select className="select" style={{fontSize:"1rem"}} value={rank} onChange={e => setRank(e.target.value)}>
                        <option value="bronze" className="bronze">🟫 Bronze</option>
                        <option value="silver" className="silver">⬜️ Silver</option>
                        <option value="gold" className="gold">🟨 Gold</option>
                        <option value="platinum" className="platinum">🟪 Platinum</option>
                        <option value="diamond" className="diamond">🟦 Diamond</option>
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
            {
                overlayVisibility
                ?
                <div className="img-overlay" onClick={ ()=> setOverlayVisibility(false)}>
                <img src={imageUploaded ? imgData : cookieBg} alt=""/>
                <FontAwesomeIcon icon={faTrash} className="icon" onClick={()=> deleteImage()}/>
                </div>
                :
                null
            }
            
        </>
    )
}

export default Add;