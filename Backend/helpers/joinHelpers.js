// Backend/helpers/joinHelpers.js
/**
 * Replace many-to-many links for a record.
 *
 * @param {Pool} pool           mysql2/promise pool
 * @param {string} pivot        name of join table
 * @param {number} selfId       id of the “self” record (movie_id or actor_id)
 * @param {string} selfCol      column name in pivot for self (movie_id / actor_id)
 * @param {string} otherCol     column name in pivot for other side
 * @param {number[]} newIds     list of ids to link
 */
exports.replaceLinks = async (
  pool,
  pivot,
  selfId,
  selfCol,
  otherCol,
  newIds = []
) => {
  await pool.query(`DELETE FROM ${pivot} WHERE ${selfCol} = ?`, [selfId]);

  if (newIds.length) {
    const values = newIds.map((otherId) => [selfId, otherId]);
    await pool.query(
      `INSERT INTO ${pivot} (${selfCol}, ${otherCol}) VALUES ?`,
      [values]
    );
  }
};

