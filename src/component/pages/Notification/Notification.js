import React, { useEffect, useState } from "react";
import { fireStore } from "../../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Avatar } from "antd";
import "./Notification.css";

const Notification = () => {
  const [data, setData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const fetchData = async () => {
    try {
      const collectionRef = collection(fireStore, "notification");
      const q = query(collectionRef, where("postByUser", "==", userId));
      const notificationData = await getDocs(q);
      let notification = [];
      notificationData.forEach((doc) => {
        notification.push({ ...doc.data(), id: doc.id });
      });
      console.log(notification);
      // notificationData.docs.forEach((doc) => doc.data());
      setData(notification);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="Notification_Title">Notification</div>
      <ul>
        {data?.length &&
          data?.map((item) => (
            <div className="Notification" key={item.id}>
              <div>
                <Avatar className="Notification_Avatar">
                  {item.likeByEmail.substring(0, 2).toUpperCase()}
                </Avatar>
              </div>
              <div>
                <li>{item.name} Like Your Post.</li>
                <li className="Notification_time">{item.time}</li>
              </div>
            </div>
          ))}
      </ul>
    </>
  );
};

export default Notification;