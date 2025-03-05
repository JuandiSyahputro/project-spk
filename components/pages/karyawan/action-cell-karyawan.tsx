"use client";

import { DataKaryawanProps } from "@/app/dashboard/(dashboard-pages)/karyawan/page";
import AlertDialogConfirmation from "@/components/alert-confirmation/alert-confirmation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteKaryawan } from "@/lib/actions";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ActionCellKaryawan = ({ dataKaryawan }: { dataKaryawan: DataKaryawanProps }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[100px] px-2">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <Link href={`/dashboard/karyawan/edit/${dataKaryawan.id}`} className="">
          <Button variant="default" className="w-full justify-start gap-3">
            <SquarePen size={20} /> Edit
          </Button>
        </Link>
        <DropdownMenuSeparator />
        <AlertDialogConfirmation
          handleAction={async (id: string) => {
            return await deleteKaryawan(id);
          }}
          id={dataKaryawan.id}
          setOpen={setOpen}
          ahref="/dashboard/karyawan">
          <Button className="w-full justify-start gap-3 text-sm bg-red-500 text-white dark:hover:text-black group">
            <Trash2 size={20} className="text-slate-100 dark:group-hover:text-black" />
            Delete
          </Button>
        </AlertDialogConfirmation>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCellKaryawan;
