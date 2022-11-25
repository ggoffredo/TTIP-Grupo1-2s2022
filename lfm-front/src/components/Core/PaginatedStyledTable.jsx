import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {styled} from '@mui/material/styles';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Utils from "../../helpers/Utils";
import {TablePagination} from "@mui/material";
import {useState} from "react";
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import PropTypes from 'prop-types';

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

const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

const TablePaginationActions = (props) => {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (event) => {
        onPageChange(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onPageChange(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="primer página"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="página anterior">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="próxima página"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="última página"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

const TableHeadComponent = (headers) => (
    <TableHead>
        <TableRow>
            {headers.map((header) => {
                return <StyledTableCell align="center" key={header}>{Utils.capitalize(header)}</StyledTableCell>
            })}
        </TableRow>
    </TableHead>
);

const TableBodyComponent = (data, headers, emptyRows) => (
    <TableBody>
        {data.map((row, i) => (
            <StyledTableRow key={`${row.name}-${i}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                {headers.map((header, k) => {
                    return <StyledTableCell align="center" key={`${header}-${k}`}>{row[header.toLowerCase()]}</StyledTableCell>
                })}
            </StyledTableRow>
        ))}
        {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
            </TableRow>
        )}
    </TableBody>
);

const PaginatedStyledTable = ({data, headers}) => {

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getData = () => {
        return rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage);

    return <>
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                {TableHeadComponent(headers)}
                {TableBodyComponent(getData(), headers, emptyRows)}
            </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={data.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
            getItemAriaLabel={(type) => { return `Ir a ${type === 'next' ? 'próxima página' : 'página anterior'}`}}
            labelRowsPerPage={'Elementos por página:'}
        />
    </>;
}

export default PaginatedStyledTable;