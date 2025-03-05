"use client";

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface AlertDialogConfirmationProps {
  id: string;
  children: React.ReactNode;
  handleAction: (id: string, noteSupplier?: string) => Promise<boolean>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  ahref: string;
  titleSubmit?: string;
  titleCancel?: string;
}

const AlertDialogConfirmation = ({ id, children, handleAction, setOpen, ahref, titleSubmit = "Delete", titleCancel = "Cancel" }: AlertDialogConfirmationProps) => {
  const { push } = useRouter();

  const handleSubmit = async () => {
    setOpen(false);
    const response = await handleAction(id);
    if (response) {
      push(ahref);
    } else {
      push(ahref);
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            await handleSubmit();
          }}>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>This action cannot be undone. This will permanently {titleSubmit === "Rejected" ? titleSubmit.toLocaleLowerCase() : "delete data and remove data from servers."}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="pt-2">
            <AlertDialogCancel onClick={() => setOpen(false)}>{titleCancel}</AlertDialogCancel>
            <AlertDialogAction className="bg-red-500 dark:text-white dark:hover:text-black" type="submit">
              {titleSubmit}
            </AlertDialogAction>
          </AlertDialogFooter>
        </form>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogConfirmation;
