"use client";
import { ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/data-table/column-header";
import ActionCellKaryawan from "@/components/pages/karyawan/action-cell-karyawan";
import { DataKaryawanProps } from "@/app/dashboard/(dashboard-pages)/karyawan/page";
import { formatCapitalize } from "@/lib/utils";

export const columnKaryawan: ColumnDef<DataKaryawanProps>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "nama_karyawan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Karyawan" />,
    cell: ({ row }) => <span>{formatCapitalize(row.getValue("nama_karyawan"))}</span>,
  },
  {
    accessorKey: "no_telp",
    header: ({ column }) => <DataTableColumnHeader column={column} title="No Telp" />,
  },
  {
    accessorKey: "alamat",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Alamat" />,
    cell: ({ row }) => <span>{formatCapitalize(row.getValue("alamat"))}</span>,
  },
  {
    accessorKey: "nama_atasan",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nama Atasan" />,
    cell: ({ row }) => <span>{formatCapitalize(row.getValue("nama_atasan"))}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <ActionCellKaryawan dataKaryawan={row.original} />;
    },
  },
];
