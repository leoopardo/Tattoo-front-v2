enum UserRole {
  ARTIST = "ARTIST",
  CLIENT = "CLIENT",
}

interface User {
  _id: string;
  profilePicture: string;
  email: string;
  firstname: string;
  lastname: string;
  role: UserRole;
  phoneNumber: string;
  country: string;
  state: string;
  city: string;
}

export default User;
