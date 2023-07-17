import axios from 'axios';
import {CreateAccountFormValues} from '../screens/auth-screens/create-profile-screens/CreateAccount';
import {ISocial, IUser} from '../interfaces/user.interface';
<<<<<<< HEAD


export const loginIn = async (email: string, password: string) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/login`,
    {
      email: email.toLowerCase(),
      password: password,
    },
  );
=======
import {BASE_URL} from './constant';

export const loginIn = async (email: string, password: string) => {
  const response = await axios.post(`https://fit-circle.cyclic.app/users/login`, {
    email: email.toLowerCase(),
    password: password,
  });
>>>>>>> main
  return response;
};

export const register = async (values: CreateAccountFormValues) => {
<<<<<<< HEAD
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/register`,
    {
      email: values.email.toLowerCase(),
      phone: values.phone,
      password: values.password,
    },
  );
=======
  const response = await axios.post(`https://fit-circle.cyclic.app/users/register`, {
    email: values.email.toLowerCase(),
    phone: values.phone,
    password: values.password,
  });
>>>>>>> main
  return response;
};

export const createProfile = async (userData: IUser) => {
<<<<<<< HEAD
=======
  console.log(userData, 'Dasd');
>>>>>>> main
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
  // formData.append('profileImage', userData.profileImage);
  // formData.append('coverImage', userData.coverImage);
  // formData.append('certificateImages', userData.certificateImages);

  const response = await axios.post(
    `https://fit-circle.cyclic.app/home/createProfile`,
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data', // Add the Content-Type header with the value "multipart/form-data"
<<<<<<< HEAD
        Authorization: `${userData.authorizationToken}`, // Include the authorization token in the headers
=======
>>>>>>> main
      },
    },
  );

  return response;
};

export const generateOtp = async (email: string) => {
<<<<<<< HEAD
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/generate/otp`,
    {
      email: email.toLowerCase(),
    },
  );
=======
  const response = await axios.post(`https://fit-circle.cyclic.app/users/generate/otp`, {
    email: email.toLowerCase(),
  });
>>>>>>> main
  return response;
};

export const otpValidation = async (enteredOtp: number) => {
<<<<<<< HEAD
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/otpValidation`,
    {
      enteredOtp,
    },
  );
  return response;
};
export const resetPassword = async (newPass: string) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/resetPassword`,
    {
      newPass,
    },
  );
=======
  const response = await axios.post(`https://fit-circle.cyclic.app/users/otpValidation`, {
    enteredOtp,
  });
  return response;
};
export const resetPassword = async (newPass: string) => {
  const response = await axios.post(`https://fit-circle.cyclic.app/users/resetPassword`, {
    newPass,
  });
>>>>>>> main
  return response;
};

export const getInterest = async () => {
  const response = await axios.get(`https://fit-circle.cyclic.app/interest`);
  return response;
};

export const getCommunities = async () => {
  const response = await axios.get(`https://fit-circle.cyclic.app/community`);
  return response;
};

export const getCountries = async () => {
  const response = await axios.get(`https://fit-circle.cyclic.app/countries`);
  return response;
};

export const getCities = async (country: string) => {
<<<<<<< HEAD
  const response = await axios.get(
    `https://fit-circle.cyclic.app/cities/${country}`,
  );
=======
  const response = await axios.get(`https://fit-circle.cyclic.app/cities/${country}`);
>>>>>>> main
  return response;
};
