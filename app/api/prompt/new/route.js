import { connectToDB } from '@utils/database';
import Prompt from '@models/prompt';

export const POST = async (req) => {
   const { userId, prompt, tag } = await req.json();
   console.log('test: ',userId);

   try {
      await connectToDB(); // this is a lambda functiton, will die after it's called

      const newPrompt = new Prompt({
         creator: userId,
         prompt,
         tag,
      });

      console.log(JSON.stringify(newPrompt));

      await newPrompt.save();

      return new Response(JSON.stringify(newPrompt), { status: 201 });
   } catch (error) {
      return new Response(JSON.stringify('Failed to create a new prompt'), {
         status: 500,
      });
   }
};