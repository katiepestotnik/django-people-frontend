import { useParams, useNavigate } from "react-router";
import { useState } from "react";

export default function Show({ people, updatePeople, deletePeople }) {
  const { id } = useParams();
  console.log(id)
  const person = people.find((person) => parseInt(person.id) === parseInt(id))
  const navigate = useNavigate();

  const [editForm, setEditForm] = useState(person);

  const handleChange = (evt) => {
    setEditForm({
      ...editForm,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleFileChange = (evt) => {
    setEditForm({
      ...editForm,
      [evt.target.name]: evt.target.files[0],
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    updatePeople(editForm, id);
    navigate("/");
  };

  const removePerson = () => {
    deletePeople(id);
    navigate("/");
  };

  return (
    <div className="person">
      <h1>{person?.name}</h1>
      <h2>{person?.title}</h2>
      <img src={person?.image} alt={person?.name} />
      <button id="DELETE" onClick={removePerson}>
        Delete
      </button>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={editForm?.name}
          onChange={handleChange}
        />
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
        />
        <input
          type="text"
          name="title"
          placeholder="title"
          value={editForm?.title}
          onChange={handleChange}
        />
        <button type="submit">Update Person</button>
      </form>
    </div>
  );
}
