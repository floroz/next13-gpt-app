"use client";

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { signIn, signOut, useSession, getProviders } from 'next-auth/react'

type Providers = Awaited<ReturnType<typeof getProviders>>;

const ProviderContent = ({ providers }: { providers: Providers }) => providers && Object.values(providers).map((provider) => (
  <button onClick={() => signIn(provider.id)} key={provider.name}>
    Sign in with {provider.name}
  </button>
))


const ImageProfile = (props: any) => (
  <Image
    {...props}
    src="/assets/images/logo.svg"
    width={37}
    height={37}
    alt="Profile"
    className="rounded-full cursor-pointer"
  />
)


const DesktopNavigation = ({ isUserLoggedIn, providers }: {
  isUserLoggedIn: boolean;
  providers: Providers;
}) => (
  <div className="hidden sm:flex">
    {isUserLoggedIn ? (
      <div className="flex gap-3 md:gap-5">
        <Link href="/create-post" className="black_btn">Create Post</Link>
        <button onClick={() => signOut()} className="outline_btn">
          Sign Out
        </button>
        <Link href="/profile">
          <ImageProfile
          />
        </Link>
      </div>
    ) : (
      <ProviderContent providers={providers} />
    )}
  </div>
)

const MobileNavigation = ({ isUserLoggedIn, providers }: {
  isUserLoggedIn: boolean;
  providers: Providers;
}) => {
  const [toggleDropdown, setToggleDropdown] = useState(false)

  return (
    <div className="sm:hidden flex relative">
      {isUserLoggedIn ? (
        <div className="flex">
          <button className="cursor-pointer" onClick={() => setToggleDropdown(v => !v)}>
            <ImageProfile
            />
          </button>
          {toggleDropdown && (
            <div className='dropdown'>
              <Link
                href='/profile'
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                My Profile
              </Link>
              <Link
                href='/create-prompt'
                className='dropdown_link'
                onClick={() => setToggleDropdown(false)}
              >
                Create Prompt
              </Link>
              <button
                type='button'
                onClick={() => {
                  setToggleDropdown(false);
                  signOut();
                }}
                className='mt-5 w-full black_btn'
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      ) : (
        <ProviderContent providers={providers} />
      )}

      <button className="outline_btn">Sign In</button>
      <Link href="/create-post" className="black_btn">Create Post</Link>
    </div>
  )
}


export default function Nav() {
  const isUserLoggedIn = true;
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const _providers = await getProviders();
      setProviders(_providers);
    };
    fetchProviders();
  }, []);

  return (
    <nav className="flex-between w-full mb-16 pt-3">
      <Link href="/" className="flex gap-2 flex-center">
        <Image src="/assets/images/logo.svg" width={30} height={30} alt="Homepage logo" className="object-contain" />
        <p className="logo_text">Next GPT</p>
      </Link>
      <DesktopNavigation {...{ isUserLoggedIn, providers }} />
      <MobileNavigation {...{ isUserLoggedIn, providers }} />
    </nav>
  )
}

