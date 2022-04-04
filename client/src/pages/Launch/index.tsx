import React, {FC, useEffect, useState} from "react";
import {ContentWindow} from "./styles";
import useLaunches from "../../hooks/useLaunches";

interface Launch {
  launchDate: string;
  mission: string;
  rocket: string;
  target: string;
  id: number;
}

const Launch: FC = () => {
  const { submitLaunch } = useLaunches();
  const today = new Date().toISOString().split("T")[0];
  const [date, setDate] = useState(today);
  const [flightNumber, setFlightNumber] = useState(0);
  const [missionValue, setMissionValue] = useState("");
  const [rocketName, setRocketName] = useState("");
  const [target, setTarget] = useState("Kepler 1");

  useEffect(() => {
    const flightNumberInLocalStorage = localStorage.getItem('flightNumber');
    if(!!flightNumberInLocalStorage) {
      setFlightNumber(JSON.parse(flightNumberInLocalStorage))
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('flightNumber', JSON.stringify(flightNumber));
  }, [flightNumber]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (missionValue && rocketName) {
      const launch: Launch = {
        launchDate: date,
        mission: missionValue,
        rocket: rocketName,
        target: target,
        id: flightNumber + 1
      }
      setFlightNumber(flightNumber + 1);
      submitLaunch(launch);
      setDate(today);
      setMissionValue("");
      setRocketName("");
      setTarget("Kepler 1");
    }
  }

  return (
    <ContentWindow>
      <span>
        Schedule a mission launch for interstellar travel to one of the Kepler Exoplanets.
      </span>

      <span>
         Only confirmed planets matching the following criteria are available for the earliest scheduled
        missions:
      </span>

      <ul>
        <li>Planetary radius &lt; 1.6 times Earth's radius</li>
        <li>Effective stellar flux &gt; 0.36 times Earth's value and &lt; 1.11 times Earth's value</li>
      </ul>

      <form
            style={{display: "inline-grid", gridTemplateColumns: "auto auto", gridGap: "10px 50px"}}
            onSubmit={handleSubmit}
      >
        <label>
          Launch Date:
        </label>
        <input type="date"
               name="launch-day"
               min={today}
               max="2040-12-31"
               value={date}
               onChange={(e) => setDate(e.target.value)}
        />

        <label>
          Mission Name:
        </label>
        <input type="text"
               name="mission-name"
               value={missionValue}
               onChange={(e) => setMissionValue(e.target.value)}
        />

        <label>
          Rocket Type:
        </label>
        <input type="text"
               name="rocket-name"
               value={rocketName}
               onChange={(e) => setRocketName(e.target.value)}
        />

        <label>
          Destination Exoplanet:
        </label>
        <select name="planets-selector"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
        >
          <option>
            Kepler 1
          </option>
          <option>
            Kepler 2
          </option>
        </select>

        <button type='submit'>
          Launch Mission ✔
        </button>
      </form>

    </ContentWindow>
  )
}

export default Launch;