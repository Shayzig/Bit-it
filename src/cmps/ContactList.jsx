import React from 'react'
import ContactPreview from '../cmps/ContactPreview'
import { Link } from 'react-router-dom'



export default function ContactList({ contacts, onRemoveContact }) {
  if (!contacts) return
  return (
    <section className="contact-list">
      {contacts.map(contact =>
        <ContactPreview
          key={contact._id}
          contact={contact}
          onRemoveContact={onRemoveContact}
        />
      )}
      <Link className="add-btn" to="/contact/edit">+</Link>
    </section>
  )
}

