import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Button, Divider, Form, Input } from "antd";
import { AiFillGoogleCircle } from "react-icons/ai";
import { TfiTwitter } from "react-icons/tfi";
import { FaFacebook, FaLock } from "react-icons/fa";
import { TbMailFilled } from "react-icons/tb";
import { collection, getDocs, query, where } from "firebase/firestore";
import { fireStore, auth, provider } from "../../FirebaseConfig";
import { signInWithPopup } from "firebase/auth";
import "./Login.css";

const Login = () => {
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

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const firebaseUser = result.user;
        setUser(firebaseUser);
        navigate("/");
        toast.success("Successfully signed in with Google");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlefacebookSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const firebaseUser = result.user;
        setUser(firebaseUser);
        navigate("/");
        toast.success(
          <span>
            Successfully signed in with Facebook <FaFacebook />
          </span>
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleForgetPwd = () => {
    navigate("/forgot_password");
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
            <p className="forget_password mt-2" onClick={handleForgetPwd}>
              Forget password
            </p>

            <Button block className="signin_btn mt-1" onClick={postData}>
              Sign In
            </Button>
            <Divider className="or_divider">Or</Divider>

            <Button
              className="facebook_login_btn"
              icon={<FaFacebook />}
              size={"large"}
              block
              onClick={handlefacebookSignIn}
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
              onClick={handleGoogleSignIn}
            >
              SIGN IN WITH GOOGLE
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Login;
