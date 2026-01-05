// utils/testData.ts
export const TestData = {
  validUser: {
    username: 'admin',
    password: 'admin'
  },
  
   invalidLoginCases: [
    {
      username: '',
      password: '',
      expectedMessage: 'Please fill out Username and Password.',
    },
    {
      username: '@Password123',
      password: '@Password123',
      expectedMessage: 'User does not exist.',
    },
    {
      username: '@Password123',
      password: 'admin',
      expectedMessage: 'User does not exist.',
    },
    {
      username: 'Admin',
      password: 'Password123',
      expectedMessage: 'Wrong password.',
    },
  ],
};
