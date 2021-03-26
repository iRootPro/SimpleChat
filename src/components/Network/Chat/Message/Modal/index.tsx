import React from 'react';

const Modal = ({children}: propsType) => {
    return (
        <div>
            {children}
        </div>
    );
};

export default Modal;


type propsType = {
    children: JSX.Element | Array<JSX.Element>
}
