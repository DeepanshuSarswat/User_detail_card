import * as React from "react";
import Pagination from "@mui/material/Pagination";
import { useSelector } from "react-redux";
import { selectUser } from "./features/counter/counterSlice";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import Skeleton from "@mui/material/Skeleton";

function Cards() {
  const userList = useSelector(selectUser);
  const [page, setPage] = React.useState(0);
  const [userData, setuserData] = React.useState(null);
  const [progress, setprogress] = React.useState(false);
  const [errmsg, seterrmsg] = React.useState("");
  const handleChange = (event, value) => {
    setPage(value);
  };
  useEffect(() => {
    if (page != 0) {
      setprogress(true);
      fetch(`https://reqres.in/api/users/${page}`)
        .then((response) => response.json())
        .then((data) => {
          setuserData(data);
          setprogress(false);
        })
        .catch((err) => {
          console.log("errorr");
          setprogress(false);
          seterrmsg("please Check Your Internet Connection");
        });
    }
  }, [page]);

  return (
    <div className="user">
      <div className="userData">
        {page == 0 && (
          <p className="askuser">Click On Any Button To Get USer Data</p>
        )}
        <Card sx={{ maxWidth: 345, m: 2 }}>
          {progress ? (
            <Skeleton
              sx={{ height: 140 }}
              animation="wave"
              variant="rectangular"
            />
          ) : (
            <CardMedia
              component="img"
              height="140"
              image={userData?.data?.avatar}
              alt={
                page == 0 ? (
                  "User Image"
                ) : (
                  <p>(${userData?.data?.first_name}) "Image"</p>
                )
              }
            />
          )}
          <CardContent>
            {progress ? (
              <React.Fragment>
                <Skeleton
                  animation="wave"
                  height={10}
                  style={{ marginBottom: 6 }}
                />
                <Skeleton animation="wave" height={10} width="80%" />
              </React.Fragment>
            ) : (
              <Typography variant="body2" color="text.secondary" component="p">
                Full Name : {userData?.data?.first_name}{" "}
                {userData?.data?.last_name}
                <br></br>
                E-mail : {userData?.data?.email} <br></br>
                {errmsg && errmsg}
              </Typography>
            )}
          </CardContent>
        </Card>
      </div>
      <div className="pegination">
        <Pagination
          count={userList.length}
          color="primary"
          onChange={handleChange}
          defaultPage={0}
        />
      </div>
    </div>
  );
}

export default Cards;
