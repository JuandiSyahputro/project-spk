"use client";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import ActionCellKriteria from "@/components/pages/kriteria/action-cell-kriteria";
import { formatCapitalize } from "@/lib/utils";
import { Kriteria } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

export const columnKriteria: ColumnDef<Kriteria>[] = [
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
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tipe Kriteria" />,
    cell: ({ row }) => <span className="capitalize">{formatCapitalize(row.getValue("type"))}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellKriteria kriteria={row.original} />;
    },
  },
];
