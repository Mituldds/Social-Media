import React, { useEffect, useState } from "react";
import { fireStore } from "../../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import "./PhotoComp.css";
import { Col, Row } from "antd";

const PhotoComp = () => {
  const [userPosts, setUserPosts] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchUserPosts = async () => {
      const q = query(
        collection(fireStore, "post"),
        where("userId", "==", user.id)
      );
      try {
        const querySnapshot = await getDocs(q);
        const userPostsData = [];
        querySnapshot.forEach((doc) => {
          console.log(doc, "=============");
          userPostsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log(userPostsData);
        setUserPosts(userPostsData);
      } catch (error) {
        console.error("Error fetching user posts: ", error);
      }
    };

    fetchUserPosts();
  }, [user.id]);

  return (
    <>
      <div className="container">
        <h6>User Posts</h6>

        <Row justify="space-evenly" className="mb-3">
          {userPosts?.map((post) => (
            <div key={post?.id} className="user_Upload_list">
              <p>{post.timestamp}</p>
              <img className="user_Upload_img" src={post?.postImage} />
            </div>
          ))}
        </Row>
      </div>
    </>
  );
};

export default PhotoComp;
