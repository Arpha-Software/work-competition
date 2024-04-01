'use client';

import { ReactNode, useState } from "react";

import cn from "@/tools/cn";

import { ArrowLink } from "../ArrowLink";
import CloseIcon from "/public/icons/exit-button.svg";

type ModalProps = {
  children: ReactNode;
  className?: string;
}

export const Modal = ({ children, className }: ModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  return (
    <>
      <ArrowLink
        href='#'
        onClick={openModal}
        className="mt-10"
      >
        Взяти участь
      </ArrowLink>

      {isOpen ? (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
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
      ) : null}
    </>
  )
}
