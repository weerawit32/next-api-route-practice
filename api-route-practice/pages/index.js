import { useRef, useState } from "react";

export default function Home() {
  const userNameRef = useRef();
  const occupationRef = useRef();
  const [accounts, setAccounts] = useState([]);

  const newId = () => {
    let id = 0;
    id++;
    return id;
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const username = userNameRef.current.value;
    const occupation = occupationRef.current.value;

    const reqBody = { username, occupation };
    fetch("api/account", {
      method: "POST",
      body: JSON.stringify(reqBody),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data));
  };

  const loadAcconts = () => {
    fetch("api/account", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => setAccounts(data.accounts));
  };

  return (
    <div>
      <form onSubmit={onSubmitHandler}>
        <label htmlFor="username">Your user name</label>
        <input placeholder="username" id="username" ref={userNameRef} />
        <label htmlFor="occupation">Your Occupation</label>
        <input placeholder="occupation" id="occupation" ref={occupationRef} />
        <button>submit</button>
      </form>
      <button onClick={loadAcconts}>Load Account</button>
      <br></br>
      <ul>
        {accounts.map((account) => (
          <li key={account.id}>{account.username}</li>
        ))}
      </ul>
    </div>
  );
}
