import { Link } from "react-router-dom";
import { useState } from "react";

export default function Index({ people, createPeople }) {
  const [form, setForm] = useState({
    name: "",
    image: "",
    title: "",
  });

  const handleChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.value,
    });
  };
  const handleFileChange = (evt) => {
    setForm({
      ...form,
      [evt.target.name]: evt.target.files[0], // <- we need to reference the file
    });
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    createPeople(form);
    setForm({
      name: "",
      image: "",
      title: "",
    });
  };

  // loaded function
  const loaded = () =>
    people.map((person) => (
      <div key={person._id} className="person">
        <Link to={`/people/${person.id}`}>
          <h1>{person.name}</h1>
        </Link>
        <img src={person.image} alt={person.name} />
        <h3>{person.title}</h3>
      </div>
    ));

  const loading = () => <h1>Loading...</h1>;

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="name"
          value={form.name}
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
          value={form.title}
          onChange={handleChange}
        />
        <input type="submit" value="Submit"/>
      </form>
      {people ? loaded() : loading()}
    </section>
  );
}
