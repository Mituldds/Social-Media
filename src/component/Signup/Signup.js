import React, { useState } from "react";
import { FaUserGroup } from "react-icons/fa6";
import { TbMailFilled } from "react-icons/tb";
import { FaPhone } from "react-icons/fa";
import { FaLock } from "react-icons/fa";
import { TfiTwitter } from "react-icons/tfi";
import { FaFacebook } from "react-icons/fa";
import { Button, Divider, Form, Input } from "antd";
import "./Signup.css";
import { fireStore } from "../../FirebaseConfig";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
    confirm_password: "",
  });

  const handleSignupUser = (event) => {
    let name, value;
    name = event.target.name;
    value = event.target.value;

    setUserData({ ...userData, [name]: value });

    console.log("====================================");
    console.log(userData);
    console.log("====================================");
  };

  const submitSignupData = async () => {
    if (
      userData.name == "" ||
      userData.email == "" ||
      userData.mobile_number == "" ||
      userData.password == "" ||
      userData.confirm_password == ""
    ) {
      toast.error("Please fullfill All fields");
    } else {
      try {
        const usersRef = collection(fireStore, "users");
        const q = query(usersRef, where("email", "==", userData.email));
        const querySnapshot = await getDocs(q);

        const foundUsers = [];
        querySnapshot.forEach((doc) => {
          foundUsers.push(doc.data());
        });

        if (foundUsers?.length) {
          return toast.error("User already exists");
          // console.log("user already exciste");
        }
        const docRef = await addDoc(collection(fireStore, "users"), userData);
        console.log("User added with ID: ", docRef.id);
        toast.success("Registration successfully");
        navigate("/login");
      } catch (error) {
        console.error("Error adding user: ", error);
      }
    }
  };

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
              name="name"
              value={userData.name}
              onChange={handleSignupUser}
              required
            />
            <Input
              className="mt-4 signup_form_input_style"
              placeholder="Enter Mail"
              suffix={<TbMailFilled style={{ color: "#7D7979" }} />}
              name="email"
              value={userData.email}
              onChange={handleSignupUser}
              required
            />
            <Input
              className="mt-4 signup_form_input_style"
              placeholder="Phone Number"
              suffix={<FaPhone style={{ color: "#7D7979" }} />}
              name="mobile_number"
              value={userData.mobile_number}
              onChange={handleSignupUser}
              required
            />

            <Input
              className="mt-4 signup_form_input_style"
              placeholder="password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
              name="password"
              value={userData.password}
              onChange={handleSignupUser}
              required
            />
            <Input
              className="mt-4 signup_form_input_style"
              placeholder="confirm password"
              suffix={<FaLock style={{ color: "#7D7979" }} />}
              name="confirm_password"
              value={userData.confirm_password}
              onChange={handleSignupUser}
            />

            <Button
              block
              className="signup_btn mt-4"
              type="submit"
              onClick={submitSignupData}
            >
              Sign Up
            </Button>
            <p className="signup_options mt-2">Sign In </p>
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

export default Signup;
