import { useState } from "react";
import FileUpload from "../components/fileupload/FileUpload";
import "../App.css";

export default function WeeklyTasks() {
  const [file, setFile] = useState<any>([]);
  return (
    <div className="all">
      <div className="box">
        <h2 className="header">تحميل الملفات</h2>
        <FileUpload onFileChange={(files: any) => console.log(files)} />
      </div>
    </div>
  );
}
