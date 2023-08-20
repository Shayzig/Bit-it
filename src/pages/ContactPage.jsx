import React, { useEffect } from 'react'
import ContactList from '../cmps/ContactList'
import { ContactFilter } from '../cmps/ContactFilter'
import { loadContacts, removeContact, setFilterBy } from '../store/actions/contact.actions'
import { useSelector } from 'react-redux'

export default function ContactPage() {

    const contacts = useSelector(state => state.contactModule.contacts) // registed to change in the contacts state
    const filterBy = useSelector(state => state.contactModule.filterBy)

    useEffect(() => {
        loadContacts()
    }, [filterBy])

    function onChangeFilter(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveContact(contactId) {
        try {
            await removeContact(contactId)
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="contacts-index">
            <ContactFilter filterBy={filterBy} onChangeFilter={onChangeFilter} />
            < ContactList
                onRemoveContact={onRemoveContact}
                contacts={contacts} />
        </div>
    )
}

//FILTER BY IN STORE
//LOAD ITEMS FROM STORE
