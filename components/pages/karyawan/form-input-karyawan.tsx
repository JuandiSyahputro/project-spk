"use client";

import { DataKaryawanProps } from "@/app/dashboard/(dashboard-pages)/karyawan/page";
import CustomButton from "@/components/custom-button/custom-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addKaryawan, editKaryawan } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

interface FormInputKaryawanProps {
  className?: string;
  type?: string;
  title?: string;
  data?: DataKaryawanProps;
}
const FormInputKaryawan = ({ className, type = "add", title, data }: FormInputKaryawanProps) => {
  const [state, formAction] = useActionState(type === "add" ? addKaryawan : (prevState: unknown, formData: FormData) => editKaryawan(prevState, formData, data!.id), null);
  const { push } = useRouter();

  useEffect(() => {
    if (state?.success) {
      push("/dashboard/karyawan");
    }
  }, [state, push]);
  return (
    <div className={cn("flex flex-col gap-6 w-1/3", className)}>
      <Card className="border-0 w-full">
        <CardHeader className="mb-5">
          <CardTitle className="text-3xl text-center">{title}</CardTitle>
          {state?.message && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{state.message}</AlertDescription>
            </Alert>
          )}
        </CardHeader>
        <CardContent>
          <form className="dark:bg-gray-800 p-10 rounded-lg" action={formAction}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="nama_karyawan">Nama Karyawan</Label>
                <Input defaultValue={data?.nama_karyawan} id="nama_karyawan" name="nama_karyawan" type="text" placeholder="Nama Karyawan" className="dark:bg-sidebar" />
                <div>
                  <span className="text-sm text-red-500 mt-2">{state?.error?.nama_karyawan}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="no_telp">No Telp</Label>
                <Input defaultValue={data?.no_telp} className="dark:bg-sidebar" id="no_telp" name="no_telp" type="text" placeholder="No Telp" />
                <div>
                  <span className="text-sm text-red-500 mt-2">{state?.error?.no_telp}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="alamat">Alamat</Label>
                <Input id="alamat" defaultValue={data?.alamat} className="dark:bg-sidebar" name="alamat" type="text" placeholder="Alamat" />
                <div>
                  <span className="text-sm text-red-500 mt-2">{state?.error?.alamat}</span>
                </div>
              </div>
              <CustomButton />
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormInputKaryawan;
