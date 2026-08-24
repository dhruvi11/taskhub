"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface AppDialogProps {
  open: boolean;
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  onConfirm?: () => void;
  confirmText?: string;
}

export default function AppDialog({
  open,
  title,
  children,
  onClose,
  onConfirm,
  confirmText = "Save",
}: AppDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >

      <DialogTitle>
        {title}
      </DialogTitle>

      <DialogContent>
        {children}
      </DialogContent>

      <DialogActions>

        <Button onClick={onClose}>
          Cancel
        </Button>

        {onConfirm && (
          <Button
            variant="contained"
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        )}

      </DialogActions>

    </Dialog>
  );
}