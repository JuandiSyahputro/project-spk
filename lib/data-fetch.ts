import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { generateTypeKriteria } from "@/lib/utils";

interface DetailPenilaian {
  id: string;
  id_penilaian_matrix: string;
  komunikasi: number;
  etika: number;
  kinerja: number;
  kreativitas: number;
  kedisiplinan: number;
  bobot: { id: string; nilai_bobot: number; id_kriteria: string }[];
  kriteria: { id: string; nama_kriteria: string; type: string }[];
  nilai_akhir: number;
}

export interface DetailPenilaianId {
  id: string;
  id_penilaian_matrix: string;
  id_karyawan?: string;
  nama_karyawan?: string;
  komunikasi: number | null;
  etika: number | null;
  kinerja: number | null;
  kreativitas: number | null;
  kedisiplinan: number | null;
  bobot: { id: string; nilai_bobot: number; id_kriteria: string; nama_kriteria: string; tipe_kriteria: string }[];
  kriteria: { id: string; nama_kriteria: string; type: string }[];
  nilai_akhir: number;
}

export enum KriteriaType {
  BENEFIT = "BENEFIT",
  COST = "COST",
}

export const getDataKaryawan = async ({ isPenilaian }: { isPenilaian?: boolean }) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const categories = await prisma.karyawan.findMany({
      orderBy: {
        nama_karyawan: "asc",
      },
      where: { isPenilaian },
      include: {
        user: true,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const getDataKaryawanById = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const categories = await prisma.karyawan.findUnique({
      where: {
        id,
      },
    });
    return categories;
  } catch (error) {
    console.log(error);
  }
};

export const getDataKriteria = async ({ type }: { type?: KriteriaType }) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const kriteria = await prisma.kriteria.findMany({
      orderBy: {
        nama_kriteria: "asc",
      },
      where: {
        type,
      },
    });
    return kriteria;
  } catch (error) {
    console.log(error);
  }
};

export const getDataKriteriaById = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const kriteria = await prisma.kriteria.findUnique({
      where: {
        id,
      },
    });
    return kriteria;
  } catch (error) {
    console.log(error);
  }
};

export const getDataBobot = async (type?: KriteriaType) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const bobot = await prisma.bobot.findMany({
      include: {
        kriteria: true,
      },
      where: {
        kriteria: {
          type,
        },
      },
    });
    return bobot;
  } catch (error) {
    console.log(error);
  }
};

export const getDataBobotById = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const bobot = await prisma.bobot.findUnique({
      where: {
        id,
      },
      include: {
        kriteria: true,
      },
    });
    return bobot;
  } catch (error) {
    console.log(error);
  }
};

export const getDataBobots = async (ids: string[]) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const bobot = await prisma.bobot.findMany({
      where: {
        id: {
          in: ids,
        },
      },
    });
    return bobot;
  } catch (error) {
    console.log(error);
  }
};

export const getDataAdmin = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const admin = await prisma.user.findMany({
      where: {
        id: {
          not: session.user.id,
        },
      },
    });

    return admin;
  } catch (error) {
    console.log(error);
  }
};

export const getDataPenilaianMaxMatrix = async (field: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const maxNilaiMatrix = await prisma.penilaianMatrix.aggregate({
      _max: {
        [field]: true,
      },
    });

    return maxNilaiMatrix._max[field] || 0;
  } catch (error) {
    console.error(error);
  }
};

export const getDataPenilaianMatrix = async () => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const matrix = await prisma.penilaianMatrix.findMany({
      include: {
        karyawan: true,
      },
    });
    const valueMaxKomunikasi = await getDataPenilaianMaxMatrix("komunikasi");
    const valueMaxEtika = await getDataPenilaianMaxMatrix("etika");
    const valueMaxKinerja = await getDataPenilaianMaxMatrix("kinerja");
    const valueMaxKreativitas = await getDataPenilaianMaxMatrix("kreativitas");
    const valueMaxKedisiplinan = await getDataPenilaianMaxMatrix("kedisiplinan");

    const dataMatrix = matrix.map((matrix) => {
      return {
        id: matrix.id,
        komunikasi: matrix.komunikasi ? matrix.komunikasi / (valueMaxKomunikasi ?? 0) : 0,
        etika: matrix.etika ? matrix.etika / (valueMaxEtika ?? 0) : 0,
        kinerja: matrix.kinerja ? matrix.kinerja / (valueMaxKinerja ?? 0) : 0,
        kreativitas: matrix.kreativitas ? matrix.kreativitas / (valueMaxKreativitas ?? 0) : 0,
        kedisiplinan: matrix.kedisiplinan ? matrix.kedisiplinan / (valueMaxKedisiplinan ?? 0) : 0,
        karyawan: {
          id: matrix.karyawan.id,
          nama_karyawan: matrix.karyawan.nama_karyawan,
        },
      };
    });

    return dataMatrix;
  } catch (error) {
    console.log(error);
  }
};

export const getDetailPenilainMatrix = async ({ type = "benefit" }: { type?: string }) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    const matrix = await prisma.detailPenilaianMatrix.findMany({
      include: {
        bobot: true,
        penilaian_matrix: true,
        kriteria: true,
      },
    });

    const valueMaxKomunikasi = await getDataPenilaianMaxMatrix("komunikasi");
    const valueMaxEtika = await getDataPenilaianMaxMatrix("etika");
    const valueMaxKinerja = await getDataPenilaianMaxMatrix("kinerja");
    const valueMaxKreativitas = await getDataPenilaianMaxMatrix("kreativitas");
    const valueMaxKedisiplinan = await getDataPenilaianMaxMatrix("kedisiplinan");

    const groupedData = matrix.reduce((acc, curr) => {
      const idMatrix = curr.id_penilaian_matrix;
      if (!acc[idMatrix]) {
        acc[idMatrix] = {
          id: curr.id,
          id_penilaian_matrix: idMatrix,
          komunikasi: curr.penilaian_matrix.komunikasi ? Number(generateTypeKriteria(curr.penilaian_matrix.komunikasi, valueMaxKomunikasi ?? 0, type).toFixed(3)) : 0,
          etika: curr.penilaian_matrix.etika ? Number(generateTypeKriteria(curr.penilaian_matrix.etika, valueMaxEtika ?? 0, type).toFixed(3)) : 0,
          kinerja: curr.penilaian_matrix.kinerja ? Number(generateTypeKriteria(curr.penilaian_matrix.kinerja, valueMaxKinerja ?? 0, type).toFixed(3)) : 0,
          kreativitas: curr.penilaian_matrix.kreativitas ? Number(generateTypeKriteria(curr.penilaian_matrix.kreativitas, valueMaxKreativitas ?? 0, type).toFixed(3)) : 0,
          kedisiplinan: curr.penilaian_matrix.kedisiplinan ? Number(generateTypeKriteria(curr.penilaian_matrix.kedisiplinan, valueMaxKedisiplinan ?? 0, type).toFixed(3)) : 0,
          bobot: [],
          kriteria: [],
          nilai_akhir: 0,
        };
      }

      // Tambahkan bobot dan kriteria ke dalam array
      acc[idMatrix].bobot.push({
        id: curr.bobot.id,
        nilai_bobot: curr.bobot.nilai_bobot,
        id_kriteria: curr.bobot.id_kriteria,
      });

      acc[idMatrix].kriteria.push({
        id: curr.kriteria.id,
        nama_kriteria: curr.kriteria.nama_kriteria,
        type: curr.kriteria.type,
      });

      return acc;
    }, {} as Record<string, DetailPenilaian>);

    const updatedData = Object.values(groupedData).map((item) => {
      const bobotMap = Object.fromEntries(item.bobot.map((b) => [b.id_kriteria, b.nilai_bobot]));

      // Ambil nilai dari nama_kriteria yang sesuai
      const nilai = item.kriteria.map((k) => item[k.nama_kriteria as keyof DetailPenilaian] ?? 0);
      const bobot = item.kriteria.map((k) => bobotMap[k.id] ?? 0);

      // Hitung nilai_akhir (Σ nilai_bobot * nilai_kriteria)
      return {
        ...item,
        nilai_akhir: Number(bobot.reduce((total, b, i) => total + b * (Number(nilai[i]) || 0), 0).toFixed(3)),
      };
    });
    return { data_detail_penilaian: updatedData };
  } catch (error) {
    console.log(error);
  }
};

export const getDataPenilaianMatrixById = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");
  try {
    const matrix = await prisma.detailPenilaianMatrix.findMany({
      where: {
        id_penilaian_matrix: id,
      },
      include: {
        bobot: true,
        penilaian_matrix: true,
        kriteria: true,
      },
    });

    const groupedData = matrix.reduce((acc, curr) => {
      const idMatrix = curr.id_penilaian_matrix;
      if (!acc[idMatrix]) {
        acc[idMatrix] = {
          id: curr.id,
          id_penilaian_matrix: idMatrix,
          komunikasi: curr.penilaian_matrix.komunikasi,
          etika: curr.penilaian_matrix.etika,
          kinerja: curr.penilaian_matrix.kinerja,
          kreativitas: curr.penilaian_matrix.kreativitas,
          kedisiplinan: curr.penilaian_matrix.kedisiplinan,
          bobot: [],
          kriteria: [],
          nilai_akhir: 0,
        };
      }

      // Tambahkan bobot dan kriteria ke dalam array
      acc[idMatrix].bobot.push({
        id: curr.bobot.id,
        nilai_bobot: curr.bobot.nilai_bobot,
        id_kriteria: curr.bobot.id_kriteria,
        nama_kriteria: curr.kriteria.nama_kriteria,
        tipe_kriteria: curr.kriteria.type,
      });

      acc[idMatrix].kriteria.push({
        id: curr.kriteria.id,
        nama_kriteria: curr.kriteria.nama_kriteria,
        type: curr.kriteria.type,
      });

      return acc;
    }, {} as Record<string, DetailPenilaianId>);
    const updatedData = Object.values(groupedData).at(0);

    return updatedData;
  } catch (error) {
    console.log(error);
  }
};
