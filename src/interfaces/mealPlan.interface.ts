export interface INutritionist {
  _id: string;
  role: string;
  profileImage: string;
  firstName: string;
  lastName: string;
  username: string;
}

export interface IMealPlan {
  _id: string;
  user: string;
  title: string;
  pdf: string;
  cost: number;
  username: string;
  paidBy: [];
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IAllMealPlans {
  _id: string;
  mealPlans: IMealPlan[];
  nutritionist: INutritionist;
}
