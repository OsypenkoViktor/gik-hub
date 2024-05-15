import { Playfair } from "next/font/google";

const playfair = Playfair({ subsets: ["latin"], weight: "400" });

const MyLink = ({
  href,
  title,
  size,
}: {
  href: string;
  title: string;
  size: "small" | "default";
}) => {
  return (
    <a href={href} className={playfair.className}>
      <p
        className={`text-2xl bg-slate-900 rounded-xl ${
          size === "small" ? "p-1" : "p-3"
        } hover:translate-x-5 hover:text-blue-300 transition-all ease-out duration-100 `}
      >
        {title}
      </p>
    </a>
  );
};

export default MyLink;
