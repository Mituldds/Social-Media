import React, { useState } from "react";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { fireStore, storage } from "../../FirebaseConfig";
import { addDoc, collection } from "firebase/firestore";
// import ImgCrop from "antd-img-crop";
import { Button, Modal, Upload, Avatar, Input } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import { v4 } from "uuid";
import "./Post.css";
import { toast } from "react-toastify";
import { SiPodcastaddict } from "react-icons/si";

const Post = ({ show, handleClose }) => {
  const [postData, setpostData] = useState({});

  const uploadImage = ({ fileList: newFileList }) => {
    setpostData((prev) => ({
      ...prev,
      postImage: newFileList.slice(-1)[0].originFileObj,
    }));
  };

  const handlePost = async () => {
    // Get the current date and time
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    try {
      let data = postData;
      // Generate a unique image reference
      const imgRef = ref(storage, `files/${v4()}`);

      // Upload the image to Firebase Storage
      const image = await uploadBytes(imgRef, postData.postImage);

      // Get the download URL for the uploaded image
      const imageUrl = await getDownloadURL(imgRef);

      // Add the imageURL to the postData object

      data.postImage = imageUrl;
      data.timestamp = formattedDate;
      const { id, email, name } = JSON.parse(localStorage.getItem("user"));
      data = { ...data, email, name, userId: id };

      // console.log(data.postImage);

      // Add the data to Firestore
      const docRef = await addDoc(collection(fireStore, "posts"), data);

      // Display a success message
      toast.success("File successfully uploaded");
      handleClose();

      // Clear any previous errors if present
      // setError(null);
    } catch (error) {
      // Handle any errors that may occur during the process
      // setError("An error occurred while uploading the file.");
      // console.error("Error uploading file:" error);
      console.error("Error Uploading File: ", error);
    }
  };

  return (
    <>
      <Modal
        open={show}
        title="Create Post"
        onCancel={handleClose}
        type="primary"
        danger
        footer={[
          <Button
            className="modal_btn"
            key="submit"
            // loading={loading}
            onClick={handlePost}
          >
            Post
          </Button>,
        ]}
      >
        <hr />
        <div className="post_title">
          <Avatar
            size={{
              // xs: 24,
              // sm: 32,
              // md: 40,
              lg: 64,
              // xl: 80,
              // xxl: 100,
            }}
            icon={<AntDesignOutlined />}
          />
          <h5>Alex Mercer</h5>
        </div>
        <div className="post_upload_img">
          <p>
            <b>Add to your post :</b>{" "}
          </p>

          <div className="post_upload">
            <Upload
              listType="picture-card"
              accept="image/*"
              onChange={uploadImage}
              beforeUpload={() => false}
              multiple={false}
            >
              Click
            </Upload>
          </div>
          <div className="post_description">
            <p>
              <b>Post Title :</b>
            </p>
            &nbsp;
            <Input
              className=""
              style={{ width: "70%" }}
              placeholder="What's on your mind?"
              onChange={(e) => {
                setpostData((prev) => ({ ...prev, caption: e.target.value }));
              }}
            />
            <br />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Post;
