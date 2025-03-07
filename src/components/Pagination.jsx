import { TablePagination } from "@mui/material";
import PropTypes from "prop-types";

const Pagination = ({ count, rowsPerPage, page, onPageChange }) => {
  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      component="div"
      count={count}
      rowsPerPage={rowsPerPage}
      page={page}
      onPageChange={onPageChange}
      labelRowsPerPage="每页显示"
    />
  );
};

Pagination.propTypes = {
    count: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
  };
export default Pagination;
