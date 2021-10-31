import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from "@material-ui/icons/Edit";
import {Button, withStyles} from "@material-ui/core";
import CustomInput from "../../creative-components/components/CustomInput/CustomInput";
import './CategoryTableView.css'
import Search from "@material-ui/icons/Search";
import {OBJECT_ARRAY} from "../../utils/StringConstants";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
    const { tableHeaders, classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    /*useEffect(() => {
    tableHeaders.push({ id: 'actionBtn', numeric: true , disablePadding: false, label: 'actions' })
    })*/

    return (
        <TableHead>
            <TableRow>
                {!!tableHeaders && tableHeaders.length > 0
                    ? tableHeaders?.map((headCell, cellIndex) => (
                            <TableCell
                                key={`${headCell.id}-${cellIndex}`}
                                align={headCell.numeric ? 'right' : 'left'}
                                padding={headCell.disablePadding ? 'none' : 'normal'}
                                sortDirection={orderBy === headCell.id ? order : false}
                            >
                                <TableSortLabel
                                    active={orderBy === headCell.id}
                                    direction={orderBy === headCell.id ? order : 'asc'}
                                    onClick={createSortHandler(headCell.id)}
                                >
                                    {headCell.label}
                                    {orderBy === headCell.id ? (
                                        <span className={classes.visuallyHidden}>
                      {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                    </span>
                                    ) : null}
                                </TableSortLabel>
                            </TableCell>
                        ))
                    : ''}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
        display: "flex",
        justifyContent: "space-between",
        marginBottom: '2rem'
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        color: '#3C4858',
        fontWeight: 400
    }

}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, headerName, handleClickHeaderBtn, headerBtnName } = props;

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {headerName}
                </Typography>
            )}

            <Button
                variant="contained"
                color="secondary"

                onClick={() => handleClickHeaderBtn(true)}
            >{headerBtnName}</Button>
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    paper: {
        width: '100%',
        marginBottom: theme.spacing(2),
    },
    table: {
        minWidth: 750,
    },
    visuallyHidden: {
        border: 0,
        clip: 'rect(0 0 0 0)',
        height: 1,
        margin: -1,
        overflow: 'hidden',
        padding: 0,
        position: 'absolute',
        top: 20,
        width: 1,
    },
}));

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

const CustomTableView = ({ rows,
    tableHeaders,
    headerName,
    colsNotToShow=[''],
    defaultSortCol='',
    handleClickEditBtn,
    handleClickHeaderBtn,
    headerBtnName,
    handleClickDeleteBtn,
}) => {

    const classes = useStyles();
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState(defaultSortCol);
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(8);

    const [searchField, setSearchField] = useState('')
    const [searchedRows, setSearchedRows] = useState([])


    useEffect(() => {
        setSearchedRows(rows)
    }, [rows])


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = searchedRows?.map((n) => n.name);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    }

    const handleSearch = (e) => {
        setSearchField(prevState => {
            setSearchedRows([...rows.filter(row =>
                row['attributeName']?.toLowerCase()?.includes(e.toLowerCase()) ||
                row['attributeGroup']?.toLowerCase()?.includes(e.toLowerCase()) ||

                row['categoryName']?.toLowerCase()?.includes(e.toLowerCase()) ||
                row['categoryDescription']?.toLowerCase()?.includes(e.toLowerCase())
            )])
            return e
        })
    }

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, searchedRows.length - page * rowsPerPage);

    return <div className={classes.root}>
        <Paper className={classes.paper}>
            <EnhancedTableToolbar
                numSelected={selected.length}
                headerName={headerName}
                headerBtnName={headerBtnName}
                handleClickHeaderBtn={handleClickHeaderBtn} />
            <TableContainer>
                <div className='table-search-section'>
                    <CustomInput
                        labelText="Search..."
                        id="search_field"
                        formControlProps={{fullWidth: true,}}
                        value={searchField}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                    <div
                        className='search-icon-wrapper'
                        aria-label="search-icon">
                        <Search className='search-icon' />
                    </div>
                </div>
                <Table
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        tableHeaders={tableHeaders}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={searchedRows?.length}
                    />
                    <TableBody>
                        {!!searchedRows && searchedRows.length > 0
                            ? stableSort(searchedRows, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row, index) => {
                                    const isItemSelected = isSelected(row.name);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <StyledTableRow
                                            className='table-row'
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={`${row.name}-${index}`}
                                            selected={isItemSelected}
                                        >
                                            {Object.keys(row).filter(x => !colsNotToShow.includes(x))
                                                .map((key, cellIndex) => <TableCell id={key} key={`${labelId}-${cellIndex}`} align={cellIndex > 0 ? 'right' : 'left'}>
                                                    { ( !row[key] || row[key] === '' || row[key].length === 0)
                                                        ? '-'
                                                        : Object.prototype.toString.call(row[key]) === OBJECT_ARRAY
                                                            ? row[key].map((v, i) => <div key={i} style={{width: '100%'}}>{v}</div>)
                                                            : row[key].toString()}
                                                </TableCell>)
                                            }

                                            <TableCell key={labelId+'actionBtns'} align='right'>
                                                <IconButton aria-label="edit" style={{color: 'green', marginRight: '.3rem'}} size="small" onClick={() => handleClickEditBtn(row)}>
                                                    <EditIcon fontSize="inherit" />
                                                </IconButton>
                                                <IconButton aria-label="delete" color='secondary' size="small" onClick={() => handleClickDeleteBtn(row)}>
                                                    <DeleteIcon fontSize="inherit" />
                                                </IconButton>
                                            </TableCell>
                                        </StyledTableRow>
                                    );
                                })
                            : ''}
                        {emptyRows > 0 && (
                            <TableRow style={{ height: (dense ? 33 : 53) * emptyRows }}>
                                <TableCell colSpan={6} />
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[8, 10]}
                component="div"
                count={searchedRows?.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>


    </div>
}

export default CustomTableView