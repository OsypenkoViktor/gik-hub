import type { Post } from "./ThemesList";

const PostCard = ({ post }: { post: Post }) => {
  const createdAt = new Date(post.createdAt);
  const prewiev = post.text.slice(0, 30);
  return (
    <div className="w-[95%] text-white p-4 border m-2 border-white">
      <p className="p-2">
        <a href="#" className="text-2xl mx-6">
          {post.title}
        </a>
      </p>
      <br />
      <span className="bg-amber-700 text-black p-1 rounded-md m-2">
        Створено {createdAt.toLocaleString()}
      </span>
    </div>
  );
};

export default PostCard;
