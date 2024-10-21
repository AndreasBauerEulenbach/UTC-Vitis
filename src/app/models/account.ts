export class Account {
  _id: string;
  title: string;
  firstName: string;
  lastName: string;
  dateOfBirth: Date;
  email: string;
  isAdmin: Boolean;
  address: string;
  dateOfRegistration: Date;
  dateOfLastLogin: Date;
  password: string;
  createdAt: Date;
  jwtToken?: string;
  verificationToken: string;
}
