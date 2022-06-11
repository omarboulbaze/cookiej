import {useState, useEffect} from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faXmark} from "@fortawesome/free-solid-svg-icons";

// Making a functional react component to be able to pass down props (Component name should be capitalized otherwise it's considered a component's function.)
function OverlayEdit(props) {
    const [inputType, setInputType] = useState();
  
    useEffect(() => {
      // Checking if the title is not null
      function checkTitle(value) {
        if (value !== "") {
          props.setTitle(value);
        }
      }
  
      // Checking if the date is in the past. Maximum date for a cookie is today.
      function checkDate(value) {
        if (value > new Date().toLocaleDateString("en-CA")) {
          alert("The cookie date cannot be in the future.");
          props.setOverlayEditPlaceholder(null);
        } else {
          props.setDate(value);
        }
      }
  
      switch (props.type) {
        case "title":
          setInputType(
            <textarea
              defaultValue={props.value}
              onChange={(e) => checkTitle(e.target.value)}
            />
          );
          break;
        case "description":
          setInputType(
            <textarea
              defaultValue={props.value}
              onChange={(e) => props.setDescription(e.target.value)}
            />
          );
          break;
        case "tag":
          setInputType(
            <textarea
              defaultValue={props.value}
              onChange={(e) => props.setTag(e.target.value)}
            />
          );
          break;
        case "date":
          let date = new Date(props.value).toLocaleDateString("en-CA");
          setInputType(
            <input
              type="date"
              className="date-input"
              defaultValue={date}
              max={new Date().toLocaleDateString("en-CA")}
              style={{ fontSize: "1.5rem" }}
              onChange={(e) => checkDate(e.target.value)}
            />
          );
          break;
        case "rank":
          setInputType(
            <select
              className="select"
              style={{ fontSize: "1.2rem" }}
              defaultValue={props.value}
              onChange={(e) => props.setRank(e.target.value)}
            >
              <option value="bronze" className="bronze">
                🟫 Bronze
              </option>
              <option value="silver" className="silver">
                ⬜️ Silver
              </option>
              <option value="gold" className="gold">
                🟨 Gold
              </option>
              <option value="platinum" className="platinum">
                🟪 Platinum
              </option>
              <option value="diamond" className="diamond">
                🟦 Diamond
              </option>
            </select>
          );
          break;
        default:
          break;
      }
    }, [props]);
  
    return (
      <div className="edit-overlay-container">
        <span>{props.name}</span>
        {inputType}
        <div
          className="cancel"
          onClick={() => props.setOverlayEditPlaceholder(null)}
        >
          <FontAwesomeIcon icon={faXmark} className="icon" />
        </div>
      </div>
    );
  }

  export default OverlayEdit;