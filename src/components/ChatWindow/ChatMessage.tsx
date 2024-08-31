import React from 'react';
import { Box, IconButton, Tooltip } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { getTimeOfDay, getUserDislpayName } from '../../utils/utils';
import styled from '@emotion/styled';
import { Message } from '../../types/Message';
import { COLORS } from '../../constants/colors';
import { useThreadContext } from '../../hooks/Context';
import { Confirm } from '../Dialog/Confirm';

interface ChatMessageProps {
    parentThreadID: string;
    message: Message;
    messageIndex: number;
}

export const ChatMessage = ({ parentThreadID, message, messageIndex }: ChatMessageProps) => {

    const Container = styled(Box)`
        padding: 0 0 1rem 0;
        margin: 0;
        display: flex;
        width: 100%;
        flex-direction: column;
        &:hover .delete-icon {
            visibility: visible;
        }
    `;

    const Header = styled(Box)`
        display: flex;
        flex-direction: row;
        align-items: center;
        flex: 1;
        width: 100%;
        position: relative;
    `;

    const UserName = styled(Box)`
        display: flex;
        flex-shrink: 1;
        width: auto;
        color: ${COLORS.text.secondary};
        font-size: .7rem;
        font-weight: bold;
    `;

    const Timestamp = styled(Box)`
        display: flex;
        font-size: .6rem;
        margin-left: .25rem;
        text-decoration: italic;
        color: ${COLORS.text.accent};
    `;

    const Body = styled(Box)`
        padding: .5rem 0;
        font-size: 1.1rem;
        color: ${COLORS.text.primary};
    `;

    const DeleteButtonContainer = styled(IconButton)`
        position: absolute;
        right:0;
        visibility: hidden;
    `;

    const DeleteButton = styled(ClearIcon)`
        color: ${COLORS.icon.medium};
        cursor: pointer;
        font-size: 18px;
        &:hover {
            color:${COLORS.icon.light};
        }
    `;

    const { deleteMessage } = useThreadContext();

    const handleClickDelete = () => {
        console.log("deleteing")
        deleteMessage(parentThreadID, messageIndex)
    }

    return (
        <Container>
            <Header>
                <UserName>{getUserDislpayName(message.fromUser)}</UserName>
                <Timestamp>{getTimeOfDay(message.sent)}</Timestamp>
                <Confirm onConfirm={handleClickDelete} message="Are you sure you want to delete this message?">
                    <DeleteButtonContainer className="delete-icon">
                        <Tooltip title="Delete Message">
                            <DeleteButton />
                        </Tooltip>
                    </DeleteButtonContainer>
                </Confirm>
            </Header>
            <Body>{message.body}</Body>
        </Container >
    );
};
