import React from "react";
import type { Post } from "./ThemesList";
import Link from "next/link";

type PostCardProps = {
  post: Post;
  themeId: number;
};

const PostCard: React.FC<PostCardProps> = ({ post, themeId }) => {
  const createdAt = new Date(post.createdAt);
  return (
    <div className="w-[95%] text-white p-4 border m-2 border-white">
      <p className="p-2">
        <Link href={`/forum/${themeId}/${post.id}`} className="text-2xl mx-6">
          {post.title}
        </Link>
      </p>
      <br />
      <span className="bg-amber-700 text-black p-1 rounded-md m-2">
        Створено {createdAt.toLocaleString()}
      </span>
    </div>
  );
};

export default PostCard;
