// REACT
import { useState, useEffect } from "react";

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
import { faPen, faTrashAlt, faCheckCircle, faRotate, faFloppyDisk, faXmark, faTag } from "@fortawesome/free-solid-svg-icons";

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

    return(
        <>
        {alert}
        <Topbar text="My Cookies"/>
        <div className="cookie-grouper">

        {cookiesData.length > 0 ?
            cookiesData.map((c,i)=> {
                let hue;
                let saturation = "100%" ;
                let saturationBg = "78%" ;
                let lightness = "59%" ;
                let lightnessBg = "91%" ;
                switch (c.rank) {
                    case "bronze":
                        hue = 30
                        saturation = "60%"
                        break;
                    case "silver":
                        hue = 0
                        saturation = "0%"
                        lightness = "100%"
                        saturationBg = "0%"
                        lightnessBg = "92%"
                        break;
                    case "gold":
                        hue = 50
                        break;
                    case "platinum":
                        hue = 300
                        break;
                    case "diamond":
                        hue = 200
                        break;
                    default:
                        break;
                }

            return <CookieItem  key={c._id} id={c._id} image={c.image ? apiUrl+'/images/'+ c.image : cookieLogoDetailed} title={c.title} description={c.description} 
                                date={timeAgo(c.date).toString().includes("hours") ? "Today" : timeAgo(c.date)} rank={c.rank} tag={c.tag} hue={hue} 
                                lightness={lightness} lightnessBg={lightnessBg} saturation={saturation} saturationBg={saturationBg} cookiesData={cookiesData} setCookiesData={setCookiesData}
                                setAlert={setAlert} alert={alert}
                                />
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

    const primaryColor = `hsl(${props.hue}, ${props.saturation}, ${props.lightness})`
    const backgroundColor = `hsl(${props.hue}, ${props.saturationBg}, ${props.lightnessBg})`

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

    // Cookie Edit mode
    const [editMode, setEditMode] = useState(false)
    const [contentAnimation, setContentAnimation] = useState("")
    const [editAnimation, setEditAnimation] = useState("")

    function editCookie(){
        if(!editMode){
            setContentAnimation("edit-content-animation")
            setEditAnimation("edit-mode-animation")
            setTimeout(()=> {setEditMode(true)},200)
        }else{
            setContentAnimation("")
            setEditAnimation("")
            setEditMode(false)
        }
    }

    // When a user tries to modify an input while in the Edit mode
    const [overlayEditPlaceholder, setOverlayEditPlaceholder] = useState(null);

    // Making a functional react component to be able to pass down props (Component name should be capitalized otherwise it's considered a component's function.)
    function OverlayEdit(props){
        return(
                    <div className="edit-overlay-container">
                        <span>{props.name}</span>
                        <textarea>{props.value}</textarea>
                        <div className="cancel" onClick={()=>props.setOverlayEditPlaceholder(null)}><FontAwesomeIcon icon={faXmark} className="icon"/></div>
                        <div className="save"><FontAwesomeIcon icon={faFloppyDisk} className="icon"/></div>
                    </div>
        )
    }
    // Dynamically detects which input was clicked and pass it to the function
    function editModeInputClick(name, value){
        setOverlayEditPlaceholder(<OverlayEdit name={name} value={value} setOverlayEditPlaceholder={setOverlayEditPlaceholder}/>)
    }
    return(
        <>
        {
            !editMode ?
            <div className="cookie-container" style={{backgroundColor: backgroundColor}} onClick={()=>onCookieClick()}>
                <div className={"img-tag-date-container " + contentAnimation}>
                    <img src={props.image} alt="Visual memories"/>
                    <div className="tag-date-container">
                        {props.tag ? <span className="tag" style={{backgroundColor: primaryColor}}>{props.tag}</span> : null}
                        <span className="date">{props.date}</span>
                    </div>
                </div>
                <div className={"cookie-info " + contentAnimation}>
                    <h1>{props.title}</h1>
                    <p>{props.description}</p>  
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
            :
            <div className="cookie-container" style={{backgroundColor: primaryColor}}>
                <div className={"img-tag-date-container "  + editAnimation}>
                    <div className="img-edit-container">
                        <img src={props.image} alt="Visual memories" className="img-edit"/>
                        <div className="icon">
                            <FontAwesomeIcon icon={faRotate}/>
                        </div>
                        <div className="icon">
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </div>
                    </div>
                
                    <div className="tag-date-container edit">
                        {props.tag ? <span onClick={()=>editModeInputClick("Tag",props.tag)} className="tag" style={{backgroundColor: backgroundColor}}>{props.tag}</span> : null}
                        <span className="date">{props.date}</span>
                    </div>
                </div>
                <div className={"cookie-info edit " + editAnimation}>
                    <h1 onClick={()=>editModeInputClick("Title",props.title)}>{props.title}</h1>
                    <p onClick={()=>editModeInputClick("Description",props.description)}>{props.description}</p>  
                </div>
                <div className={"edit-side-container "  + editAnimation}>
                    <div className="edit-cancel" style={{backgroundColor: backgroundColor}} onClick={()=>editCookie()} >
                        <FontAwesomeIcon icon={faXmark} className="icon" style={{color: primaryColor}}/>
                    </div>
                    <div className="edit-tag" style={{backgroundColor: backgroundColor}} >
                        <FontAwesomeIcon icon={faTag} className="icon" style={{color: primaryColor}}/>
                    </div>
                    <div className="edit-confirm" style={{backgroundColor: backgroundColor}} >
                        <FontAwesomeIcon icon={faFloppyDisk} className="icon" style={{color: primaryColor}}/>
                    </div>
                </div>
                {
                    overlayEditPlaceholder
                }
                
            </div>
        }
        
        
        </>
    )
}

export default Cookies;