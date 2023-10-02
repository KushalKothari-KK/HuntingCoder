import { useState } from "react";
import styles from "../styles/Contact.module.css";
const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [descrp, setDescrp] = useState();
  const [password, setPassword] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, email, phone, descrp, password);
    const data = { name, email, phone, descrp };
    fetch("http://localhost:3000/api/postcontact/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.text())
      .then((data) => {
        alert("Information Submited");
        setName("");
        setEmail("");
        setPhone("");
        setDescrp("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const handleChange = (e) => {
    if (e.target.name == "name") {
      setName(e.target.value);
    } else if (e.target.name == "email") {
      setEmail(e.target.value);
    } else if (e.target.name == "phone") {
      setPhone(e.target.value);
    } else if (e.target.name == "password") {
      setPassword(e.target.value);
    } else if (e.target.name == "desc") {
      setDescrp(e.target.value);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit}>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputName" className={styles.formlabel}>
            Name
          </label>
          <input
            type="text"
            className={styles.input}
            id="exampleInputName"
            name="name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputEmail1" className={styles.formlabel}>
            Email address
          </label>
          <input
            type="email"
            className={styles.input}
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <div id="emailHelp" className={styles.formhelp}>
            We&apos;ll never share your email with anyone else.
          </div>
        </div>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputPhone" className={styles.formlabel}>
            Contact Number
          </label>
          <input
            type="number"
            className={styles.input}
            id="exampleInputPhone"
            name="phone"
            value={phone}
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="exampleInputPassword1" className={styles.formlabel}>
            Password
          </label>
          <input
            type="password"
            className={styles.input}
            id="exampleInputPassword1"
            value={password}
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <div className={styles.mb3}>
          <label htmlFor="desc" className={styles.formlabel}>
            Elobrate your Concerns
          </label>
          <textarea
            className={styles.input}
            id="desc"
            onChange={handleChange}
            name="desc"
            required
          >
            {descrp}
          </textarea>
        </div>
        <button type="submit" className={styles.btn}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default Contact;
