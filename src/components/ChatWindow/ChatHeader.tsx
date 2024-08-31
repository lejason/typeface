import React from 'react';
import { Typography } from '@mui/material';
import { getThreadUsersDisplayName } from '../../utils/utils';
import styled from '@emotion/styled';
import { useThreadContext } from '../../hooks/Context';
import { COLORS } from '../../constants/colors';


export const ChatHeader = () => {

    const CustomTypography = styled(Typography)`
        font-size: 1.6rem;
        color: ${COLORS.background.light}
    ;`

    const { selectedThread } = useThreadContext();

    if (!selectedThread) return null;

    return <CustomTypography>{getThreadUsersDisplayName(selectedThread)}</CustomTypography>
}