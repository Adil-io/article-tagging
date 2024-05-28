import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import "./App.css";

function App() {
  const [text, setText] = useState("");
  const [highlight, setHighlight] = useState("");

  useEffect(() => {
    if (text != "") {
      setHighlight(window.getSelection().toString());
    }
    console.log(highlight);
  });

  // TODO: check this
  const getHighlightedText = (text, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {" "}
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { fontWeight: "bold" }
                : {}
            }
          >
            {part}
          </span>
        ))}{" "}
      </span>
    );
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
            onMouseUp={() => getHighlightedText(text, highlight)}
          />
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
