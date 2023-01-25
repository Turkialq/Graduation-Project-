import { ChangeEvent, useEffect, useRef, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ImageConfig } from "./ImageConfig";
import "/Users/turkialqahtani/Desktop/GP2/client/src/components/fileupload/drop-file-input.css";
import axios from "axios";
import { Button } from "@mui/material";

export default function FileUpload(props: any) {
  const wrapperRef = useRef<any>(null);

  const [fileList, setFileList] = useState<any>([]);
  const [button, setButton] = useState(true);

  useEffect(() => {
    if (fileList.length === 0) {
      setButton(true);
    }
  }, [fileList.length]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const handleUploadClick = () => {
    const acessToken = JSON.parse(localStorage.getItem("authToken")!)[
      "acessToken"
    ];
    const url = "https://localhost:8080/file/upload-task-file";
    const headers = {
      "Content-Type": "multipart/form-data",
      authorization: "Bearer" + " " + acessToken,
    };

    if (!fileList) {
      return;
    }
    const formData = new FormData();
    formData.append("files", fileList);
    axios
      .post(url, formData, { headers })
      .then((res: any) => {
        alert("file submited");
      })
      .catch((error: any) => {
        alert(error);
        // console.log(error);
      });
  };

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      setButton(false);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file: any) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <CloudDownloadIcon sx={{ fontSize: 60, color: "#3C6255" }} />
        </div>
        <input type="file" value="" onChange={onFileDrop} />
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p
            style={{ textAlign: "right" }}
            className="drop-file-preview__title"
          >
            الملفات الجاهزة لي الرفع
          </p>
          {fileList.map((item: any, index: any) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      ) : null}
      <Button
        disabled={button}
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          backgroundColor: "#3C6255",
          "&:hover": {
            backgroundColor: "#86C8BC",
          },
        }}
        onClick={() => {
          handleUploadClick();
        }}
      >
        ارفع الملف
      </Button>
    </>
  );
}
