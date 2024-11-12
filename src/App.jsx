import Canvas from "./Canvas";
import "./index.css";
import data from "./data";
import LocomotiveScroll from "locomotive-scroll";
import { useEffect, useState, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const App = () => {
  const [active, setActive] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll();
  }, [active]);

  useGSAP(() => {
    const handleClick = (e) => {
      console.log(e.clientY, e.clientX);
      setActive(!active);
      gsap.set(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
      });

      if (!active) {
        gsap.to(growingSpan.current, {
          scale: 1000,
          duration: 2,
          ease: "power2.inOut",
        });
      } else {
        gsap.to(growingSpan.current, {
          scale: 1,
          duration: 2,
          ease: "power2.inOut",
        });
      }
    };

    headingRef.current.addEventListener("click", handleClick);

    return () => {
      headingRef.current.removeEventListener("click", handleClick);
    };
  }, [active]);

  return (
    <>
      <span
        ref={growingSpan}
        className="growing block rounded-full fixed w-5 h-5 top-[-20px] left-[-20px] z-[0]"
      ></span>
      <div className="relative w-full min-h-screen text-white">
        {active &&
          data[0].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}

        <div className="w-full h-screen relative z-[1]">
          <div className="w-full relative z-[1] h-screen ">
            <nav className="w-full p-8 flex justify-between z-50">
              <div className="brand text-2xl font-md">thirtysixstudios</div>
              <div className="links flex gap-10">
                {["Home", "About", "Projects", "Contact"].map((link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase()}`}
                    className="text-md hover:text-gray-300"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </nav>

            <div className="w-full textcontainer px-[20%]">
              <div className="text w-[50%] ">
                <h3 className="text-3xl leading-[1.3]">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Optionss Lorem ipsum dolor sit amet consectetur adipisicin!
                </h3>
                <p className="text-md">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Fugiat quod ad corrupti esse facere, iste, amet nobis natus
                  ratione cupiditate placeat itaque facilis. Quam.
                </p>
                <p className="text-2xl text-red-500"> scroll </p>
              </div>
            </div>

            <div className="w-full absolute bottom-0 left overflow-hidden">
              <h1 ref={headingRef} className="text-[14rem] tracking-tight">
                Thirtysixstudios
              </h1>
            </div>
          </div>
        </div>
      </div>
      <section
        id="about"
        className="relative w-full h-screen text-white px-10 mt-5"
      >
        {active &&
          data[1].map((canvasdets, index) => (
            <Canvas key={index} details={canvasdets} />
          ))}

        <div className="relative z-[1]">
          <h1 className="text-6xl"> about us: </h1>
          <p className="text-4xl leading-[1.6]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Corrupti a
            doloremque nostrum, neque quod iste animi voluptas ab, quasi,
            accusantium labore rerum voluptate sequi nemo?
          </p>
        </div>
      </section>
    </>
  );
};

export default App;
