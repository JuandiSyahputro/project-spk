"use client";

import { PenilaianSAWBenefitProps } from "@/app/dashboard/(dashboard-pages)/penilaian-saw-benefit/page";
import AlertDialogConfirmation from "@/components/alert-confirmation/alert-confirmation";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { deleteDataPenilaianSAW } from "@/lib/actions";
import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal, SquarePen, Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ActionCellPenialainSaw = ({ penilaian, type = "benefit" }: { penilaian: PenilaianSAWBenefitProps; type: string }) => {
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu open={open} onOpenChange={() => setOpen(!open)}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[100px] px-2 dark:bg-white">
        <DropdownMenuLabel className="dark:text-black">Actions</DropdownMenuLabel>
        <Link href={`/dashboard/penilaian-saw-${type}/edit/${penilaian.id_penilaian_matrix}`} className="">
          <Button className="w-full justify-start gap-3 dark:bg-black dark:text-white">
            <SquarePen size={20} className="dark:text-white" /> Edit
          </Button>
        </Link>
        <DropdownMenuSeparator className="dark:bg-slate-400" />
        <AlertDialogConfirmation
          handleAction={async (id: string) => {
            return await deleteDataPenilaianSAW(id);
          }}
          id={penilaian.id_penilaian_matrix}
          setOpen={setOpen}
          ahref={`/dashboard/penilaian-saw-${type}`}>
          <Button className="w-full justify-start gap-3 text-sm bg-red-500 text-white dark:hover:text-black group">
            <Trash2 size={20} className="text-slate-100 dark:group-hover:text-black" />
            Delete
          </Button>
        </AlertDialogConfirmation>
        <DropdownMenuArrow className="fill-black  dark:fill-white" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCellPenialainSaw;
