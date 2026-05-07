import { FunctionComponent, MouseEventHandler } from 'react';

type TModal = {
  showModal: boolean;
  title: string;
  text: string;
  callback: MouseEventHandler;
  children?: React.ReactNode;
  classValue?: string;
};

const Modal: FunctionComponent<TModal> = ({
  title,
  text,
  showModal,
  callback,
  children,
  classValue,
}) => {
  return (
    <>
      <dialog className={`modal ${showModal ? 'modal-open' : ''}`}>
        <div className={`modal-box bg-white text-slate-900 dark:bg-slate-800 dark:text-slate-100 ${classValue}`}>
          <h3 className="font-bold text-lg">{title}</h3>
          <p className="py-4 text-slate-700 dark:text-slate-200">{text}</p>
          {children}
          <div className="modal-action">
            <button className="btn" onClick={callback}>
              OK
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Modal;
