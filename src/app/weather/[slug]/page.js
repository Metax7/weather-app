import { formatDate } from "@/utils/formatDate";
import Image from "next/image";
import Link from "next/link";

const API_KEY = process.env.WEATHER_API_KEY;

export async function getWeather(slug, days) {
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

export default async function Page({ params: { slug }, searchParams }) {
  const { days } = searchParams;
  const weather = await getWeather(slug, days);

  const locationTime = weather.location.localtime.split(" ");
  const time = locationTime[1];

  return (
    <div className="mx-auto max-w-screen-xl space-y-10 px-4 py-10 md:px-8 xl:px-0">
      <div className="text-center">
        <h1 className="text-3xl font-bold uppercase tracking-widest sm:text-4xl md:text-5xl">
          {weather.location.name}
        </h1>
        <p className="sm:text-lg">Region: {weather.location.region}</p>
        <h2 className="max-sm:text-sm">Time: {time}</h2>
      </div>
      <div
        className={`grid grid-cols-1 place-content-center gap-10 md:grid-cols-3`}
      >
        {weather.forecast.forecastday.map((item, index) => (
          <Link href={`/weather/${slug}/${item.date}?days=${days}`}>
            <div
              key={index}
              className="space-y-5 rounded-xl border p-5 shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div>
                    <Image
                      src={`https:${item.day.condition.icon}`}
                      width={64}
                      height={64}
                      className="w-10"
                      alt="icon"
                    />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold">
                      {item.day.condition.text}
                    </h3>
                    <p>{item.day.maxtemp_c}°</p>
                  </div>
                </div>
                <div className="whitespace-nowrap text-sm">
                  {formatDate(item.date)}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
