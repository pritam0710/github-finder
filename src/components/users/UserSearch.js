import { useState, useContext } from "react";
import AlertContext from "../../context/alert/AlertContext";
import { searchUsersData } from "../../context/github/GithubAction";
import GithubContext from "../../context/github/GithubContext";
import Spinner from "../layout/Spinner";

function UserSearch() {
  const [text, setText] = useState("");
  const { users, dispatch, isLoading } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  function handleChange(evt) {
    setText(evt.target.value);
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (text.length === 0) {
      setAlert("error", "Please input some value");
    } else {
      dispatch({ type: "SET_LOADING" });
      const items = await searchUsersData(text);
      dispatch({ type: "GET_USERS", payload: items });
      setText("");
    }
  }

  function handleClear() {
    dispatch({ type: "CLEAR_USERS" });
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md: grid-cols-2 mb-8 gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-gray-400 input input-lg text-black"
                placeholder="Search"
                onChange={handleChange}
                value={text}
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button onClick={handleClear} className="btn btn-ghost btn-lg">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
