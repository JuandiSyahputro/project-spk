"use client";

import { BobotProps } from "@/app/dashboard/(dashboard-pages)/bobot/page";
import ActionCellBobot from "@/components/pages/bobot/action-cell-bobot";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { formatCapitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columnBobot: ColumnDef<BobotProps>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "nama_kriteria",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Kriteria" />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("nama_kriteria")}</span>,
  },
  {
    accessorKey: "tipe_kriteria",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe Kriteria" />,
    cell: ({ row }) => <span className="capitalize">{formatCapitalize(row.getValue("tipe_kriteria"))}</span>,
  },
  {
    accessorKey: "nilai_bobot",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nilai Bobot" />,
    cell: ({ row }) => <span className="capitalize">{Number(row.getValue("nilai_bobot")) * 100}%</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellBobot bobot={row.original} />;
    },
  },
];
