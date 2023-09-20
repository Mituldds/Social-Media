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

  const handleSignIn = async (event) => {
    event.preventDefault();
    const { email, password } = user;

    const usersRef = collection(fireStore, "users");
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);

    let foundUsers = [];
    querySnapshot.forEach((doc) => {
      const userData = doc.data();
      foundUsers.push({ ...doc.data(), id: doc.id });

      // console.log(foundUsers, "=====scdsdsds======");
    });

    if (foundUsers?.length) {
      if (foundUsers[0].password == password) {
        toast.success("login successful");

        localStorage.setItem("user", JSON.stringify(foundUsers[0]));

        navigate("/home");
      } else {
        toast.error("password not matched");
      }
    } else {
      toast.error("User not found & please enter your valid email ");
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const firebaseUser = result.user;
        setUser(firebaseUser);
        navigate("/home");
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

  const handleResetPwd = () => {
    navigate("/reset_password");
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
            <div className="container row mt-3">
              <p
                className="col forget_reset_password"
                onClick={handleForgetPwd}
              >
                Forget password
              </p>
              <p className="col forget_reset_password" onClick={handleResetPwd}>
                Reset password
              </p>
            </div>

            <Button block className="signin_btn" onClick={handleSignIn}>
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
