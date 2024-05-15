import React from "react";
import Link from "next/link";

const UserUnauth: React.FC = () => {
  return (
    <div className="h-[80%] w-screen flex flex-col items-center justify-center text-white text-2xl">
      <b>
        Для створення постів необхідно
        <Link href="/signin" className="text-blue-500">
          {" "}
          ввійти на сайт.
        </Link>
      </b>
    </div>
  );
};

export default UserUnauth;
