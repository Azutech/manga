type UserType = {
  userId?: string;
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: number;
  password: string;
  emailVerifed: boolean;
  verificationCode: string;
  refreshtoken?: string;
};

export default UserType;
