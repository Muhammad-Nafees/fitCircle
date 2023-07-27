import axios from 'axios';
import {CreateAccountFormValues} from '../screens/auth-screens/create-profile-screens/CreateAccount';
import {ISocial, IUser} from '../interfaces/user.interface';

export const loginIn = async (email: string, password: string) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/login`,
    {
      email: email.toLowerCase(),
      password: password,
    },
  );
  return response;
};

export const register = async (values: CreateAccountFormValues) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/register`,
    {
      email: values.email.toLowerCase(),
      phone: values.phone,
      password: values.password,
    },
  );
  return response;
};

export const createProfile = async (
  userData: IUser,
  authorizationToken: string,
) => {
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
        Authorization: `${authorizationToken}`, // Include the authorization token in the headers
      },
    },
  );

  return response;
};

export const postContent = async (postData: any, authToken: string) => {
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
    const response = await axios.post(
      'https://fit-circle.cyclic.app/posts/create',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `${authToken}`,
        },
      },
    );
    return response;
  } catch (error) {
    throw error;
  }
};

export const generateOtp = async (email: string) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/generate/otp`,
    {
      email: email.toLowerCase(),
    },
  );
  return response;
};

export const otpValidation = async (
  enteredOtp: number,
  email: string | undefined,
) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/otpValidation`,
    {
      enteredOtp,
      email,
    },
  );
  return response;
};
export const resetPassword = async (
  newPass: string,
  email: string | undefined,
) => {
  const response = await axios.post(
    `https://fit-circle.cyclic.app/users/resetPassword`,
    {
      newPass,
      email,
    },
  );
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
  const response = await axios.get(
    `https://fit-circle.cyclic.app/cities/${country}`,
  );
  return response;
};
