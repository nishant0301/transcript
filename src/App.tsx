import React, { useState } from "react";
import { number } from "prop-types";

function App() {
  const [value, setValue] = useState<string>("");
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setValue("");
  };
  return (
    <div className="App">
      <h1>TODO List </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={value}
          onChange={e => setValue(e.target.value)}
          required
        />
        <button type="submit">Add TODO</button>
      </form>
    </div>
  );
}

export default App;
