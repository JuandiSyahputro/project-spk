import { columnBobot } from "@/app/dashboard/(dashboard-pages)/bobot/data-column-bobot";
import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { getDataBobot } from "@/lib/data-fetch";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SPK | Bobot",
  description: "Generated by create next app",
};

export interface BobotProps {
  id: string;
  id_kriteria: string;
  nama_kriteria: string;
  tipe_kriteria: string;
  nilai_bobot: number;
}
const DataBobotPage = async () => {
  const data = await getDataBobot();
  if (!data) {
    return <div className="w-full p-10 text-center text-2xl font-bold">Data not found</div>;
  }

  const formattedData = data.map((item) => {
    return {
      id: item.id,
      id_kriteria: item.kriteria.id,
      nama_kriteria: item.kriteria.nama_kriteria,
      tipe_kriteria: item.kriteria.type,
      nilai_bobot: item.nilai_bobot,
    };
  });

  const componentLink = () => {
    return (
      <Link href="/dashboard/bobot/add-new" className="flex items-center px-3">
        <Button variant="default" className="h-8">
          Add New
        </Button>
      </Link>
    );
  };

  return (
    <section className="container mx-auto p-10">
      <h1 className="mb-5 text-3xl font-bold">Data Bobot Page</h1>
      <DataTable data={formattedData as BobotProps[]} columns={columnBobot} elements={componentLink()} title="kriteria" searchBy="nama_kriteria" />
    </section>
  );
};

export default DataBobotPage;
