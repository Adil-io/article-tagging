import { useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Select from "react-select";

import "./App.css";

const articleTag = [];

function App() {
  const [text, setText] = useState("");
  const [highlight, setHighlight] = useState("");

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  const handleSelectChange = (option) => {
    const tag = {
      technique: option.value,
      text: highlight,
      taggedText: `<${option.value}>${highlight}</${option.value}>`,
    };
    articleTag.push(tag);

    console.log(articleTag);
  };

  return (
    <div className="App">
      <Card className="container">
        <CardContent className="content">
          <TextField
            id="outlined-multiline-static"
            label="Paste Text Here"
            multiline
            rows={5}
            value={text}
            fullWidth
            onChange={(e) => setText(e.target.value)}
            onMouseUp={() => setHighlight(window.getSelection().toString())}
          />
        </CardContent>
        {highlight && (
          <Select options={options} onChange={handleSelectChange} />
        )}
      </Card>
    </div>
  );
}

export default App;
