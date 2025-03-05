import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCapitalize(str: string) {
  if (str.includes("@")) {
    return str;
  }

  return str
    .replace(/-/g, " ")
    .replace(/_/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

export const renderTitle = (columnName: string) => {
  switch (columnName) {
    case "nama_karyawan":
      return "Nama Karyawan";
    case "no_telp":
      return "No Telp";
    case "alamat":
      return "Alamat";
    case "nama_atasan":
      return "Nama Atasan";
    case "nama_kriteria":
      return "Kriteria";
    case "type":
      return "Tipe Kriteria";
    case "nilai_bobot":
      return "Nilai Bobot";
    case "type_kriteria":
      return "Tipe Kriteria";
    case "nilai_akhir":
      return "Nilai Akhir";

    default:
      return columnName;
  }
};

export const generateTypeKriteria = (valueMatrix: number, valueMaxMatrix: number, type: string) => {
  if (type.toLowerCase() === "benefit") {
    return valueMatrix / valueMaxMatrix;
  } else {
    return valueMaxMatrix / valueMatrix;
  }
};

export const generateNilaiAkhir = (bobot: number[], nilai: number[]): number => {
  if (bobot.length !== nilai.length) {
    throw new Error("Panjang array bobot dan nilai harus sama!");
  }

  return bobot.reduce((total, b, i) => total + b * nilai[i], 0);
};
