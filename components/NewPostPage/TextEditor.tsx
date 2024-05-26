"use client";
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Button } from "antd";
import ImageUploader from "quill-image-uploader";

const TextEditor: React.FC<{
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
}> = ({ value, setValue }) => {
  const quillRef = useRef();
  const imageHandler = useCallback(() => {
    const input = document.createElement("input");
    const formData = new FormData();

    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.onchange = async () => {
      const file: any = input.files;
      if (file !== null) {
        formData.append("image", file[0]);
        console.log(formData);
        try {
          const response = await fetch("http://localhost:3000/api/image", {
            method: "POST",
            body: formData,
          });
          const data = await response.json();
          console.log("Server response:", data);
          const quill = quillRef.current?.getEditor();
          if (quill) {
            const range = quill.getSelection(true);
            quill.insertEmbed(range.index, "image", data.url);
          }
        } catch (error) {
          console.error("Error uploading image:", error);
        }
      }
    };
  }, []);
  const modules = {
    /*     toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["code-block"],
      ["link", "image"],
      ["clean"],
    ], */
    toolbar: {
      container: [
        [{ header: [1, 2, false] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["code-block"],
        ["link", "image"],
        ["clean"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
    clipboard: {
      matchVisual: false,
    },
  };

  return (
    <div>
      <div className="max-h-[400px] w-full mb-4 bg-gray-900 overflow-auto">
        <ReactQuill
          ref={quillRef}
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
