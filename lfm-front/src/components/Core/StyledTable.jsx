import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import {capitalize} from "../../helpers/Utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const TableHeadComponent = (headers) => (
    <TableHead>
        <TableRow>
            {headers.map((header) => {
                return <StyledTableCell align="center">{capitalize(header)}</StyledTableCell>
            })}
        </TableRow>
    </TableHead>
);

const TableBodyComponent = (data, headers) => (
    <TableBody>
        {data.map((row) => (
            <StyledTableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {headers.map((header) => {
                    return <StyledTableCell align="center">{row[header.toLowerCase()]}</StyledTableCell>
                })}
            </StyledTableRow>
        ))}
    </TableBody>
);

const StyledTable = ({data, headers}) => {
    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {TableHeadComponent(headers)}
                {TableBodyComponent(data, headers)}
            </Table>
        </TableContainer>
    );
}

export default StyledTable;