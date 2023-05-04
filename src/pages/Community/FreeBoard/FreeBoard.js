import * as React from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles, TableFooter } from '@material-ui/core';
// import TableSortLabel from "@material-ui/core/TableSortLabel";
import { Pagination } from '@mui/material';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
// import axios from "axios";
import CustomButton from "../../Login/CustomButton";

const theme = createTheme({
    palette: {
        type: "light",
        primary: {
            main: "#FBD385",
        },
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.common.black,
        fontWeight: "bold",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const useStyles = makeStyles({  // 게시글 목록 css
    title: {
        textAlign: "center"
    },

    table: {
        margin: "auto",
        maxWidth: 1200,
        minWidth: 700,
        // overflow: "hidden"
    },

    pagination: {
        display: "flex",
        justifyContent: "center",
    },

    write: {
        display: "flex",
        float: "right"
        // display: "flex",
        // justifyContent: "center",
    },

    writelink: {
        textDecoration: "none",
    },
});

const columns = [
    {
        id: "num",
        label: "No.",
        minWidth: 10,
        align: "left"
    },
    {
        id: "subject",
        label: "제목",
        minWidth: 400,
        align: "center",
    },
    {
        id: "writer",
        label: "작성자 ",
        minWidth: 50,
        align: "right",
    },
    {
        id: "views",
        label: "조회수",
        minWidth: 50,
        align: "right",
    },
    {
        id: "date",
        label: "작성날짜 ",
        minWidth: 60,
        align: "right",
    },
];

function createData(num, subject, writer, views, date) {
    return { num, subject, writer, views, date };
}

const rows = [
    createData('001', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('002', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.19'),
    createData('003', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.22'),
    createData('004', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.23'),
    createData('005', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.24'),
    createData('006', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.27'),
    createData('007', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.28'),
    createData('008', '똘이를 찾았습니다 ㅠㅠㅠ[3]', '똘이엄마', 31, '23.04.29'),
];

export default function CustomizedTables() {
    const classes = useStyles();    // css 적용을 위한 선언문.

    /* sort start */
    // 날짜 sort 기능을 위한 상수 저장 정의
    const [rowData, setRowData] = useState(rows);
    const [orderDirection, setOrderDirection] = useState("asc");

    // 날짜 정렬 요청 처리
    const sortArray = (arr, orderBy) => {
        switch (orderBy) {
            case "asc":
            default:
                return arr.sort((a, b) =>
                    a.date > b.date ? 1 : b.date > a.date ? -1 : 0
                );
            case "desc":
                return arr.sort((a, b) =>
                    a.date < b.date ? 1 : b.date < a.date ? -1 : 0
                );
        }
    };

    const handleSortRequest = () => {
        setRowData(sortArray(rows, orderDirection));
        setOrderDirection(orderDirection === "asc" ? "desc" : "asc");
    };
    /* sort end */


    /* pagenation start */
    const [page, setPage] = React.useState(1)
    const rowsPerPage = 5;
    // const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (event, newPage) => {
        setPage(newPage)
    }

    // const handleChangeRowsPerPage = (event) => {
    //     setRowsPerPage(parseInt(event.target.value, 10))
    //     setPage(0)
    // }
    /* pagenation end */

    /* axios start */
    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axios
    //         .get("https://jsonplaceholder.typicode.com/users")
    //         .then((res) => {
    //             setData(res.data);
    //             console.log("Result:", data);
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // }, []);
    /* axios end */

    return (
        <>
            <ThemeProvider theme={theme}>
                <h1 className={classes.title}>자유 게시판</h1>
                <TableContainer component={Paper}>
                    <Table aria-label="customized table" className={classes.table}>
                        <TableHead>
                            <StyledTableRow>
                                {columns.map((column) => (
                                    <StyledTableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                        onClick={handleSortRequest}
                                    >
                                        {column.label}
                                    </StyledTableCell>
                                ))}
                            </StyledTableRow>
                            {/* <StyledTableCell>No.</StyledTableCell>
                            <StyledTableCell align="center" style={{ fontSize: 15 }}>제목</StyledTableCell>
                            <StyledTableCell align="right">작성자</StyledTableCell>
                            <StyledTableCell align="right">조회수</StyledTableCell>
                            <StyledTableCell align="right" onClick={handleSortRequest}>
                                <TableSortLabel active={false} direction={orderDirection}>
                                    작성일
                                </TableSortLabel>
                            </StyledTableCell> */}
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(
                                    (page - 1) * rowsPerPage,
                                    (page - 1) * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <StyledTableRow key={row.num}>
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <StyledTableCell key={column.id} align={column.align}>
                                                        <Link
                                                            to="/freeboard/detail"
                                                            style={{ textDecoration: "none", color: "black" }}
                                                        >
                                                            {value}
                                                        </Link>
                                                    </StyledTableCell>
                                                );
                                            })}
                                        </StyledTableRow>
                                    );
                                })}
                        </TableBody>
                        <TableFooter>

                        </TableFooter>

                    </Table>
                </TableContainer>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Link className={classes.writelink} to="/freeboard/write">
                        <CustomButton label="글쓰기" value="글쓰기">
                            글쓰기
                        </CustomButton>
                    </Link>
                </div>
                <br />
                <Stack spacing={2} sx={{ mt: 0 }}>
                    <Pagination
                        className={classes.pagination}
                        color="primary"
                        page={page}
                        onChange={handleChangePage}
                        // onChangeRowsPerPage={handleChangeRowsPerPage}
                        component="div"
                        count={Math.ceil(rows.length / rowsPerPage)}
                    />
                </Stack>
                <br />
            </ThemeProvider>
        </>


    );
}

{/* <Link className={classes.writebtn} to="/freeboard/write">
                        <WriteButton label="글쓰기" value="글쓰기">
                            글쓰기
                        </WriteButton>
                    </Link>
                    <TableFooter>
                        <TableRow>
                            <Stack spacing={2} sx={{ mt: 2 }}>
                                <Pagination
                                    className={classes.pagination}
                                    color="primary"
                                    page={page}
                                    onChange={handleChangePage}
                                    // onChangeRowsPerPage={handleChangeRowsPerPage}
                                    component="div"
                                    count={Math.ceil(rows.length / rowsPerPage)}
                                />
                            </Stack>
                        </TableRow>
                    </TableFooter> */}