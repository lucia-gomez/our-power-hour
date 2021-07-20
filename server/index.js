const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'PowerHour',
});

app.use(cors(), function (req, res, next) {
  const allowedOrigins = ["https://our-power-hour.netlify.app", 'http://localhost:3000'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api", (req, res) => {
  const sql = "SELECT * FROM power_hours ORDER BY RAND() LIMIT 5;"
  db.query(sql, (err, result) => {
    res.send(result);
  });
});


app.post("/api", (req, res) => {
  const playlist_id = req.body.playlist_id;
  const playlist_name = req.body.playlist_name;
  const sound = req.body.sound;
  const name = req.body.name;
  const theme = req.body.theme;

  const sql = "INSERT INTO power_hours (playlist_id, playlist_name, sound, name, theme) VALUES (?, ?, ?, ?, ?);";
  db.query(sql, [playlist_id, playlist_name, sound, name, theme], (err, result) => {
    if (err) console.error(err);
    res.send(result);
  });
});

app.delete("/api/:id", (req, res) => {
  const id = req.params.id;
  const sql = "DELETE FROM power_hours WHERE id = ?;"
  db.query(sql, id, (err, result) => {
    res.send(result);
  });
});

const PORT = 3001;

app.listen(process.env.PORT || PORT, () => {
  console.log("server is running");
});