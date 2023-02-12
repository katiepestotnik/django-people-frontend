import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Index from "../pages/Index";
import Show from "../pages/Show";



const URL = 'http://localhost:8000/people/'


export default function Main() {
  const [people, setPeople] = useState([]);


  const URL = `http://localhost:8000/people/`
  const getPeople = async () => {
      const response = await fetch(URL)
      const data = await response.json()
      setPeople(data)
  }
  
  const createPeople = async(person) => {
    await fetch(URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
        body: JSON.stringify(person)
    })
    getPeople()
}

const updatePeople = async (person, id) => {
  await fetch(URL + id, {
      method: 'PUT',
      headers: {
          'Content-Type': "Application/json"
      },
      body: JSON.stringify(person)
  })
  getPeople()
}


const deletePeople = async (id) => {
  await fetch(URL + id, {
      method: 'DELETE'
  })
  getPeople()
}
  useEffect(() => {
    getPeople();
    console.log(people)
  }, []);

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
