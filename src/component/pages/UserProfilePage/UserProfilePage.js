import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Avatar, Tabs } from "antd";
import PhotoComp from "../ProfilePage/PhotoComp";
import "./UserProfilePage.css";
import { collection, doc, getDoc } from "firebase/firestore";
import { fireStore } from "../../../FirebaseConfig";

const UserProfilePage = () => {
  const [userProfileData, setUserProfileData] = useState();
  const navigate = useNavigate();
  const { userId } = useParams();

  // Define the collection reference
  const myCollection = collection(fireStore, "users");

  // Define a query to fetch data with the where condition
  const documentRef = doc(fireStore, "users", userId);

  // Fetch data from the collections

  useEffect(() => {
    async function fetchData() {
      try {
        const docSnapshot = await getDoc(documentRef);
        if (docSnapshot.exists()) {
          // Document exists, you can access its data
          const userData = docSnapshot.data();
          console.log(userData);
          setUserProfileData(docSnapshot.data());
        } else {
          console.log("Document does not exist");
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }
    // Call the function to fetch data
    fetchData();
  }, [userId]);

  const gridStyle = {
    width: "25%",
    textAlign: "center",
  };

  const items = [
    {
      key: "1",
      label: "Photos",
      children: <PhotoComp userId={userId} />,
    },
    {
      key: "2",
      label: "Videos",
      children: "Content of Tab Pane 2",
    },
    {
      key: "3",
      label: "Likes",
      children: "Content of Tab Pane 3",
    },
  ];

  const handleBackBtn = () => {
    navigate("/");
  };

  return (
    <>
      <div>
        <img className="UserProfilePage_imgTop" src="/Images/ProfilePage.png" />
        <div className="UserProfilePage_logo_back">
          <Avatar className="UserProfilePage_user_logo">
            {userProfileData?.email.substring(0, 2).toUpperCase()}
          </Avatar>
          <button className="UserProfilePage_back_btn" onClick={handleBackBtn}>
            Back To Home
          </button>
        </div>
        <div className="container mt-3 UserProfilePage_Detail">
          <p className="UserProfilePage_Detail_P">
            <b>Name : </b>
            {userProfileData?.name}
          </p>
          <p className="UserProfilePage_Detail_P">
            <b>E-mail : </b>
            {userProfileData?.email}
          </p>
          <p className="UserProfilePage_Detail_P">
            <b>Number : </b>
            1234567890{" "}
          </p>
        </div>
        <div className="container mt-3 UserProfilePage_tab">
          <Tabs defaultActiveKey="1" items={items} />
        </div>
      </div>
    </>
  );
};

export default UserProfilePage;
