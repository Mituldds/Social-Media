import React, { useState } from "react";
import { Button, Divider, Form, Input } from "antd";
import { AiFillGoogleCircle } from "react-icons/ai";
import { TfiTwitter } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { FaLock } from "react-icons/fa";
import "./Login.css";
import { firestore } from "../../firebasefile";

// E:\Mitul\Learning\Project\social-media\src\firebasefile.js

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const getUserData = (event) => {
    let name, value;
    name = event.target.name;
    value = event.target.value;
    setUser({ ...user, [name]: value });
  };

  const postData = async (event) => {
    event.preventDefault();
    const { email, password } = user;
    const res = await fetch(
      "https://fir-form-6ffa9-default-rtdb.firebaseio.com/userDataRecords.json",
      {
        method: "POST",
        Headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );
    if (res) {
      alert("Data saved successfully");
    } else {
      alert("plz fill the data");
    }
  };

  return (
    <>
      <div className="login_body">
        <div className="container form_card">
          <Form>
            <h3 className="form_heading mt-3">LogIn</h3>
            <Input
              className="mt-3 form_input_style"
              placeholder="Enter Email"
              suffix={<TbMailFilled style={{ color: "#7D7979" }} />}
              name="email"
              value={user.email}
              onChange={getUserData}
            />
            <Input
              className="mt-4 form_input_style"
              placeholder="password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
              name="password"
              value={user.password}
              onChange={getUserData}
            />
            <p className="forget_password mt-2">Forget password</p>

            <Button block className="signin_btn mt-1" onClick={postData}>
              Sign In
            </Button>
            <Divider className="or_divider">Or</Divider>

            <Button
              className="facebook_login_btn"
              icon={<FaFacebook />}
              size={"large"}
              block
            >
              LOG IN WITH FACEBOOK
            </Button>

            <Button
              icon={<TfiTwitter />}
              className="twitter_login_btn  mt-4"
              size={"large"}
              block
            >
              LOG IN WITH TWITTER
            </Button>

            <Button
              className="google_login_btn  mt-4"
              icon={<AiFillGoogleCircle />}
              size={"large"}
              block
            >
              LOG IN WITH GOOGLE
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
