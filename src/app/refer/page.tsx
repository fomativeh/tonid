"use client";
import { fetchReferralData } from "@/api/fetchReferralData";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const Loader = () => {
  return (
    <div className="lds-roller">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
};

export default function Refer() {
  const [name, setName] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [notFound, setNotFound] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("")
  //   const [serverError, setServerError] = useState<boolean>(false);
  // Find the index of the "=" sign
  const index = url.indexOf("=");

  // Extract the substring starting from the character after the "=" sign
  const inviteId = url.substring(index + 1);

  const loadReferralData = async () => {
    try {
      const res = await fetchReferralData(inviteId as string);
      setIsLoading(false);

      if (res?.status == 200) {
        setIsLoading(false);
        setName(res.data.name);
        setUsername(res.data.username);
      }

      if (!res) {
        setNotFound(true);
      }

      // if (res?.status == 500) {
      //   setServerError(true);
      // }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(typeof window !=="undefined"){
        setUrl(window.location.href)
      }
    loadReferralData();
  }, []);

  return (
    <main className="w-full min-h-[100vh] bg-[#1c1c1e] flex justify-center items-center">
      <nav className="fixed flex justify-between items-center top-0 left-0 w-full max-sm:px-[20px] px-[40px] h-[100px] bg-[#000]">
        <figure className="w-[80px] h-[80px] relative">
          <Image src={"/assets/images/logo.png"} alt="TON ID Logo" fill />
        </figure>

        <Link href={"https://t.me/ton_identity"}>
          <span className="bg-theme-light-blue text-black hover:opacity-[.7] font-bold rounded-[5px] p-[15px]">
            Our Telegram
          </span>
        </Link>
      </nav>

      {isLoading && (
        <section className="modal fixed flex justify-center top-[100px] items-center left-0 w-full bg-[#2b2c2f70]">
          <section className="flex items-center bg-black py-[20px] px-[35px] rounded-[10px]">
            <span className="mr-[20px] text-white text-[22px]">Loading</span>
            <Loader />
          </section>
        </section>
      )}

      {/* Show this when data is fetched */}
      {name !== "" && username !== "" && (
        <section className="border-[2px] border-theme-light-blue bg-[#0000ff08] mt-[80px] w-[60vw] max-w-[500px] max-sm:w-[95%] min-w-[300px] flex flex-col justify-start items-center p-[20px] rounded-[12px] min-h-[50vh]">
          <h1 className="text-[25px] max-sm:text-[20px] mb-[30px] block w-full text-center">
            Welcome to TON IDENTITY TOKEN
          </h1>

          <section className="w-full rounded-[10px] bg-black p-[15px] flex flex-col justify-start items-start">
            <span className="bg-theme-light-blue p-[10px] rounded-[10px] font-bold">
              Referred By
            </span>
            <section className="flex flex-col justify-start items-start w-full mt-[20px]">
              <span>
                <b>Name:</b> {name}
              </span>
              <span>
                <b>Username:</b> @{username}
              </span>
            </section>
          </section>

          <section className="text-center w-full mt-[40px] flex flex-col justify-normal items-center">
            <p>Join our community to start gaining amazing rewards!</p>
            <Link href={"https://t.me/ton_id_bot"}>
              <button className="w-[50%] hover:opacity-[.85] min-w-[200px] max-w-[320px] bg-theme-light-blue border-none p-[10px] mt-[15px] font-bold rounded-[10px]">
                Join now
              </button>
            </Link>
          </section>
        </section>
      )}

      {/* Show this for invalid links */}
      {notFound && (
        <span className="text-white bg-black p-[20px] rounded-[10px] max-w-[300px]">
          This link is invalid. Please ask the owner to resend a correct link,
          then try again.
        </span>
      )}

      {/* Show this for server error
      {serverError && (
        <span className="text-black font-bold bg-theme-light-blue p-[20px] rounded-[10px] max-w-[300px]">
          A server error has occured. Please try again later.
        </span>
      )} */}
    </main>
  );
}
