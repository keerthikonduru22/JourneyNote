import React, { useState, useEffect, useMemo, useContext, useRef } from 'react';
import calendar from './calendar.png';
import WeeksContext from './weekscontext';
import './calender.css';
import './weeks'

export default function Calendar() {
  const today = new Date();
  const [modalOpen, setModalOpen] = useState(false);
  // const [currentMonthIndex, setCurrentMonthIndex] = useState(today.getMonth());
  // const [year, setYear] = useState(today.getFullYear());
  const { currentMonthIndex, year, setCurrentMonthIndex, setYear, setweksrtst,months } = useContext(WeeksContext);
  const [lastSaturday, setLastSaturday] = useState(0);
  const lastDateOfMonth = new Date(year, currentMonthIndex + 1, 0).getDate();
  const lastDayOfWeek = new Date(year, currentMonthIndex + 1, 0).getDay();
  // const [weksrtst, setweksrtst] = useState([])
  // const { currentMonthIndex, year, setCurrentMonthIndex, setYear, setweksrtst } = useContext(WeeksContext);
  // const { setCurrentMonthIndex } = useContext(WeeksContext)
  // const {setYear} = useContext(WeeksContext)
  const todayDate = today.getDate();
  const todayMonth = today.getMonth();
  const todayYear = today.getFullYear();

  const buttonref = useRef(null)
  const calenderref = useRef(null)
 const handleClickOutside = (event) => {
    if (
      calenderref.current &&
      !calenderref.current.contains(event.target) &&
      !buttonref.current.contains(event.target)
    ) {
      setModalOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleImageClick = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    setLastSaturday(lastDateOfMonth - (lastDayOfWeek + 1) % 7);
  }, [year, currentMonthIndex, lastDateOfMonth, lastDayOfWeek]);
  
  const { previousMonthLastDate, previousMonthLastSaturday } = useMemo(() => {
    const currentMonthFirstDay = new Date(year, currentMonthIndex, 1);
    currentMonthFirstDay.setDate(0);
    const previousMonthLastDate = currentMonthFirstDay.getDate();
    const lastDayOfWeekPrevMonth = currentMonthFirstDay.getDay();
    const previousMonthLastSaturday = previousMonthLastDate - ((lastDayOfWeekPrevMonth + 1) % 7);
    return { previousMonthLastDate, previousMonthLastSaturday };
  }, [year, currentMonthIndex]);

  // const removeElements = () => {
  //   setModalOpen(false);
  // };
  
  const handleLeftClick = () => {
    setCurrentMonthIndex((currentMonthIndex - 1 + months.length) % months.length);
    if (currentMonthIndex === 0) {
      setYear(year - 1);
    }
  };

  const handleRightClick = () => {
    setCurrentMonthIndex((currentMonthIndex + 1) % months.length);
    if (currentMonthIndex === 11) {
      setYear(year + 1);
    }
  };

 

  const days = [];
  for (let i = 1; i <= lastSaturday; i++) {
    days.push({ day: i, isCurrentMonth: true });
  }

  const previousMonthDays = [];
  const value = previousMonthLastSaturday + 1;
  for (let i = value; i <= previousMonthLastDate; i++) {
    previousMonthDays.push({ day: i, isCurrentMonth: false });
  }
  const weeks = [];
  let week = [];
  previousMonthDays.forEach(dayObj => {
    week.push(dayObj);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  days.forEach(dayObj => {
    week.push(dayObj);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  });
  if (week.length > 0) {
    weeks.push(week);
  }
  const handleweekclick = (week) => {
    // Convert day objects to Date objects with correct month/year
    const selectedWeek = week.map(dayObj => {
      if (dayObj.isCurrentMonth) {
        return new Date(year, currentMonthIndex, dayObj.day);
      } else {
        // Previous month
        const prevMonthIndex = currentMonthIndex === 0 ? 11 : currentMonthIndex - 1;
        const prevYear = currentMonthIndex === 0 ? year - 1 : year;
        return new Date(prevYear, prevMonthIndex, dayObj.day);
      }
    });
    setweksrtst(selectedWeek);
  }
  
  return (
    <div className="container2">
      {/* { 
        weksrtst.map((week) => (
          <div>{week}</div>
        ))
    } */}
      <div className='totalcalender'>
     <div className='imgstyle' > <img
        src={calendar}
        alt="Calendar Icon"
        style={{ width: '40px', height: '40px', cursor: 'pointer' }}
        onClick={handleImageClick}
        ref = {buttonref}
      /></div>

      {modalOpen && (
          <div className="modal">
           
        
      
          <div className="modalContent" ref={calenderref}>
            <div className="calendar">
              <div onClick={handleLeftClick}>&lt;</div>
              <div className="month">{months[currentMonthIndex]} {year}</div>
              <div onClick={handleRightClick}>&gt;</div>
            </div>
            <div className="days">
              <div>Sun</div>
              <div>Mon</div>
              <div>Tue</div>
              <div>Wed</div>
              <div>Thu</div>
              <div>Fri</div>
              <div>Sat</div>
            </div>
            <div className='daysno'>
              {weeks.map((week, weekIndex) => (
                <div key={weekIndex} onClick={()=>handleweekclick(week)} className='week' >
                  {week.map((dayObj, dayIndex) => (
                    <div
                      key={dayIndex}
                      className={currentMonthIndex === todayMonth && year === todayYear && dayObj.day === todayDate ? 'highlighted' : ''}
                    >
                      {dayObj.day}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>    
    </div>
  );
}
