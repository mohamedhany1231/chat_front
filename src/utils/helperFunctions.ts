export function sortContacts(
  cons: contact[],
  activeChat: messageOptions,
  message: string
) {
  const newContacts: contact[] = [cons[0]];
  cons.forEach((contact) => {
    contact.contactId === activeChat.destinationId
      ? (newContacts[0] = { ...contact, message })
      : newContacts.push(contact);
  });

  return newContacts;
}
