// message
interface messageOptions {
  destinationId: string;
  // socketId: string;
  destinationType: destination;
}
type destination = "group" | "user";

interface message {
  from: string;
  content: string;
  sentAt: date;
  readBy: string[];
  type?: destination;
  isRead?: boolean;
  groupId?: string;
  to?: string;
}

// contacts
interface addContactRequest {
  userEmail: string;
}

interface contact {
  name: string;
  message: string;
  contactId: string;
  id?: string;
  photo?: string;
  email?: string;
  socket?: string;
  type: destination;
}
// user
interface loginObject {
  email: string;
  password: string;
}

interface signUpObject {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
}

// group

interface userGroupOption {
  userId: string;
  groupId: string;
}

interface user {
  id: string;
  name: string;
  email: string;
  photo: string;
}
