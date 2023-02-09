import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "../pages/Index";
import Show from "../pages/Show";


// This is the moment you have been waiting for, lets connect Django to React!
// const URL = "OurDjangoAPI"


export default function Main() {
  const [people, setPeople] = useState(null);


  // INDEX
  const getPeople = async () => {
    // fetch - GET
    setPeople();
  };

  // CREATE
  const createPeople = async (person) => {
    // fetch - POST
    getPeople();
  };

  // UPDATE
  const updatePeople = async (person, id) => {
    // fetch - PUT
    getPeople();
  };


  // DELETE
  const deletePeople = async (id) => {
    // fetch - DELETE
    getPeople();
  };

  useEffect(() => {
    getPeople();
  });

  return (
    <main>
      <Routes>
        <Route
          path="/"
          element={<Index people={people} createPeople={createPeople} />}
        />
        <Route
          path="/people/:id"
          element={
            <Show
              people={people}
              deletePeople={deletePeople}
              updatePeople={updatePeople}
            />
          }
        />
      </Routes>
    </main>
  );
}
