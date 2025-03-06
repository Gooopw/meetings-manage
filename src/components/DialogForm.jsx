import { Dialog, DialogActions, DialogContent, DialogTitle, TextField, Button } from "@mui/material";
import { Save, Cancel } from "@mui/icons-material";
import PropTypes from "prop-types";

const DialogForm = ({ open, onClose, onSubmit, formValues, onChange, title }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {Object.keys(formValues).map((field) => (
          <TextField
            key={field}
            label={field}
            fullWidth
            name={field}
            value={formValues[field]}
            onChange={onChange}
            style={{ marginBottom: "15px" }}
          />
        ))}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="contained" startIcon={<Cancel />}>
          取消
        </Button>
        <Button onClick={onSubmit} color="primary" variant="contained" startIcon={<Save />}>
          保存
        </Button>
      </DialogActions>
    </Dialog>
  );
};

DialogForm.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  formValues: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

export default DialogForm;
