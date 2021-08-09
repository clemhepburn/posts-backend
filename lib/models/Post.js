import pool from '../utils/pool.js';

export default class Post {
  id;
  name;
  post;
  fruit;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.post = row.post;
    this.fruit = row.fruit;
  }

  static async insert({ name, post, fruit }) {
    const { rows } = await pool.query(`
      INSERT INTO posts (name, post, fruit) 
      VALUES ($1, $2, $3) 
      RETURNING *;
    `, [name, post, fruit]);

    return new Post(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(`
      SELECT * FROM posts;
    `);

    return rows.map(row => new Post(row));
  }

  static async getById(id) {
    console.log(id);
    const { rows } = await pool.query(`
      SELECT * FROM posts 
      WHERE id = $1
    `, [id]);
    console.log(rows);
    return new Post(rows[0]);
  }

  static async delete(id) {
    await pool.query(`
      DELETE FROM posts 
      WHERE id = $1 
      RETURNING *;
    `, [id]);
  }

  static async update(post, id) {
    const { rows } = await pool.query(`
      UPDATE posts 
      SET 
        name = $1, 
        post = $2,
        fruit = $3
      WHERE id = $4 
      RETURNING *;
      `, [post.name, post.post, post.fruit, id]);

    return new Post(rows[0]);
  }

}