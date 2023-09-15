import React, { useEffect, useState } from "react";
import { fireStore, storage } from "../../FirebaseConfig";
import { SiGooglecalendar } from "react-icons/si";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Tabs } from "antd";
import "./Social.css";
import { Button } from "antd";
import { collection, getDocs } from "firebase/firestore";

const Social = () => {
  const [imageData, setImageData] = useState([]);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState([]);

  const [user, setUser] = useState();

  const handleLikes = () => {
    setLikes(likes + 1);
  };
  const handleComments = (commentText) => {
    setComments([...comments, commentText]);
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

      {imageData.map((image, index) => (
        <div key={index}>
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
                  <Button shape="circle" onClick={handleLikes}>
                    <AiFillHeart />
                  </Button>
                  <p>{likes}</p>
                  {/* <p>45K</p> */}

                  <Button shape="circle" onClick={handleComments}>
                    <FaComment />
                  </Button>
                  <ul>
                    {comments.map((comment, index) => {
                      <li key={index}>{comment}</li>;
                    })}
                  </ul>
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
