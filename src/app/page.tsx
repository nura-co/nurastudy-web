"use client";
import Image from "next/image";
import ScrollObserver, { ScrollContext } from "./_components/scrollObserver";
import { useContext, useEffect, useRef } from "react";
import Link from "next/link";

export default function Home() {
  return (
    <ScrollObserver>
      <CursorTrail />
      <div className="w-screen max-w-screen">
        <div className="absolute moving-grid -z-10 inset-0 h-full w-full bg-[#f4f4f4] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <FirstScreen />
        <About />
        <DownloadSection />
        <Footer />
      </div>
    </ScrollObserver>
  );
}

const FirstScreen = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  let progress = 0;

  const { current: elContainer } = refContainer;

  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  return (
    <div
      className="py-5 justify-between flex pointer-events-auto flex-col items-center h-screen w-full sticky top-0"
      ref={refContainer}
      style={{
        transform: `translateY(-${progress * 20}vh)`,
      }}
    >
      <Image
        src={"/logo.svg"}
        className="h-[50px] w-[50px] md:h-[70px] md:w-[70px]"
        height={70}
        width={70}
        alt="logo"
      />

      <p className="text-center leading-[40px] md:leading-[60px] text-3xl md:text-6xl">
        <Link href={"/start"} className="hover">
          NuraStudy
        </Link>
        <br />
        <span className="text-2xl md:text-[32px] tracking-widest">
          studies, done right.
        </span>
      </p>

      <div className="">
        <svg
          className="w-[50px] h-[50px]"
          fill="#000000"
          height="200px"
          width="200px"
          version="1.1"
          id="Layer_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 330 330"
          xmlSpace="preserve"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            {" "}
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            ></path>{" "}
          </g>
        </svg>
      </div>
    </div>
  );
};

const About = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  let progress = 0;
  const el = refContainer.current;

  if (el) {
    const screenHeight = window.innerHeight;
    const aboutHeight = el.clientHeight;

    // Calculate when About section enters viewport
    const aboutTop = el.offsetTop;
    const scrollIntoView = scrollY - aboutTop;

    // Only start the transform after the section is fully visible
    // Give it some breathing room to be fully readable first
    const startTransform = screenHeight; // Start transforming after one full screen scroll

    if (scrollIntoView > startTransform) {
      progress = Math.min((scrollIntoView - startTransform) / aboutHeight, 1);
    }
  }

  return (
    <section
      ref={refContainer}
      style={{
        transform: `translateY(-${progress * 20}vh)`,
      }}
      className="bg-[#1c1c1c] text-[#f4f4f4] flex flex-col p-8 md:p-20 text-xl md:text-4xl sticky top-0 z-50 min-h-screen"
    >
      <div className="container md:mx-auto md:px-11">
        <div className="leading-relaxed max-w-5xl mx-auto text-xl md:text-4xl tracking-tight">
          <strong>We help students build better study habits, faster.</strong>{" "}
          Our team designed NuraStudy to make studying feel simple, consistent,
          and rewarding.
          <br />
          <br />
          Our features:
          <div className="flex flex-col gap-5 mt-5">
            <p>
              - <strong>Study Planning Made Simple:</strong> Create personalized
              study schedules that adapt to your goals and availability.
            </p>
            <p>
              - <strong>Smart Reminders:</strong> Get gentle, well-timed nudges
              to help you stay consistent without feeling overwhelmed.
            </p>
            <p>
              - <strong>Progress Tracking:</strong> Visualize your improvement
              with streaks, stats, and insights that keep you motivated.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
const DownloadSection = () => {
  const refContainer = useRef<HTMLDivElement>(null);
  const { scrollY } = useContext(ScrollContext);

  let progress = 0;
  const { current: elContainer } = refContainer;
  if (elContainer) {
    progress = Math.min(1, scrollY / elContainer.clientHeight);
  }

  return (
    <section
      ref={refContainer}
      className="relative w-screen h-screen flex justify-center items-center overflow-hidden z-100"
    >
      <div className="absolute inset-0 flex">
        <div
          className="w-1/2 bg-[#f4f4f4] md:bg-[#1c1c1c]"
          style={{ transform: `translateY(${progress * 40}px)` }}
        />
        <div
          className="w-1/2 bg-[#f4f4f4] md:bg-[#f4f4f4]"
          style={{ transform: `translateY(${progress * 40}px)` }}
        />
      </div>

      {/* Content */}
      <div className="relative z-50 flex flex-col md:flex-row w-full max-w-6xl mx-auto shadow-2xl rounded-xl overflow-hidden">
        {/* Left: App Icon */}
        <div className="md:w-1/2 flex justify-center items-center p-10">
          <Image
            src="/nurastudy.png"
            alt="NuraStudy App Icon"
            width={180}
            height={180}
            className="rounded-lg"
          />
        </div>

        <div className="md:w-1/2 flex flex-col justify-center items-center md:items-start text-center md:text-left p-10">
          <h2 className="text-4xl md:text-6xl font-bold mb-5">
            Try NuraStudy Beta!
          </h2>
          <p className="text-xl md:text-2xl mb-5 leading-relaxed max-w-md ">
            Join our open beta on Google Play and start building better study
            habits. Your feedback will help NuraStudy become the best study
            companion.
          </p>
          <a
            href="https://play.google.com/apps/testing/com.nura.nurastudy"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-white text-black rounded-lg text-lg md:text-xl hover:bg-gray-200 transition"
          >
            Open Beta on Google Play
          </a>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <div className="bg-black text-white flex flex-col p-20 text-2xl md:text-4xl relative z-50">
      <div className="container mx-auto px-11">
        <div className="leading-relaxed max-w-5xl mx-auto text-2xl md:text-4xl tracking-tight text-center">
          <strong>Contact us</strong>
          <br />
          <br />
          <p className="text-xl">ormomenm@gmail.com</p>
        </div>
      </div>
    </div>
  );
};

function CursorTrail() {
  useEffect(() => {
    const dot = document.querySelector(".cursor-dot") as HTMLElement;
    const outline = document.querySelector(".cursor-outline") as HTMLElement;
    const hoverables = document.querySelectorAll(".hover");

    const moveCursor = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (dot) {
        dot.style.top = `${clientY}px`;
        dot.style.left = `${clientX}px`;
      }
      if (outline) {
        outline.animate(
          {
            left: `${clientX}px`,
            top: `${clientY}px`,
          },
          { duration: 500, fill: "forwards" },
        );
      }
    };

    const onMouseHover = () => {
      outline.style.height = "50px";
      outline.style.width = "50px";
    };

    const onMouseHoverOut = () => {
      outline.style.height = "30px";
      outline.style.width = "30px";
    };

    for (let i = 0; i < hoverables.length; i++) {
      hoverables[i].addEventListener("mouseenter", onMouseHover);
      hoverables[i].addEventListener("mouseleave", onMouseHoverOut);
    }

    document.addEventListener("mousemove", moveCursor);

    return () => {
      document.removeEventListener("mousemove", moveCursor);
    };
  });

  return (
    <>
      <div className="cursor-dot " />
      <div className="cursor-outline transition-all" />
    </>
  );
}
