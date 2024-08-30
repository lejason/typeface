import React, { useState } from 'react';
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button } from '@mui/material';

interface ConfirmProps {
    onConfirm: () => void;
    onCancel?: () => void;
    title?: string;
    message: string;
    children: React.ReactNode;
}

export const Confirm = ({ onConfirm, onCancel, title = "Confirm", message, children }: ConfirmProps) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = () => {
        onConfirm();
        handleClose();
    };

    const handleCancel = () => {
        if (onCancel) {
            onCancel();
        }
        handleClose();
    };

    return (
        <>
            <span onClick={handleOpen}>
                {children}
            </span>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {message}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary" autoFocus>
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};
