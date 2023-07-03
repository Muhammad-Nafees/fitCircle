import axios from 'axios';

export const loginIn = async (email: string, password: string) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/login`,
    {
      email,
      password,
    },
  );
  return response;
};

export const resetPassword = async (email: string) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/resetPassword`,
    {
      email: email.toLowerCase(),
    },
  );
  return response;
};

export const otpValidation = async (enteredOtp: number, newPass: string) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/otpValidation`,
    {
      enteredOtp,
      newPass,
    },
  );
  return response;
};
