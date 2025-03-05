"use client";

import CustomButton from "@/components/custom-button/custom-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { editKriteria } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Kriteria } from "@prisma/client";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect } from "react";

interface FormInputKriteriaProps {
  className?: string;
  type?: string;
  title?: string;
  data?: Kriteria;
}
const FormInputriteria = ({ className, title, data, type = "benefit" }: FormInputKriteriaProps) => {
  const [state, formAction] = useActionState((prevState: unknown, formData: FormData) => editKriteria(prevState, formData, data!.id), null);

  const { push } = useRouter();

  useEffect(() => {
    if (state?.success) {
      push(`/dashboard/kriteria-${type}`);
    }
  }, [state, push, type]);
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
                <Label htmlFor="nama_kriteria">Nama Kriteria</Label>
                <Input defaultValue={data?.nama_kriteria} id="nama_kriteria" name="nama_kriteria" type="text" placeholder="Nama Kriteria" className="capitalize dark:bg-sidebar" />
                <div>
                  <span className="text-sm text-red-500 mt-2">{state?.error?.nama_kriteria}</span>
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

export default FormInputriteria;
