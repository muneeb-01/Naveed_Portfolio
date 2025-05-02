import React from "react";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa6";
import { FaTwitter } from "react-icons/fa";
import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="mt-20">
      <hr className="border-zinc-900 h-3" />
      <div className="mx-auto mt-10 lg:mt-8 xl:mt-12  max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex justify-center  font-Gilgan text-[1.7rem]">
          <h1 className="tracking-tight">Naveed Mughal</h1>
        </div>

        <p className="mx-auto font-Poppins font-light mt-6 max-w-md text-center leading-relaxed ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Incidunt
          consequuntur amet culpa cum itaque neque.
        </p>

        <ul className="mt-12 flex flex-wrap justify-center gap-6 md:gap-8 lg:gap-12">
          {[
            { name: "Home", route: "/" },
            { name: "Prcing", route: "/project" },
            { name: "Project", route: "/" },
            { name: "Our journey", route: "/" },
          ].map((item, idx) => {
            return (
              <li key={idx}>
                <Link
                  className="font-Poppins font-medium transition cursor-pointer"
                  href={item.route}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>

        <ul className="mt-12 flex justify-center gap-6 md:gap-8">
          {[<FaFacebook />, <FaInstagram />, <FaGithub />, <FaTwitter />].map(
            (item, idx) => {
              return (
                <li key={idx}>
                  <a
                    className=" font-Poppins text-[1.8rem] font-medium transition hover:border-b border-white"
                    href="#"
                  >
                    {item}
                  </a>
                </li>
              );
            }
          )}
        </ul>
      </div>
    </footer>
  );
}

export default Footer;

// import React, { useEffect, useState } from "react";

// const Footer = () => {
//   const [showMarquee, setShowMarquee] = useState(false);

//   useEffect(() => {
//     if (typeof window !== "undefined") {
//       setShowMarquee(window.innerWidth > 1024);
//     }
//   }, []);

//   return (
//     <footer className="w-full bg-[#2B2B2B] text-white min-h-[70vh] mt-[24vh] flex flex-col rounded-tl-[50px] rounded-tr-[50px] max-lg:pt-10">
//       {showMarquee && <Marquee />}
//       <Links />
//     </footer>
//   );
// };

// export default Footer;

// // -------------------- Links ------------------------

// const Links = () => {
//   const quickLinks = ["Portfolio", "Services", "About"];
//   const socials = ["Instagram", "Behance", "LinkedIn"];

//   return (
//     <div className="w-full flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 p-6 sm:p-8 xl:p-16 2xl:p-28">
//       {/* Section 1 */}
//       <div>
//         <h2 className="font-signature tracking-tight text-2xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl">
//           Naveed Mughal
//         </h2>
//         {["design", "beauty"].map((word, idx) => (
//           <p
//             key={idx}
//             className="mt-2 font-poppins font-medium tracking-tight text-[14px] md:text-sm xl:text-base 2xl:text-lg"
//           >
//             We bring the power of{" "}
//             <span className="font-Crisp text-[#FF8E82]">{word}</span>
//           </p>
//         ))}
//       </div>

//       {/* Section 2 */}
//       <div>
//         <p className="font-poppins text-[#FF8E82] text-sm md:text-base xl:text-lg 2xl:text-xl mt-8 lg:mt-4">
//           Drop me a line
//         </p>
//         <a
//           href="mailto:hello@naveedmughal.com"
//           className="block mt-4 font-poppins font-semibold tracking-tight text-white text-[18px] sm:text-sm md:text-base xl:text-lg 2xl:text-xl"
//         >
//           hello<span>@</span>naveedmughal.com
//         </a>
//       </div>

//       {/* Section 3 */}
//       <div>
//         <p className="font-poppins text-[#FF8E82] text-sm md:text-base xl:text-lg 2xl:text-xl mt-8 lg:mt-4">
//           Quick Links
//         </p>
//         <div className="mt-4 flex flex-col">
//           {quickLinks.map((link, index) => (
//             <a
//               key={index}
//               href="#"
//               className="mt-2 font-poppins tracking-tight text-[18px] sm:text-sm md:text-base xl:text-lg 2xl:text-xl"
//             >
//               {link}
//             </a>
//           ))}
//         </div>
//       </div>

//       {/* Section 4 */}
//       <div>
//         <p className="font-poppins text-[#FF8E82] text-sm md:text-base xl:text-lg 2xl:text-xl mt-8 lg:mt-4">
//           Social Media
//         </p>
//         <div className="mt-4 flex flex-col">
//           {socials.map((platform, index) => (
//             <a
//               key={index}
//               href="#"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="mt-2 font-poppins tracking-tight text-white text-[18px] sm:text-sm md:text-base xl:text-lg 2xl:text-xl"
//             >
//               {platform}
//             </a>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// // -------------------- Marquee ------------------------

// const Marquee = () => {
//   const marqueeText = "Let's work together";

//   return (
//     <div className="w-full border-b-4 border-white relative py-[3vh] md:py-[5vh] xl:py-[8vh]">
//       <div className="overflow-hidden tracking-tighter py-[2vh] flex items-center justify-start">
//         {[...Array(3)].map((_, index) => (
//           <h1
//             key={index}
//             className="font-Gilgan font-semibold whitespace-nowrap pl-[5vw] animate-marquee text-4xl sm:text-5xl lg:text-7xl xl:text-9xl"
//           >
//             <span className="inline-block mr-[4vw] bg-[#FF8E82] rounded-full xl:text-[4.2rem] 2xl:text-[6rem]"></span>
//             {marqueeText}{" "}
//             <span className="font-Crisp font-thin">{`together`}</span>
//           </h1>
//         ))}
//       </div>
//     </div>
//   );
// };
