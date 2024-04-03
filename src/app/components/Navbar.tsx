import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
  return (
    <nav className="fixed flex justify-between items-center top-0 left-0 w-full max-sm:px-[20px] px-[40px] h-[100px] bg-[#000]">
    <figure className="w-[80px] h-[80px] relative">
      <Image src={"/assets/images/logo.png"} alt="TON ID Logo" fill />
    </figure>

    <Link href={"https://t.me/ton_idz"}>
      <span className="bg-theme-light-blue text-black hover:opacity-[.7] font-bold rounded-[5px] p-[15px]">
        Our Telegram
      </span>
    </Link>
  </nav>
  )
}

export default Navbar