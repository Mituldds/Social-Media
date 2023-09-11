import React, { useState } from "react";
import { fireStore, storage } from "../../FirebaseConfig";
import { getDownloadURL, ref } from "firebase/storage";

// import ImgCrop from "antd-img-crop";

import { Button, Modal, Upload, Avatar, Input } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import "./Post.css";
import { v4 } from "uuid";
import { uploadBytes } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";

const Post = ({ show, handleClose }) => {
  const [postData, setpostData] = useState({});

  const uploadImage = ({ fileList: newFileList }) => {
    setpostData((prev) => ({
      ...prev,
      postImage: newFileList.slice(-1)[0].originFileObj,
    }));
  };

  const handlePost = async () => {
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
      console.log(data.postImage);

      // Add the data to Firestore
      const docRef = await addDoc(collection(fireStore, "post"), data);

      // Display a success message
      alert("File successfully uploaded");

      // Clear any previous errors if present
      // setError(null);
    } catch (error) {
      // Handle any errors that may occur during the process
      // setError("An error occurred while uploading the file.");
      console.error("Error uploading file:", error);
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
              // onChange={handlePost}
            />
            <br />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Post;
