export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-3 px-[100px] border-b-[1px] bg-transparent backdrop-blur-3xl sticky top-0">
      <span className="text-xl">NuraStudy</span>
      <button className="bg-gradient-to-r from-[#B1CF5F] from-60% to-[#D1DEAE] text-black p-2 rounded-full px-5">
        Get Started
      </button>
    </div>
  )
}
