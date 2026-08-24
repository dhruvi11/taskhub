"use client";

import {
  Button,
  ButtonProps,
} from "@mui/material";

export default function AppButton({
  children,
  ...props
}: ButtonProps) {
  return (
    <Button
      variant="contained"
      {...props}
      className="rounded-lg px-5 py-2.5 normal-case"
    >
      {children}
    </Button>
  );
}