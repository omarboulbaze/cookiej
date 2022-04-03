import './Cookies.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookie, faPlus, faTrophy } from '@fortawesome/free-solid-svg-icons';
function Cookies(){

    return(
        <>
        <div className="navbar_container">
         
                <button className='navbar_btn cookies'>
                    <FontAwesomeIcon icon={faCookie} className="icon"/>
                    <span className='navbar_text'>COOKIES</span>
                </button>
                  
                <button className='navbar_btn'>
                    <FontAwesomeIcon icon={faPlus} className="icon"/>
                    <span className='navbar_text'>ADD</span>
                </button>
                       
                <button className='navbar_btn challenges'>
                    <FontAwesomeIcon icon={faTrophy} className="icon"/>
                    <span className='navbar_text'>CHALLENGES</span>
                </button>            
            
        </div>
        </>
    )
}

export default Cookies;