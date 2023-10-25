import CustomLoader from '../../components/shared-components/CustomLoader';
import {View, Text} from 'react-native';
import {CustomPlanDescription} from './CustomNutritionistPlan';
import {IMealPlan} from '../../interfaces/mealPlan.interface';

interface Props {
  isLoading: boolean;
  mealPlans: any;
  handleDeleteMealPlan: (id: string) => void;
  handleEditMealPlan: (mealPlan: IMealPlan) => void;
}

const NutritionisitPlanContainer = ({
  isLoading,
  mealPlans,
  handleDeleteMealPlan,
  handleEditMealPlan,
}: Props) => {
  return isLoading ? (
    <CustomLoader extraStyles={{marginTop: 30}} />
  ) : !mealPlans ? (
    <Text style={{color: 'white', paddingTop: 20}}>No Meal Plans yet!</Text>
  ) : (
    mealPlans?.map((plan: IMealPlan) => (
      <CustomPlanDescription
        key={plan._id}
        plan={plan}
        handleDeleteButton={() => handleDeleteMealPlan(plan._id)}
        handleEditButton={() => handleEditMealPlan(plan)}
      />
    ))
  );
};

export default NutritionisitPlanContainer;
