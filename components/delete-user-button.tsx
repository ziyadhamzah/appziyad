
"use client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"

import React, { useState } from 'react'
import { useRouter } from "next/navigation"
import { deleteUser } from "@/server/users"
import { Button } from "./ui/button"
import { Loader2, Trash2 } from "lucide-react"

type TipeDataIdUserTsbDiDb = {
    userId:string
}

export default function DeleteUserButton(
    {userId} : TipeDataIdUserTsbDiDb
) {
    const [isloading,setIsLoading] = useState(false)
    const [isOpen,setIsOpen] = useState(false)
    const router = useRouter()
    const handleDelete = async()=>{
        try {
            setIsLoading(true)
            await deleteUser(userId)
            toast.success("alhamdulillah penghapusan data santri di database online telah allah mudahkan")
            setIsOpen(false) // menutup pop ap dialog
            router.refresh() // refresh halaman setelah data terhapus
        } catch (error) {
            console.error(error)
            toast.error("astagfirullah penghapusan data santri qodarullah tidak berhasil")
        } finally {
            setIsLoading(false)
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen} >
        <DialogTrigger asChild>
            <Button variant={"ghost"}>
                <Trash2 className="size-4"/>
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
            <DialogTitle>Apakah antum yakin?</DialogTitle>
            <DialogDescription>
                ketika antum hapus data ini tidak bisa di pulihkan, tolong akhi.. antum pikirkan baik baik
            </DialogDescription>
            <Button 
            variant="destructive"
            disabled={isloading}
            onClick={handleDelete}
        >
            {isloading?<Loader2 className="size-4 animate-spin"/> : "Delete"}
            </Button>
            </DialogHeader>
        </DialogContent>
        </Dialog>
    )
}
