type UserType = {
  googleId?: string
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  password: string;
  emailVerified: boolean;
  verificationCode: string;
  refreshtoken?: string;
};

export default UserType;
