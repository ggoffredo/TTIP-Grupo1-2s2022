import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import Utils from "../../helpers/Utils";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        fontSize: 14,
        fontWeight: 600,
        lineHeight: 1,
        letterSpacing: 0.5,
        textTransform: 'uppercase',
        fontFamily: 'Inter, sans-serif'
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
        fontFamily: 'Inter, sans-serif'
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
                return <StyledTableCell align="center" key={header}>{Utils.capitalize(header)}</StyledTableCell>
            })}
        </TableRow>
    </TableHead>
);

const TableBodyComponent = (data, headers) => (
    <TableBody>
        {data.map((row, i) => (
            <StyledTableRow key={`${row.name}-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {headers.map((header, k) => {
                    return <StyledTableCell align="center" key={`${header}-${k}`}>{row[header.toLowerCase()]}</StyledTableCell>
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