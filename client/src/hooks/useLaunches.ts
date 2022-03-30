interface Launch {
  launchDate: string;
  mission: string;
  rocket: string;
  target: string;
}

const useLaunches = () => {
  const submitLaunch = (launch: Launch) => {
    console.log(launch)
  }

  return {submitLaunch}
}

export default useLaunches;