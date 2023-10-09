import {setParams} from '@react-navigation/routers/lib/typescript/src/CommonActions';
import {api} from '../../api/utils/interceptor';
import {IComment, IPost} from '../../interfaces/user.interface';

export const createPostWithImage = async (reqData: Partial<IPost>) => {
  let formData = new FormData();
  formData.append('text', reqData?.text);
  formData.append('media', reqData?.media);
  formData.append('mediaType', reqData?.mediaType);
  formData.append('visibility', reqData?.visibility);
  if (reqData?.cost) {
    formData.append('cost', reqData.cost);
  }
  if (reqData?.title) {
    formData.append('title', reqData.title);
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
  if (reqData?.title) {
    formData.append('title', reqData.title);
  }
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
  let formData = new FormData();
  formData.append('text', reqData?.text);

  if (reqData?.cost) {
    formData.append('cost', reqData.cost);
  }
  if (reqData?.visibility) {
    formData.append('visibility', reqData?.visibility);
  }
  if (reqData?.hexCode?.length == 7) {
    formData.append('hexCode[]', reqData.hexCode);
  } else {
    for (let i = 0; i < reqData.hexCode.length; i++) {
      formData.append('hexCode[]', reqData.hexCode[i]);
    }
  }

  console.log(formData, 'dooo');
  const response = await api.post(`post`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response;
};

export const getPosts = async (page: number, limit: number) => {
  const response = await api.get(
    `post/search?&mediaType=image&page=${page}&limit=${limit}`,
  );
  return response;
};

export const likePost = async (id: string) => {
  const response = await api.put(`post/like/${id}`);
  return response;
};

export const sharePost = async (postId: string) => {
  const response = await api.post(`/post/share/${postId}`);
  return response;
};

export const getVideoPosts = async (page: number, limit: number) => {
  const response = await api.get(
    `post/search?&mediaType=video&page=${page}&limit=${limit}`,
  );
  return response;
};
export const deletePost = async (postId: string) => {
  const response = await api.put(`post/remove/${postId}`);
  return response;
};

export const getAllCommentsByPosts = async (
  postId: string,
  limit: number,
  page: number,
) => {
  const response = await api.get(
    `post/comments/${postId}?limit=${limit}&page=${page}`,
  );
  return response;
};

export const addComment = async (reqData: Partial<IComment>) => {
  let formData = new FormData();
  formData.append('text', reqData?.text);
  formData.append('post', reqData?.post);
  if (reqData?.parent) {
    formData.append('parent', reqData?.parent);
  }
  if (reqData?.media) {
    formData.append('media', reqData?.media);
  }

  const response = await api.post(`post/add-comment`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response;
};
