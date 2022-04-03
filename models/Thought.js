const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const ReactionSchema = new Schema(
    {
     reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxLength: 280
      },
      username: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
    },
    {
      toJSON: {
        virtuals: true,
      },
    }
  );

  const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        trim: true,
        minLength: 1,
        maxLength: 280
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
      },
      username: {
          type: String,
          required: true,
          trim: true
        },
      // use ReplySchema to validate data for a reply
      reactions: [ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      // prevents virtuals from creating duplicate of _id as `id`
      id: false
    }
  );
  

// get total count of comments and replies on retrieval
ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.reduce((total, thought) => total + thought.reactions.length + 1, 0);
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;