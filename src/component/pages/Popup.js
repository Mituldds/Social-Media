import React, { useState } from "react";
// import ImgCrop from "antd-img-crop";
import { Button, Modal, Mentions, Upload, Avatar } from "antd";
import { AntDesignOutlined } from "@ant-design/icons";
import "./Popup.css";

const Popup = ({ show, handleClose }) => {
  const [fileList, setFileList] = useState([]);

  const uploadImage = ({ fileList: newFileList }) => {
    setFileList(newFileList.slice(-1)[0].originFileObj);
    // console.log("====================================");
    // console.log(fileList);
    // console.log("====================================");
    const uid = firebase.auth().currentUser.uid;
    const fileRef = firebase.storage().ref().child(`/user/${uid}/profile`);
    const uploadTask = fileRef.put(newFileList.slice(-1)[0].originFileObj);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (progress == "100") alert("Uploaded");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
          console.log("File available at", downloadURL);
        });
      }
    );
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
            onClick={handleClose}
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
            <Mentions
              className=""
              autoSize
              style={{ width: "70%" }}
              placeholder="What's on your mind?"
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default Popup;
