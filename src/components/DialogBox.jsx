import { Dialog, DialogActions, DialogContent, DialogTitle, Button } from "@mui/material";
import PropTypes from "prop-types";

// 通用对话框组件
const DialogBox = ({ open, onClose, onConfirm, title, message, confirmText, cancelText, confirmIcon, cancelIcon }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{message}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained" startIcon={cancelIcon}>
          {cancelText}
        </Button>
        <Button onClick={onConfirm} color="error" variant="contained" startIcon={confirmIcon}>
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogBox.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onConfirm: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    confirmText: PropTypes.string.isRequired,
    cancelText: PropTypes.string.isRequired,
    confirmIcon: PropTypes.element.isRequired,
    cancelIcon: PropTypes.element.isRequired,
  };

export default DialogBox;
