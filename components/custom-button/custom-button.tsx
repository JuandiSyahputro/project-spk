"use client";

import { Button } from "@/components/ui/button";
import { ButtonHTMLAttributes } from "react";
import { useFormStatus } from "react-dom";
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  title?: string;
  titlePending?: string;
}
const CustomButton = ({ title = "Submit", titlePending = "Submitting...", ...props }: CustomButtonProps) => {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending} {...props}>
      {pending ? titlePending : title}
    </Button>
  );
};

export default CustomButton;
