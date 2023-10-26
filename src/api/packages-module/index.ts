import {IPackage} from '../../interfaces/package.interface';
import {api} from '../../api/utils/interceptor';

export const createPackage = async (reqData: Partial<IPackage>) => {
  let formData = new FormData();
  formData.append('title', reqData?.title);
  formData.append('description', reqData?.description);
  formData.append('cost', reqData?.cost);
  formData.append('hours', reqData?.hours);
  formData.append('media', reqData?.media);
  formData.append('thumbnail', reqData?.thumbnail);

  const response = await api.post(`package`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const updatePackage = async (
  reqData: Partial<IPackage>,
  packageId: string,
) => {
  let formData = new FormData();
  formData.append('title', reqData?.title);
  formData.append('description', reqData?.description);
  formData.append('cost', reqData?.cost);
  formData.append('hours', reqData?.hours);
  // formData.append('media', reqData?.media);
  // formData.append('thumbnail', reqData?.thumbnail);

  const response = await api.put(`package/${packageId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};

export const getTrainerPackages = async (
  page: number,
  limit: number,
  userId: string,
) => {
  const response = await api.get(
    `package?page=${page}&limit=${limit}&userId=${userId}`,
  );
  return response;
};

export const deletePackageById = async (packageId: string) => {
  const response = await api.delete(`package/${packageId}`);
  return response;
};

export const addReview = async (packageId: string) => {
  const response = await api.put(`package/add-review/${packageId}`);
  return response;
};

export const getPackageReviews = async (packageId: string) => {
  const response = await api.put(`package/reviews/${packageId}`);
  return response;
};
