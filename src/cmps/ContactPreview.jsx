import React from 'react'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons'
import logoImage from '../assets/imgs/contact.png';





export default function ContactPreview({ contact, onRemoveContact }) {
  return (
    <div className="contact-preview">
      <Link to={`/contact/${contact._id}`} >
        <img className='contact-avatar' src={logoImage} />
      </Link>
      <div className="info">
        <Link to={`/contact/${contact._id}`} >
          <h2 className='contact-name' >{contact.name}</h2>
          <h2 className='contact-phone'>{contact.phone}</h2>
        </Link>
      </div>
      {/* <div className="details"> */}
      {/* </div> */}

      <section className='actions'>

        <FontAwesomeIcon onClick={() => onRemoveContact(contact._id)}
          icon={faSquareMinus} style={{ color: "#c7e6f0", }} />

        <Link to={`/contact/edit/${contact._id}`} >
          <FontAwesomeIcon
            icon={faPenToSquare} style={{ color: "#c7e6f0", }}
          />
        </Link>
      </section>

    </div >
  )
}
