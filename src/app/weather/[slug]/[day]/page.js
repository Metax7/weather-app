import { formatDate } from "@/utils/formatDate";
import Image from "next/image";

const API_KEY = process.env.WEATHER_API_KEY;

export async function getDayWeather(slug, days) {
  try {
    const res = fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${slug}&days=${days}&aqi=no&alerts=no`,
      { next: { revalidate: 0 } },
    ).then((response) => response.json());
    return res;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default async function page({
  params: { slug, day },
  searchParams: { days },
}) {
  const weather = await getDayWeather(slug, days);

  const currentDay = weather.forecast.forecastday.find((d) => d.date === day);

  return (
    <div className="mx-auto max-w-screen-xl space-y-10 px-4 py-10 md:px-8 xl:px-0">
      <div className="space-y-5 text-center">
        <h1 className="text-3xl font-bold uppercase sm:text-4xl md:text-5xl">
          Weather by the hour
        </h1>
        <p className="sm:text-2xl">{formatDate(day)}</p>
      </div>
      <ul className="grid grid-cols-1 place-content-center gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {currentDay.hour.map((hour, index) => (
          <li key={index} className="rounded-xl border p-3 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1">
                <div>
                  <Image
                    src={`https:${hour.condition.icon}`}
                    width={64}
                    height={64}
                    className="w-10"
                    alt="icon"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">
                    {hour.condition.text}
                  </h3>
                  <p>{hour.temp_c}°</p>
                </div>
              </div>
              <div className="pr-2">{hour.time.split(" ")[1]}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
