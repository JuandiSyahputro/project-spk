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

  if (!FormData.id_penilaian) {
    return {
      error: {
        id_penilaian: "Field ID Penilaian is required",
      },
    };
  }

  const validateFields = AddDataPenilaianMatrixSchema.safeParse(FormData);

  if (!validateFields.success) {
    return {
      error: validateFields.error.flatten().fieldErrors,
    };
  }

  const { id_penilaian, id_karyawan, etika, kedisiplinan, kinerja, komunikasi, kreativitas } = validateFields.data;

  try {
    // Update data di tabel `penilaianMatrix`
    const response = await prisma.penilaianMatrix.update({
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
          id_penilaian_matrix: id_penilaian,
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
