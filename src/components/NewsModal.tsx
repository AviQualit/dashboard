import Modal from "@material-ui/core/Modal";
import React, { useEffect, useState, FC } from "react";

export type modalProps = {
  htmlAddress: string;
};
const NewsModal: FC<modalProps> = (props) => {
  const [open, setOpen] = useState(true);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div dangerouslySetInnerHTML={{ __html: props.htmlAddress }} />
      </Modal>
    </div>
  );
};

export default NewsModal;
