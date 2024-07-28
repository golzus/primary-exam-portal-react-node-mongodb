import React, { useEffect } from "react";
import { useGetTestByClassAndUserMutation } from "./actions/listWord/view/ListWordApiSlice";
import useAuth from "../hooks/useAuth";
import { IconButton, Tooltip } from "@mui/material";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility"; // Added icon for viewing
const TestsYouHaveToDo = () => {
  const [getTestByClassAndUser, { isError, data, error, isLoading }] =
    useGetTestByClassAndUserMutation();
  const { _id: user } = useAuth();
  useEffect(() => {
    getTestByClassAndUser({ user });
  }, []);
  if (isLoading) return <h1>Loading...</h1>;
  if (isError || !data) return <h1>error</h1>;
  let count = 0;
  return (
    <div>
      <h1>כמות הבחנים שעליך לעשות:{data.data.length}</h1>

      <button>
        <Link
          to={`/dash/actions/test/66a592699ee0087032567d4a`}
          className="users-list-button users-list-view"
        >
          {data.data[count++].date}
        </Link>
      </button>

      {data.data.map((test) => {
        <Link
          to={`/dash/actions/test/${test._id}`}
          className="users-list-button users-list-view"
        >
          <Tooltip title="View">
            <IconButton aria-label="view">
              <VisibilityIcon />
              <h1>hh</h1>
            </IconButton>
          </Tooltip>
        </Link>;
      })}
      {/* {data.data.map((test)=>({  
test           }))} */}
    </div>
  );
};

export default TestsYouHaveToDo;
