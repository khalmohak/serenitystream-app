interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface UserRegister {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  countryCode: string;
  phoneNumber: string;
}
