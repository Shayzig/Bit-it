import React, { useEffect, useState } from 'react'
import { contactService } from '../services/contact.service'
import ContactList from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import ContactDetails from './ContactDetails'

export default function ContactPage({ onSelectContact }) {
    const [contacts, setContacts] = useState(null)
    const [selectedContact, setSelectedContact] = useState(null)
    const [filterBy, setFilterBy] = useState({
        name: '',
        phone: '',
    })

    async function getContacts() {
        const contacts = await contactService.getContacts(filterBy)
        setContacts(contacts)
    }

    useEffect(() => {
        getContacts()
    }, [filterBy])

    function onChangeFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveContact(contactId) {
        try {
            await contactService.deleteContact(contactId)
            getContacts()
        } catch (error) {
            console.log('error:', error)

        }
    }

    return (
        <div className="contacts-index">
            {!selectedContact ?
                <>
                    <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
                    < ContactList
                        onRemoveContact={onRemoveContact}
                        contacts={contacts} />
                </> :
                <ContactDetails contactId={selectedContact} />
            }
        </div>
    )
}
