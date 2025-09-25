import UserForm from "@/components/form/user-form";
import { DialogHeader } from "@/components/ui/dialog";
import UsersTable from "@/components/ui/tableulangan";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@radix-ui/react-dialog";
import { Button } from "@react-email/components";
import { UserPlus } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <div className="flex flex-col gap-4 p-4 md:p-24">
      <h1 className="text-2xl font-bold">Data Hafalan al-Quran Santri</h1>
      <div>
        <Dialog modal={false}>
          <DialogTrigger asChild>
            <Button>
              Tambah Data Santri <UserPlus className="size-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tambah Data Santri</DialogTitle>
              <div>
                <div>
                  <DialogDescription>Data santri</DialogDescription>
                </div>
                <div>
                  <UserForm />
                </div>
              </div>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <UsersTable />
    </div>
  );
}
