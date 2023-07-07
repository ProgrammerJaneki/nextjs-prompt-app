import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';

import User from '@models/user';
import { connectToDB } from '@utils/database';

const handler = NextAuth({
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_ID,
         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      // more providers
   ],
   callbacks: {
      async session({ session }) {
         // always checking which user is currently logged in
         const sessionUser = await User.findOne({
            email: session.user.email,
         });

         session.user.id = sessionUser._id.toString();
         return session;
      },

      async signIn({ profile }) {
         // nextjs route is a serverless route -> Lambda = opens only wwhen it gets called
         try {
            await connectToDB();
            // check if a user already exists
            const userExists = await User.findOne({ email: profile.email });

            if (!userExists) {
               await User.create({
                  email: profile.email,
                  username: profile.name.replace(' ', '').toLowerCase(),
                  image: profile.picture,
               });
            }
            console.log('EXISTS: ', userExists);
            return true;
         } catch (err) {
            console.log('Error: ', err);

            return false;
         }
      },
   },
});

export { handler as GET, handler as POST };
