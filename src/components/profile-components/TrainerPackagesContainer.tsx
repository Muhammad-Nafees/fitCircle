import {IPackage} from '../../interfaces/package.interface';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {View, Text} from 'react-native';
import {CustomTrainerPackage} from './CustomTrainerPackage';
import {useRoute} from '@react-navigation/native';

interface Props {
  isLoading: boolean;
  packages: any;
  handleDeletePackage?: any;
  handleEditPackage?: any;
}

const TrainerPackagesContainer = ({
  isLoading,
  packages,
  handleDeletePackage,
  handleEditPackage,
}: Props) => {
  const route = useRoute();
  return isLoading ? (
    <CustomLoader extraStyles={{marginTop: 30}} />
  ) : !packages ? (
    <Text style={{color: 'white', paddingTop: 20}}>No Packages yet!</Text>
  ) : (
    packages?.map((myPackage: IPackage) => (
      <View key={myPackage?._id}>
        <CustomTrainerPackage
          myPackage={myPackage}
          hidePackageButton={route.name === 'PackagesScreen'}
          onDeletePackage={handleDeletePackage}
          onEditPackage={handleEditPackage}
        />
      </View>
    ))
  );
};

export default TrainerPackagesContainer;
