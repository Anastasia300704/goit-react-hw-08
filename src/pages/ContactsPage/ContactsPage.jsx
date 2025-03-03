import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchContacts, deleteContact } from '../../redux/contacts/operations';
import { getContacts } from '../../redux/contacts/selectors';
import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const [selectedContact, setSelectedContact] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleDelete = (id) => {
    setSelectedContact(id);
    setIsModalOpen(true);
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

  return (
    <div className={styles.contacts}>
      <h2>Your Contacts</h2>
      {editingContact && (
        <ContactEditForm contact={editingContact} onClose={closeEditForm} />
      )}
      <ul className={styles.list}>
        {contacts.map(contact => (
          <li key={contact.id} className={styles.item}>
            <div>
              <strong>{contact.name}</strong>: {contact.number}
            </div>
            <div className={styles.actions}>
              <button onClick={() => handleEdit(contact)}>Edit</button>
              <button onClick={() => handleDelete(contact.id)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
      {isModalOpen && (
        <ConfirmationModal
          isOpen={isModalOpen}
          onRequestClose={() => setIsModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default ContactsPage;
