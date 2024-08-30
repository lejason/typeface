import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useThreadContext } from '../../hooks/Context';

export const ChatTextInput = () => {
    const [text, setText] = useState('');
    const [rows, setRows] = useState(1);
    const { selectedThread, submitMessage } = useThreadContext();

    const handleSubmitMessage = () => {
        if (selectedThread) {
            submitMessage(selectedThread.threadID, text);
            setText('');
        }
    }

    // Adding this for more intuative usability
    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter' && text.trim() !== '') {
            event.preventDefault();
            handleSubmitMessage();
        }
    };

    const handleInputChange = (
        event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
        setText(event.target.value);
    };

    const handleFocus = () => {
        setRows(5);
    };

    const handleBlur = () => {
        if (text.trim() === '') {
            setRows(1);
        }
    };

    return (
        <Box
            sx={{
                display: 'flex',
                alignSelf: 'flex-end',
                alignItems: 'center',
                padding: '8px',
                border: '1px solid yellow',
                backgroundColor: '#e0e0e0',
                transition: 'all 0.3s ease',
            }}
        >
            <TextField
                fullWidth
                multiline
                rows={rows}
                value={text}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                variant="outlined"
                sx={{
                    '& .MuiOutlinedInput-root': {
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e0e0e0',
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e0e0e0',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: '#e0e0e0',
                        },
                    },
                }}
            />
        </Box>
    );
};
