import React, { Dispatch, SetStateAction, useState } from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "antd";

const TextEditor: React.FC<{
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}> = ({ value, setValue }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
      ["link", "image"],
      ["clean"],
    ],
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <div className="max-h-[400px] w-full mb-4 bg-gray-900 overflow-auto">
        <ReactQuill
          theme="snow"
          value={value}
          onChange={setValue}
          modules={modules}
        />
      </div>
    </div>
  );
};

export default TextEditor;
