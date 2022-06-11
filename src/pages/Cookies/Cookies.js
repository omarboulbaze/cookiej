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
  faTag
} from "@fortawesome/free-solid-svg-icons";

// API's url from Root
import { apiUrl } from "../../Root";

//  Importing axios
import axios from "axios";

function Cookies() {
  document.title = "My Cookies | Cookie Jar";

  // Alert management
  const [alertState, setAlertState] = useState(null);
  // Search
  const [searchText, setSearchText] = useState("");

  // #region On Component Mount
  
  // Retrieving the cookies from the database
  const [cookiesData, setCookiesData] = useState([]);

  useEffect(() => {
    sortByDefault();
  }, []);

  function sortByDefault() {
    setSortBy("");
    axios
      .get(apiUrl + "/")
      .then((res) => {
        if (res.data.length > 0) setCookiesData(res.data);
      })
      .catch((e) => console.log("GET request", e));
  }

  // #endregion On Component Mount

  // #region Cookie sorting

  const [sortMode, setSortMode] = useState(false);
  const [sortBy, setSortBy] = useState("");

  // Sorting cookies by Date (Newest to Oldest)
  function sortByDate() {
    setSortBy("date");
    let sortedArray = cookiesData;
    sortedArray.sort((a, b) => {
      if (a.date < b.date) return 1;
      if (a.date > b.date) return -1;
      return 0;
    });
    setCookiesData(sortedArray);
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
    let sortedArray = cookiesData;
    sortedArray.sort((a, b) => {
      if (rankToNumber(a) < rankToNumber(b)) return 1;
      if (rankToNumber(a) > rankToNumber(b)) return -1;
      return 0;
    });
    setCookiesData(sortedArray);
  }

  // Sorting cookies by alphabetical order
  function sortByAz() {
    setSortBy("az");
    let sortedArray = cookiesData;
    sortedArray.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      }
      if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      }
      return 0;
    });
    setCookiesData(sortedArray);
  }

  // #endregion Cookie sorting

  // #region Cookie grouping

  const [groupMode, setGroupMode] = useState(false);
  const [groupBy, setGroupBy] = useState("");

  function groupByDefault() {
    setGroupBy("");
    setTags([]);
  }

  function groupByDate() {
    setGroupBy("date");
  }

  function groupByRank() {
    setGroupBy("rank");
  }

  // #region Group by tag

  //TODO: When user deletes/edits a cookie, update automatically the states

  // Array that contains the cookies grouped by tag
  const [tags, setTags] = useState([]);

  // Clearing Tags state when groupBy is not equal to "tag" anymore
  useEffect(() => {
    if (groupBy !== "tag") setTags([]);
  }, [groupBy]);

  // Function that take all the cookies and group them by tag
  function groupCookiesByTag() {
    let temporaryTagArray = tags;
    cookiesData.forEach((cookie) => {
      if (
        !temporaryTagArray.some((arrayTag) => {
          return arrayTag.name === cookie.tag;
        })
      ) {
        temporaryTagArray.push({ name: cookie.tag, content: [cookie] });
      } else {
        temporaryTagArray.forEach((arrayTag) => {
          if (arrayTag.name === cookie.tag) arrayTag.content.push(cookie);
        });
      }
    });
    console.log(temporaryTagArray)
    setTags(temporaryTagArray);
  }

  // Function triggered when the user clicks on the "Group By Tag" button
  function groupByTag() {
    setGroupBy("tag");
    groupCookiesByTag();
  }

  // #endregion Group by tag

  return (
    <>
      {alertState}
      <Topbar text="My Cookies" />
      {
        // #region Toolbar
        cookiesData.length > 1 ? (
          <div className="toolbar-container">
            {!sortMode && !groupMode ? (
              <div className="toolbar">
                <div className="search">
                  <FontAwesomeIcon className="icon" icon={faMagnifyingGlass} />
                  <input
                    type="text"
                    placeholder={`Search ${cookiesData.length} cookies...`}
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
          tags.map((tag) => {
            return <CookieGroup tag={tag} key={tag.name} searchText={searchText} cookiesData={cookiesData} setCookiesData={setCookiesData} setAlertState={setAlertState}/>;
          })
        ) : cookiesData.length > 0 ? (
          cookiesData.map((c) => {
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
                  cookiesData={cookiesData}
                  setCookiesData={setCookiesData}
                  setAlertState={setAlertState}
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
