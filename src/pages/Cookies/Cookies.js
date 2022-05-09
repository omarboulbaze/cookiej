// REACT
import { useState, useEffect } from "react";

// CSS
import "./Cookies.css"

// Logo
import cookieLogo from "../../assets/svg/cookie.svg"
import cookieLogoDetailed from "../../assets/cookieLogo.png"

// Components
import Topbar from "../Components/Topbar/Topbar";
import {timeAgo} from '../Add/Add';

//  Importing axios
const axios = require('axios');

// Using dotenv variable dynamically depending on the status of the app (developement or production)
const apiUrl = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_PROD_API_URL : process.env.REACT_APP_DEV_API_URL;


function Cookies(){

    // Retrieving the cookies from the database
    const [cookiesData, setCookiesData] = useState();

    useEffect(()=>{
                    axios.get(apiUrl+'/')
                    .then(res => {
                        if(res.data.length > 0) setCookiesData(res.data);
                    }).catch(e => console.log('GET request', e));
                },[])

    return(
        <>
        <Topbar text="My Cookies"/>
        <div className="cookie-grouper">
        {cookiesData ?
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

                
            return <CookieItem image={c.image ? apiUrl+'/images/'+ c.image : cookieLogoDetailed} title={c.title} description={c.description} date={timeAgo(c.date).toString().includes("hours") ? "Today" : timeAgo(c.date)} rank={c.rank} tag={c.tag} key={i} hue={hue} 
                                lightness={lightness} lightnessBg={lightnessBg} saturation={saturation} saturationBg={saturationBg}/>
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

    return(
        <div className="cookie-container" style={{backgroundColor: backgroundColor}}>
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
            <div className="cookie-side-rank" style={{backgroundColor: primaryColor}}>
            </div>
        </div>
    )
}

export default Cookies;