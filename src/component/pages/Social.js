import React, { useEffect, useState } from "react";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../FirebaseConfig";
import { GiStumpRegrowth } from "react-icons/gi";
import { SiGooglecalendar } from "react-icons/si";
import { RiMessage2Fill } from "react-icons/ri";
import { AiFillHeart } from "react-icons/ai";
import { FaComment } from "react-icons/fa";
import { FaShare } from "react-icons/fa";
import { Tabs } from "antd";
import "./Social.css";

import { Button } from "antd";

const Social = () => {
  const [imgUrl, setImgUrl] = useState([]);

  useEffect(() => {
    listAll(ref(storage, `files`)).then((imgs) => {
      // console.log(imgs);
      imgs.items.forEach((val) => {
        getDownloadURL(val).then((url) => {
          setImgUrl((data) => [...data, url]);
        });
      });
    });
  }, []);

  // console.log(imgUrl, "imgurl");

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
      {imgUrl.map((dataVal) => (
        <div>
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
                  March 13, 2021 at 5:16 PM &nbsp;
                  {/* <RiMessage2Fill className="text-success me-2" />
                  89 Comments */}
                </p>
              </div>

              <div className="socialMedia_card card-body">
                <img
                  key={dataVal.id}
                  className="social_card card"
                  src={dataVal}
                  alt="..."
                />

                <div className="social_btn">
                  <Button shape="circle">
                    <AiFillHeart />
                  </Button>
                  <p>94.4K</p>
                  <Button shape="circle">
                    <FaComment />
                  </Button>
                  <p>1154</p>
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
