import {useCallback, useMemo, useState} from "react";
import {
  withStyles,
  Appear,
  Link,
  Paragraph,
  Table,
  Words,
} from "arwes";
import {styles} from "../styles";
import {getPlanetNameById} from "../helpers";

import Clickable from "../components/Clickable";

const Upcoming = props => {
  const {
    entered,
    launches,
    classes,
    abortLaunch,
    planets,
    updateLaunchDestination,
  } = props;
  const [isDestinationEdit, setIsDestinationEdit] = useState(false);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState('');

  const selectorBody = useMemo(() => {
    return (
    props.planets?.map(planet =>
    <option value={planet.id} key={planet.keplerName}>
      {planet.keplerName}
    </option>
    )
    );
  }, [props.planets]);

  const changeDestinationCell = useCallback((index) => {
    setSelectedIndex(index);
    setIsDestinationEdit(!isDestinationEdit);
  }, [isDestinationEdit]);

  const changeDestination = useCallback(async (launch) => {
    await updateLaunchDestination({launchId: launch.id, destinationId: selectedDestination});

    if (!selectedDestination) return;
    setIsDestinationEdit(!isDestinationEdit);
    setSelectedDestination(null);
  }, [selectedDestination, updateLaunchDestination, isDestinationEdit]);

  const tableBody = useMemo(() => {
    return launches?.filter((launch) => launch.upcoming)
    .map((launch, index) => {
      return (
      <tr key={String(launch.flightNumber)}>
        <td>
          <Clickable style={{color: "red"}}>
            <Link className={classes.abort} onClick={() => abortLaunch(launch.id)}>
              ✖
            </Link>
          </Clickable>
        </td>

        <td>{launch.flightNumber}</td>
        <td>{new Date(launch.launchDate).toDateString()}</td>
        <td>{launch.mission}</td>
        <td>{launch.rocket}</td>

        {(isDestinationEdit && index === selectedIndex) ?
        <td style={{cursor: 'pointer'}}>
          <select onChange={(e) => setSelectedDestination(e.target.value)}>
            <option value={null}>
              Unknown
            </option>
            {selectorBody}
          </select>

          <Link className={classes.success} onClick={() => changeDestination(launch)}>
            ✓
          </Link>
          <Link className={classes.abort} onClick={() => changeDestinationCell(index)}>
            ✖
          </Link>
        </td> :

        <td onClick={() => changeDestinationCell(index)}
            style={{cursor: 'pointer'}}
        >
          {getPlanetNameById(planets, launch.planetId) || 'Unknown'}
        </td>
        }
      </tr>
      );
    });
  }, [
    launches,
    abortLaunch,
    classes.abort,
    classes.success,
    planets,
    isDestinationEdit,
    selectedIndex,
    selectorBody,
    changeDestination,
    changeDestinationCell,
  ]);


  return (
  <Appear id="upcoming" animate show={entered}>
    <Paragraph>
      Upcoming missions including both SpaceX launches and newly scheduled rockets.
    </Paragraph>

    <Words animate>
      Clicking on the ✖ aborts the mission.
    </Words>
    <Words animate>
      You can also edit destination target by clicking 'Destination' cell.
    </Words>

    <Table animate show={entered}>
      <table style={{tableLayout: "fixed"}}>
        <thead>
        <tr>
          <th style={{width: "3rem"}}></th>
          <th style={{width: "3rem"}}>No.</th>
          <th style={{width: "10rem"}}>Date</th>
          <th style={{width: "11rem"}}>Mission</th>
          <th style={{width: "11rem"}}>Rocket</th>
          <th>Destination</th>
        </tr>
        </thead>

        <tbody>
        {tableBody}
        </tbody>

      </table>
    </Table>
  </Appear>
  );
}

export default withStyles(styles)(Upcoming);
