import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

export interface Props {
  type: "announcement" | "question";
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleDelete: () => any;
}

const DeleteDialog: React.FC<Props> = ({
  type,
  isOpen,
  setIsOpen,
  handleDelete,
}) => {
  return (
    <Dialog
      open={isOpen}
      aria-labelledby="delete-dialog-title"
      aria-describedby="delete-dialog-description"
    >
      <DialogTitle id="delete-dialog-title">
        {"Delete " + type + "?"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-dialog-description">
          Are you sure you want to delete this {type}? Once you delete it, it's
          gone forever.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsOpen(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={() => handleDelete()} color="primary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default DeleteDialog;
