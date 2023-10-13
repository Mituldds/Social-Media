import React, { useEffect, useState } from "react";
import { fireStore } from "../../../FirebaseConfig";
import { collection, getDocs, query, where, orderBy } from "firebase/firestore";
import { Avatar } from "antd";
import "./Notification.css";

const Notification = () => {
  const [data, setData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const fetchData = async () => {
    try {
      const collectionRef = collection(fireStore, "notification");
      const q = query(
        collectionRef,
        where("postByUser", "==", userId),
        orderBy("time", "desc") // Sort by the 'time' field in descending order
      );
      const notificationData = await getDocs(q);
      let notification = [];
      notificationData.forEach((doc) => {
        notification.push({ ...doc.data(), id: doc.id });
      });
      // console.log(notification.length);
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
      <div className="Notification_content">
        {data?.length &&
          data?.map((item) => (
            <div className="Notification" key={item.id}>
              <div className="Notification_name">
                <Avatar className="Notification_Avatar">
                  {item.likeByEmail.substring(0, 2).toUpperCase()}
                </Avatar>
                <p className="Comment_Notification">
                  {item.name}
                  {item?.commentText
                    ? " Comment Your Post."
                    : " Like Your Post."}
                  {item.commentText && (
                    <p className="Notification_CommentText">
                      {item.commentText}
                    </p>
                  )}
                </p>
              </div>
              <div className="Notification_time">
                <p>{item.time}</p>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Notification;
