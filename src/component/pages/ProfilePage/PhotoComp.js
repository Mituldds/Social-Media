import React, { useEffect, useState } from "react";
import { fireStore } from "../../../FirebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Button, Row } from "antd";
import { AiFillHeart } from "react-icons/ai";
import "./PhotoComp.css";

const PhotoComp = ({ userId }) => {
  const [userPosts, setUserPosts] = useState(null);

  useEffect(() => {
    const fetchUserPosts = async () => {
      const q = query(
        collection(fireStore, "post"),
        where("userId", "==", userId)
      );
      try {
        const querySnapshot = await getDocs(q);
        const userPostsData = [];
        querySnapshot.forEach((doc) => {
          userPostsData.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        setUserPosts(userPostsData);
        // console.log(userPostsData);
      } catch (error) {
        console.error("Error fetching user posts: ", error);
      }
    };

    fetchUserPosts();
  }, [userId]);

  return (
    <>
      <div className="container">
        <h6>User Posts</h6>
        <Row justify="space-evenly" className="mb-3">
          {userPosts?.map((post) => (
            <div key={post?.id} className="user_Upload_list">
              <img className="user_Upload_img p-3" src={post?.postImage} />
              <br />
              <div className="userPost_Like">
                <Button shape="circle" className="userPost_Like_Btn">
                  <AiFillHeart />
                </Button>
                <p>{post?.likedBy?.length} Likes </p>
                <p>{post.timestamp}</p>
              </div>
            </div>
          ))}
        </Row>
      </div>
    </>
  );
};

export default PhotoComp;
