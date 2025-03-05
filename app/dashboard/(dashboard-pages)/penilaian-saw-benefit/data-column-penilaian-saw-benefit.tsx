"use client";

import { PenilaianSAWBenefitProps } from "@/app/dashboard/(dashboard-pages)/penilaian-saw-benefit/page";
import { DataTableColumnHeader } from "@/components/data-table/column-header";
import { formatCapitalize } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";

export const columnPenilaianSawBenefit: ColumnDef<PenilaianSAWBenefitProps>[] = [
  {
    id: "No.",
    header: "No",
    cell: ({ row }) => <span>{row.index + 1}</span>,
  },
  {
    accessorKey: "nama_karyawan",
    header: ({ column }) => <DataTableColumnHeader column={column} title={column.id} />,
    cell: ({ row }) => <span className="capitalize">{formatCapitalize(row.getValue("nama_karyawan"))}</span>,
  },
  {
    accessorKey: "komunikasi",
    header: ({ column }) => <DataTableColumnHeader column={column} title={column.id} />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("komunikasi")}</span>,
  },
  {
    accessorKey: "etika",
    header: ({ column }) => <DataTableColumnHeader column={column} title={column.id} />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("etika")}</span>,
  },
  {
    accessorKey: "kinerja",
    header: ({ column }) => <DataTableColumnHeader column={column} title={column.id} />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("kinerja")}</span>,
  },
  {
    accessorKey: "kreativitas",
    header: ({ column }) => <DataTableColumnHeader column={column} title={column.id} />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("kreativitas")}</span>,
  },
  {
    accessorKey: "kedisiplinan",
    header: ({ column }) => <DataTableColumnHeader column={column} title={column.id} />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("kedisiplinan")}</span>,
  },
  {
    accessorKey: "nilai_akhir",
    header: ({ column }) => <DataTableColumnHeader column={column} title={column.id} />,
    cell: ({ row }) => <span className="capitalize">{row.getValue("nilai_akhir")}</span>,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     return <ActionCellKriteria kriteria={row.original} />;
  //   },
  // },
];
