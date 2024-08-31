import React, { useState } from 'react';
import { Box, IconButton, TextField, Tooltip } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useThreadContext } from '../../hooks/Context';
import styled from '@emotion/styled';
import { COLORS } from '../../constants/colors';


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

    const SendButton = styled(SendIcon)`
        font-size: 42px;
        color: ${COLORS.icon.medium};
        transition: color 0.2s ease, transform 0.2s ease;
        
        &:hover {
            color: ${COLORS.icon.primary}
            transform: scale(1.1);
        }
        `;

    return (
        <Box
            sx={{
                display: 'flex',
                alignSelf: 'flex-end',
                alignItems: 'center',
                marginButton: '1rem',
                backgroundColor: COLORS.background.light,
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
                sx={{
                    '& .MuiOutlinedInput-root': {
                        padding: '8px',
                        fontSize: '16px',
                        borderRadius: '8px',
                        '& .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.background.light,
                        },
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.background.light,
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                            borderColor: COLORS.background.light,
                        },
                    },
                }}
            />
            <IconButton onClick={handleSubmitMessage} sx={{ marginLeft: '8px' }}>
                <Tooltip title="Click to send!">
                    <SendButton />
                </Tooltip>
            </IconButton>
        </Box>
    );
};
