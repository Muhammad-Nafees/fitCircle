import {IUser} from '../../interfaces/user.interface';
import {api} from '../utils/interceptor';

export const login = async (values: any) => {
  const response = await api.post(`auth/login`, values);
  return response;
};

export const register = async (values: any) => {
  const response = await api.post(`auth/register`, values);
  return response;
};

export const getInterest = async () => {
  const response = await api.get(`interests`);
  return response;
};

export const getCommunities = async () => {
  const response = await api.get(`community`);
  return response;
};

export const getOtpCode = async (value: any) => {
  console.log(value, 'getOtp');
  const response = await api.post(`auth/send-code`, value);
  return response;
};

export const verifyCode = async (code: number) => {
  const response = await api.put(`auth/verify-code`, {
    code: code.toString(),
  });
  return response;
};

export const resetPassword = async (values: any) => {
  const response = await api.put(`auth/reset-password`, values);
  return response;
};

export const checkUsername = async (username: any) => {
  const response = await api.post(`user/check-username`, username);
  return response;
};

export const getCountries = async () => {
  const response = await api.get(`countries`);

  return response;
};
export const getCities = async (country: string) => {
  const response = await api.get(`cities?country=${country}`);
  return response;
};

export const updateProfile = async (userData: IUser) => {
  let formData = new FormData();
  if (userData?.profileImage) {
    formData.append('profileImage', userData.profileImage);
  }
  if (userData?.coverImage) {
    formData.append('coverImage', userData.coverImage);
  }
  if (userData?.certificates) {
    for (let i = 0; i < userData.certificates.length; i++) {
      formData.append('certificates', userData.certificates[i]);
    }
  }
  formData.append('firstName', userData?.firstName);
  formData.append('lastName', userData?.lastName);
  formData.append('username', userData?.username);
  formData.append('bio', userData?.bio);
  formData.append('country', userData?.country);
  formData.append('city', userData?.city);

  if (userData?.physicalInformation) {
    formData.append('physicalInformation', userData?.physicalInformation);
  }
  formData.append('dob', userData.dob);
  if (userData?.age) {
    formData.append('age', userData.age);
  }
  formData.append('phone', userData.phone);
  formData.append('phoneCode', userData.phoneCode);
  formData.append('countryCode', userData.countryCode);

  if (userData?.hourlyRate) {
    formData.append('hourlyRate', userData?.hourlyRate);
  }
  if (userData?.activity) {
    formData.append('activity', userData?.activity);
  }
  if (userData.bodyType) {
    formData.append('bodyType', userData?.bodyType);
  }
  if (userData?.height) {
    formData.append('height[value]', userData?.height.value);
    formData.append('height[unit]', userData?.height.unit);
  }
  if (userData?.height) {
    formData.append('weight[value]', userData?.weight.value);
    formData.append('weight[unit]', userData?.weight.unit);
  }

  if (userData?.interests) {
    for (let i = 0; i < userData.interests.length; i++) {
      formData.append('interests[]', userData.interests[i]);
    }
  }
  if (userData?.communities) {
    for (let i = 0; i < userData.communities.length; i++) {
      formData.append('communities[]', userData.communities[i]);
    }
  }
  if (userData?.socialMediaLinks) {
    userData?.socialMediaLinks.forEach((linkData, index) => {
      formData.append(`socialMediaLinks[${index}][name]`, linkData.name);
      formData.append(`socialMediaLinks[${index}][link]`, linkData.link);
    });
  }

  const response = await api.put(`user/update-profile`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};
