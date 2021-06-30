// import classes from './Modal.module.css';
// import ReactDOM from 'react-dom';
// import React, { Fragment } from 'react';

// const Backdrop = props => {
//   return <div className={classes.backdrop} onClick={props.onClose} />
// }

// const ModalOverlay = props => {
//   return <div className={classes.modal}>
//     <div className={classes.content}>{props.children}</div>
//   </div>

// }

// const portalElemnt = document.getElementById('overlay-root');

// const Modal = (props) => {
//   return (
//     <Fragment>
//       {ReactDOM.createPortal(<Backdrop onClose={props.onClose}/>, portalElemnt)}
//       {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalElemnt)}
//     </Fragment>
//   )
// }

// export default Modal;
