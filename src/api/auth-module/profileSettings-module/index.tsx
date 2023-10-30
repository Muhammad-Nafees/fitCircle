import {IUser} from '../../../interfaces/user.interface';
import {api} from '../../../api/utils/interceptor';

export const getPolicy = async () => {
  const response = await api.get(`guideline/policy`);
  return response;
};
export const getTerms = async () => {
  const response = await api.get(`guideline/terms`);
  return response;
};

export const getFaqs = async () => {
  const response = await api.get(`guideline/faqs`);
  return response;
};

export const updateUserPrivacy = async (reqData: Partial<IUser>) => {
  const response = await api.put(`user/privacy`, reqData);
  return response;
};
