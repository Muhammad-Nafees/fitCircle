import axios from 'axios';
import {CreateAccountFormValues} from '../screens/auth-screens/create-profile-screens/CreateAccount';
import {ISocial, IUser} from '../interfaces/user.interface';
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
  console.log(userData.profileImage);
  const formData = new FormData();
  formData.append('firstName', userData.firstName);
  formData.append('lastName', userData.lastName);
  formData.append('username', userData.username);
  formData.append('bio', userData.bio);
  formData.append('phone', userData.phone);
  formData.append('country', userData.country);
  formData.append('city', userData.city);
  formData.append('gender', userData.gender);
  formData.append('physicalInformation', userData.physicalInformation);
  formData.append('dob', userData.dob);
  formData.append('age', userData.age);
  formData.append('height', userData.height);
  formData.append('weight', userData.weight);
  formData.append('activity', userData.activity);
  formData.append('bodyType', userData.bodytype);
  formData.append('role', userData.role);
  formData.append('hourlyRate', userData.hourlyRate);
  formData.append('interest', userData.interest);
  formData.append('selectedCommunities', userData.selectedCommunities);
  if (userData?.socialMediaLinks) {
    userData.socialMediaLinks.forEach((link: ISocial, index: number) => {
      formData.append(`socialMediaLinks[${index}][name]`, link.name);
      formData.append(`socialMediaLinks[${index}][link]`, link.link);
    });
  }
  formData.append('profileImage', userData.profileImage);
  formData.append('coverImage', userData.coverImage);
  // formData.append('certificateImages', userData.certificateImages);

  const response = await axios.post(
    `${BASE_URL}/home/createProfile`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // Add the Content-Type header with the value "multipart/form-data"
      },
    },
  );

  return response;
};

export const generateOtp = async (email: string) => {
  const response = await axios.post(`${BASE_URL}/users/generate/otp`, {
    email: email.toLowerCase(),
  });
  return response;
};

export const otpValidation = async (enteredOtp: number) => {
  const response = await axios.post(`${BASE_URL}/users/otpValidation`, {
    enteredOtp,
  });
  return response;
};
export const resetPassword = async (newPass: string) => {
  const response = await axios.post(`${BASE_URL}/users/resetPassword`, {
    newPass,
  });
  return response;
};

export const getInterest = async () => {
  const response = await axios.get(`${BASE_URL}/interest`);
  return response;
};

export const getCommunities = async () => {
  const response = await axios.get(`${BASE_URL}/community`);
  return response;
};

export const getCountries = async () => {
  const response = await axios.get(`${BASE_URL}/countries`);
  return response;
};

export const getCities = async (country: string) => {
  const response = await axios.get(`${BASE_URL}/cities/${country}`);
  return response;
};
