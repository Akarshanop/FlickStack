// Backend/controllers/actorController.js
const pool = require("../db");
const { replaceLinks } = require("../helpers/joinHelpers");

/* ─── GET /actors ───────────────────────────────────────────── */
exports.getAllActors = async (_req, res) => {
  const [rows] = await pool.query(`
    SELECT
      a.id,
      a.name,
      a.image_url,
      GROUP_CONCAT(m.title ORDER BY m.title) AS movies
    FROM actors a
    LEFT JOIN movie_actor ma ON a.id = ma.actor_id
    LEFT JOIN movies       m ON ma.movie_id = m.id
    GROUP BY a.id
  `);
  res.json(rows);
};

/* ─── POST /actors ──────────────────────────────────────────── */
exports.createActor = async (req, res) => {
  const { name, image_url, movieIds = [] } = req.body;

  const [result] = await pool.query(
    "INSERT INTO actors (name, image_url) VALUES (?, ?)",
    [name, image_url]
  );

  await replaceLinks(
    pool,
    "movie_actor",
    result.insertId,
    "actor_id",
    "movie_id",
    movieIds
  );

  res.status(201).json({ actorId: result.insertId });
};

/* ─── PUT /actors/:id ───────────────────────────────────────── */
exports.updateActor = async (req, res) => {
  const { id } = req.params;
  const { name, image_url, movieIds = [] } = req.body;

  await pool.query(
    "UPDATE actors SET name = ?, image_url = ? WHERE id = ?",
    [name, image_url, id]
  );

  await replaceLinks(pool, "movie_actor", id, "actor_id", "movie_id", movieIds);

  res.json({ message: "Actor updated" });
};

/* ─── DELETE /actors/:id ────────────────────────────────────── */
exports.deleteActor = async (req, res) => {
  const { id } = req.params;
  await pool.query("DELETE FROM movie_actor WHERE actor_id = ?", [id]);
  await pool.query("DELETE FROM actors WHERE id = ?", [id]);
  res.json({ message: "Actor deleted" });
};
