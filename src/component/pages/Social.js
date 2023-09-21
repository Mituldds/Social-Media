import React, { useEffect, useState } from "react";
import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import { fireStore } from "../../FirebaseConfig";
import { SiGooglecalendar } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { FaComment, FaSync } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Button } from "antd";
import { Tabs } from "antd";
import "./Social.css";

const Social = () => {
  const [imageData, setImageData] = useState([]);
  const [likes, setLikes] = useState([]);

  const handleLike = async (postId) => {
    const postRef = doc(fireStore, "posts", postId);
    await updateDoc(postRef, {
      likes: increment(1), // Assuming you have a field 'likes' in your Firestore document.
    });
  };

  const handleComment = async (postId, commentText) => {
    const commentsCollection = collection(fireStore, "comments");
    await addDoc(commentsCollection, {
      postId,
      text: commentText,
      timestamp: serverTimestamp(), // You may want to add a timestamp to each comment.
    });
  };

  const handleLikeClick = async (postId) => {
    // handleLike(postId);
    // console.log(postId);

    try {
      await handleLike(postId);
      // Update the state to reflect the new like count
      setImageData((prevState) =>
        prevState.map((image) =>
          image.id === postId ? { ...image, likes: image.likes + 1 } : image
        )
      );
    } catch (error) {
      console.error("Error Like post: ", error);
    }
  };

  const handleCommentClick = async (postId, commentText) => {
    // handleComment(commentText);
    try {
      await handleComment(postId, commentText);
      // Optionally, you can update the state to display the new comment immediately.
    } catch (error) {
      console.error("Error commenting on post: ", error);
    }
  };

  const getPosts = async () => {
    const postsCollection = collection(fireStore, "post");
    try {
      const querySnapshot = await getDocs(postsCollection);

      const posts = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setImageData(posts);
      console.log("Posts:", posts);
      return;
    } catch (error) {
      console.error("Error getting posts: ", error);
      throw error;
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <div>
        <Tabs
          defaultActiveKey="1"
          centered
          items={new Array(3).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
              label: `Newest`,
              label: `Trending`,
              label: `Discover`,
              key: id,
            };
          })}
        />
      </div>

      {imageData.map((image) => (
        <div key={image.id}>
          <div className="social_media_card_logo my-4">
            <img
              className="social_logo col-2"
              src="/Images/pngegg.png"
              alt="logo"
            />{" "}
            <div className="col-8 mx-2">
              <h5>11 Marketing Channels That Consistently Work for Founders</h5>

              <div className="social_details row container ">
                {/* <div className="card_content">
                  Zerotousers
                  <span className="text-success">
                    <GiStumpRegrowth />
                  </span>
                  <p>Growth & User Acquisition</p>
                </div> */}

                <p className="time_comment">
                  <SiGooglecalendar className="text-success me-2" />
                  {image.timestamp} &nbsp;
                  {/* <RiMessage2Fill className="text-success me-2" />
                  89 Comments */}
                </p>
              </div>

              <div className="socialMedia_card card-body">
                <div>
                  <p>{image.caption}</p>
                  <img
                    className="social_card card"
                    src={image.postImage}
                    alt={image.caption}
                  />
                </div>

                <div className="social_btn">
                  <Button
                    shape="circle"
                    onClick={() => handleLikeClick(image.id)}
                  >
                    <AiFillHeart />
                  </Button>
                  <p>{likes}</p>
                  {/* <p>45K</p> */}

                  <Button shape="circle" onClick={handleCommentClick}>
                    <FaComment />
                  </Button>

                  <input type="text" placeholder="Add a Comment" />
                  {/* <p>1154</p> */}
                  <Button shape="circle">
                    <FaShare />
                  </Button>
                  <p>378</p>
                </div>
              </div>
            </div>
            <button className="follow_btn btn btn-outline-success mx-2">
              Follow
            </button>
          </div>
          <br />
        </div>
      ))}
    </>
  );
};
export default Social;
