import {api} from '../../api/utils/interceptor';

export const searchProfile = async (search: string) => {
  const response = await api.get(`user/search-all?search=${search}`);
  return response;
};

export const searchProfileByRole = async (role: string, search: string) => {
  const response = await api.get(
    `user/search-by-role?role=${role}&search=${search}`,
  );
  return response;
};

export const getUserProfile = async (userId: string) => {
  const response = await api.get(`user/profile?userId=${userId}`);
  return response;
};

export const getUserPosts = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const response = await api.get(
    `post/feed?page=${page}&limit=${limit}&userId=${userId}`,
  );
  return response;
};

export const getUserVideos = async (
  userId: string,
  page: number,
  limit: number,
) => {
  const response = await api.get(
    `post/videos?page=${page}&limit=${limit}&userId=${userId}`,
  );
  return response;
};

export const getFollowersList = async () => {
  const response = await api.get(`user/followers`);
  return response;
};
export const searchFollowersList = async (search: string) => {
  const response = await api.get(`user/followers?search=${search}`);
  return response;
};

export const getFollowingList = async () => {
  const response = await api.get(`user/following`);
  return response;
};
export const searchFollowingList = async (search: string) => {
  const response = await api.get(`user/following?search=${search}`);
  return response;
};

export const followToggle = async (followingId: string) => {
  const response = await api.post('user/follow-toggle', {
    following: followingId,
  });
  return response;
};

export const removeFollower = async (followerId: string) => {
  const response = await api.put('user/remove-follower', {
    follower: followerId,
  });
  return response;
};

export const getCommunity = async (communityId: string) => {
  const response = await api.get(`community/${communityId}`);
  return response;
};
export const searchCommunity = async (search: string) => {
  const response = await api.get(`community?search=${search}`);
  return response;
};

export const getSubscribedCommunities = async () => {
  const response = await api.get(`community/subscription`);
  return response;
};
export const searchSubscribedCommunities = async (search: string) => {
  const response = await api.get(`community/subscription?search=${search}`);
  return response;
};

export const communitiesToggle = async (communityId: string) => {
  const response = await api.put('community/subscription-toggle', {
    community: communityId,
  });
  return response;
};

export const toggleSubscribe = async (userId: string) => {
  const response = await api.put(`user/subscribe-toggle?userId=${userId}`);
  return response;
};
