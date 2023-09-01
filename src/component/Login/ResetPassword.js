import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Form, Input } from "antd";
import { TbMailFilled } from "react-icons/tb";
import { FaLock } from "react-icons/fa";

import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore, getauth, provider } from "../../FirebaseConfig";
import "./ResetPassword.css";
import { auth } from "../../FirebaseConfig";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
    old_pwd: "",
    new_pwd: "",
    cnew_pwd: "",
  });

  const getUserData = (event) => {
    let name, value;
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (user.new_pwd !== user.cnew_pwd) {
      toast.error("Passwords don't match");
      return;
    }

    try {
      const user = auth.currentUser;
      const credentials = auth.EmailAuthProvider.credential(
        user.email,
        user.old_pwd
      );
      await user.reauthenticateWithCredential(credentials);
      await user.updatePassword(user.new_pwd);
      // Password changed successfully, you can redirect to the login page or any other page
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="reset_body">
        <div className="container reset_form_card">
          <h3 className="Reset_lable mt-3">Reset Password</h3>
          <Form>
            <p className="container mb-2 mt-4">Enter Your Email Address</p>
            <Input
              className=" form_input_style"
              placeholder="Enter Your Email Address"
              suffix={<TbMailFilled style={{ color: "#7D7979" }} />}
              name="email"
              value={user.email}
              onChange={getUserData}
            />
            <p className="container mb-2 mt-3">Enter Old Password</p>
            <Input
              className=" form_input_style"
              placeholder="Enter Old Password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
              name="old_pwd"
              value={user.old_pwd}
              onChange={getUserData}
            />
            <p className="container mb-2 mt-3">Enter New Password</p>
            <Input
              className="form_input_style"
              placeholder="Enter New Password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
              name="new_pwd"
              value={user.new_pwd}
              onChange={getUserData}
            />
            <p className="container mb-2 mt-3"> Re-enter Password</p>
            <Input
              className="form_input_style"
              placeholder="Re-Enter Password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
              name="cnew_pwd"
              value={user.cnew_pwd}
              onChange={getUserData}
            />
            <Button
              block
              className="reset_btn mt-4"
              onClick={handleChangePassword}
            >
              Reset Password
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
