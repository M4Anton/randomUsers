import React from 'react';
import ReactDOM from 'react-dom';




const DeleteModal = ({ isVisible, hide, index, onDeleteUser }) => isVisible ? ReactDOM.createPortal(
 
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
         <h2>Are You sure?</h2>         
        </div>
        <div className="modal-layout">
          <p>I hope You know what You're doing, there's no coming back!</p>
          <p className="center-par">
          <button className="button-default left" onClick={() => onDeleteUser(index)}>Of course!</button>
          <button className="button-default right" onClick={hide}>Sorry, missclicked!</button>
          </p>
          </div>
        </div>
      </div>
  </React.Fragment>, document.body
) : null;

export default DeleteModal;

