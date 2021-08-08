import pool from '../utils/pool.js';

export default class Post {
  id;
  name;
  post;


  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.post = row.post;
  }

  static async insert({ name, post }) {
    const { rows } = await pool.query(`
      INSERT INTO posts (name, post)
      VALUES ($1, $2)
      RETURNING *;
      `, [name, post]);

    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM posts;
      `);

    return rows.map(row => new Post(row));
  }

  static async getById(id) {
    const { rows } = await pool.query(`
      SELECT * FROM posts WHERE id = $1;
      `, [id]);

    return new Post(rows[0]);
  }

  static async update({ post, id }) {
    await pool.query(`
    SET
      name = $1,
      post = $2
    WHERE id = $3
    RETURNING *;
    `, [post.name, post.post, id]);
  }

  static async delete(id) {
    await pool.query(`
    DELETE FROM posts 
    WHERE id = $1
    RETURNING *;
    `, [id]);
  }

}
