// React
import { useState, useRef } from "react";
// Components
import OverlayEdit from "./OverlayEdit";
// Global functions
import { timeAgo } from "../../Add/Add";
// Images
import cookieLogoDetailed from "../../../assets/cookieLogo.png";
// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPen,
  faTrashAlt,
  faRotate,
  faFloppyDisk,
  faXmark,
  faTrophy,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";

// API's url from Root
import { apiUrl } from "../../../Root";

//  Importing axios
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { cookiesActions } from "../../../store/slices/cookies";
import { alertActions } from "../../../store/slices/alert";


function CookieItem(props) {
  // Redux configuration
  const cookies = useSelector((state) => state.cookies.cookies);
  const groups = useSelector((state) => state.cookies.groups);
  const dispatch = useDispatch();

  // #region Edit mode states
  const [image, setImage] = useState(props.image);
  const [title, setTitle] = useState(props.title);
  const [description, setDescription] = useState(props.description);
  const [date, setDate] = useState(props.date);
  const [rank, setRank] = useState(props.rank);
  const [tag, setTag] = useState(props.tag);
  // #endregion Edit mode states

  // #region Dynamically setting the cookie colors
  let hue;
  let saturation = "100%";
  let saturationBg = "78%";
  let lightness = "80%";
  let lightnessBg = "91%";

  switch (rank) {
    case "bronze":
      hue = 30;
      saturation = "60%";
      break;
    case "silver":
      hue = 0;
      saturation = "0%";
      lightness = "97%";
      saturationBg = "0%";
      lightnessBg = "93%";
      break;
    case "gold":
      hue = 50;
      break;
    case "platinum":
      hue = 300;
      break;
    case "diamond":
      hue = 200;
      break;
    default:
      break;
  }

  const primaryColor = `hsl(${hue}, ${saturation}, ${lightness})`;
  const backgroundColor = `hsl(${hue}, ${saturationBg}, ${lightnessBg})`;
  const dateColorEditMode = `hsl(${hue}, ${saturation}, 85%)`;
  const buttonColorEditMode = `hsl(${hue}, ${saturation}, 45%, 0.5)`;
  const tagColor = `hsl(${hue}, ${saturation}, 85%)`;

  // #endregion

  // OnClick show the side button with an option to edit or delete the cookie
  const [sideExpanded, setSideExpanded] = useState(false);
  const [animationClass, setAnimationClass] = useState("cookie-side-rank");

  function onCookieClick() {
    if (sideExpanded) {
      setAnimationClass("cookie-side-rank hide");
      setSideExpanded(false);
    } else {
      setAnimationClass("cookie-side-rank-expanded");
      setSideExpanded(true);
    }
  }

  function deleteCookie() {
    if (window.confirm("Delete this cookie ?")) {
      axios
        .delete(apiUrl + "/delete/" + props.id)
        .then((res) => console.log(res.data));
      dispatch(alertActions.clear()) // Clearing the "alert" state so the alert can pop up again, otherwise it stays there.
      setTimeout(() => {
        dispatch(alertActions.removeCookieSuccess())
      }, 100);
      dispatch(
        cookiesActions.setCookies(
          cookies.filter((cookies) => cookies._id !== props.id)
        )
      );

      if (groups) {
        dispatch(
          cookiesActions.setGroups(
            groups.map((tag) => {
              if (tag.name === props.tag) {
                return {
                  name: tag.name,
                  content: tag.content.filter(
                    (cookie) => cookie._id !== props.id
                  ),
                };
              } else {
                return tag;
              }
            })
          )
        );
      }
    }
  }

  // #region Cookie Edit mode

  const [editMode, setEditMode] = useState(false);
  const [contentAnimation, setContentAnimation] = useState("");
  const [editAnimation, setEditAnimation] = useState("");

  // Enabling edit mode
  function editCookie() {
    if (!editMode) {
      setContentAnimation("edit-content-animation");
      setEditAnimation("edit-mode-animation");
      setTimeout(() => {
        setEditMode(true);
      }, 200);
    } else {
      if (
        title !== props.title ||
        description !== props.description ||
        date !== props.date ||
        rank !== props.rank ||
        tag !== props.tag ||
        image !== props.image
      ) {
        if (
          window.confirm(
            "The cookie data has been modified, your changes will be discarded. Are you sure you want to discard the changes ?"
          )
        ) {
          setContentAnimation("");
          setEditAnimation("");
          setEditMode(false);
          // Discarding all changes
          setTitle(props.title);
          setDescription(props.description);
          setDate(props.date);
          setRank(props.rank);
          setTag(props.tag);
          setImage(props.image);
          setImgData(null);
        }
      } else {
        setContentAnimation("");
        setEditAnimation("");
        setEditMode(false);
      }
    }
  }

  // When a user tries to modify an input while in the Edit mode
  const [overlayEditPlaceholder, setOverlayEditPlaceholder] = useState(null);

  // Dynamically detects which input was clicked and pass it to the function
  function editModeInputClick(name, value, type) {
    setOverlayEditPlaceholder(
      <OverlayEdit
        name={name}
        value={value}
        type={type}
        setOverlayEditPlaceholder={setOverlayEditPlaceholder}
        setTitle={setTitle}
        setDescription={setDescription}
        setDate={setDate}
        setRank={setRank}
        setTag={setTag}
      />
    );
  }

  function saveEditChanges() {

    dispatch(cookiesActions.setCookies(
      cookies.map((cookie) => {
        if (cookie._id === props.id) {
          return {
            _id: props.id,
            image: image,
            title: title,
            description: description,
            date: date,
            rank: rank,
            tag: tag,
          };
        } else {
          return cookie;
        }
      })
    ))
      
    

    // Sending a PUT request to the API

    axios
      .put(
        `${apiUrl}/update/${props.id}`,
        {
          image: image,
          title: title,
          description: description,
          date: date,
          rank: rank,
          tag: tag,
        },
        { headers: { "Content-Type": "multipart/form-data" } }
      )
      .then(() => {
       dispatch(alertActions.clear()) // Clearing the "alert" state so the alert can pop up again, otherwise it stays there.
        setTimeout(() => {
          dispatch(alertActions.saveChangeSuccess())
        }, 100);
        setContentAnimation("");
        setEditAnimation("");
        setEditMode(false);
      })
      .catch((error) => {
       dispatch(alertActions.clear()) // Clearing the "alert" state so the alert can pop up again, otherwise it stays there.
       dispatch(alertActions.error())
        console.log(error);
      });
  }
  // Creating the reference of the <input/> in html.
  const imageInputFile = useRef();
  function replaceImage() {
    imageInputFile.current.click();
  }
  // When user uploads an image
  const [imgData, setImgData] = useState(null);
  function onImageUpload(e) {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
      const reader = new FileReader(); //Reading the image from user input
      reader.addEventListener("load", () => {
        setImgData(reader.result);
      });
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  function deleteImage() {
    setImage(null);
    setImgData(null);
  }

  // #endregion

  return (
    <>
      {
        !editMode ? (
          // #region Regular mode
          <div
            className="cookie-container"
            style={{ backgroundColor: backgroundColor }}
            onClick={() => onCookieClick()}
          >
            <div className={"img-tag-date-container " + contentAnimation}>
              <img
                src={
                  imgData
                    ? imgData
                    : image
                    ? apiUrl + "/images/" + image
                    : cookieLogoDetailed
                }
                alt="Visual memories"
              />
              <div className="tag-date-container">
                {tag ? (
                  <span className="tag" style={{ backgroundColor: tagColor }}>
                    {tag}
                  </span>
                ) : (
                  <span className="tag" style={{ visibility: "hidden" }}>
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                )}
                <span className="date">
                  {timeAgo(date).toString().includes("hours")
                    ? "Today"
                    : timeAgo(date)}
                </span>
              </div>
            </div>
            <div className={"cookie-info " + contentAnimation}>
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <div
              className={animationClass + " " + contentAnimation}
              style={{ backgroundColor: primaryColor }}
            >
              {sideExpanded ? (
                <>
                  <div className="icon" onClick={() => editCookie()}>
                    <FontAwesomeIcon icon={faPen} />
                  </div>
                  <div className="hr"></div>
                  <div className="icon" onClick={() => deleteCookie()}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </div>
                </>
              ) : null}
            </div>
          </div>
        ) : (
          // #endregion
          // #region Edit mode
          <div
            className="cookie-container"
            style={{ backgroundColor: primaryColor }}
          >
            <div className={"img-tag-date-container " + editAnimation}>
              <div className="img-edit-container">
                <img
                  src={
                    imgData
                      ? imgData
                      : image
                      ? apiUrl + "/images/" + image
                      : cookieLogoDetailed
                  }
                  alt="Visual memories"
                  className="img-edit"
                />
                <div className="icon" onClick={() => replaceImage()}>
                  <FontAwesomeIcon icon={faRotate} />
                  {/* Input is hidden. Only the label is visible which is linked to the input tag. */}
                  <input
                    ref={imageInputFile}
                    accept="image/*"
                    type="file"
                    style={{ display: "none" }}
                    onChange={(e) => onImageUpload(e)}
                  />
                </div>
                <div className="icon" onClick={() => deleteImage()}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </div>
              </div>

              <div className="tag-date-container edit">
                {tag ? (
                  <span
                    className="tag"
                    style={{ backgroundColor: backgroundColor }}
                    onClick={() => editModeInputClick("Tag", tag, "tag")}
                  >
                    {tag}
                  </span>
                ) : (
                  <span
                    className="tag"
                    style={{ backgroundColor: backgroundColor }}
                    onClick={() => editModeInputClick("Tag", tag, "tag")}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </span>
                )}
                <span
                  className="date"
                  style={{ backgroundColor: dateColorEditMode }}
                  onClick={() => editModeInputClick("Date", date, "date")}
                >
                  {timeAgo(date).toString().includes("hours")
                    ? "Today"
                    : timeAgo(date)}
                </span>
              </div>
            </div>
            <div className={"cookie-info edit " + editAnimation}>
              <h1 onClick={() => editModeInputClick("Title", title, "title")}>
                {title}
              </h1>
              {description ? (
                <p
                  onClick={() =>
                    editModeInputClick(
                      "Description",
                      description,
                      "description"
                    )
                  }
                >
                  {description}
                </p>
              ) : (
                <p
                  onClick={() =>
                    editModeInputClick(
                      "Description",
                      description,
                      "description"
                    )
                  }
                  style={{
                    fontSize: "1.5rem",
                    textAlign: "center",
                    padding: "2rem",
                  }}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </p>
              )}
            </div>
            <div className={"edit-side-container " + editAnimation}>
              <div
                className="edit-cancel"
                style={{ backgroundColor: backgroundColor }}
                onClick={() => editCookie()}
              >
                <FontAwesomeIcon
                  icon={faXmark}
                  className="icon"
                  style={{ color: buttonColorEditMode }}
                />
              </div>
              <div
                className="edit-rank"
                style={{ backgroundColor: backgroundColor }}
                onClick={() => editModeInputClick("Rank", rank, "rank")}
              >
                <FontAwesomeIcon
                  icon={faTrophy}
                  className="icon"
                  style={{ color: buttonColorEditMode }}
                />
              </div>
              <div
                className="edit-confirm"
                style={{ backgroundColor: backgroundColor }}
                onClick={() => saveEditChanges()}
              >
                <FontAwesomeIcon
                  icon={faFloppyDisk}
                  className="icon"
                  style={{ color: buttonColorEditMode }}
                />
              </div>
            </div>
            {overlayEditPlaceholder}
          </div>
        )
        // #endregion
      }
    </>
  );
}

export default CookieItem;
