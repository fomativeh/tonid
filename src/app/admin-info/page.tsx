"use client";
import { Toaster, toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { fetchAdminInfo } from "@/api/fetchAdminInfo";
import { copyToClipboard } from "../helpers/copyToClipboard";

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

const DataCard = ({ title, value }: { title: string; value: string }) => {
  return (
    <section className="max-sm:w-[90vw] max-sm:m-[20px] w-[30vw] text-white max-w-[400px] rounded-[15px] m-[30px] min-w-[250px] h-fit p-[20px] flex flex-col justify-center items-center bg-[#222222]">
      <span className="text-[20px] text-center font-bold ">{title}</span>
      <p className="mt-[22px] block px-[15px] py-[7px] bg-theme-light-blue rounded-[10px] text-black font-bold">
        {value}
      </p>
    </section>
  );
};

const UsersRow = ({ userInfo }: { userInfo?: any }) => {
  let username;
  let name;
  if (
    userInfo.name == "undefined" ||
    userInfo.name == "@undefined" ||
    !userInfo.name
  ) {
    name = "Empty";
  } else {
    name = userInfo.name;
  }

  if (
    userInfo.username == "undefined" ||
    userInfo.username == "@undefined" ||
    !userInfo.username
  ) {
    username = "Empty";
  } else {
    username = userInfo.username;
  }

  return (
    <>
      <section className="list w-full flex justify-between items-center mb-[20px] font-bold border-b-2 border-[silver] pb-[20px]">
        <span className="w-[18%] break-words max-w-[18%]">{username}</span>
        <span className="w-[18%]  break-words max-w-[18%]">{name}</span>
        <span className="w-[18%]  break-words max-w-[18%]">
          {userInfo.balance + " TIT"}
        </span>
        <span className="w-[18%] break-words max-w-[18%]">
          {userInfo.referralsCount}
        </span>
        <section className="flex flex-col justify-center items-center w-[22%] rounded-[12px] bg-theme-light-blue py-[10px] break-words max-w-[22%]">
          <span className="mb-[20px] text-left max-w-[85%] font-normal overflow-ellipsis">
            {userInfo.walletAddress}
          </span>
          <button
            className="w-[85%] h-[40px] rounded-[20px] bg-[#000000] text-white"
            onClick={() => copyToClipboard(userInfo.walletAddress, toast)}
          >
            Copy
          </button>
        </section>
      </section>
    </>
  );
};
const Admin = () => {
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string>("");
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [query, setQuery] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let matchedUsers = data?.allUsers.filter((eachUser: any) => {
      const nameMatch = eachUser?.name.toLowerCase().includes(query);
      const usernameMatch = eachUser?.username.toLowerCase().includes(query);
      return nameMatch || usernameMatch;
    });

    setFilteredUsers(matchedUsers);
  }, [query]);

  //Fetches admin info
  const fetchAdminData = async () => {
    setIsLoading(true);
    try {
      const res = await fetchAdminInfo();
      setIsLoading(false);
      if (res?.success) {
        setData(res?.data);
      } else {
        setErr("Server is down. Contact developer.");
      }
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  //Loads admin info on page load
  useEffect(() => {
    fetchAdminData();
  }, []);

  return (
    <main className="w-full min-h-[100vh] bg-theme-light-blue flex flex-col justify-center items-center">
      <Toaster />
      <Navbar />

      {/* Show this before data loads */}
      {isLoading && (
        <section className="modal fixed flex justify-center top-[100px] items-center left-0 w-full bg-[#2b2c2f70]">
          <section className="flex items-center bg-black py-[20px] px-[35px] rounded-[10px]">
            <span className="mr-[20px] text-white text-[22px]">Loading</span>
            <Loader />
          </section>
        </section>
      )}

      {/* Show this for server errors */}
      {err?.length != 0 && (
        <span className="text-white bg-black p-[20px] rounded-[10px] max-w-[300px]">
          {err}
        </span>
      )}

      {/* Admin info section */}
      {data && (
        <section className="mt-[100px] w-full flex justify-center items-center flex-wrap p-[30px] max-sm:p-[15px]">
          <DataCard title={"Number of users"} value={data?.numberOfUsers} />
          <DataCard
            title={"Total amount earned by users"}
            value={`${data?.totalAmountEarnedByAllUsers} TIT`}
          />
        </section>
      )}

      {data?.allUsers && (
        <>
          {/* Users list header */}
          <section className="mt-[50px] w-full flex flex-col justify-start items-center p-[20px] bg-[#1e1e1e]">
            {/* Search field */}
            <section className="m-[20px] w-full px-[10px]">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                placeholder="Find user by name or username..."
                className="h-[40px] border-none outline-none w-[60vw] max-w-[530px] min-w-[280px] bg-[#2f2f2f] rounded-[20px] px-[15px] mb-[20px]"
              />
            </section>

            <header className="w-full flex justify-between items-center mb-[20px] ah">
              <span className="w-[18%] break-words max-w-[18%] font-bold uppercase text-left">
                username
              </span>
              <span className="w-[18%] break-words max-w-[18%] font-bold uppercase text-left">
                name
              </span>
              <span className="w-[18%] break-words max-w-[18%] font-bold uppercase text-left">
                amount earned
              </span>
              <span className="w-[18%] break-words max-w-[18%] font-bold uppercase text-left">
                number of referrals
              </span>
              <span className="w-[22%] break-words max-w-[22%] font-bold uppercase text-left">
                wallet address
              </span>
            </header>

            {/* Show this for no results found */}
            {query?.length > 0 && filteredUsers?.length == 0 && (
              <span className="m-[20px] font-bold text-white p-[20px] rounded-[16px] bg-theme-light-blue">
                User not found.
              </span>
            )}

            {/* Users list */}
            <section className="mt-[30px] w-full flex flex-col justify-start items-center">
              {/* Only show this when searching */}
              {query?.trim()?.length > 0 && (
                <>
                  {filteredUsers?.map((each: any, i: number) => {
                    return <UsersRow userInfo={each} key={i} />;
                  })}
                </>
              )}

              {/*Show this on default */}
              {query?.trim()?.length == 0 && (
                <>
                  {data?.allUsers?.map((each: any, i: number) => {
                    return <UsersRow userInfo={each} key={i} />;
                  })}
                </>
              )}
            </section>
          </section>
        </>
      )}
    </main>
  );
};

export default Admin;
