const router = require('express').Router();

const Posts = require('./db');

router.get('/', (req, res) => {

    const query = req.query;

    Posts.find(query)
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            res.status(500).json({
                message: 'error retrieving posts'
            });
        });
});


router.get('/', (req, res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        console.log('error', err);
        res.status(500).json({ error: 'failed to get posts from db'});
    });
});

router.get('/:id', (req, res) => {
    Posts.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({ message: 'post not found'});
            }
        })
        .catch(error => {
            res.status(500).json({ message: "error retreiving from db"});
        });
});

router.get('/:id/comments', (req, res) => {
    Posts.findPostComments(req.params.id)
    .then(post => {
         if(post){
              res.status(200).json(post)
         } else{
              res.status(404).json({ message: "The post with the specified ID does not exist." })
         }
    })
    .catch(error => {
         res.status(500).json({ error: "The comments information could not be retrieved." })
    })
})

router.post('/', (req, res) => {
    Posts.insert(req.body)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            res.status(500).json({ message: 'error adding to database'});
        });
});

router.post('/:id/comments', (req, res)=> {

    const id = req.params.id;
    const newComment = {...req.body, post_id:id};
  
    Posts.findById(id)
    .then(post => {
         if(post){
              Posts.insertComment(newComment)
              .then(comment => res.status(201).json(comment))
              .catch(error => res.status(400).json({ errorMessage: "Please provide text for the comment." }))
         }else{
              res.status(404).json({ message: "The post with the specified ID does not exist." })
         }
    })
    .catch(error => {
         res.status(500).json({ error: "There was an error while saving the comment to the database" })
    })
  })
  

router.delete('/:id', (req, res) => {
    Posts.remove(req.params.id)
        .then(count => {
            if (count > 0){
                res.status(200).json({ message: 'the post has been deleted ;0'})
            } else {
                res.status(404).json({ message: 'The post could not be found'})
            }
        })
        .catch(error => {
            res.status(500).json({
                message: 'error removing the post',
            });
        });
});
router.put('/:id', (req, res) => {
    const changes = req.body;
    Posts.update(req.params.id, changes)
      .then(post => {
        if (post) {
          res.status(200).json(post);
        } else {
          res.status(404).json({ message: 'The post could not be found' });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: 'Error updating the post',
        });
      });
  });

 

module.exports = router;