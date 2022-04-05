import './Navbar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faPlus, faTrophy } from '@fortawesome/free-solid-svg-icons';
function Navbar(){

 console.log(window.location)
    
   function checkSelectedPage(pathname){
       if(window.location.pathname === pathname){
           return "navbar_btn selected"
       }else{
           return "navbar_btn"
       }
   }

    return(
        <>
        <div className="navbar_container">
         
                <button className={checkSelectedPage("/") + " cookies"} onClick={()=> window.location = "/"}>
                    <FontAwesomeIcon icon={faCookie} className="icon"/>
                    <span className='navbar_text selected'>COOKIES</span>
                </button>
                  
                <button className={checkSelectedPage("/add")}  onClick={()=> window.location = "/add"}>
                    <FontAwesomeIcon icon={faPlus} className="icon"/>
                    <span className='navbar_text'>ADD</span>
                </button>
                       
                <button className={checkSelectedPage("/challenges") + " trophy"}  onClick={()=> window.location = "/challenges"}>
                    <FontAwesomeIcon icon={faTrophy} className="icon"/>
                    <span className='navbar_text'>CHALLENGES</span>
                </button>            
            
        </div>
        </>
    )
}

export default Navbar;