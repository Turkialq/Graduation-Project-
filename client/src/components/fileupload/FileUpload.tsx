import { ChangeEvent, useContext, useEffect, useRef, useState } from "react";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ImageConfig } from "./ImageConfig";
import "/Users/turkialqahtani/Desktop/GP2/client/src/components/fileupload/drop-file-input.css";
import axios from "axios";
import { Button } from "@mui/material";
import AuthContext from "../../context/AuthContext";

export default function FileUpload(props: any) {
  const wrapperRef = useRef<any>(null);

  const { userRole }: any = useContext(AuthContext);

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

  // this function will upload the task file + information about it
  const handleUploadClick = async () => {
    const acessToken = JSON.parse(sessionStorage.getItem("authToken")!)[
      "acessToken"
    ];
    var url = "";

    switch (userRole) {
      case "student":
        url = "https://localhost:8080/tasks/upload-student-task";
        break;

      case "uniSupervisor":
        url = "https://localhost:8080/tasks/create-student-task";
        break;

      default:
        break;
    }
    const headers = {
      authorization: "Bearer" + " " + acessToken,
    };

    if (!fileList) {
      return;
    }

    const formData = new FormData();

    const task = JSON.stringify({
      task: props.task,
      description: props.description,
      studentLists: props.personName,
      deadline: props.value,
    });

    formData.append("file", fileList);
    formData.append("task", task);

    console.log(formData);

    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData,
    });

    if (response.status === 200) {
      console.log("good");
    } else {
      alert("something went wrong");
    }
  };

  const onFileDrop = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFile = e.target.files[0];
      setFileList(newFile);
      setButton(false);
      props.onFileChange(newFile);
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
      {!button ? (
        <div className="drop-file-preview">
          <p
            style={{ textAlign: "right", fontSize: 20 }}
            className="drop-file-preview__title"
          >
            {fileList.name} : الملفات الجاهزة لي الرفع
          </p>
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
        انشاء المهمة
      </Button>
    </>
  );
}
