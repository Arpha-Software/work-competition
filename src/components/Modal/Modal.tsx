import { ReactNode } from "react";

import cn from "@/tools/cn";

import CloseIcon from "/public/icons/exit-button.svg";

type ModalProps = {
  children: ReactNode,
  className?: string,
  closeModal: () => void,
}

export const Modal = ({
  children,
  className,
  closeModal,
}: ModalProps) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-20">
      <div
        className="w-full h-full opacity-20 backdrop-blur bg-black"
        onClick={closeModal}
      />

      <div className={cn("absolute bg-white shadow z-1 py-10 px-15 rounded", className)}>
        <button
          className="absolute top-0 left-0 p-9 w-5 h-5"
          onClick={closeModal}
        >
          <CloseIcon />
        </button>

        { children }
      </div>
    </div>
  )
}
