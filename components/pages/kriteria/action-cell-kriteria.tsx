"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Kriteria } from "@prisma/client";
import { MoreHorizontal, SquarePen } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const ActionCellKriteria = ({ kriteria }: { kriteria: Kriteria }) => {
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
        <Link href={`/dashboard/kriteria-cost/edit/${kriteria.id}`}>
          <Button variant="default" className="w-full justify-start gap-3">
            <SquarePen size={20} /> Edit
          </Button>
        </Link>
        <DropdownMenuSeparator />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ActionCellKriteria;
