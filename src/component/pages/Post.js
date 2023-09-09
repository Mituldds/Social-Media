import React, { useState } from "react";

// import ImgCrop from "antd-img-crop";
import { Button, Modal, Mentions, Upload, Avatar, Input } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import "./Post.css";
import { fireStore } from "../../FirebaseConfig";
import { v4 } from "uuid";
import { uploadBytes } from "firebase/storage";
const Popup = ({ show, handleClose }) => {
  const [postData, setpostData] = useState({});

  const uploadImage = ({ fileList: newFileList }) => {
    setpostData((prev) => ({
      ...prev,
      postImage: newFileList.slice(-1)[0].originFileObj,
    }));
  };
  const handlePost = () => {
    ref(imageDb, `files/${v4()}`);
    uploadBytes(imgrefm, postData);
    console.log(postData, "=============");
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
              <b>Description :</b>
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
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Popup;
