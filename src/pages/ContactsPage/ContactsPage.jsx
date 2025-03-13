import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact, addContact } from '../../redux/contacts/operations';
import { selectContacts } from '../../redux/contacts/selectors';
import { setFilter } from '../../redux/filters/slice';  // Импортируем действие фильтра
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const filter = useSelector(state => state.filters.filter);  // Получаем фильтр из Redux
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const [newContact, setNewContact] = useState({
    name: '',
    phone: ''
  });

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteContact(id));
  };

  const confirmDelete = () => {
    dispatch(deleteContact(selectedContact));
    setIsModalOpen(false);
    setSelectedContact(null);
  };

  const handleEdit = (contact) => {
    setEditingContact(contact);
  };

  const closeEditForm = () => {
    setEditingContact(null);
  };

  const handleFilterChange = (e) => {
    dispatch(setFilter(e.target.value));  // Обновляем фильтр в Redux
  };

  const handleAddContactChange = (e) => {
    const { name, value } = e.target;
    setNewContact(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleAddContactSubmit = (e) => {
    e.preventDefault();
    if (newContact.name && newContact.phone) {
      dispatch(addContact(newContact));
      setNewContact({ name: '', phone: '' });  // Сбрасываем форму
    }
  };

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className={styles.contacts}>
      <h2>Your Contacts</h2>

      {/* Форма добавления контакта */}
      <form onSubmit={handleAddContactSubmit} className={styles.addForm}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newContact.name}
          onChange={handleAddContactChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newContact.phone}
          onChange={handleAddContactChange}
          required
        />
        <button type="submit">Add Contact</button>
      </form>

      {/* Форма фильтрации */}
      <input
        type="text"
        placeholder="Search contacts"
        value={filter}
        onChange={handleFilterChange}
        className={styles.filterInput}
      />

      {editingContact && (
        <ContactEditForm contact={editingContact} onClose={closeEditForm} />
      )}

      <ul className={styles.list}>
        {filteredContacts.length > 0 ? (
          filteredContacts.map(contact => (
            <li key={contact.id} className={styles.item}>
              <div>
                <strong>{contact.name}</strong>: {contact.number}
              </div>
              <div className={styles.actions}>
                <button onClick={() => handleDelete(contact.id)}>Delete</button>
              </div>
            </li>
          ))
        ) : (
          <li>No contacts found</li>
        )}
      </ul>
    </div>
  );
};

export default ContactsPage;

