"use client";

import Link from "next/link";
import { useState } from "react";

export default function Weather() {
  const [city, setCity] = useState();
  const [days, setDays] = useState();
  const [data, setData] = useState([]);

  const searchCityValue = (e) => {
    const value = e.target.value;
    setCity(value);
  };

  const searchDaysValue = (e) => {
    const value = e.target.value;
    setDays(value);
  };

  const requestOptions = {
    method: "GET",
    redirect: "follow",
  };

  const fetchData = () => {
    fetch(
      `https://api.weatherapi.com/v1/search.json?key=14f84a5f9dc64a54b4745010241306&q=${city}`,
      requestOptions,
    )
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.error(error));
  };

  const handleOnKeyDownSearch = (e) => {
    if (e.keyCode === 13) {
      fetchData();
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl space-y-10 px-4 py-10 md:px-8 xl:px-0">
      <h1 className="text-center text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
        Search The City
      </h1>
      <div className="flex flex-col items-center space-y-5">
        <div className="flex flex-col space-y-3">
          <input
            type="text"
            placeholder="City"
            onChange={searchCityValue}
            onKeyDown={handleOnKeyDownSearch}
            className="rounded-xl border p-3 shadow-xl outline-none focus:outline-0 focus:ring-0"
          />
          <input
            type="number"
            onChange={searchDaysValue}
            onKeyDown={handleOnKeyDownSearch}
            className="rounded-xl border p-3 shadow-xl outline-none focus:outline-0 focus:ring-0"
            placeholder="Count of Days ( max: 10 )"
          />
        </div>
        <button
          onClick={fetchData}
          className="rounded-xl border bg-black px-5 py-2 text-white"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 place-content-center gap-10 md:grid-cols-3">
        {data
          ? data.map((item, index) => (
              <div
                key={index}
                className="space-y-3 rounded-xl border p-5 shadow-xl"
              >
                <ul>
                  <li>
                    <span className="font-bold">City:</span> {item.name}
                  </li>
                  <li>
                    <span className="font-bold">Region:</span> {item.region}
                  </li>
                  <li>
                    <span className="font-bold">Country:</span> {item.country}
                  </li>
                </ul>
                <Link
                  className="inline-block rounded-xl bg-black px-5 py-2 text-sm font-medium uppercase text-white"
                  href={`/weather/${item.url}?days=${days ? days : "3"}`}
                >
                  show weather for {days ? days : "3"} days
                </Link>
              </div>
            ))
          : "Loading..."}
      </div>
    </div>
  );
}
