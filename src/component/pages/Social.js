import React, { useEffect, useState } from "react";
import {
  doc,
  addDoc,
  getDocs,
  updateDoc,
  increment,
  collection,
  serverTimestamp,
  getDoc,
  query,
  where,
} from "firebase/firestore";

import { fireStore } from "../../FirebaseConfig";
import { SiGooglecalendar } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Button } from "antd";
import { Tabs } from "antd";
import "./Social.css";

const Social = () => {
  const [imageData, setImageData] = useState([]);
  const [comments, setComments] = useState({});
  const [isHidden, setIsHidden] = useState(false);

  const toggleVisibility = () => {
    setIsHidden(!isHidden);
  };
  const userId = JSON.parse(localStorage.getItem("user")).id;

  const handleLikeClick = async (postId) => {
    try {
      const postRef = doc(fireStore, "post", postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const updatedImageData = imageData.map((post) => {
          if (post.id === postId) {
            // const userId = "123456"; // Replace with your actual user ID logic
            const likedBy = post.likedBy || [];

            if (!likedBy.includes(userId)) {
              likedBy.push(userId);
            } else {
              // If the user already liked, unlike the post
              likedBy.splice(likedBy.indexOf(userId), 1);
            }

            // Update the like count and likedBy array in the post data
            return { ...post, likedBy };
          }
          return post;
        });

        setImageData(updatedImageData);

        // Update Firestore with the updated likedBy array
        await updateDoc(postRef, {
          likedBy: updatedImageData.find((post) => post.id === postId).likedBy,
        });
      } else {
        // Document does not exist, handle it gracefully
        console.warn(`Post with ID ${postId} does not exist.`);
        // You can choose to display a message to the user or take other actions.
      }
    } catch (error) {
      console.error("Error Like post: ", error);
      // Handle other errors here as needed.
    }
  };

  const getComments = async (postId) => {
    const commentsCollection = collection(fireStore, "comments");
    const q = query(commentsCollection, where("postId", "==", postId));
    try {
      const querySnapshot = await getDocs(q);

      const postComments = querySnapshot.docs.map((doc) => {
        return {
          id: doc.id,
          ...doc.data(),
        };
      });

      setComments((prevComments) => ({
        ...prevComments,
        [postId]: postComments,
      }));
    } catch (error) {
      console.error("Error getting comments: ", error);
    }
  };

  const addComment = async (postId, commentText) => {
    const commentsCollection = collection(fireStore, "comments");

    try {
      // Add a new comment document to the "comments" collection
      await addDoc(commentsCollection, {
        postId,
        text: commentText,
        userId, // You can retrieve the user ID in a similar way to how you retrieve it for liking posts
        timestamp: serverTimestamp(),
      });

      // After adding the comment, refresh the comments for the post
      await getComments(postId);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  // const handleComment = async (postId, commentText) => {
  //   const commentsCollection = collection(fireStore, postId);
  //   await addDoc(commentsCollection, {
  //     postId,
  //     text: commentText,
  //     timestamp: serverTimestamp(), // You may want to add a timestamp to each comment.
  //   });
  // };

  // const handleCommentClick = async (postId, commentText) => {
  //   // handleComment(commentText);
  //   try {
  //     await handleComment(postId, commentText);
  //     // Optionally, you can update the state to display the new comment immediately.
  //   } catch (error) {
  //     console.error("Error commenting on post: ", error);
  //   }
  // };

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

      // Fetch comments for each post
      for (const post of posts) {
        await getComments(post.id);
      }

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
                <p className="time_comment">
                  <SiGooglecalendar className="text-success me-2" />
                  {image.timestamp} &nbsp;
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

                  {isHidden && (
                    <div className="Comment_Box">
                      <input
                        className="Comment_Input"
                        type="text"
                        placeholder="Add a comment"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            addComment(image.id, e.target.value);
                            e.target.value = "";
                          }
                        }}
                      />

                      {comments[image.id].map((comment) => (
                        <div key={comment.id}>
                          <div>
                            <p className="Commnet_P">{comment.text}</p>
                          </div>
                          {/* Add other comment information as needed */}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="social_btn">
                  <Button
                    shape="circle"
                    style={{
                      color: image?.likedBy?.includes(userId) ? "red" : null,
                    }}
                    onClick={() => handleLikeClick(image.id)}
                  >
                    <AiFillHeart />
                  </Button>
                  <p>{image?.likedBy?.length || 0} Likes</p>

                  {comments[image.id] && (
                    <div className="Comment_btn">
                      <Button shape="circle" onClick={toggleVisibility}>
                        <FaComment />
                      </Button>
                      <p>{comments[image.id].length} Comments</p>
                    </div>
                  )}
                  <div className="Post_share_btn">
                    <Button shape="circle">
                      <FaShare />
                    </Button>
                    <p>378</p>
                  </div>
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
