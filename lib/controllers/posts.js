import { Router } from 'express';
import Post from '../models/Post.js';



export default Router()
  .post('/api/v1/posts/', (req, res, next) => {
    Post.insert(req.body)
      .then(post => res.send(post))
      .catch(next);
  })

  .get('/api/v1/posts/', (req, res, next) => {
    Post.getAll()
      .then(posts => res.send(posts))
      .catch(next);
  })

  .get('/api/v1/posts/:id', (req, res, next) => {
    console.log(req.params.id);
    Post.getById(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

  .patch('/api/v1/posts/:id', (req, res, next) => {
    Post.update(req.body, req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

  .delete('/api/v1/posts/:id', (req, res, next) => {
    Post.delete(req.params.id)
      .then(post => res.send(post))
      .catch(next);
  })

