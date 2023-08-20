import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import { loadContact, updateContact } from '../store/actions/contact.actions'
import { useSelector } from 'react-redux'

export default function ContactEdit() {

    const params = useParams()
    const navigate = useNavigate()
    const contact = useSelector(state => state.contactModule.contact)
    const [contactToEdit, setContactToEdit] = useState(null)

    useEffect(() => {
        const contactId = params.id
        loadContact(contactId)
        setContactToEdit(contact)
    }, [contact])


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

        setContactToEdit(prevContact => ({
            ...prevContact,
            [field]: value
        }))
    }

    async function onSaveContact(ev) {
        ev.preventDefault()
        try {
            updateContact(contactToEdit)
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
if(!contactToEdit) return 
    const { name, phone } = contactToEdit
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
