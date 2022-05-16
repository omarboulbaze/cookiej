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
import { faPen, faTrashAlt, faCheckCircle } from "@fortawesome/free-solid-svg-icons";

//  Importing axios
const axios = require('axios');

// Using dotenv variable dynamically depending on the status of the app (developement or production)
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;


function Cookies(){

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
                                setAlert={setAlert}
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
            setSideExpanded(true)
            setAnimationClass("cookie-side-rank-expanded")
        }
    }

    function deleteCookie(){
        
        if(window.confirm("Delete this cookie ?")){
            axios.delete( apiUrl + '/delete/' + props.id )
            .then(res => console.log(res.data));
            props.setAlert(<Alert text="The cookie has been successfully removed from your cookie jar." hue="120" icon={faCheckCircle}/>)
            props.setCookiesData(props.cookiesData.filter((cookies => cookies._id !== props.id)))
            setTimeout(()=>{
                props.setAlert(null)
            },3000)
            }
            //TODO: Make sure there's a hide animation when the time is up (3 seconds) and that the timer resets everytime the user deletes another cookie.  
    }

    return(
        <>
        <div className="cookie-container" style={{backgroundColor: backgroundColor}} onClick={()=>onCookieClick()}>
            <div className="img-tag-date-container">
                <img src={props.image} alt="Visual memories"/>
                <div className="tag-date-container" style={!props.tag ? {justifyContent:"center"} : null}>
                    {props.tag ? <span className="tag" style={{backgroundColor: primaryColor}}>{props.tag}</span> : null}
                    <span className="date">{props.date}</span>
                </div>
            </div>
            <div className="cookie-info">
                <h1>{props.title}</h1>
                <p>{props.description}</p>  
            </div>
            <div className={animationClass} style={{backgroundColor: primaryColor}}>
                {
                    sideExpanded ?
                    <>
                    <div className="icon">
                        <FontAwesomeIcon icon={faPen} />
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
        </>
    )
}

export default Cookies;