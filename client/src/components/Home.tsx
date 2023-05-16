import Search from './Search'
import Weather from './Weather'
import { useContext } from "react";
import { WeatherContext } from "../state_management/WeatherContext";

function Home() {
  const { isTheme } = useContext(WeatherContext);

  return (
    <section className={!isTheme? "flex flex-col bg-gray-700 ease-in-out" : 'flex flex-col bg-gray-100 ease-in-out'}>
    <Search />
    <Weather />
    </section>
  )
}

export default Home