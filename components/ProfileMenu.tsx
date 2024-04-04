"use client"
import { SessionInterface } from '@/common.types'
import { Menu, Transition } from '@headlessui/react';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import React, { Fragment, useState } from 'react'
import { LuLogOut } from 'react-icons/lu';

const ProfileMenu = ({ session }: { session: SessionInterface }) => {
  const [openModal, setOpenModal] = useState(false);

  return (
      <div className="flexCenter z-10 flex-col relative">
          <Menu as="div">
              <Menu.Button className="flexCenter" onMouseEnter={() => setOpenModal(true)} >
                  {session?.user?.image && (
                      <Image
                          src={session.user.avatarUrl}
                          width={72}
                          height={72}
                          className="rounded-full"
                          alt="user profile image"
                      />
                  )
                }
              </Menu.Button>

              <Transition
                  show={openModal}
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
              >
                  <Menu.Items
                      static
                      className="flexStart right-2 absolute mt-3 border rounded-xl min-w-max sm:min-w-[100px]"
                      onMouseLeave={() => setOpenModal(false)}
                  >
                    <div>
                        <Menu.Item>
                            <button type="button" className="flexBetween gap-2 min-w-max p-2 text-heading6" onClick={() => signOut()}> 
                                <LuLogOut />
                                Sign out
                            </button>
                        </Menu.Item>
                    </div>
                  </Menu.Items>
              </Transition>
          </Menu>
      </div>
  )
}

export default ProfileMenu