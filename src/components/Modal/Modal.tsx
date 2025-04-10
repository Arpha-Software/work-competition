import { ReactNode, useEffect } from "react";

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
  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="fixed inset-0 bg-black bg-opacity-20 backdrop-blur"
        onClick={closeModal}
      />

      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4">
          <div className={cn("relative bg-white shadow z-[100] py-10 px-15 rounded", className)}>
            <button
              className="absolute top-0 left-0 p-9 w-5 h-5"
              onClick={closeModal}
            >
              <CloseIcon />
            </button>

            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
