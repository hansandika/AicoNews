"use client";

import { SessionInterface } from "@/common.types";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { SheetClose } from '@/components/ui/sheet';
import { useSWRConfig } from "swr";

interface DeleteChatProps {
  slug: string;
  session: SessionInterface;
}

const DeleteChat: FC<DeleteChatProps> = ({ slug, session }) => {
  const { mutate } = useSWRConfig()

  const handleDeleteChatHistory = async () => {
    await fetch('/api/chat', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ slug, userId: session?.user?.id }),
    })

    mutate(`/api/chat?slug=${encodeURIComponent(slug)}`)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='bg-red-600 hover:bg-red-400 rounded-sm shadow p-2'>
        <FaTrashAlt size={16} className='text-white' />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <SheetClose>
            <AlertDialogAction onClick={handleDeleteChatHistory}>Continue</AlertDialogAction>
          </SheetClose>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteChat