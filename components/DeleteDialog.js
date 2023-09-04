import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react';

const DeleteDialog = ({ open, handleClose, handleDeleteConfirm }) => {
  return (
    <Dialog open={open}>
      <DialogHeader>Are you sure?</DialogHeader>
      <DialogBody divider>This action is irreversible.</DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="green"
          onClick={handleClose}
          className="mr-1"
        >
          <span>Cancel</span>
        </Button>
        <Button variant="gradient" color="red" onClick={handleDeleteConfirm}>
          <span>Confirm</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default DeleteDialog;
