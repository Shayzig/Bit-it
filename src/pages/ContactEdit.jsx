import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ContactEdit() {

    const [contact, setContact] = useState(contactService.getEmptyContact())
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadContact()
    }, [])

    async function loadContact() {
        const contactId = params.id
        try {
            if (contactId) {
                const contact = await contactService.getContactById(contactId)
                setContact(contact)
            }
        } catch (error) {
            console.log('error:', error)
        }
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break;
            case 'checkbox':
                value = target.checked
            default:
                break;
        }

        setContact(prevContact => ({
            ...prevContact,
            [field]: value
        }))
    }

    async function onSaveContact(ev) {
        ev.preventDefault()
        try {
            await contactService.saveContact(contact)
            navigate('/contact')
        } catch (error) {
        }
    }

    async function onRemoveContact(contactId) {
        try {
            await contactService.deleteContact(contactId)
            navigate('/contact')
        } catch (error) {
            console.log('error:', error)

        }
    }

    const { name, phone } = contact
    return (
        <section className='contact-edit-container full'>

            <div className="actions">
                <Link to="/contact">Back</Link>
                <div className='remove-contact' onClick={() => onRemoveContact(contact._id)}>Remove</div>
            </div>

            <div className="contact-edit">
                <img className="avatar-contact" src="../../src/assets/imgs/contact.png" alt="" />
                {/* <h1>{contact._id ? 'Edit' : 'Add'} Contact</h1> */}
                <form onSubmit={onSaveContact} className='contact-input' >
                    <input onChange={handleChange} value={name} type="text" name="name" id="name" placeholder='Enter full name' />
                    <input onChange={handleChange} value={phone} type="text" name="phone" id="phone" placeholder='Enter phone number' />
                    {/* <input onChange={handleChange} value={coins} type="text" name="bitcoin" id="bitcoin" placeholder='Bitcoin' /> */}
                    <button className='save-btn'>Save</button>
                </form>
            </div>

        </section>
    )
}
