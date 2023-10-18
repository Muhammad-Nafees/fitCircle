import {IPackage} from '../../interfaces/package.interface';
import CustomLoader from '../../components/shared-components/CustomLoader';
import {View, Text} from 'react-native';
import {CustomTrainerPackage} from './CustomTrainerPackage';

interface Props {
  isLoading: boolean;
  packages: any;
  handleDeletePackage?: any;
}

const TrainerPackagesContainer = ({
  isLoading,
  packages,
  handleDeletePackage,
}: Props) => {
  return isLoading ? (
    <CustomLoader extraStyles={{marginTop: 30}} />
  ) : !packages ? (
    <Text style={{color: 'white', paddingTop: 20}}>No Packages yet!</Text>
  ) : (
    packages?.map((myPackage: IPackage) => (
      <View key={myPackage?._id}>
        <CustomTrainerPackage
          myPackage={myPackage}
          hidePackageButton={true}
          onDeletePackage={handleDeletePackage}
        />
      </View>
    ))
  );
};

export default TrainerPackagesContainer;
