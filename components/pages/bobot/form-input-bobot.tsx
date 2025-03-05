"use client";

import { BobotProps } from "@/app/dashboard/(dashboard-pages)/bobot/page";
import CustomButton from "@/components/custom-button/custom-button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { addBobot, editBobot } from "@/lib/actions";
import { cn } from "@/lib/utils";
import { Kriteria } from "@prisma/client";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { AlertCircle, Check, ChevronsUpDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

interface FormInputKaryawanProps {
  className?: string;
  type?: string;
  title?: string;
  dataKriteria: Kriteria[];
  data?: BobotProps;
}
const FormInputBobot = ({ className, type = "add", title, dataKriteria, data }: FormInputKaryawanProps) => {
  const { push } = useRouter();

  const [state, formAction] = useActionState(type === "add" ? addBobot : (prevState: unknown, formData: FormData) => editBobot(prevState, formData, data!.id), null);

  const [open, setOpen] = useState(false);
  const [openTooltip, setOpenTooltip] = useState(false);
  const [defaultNilaiBobot] = useState<number | undefined>(data?.nilai_bobot ? data.nilai_bobot * 100 : undefined);
  const [value, setValue] = useState({
    nama_kriteria: dataKriteria[0].nama_kriteria,
    nama_kriteria_type: data?.id ? `${data?.nama_kriteria} - ${data?.tipe_kriteria.toLowerCase()}` : `${dataKriteria[0].nama_kriteria} - ${dataKriteria[0].type.toLowerCase()}`,
    id_kriteria: dataKriteria[0].id,
  });

  useEffect(() => {
    if (state?.success) {
      push("/dashboard/bobot");
    }
  }, [state, push]);

  useEffect(() => {
    if (state?.isIncluded) {
      toast.error(state?.msg, {
        style: {
          background: "#F87171",
          color: "#fff",
          border: "1px solids #F87171",
          width: "max-content",
        },
      });
    }
  }, [state?.isIncluded, state?.msg, state]);

  return (
    <div className={cn("flex flex-col round gap-6 w-1/3", className)}>
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
                <Label htmlFor="nilai_bobot" className="flex items-center">
                  <span className="mr-2">Nilai Bobot</span>
                  <TooltipProvider>
                    <Tooltip open={openTooltip}>
                      <TooltipTrigger asChild className="cursor-pointer" onClick={() => setOpenTooltip(!openTooltip)} onMouseEnter={() => setOpenTooltip(true)} onMouseLeave={() => setOpenTooltip(false)}>
                        <Info width={15} />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Nilai bobot akan dikonversi otomatis kedalam persentase (%)</p>
                        <TooltipArrow className="dark:fill-white fill-black" />
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Label>
                <Input defaultValue={defaultNilaiBobot} id="nilai_bobot" name="nilai_bobot" type="number" pattern="[0-9]{3}" min={1} max={100} placeholder="Nilai Bobot (1-100)" className="dark:bg-sidebar" />
                <div>
                  <span className="text-sm text-red-500 mt-2">{!state?.isIncluded && state?.error?.nilai_bobot}</span>
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="no_telp">Pilih Kriteria</Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between capitalize dark:bg-sidebar">
                      {value.nama_kriteria_type ? value.nama_kriteria_type : "Select kriteria..."}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                      <CommandInput placeholder="Search kriteria..." />
                      <CommandList>
                        <CommandEmpty>No kriteria found.</CommandEmpty>
                        <CommandGroup>
                          {dataKriteria.map((kriteria) => (
                            <CommandItem
                              key={kriteria.id}
                              value={`${kriteria.nama_kriteria} - ${kriteria.type}`}
                              onSelect={() => {
                                setValue((prev) => {
                                  return {
                                    ...prev,
                                    nama_kriteria: kriteria.nama_kriteria,
                                    id_kriteria: kriteria.id,
                                    nama_kriteria_type: `${kriteria.nama_kriteria.toLowerCase()} - ${kriteria.type.toLowerCase()}`,
                                  };
                                });
                                setOpen(false);
                              }}
                              className="capitalize">
                              <Check className={cn("mr-2 h-4 w-4", value.nama_kriteria_type.toLowerCase() === `${kriteria.nama_kriteria} - ${kriteria.type}`.toLowerCase() ? "opacity-100" : "opacity-0")} />
                              {kriteria.nama_kriteria} - {kriteria.type.toLowerCase()}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div>
                  <Input type="hidden" name="id_kriteria" className="dark:bg-sidebar" value={value.id_kriteria} />
                  <span className="text-sm text-red-500 mt-2">{!state?.isIncluded && state?.error?.id_kriteria}</span>
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

export default FormInputBobot;
