import ConfirmModal from "../components/confirmmodal";

const UseConfirm = () => {
  return (
    <div>
      <button
        className="btn"
        onClick={() =>
          (
            document.getElementById(`delete modal`) as HTMLDialogElement
          ).showModal()
        }
      >
        open modal
      </button>

      <ConfirmModal
        modalid={`delete modal`}
        onConfrim={() => console.log("hello")}
      />
    </div>
  );
};

export default UseConfirm;
