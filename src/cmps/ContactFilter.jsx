import { useEffect, useState } from "react"

export function ContactFilter(props) {

  const [filterBy, setFilterBy] = useState(props.filterBy)


  useEffect(() => {
    props.onChangeFilter(filterBy)
  }, [filterBy])

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

    setFilterBy(prevFilterBy => ({
      ...prevFilterBy,
      [field]: value
    }))
  }

  const { name, phone } = filterBy
  return (
    <form className='contact-filter full'>
      <section>
        <input className="filter" onChange={handleChange} value={name} type="text" name="name" id="name" placeholder="Search by name" />
      </section>
      <section>
        <input className="filter" onChange={handleChange} value={phone} type="text" name="phone" id="phone" placeholder="Search by phone" />
      </section>
    </form>
  )
}
