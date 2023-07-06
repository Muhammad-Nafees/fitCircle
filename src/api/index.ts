import axios from 'axios';
import {CreateAccountFormValues} from '../screens/auth-screens/create-profile-screens/CreateAccount';
import {IUser} from '../interfaces/user.interface';
import {BASE_URL} from './constant';

export const loginIn = async (email: string, password: string) => {
  const response = await axios.post(`${BASE_URL}/users/login`, {
    email,
    password,
  });
  return response;
};

export const register = async (values: CreateAccountFormValues) => {
  const response = await axios.post(`${BASE_URL}/users/register`, {
    email: values.email.toLowerCase(),
    phone: values.phone,
    password: values.password,
  });
  return response;
};

export const createProfile = async (userData: IUser) => {
  const response = await axios.post(`${BASE_URL}/home/createProfile`, {
    firstName: userData.firstName,
    lastName: userData.lastName,
    userName: userData.username,
    bio: userData.bio,
    phone: userData.phone,
    country: userData.country,
    city: userData.city,
    gender: userData.gender,
    physicalInformation: userData.physicalInformation,
    dob: userData.dob,
    age: userData.age,
    height: userData.height,
    weight: userData.weight,
    activity: userData.activity,
    bodytype: userData.bodytype,
    role: userData.role,
    hourlyRate: userData.hourlyRate,
    interest: userData.interest,
    communities: userData.communities,
    socialMediaLinks: userData.socialMediaLinks,
  });
  return response;
};

export const resetPassword = async (email: string) => {
  const response = await axios.post(`${BASE_URL}/users/resetPassword`, {
    email: email.toLowerCase(),
  });
  return response;
};

export const otpValidation = async (enteredOtp: number, newPass: string) => {
  const response = await axios.post(`${BASE_URL}/users/otpValidation`, {
    enteredOtp,
    newPass,
  });
  return response;
};

export const getInterest = async () => {
  const response = await axios.get(`${BASE_URL}/interest`);
  return response;
};
