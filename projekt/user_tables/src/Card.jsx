import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import ItemTypes from './ItemTypes'
import useModal from './hooks/useModal';
import useDeleteModal from './hooks/useDeleteModal';
import Modal from './Modal';
import DeleteModal from './DeleteModal';
const style = {
  border: '1.15px solid gray',
  padding: '0.5rem 1rem',
  marginBottom: '.5rem',
  backgroundColor: 'white',
  cursor: 'move',
}


const Card = ({ id, text, index, moveCard, card, onDeleteUser, editName, editLast, editEmail, editNat, editPost, editCity, onSubmitUser}) => {

  
  const {isShowing, toggle} = useModal();
  const {isVisible, trigger} = useDeleteModal();

  const ref = useRef(null)
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current.getBoundingClientRect()
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
      // Determine mouse position
      const clientOffset = monitor.getClientOffset()
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex)
      item.index = hoverIndex
    },
  })
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  })
  const opacity = isDragging ? 0 : 1
  drag(drop(ref))
  return (
    <div ref={ref} style={{ ...style, opacity }}>
    <p>
      <button onClick={trigger} className="close-button">&times;</button>
        <DeleteModal
          isVisible={isVisible}
          hide={trigger}
          index = {index}
          onDeleteUser = {onDeleteUser}
        />
      <span onClick={toggle} className="correct">
        {text}
        </span>
         <Modal
           isShowing={isShowing}
           hide={toggle}
           user= {card}
           editName = {editName}
           editLast = {editLast}
           editEmail = {editEmail}
           editNat = {editNat}
           editPost = {editPost}
           editCity = {editCity}
           onSubmitUser = {onSubmitUser}
           index = {index}
           />
          
          
      </p>
    </div>
  )
}
export default Card


   
      
    
    
