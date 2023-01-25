import FileUpload from "../components/fileupload/FileUpload";
import "../App.css";

export default function TaskPreview() {
  return (
    <>
      <div className="all">
        <div className="box">
          <h2 className="header">تحميل الملفات</h2>
          <FileUpload onFileChange={(files: any) => console.log(files)} />
        </div>
      </div>
    </>
  );
}
