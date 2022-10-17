enum UserRole {
  ARTIST = "ARTIST",
  CLIENT = "CLIENT",
}

interface User {
  _id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
}

export default User;
