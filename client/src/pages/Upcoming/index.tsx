import {ContentWindow, MissionTable, Thead} from "./styles";
import React, {Key, useCallback, useEffect, useMemo, useState} from "react";
import useLaunches from "../../hooks/useLaunches";

interface Launch {
  launchDate: string;
  mission: string;
  rocket: string;
  target: string;
  id: number
}

const Upcoming = () => {
  const { deleteLaunch } = useLaunches();
  const [launches, setLaunches] = useState(JSON.parse(localStorage.getItem('Launches') || '{}'));

  useEffect(() => {
    setLaunches(JSON.parse(localStorage.getItem('Launches') || "{}"))
  }, []);

  // React.useEffect(() => {
  //   localStorage.setItem('Launches', JSON.stringify(launches));
  // }, [launches]);

  const handleDelete = useCallback((launch: Launch, flightNumber: number) => {
    deleteLaunch(launch, flightNumber)
  }, [deleteLaunch])

  const tableBody = useMemo(() => {
    return launches?.filter((launch: Launch) => launch).map((launch: Launch, index: Key) => {
      return (
        <tr key={index}>
          <td>
            <button onClick={() => {handleDelete(launch, launch.id)}}>X</button>
          </td>
          <td>{launch.id}</td>
          <td>{launch.launchDate}</td>
          <td>{launch.mission}</td>
          <td>{launch.rocket}</td>
          <td>{launch.target}</td>
        </tr>
      )
    })
  }, [launches, handleDelete]);

  return (
    <ContentWindow>
      <span>
        Upcoming missions including both SpaceX launches and newly scheduled Zero to Mastery rockets.
      </span>
      <span>
         Warning! Clicking on the ✖ aborts the mission.
      </span>
        <MissionTable>
          <Thead>
            <tr>
              <th style={{width: "10%"}}>X</th>
              <th style={{width: "10%"}}>No.</th>
              <th style={{width: "20%"}}>Date</th>
              <th style={{width: "20%"}}>Mission</th>
              <th style={{width: "20%"}}>Rocket</th>
              <th>Destination</th>
            </tr>
          </Thead>
          <tbody>
          {launches && tableBody}
          </tbody>
        </MissionTable>
    </ContentWindow>
  )
}

export default Upcoming;