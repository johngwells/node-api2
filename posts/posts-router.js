const express = require("express");

const db = require("../data/db");

const router = express.Router();

// Creates a post using the info sent inside the request body
router.post("/", (req, res) => {
  console.log(req.body);
  db.insert(req.body)
    .then(post => {
      console.log(post);
      res.status(201).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "Error adding post" });
    });
});

// Creates a comment for the post with the specified id
// using info sent inside the request body
router.post("/:id/comments", (req, res) => {
  const id = req.params.id;
  const comment = { ...req.body, post_id: id };

  db.findById(id).then(post => {
    post.length
      ? db
          .insertComment(comment)
          .then(data => res.status(201).json(comment))
          .catch(err => {
            res.status(500).json({
              error: "Error saving comment to post"
            });
          })
      : res.status(400).json({
          message: "The post with the specified ID does not exist"
        });
  });
});

// returns an array of all post objects contained in the database
router.get("/", (req, res) => {
  db.find(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      res.status(500).json({ error: "error retrieving all posts" });
    });
});

// return post with specified ID
router.get("/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id).then(postId => {
    postId.length
      ? res.status(200).json(postId)
      : res
          .status(404)
          .json({
            error: "The post with specified ID does not exist"
          })
          .catch(error => {
            res
              .status(500)
              .json({ error: `Post with ${postId} does not exist` });
          });
  });
});

// returns an array of all comment objects with the post specified ID
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;

  db.findPostComments(id)
    .then(comments => {
      comments.length
        ? res.status(200).json(comments)
        : res.status(404).json({
            error: "Commnents with the specified post ID does not exist"
          });
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The comment information could not be retrieved" });
    });
});

// Removes the post with the specified ID and returns the ***deleted post object***
router.delete("/:id", (req, res) => {

});

// Updates the post with the specified ID using data from the 'request body'. 
// Return the modified document ***NOT the original***
router.put("/:id", (req, res) => {

});


module.exports = router;
