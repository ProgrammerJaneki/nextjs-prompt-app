'use client';

import { useState, useEffect } from 'react';
import useDebounce from './utils/useDebounce';
import PromptCard from './PromptCard';

const Feed = () => {
   const [searchText, setSearchText] = useState('');
   const [posts, setPosts] = useState([]);
   const debouncedSearchText = useDebounce(searchText, 500);

   useEffect(() => {
      const fetchPosts = async () => {
         const response = await fetch('/api/prompt');
         const data = await response.json();
         setPosts(data);
      };

      fetchPosts();
   }, []);

   // FilteredPrompts
   const filteredPrompts = posts.filter((post) => {
      const regex = new RegExp(debouncedSearchText, 'i');
      return (
         regex.test(post.creator.username) ||
         regex.test(post.prompt) ||
         regex.test(post.tag)
      );
   });

   const handleSearchChange = (e) => {
      setSearchText(e.target.value);
   };

   const handleTagClick = (tag) => {
      setSearchText(tag);
   };

   return (
      <section className="feed">
         <form className="relative w-full flex-center">
            <input
               type="text"
               placeholder="Search for a tag or username"
               value={searchText}
               onChange={handleSearchChange}
               required
               className="search_input peer "
            />
         </form>
         <PromptCardList
            data={filteredPrompts}
            handleTagClick={handleTagClick}
         />
      </section>
   );
};

const PromptCardList = ({ data, handleTagClick }) => {
   return (
      <div className="mt-16 prompt_layout">
         {data.map((post) => (
            <PromptCard
               key={post.id + post.prompt}
               post={post}
               handleTagClick={handleTagClick}
            />
         ))}
      </div>
   );
};

export default Feed;
