const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const key = require('../../config/keys');

function authenticationToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(" ")[1];
  
  if(token == null) return res.sendStatus(401);
  
  jwt.verify(token, key.secretOrKey, (err, user) => {
    if(err) return res.sendStatus(403);
    req.user = user;
    next();
  })
}

const Post = require('../../models/Post');

// @route       GET api/post
// @desc        Get all posts
// @access      Public
router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json({ nopostsfound: 'No post found' }));
});

// @route       GET api/post/:id
// @desc        Get post by id
// @access      Public
router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) => res.status(404).json({ nopostfound: 'No post found with  that ID' }));
});

// @route       POST api/post
// @desc        Create post
// @access      Private
router.post('/', authenticationToken, (req, res) => {
  if(!req.body.text) return res.json({error: "Text field is required"})
	const newPost = new Post({
		text: req.body.text,
		user: req.user.id
	});

	newPost.save().then((post) => res.json(post));
});


// @route       POST api/post/like/:id
// @desc        like post
// @access      Private
router.post('/like/:id',authenticationToken, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
        return res.status(400).json({ alreadyliked: 'User already liked this post' });
      }

      // Add user id to likes array
      post.likes.unshift({ user: req.user.id });

      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route       POST api/post/unlike/:id
// @desc        unlike post
// @access      Private
router.post('/unlike/:id',authenticationToken, (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      if (post.likes.filter((like) => like.user.toString() === req.user.id).length === 0) {
        return res.status(400).json({ notliked: 'You have not liked this post' });
      }

      //Get remove index
      const removeIndex = post.likes.map((item) => item.user.toString()).indexOf(req.user.id);

      //Splice out of array likes
      post.likes.splice(removeIndex, 1);

      //Save
      post.save().then((post) => res.json(post));
    })
    .catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

// @route       POST api/post/comment/:id
// @desc        Add comment to post
// @access      Private
router.post('/comment/:id',authenticationToken, (req, res) => {
	Post.findById(req.params.id)
		.then((post) => {
			const newComment = {
				text: req.body.text,
				user: req.user.id
			};

			//Add to comments array
			post.comments.unshift(newComment);

			//Save
			post.save().then((post) => res.json(post));
		})
		.catch((err) => res.status(404).json({ postnotfound: 'No post found' }));
});

module.exports = router;
