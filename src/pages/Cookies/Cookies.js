// React
import { useState, useEffect } from "react";

// CSS
import "./Cookies.css";

// Logo
import cookieLogo from "../../assets/svg/cookie.svg";

// Components
import Topbar from "../Components/Topbar/Topbar";
import CookieItem from "./CookieItem/CookieItem";
import CookieGroup from "./CookieItem/CookieGroup";
import Alert from "../Components/Alert/Alert";

// Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrophy,
  faMagnifyingGlass,
  faArrowUpWideShort,
  faRectangleList,
  faClose,
  faCalendar,
  faArrowUpAZ,
  faTag,
} from "@fortawesome/free-solid-svg-icons";

// API's url from Root
import { apiUrl } from "../../Root";

//  Axios
import axios from "axios";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { cookiesActions } from "../../store/slices/cookies";

document.title = "My Cookies | Cookie Jar";

function Cookies() {
  // Search
  const [searchText, setSearchText] = useState("");

  // Redux configuration
  const cookies = useSelector((state) => state.cookies.cookies);
  const groups = useSelector((state) => state.cookies.groups);
  const alert = useSelector((state) => state.alert.alert);

  const dispatch = useDispatch();

  // #region On Component Mount
  function sortByDefault() {
    setSortBy("");
    axios
      .get(apiUrl + "/")
      .then((res) => {
        if (res.data.length > 0) dispatch(cookiesActions.setCookies(res.data));
      })
      .catch((e) => console.log("GET request", e));
  }

  // Once the component is mounted call sortByDefalut
  useEffect(() => {
    setSortBy("");
    axios
      .get(apiUrl + "/")
      .then((res) => {
        if (res.data.length > 0) dispatch(cookiesActions.setCookies(res.data));
      })
      .catch((e) => console.log("GET request", e));
  }, [dispatch]);

  // #endregion On Component Mount

  // #region Cookie sorting

  const [sortMode, setSortMode] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // Sorting cookies by Date (Newest to Oldest)
  function sortByDate() {
    setSortBy("date");
    let sortedArray = cookies.map((c) => c);
    sortedArray.sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
    dispatch(cookiesActions.setCookies(sortedArray));
  }

  // Sorting cookies by Rank (Higher rank to Lower rank)
  const ranks = { bronze: 1, silver: 2, gold: 3, platinum: 4, diamond: 5 };

  // Getting the rank of the cookie (string) and making it a number to rank the cookies
  function rankToNumber(cookie) {
    return ranks[cookie.rank];
  }

  // Main function
  function sortByRank() {
    setSortBy("rank");
    let sortedArray = cookies.map((c) => c);
    sortedArray.sort((a, b) => {
      if (rankToNumber(a) < rankToNumber(b)) return 1;
      if (rankToNumber(a) > rankToNumber(b)) return -1;
      return 0;
    });
    dispatch(cookiesActions.setCookies(sortedArray));
  }

  // Sorting cookies by alphabetical order
  function sortByAz() {
    setSortBy("az");
    let sortedArray = cookies.map((c) => c);
    sortedArray.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    dispatch(cookiesActions.setCookies(sortedArray));
  }

  // #endregion Cookie sorting

  // #region Cookie grouping

  const [groupMode, setGroupMode] = useState(false);
  const [groupBy, setGroupBy] = useState("");

  function groupByDefault() {
    setGroupBy("");
    dispatch(cookiesActions.clearGroups());
  }

  function groupByDate() {
    setGroupBy("date");
  }

  function groupByRank() {
    setGroupBy("rank");

    let temporaryArray = [];
    cookies.forEach((cookie) => {
      if (
        !temporaryArray.some((array) => {
          return array.name === cookie.rank;
        })
      ) {
        temporaryArray.push({ name: cookie.rank, content: [cookie] });
      } else {
        temporaryArray.forEach((array) => {
          if (array.name === cookie.rank) return array.content.push(cookie);
        });
      }
    });
    dispatch(cookiesActions.setGroups(temporaryArray));
  }

  // #region Group by tag

  function groupByTag() {
    setGroupBy("tag");

    let temporaryArray = [];
    cookies.forEach((cookie) => {
      if (
        !temporaryArray.some((array) => {
          return array.name.toLowerCase() === cookie.tag.toLowerCase();
        })
      ) {
        temporaryArray.push({ name: cookie.tag, content: [cookie] });
      } else {
        temporaryArray.forEach((array) => {
          if (array.name.toLowerCase() === cookie.tag.toLowerCase()) return array.content.push(cookie);
        });
      }
    });
    dispatch(cookiesActions.setGroups(temporaryArray));
  }

  // #endregion Group by tag

  // #endregion Cookie grouping

  return (
    <>
      {alert.visible && (
        <Alert
          visible={alert.visible}
          boldText={alert.boldText}
          text={alert.text}
          hue={alert.hue}
          icon={alert.icon}
        />
      )}

      <Topbar text="My Cookies" />
      {
        // #region Toolbar
        cookies.length > 0 ? (
          <div className="toolbar-container">
            {!sortMode && !groupMode ? (
              <div className="toolbar">
                <div className="search">
                  <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
                  <input
                    type="text"
                    placeholder={
                      cookies.length === 1
                        ? `Search...`
                        : `Search ${cookies.length} cookies...`
                    }
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                  />
                </div>
                <div className="icons">
                  <FontAwesomeIcon
                    className="toolbar-icon"
                    onClick={() => setGroupMode(true)}
                    icon={faRectangleList}
                  />
                  <FontAwesomeIcon
                    className="toolbar-icon"
                    onClick={() => setSortMode(true)}
                    icon={faArrowUpWideShort}
                  />
                </div>
              </div>
            ) : sortMode ? (
              // Sort by
              <div className="toolbar">
                <FontAwesomeIcon icon={faArrowUpWideShort} />
                <div>
                  <FontAwesomeIcon
                    className={
                      sortBy === "date"
                        ? "toolbar-icon-click active"
                        : "toolbar-icon-click"
                    }
                    icon={faCalendar}
                    onClick={
                      sortBy === "date"
                        ? () => sortByDefault()
                        : () => sortByDate()
                    }
                  />
                  <FontAwesomeIcon
                    className={
                      sortBy === "rank"
                        ? "toolbar-icon-click active"
                        : "toolbar-icon-click"
                    }
                    icon={faTrophy}
                    onClick={
                      sortBy === "rank"
                        ? () => sortByDefault()
                        : () => sortByRank()
                    }
                  />
                  <FontAwesomeIcon
                    className={
                      sortBy === "az"
                        ? "toolbar-icon-click active"
                        : "toolbar-icon-click"
                    }
                    icon={faArrowUpAZ}
                    onClick={
                      sortBy === "az" ? () => sortByDefault() : () => sortByAz()
                    }
                  />
                </div>
                <FontAwesomeIcon
                  className="toolbar-icon"
                  icon={faClose}
                  onClick={() => setSortMode(false)}
                />
              </div>
            ) : (
              // Group by
              <div className="toolbar">
                <FontAwesomeIcon icon={faRectangleList} />
                <div>
                  <FontAwesomeIcon
                    className={
                      groupBy === "date"
                        ? "toolbar-icon-click active"
                        : "toolbar-icon-click"
                    }
                    icon={faCalendar}
                    onClick={
                      groupBy === "date"
                        ? () => groupByDefault()
                        : () => groupByDate()
                    }
                  />
                  <FontAwesomeIcon
                    className={
                      groupBy === "rank"
                        ? "toolbar-icon-click active"
                        : "toolbar-icon-click"
                    }
                    icon={faTrophy}
                    onClick={
                      groupBy === "rank"
                        ? () => groupByDefault()
                        : () => groupByRank()
                    }
                  />
                  <FontAwesomeIcon
                    className={
                      groupBy === "tag"
                        ? "toolbar-icon-click active"
                        : "toolbar-icon-click"
                    }
                    icon={faTag}
                    onClick={
                      groupBy === "tag"
                        ? () => groupByDefault()
                        : () => groupByTag()
                    }
                  />
                </div>
                <FontAwesomeIcon
                  className="toolbar-icon"
                  icon={faClose}
                  onClick={() => setGroupMode(false)}
                />
              </div>
            )}
          </div>
        ) : null

        // #endregion Toolbar
      }

      <div className="cookie-grouper">
        {groupBy === "tag" ? (
          groups.map((group) => {
            if (group.content.length > 0) {
              return (
                <CookieGroup group={group} key={group.name} searchText={searchText} groupBy={groupBy}/>
              );
            } else {
              return null;
            }
          })
        ) : groupBy === "rank" ? (
          groups.map((group) => {
            if (group.content.length > 0) {
              return (
                <CookieGroup group={group} key={group.name} searchText={searchText} groupBy={groupBy} />
              );
            } else {
              return null;
            }
          })
        ) : cookies.length > 0 ? (
          cookies.map((c) => {
            if (
              c.title.toLowerCase().includes(searchText.toLowerCase()) ||
              c.description.toLowerCase().includes(searchText.toLowerCase())
            ) {
              return (
                <CookieItem
                  key={c._id}
                  id={c._id}
                  image={c.image}
                  title={c.title}
                  description={c.description}
                  date={c.date}
                  rank={c.rank}
                  tag={c.tag}
                />
              );
            }
            return null;
          })
        ) : (
          <div
            className="empty-container"
            style={{ maxWidth: "640px", margin: "auto" }}
          >
            <img src={cookieLogo} alt="Cookie Logo" />
            <h1>No cookies yet</h1>
            <span>
              <a href="./add">Add</a> your first cookie to your personal Cookie
              Jar!
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default Cookies;
