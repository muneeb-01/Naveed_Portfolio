import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdMenu } from "react-icons/io";
const navVariants = {
  initial: { y: "-100%", transition: { duration: 0.5, ease: "easeInOut" } },
  animate: { y: 0, transition: { duration: 0.5, ease: "easeInOut" } },
  exit: { y: "-100%", transition: { duration: 0.5, ease: "easeInOut" } },
};

const menuItems = [
  { to: "/", label: "HOME", index: "01" },
  { to: "/project", label: "PROJECTS", index: "02" },
  // { to: "/contact", label: "CONTACT", index: "03" },
];

const Navbar = ({ isMenu, setIsMenu }) => {
  const toggleMenu = (state) => {
    setIsMenu(state);
    document.body.style.overflow = state ? "hidden" : "auto";
  };

  return (
    <>
      {!isMenu ? (
        <button
          onClick={() => toggleMenu(true)}
          className="fixed top-4 right-4 z-[100] rounded-full bg-[var(--textdark)] bg-blend-difference p-4"
        >
          <IoMdMenu />
        </button>
      ) : (
        <NavMenu toggleMenu={toggleMenu} />
      )}
    </>
  );
};

const NavMenu = ({ toggleMenu }) => (
  <div className="fixed top-0 z-[100] flex h-screen w-full flex-col justify-between bg-[#0D0D0D] text-white">
    <button
      onClick={() => toggleMenu(false)}
      className="fixed top-4 right-4 z-[100] rounded-full bg-[var(--textdark)] bg-blend-difference p-3 text-xl text-black"
    >
      <IoCloseSharp />
    </button>

    <div className="flex h-[90vh] w-full items-center justify-center font-thin">
      <div className="w-full px-8 md:p-0 xl:w-[60vw] group">
        {menuItems.map(({ to, label, index }) => (
          <div key={to} className="w-full font-Gilgan overflow-hidden">
            <div className="group/nested flex cursor-pointer items-start justify-between text-3xl transition-all duration-900 ease-in-out group-hover:opacity-10 hover:opacity-100 sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl">
              <span className="text-lg">{index}</span>
              <Link
                to={to}
                onClick={() => toggleMenu(false)}
                className="font-semibold transition-transform duration-200 ease-in group-hover/nested:-translate-x-[10px] hover:text-white"
              >
                {label}
              </Link>
            </div>
            <hr className="my-4 w-full origin-left border-t border-white" />
          </div>
        ))}
      </div>
    </div>

    <div className="flex w-full items-center justify-between px-4 py-4">
      <div className="overflow-hidden">
        <p className="cursor-pointer text-[0.68rem] md:text-base">
          © 2025 Studio Olimpo
        </p>
      </div>
      <div className="overflow-hidden">
        <p className="cursor-pointer text-[0.68rem] md:text-base">INSTAGRAM</p>
      </div>
    </div>
  </div>
);

export default Navbar;
