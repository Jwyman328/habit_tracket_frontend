import React, {useState, useEffect} from "react";

function useGetActivityTimedCardState(props) {
  const [totalTime, setTotalTime] = useState(null);
  const [startTimeFormated, setStartTimeFormated] = useState(null);

  const [displayStartTime, setDisplayStartTime] = useState(undefined);
  const [displayEndTime, setDisplayEndTime] = useState(undefined);

  useEffect(() => {
    let toDate = new Date(props.start_time);
    const displayDate = toDate.toTimeString();
    const [timeWanted, unwanted] = displayDate.split("G");
    setDisplayStartTime(timeWanted);

    //end time format
    if (props.end_time) {
      let toDateEnd = new Date(props.end_time);
      const displayDateEnd = toDateEnd.toTimeString();
      const [timeWantedEnd, unwantedEnd] = displayDateEnd.split("G");
      setDisplayEndTime(timeWantedEnd);
    }
  }, []);


  return {
    totalTime,
    setTotalTime,
    startTimeFormated,
    setStartTimeFormated,
    displayStartTime,
    setDisplayStartTime,
    displayEndTime,
    setDisplayEndTime,
  };

  
}

export default useGetActivityTimedCardState;
