import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string({ required_error: "Please enter a valid username" }).min(1, {
    message: "Please enter a valid username",
  }),
  password: z.string({ required_error: "Please enter a valid password" }).min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export const AddKaryawanSchema = z.object({
  nama_karyawan: z.string({ required_error: "Please enter a valid name" }).min(1, {
    message: "Please enter a valid name",
  }),
  no_telp: z.string({ required_error: "Please enter a valid no telp" }).min(1, {
    message: "Please enter a valid no telp",
  }),
  alamat: z.string({ required_error: "Please enter a valid address" }).min(1, {
    message: "Please enter a valid address",
  }),
});

export const EditKriteriaSchema = z.object({
  nama_kriteria: z.string({ required_error: "Please enter a valid kriteria" }).min(1, {
    message: "Please enter a valid kriteria",
  }),
});

export const AddDataBobotSchema = z.object({
  nilai_bobot: z
    .number({ required_error: "Please enter a valid bobot" })
    .min(1, {
      message: "Please enter minimum 1 bobot",
    })
    .max(100, {
      message: "Please enter maximum 100 bobot",
    }),
  id_kriteria: z.string({ required_error: "Please enter a valid kriteria" }).min(1, {
    message: "Please enter a valid kriteria",
  }),
});

export const AddDataPenilaianMatrixSchema = z.object({
  id_karyawan: z.string({ required_error: "Please enter a valid karyawan" }).min(1, {
    message: "Please enter a valid karyawan",
  }),
  id_penilaian: z
    .string({ required_error: "Please enter a valid penilaian" })
    .min(1, {
      message: "Please enter a valid penilaian",
    })
    .optional(),
  komunikasi: z
    .number({ required_error: "Please enter a valid nilai" })
    .min(1, {
      message: "Please enter minimum 1 bobot",
    })
    .max(5, {
      message: "Please enter maximum 100 bobot",
    })
    .optional(),
  etika: z
    .number({ required_error: "Please enter a valid value" })
    .min(1, {
      message: "Please enter minimum 1",
    })
    .max(5, {
      message: "Please enter maximum 5",
    })
    .optional(),
  kinerja: z
    .number({ required_error: "Please enter a valid value" })
    .min(1, {
      message: "Please enter minimum 1",
    })
    .max(5, {
      message: "Please enter maximum 5",
    })
    .optional(),
  kreativitas: z
    .number({ required_error: "Please enter a valid value" })
    .min(1, {
      message: "Please enter minimum 1",
    })
    .max(5, {
      message: "Please enter maximum 5",
    })
    .optional(),
  kedisiplinan: z
    .number({ required_error: "Please enter a valid value" })
    .min(1, {
      message: "Please enter minimum 1",
    })
    .max(5, {
      message: "Please enter maximum 5",
    })
    .optional(),
});
