import {IMacro, ITDEE} from '../../interfaces/user.interface';
import {api} from '../../api/utils/interceptor';

export const calculateTdee = async (reqData: ITDEE) => {
  const response = await api.post(`readings/tdee`, reqData);
  return response;
};

export const calculateMacro = async (reqData: IMacro) => {
  const response = await api.post(`readings/macro`, reqData);
  return response;
};
