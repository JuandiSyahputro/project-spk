"use server";

import { auth, signIn, signOut } from "@/auth";
import { getDataBobot } from "@/lib/data-fetch";
import { prisma } from "@/lib/prisma";
import { AddDataBobotSchema, AddDataPenilaianMatrixSchema, AddKaryawanSchema, EditKriteriaSchema, LoginSchema } from "@/lib/zod";
import { Prisma } from "@prisma/client";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export const LoginCredentials = async (prevState: unknown, formData: FormData) => {
  const validateFields = LoginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { username, password } = validateFields.data;

  try {
    await signIn("credentials", {
      username,
      password,
      redirectTo: "/dashboard",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return {
            message: "Invalid username or password",
          };

        default:
          return {
            message: "Something went wrong.",
          };
      }
    }
    throw error;
  }
};

export async function handleSignOut() {
  await signOut({ redirectTo: "/auth/login" });
}

export const addKaryawan = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  const validateFields = AddKaryawanSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { alamat, nama_karyawan, no_telp } = validateFields.data;
  try {
    const response = await prisma.karyawan.create({
      data: {
        nama_karyawan,
        no_telp,
        alamat,
        user_id: session.user.id!,
      },
    });

    if (response) {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const editKaryawan = async (prevState: unknown, formData: FormData, id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  const validateFields = AddKaryawanSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { alamat, nama_karyawan, no_telp } = validateFields.data;
  try {
    const response = await prisma.karyawan.update({
      where: {
        id,
      },
      data: {
        nama_karyawan,
        no_telp,
        alamat,
        user_id: session.user.id!,
      },
    });

    if (response) {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const deleteKaryawan = async (id?: string): Promise<boolean> => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    await prisma.karyawan.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
    // throw error;
  }
};

export const editKriteria = async (prevState: unknown, formData: FormData, id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  const validateFields = EditKriteriaSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { nama_kriteria } = validateFields.data;
  try {
    const response = await prisma.kriteria.update({
      where: {
        id,
      },
      data: {
        nama_kriteria: nama_kriteria.toLowerCase(),
      },
    });

    if (response) {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const addBobot = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  const rawData = Object.fromEntries(formData.entries());
  const FormData = {
    nilai_bobot: typeof rawData.nilai_bobot === "string" ? parseFloat(rawData.nilai_bobot) : rawData.nilai_bobot,
    id_kriteria: typeof rawData.id_kriteria === "string" ? rawData.id_kriteria : rawData.id_kriteria,
  };

  const validateFields = AddDataBobotSchema.safeParse(FormData);
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { nilai_bobot, id_kriteria } = validateFields.data;
  const nilai_bobot_float = parseFloat(Number(nilai_bobot / 100).toFixed(2));
  const dataBobot = await getDataBobot();

  if (dataBobot) {
    const findIncludData = dataBobot.filter((item) => item.id_kriteria === id_kriteria);

    if (findIncludData.length > 0) {
      return {
        error: {
          id_kriteria: "Kriteria sudah ada.",
          nilai_bobot: "Bobot sudah ada.",
        },
        isIncluded: true,
        msg: "Kriteria sudah pernah ditambahkan!",
      };
    }
  }
  try {
    const response = await prisma.bobot.create({
      data: {
        nilai_bobot: nilai_bobot_float,
        id_kriteria,
      },
    });

    if (response) {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const editBobot = async (prevState: unknown, formData: FormData, id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");
  const rawData = Object.fromEntries(formData.entries());
  const FormData = {
    nilai_bobot: typeof rawData.nilai_bobot === "string" ? parseFloat(rawData.nilai_bobot) : rawData.nilai_bobot,
    id_kriteria: typeof rawData.id_kriteria === "string" ? rawData.id_kriteria : rawData.id_kriteria,
  };

  const validateFields = AddDataBobotSchema.safeParse(FormData);
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { nilai_bobot, id_kriteria } = validateFields.data;
  const nilai_bobot_float = parseFloat(Number(nilai_bobot / 100).toFixed(2));

  try {
    const response = await prisma.bobot.update({
      where: {
        id,
      },
      data: {
        nilai_bobot: nilai_bobot_float,
        id_kriteria,
      },
    });

    if (response) {
      return {
        success: true,
      };
    }
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      switch (error.code) {
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const deleteBobot = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    await prisma.bobot.delete({
      where: {
        id,
      },
    });

    return true;
  } catch (error) {
    console.log(error);

    return false;
  }
};

export const addDataPenilaianSAW = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  const rawData = Object.fromEntries(formData.entries());
  const bobotArray: { id: string; id_kriteria: string }[] = rawData.id_bobot ? JSON.parse(rawData.id_bobot as string) : [];

  const FormData = {
    id_karyawan: typeof rawData.id_karyawan === "string" ? rawData.id_karyawan : rawData.id_karyawan,
    etika: typeof rawData.etika === "string" ? parseFloat(rawData.etika) : rawData.etika,
    kedisiplinan: typeof rawData.kedisiplinan === "string" ? parseFloat(rawData.kedisiplinan) : rawData.kedisiplinan,
    kinerja: typeof rawData.kinerja === "string" ? parseFloat(rawData.kinerja) : rawData.kinerja,
    komunikasi: typeof rawData.komunikasi === "string" ? parseFloat(rawData.komunikasi) : rawData.komunikasi,
    kreativitas: typeof rawData.kreativitas === "string" ? parseFloat(rawData.kreativitas) : rawData.kreativitas,
  };

  if (rawData.id_karyawan == "undefined") {
    return {
      error: {
        id_karyawan: "Field karyawan is required",
      },
    };
  }
  const validateFields = AddDataPenilaianMatrixSchema.safeParse(FormData);

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id_karyawan, etika, kedisiplinan, kinerja, komunikasi, kreativitas } = validateFields.data;
  try {
    const response = await prisma.penilaianMatrix.create({
      data: {
        id_karyawan,
        user_id: session.user.id!,
        etika,
        kedisiplinan,
        kinerja,
        komunikasi,
        kreativitas,
      },
    });
    await prisma.karyawan.update({
      where: {
        id: id_karyawan,
      },
      data: {
        isPenilaian: true,
      },
    });
    if (bobotArray.length > 0) {
      await prisma.detailPenilaianMatrix.createMany({
        data: bobotArray.map(({ id, id_kriteria }) => ({
          id_penilaian_matrix: response.id,
          id_bobot: id,
          id_kriteria: id_kriteria,
        })),
      });
    }
    if (response) {
      return {
        success: true,
      };
    }
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      switch (error.code) {
        default:
          return {
            message: "Something went wrong",
          };
      }
    }
    throw error;
  }
};

export const updateDataPenilaianSAW = async (prevState: unknown, formData: FormData) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  const rawData = Object.fromEntries(formData.entries());
  const bobotArray: { id: string; id_kriteria: string }[] = rawData.id_bobot ? JSON.parse(rawData.id_bobot as string) : [];

  const FormData = {
    id_penilaian: rawData.id_penilaian as string, // Ambil ID penilaian yang akan diupdate
    id_karyawan: rawData.id_karyawan as string,
    etika: typeof rawData.etika === "string" ? parseFloat(rawData.etika) : rawData.etika,
    kedisiplinan: typeof rawData.kedisiplinan === "string" ? parseFloat(rawData.kedisiplinan) : rawData.kedisiplinan,
    kinerja: typeof rawData.kinerja === "string" ? parseFloat(rawData.kinerja) : rawData.kinerja,
    komunikasi: typeof rawData.komunikasi === "string" ? parseFloat(rawData.komunikasi) : rawData.komunikasi,
    kreativitas: typeof rawData.kreativitas === "string" ? parseFloat(rawData.kreativitas) : rawData.kreativitas,
  };

  const validateFields = AddDataPenilaianMatrixSchema.safeParse(FormData);
  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id_penilaian, id_karyawan, etika, kedisiplinan, kinerja, komunikasi, kreativitas } = validateFields.data;
  try {
    // Update data di tabel `penilaianMatrix`
    await prisma.penilaianMatrix.update({
      where: {
        id: id_penilaian,
      },
      data: {
        id_karyawan,
        user_id: session.user.id!,
        etika,
        kedisiplinan,
        kinerja,
        komunikasi,
        kreativitas,
      },
    });
    // Update status isPenilaian di tabel `karyawan`
    await prisma.karyawan.update({
      where: {
        id: id_karyawan,
      },
      data: {
        isPenilaian: true,
      },
    });
    // Hapus data lama di `detailPenilaianMatrix` sebelum memasukkan yang baru
    await prisma.detailPenilaianMatrix.deleteMany({
      where: {
        id_penilaian_matrix: id_penilaian,
      },
    });
    // Masukkan data baru ke `detailPenilaianMatrix`
    if (bobotArray.length > 0) {
      await prisma.detailPenilaianMatrix.createMany({
        data: bobotArray.map(({ id, id_kriteria }) => ({
          id_penilaian_matrix: id_penilaian!,
          id_bobot: id,
          id_kriteria: id_kriteria,
        })),
      });
    }
    return {
      success: true,
    };
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      console.log(error.code);
      return {
        message: "Something went wrong",
      };
    }
    throw error;
  }
};

export const deleteDataPenilaianSAW = async (id: string) => {
  const session = await auth();
  if (!session || !session.user) redirect("/auth/login");

  try {
    await prisma.penilaianMatrix.delete({
      where: {
        id,
      },
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
