import Image from "next/image";
import Navbar from "./_components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="relative">
        <Image
          src="/blob.png"
          alt=""
          className="w-[60vw] absolute top-[100px] left-[50px] blur-md z-[-10]"
          width={0}
          height={0}
        />

        <div className="grain absolute inset-0 z-0 pointer-events-none w-full h-screen" />
      </div>
      <div className="h-screen flex items-center p-[300px] relative">
        <div className="flex flex-col justify-start items-start gap-[100px]">
          <p className="text-[96px] leading-24 pb-2 w-[40vw] bg-gradient-to-br from-[#46A6AF] to-[#fff] to-55% bg-clip-text text-transparent">Create Customizable link-in-bio Page for free</p>
          <button className="text-xl bg-gradient-to-r from-[#613DC1] to-[#3E208C] p-3 rounded-full px-10">Create One Now</button>
        </div>
        <div className="bg-red-500 h-[60vh] absolute w-[38vw] right-0 top-[200px]" />
      </div>
    </>
  );
}
