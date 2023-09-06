import React from "react";
import { Divider } from "antd";
import "./AboutUs.css";
import { MdOutlinePublic } from "react-icons/md";
import { MdOutlineVisibility } from "react-icons/md";
import { VscSymbolEnumMember } from "react-icons/vsc";
import { MdCreateNewFolder } from "react-icons/md";
import { AiFillTags } from "react-icons/ai";

const AboutUs = () => {
  return (
    <>
      <div className="About_card card my-4">
        <div className="card-body">
          <div className="about_us_container">
            <h5 className="text-success fw-bold mt-2 mx-2">About Us</h5>
            <div>
              <p className="mx-2">
                Growing Businesses is hard. this group is help you along the
                journey.
              </p>
              <ul className="Aboutus_list">
                <li>
                  <div>
                    <span className="text-success">
                      <MdOutlinePublic />
                    </span>
                    <span>Public</span>
                  </div>
                  <span className="">???</span>
                </li>
                <Divider className="Aboutus_divider" />
                <li>
                  <div>
                    <span className="text-success">
                      <MdOutlineVisibility />
                    </span>
                    <span>Visible</span>
                  </div>
                  <span className="">???</span>
                </li>
                <Divider className="Aboutus_divider" />
                <li>
                  <div>
                    <span className="text-success">
                      <VscSymbolEnumMember />
                    </span>
                    <span>Member</span>
                  </div>
                  <span className="">25,515 Member</span>
                </li>
                <Divider className="Aboutus_divider" />
                <li>
                  <div>
                    <span className="text-success">
                      <MdCreateNewFolder />
                    </span>
                    <span>Created</span>
                  </div>
                </li>
                <Divider className="Aboutus_divider" />
                <li>
                  <div>
                    <span className="text-success">
                      <AiFillTags />
                    </span>
                    <span>Tags</span>
                  </div>
                </li>
                <Divider className="Aboutus_divider" />
                <li>
                  <div>
                    <span className="text-success">
                      <MdOutlinePublic />
                    </span>
                    <span>Moderated by </span>
                  </div>
                </li>
                <Divider className="Aboutus_divider" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default AboutUs;
