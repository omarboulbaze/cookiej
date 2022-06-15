import { faEarth } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Topbar from "../Components/Topbar/Topbar";
import "./Challenges.css";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { counterActions } from '../../../src/store/slices/counter'
import { hiddenActions } from '../../../src/store/slices/hidden'

function Challenges() {
  // #region Document title
  document.title = "Challenges | Cookie Jar";
  // #endregion Document title

  const counter = useSelector((state) => state.counter.counter);
  const hidden = useSelector((state) => state.hidden.hidden);

  const dispatch = useDispatch();

  function incrementCount() {
    dispatch(counterActions.increment());
  }
  function decrementCount() {
    dispatch(counterActions.decrement());
  }
  function hideIcon() {
    dispatch(hiddenActions.hide());
  }

  return (
    <>
      <Topbar text="Challenges" />
      <div
        className="empty-container"
        style={{ maxWidth: "640px", margin: "auto" }}
      >
        {hidden && (
          <FontAwesomeIcon
            icon={faEarth}
            className="icon"
            onClick={() => incrementCount()}
          />
        )}

        <h1 onClick={() => hideIcon()}>
          Challenges will be released soon {counter}
        </h1>
        <span onClick={() => decrementCount()}>
          Browse the top community created challenges or share your cookies with
          the world!
        </span>
      </div>
    </>
  );
}

export default Challenges;
