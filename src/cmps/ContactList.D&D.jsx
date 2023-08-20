import React from 'react';
import ContactPreview from '../cmps/ContactPreview';
import { Link } from 'react-router-dom';
import { NiceButton } from './NiceButton';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

export default function ContactList({ contacts, onRemoveContact }) {
  const Icon = () => '🏆';

  if (!contacts) return null; // Return something when contacts are not available

  return (
    <section className="contact-list">
      <DragDropContext onDragEnd={() => {
        console.log('drag drop event occurred');
      }}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {contacts.map((contact, index) => (
                <Draggable
                  draggableId={contact.name}
                  key={contact.name}
                  index={index}
                  >

                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps}>
                      <ContactPreview contact={contact} onRemoveContact={onRemoveContact} />
                    </div>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <Link className="add-btn" to="/contact/edit">+</Link>
    </section>
  );
}
