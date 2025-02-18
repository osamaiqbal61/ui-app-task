'use client';
import { useState } from "react";
import Image from "next/image";

const menuItems = [
  { name: "Community", icon: "/CommunityIcon.svg", path: "/" },
  {
    name: "Players",
    icon: "/PlayersIcon.svg",
    subMenu: [
      { name: "Registered Players", path: "/" },
      { name: "Roles", path: "/" },
      { name: "Blocked History", path: "/" },
      { name: "Manage Consent", path: "/" },
    ],
  },
  { name: "Transactions", icon: "/transactionsIcon.svg", subMenu: [] },
  { name: "GMWI", icon: "/transactionsIcon.svg", subMenu: [] },
  { name: "Banking", icon: "/Banking.svg", subMenu: [] },
  { name: "Misc", icon: "/Misc.svg", subMenu: [] },
  { name: "Tutorials", icon: "/Tutorials.svg", subMenu: [] },
  { name: "PAM", icon: "/PAM.svg", subMenu: [] },
];

const Sidebar = () => {
  const [openMenus, setOpenMenus] = useState<{ [key: string]: boolean }>({});
  const [selectedMenu, setSelectedMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  
  const toggleMenu = (name: string) => {
    setOpenMenus((prev) => ({ ...prev, [name]: !prev[name] }));
    setSelectedMenu(name);
  };

  //toggle the sidebar open and close
  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (

<div className="relative ">
    <aside
      className={`w-60 bg-secondary text-white min-h-screen p-4 flex flex-col transition-all duration-300 ${
        isSidebarOpen ? "translate-x-0" : "-translate-x-64"
      } relative`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute top-6 right-[-20px] rounded-full transition-transform"
      >
        <Image
          src="/closemenu.svg"
          alt="Toggle Sidebar"
          width={24}
          height={24}
          className={`transition-transform ${isSidebarOpen ? "rotate-0" : "rotate-180"}`}
        />
      </button>
      <div className="flex justify-center py-2">
        <Image src="/monkey.svg" alt="Logo" width={120} height={50} />
      </div>

      <div className="h-[1px] bg-[#262626]"></div>

      <nav className="flex-1 py-4">
        {menuItems.map((item) => (
          <div key={item.name}>
            <button
              className={`flex items-center justify-between w-full px-3 py-3 text-left rounded-lg hover:text-white ${
                selectedMenu === item.name ? "text-white" : "text-[#A3A3A3]"
              }`}
              onClick={() => toggleMenu(item.name)}
            >
              <div className="flex items-center gap-3">
                <Image src={item.icon} alt={item.name} width={20} height={20} />
                <span className="font-inter text-sm">{item.name}</span>
              </div>
              {item.name !== "Community" && (
                <Image
                  src="/expand.svg"
                  alt="Expand"
                  width={16}
                  height={16}
                  className={`transition-transform ${
                    openMenus[item.name] ? "rotate-180" : ""
                  }`}
                />
              )}
            </button>

            {(item.subMenu && item.subMenu.length > 0) && openMenus[item.name] && (
              <div className="ml-2 pl-3 space-y-1">
                {item.subMenu?.map((sub) => (
                  <a
                    key={sub.name}
                    href={sub.path}
                    className={`block font-sans text-sm py-2 px-4 rounded-lg ${
                      selectedMenu === sub.name ? "text-white bg-[#262626]" : "text-[#A3A3A3]"
                    } hover:text-white hover:bg-[#262626]`}
                    onClick={() => setSelectedMenu(sub.name)}
                  >
                    {sub.name}
                  </a>
                ))}
              </div>
            )}
          </div>
        ))}
      </nav>

      <div className="mt-auto mb-4 space-y-2">
        <button className="flex items-center gap-3 text-gray-400 hover:text-white w-full px-3 py-2 text-left">
          <Image src="/Settings.svg" alt="Settings" width={20} height={20} />
          <span className="font-inter text-sm">Settings</span>
        </button>

        <button className="flex items-center gap-3 text-red-500 hover:text-red-400 w-full px-3 py-2 text-left">
          <Image src="/logout.svg" alt="Logout" width={20} height={20} />
          <span className="font-inter text-sm">Logout Account</span>
        </button>
      </div>
    </aside>
    </div>
  );
};

export default Sidebar;
