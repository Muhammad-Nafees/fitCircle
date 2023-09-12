import axios from 'axios';
import {CreateAccountFormValues} from '../screens/auth-screens/create-profile-screens/CreateAccount';
import {ISocial, IUser} from '../interfaces/user.interface';
import axiosInstance from './interceptor';

export const loginIn = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      'http://fitcircle.yameenyousuf.com/users/login',
      {
        email: email.toLowerCase(),
        password: password,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const register = async (values: CreateAccountFormValues) => {
  try {
    const response = await axios.post(
      'http://fitcircle.yameenyousuf.com/users/register',
      {
        email: values.email.toLowerCase(),
        phone: values.phone,
        password: values.password,
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const createProfile = async (
  userData: IUser,
  authorizationToken: string,
) => {
  const formData = new FormData();
  formData.append('email', userData.email);
  formData.append('password', userData.password);

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
  formData.append('role', 'user');
  formData.append('hourlyRate', userData.hourlyRate);
  formData.append('interest[]', userData.interest);
  if (userData.selectedCommunities) {
    userData.selectedCommunities.forEach(community => {
      formData.append('selectedCommunities[]', community);
    });
  }
  console.log('API Call', userData.interest);
  if (userData?.profileImage) {
    formData.append('profileImage', userData.profileImage);
  }
  if (userData.coverImage) {
    formData.append('coverImage', userData.coverImage);
  }
  // formData.append('certificateImages', userData.certificateImages);
  if (userData?.socialMediaLinks) {
    userData.socialMediaLinks.forEach((link: ISocial, index: number) => {
      formData.append(`socialMediaLinks[${index}][name]`, link.name);
      formData.append(`socialMediaLinks[${index}][link]`, link.link);
    });
  }

  const response = await axios.post(
    'http://fitcircle.yameenyousuf.com/home/createProfile',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `${authorizationToken}`,
      },
    },
  );
  return response;
};

export const postContent = async (postData: any) => {
  console.log('post button pressed');
  try {
    const formData = new FormData();
    formData.append('content', postData.content);
    formData.append('visibility', postData.visibility);
    formData.append('hexCode', postData.hexCode);
    if (postData.cost) {
      formData.append('cost', postData.cost);
    }
    if (postData.media) {
      const mediaUri = postData.media;
      const isImage =
        mediaUri.endsWith('.jpg') ||
        mediaUri.endsWith('.jpeg') ||
        mediaUri.endsWith('.png');
      const isVideo = mediaUri.endsWith('.mp4') || mediaUri.endsWith('.mov');
      console.log(isVideo);
      if (isImage) {
        const type = 'image/jpeg';
        formData.append('media', {
          uri: mediaUri,
          type: type,
          name: `image_${Date.now()}.jpg`,
        });
      } else if (isVideo) {
        const type = 'video/mp4';
        formData.append('media', {
          uri: mediaUri,
          type: type,
          name: `video_${Date.now()}.mp4`,
        });
      }
    }

    const response = await axiosInstance.post('posts/create', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export const generateEmailOtp = async (email: string) => {
  try {
    const requestData = {email: email.toLowerCase()};

    const response = await axiosInstance.post(
      'users/generate/otp',
      requestData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const generatePhoneOtp = async (phone: any) => {
  try {
    const requestData = {phone};

    const response = await axiosInstance.post(
      'users/generate/otp',
      requestData,
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const otpValidationByEmail = async (
  enteredOtp: number,
  email: string,
) => {
  const response = await axiosInstance.post('users/otpValidation', {
    enteredOtp,
    email,
  });
  return response;
};

export const otpValidationByPhone = async (
  enteredOtp: number,
  phone: string,
) => {
  const response = await axiosInstance.post('users/otpValidation', {
    enteredOtp,
    phone,
  });
  return response;
};

export const resetPasswordWithEmail = async (
  newPass: string,
  email: string | undefined,
) => {
  const response = await axiosInstance.post('users/resetPassword', {
    newPass,
    email,
  });
  return response;
};

export const resetPasswordWithPhone = async (
  newPass: string,
  phone: string | undefined,
) => {
  const response = await axiosInstance.post('users/resetPassword', {
    newPass,
    phone,
  });
  return response;
};

export const getInterest = async () => {
  const response = await axiosInstance.get('interest');
  return response;
};

export const getCommunities = async () => {
  const response = await axiosInstance.get('community');
  return response;
};

export const getCountries = async () => {
  const response = await axiosInstance.get('countries');
  return response;
};

export const getCities = async (country: string) => {
  const response = await axiosInstance.get(`cities/${country}`);
  return response;
};

export const searchUser = async (name: string) => {
  const response = await axiosInstance.get(`home/search/${name}`);
  return response;
};
