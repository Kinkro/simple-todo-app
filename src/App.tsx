import React from "react";
import "./App.css";
import { useState, useEffect } from "react";
import empty from "./media/akar-icons_empty.png";
import mark from "./media/akar-icons_marked.png";
import trash from "./media/akar-icons_trash-can.png";
import { IsActive, Task } from "./module";

function App() {
  const date = new Date();
  const dateArray = date.toString().split(" ");
  const getHours = date.getHours();
  const getMinutes = date.getMinutes();
  const [currTime, setCurrTime] = useState({
    hours: getHours,
    minutes: getMinutes,
  });
  const [buttonValue, setButtonValue] = useState("All");
  const [note, setNote] = useState<string>("");
  const [notesArray, setNotesArray] = useState<Task[]>([]);
  console.log(notesArray);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrTime({
        hours: getHours,
        minutes: getMinutes + 1,
      });
    }, 60000);

    return () => {
      clearInterval(interval);
    };
  });
  function handleClick(id: number) {
    setNotesArray((prevNotes) =>
      prevNotes.map((note) =>
        note.id !== id ? note : { ...note, isComplete: !note.isComplete }
      )
    );
  }

  function handleDelete(id: number) {
    setNotesArray((prevNotes) =>
      prevNotes.filter((note) => (note.id !== id ? note : null))
    );
  }

  let tasks = notesArray
    ?.filter((note) => {
      if (buttonValue === "All") {
        return note;
      } else if (buttonValue === "Active") {
        return !note.isComplete;
      } else if (buttonValue === "Complete") {
        return note.isComplete;
      }
    })
    .map((note) => {
      return (
        <div
          className="taskContainer"
          key={note.id}
          onClick={() => handleClick(note.id)}
        >
          <div className="taskText">
            <h2 className="task">{note.note}</h2>
            <span className="taskTime">{note.time}</span>
          </div>
          <div className="taskIcons">
            {note.isComplete ? (
              <img
                // id={note.id}
                src={mark}
                alt=""
              />
            ) : (
              <img
                // id={note.id}
                src={empty}
                alt=""
                // onClick={() => handleClick(note.id)}
              />
            )}
            <img src={trash} alt="" onClick={() => handleDelete(note.id)} />
          </div>
        </div>
      );
    });
  const handleActive = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log((e.target as HTMLInputElement).innerText);
    setButtonValue((e.target as HTMLInputElement).innerText);
  };
  const handleComplete = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // console.log((e.target as HTMLInputElement).innerText);
    setButtonValue((e.target as HTMLInputElement).innerText);
  };
  const handleAll = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    // console.log((e.target as HTMLInputElement).innerText);
    setButtonValue((e.target as HTMLInputElement).innerText);
  };

  return (
    <div className="wrapper">
      <h1 className="title">Todo</h1>
      <div className="App">
        <div className="header">
          <p className="date">
            {dateArray[0]} {dateArray[2]}
          </p>
          <p className="time">
            {currTime.hours}:
            {currTime.minutes < 10 ? "0" + currTime.minutes : currTime.minutes}
          </p>
        </div>
        <form className="formContainer">
          <input
            className="inputField"
            type="text"
            placeholder="Note"
            value={note}
            onChange={(e) => {
              setNote(e.target.value);
            }}
          />
          <button
            className="button"
            onClick={(e) => {
              e.preventDefault();
              note &&
                setNotesArray((prevNotes) => {
                  return prevNotes?.length > 0
                    ? [
                        ...prevNotes,
                        {
                          id: Math.random(),
                          note: note,
                          time: `Today at ${getHours}:${getMinutes}`,
                          isComplete: false,
                          isDeleted: false,
                        },
                      ]
                    : [
                        {
                          id: Math.random(),
                          note: note,
                          time: `Today at ${getHours}:${getMinutes}`,
                          isComplete: false,
                          isDeleted: false,
                        },
                      ];
                });
              setNote("");
            }}
          >
            +
          </button>
        </form>
        <div className="buttonsContainer">
          <button
            className={
              buttonValue === "All" ? "filterButtons active" : "filterButtons"
            }
            onClick={(e) => handleAll(e)}
          >
            All
          </button>
          <button
            className={
              buttonValue === "Complete"
                ? "filterButtons active"
                : "filterButtons"
            }
            onClick={(e) => handleComplete(e)}
          >
            Complete
          </button>
          <button
            className={
              buttonValue === "Active"
                ? "filterButtons active"
                : "filterButtons"
            }
            onClick={(e) => handleActive(e)}
          >
            Active
          </button>
        </div>
        {tasks}
      </div>
    </div>
  );
}

export default App;
