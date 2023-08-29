import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Divider, Form, Input } from "antd";
import { TbMailFilled } from "react-icons/tb";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore, auth, provider } from "../../FirebaseConfig";
import "./ForgotPassword.css";

const ForgotPassword = () => {
  const navigate = useNavigate();

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

    const usersRef = collection(fireStore, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    const foundUsers = [];
    querySnapshot.forEach((doc) => {
      foundUsers.push(doc.data());
    });

    console.log(foundUsers, "ffdfdf");

    if (foundUsers?.length) {
      if (foundUsers[0].password == password) {
        toast.success("login successful");
        navigate("/");
      } else {
        toast.error("password not matched");
      }
    } else {
      alert("User not found & please enter your valid email ");
    }
  };

  return (
    <>
      <div className="forget_body">
        <div className="container forget_form_card">
          <Form>
            <img
              className="forget_img mt-4"
              src="../Images/3275434.jpg"
              alt="Forget password"
            />

            <Input
              className="mt-3 form_input_style"
              placeholder="Enter Email"
              suffix={<TbMailFilled style={{ color: "#7D7979" }} />}
              name="email"
              value={user.email}
              onChange={getUserData}
            />
            <Button block className="signin_btn mt-4" onClick={postData}>
              Reset Password
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
