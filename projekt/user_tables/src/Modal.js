import React from 'react';
import ReactDOM from 'react-dom';




const Modal = ({ isShowing, hide, user, editName, editLast, editEmail, editNat, editPost, editCity, onSubmitUser, index }) => isShowing ? ReactDOM.createPortal(
 
  <React.Fragment>
    <div className="modal-overlay"/>
    <div className="modal-wrapper" aria-modal aria-hidden tabIndex={-1} role="dialog">
      <div className="modal">
        <div className="modal-header">
          <button type="button" className="modal-close-button" data-dismiss="modal" aria-label="Close" onClick={hide}>
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-layout">
          <img src={user.picture.large} alt="userPic" className="pic" />
          <input type="text" placeholder={user.name.first} onChange={editName}/>
          
          <input type="text" placeholder={user.name.last} onChange={editLast}/>
          <input type="email" placeholder={user.email} onChange={editEmail}/>
          <input type="text" placeholder={user.nat} onChange={editNat}/>
          <input type="text" placeholder={user.location.postcode} onChange={editPost}/>
          <input type="text" placeholder={user.location.city} onChange={editCity}/>
          <input type="submit" className="button-default" onClick={() => onSubmitUser(index)} />
        </div>
      </div>
    </div>
  </React.Fragment>, document.body
) : null;

export default Modal;

