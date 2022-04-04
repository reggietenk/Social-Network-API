const router = require('express').Router();
const {
  getAllThoughts,
  getThoughtById,  
  addThought,
  removeThought,
  updateThought,
  addReaction,
  removeReaction
} = require('../../controllers/thought-controller');

// get all thoughts 
router
    .route('/')
    .get(getAllThoughts)

// get thought by Id
router
    .route('/:id')
    .get(getThoughtById)

// /api/userId/<thoughtId>
router.route('/:userId').post(addThought);



// /api/thoughts/<userId>/<commentId>
router
    .route('/:userId/:thoughtId')
    .post(addReaction)
    .delete(removeThought)
    .put(updateThought)


// /api/thoughts/<userId>/<thoughtId>/<reactionId>
router.route('/:userId/:thoughtId/:reactionId').delete(removeReaction);

module.exports = router;