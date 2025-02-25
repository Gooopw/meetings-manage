import { Alert, Snackbar } from "@mui/material";
import PropTypes from 'prop-types';

// 通用提示框组件
const AlertBox = ({ open, onClose, message, severity, autoHideDuration }) => {
  return (
    <Snackbar open={open} autoHideDuration={autoHideDuration || 6000} onClose={onClose} anchorOrigin={{ vertical: "top", horizontal: "center" }}>
      <Alert onClose={onClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

AlertBox.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired,
    severity: PropTypes.oneOf(['error', 'warning', 'info', 'success']).isRequired,
    autoHideDuration: PropTypes.number,
  };

export default AlertBox;
