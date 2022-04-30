//Importing css
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import "./alert.css";

function Alert(){

    const [visible, setVisible] = useState(true)
    const [animationClass, setAnimationClass] = useState("alert-container show")

    // Using "then()" so I can be able to apply the hiding animation before removing the component from the page
    function hideAlert(){
        setAnimationClass("alert-container hide").then(()=>setVisible(false))
    }
    return(
        <>
        {visible ?
        <div className={animationClass}>
        <div className="side"></div>
        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
        <span className="text"><b>Congratulations!</b> Your cookie has been added to your cookie jar.</span> 
        <div className="close" onClick={hideAlert}><FontAwesomeIcon icon={faXmark} className="icon"/></div>
        </div>
        :
        null
        }
        
        </>
    )

}

export default Alert;