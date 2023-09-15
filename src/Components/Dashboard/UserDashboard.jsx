import React from "react";
import "./dashboard.css";
import { useDispatch, useSelector } from "react-redux";

import { resetUserDetails } from "../../Store/Slices/LoggedUserDetailsSlice";
import { setLoginStatus } from "../../Store/Slices/LoginStatusSlice";
import { updateUserImage } from "../../Store/Slices/LoggedUserDetailsSlice";
import { useNavigate } from "react-router-dom";

const UserDashboard = () => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const userDetails = useSelector((state) => {
    return state.LoggedUserDetails;
  });

  function uploadImage(inputfile) {
    const imageUrl = URL.createObjectURL(inputfile.files[0]);

    dispatch(updateUserImage(imageUrl));
  }

  return (
    <React.Fragment>
      <div className="dashboard-container">
        <div className="dashBoard">
          <div className="leftSection">
            <section id="userImage">
              <img src={userDetails.userImage} alt="User Image" />

              <label htmlFor="img" id="uploadImageLabel">
                Change image
              </label>
              <input
                type="file"
                id="img"
                name="img"
                accept="image/*"
                onChange={(e) => uploadImage(e.target)}
                style={{ display: "none" }}
              ></input>
            </section>
          </div>

          <div className="rightSection">
            <section id="userName">
              <h1>Name: {userDetails.userName}</h1>
            </section>

            <section id="userID">
              <p>User ID: {userDetails.key}</p>
            </section>

            <section id="mailID">
              <p>Mail: {userDetails.mailID}</p>
            </section>

            <section id="address">
              <p>Edit address:</p>
            </section>

            <section>
              <button
                id="logOutBtn"
                onClick={() => {
                  dispatch(setLoginStatus(false));
                  dispatch(resetUserDetails());
                  navigateTo("/LogInOrSignIn");
                }}
              >
                Log Out
              </button>
            </section>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserDashboard;
