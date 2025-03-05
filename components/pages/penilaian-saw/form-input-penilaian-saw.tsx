"use client";

import { BobotProps } from "@/app/dashboard/(dashboard-pages)/bobot/page";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { addDataPenilaianSAW, updateDataPenilaianSAW } from "@/lib/actions";
import { DetailPenilaianId } from "@/lib/data-fetch";
import { cn, formatCapitalize } from "@/lib/utils";
import { Karyawan } from "@prisma/client";
import { TooltipArrow } from "@radix-ui/react-tooltip";
import { AlertCircle, Check, ChevronsUpDown, Info } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useActionState, useEffect, useState, useTransition } from "react";

interface FormInputKaryawanProps {
  className?: string;
  type?: string;
  title?: string;
  isCost?: boolean;
  dataBobot: BobotProps[] | undefined;
  dataKaryawan: Karyawan[] | undefined;
  data?: DetailPenilaianId;
}

const FormInputPenilaianSAW = ({ className, title, isCost = false, type = "add", dataBobot, dataKaryawan, data }: FormInputKaryawanProps) => {
  const [isPending, startTransition] = useTransition();
  const [state, formAction] = useActionState(type == "add" ? addDataPenilaianSAW : (prevState: unknown, formData: FormData) => updateDataPenilaianSAW(prevState, formData), null);
  const { push } = useRouter();

  const [openTooltips, setOpenTooltips] = useState<{ [key: number]: boolean }>({});
  const [bobotId, setBobotId] = useState<{ [key: string]: { id: string; id_kriteria: string } }>({});
  const [open, setOpen] = useState({
    bobot: false,
    karyawan: false,
  });
  const [valueKaryawan, setValueKaryawan] = useState({
    id: type === "edit" ? data?.id_karyawan : "",
    nama_karyawan: type === "edit" ? data?.nama_karyawan : "",
  });

  useEffect(() => {
    if (state?.success) {
      push(`/dashboard/penilaian-saw-${isCost ? "cost" : "benefit"}`);
    }
  }, [state, push, isCost]);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const bobotArray = Object.values(bobotId);

    if (valueKaryawan.id) formData.append("id_karyawan", valueKaryawan.id);
    if (data?.id_penilaian_matrix) formData.append("id_penilaian", data?.id_penilaian_matrix as string);
    formData.append("id_bobot", JSON.stringify(bobotArray));

    startTransition(() => {
      formAction(formData);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, id_bobot: string, id_kriteria: string) => {
    setBobotId((prev) => ({
      ...prev,
      [id_bobot]: { id: id_bobot, id_kriteria },
    }));
  };
  const handleTooltip = (idx: number, isOpen: boolean) => {
    setOpenTooltips((prev) => ({
      ...prev,
      [idx]: isOpen,
    }));
  };

  const handleGenerateErrField = (type: string) => {
    const errorObj = state?.error as Record<string, string[]> | undefined;

    if (errorObj?.[type]) {
      return `Field ${type} is required`;
    }
    return "";
  };

  const handleGenerateDefaultValue = (nama_kriteria: string) => {
    if (data && nama_kriteria in data) {
      return data[nama_kriteria as keyof DetailPenilaianId];
    }
    return "";
  };
  return (
    <div className={cn("flex flex-col round gap-6 w-2/3", className)}>
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
          <form className="dark:bg-gray-800 p-10 rounded-lg" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="no_telp">Pilih Karyawan</Label>
                <Popover
                  open={open.karyawan}
                  onOpenChange={() =>
                    setOpen((prev) => {
                      return {
                        ...prev,
                        karyawan: !prev.karyawan,
                      };
                    })
                  }>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={open.karyawan} className="w-full justify-between capitalize dark:bg-sidebar" disabled={type === "edit"}>
                      {type === "add" ? (valueKaryawan.id ? dataKaryawan!.find((karyawan) => karyawan.nama_karyawan.toLowerCase() === valueKaryawan?.nama_karyawan?.toLowerCase())?.nama_karyawan : "Select karyawan...") : data?.nama_karyawan}
                      {type == "add" && <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command className="w-full">
                      <CommandInput placeholder="Search karyawan..." />
                      <CommandList>
                        <CommandEmpty>No karyawan found.</CommandEmpty>
                        <CommandGroup>
                          {dataKaryawan?.map((karyawan) => (
                            <CommandItem
                              key={karyawan.id}
                              value={karyawan.nama_karyawan}
                              onSelect={(currentValue) => {
                                setValueKaryawan((prev) => {
                                  return {
                                    ...prev,
                                    nama_karyawan: currentValue.toLowerCase(),
                                    id_karyawan: karyawan.id,
                                  };
                                });
                                setOpen((prev) => {
                                  return {
                                    ...prev,
                                    karyawan: false,
                                  };
                                });
                              }}
                              className="capitalize">
                              <Check className={cn("mr-2 h-4 w-4", valueKaryawan.nama_karyawan === karyawan.nama_karyawan ? "opacity-100" : "opacity-0")} />
                              {karyawan.nama_karyawan}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
                <div>
                  <span className="text-sm text-red-500 mt-2">{state?.error?.id_karyawan}</span>
                </div>
              </div>
              {dataBobot?.map((bobot, idx) => (
                <React.Fragment key={idx}>
                  <div className="grid gap-2 grid-cols-3 items-center">
                    <div>
                      <Label htmlFor="nama_kriteria">Kriteria ke - {idx + 1}</Label>
                      <Input id="nama_kriteria" className="capitalize disabled:bg-slate-200 dark:disabled:text-slate-800" disabled defaultValue={bobot.nama_kriteria} />
                    </div>
                    <div>
                      <Label htmlFor="type_kriteria" className="flex items-center mb-2">
                        <span>Tipe kriteria ke - {idx + 1}</span>
                      </Label>
                      <Input id="type_kriteria" className="capitalize disabled:bg-slate-200 dark:disabled:text-slate-800" disabled defaultValue={formatCapitalize(bobot.tipe_kriteria)} />
                    </div>
                    <div>
                      <Label htmlFor="nilai_bobot" className="flex items-center">
                        <Label htmlFor="nilai_bobot" className="flex items-center mb-2">
                          <span>Nilai bobot kriteria ke - {idx + 1}</span>
                        </Label>
                      </Label>
                      <Input id="nilai_bobot" disabled className="disabled:bg-slate-200 dark:disabled:text-slate-800" defaultValue={`${bobot.nilai_bobot * 100}%`} />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="tipe_kriteria" className="mb-2 flex items-center">
                      <span className="mr-2">Masukan nilai kriteria {bobot.nama_kriteria} untuk karyawan ini.</span>
                      <TooltipProvider>
                        <Tooltip open={openTooltips[idx]}>
                          <TooltipTrigger asChild className="cursor-pointer" onClick={() => handleTooltip(idx, !openTooltips[idx])} onMouseEnter={() => handleTooltip(idx, true)} onMouseLeave={() => handleTooltip(idx, false)}>
                            <Info width={15} />
                          </TooltipTrigger>
                          <TooltipContent>
                            <ol className="list-decimal mx-3">
                              <li>Tidak Bagus</li>
                              <li>Kurang</li>
                              <li>Biasa</li>
                              <li>Bagus</li>
                              <li>Bagus Sekali</li>
                            </ol>
                            <TooltipArrow className="dark:fill-white fill-black" />
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </Label>
                    <Input
                      defaultValue={Number(handleGenerateDefaultValue(bobot.nama_kriteria)) ?? 0}
                      name={bobot.nama_kriteria}
                      className="w-1/3 dark:bg-sidebar"
                      type="number"
                      min={1}
                      max={5}
                      placeholder="Masukan angka 1-5"
                      onChange={(e) => handleChange(e, bobot.id, bobot.id_kriteria)}
                    />
                    <div>
                      <span className="text-sm text-red-500 mt-2">{handleGenerateErrField(bobot.nama_kriteria)}</span>
                    </div>
                  </div>
                </React.Fragment>
              ))}
              <div className="flex justify-end">
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Submiting..." : "Submit"}
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default FormInputPenilaianSAW;
