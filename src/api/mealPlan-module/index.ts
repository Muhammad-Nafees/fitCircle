import {api} from '../../api/utils/interceptor';

export const getAllMealPlans = async (page: number, limit: number) => {
  const response = await api.get(`meal-plans/all?page=${page}&limit=${limit}`);
  return response;
};

export const getMealPlansByNutritionist = async (
  page: number,
  limit: number,
  userId: string,
) => {
  const response = await api.get(
    `meal-plans?page=${page}&limit=${limit}&userId=${userId}`,
  );
  return response;
};
