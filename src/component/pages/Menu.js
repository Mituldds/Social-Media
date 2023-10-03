import React from "react";
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

const Menu = () => {
  const navigate = useNavigate();
  return (
    <div className="card menu_card">
      <div className="card-body">
        <h5>Menu</h5>
        <ul className="card_list">
          <li>
            <span>
              <FaHome />
            </span>
            <span>Home</span>
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
            <span>Chat</span>
          </li>
          <li>
            <span>
              <IoIosNotifications />
            </span>
            <span>Notification</span>
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
  );
};

export default Menu;
