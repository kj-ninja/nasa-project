import {useEffect, useState} from "react";

interface Launch {
  launchDate: string;
  mission: string;
  rocket: string;
  target: string;
  id: number
}

const useLaunches = () => {
  const [launches, setLaunches] = useState<Launch[]>([]);

  useEffect(() => {
     setLaunches(JSON.parse(localStorage.getItem('Launches') || "{}"))
  }, []);

  useEffect(() => {
    localStorage.setItem('Launches', JSON.stringify(launches));
  }, [launches]);

  const submitLaunch = (launch: Launch) => {
    setLaunches([...launches, launch])
  }

  // const deleteLaunch = ({id}: {id: number}) => {
  //   if (launches.length > 0) {
  //     return setLaunches(launches.filter(element => element.id !== id))
  //   }
  // }

  return { submitLaunch }
}

export default useLaunches;
