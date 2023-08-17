
import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ContactDetails({ contactId, onBack }) {

    const [contact, setcontact] = useState(null)
    const params = useParams()
    const navigate = useNavigate()


    useEffect(() => {
        loadcontact()
    }, [])

    async function loadcontact() {
        const contact = await contactService.getContactById(params.id)
        setcontact(contact)
    }

    function onBack() {
        navigate('/contact')
    }

    if (!contact) return <div>Loading...</div>
    return (
        <section className='details-container full' >

            <div className="actions">
                <Link to="/contact">Back</Link>
                <Link to={`/contact/edit/${contact._id}`}>Edit</Link>
            </div>
            <section className='contact-details'>
                <div className="avatar-container">
                    <img className="avatar-contact" src="../../src/assets/imgs/contact.png" alt="" />
                </div>
                {/* <img src={contact.imgUrl} alt="" /> */}
                <h2 className='contact-name'>{contact.name}</h2>
                <h5>{contact.phone}</h5>
                <h6>{contact.email}</h6>
                <div className="transfer-input">
                    <input type="text" />
                    <div className="transfer-btn">
                        <span className='transfer'> Transfer</span></div>
                </div>
            </section>
        </section>

    )
}
