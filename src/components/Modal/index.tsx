


import { FunctionComponent, MouseEventHandler } from 'react';

type TModal = {
    showModal: boolean;
    title: string;
    text: string;
    callback: MouseEventHandler
};

const Modal: FunctionComponent<TModal> = ({ title, text, showModal, callback }) => {
    return (
        <>
            <dialog id="my_modal_2" className={`modal ${showModal ? "modal-open" : ""}`}>
                <div className="modal-box">
                    <h3 className="font-bold text-lg">{title}</h3>
                    <p className="py-4">{text}</p>
                    <div className="modal-action">
                        <button className="btn" onClick={callback}>OK</button>
                    </div>
                </div>
            </dialog>
        </>
    );
};

export default Modal;
