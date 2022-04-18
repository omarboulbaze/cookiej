//CSS
import "./Cookies.css"
//Logo
import cookieLogo from "../../assets/svg/cookie.svg"
//Components
import Topbar from "../Components/Topbar/Topbar";
function Cookies(){

    return(
        <>
        <Topbar text="My Cookies"/>
        <div className="empty-container" style={{maxWidth:"640px", margin:"auto"}}>
            <img src={cookieLogo} alt="Cookie Logo"/>
            <h1>No cookies yet</h1>
            <span><a href="./add">Add</a> your first cookie to your personal Cookie Jar!</span>
        </div>
        </>
    )
}

export default Cookies;