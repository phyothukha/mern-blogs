import { IconAlertTriangleFilled } from "@tabler/icons-react";
import { FC } from "react";

interface ConfimrProps {
  modalid: string;
  onConfirm: () => void;
}

const ConfirmModal: FC<ConfimrProps> = ({ modalid, onConfirm }) => {
  return (
    <dialog id={modalid} className="modal">
      <div className="modal-box bg-red-900">
        <div className=" text-center">
          <IconAlertTriangleFilled className="mx-auto w-24 h-24" />
        </div>
        <h3 className=" text-center">Are you sure you want to delete this!</h3>
        <div className="modal-action">
          <form method="dialog" className=" w-full text-center space-x-4">
            <button className=" btn btn-outline btn-error btn-lg">
              Cancel
            </button>
            <button className="btn btn-success btn-lg" onClick={onConfirm}>
              Confirm
            </button>
          </form>
        </div>
      </div>
    </dialog>
  );
};

export default ConfirmModal;
