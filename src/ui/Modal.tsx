import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { IoMdClose } from "react-icons/io";

const ModalContext = createContext();
function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  return (
    <ModalContext.Provider value={{ isOpen, open, close }}>
      {children}
    </ModalContext.Provider>
  );
}

function Open({ children }) {
  const { open } = useContext(ModalContext);
  return cloneElement(children, { onClick: open });
}
function Close({ children }) {
  const { close } = useContext(ModalContext);
  return cloneElement(children, {
    onClick: () => {
      if (children.props.onClick) children.props.onClick();
      close();
    },
  });
}

function Window({ children, title }) {
  const { isOpen, close } = useContext(ModalContext);

  function stopPropagation(e) {
    return e.stopPropagation();
  }

  return (
    isOpen &&
    createPortal(
      <div
        className="fixed left-0 top-0 h-screen w-full bg-black bg-opacity-75"
        onClick={close}
      >
        <div
          onClick={stopPropagation}
          className=" h-[60%] overflow-auto fixed left-[50%] top-[50%] min-w-[90%] translate-x-[-50%]  translate-y-[-50%] transform rounded-3xl border-2 border-main-200 bg-main-100 px-3 py-6 text-main-900  dark:border-main-700 dark:bg-main-900 dark:text-stone-50 sm:min-w-[50%] sm:px-6 sm:py-12"
        >
          <button
            className=" absolute right-4 top-4 transform text-3xl transition-all hover:scale-110 hover:text-main-600 "
            onClick={close}
          >
            <IoMdClose />
          </button>
          {title && (
            <h2 className=" mr-auto inline-block border-b-2 border-main-700 pb-2 pl-4 pr-6 text-start  text-xl font-bold capitalize sm:pr-0 sm:text-2xl lg:text-4xl ">
              {title}
            </h2>
          )}
          <div className="px-2 py-4 sm:px-4 sm:py-8">{children}</div>
        </div>
      </div>,
      document.getElementById("root")
    )
  );
}

Modal.Open = Open;
Modal.Window = Window;
Modal.Close = Close;
export { ModalContext };
export default Modal;
