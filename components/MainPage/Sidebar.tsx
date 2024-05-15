import MyLink from "../CommonComponents/MyLink";

const Sidebar = () => {
  return (
    <div className="hidden lg:flex justify-center w-[35%] h-full bg-black text-white p-3">
      <ul className="space-y-4">
        <li>
          <MyLink size="default" href="/" title="Публікації" />
        </li>
        <li>
          <MyLink size="default" href="/forum" title="Форум" />
        </li>
        <li>
          <MyLink size="default" href="/" title="Брейншторм" />
        </li>
        <li>
          <MyLink size="default" href="/" title="Допомогти з розробкою сайту" />
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
