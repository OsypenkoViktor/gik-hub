import React from "react";
import { Post } from "../ForumPage/ThemesList";
import { Typography } from "antd";
import parse from "html-react-parser";

const { Title, Text } = Typography;

type PostDisplayProps = {
  post: Post;
};

const PostDisplay = ({ post }: PostDisplayProps) => (
  <>
    <div className="text-white h-[60vh] border overflow-auto border-white m-6 p-6 flex flex-col ">
      <Title className="!text-white text-center">{post.title}</Title>
      <Text type="secondary" className="!text-white text-right">
        Створено {new Date(post.createdAt).toLocaleDateString()}
      </Text>
      <div className="p-6 post">{parse(post.text)}</div>
    </div>
  </>
);

export default PostDisplay;
