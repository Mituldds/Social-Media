import React from "react";
import { FaUserGroup } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { FaPhone } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { TfiTwitter } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa";
import { Button, Divider, Form, Input } from "antd";
import "./Signup.css";

const Login = () => {
  return (
    <>
      <div className="login_body">
        <div className="container signup_form_card">
          <Form>
            <h3 className="form_heading mt-3">Signup</h3>
            <Input
              className="mt-3 signup_form_input_style"
              placeholder="Enter Name"
              suffix={<FaUserGroup style={{ color: "#7D7979" }} />}
            />
            <Input
              className="mt-4 signup_form_input_style"
              placeholder="Enter Mail"
              suffix={<TbMailFilled style={{ color: "#7D7979" }} />}
            />
            <Input
              className="mt-4 signup_form_input_style"
              placeholder="Phone Number"
              suffix={<FaPhone style={{ color: "#7D7979" }} />}
            />
            <Input
              className="mt-4 signup_form_input_style"
              placeholder="password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
            />
            <Input
              className="mt-4 signup_form_input_style"
              placeholder="confirm password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
            />

            <Button block className="signin_btn mt-4">
              Sign Up
            </Button>
            <p className="signin_options mt-2">Sign In </p>
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
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
