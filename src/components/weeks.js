import React, { useState, useRef, useEffect, useContext, useCallback, useMemo } from 'react';
import WeeksContext from './weekscontext';
import './weeks.css';
import delet from './delete.png';

const InputField = ({ field, index, handleChange, handleKeyPress, handleDelete, inputRefs, day }) => (
  <div className='inputstyle' key={field.id}>
    <input
      type="text"
      name="todo"
      value={field.value}
      onChange={(event) => handleChange(event, field.id, day)}
      onKeyDown={(event) => handleKeyPress(event, index, day)}
      ref={(element) => {
        if (!inputRefs.current[day]) {
          inputRefs.current[day] = [];
        }
        inputRefs.current[day][index] = element;
      }}
    />
    <div className='deletestyle'><img src={delet} alt='delete' onClick={() => handleDelete(index, day)} /></div>
  </div>
);

export default function Weeks() {
  
  const { weksrtst, currentMonthIndex, year, months } = useContext(WeeksContext);

  useEffect(() => {
    console.log("Received selected week from context:", weksrtst);
  }, [weksrtst]);

  const days = useMemo(() => ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], []);

  const generateWeekString = useCallback((week) => {
    if (Array.isArray(week)) {
      const dateInfo = week.map(day => {
        if (day instanceof Date) {
          return `${day.getDate()}_${day.getMonth()}_${day.getFullYear()}`;
        }
        return day;
      });
      return dateInfo.join('_');
    } else {
      return `Invalid week format`;
    }
  }, []);

  const initializeInputFields = useCallback((week) => {
    const weekString = generateWeekString(week);
    console.log("Initializing fields for week string:", weekString);
    const storedData = window.localStorage.getItem(weekString);
    if (storedData) {
      try {
        return JSON.parse(storedData);
      } catch (error) {
        console.error(`Error parsing stored data for ${weekString}:`, error);
      }
    }
    return Object.fromEntries(days.map(day => [day, Array.from({ length: 5 }, () => ({ id: `${Date.now()}-${Math.random()}`, value: "" }))]));
  }, [generateWeekString, days]);

  const [inputFields, setInputFields] = useState(() => initializeInputFields(weksrtst));

  useEffect(() => {
    if (weksrtst.length > 0) {
      setInputFields(initializeInputFields(weksrtst));
    }
  }, [weksrtst, initializeInputFields]);

  const inputRefs = useRef(days.reduce((acc, day) => ({ ...acc, [day]: [] }), {}));

  const storeDataInLocalStorage = useCallback((week, updatedFields) => {
    const weekString = generateWeekString(week);
    console.log("Storing data for week string:", weekString);
    window.localStorage.setItem(weekString, JSON.stringify(updatedFields));
  }, [generateWeekString]);

  useEffect(() => {
    if (weksrtst.length > 0) {
      storeDataInLocalStorage(weksrtst, inputFields);
    }
  }, [inputFields, storeDataInLocalStorage, weksrtst, generateWeekString]);

  const handleChange = useCallback((event, id, day) => {
    const updatedFields = inputFields[day]?.map((field) =>
      field.id === id ? { ...field, value: event.target.value } : field
    ) ?? [];
    setInputFields(prevState => ({ ...prevState, [day]: updatedFields }));
    storeDataInLocalStorage(weksrtst, { ...inputFields, [day]: updatedFields });
  }, [inputFields, storeDataInLocalStorage, weksrtst]);

  const handleKeyPress = useCallback((event, index, day) => {
    if (event.key === 'Enter' && inputFields[day]?.[index]?.value.trim() !== '') {
      event.preventDefault();
      if (index < inputFields[day].length - 1) {
        if (inputRefs.current[day][index + 1]) {
          inputRefs.current[day][index + 1].focus();
        }
      } else {
        const newField = { id: Date.now() + Math.random(), value: "" };
        const updatedFields = [...inputFields[day], newField];
        setInputFields(prevState => ({ ...prevState, [day]: updatedFields }));
        setTimeout(() => {
          inputRefs.current[day][index + 1].focus();
        }, 0);
      }
    }
  }, [inputFields]);

  const handleDelete = useCallback((index, day) => {
    const updatedFields = inputFields[day]?.filter((_, i) => i !== index) ?? [];
    setInputFields(prevState => ({ ...prevState, [day]: updatedFields }));
    storeDataInLocalStorage(weksrtst, { ...inputFields, [day]: updatedFields });
  }, [inputFields, storeDataInLocalStorage, weksrtst]);

  return (
    <div className='container3'>
      <div className='total'>
        {days.map((day, dayIndex) => (
          <div key={dayIndex} className='stylesday'>
            <div className='stylesweekname'>
              <div className='daystyle'>{day}</div>
              <div>
                {weksrtst[dayIndex] instanceof Date ? (
                  <div className='daysstyle'>
                    {weksrtst[dayIndex].getDate()} {months[weksrtst[dayIndex].getMonth()]} {weksrtst[dayIndex].getFullYear()}
                  </div>
                ) : (
                  <div className='daysstyle'>{weksrtst[dayIndex]} {months[currentMonthIndex]} {year}</div>
                )}
              </div>
            </div>
            <div className='styleinputfields'>
              {inputFields[day]?.map((field, index) => (
                <InputField
                  key={field.id}
                  field={field}
                  index={index}
                  handleChange={handleChange}
                  handleKeyPress={handleKeyPress}
                  handleDelete={handleDelete}
                  inputRefs={inputRefs}
                  day={day}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
