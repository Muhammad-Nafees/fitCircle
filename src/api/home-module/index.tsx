import {api} from '../../api/utils/interceptor';
import {IPost} from '../../interfaces/user.interface';

export const createPostWithImage = async (reqData: Partial<IPost>) => {
  let formData = new FormData();
  formData.append('text', reqData?.text);
  formData.append('media', reqData?.media);
  formData.append('mediaType', reqData?.mediaType);
  formData.append('visibility', reqData?.visibility);
  if (reqData?.cost) {
    formData.append('cost', reqData.cost);
  }

  const response = await api.post(`post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const createPostWithVideo = async (reqData: Partial<IPost>) => {
  let formData = new FormData();
  formData.append('text', reqData?.text);
  formData.append('media', reqData?.media);
  formData.append('mediaType', reqData?.mediaType);
  if (reqData?.thumbnail) {
    formData.append('thumbnail', reqData.thumbnail);
  }
  if (reqData?.cost) {
    formData.append('cost', reqData.cost);
  }
  if (reqData?.visibility) {
    formData.append('visibility', reqData?.visibility);
  }

  const response = await api.post(`post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const createPostWithContent = async (reqData: Partial<IPost>) => {
  const response = await api.post(`post`, reqData);
  return response;
};
