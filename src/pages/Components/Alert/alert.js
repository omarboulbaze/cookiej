//Importing css
import { faCheckCircle } from "@fortawesome/free-regular-svg-icons";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import "./alert.css";

function Alert(props){

    const [visible, setVisible] = useState(true)
    const [animationClass, setAnimationClass] = useState("alert-container show")

    // Using "then()" so I can be able to apply the hiding animation before removing the component from the page
    function hideAlert(){
        setAnimationClass("alert-container hide").then(()=>setVisible(false))
    }

    // Dynamically changing the css variables
    useEffect(()=>{
        const rs = document.querySelector(':root').style;
       
        switch (props.theme) {
            //TODO: BUG when going from danger to success, the color stays danger instead of changing but the text changes.
            case "success":
                rs.setProperty('--color','120');
                break;
            case "danger":
                rs.setProperty('--color','0');
                break;
        }
      }, [])

    return(
        <>
        {visible ?
        <div className={animationClass}>
        <div className="side"></div>
        <FontAwesomeIcon icon={faCheckCircle} className="icon"/>
        <span className="text"><b>{props.boldText}</b>{props.text}</span> 
        <div className="close" onClick={hideAlert}><FontAwesomeIcon icon={faXmark} className="icon"/></div>
        </div>
        :
        null
        }
        
        </>
    )

}

export default Alert;