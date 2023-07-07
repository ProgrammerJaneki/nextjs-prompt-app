'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Nav = () => {
   const { data: session } = useSession();

   const [providers, setProviders] = useState(null);
   const [toggleDropDown, setToggleDropDown] = useState(false);

   useEffect(() => {
      const setUpProviders = async () => {
         const response = await getProviders();

         setProviders(response);
      };
      setUpProviders();
   }, [session]);

   return (
      <nav className="flex-between w-full mb-16 pt-3">
         <Link href="/" className="flex-center gap-2">
            <Image
               src="/assets/images/logo.svg"
               alt="Promptify Logo"
               width={30}
               height={30}
            />
            <p className="logo_text">Promptify</p>
         </Link>

         {/* Desktop Navigation */}
         <div className="sm:flex hidden">
            {session?.user ? (
               <div className="flex gap-3 md:gap-5">
                  <Link href="/create-prompt" className="black_btn">
                     Create Post
                  </Link>
                  <button
                     type="button"
                     onClick={signOut}
                     className="outline_btn"
                  >
                     Sign Out
                  </button>

                  <Link href="/profile" className="">
                     <Image
                        src={session?.user.image}
                        width={37}
                        height={37}
                        className='rounded-full'
                        alt="profile"
                     />
                  </Link>
               </div>
            ) : (
               <>
                  {providers &&
                     Object.values(providers).map((provider) => (
                        <button
                           type="button"
                           key={provider.name}
                           onClick={() => signIn(provider.id)}
                           className="black_btn"
                        >
                           Sign In
                        </button>
                     ))}
               </>
            )}
         </div>

         {/* Mobile Navigation */}
         <div className="relative flex sm:hidden ">
            {session?.user ? (
               <div className="flex">
                  <Image
                     src={session?.user.image}
                     width={37}
                     height={37}
                     className="rounded-full "
                     alt="profile"
                     onClick={() => setToggleDropDown((prev) => !prev)}
                  />

                  {toggleDropDown && (
                     <div className="dropdown">
                        {/* <h1 className="font-bold">{session?.user.name}</h1> */}
                        <Link
                           href="/profile"
                           className="dropdown_link"
                           onClick={() => setToggleDropDown(false)}
                        >
                        {session?.user.email}
                        </Link>
                        <Link
                           href="/create-prompt"
                           className="dropdown_link"
                           onClick={() => setToggleDropDown(false)}
                        >
                           Create Prompt
                        </Link>
                        <button
                           type="button"
                           onClick={() => {
                              setToggleDropDown(false);
                              signOut();
                           }}
                           className="black_btn mt-5 w-full"
                        >
                           Sign Out
                        </button>
                     </div>
                  )}
               </div>
            ) : (
               <>
                  {providers &&
                     Object.values(providers).map((provider) => (
                        <button
                           type="button"
                           key={provider.name}
                           onClick={() => signIn(provider.id)}
                           className="black_btn"
                        >
                           Sign In
                        </button>
                     ))}
               </>
            )}
         </div>
      </nav>
   );
};

export default Nav;
