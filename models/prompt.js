import { Schema, model, models } from 'mongoose';

const PromptSchema = new Schema({
   // indicates creator is a reference to the "User" Collection in the db
   //   One to Many relatonship
   creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
   },
   prompt: {
      type: String,
      required: [true, 'Prompt is required'],
   },
   tag: {
      type: String,
      required: [true, 'Tag is required'],
   },
});

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
