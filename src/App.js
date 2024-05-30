import { useState } from "react";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import {
  Avatar,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import Select from "react-select";
import { ExportToExcel } from "./components/ExportToExcel";
import "./App.css";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Developed by "}
      <Link color="inherit" href="https://github.com/Adil-io">
        Adil-io
      </Link>{" "}
    </Typography>
  );
}

export default function App() {
  const fileName = `Tagged Article ${new Date().toDateString()}`;

  const [text, setText] = useState("");
  const [highlight, setHighlight] = useState("");
  const [articleTag, setArticleTag] = useState([]);
  const [open, setOpen] = useState(false);

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
    setArticleTag((prevTags) => [...prevTags, tag]);
    setOpen(true);
    setHighlight("");
  };

  const handleClose = () => {
    setOpen(false);
    setHighlight("");
  };

  const resetState = () => {
    setText("");
    setHighlight("");
    setArticleTag([]);
  };

  return (
    <Grid container component="main" sx={{ height: "100vh" }}>
      <CssBaseline />
      <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{
              m: 1,
              bgcolor: "primary.main",
              marginTop: 4,
            }}
          >
            <EditNoteRoundedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Article Tagging
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 1, marginTop: 5, width: "100%" }}
          >
            <TextField
              className="box-item"
              id="outlined-multiline-static"
              label="Paste Article Here"
              multiline
              rows={16}
              value={text}
              fullWidth
              onChange={(e) => setText(e.target.value)}
              onMouseUp={() => setHighlight(window.getSelection().toString())}
            />
            {highlight && (
              <Select
                className="box-item"
                options={options}
                onChange={handleSelectChange}
                placeholder="Select Technique"
              />
            )}
            <Snackbar
              open={open}
              autoHideDuration={3000}
              onClose={handleClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            >
              <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
                sx={{ width: "100%" }}
              >
                Technique was tagged for the selected text!
              </Alert>
            </Snackbar>
            {articleTag.length > 0 && (
              <ExportToExcel
                apiData={articleTag}
                fileName={fileName}
                resetState={resetState}
              />
            )}
          </Box>
          <Copyright className="footer" sx={{ mt: 5 }} />
        </Box>
      </Grid>
      <Grid
        item
        xs={false}
        sm={4}
        md={6}
        sx={{
          backgroundImage: "url(https://source.unsplash.com/random?wallpapers)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light"
              ? t.palette.grey[50]
              : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Grid>
  );
}
