//Importing css
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./Alert.css";

function Alert(props){

    const [visible, setVisible] = useState(true)
    const [animationClass, setAnimationClass] = useState("alert-container show")

    // Using "then()" so I can be able to apply the hiding animation before removing the component from the page
    function hideAlert(){
        setAnimationClass("alert-container hide").then(()=>setVisible(false))
    }

    // Dynamically changing the css variables when hue prop changes
    useEffect(()=>{
        const rs = document.querySelector(':root').style;
        rs.setProperty('--color',props.hue); 
      }, [props.hue])

    return(
        <div className="alert-wrapper">
        {visible ?
        <div className={animationClass}>
        <div className="side"></div>
        <FontAwesomeIcon icon={props.icon} className="icon"/>
        <span className="text"><b>{props.boldText}</b>{props.text}</span> 
        <div className="close" onClick={hideAlert}><FontAwesomeIcon icon={faXmark} className="icon"/></div>
        </div>
        :
        null
        }
        
        </div>
    )

}

export default Alert;