
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import MoveList from '../cmps/MoveList'
import { useSelector } from 'react-redux'
import { loadContact } from '../store/actions/contact.actions'
import { login, updateUser } from '../store/actions/user.actions'


export default function ContactDetails() {

    const contact = useSelector(state => state.contactModule.contact)
    const loggedInUser = useSelector(state => state.userModule.loggedInUser)

    const [coinsAmount, setCoinsAmount] = useState(0)
    const params = useParams()


    useEffect(() => {
        loadContact(params.id)
    }, [])

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = (+value || '')
                break
            case 'checkbox':
                value = target.checked
            default:
                break
        }
        setCoinsAmount(value)
    }

    function onTransferFound() {
        if (loggedInUser.coins < coinsAmount) return
        const move = { to: contact.name, at: new Date().toLocaleString(), amount: coinsAmount };
        const updatedUser = {
            ...loggedInUser,
            coins: loggedInUser.coins - coinsAmount,
            moves: [...loggedInUser.moves, move]
        };
        updateUser(updatedUser)
        login(updatedUser)
    }

    if (!loggedInUser) return
    const contactLastMoves = loggedInUser.moves.filter(move => move.to === contact.name)
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
                <h2 className='contact-name'>{contact.name}</h2>
                <h5>{contact.phone}</h5>
                <h6>{contact.email}</h6>
                <div className="transfer-input">
                    <input onChange={handleChange} type="number" name="amount" id="amount" placeholder='Enter coins' />
                    <div className="transfer-btn" onClick={onTransferFound}>
                        <span className='transfer'> Transfer</span></div>
                </div>
                <MoveList contactLastMoves={contactLastMoves} />
            </section>
        </section>

    )
}
