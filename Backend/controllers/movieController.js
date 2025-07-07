const pool = require("../db");
const { replaceLinks } = require("../helpers/joinHelpers");


exports.getAllMovies = async (_req, res) => {
  const [rows] = await pool.query(`
    SELECT
      m.id,
      m.title,
      m.description,
      m.image_url,
      GROUP_CONCAT(a.name ORDER BY a.name) AS actors
    FROM movies m
    LEFT JOIN movie_actor ma ON m.id = ma.movie_id
    LEFT JOIN actors      a ON ma.actor_id = a.id
    GROUP BY m.id
  `);
  res.json(rows);
};

exports.createMovie = async (req, res) => {
  const { title, description, image_url, actorIds = [] } = req.body;

  const [result] = await pool.query(
    "INSERT INTO movies (title, description, image_url) VALUES (?, ?, ?)",
    [title, description, image_url]
  );

  await replaceLinks(
    pool,
    "movie_actor",
    result.insertId,
    "movie_id",
    "actor_id",
    actorIds
  );

  res.status(201).json({ movieId: result.insertId });
};

exports.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, description, image_url, actorIds = [] } = req.body;

  await pool.query(
    "UPDATE movies SET title = ?, description = ?, image_url = ? WHERE id = ?",
    [title, description, image_url, id]
  );

  await replaceLinks(pool, "movie_actor", id, "movie_id", "actor_id", actorIds);

  res.json({ message: "Movie updated" });
};

exports.deleteMovie = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM movie_actor WHERE movie_id = ?", [id]);
  await pool.query("DELETE FROM movies WHERE id = ?", [id]);
  res.json({ message: "Movie deleted" });
};
