import { contactService } from "../../services/contact.service"
import { REMOVE_CONTACT, SET_CONTACTS, SET_FILTER_BY, SET_CONTACT, UPDATE_CONTACT } from "../reducers/contact.reducer";
import { store } from "../store";

export async function loadContacts() {
    try {
        const filterBy = store.getState().contactModule.filterBy
        const contacts = await contactService.getContacts(filterBy)
        const action = {
            type: SET_CONTACTS,
            contacts
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}

export async function removeContact(contactId) {
    try {
        await contactService.deleteContact(contactId)
        const action = {
            type: REMOVE_CONTACT,
            contactId
        }
        store.dispatch(action)
    } catch (error) {
        console.log(error)
    }
}

export async function loadContact(contactId) {
    try {
        const contact = await contactService.getContactById(contactId)
        const action = {
            type: SET_CONTACT,
            contact
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }
}

export async function updateContact(contact) {
    try {
        const updatedContact = await contactService.saveContact(contact)
        const action = {
            type: UPDATE_CONTACT,
            updatedContact
        }
        store.dispatch(action)
    } catch (error) {
        console.log('error:', error)
    }

}

export async function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy })
}


//FILTER BY IN STORE

