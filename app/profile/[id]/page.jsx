'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import Profile from '@components/profile';

// params being extracted as route parameter
const UserProfile = ({ params }) => {
   const router = useRouter();
   const searchParams = useSearchParams();
   const userName = searchParams.get('name');
   const [posts, setPosts] = useState([]);
   // console.log(posts);
   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch(`/api/users/${params?.id}/posts`);
         const data = await response.json();
         setPosts(data);
      };
      if (params?.id) fetchPosts();
   }, [params.id]);

   const handleEdit = (post) => {
      // console.log('EDIT');
      router.push(`/update-prompt?id=${post._id}`);
   };

   const handleDelete = async (post) => {
      const deleteConfirmed = confirm(
         'Are you sure you want to delete this prompt?'
      );

      if (deleteConfirmed) {
         try {
            await fetch(`/api/prompt/${post._id.toString()}`, {
               method: 'DELETE',
            });
            const filteredPosts = posts.filter((p) => p._id !== post._id);
            setPosts(filteredPosts);
         } catch (error) {
            console.log(error);
         }
      }
   };

   return (
      <Profile
         name={userName}
         desc={`Welcome to ${userName}'s personalized profile page. Explore ${userName}'s incredible prompts and be inspired.`}
         data={posts} //array
         handleEdit={handleEdit}
         handleDelete={handleDelete}
      />
   );
};

export default UserProfile;
