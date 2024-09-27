"use client";
import React, { useEffect, useState } from "react";

function page() {
  const [data, setData] = useState(null);
  const [resData, setResData] = useState(null);

  function updatedata(query) {
    console.log(query);
    let filterRes = data.filter((user) => {
      let lowerCaseQuery = query.toLowerCase();
      return (
        user.name.toLowerCase().includes(lowerCaseQuery) ||
        user.email.toLowerCase().includes(lowerCaseQuery) ||
        user.phone.toString().includes(lowerCaseQuery) ||
        user.id.toString().includes(lowerCaseQuery)
      );
    });
    setResData(filterRes);
  }
  useEffect(() => {}, [data]);

  const fetchData = async () => {
    try {
      const url = "https://jsonplaceholder.typicode.com/users";
      let users = await fetch(url);
      users = await users.json();
      console.log(users);
      if (users) {
        setData(users);
        setResData(users);
      }
    } catch (error) {
      console.log("error :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <div className="h-full w-full">
        <div className="text-grey-400 text-2xl font-semibold mt-3 text-center w-full">
          Search Table Records
        </div>
        <div className="px-4">
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => {
              updatedata(e.target.value);
            }}
            className="h-12 w-full my-3 text-black dark:text-white text-xl font-semibold px-4 rounded-lg outline-none bg-gray-300 dark:bg-gray-700 "
          />
        </div>

        <div className="px-4 h-12 flex mx-auto text-xl font-semibold bg-green-400">
          <div className="w-1/5 flex justify-center items-center">Name</div>
          <div className="w-2/5 flex justify-center items-center">Email</div>
          <div className="w-1/5 flex justify-center items-center">Phone</div>
          <div className="w-1/5 flex justify-center items-center">ID</div>
        </div>
        {!data ? (
          <div className="font-bold w-full text-center my-5 text-2xl text-red-400">
            Loading
          </div>
        ) : (
          <div id={12}>
            {resData.map((item, index) => {
              return (
                <div
                  className={
                    " px-4 h-12 flex mx-auto font-semibold " +
                    (index % 2 ? "bg-gray-200 dark:bg-gray-800" : "")
                  }
                  id={index}
                >
                  <div className="w-1/5 flex justify-center items-center">
                    {item.name}
                  </div>
                  <div className="w-2/5 flex justify-center items-center">
                    {item.email}
                  </div>
                  <div className="w-1/5 flex justify-center items-center">
                    {item.phone}
                  </div>
                  <div className="w-1/5 flex justify-center items-center">
                    {item.id}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default page;
