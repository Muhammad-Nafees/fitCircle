import {api} from '../../api/utils/interceptor';

export const addReview = async (packageId: string) => {
  const response = await api.put(`package/add-review/${packageId}`);
  return response;
};

export const getPackageReviews = async (packageId: string) => {
  const response = await api.put(`package/reviews/${packageId}`);
  return response;
};

export const getTrainerPackages = async (userId: string) => {
  const response = await api.get(`package?userId=${userId}`);
  return response;
};
