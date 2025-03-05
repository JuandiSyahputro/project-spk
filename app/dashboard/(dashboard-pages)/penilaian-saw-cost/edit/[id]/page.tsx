import FormInputPenilaianSAW from "@/components/pages/penilaian-saw/form-input-penilaian-saw";
import { getDataPenilaianMatrix, getDataPenilaianMatrixById } from "@/lib/data-fetch";
import { Kriteria } from "@prisma/client";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "SPK | Ubah Data Kriteria Cost",
  description: "Generated by create next app",
};

enum Type {
  COST = "COST",
  BENEFIT = "BENEFIT",
}

export interface Bobot {
  id: string;
  nilai_bobot: number;
  id_kriteria: string;
  nama_kriteria: string;
  type: Type;
}

export interface formattedEditProps {
  id: string;
  id_penilaian_matrix: string;
  id_karyawan?: string;
  nama_karyawan?: string;
  komunikasi: number | null;
  etika: number | null;
  kinerja: number | null;
  kreativitas: number | null;
  kedisiplinan: number | null;
  bobot: Bobot[];
  kriteria: Kriteria[];
}
const EditDataPenilaianSawCostPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const data = await getDataPenilaianMatrixById(id);
  const dataPenilaian = await getDataPenilaianMatrix();

  if (!data || !dataPenilaian) return notFound();

  const formattedData = {
    ...data,
    id_karyawan: dataPenilaian.find((matrix) => matrix.id === data.id_penilaian_matrix)?.karyawan?.id,
    nama_karyawan: dataPenilaian.find((matrix) => matrix.id === data.id_penilaian_matrix)?.karyawan?.nama_karyawan,
    kriteria: data.kriteria.map((k) => ({
      ...k,
      type: Type[k.type.toUpperCase() as keyof typeof Type],
    })),
  };

  return (
    <section className="flex w-full justify-between p-10">
      <Link href="/dashboard/penilaian-saw-cost" className="mb-5 mt-5 flex h-10 w-10 items-center justify-center rounded-full bg-black dark:bg-white text-3xl font-bold">
        <ChevronLeft className="text-2xl text-white dark:text-black" />
      </Link>
      <FormInputPenilaianSAW isCost={true} type="edit" data={formattedData} dataBobot={formattedData.bobot} dataKaryawan={undefined} title="Ubah Data Penilaian SAW" />
      <p className="hidden opacity-0 lg:block">menuss</p>
    </section>
  );
};

export default EditDataPenilaianSawCostPage;
