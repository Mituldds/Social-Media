import React, { useEffect, useState } from "react";
import { fireStore } from "../../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Avatar } from "antd";

const Notification = () => {
  const [data, setData] = useState([]);
  const userId = JSON.parse(localStorage.getItem("user"));

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
      <div>Notification</div>

      <ul>
        {data?.length &&
          data?.map((item) => (
            <div key={item.id}>
              <li>
                {item.likeBy}
                <Avatar className="Profile_user_logo">
                  {userId.email.substring(0, 2).toUpperCase()}
                </Avatar>
              </li>
              {/* <li>{item.postId}</li>
              <li>{item.postByUser}</li> */}
            </div>
          ))}
      </ul>
    </>
  );
};

export default Notification;
