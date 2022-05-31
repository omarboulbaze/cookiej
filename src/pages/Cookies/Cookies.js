// REACT
import { useState, useEffect, useRef } from "react";

// CSS
import "./Cookies.css"

// Logo
import cookieLogo from "../../assets/svg/cookie.svg"
import cookieLogoDetailed from "../../assets/cookieLogo.png"

// Components
import Topbar from "../Components/Topbar/Topbar";
import Alert from "../Components/Alert/Alert";
import {timeAgo} from '../Add/Add';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt, faCheckCircle, faRotate, faFloppyDisk, faXmark, faTrophy, faPlus, faXmarkCircle, faMagnifyingGlass, faArrowUpAZ} from "@fortawesome/free-solid-svg-icons";

//  Importing axios
const axios = require('axios');

// Using dotenv variable dynamically depending on the status of the app (developement or production)
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;


function Cookies(){

    document.title = "My Cookies | Cookie Jar";

    // Retrieving the cookies from the database
    const [cookiesData, setCookiesData] = useState([]);

    useEffect(()=>{
                    axios.get(apiUrl+'/')
                    .then(res => {
                        if(res.data.length > 0) setCookiesData(res.data);
                    }).catch(e => console.log('GET request', e));
                },[])

    // Alert management
    const [alert, setAlert] = useState(null);

    // Search
    const [searchText, setSearchText] = useState("");

    return(
        <>
        {alert}
        <Topbar text="My Cookies"/>
        { cookiesData.length > 1 ?
        <div className="toolbar-container">
            <div className="toolbar">
            <div className="search">
                <FontAwesomeIcon className="icon" icon={faMagnifyingGlass}/>
                <input type="text" placeholder={`Search ${cookiesData.length} cookies...`} value={searchText} onChange={(e)=> setSearchText(e.target.value)}/>
            </div>
            <FontAwesomeIcon className="sort-icon" icon={faArrowUpAZ}/>
            </div>
        </div>
        :
        null
        }
        
        
        <div className="cookie-grouper">

        {cookiesData.length > 0 ?
            cookiesData.map( c => {
                if(c.title.toLowerCase().includes(searchText.toLowerCase())  || c.description.toLowerCase().includes(searchText.toLowerCase())){
                    return <CookieItem  key={c._id} id={c._id} image={c.image} title={c.title} description={c.description} 
                            date={c.date} rank={c.rank} tag={c.tag} cookiesData={cookiesData} setCookiesData={setCookiesData} setAlert={setAlert} alert={alert}
                            />
                }
                return null
            })
            
           
            :
            <div className="empty-container" style={{maxWidth:"640px", margin:"auto"}}>
                <img src={cookieLogo} alt="Cookie Logo"/>
                <h1>No cookies yet</h1>
                <span><a href="./add">Add</a> your first cookie to your personal Cookie Jar!</span>
            </div>
        }

        </div>
        </>
    )
}

function CookieItem(props){

    // Edit mode states
    const [image, setImage] = useState(props.image)
    const [title,setTitle] = useState(props.title)
    const [description, setDescription] = useState(props.description)
    const [date, setDate] = useState(props.date)
    const [rank, setRank] = useState(props.rank)
    const [tag, setTag] = useState(props.tag)
    
    // #region Dynamically setting the cookie colors
    let hue;
    let saturation = "100%" ;
    let saturationBg = "78%" ;
    let lightness = "80%" ;
    let lightnessBg = "91%" ;
    switch (rank) {
        case "bronze":
            hue = 30
            saturation = "60%"
            break;
        case "silver":
            hue = 0
            saturation = "0%"
            lightness = "100%"
            saturationBg = "0%"
            lightnessBg = "93%"
            break;
        case "gold":
            hue = 50
            break;
        case "platinum":
            hue = 300
            // lightness = "77%"
            break;
        case "diamond":
            hue = 200
            // lightness = "67%"
            break;
        default:
            break;
    }
    const primaryColor = `hsl(${hue}, ${saturation}, ${lightness})`
    const backgroundColor = `hsl(${hue}, ${saturationBg}, ${lightnessBg})`
    const dateColorEditMode = `hsl(${hue}, ${saturation}, 96%)`
    const buttonColorEditMode = `hsl(${hue}, ${saturation}, 45%, 0.5)`
    // #endregion

    // OnClick show the side button with an option to edit or delete the cookie
    const [sideExpanded, setSideExpanded] = useState(false);
    const [animationClass, setAnimationClass] = useState("cookie-side-rank");

    
    function onCookieClick(){
        if(sideExpanded){
            setAnimationClass("cookie-side-rank hide")
            setSideExpanded(false)
        }else{
            setAnimationClass("cookie-side-rank-expanded")
            setSideExpanded(true)
        }
    }

    function deleteCookie(){
            
            if(window.confirm("Delete this cookie ?")){
                axios.delete( apiUrl + '/delete/' + props.id )
                .then(res => console.log(res.data));
                props.setAlert(null) // Clearing the "alert" state so the alert can pop up again, otherwise it stays there.
                setTimeout(()=> { props.setAlert(<Alert text="The cookie has been successfully removed from your cookie jar." hue="120" icon={faCheckCircle}/>)},100)
                props.setCookiesData(props.cookiesData.filter((cookies => cookies._id !== props.id)))
            }
        
    }

    // #region Cookie Edit mode

    const [editMode, setEditMode] = useState(false)
    const [contentAnimation, setContentAnimation] = useState("")
    const [editAnimation, setEditAnimation] = useState("")


    // Enabling edit mode
    function editCookie(){
        if(!editMode){
            setContentAnimation("edit-content-animation")
            setEditAnimation("edit-mode-animation")
            setTimeout(()=> {setEditMode(true)},200)
        }else{
            if(title !== props.title || description !== props.description || date !== props.date || rank !== props.rank || tag !== props.tag || image !== props.image){
                if(window.confirm("The cookie data has been modified, your changes will be discarded. Are you sure you want to discard the changes ?")){
                    setContentAnimation("")
                    setEditAnimation("")
                    setEditMode(false)
                    // Discarding all changes
                    setTitle(props.title)
                    setDescription(props.description)
                    setDate(props.date)
                    setRank(props.rank)
                    setTag(props.tag)
                    setImage(props.image)
                    setImgData(null)
                }
            }else{
                setContentAnimation("")
                setEditAnimation("")
                setEditMode(false)
            }
            
        }
    }

    // When a user tries to modify an input while in the Edit mode
    const [overlayEditPlaceholder, setOverlayEditPlaceholder] = useState(null);

    // Dynamically detects which input was clicked and pass it to the function
    function editModeInputClick(name, value, type){
        setOverlayEditPlaceholder(<OverlayEdit name={name} value={value} type={type} setOverlayEditPlaceholder={setOverlayEditPlaceholder}
            setTitle={setTitle} setDescription={setDescription} setDate={setDate} setRank={setRank} setTag={setTag}/>)
    }

    function saveEditChanges(){
       
        axios.put(`${apiUrl}/update/${props.id}`,{
            image: image,
            title: title,
            description: description,
            date: date,
            rank: rank,
            tag: tag
        },{headers: {'Content-Type': 'multipart/form-data'}})
        .then(()=>{
            props.setAlert(null) // Clearing the "alert" state so the alert can pop up again, otherwise it stays there.
            setTimeout(()=> { props.setAlert(<Alert text="Your changes have been successfully saved." hue="120" icon={faCheckCircle}/>)},100)
            setContentAnimation("")
            setEditAnimation("")
            setEditMode(false)
        })
        .catch( error => {
            props.setAlert(null) // Clearing the "alert" state so the alert can pop up again, otherwise it stays there.
            props.setAlert(<Alert boldText="Oops," text=" something went wrong. Please try again later." hue="0" icon={faXmarkCircle}/>);
            console.log(error);
          });
    }
     // Creating the reference of the <input/> in html.
     const imageInputFile = useRef(null);
     function replaceImage(){   
             imageInputFile.current.click();
     }
     // When user uploads an image
    const [imgData, setImgData] = useState(null);
    function onImageUpload(e){
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
            const reader = new FileReader(); //Reading the image from user input
            reader.addEventListener("load", () => {
              setImgData(reader.result);
            });
            reader.readAsDataURL(e.target.files[0]);
          }
    }
    function deleteImage(){
        setImage(null)
        setImgData(null)
    }

    // #endregion
    
    return(
        <>
        {
            !editMode ?
            // #region Regular mode
            <div className="cookie-container" style={{backgroundColor: backgroundColor}} onClick={()=>onCookieClick()}>
                <div className={"img-tag-date-container " + contentAnimation}>
                    <img src={imgData ? imgData : (image ? apiUrl+'/images/'+ image : cookieLogoDetailed)} alt="Visual memories"/>
                    <div className="tag-date-container">
                        {tag ? <span className="tag" style={{backgroundColor: primaryColor}}>{tag}</span>
                        :
                        <span className="tag" style={{visibility:"hidden"}}><FontAwesomeIcon icon={faPlus}/></span>
                        }
                        <span className="date">{timeAgo(date).toString().includes("hours") ? "Today" : timeAgo(date)}</span>
                    </div>
                </div>
                <div className={"cookie-info " + contentAnimation}>
                    <h1>{title}</h1>
                    <p>{description}</p>  
                </div>
                <div className={animationClass + " " + contentAnimation} style={{backgroundColor: primaryColor}}>
                    {
                        sideExpanded ?
                        <>
                        <div className="icon" onClick={()=>editCookie()}>
                            <FontAwesomeIcon icon={faPen}/>
                        </div>
                        <div className="hr"></div>
                        <div className="icon" onClick={()=>deleteCookie()}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                        </>
                        :
                        null
                    }
                </div>
            </div>
            // #endregion
            :
            // #region Edit mode
            <div className="cookie-container" style={{backgroundColor: primaryColor}}>
                <div className={"img-tag-date-container "  + editAnimation}>
                    <div className="img-edit-container">
                        <img src={imgData ? imgData : (image ? apiUrl+'/images/'+ image : cookieLogoDetailed)} alt="Visual memories" className="img-edit"/>
                        <div className="icon" onClick={()=> replaceImage()}>
                            <FontAwesomeIcon icon={faRotate}/>
                            {/* Input is hidden. Only the label is visible which is linked to the input tag. */}
                            <input ref={imageInputFile} accept="image/*" type="file" style={{display:"none"}} onChange={ e => onImageUpload(e)}/>
                        </div>
                        <div className="icon" onClick={()=> deleteImage()}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>
                
                    <div className="tag-date-container edit">
                        {tag ? <span className="tag" style={{backgroundColor: backgroundColor}} onClick={()=>editModeInputClick("Tag",tag,"tag")}>{tag}</span>
                         :
                         <span className="tag" style={{backgroundColor: backgroundColor}} onClick={()=>editModeInputClick("Tag",tag,"tag")}><FontAwesomeIcon icon={faPlus}/></span>
                         }
                        <span className="date" style={{backgroundColor: dateColorEditMode}} onClick={()=>editModeInputClick("Date",date,"date")}>{timeAgo(date).toString().includes("hours") ? "Today" : timeAgo(date)}</span>
                    </div>
                </div>
                <div className={"cookie-info edit " + editAnimation}>
                    <h1 onClick={()=>editModeInputClick("Title",title,"title")}>{title}</h1>
                    {
                        description ?  <p onClick={()=>editModeInputClick("Description",description,"description")}>{description}</p>
                        :
                        <p onClick={()=>editModeInputClick("Description",description,"description")} style={{fontSize:"1.5rem", textAlign:"center", padding:"2rem"}}><FontAwesomeIcon icon={faPlus}/></p> 
                    }
                </div>
                <div className={"edit-side-container "  + editAnimation}>
                    <div className="edit-cancel" style={{backgroundColor: backgroundColor}} onClick={()=>editCookie()} >
                        <FontAwesomeIcon icon={faXmark} className="icon" style={{color: buttonColorEditMode}}/>
                    </div>
                    <div className="edit-rank" style={{backgroundColor: backgroundColor}} onClick={()=>editModeInputClick("Rank",rank,"rank")}>
                        <FontAwesomeIcon icon={faTrophy} className="icon" style={{color: buttonColorEditMode}}/>
                    </div>
                    <div className="edit-confirm" style={{backgroundColor: backgroundColor}} onClick={()=> saveEditChanges()} >
                        <FontAwesomeIcon icon={faFloppyDisk} className="icon" style={{color: buttonColorEditMode}}/>
                    </div>
                </div>
                {
                    overlayEditPlaceholder
                }
                
            </div>
            // #endregion
        }
        
        </>
    )
}

// Making a functional react component to be able to pass down props (Component name should be capitalized otherwise it's considered a component's function.)
function OverlayEdit(props){
        
    const [inputType, setInputType]= useState();


    useEffect(()=>{

    // Checking if the title is not null
    function checkTitle(value){
        if(value !== ""){
            props.setTitle(value)
        }
    }

    // Checking if the date is in the past. Maximum date for a cookie is today.
    function checkDate(value){
        if(value > new Date().toLocaleDateString('en-CA')){
            alert("The cookie date cannot be in the future.")
            props.setOverlayEditPlaceholder(null)
        }else{
            props.setDate(value)
        }
    }

        switch (props.type) {
            case "title":
                setInputType(<textarea defaultValue={props.value} onChange={(e)=> checkTitle(e.target.value)}/>)
                break;
            case "description":
                setInputType(<textarea defaultValue={props.value} onChange={(e)=> props.setDescription(e.target.value)}/>)
                break;
            case "tag":
                setInputType(<textarea defaultValue={props.value} onChange={(e)=> props.setTag(e.target.value)}/>)
                break;
            case "date":
                let date = new Date(props.value).toLocaleDateString('en-CA')
                setInputType(<input type="date" className="date-input" defaultValue={date} max={new Date().toLocaleDateString('en-CA')} style={{fontSize:"1.5rem"}}
                onChange={(e)=> checkDate(e.target.value)}
                />)
                break;
            case "rank":
                setInputType(<select className="select" style={{fontSize:"1.2rem"}} defaultValue={props.value} onChange={(e)=> props.setRank(e.target.value)}>
                                <option value="bronze" className="bronze">🟫 Bronze</option>
                                <option value="silver" className="silver">⬜️ Silver</option>
                                <option value="gold" className="gold">🟨 Gold</option>
                                <option value="platinum" className="platinum">🟪 Platinum</option>
                                <option value="diamond" className="diamond">🟦 Diamond</option>
                            </select>)
                break;
            default:
                break;
        }
    },[props])
    

    return(
                <div className="edit-overlay-container">
                    <span>{props.name}</span>
                    {inputType}
                    <div className="cancel" onClick={()=>props.setOverlayEditPlaceholder(null)}><FontAwesomeIcon icon={faXmark} className="icon"/></div>
                </div>
    )
}


export default Cookies;