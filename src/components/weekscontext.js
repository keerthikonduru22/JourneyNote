import React, { createContext, useState } from 'react';

const WeeksContext = createContext();

const getCurrentWeek = () => {
  const today = new Date();
  const currentDayOfWeek = today.getDay(); // 0 (Sunday) to 6 (Saturday)
  const currentWeek = [];

  // start from the Sunday of the current week
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - currentDayOfWeek);

  for (let i = 0; i < 7; i++) {
    const date = new Date(startOfWeek);
    date.setDate(startOfWeek.getDate() + i);
    currentWeek.push(date);
  }
  return currentWeek;
};
//  const value = previousMonthLastSaturday + 1;
//     for (let i = value; i <= previousMonthLastDate; i++) {
//       previousMonthDays.push(i);
//     }

export const WeeksProvider = ({ children }) => {
  const today = new Date();
  const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());
  // const previousMonthDays = useMemo(() =>[],[])
  // const [prevdates, setprevdates] = useState([])
  // useEffect(() => {
  //   setprevdates(prevdates=>[...prevdates,...previousMonthDays])
  // },[prevdates,previousMonthDays])
  const currentWeek = getCurrentWeek();
  const [weksrtst, setweksrtst] = useState(currentWeek); // array of Date objects representing the selected week


  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <WeeksContext.Provider value={{ weksrtst, setweksrtst, currentMonthIndex, setCurrentMonthIndex, year, setYear, months }}>
      {children}
    </WeeksContext.Provider>
  );
};

export default WeeksContext;
