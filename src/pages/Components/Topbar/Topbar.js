import './Topbar.css'
function Topbar(props){

    return(
        <>
            <div className="topbar">
                <span>{props.text}</span>
            </div>
        </>
    )
}

export default Topbar;