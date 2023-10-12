import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { CgSearchFound } from "react-icons/cg";
import { AiOutlineWechat } from "react-icons/ai";
import { IoIosNotifications } from "react-icons/io";
import { FaHashtag } from "react-icons/fa";
import { GiDiscussion } from "react-icons/gi";
import { RxButton } from "react-icons/rx";
import { ImProfile } from "react-icons/im";
import "./Menu.css";
import { useNavigate } from "react-router-dom";
import { Badge, notification } from "antd";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { fireStore } from "../../FirebaseConfig";

const Menu = () => {
  const navigate = useNavigate();
  const handleHome = () => {
    navigate("/");
  };
  const handleChat = () => {
    navigate("/chat");
  };
  const handleNotification = () => {
    navigate("/notification");
  };

  const userId = JSON.parse(localStorage.getItem("user")).id;
  const [data, setData] = useState();

  const fetchData = async () => {
    try {
      const collectionRef = collection(fireStore, "notification");
      // const q = query(
      //   collectionRef,
      //   where("postByUser", "==", userId),
      //   orderBy("time", "desc") // Sort by the 'time' field in descending order
      // );
      const notificationData = await getDocs(collectionRef);
      let notification = [];
      notificationData.forEach((doc) => {
        notification.push({ ...doc.data(), id: doc.id });
      });
      // console.log(notification.length);
      setData(notification.length);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  console.log("====================================");
  console.log(data);
  console.log("====================================");
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="card menu_card">
      <div className="card-body">
        <h5>Menu</h5>
        <div>
          <ul className="card_list">
            <li>
              <span>
                <FaHome />
              </span>
              <span onClick={handleHome}>Home</span>
            </li>

            <li>
              <span>
                <CgSearchFound />
              </span>
              <span>Search</span>
            </li>
            <li>
              <span>
                <AiOutlineWechat />
              </span>
              <span onClick={handleChat}>Chat</span>
            </li>
            <li>
              <span>
                <IoIosNotifications />
              </span>
              <span onClick={handleNotification}>Notification</span>
              <span>
                <Badge
                  className="site-badge-count-109"
                  count={data}
                  overflowCount={10}
                  style={{
                    backgroundColor: "#52c41a",
                    padding: "0px 10px",
                    width: "fit-content",
                  }}
                ></Badge>
              </span>

              {/* <span className="Notification_Badge">{data}</span> */}
            </li>
            <li>
              <span>
                <FaHashtag />
              </span>
              <span>Trending</span>
            </li>
            <li>
              <span>
                <GiDiscussion />
              </span>
              <span>Comunities</span>
            </li>
            <li>
              <span>
                <RxButton />
              </span>
              <span>Turn On Light</span>
            </li>
            <li>
              <span>
                <ImProfile />
              </span>
              <span onClick={() => navigate("/profile_page")}>Profile</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Menu;
