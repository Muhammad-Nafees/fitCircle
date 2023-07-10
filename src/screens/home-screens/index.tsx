import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {useSelector} from 'react-redux';
import {RootState} from '../../redux/store';
import {Avatar, Searchbar} from 'react-native-paper';
import {CustomPost} from '../../components/home-components/CustomPost';

const HomeScreen = () => {
  const userData = useSelector((state: RootState) => state.auth.user);
  const [searchQuery, setSearchQuery] = useState('');

  const onChangeSearch = (query: string) => setSearchQuery(query);
  console.log(userData);

  return (
    // <View style={styles.container}>
    //   <View style={styles.topContainer}>
    //     <View style={styles.headerContainer}>
    //       <Avatar.Text size={34} label="SA" />
    //       <Searchbar
    //         placeholder="Search..."
    //         onChangeText={onChangeSearch}
    //         value={searchQuery}
    //         style={styles.searchbar}
    //         placeholderTextColor="#cccdcc"
    //         iconColor="#cccdcc"
    //       />
    //     </View>
    //     <View style={styles.topContainerButtons}>
    //       <TouchableOpacity style={[styles.button]}>
    //         <Text style={styles.button1Text}>My Circle</Text>
    //         <Text style={styles.button2Text}>Creator</Text>
    //       </TouchableOpacity>
    //     </View>
    //   </View>
    //   <View style={styles.bottomContainer}>
    //     <ScrollView>
    //       <CustomPost />
    //       <CustomPost />
    //     </ScrollView>
    //   </View>
    // </View>
    <View
      style={{
        flex: 1,
        backgroundColor: '#353535',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{color: 'white'}}>Home Screen Coming Soon</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    backgroundColor: '#292b2d',
    justifyContent: 'center',
  },
  bottomContainer: {
    flex: 5,
    backgroundColor: '#353535',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 5,
  },
  searchbar: {
    backgroundColor: '#2c2d2e',
    borderRadius: 0,
    width: '85%',
    height: 34,
  },
  topContainerButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#373638',
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  button1Text: {
    backgroundColor: '#019acd',
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40,
    paddingVertical: 4,
    paddingHorizontal: 32,
    color: '#fff',
  },
  button2Text: {
    borderBottomRightRadius: 40,
    paddingVertical: 4,
    paddingHorizontal: 32,
    color: '#fff',
  },
});

export default HomeScreen;
