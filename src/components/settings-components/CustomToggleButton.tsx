import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Toggle from 'react-native-toggle-element';

const CustomToggleButton = ({
  text,
  disableHorizontalLine = false,
  text2,
  isEnabled,
  setIsEnabled,
  onChangeToggle,
}: any) => {
  const onToggle = () => {
    setIsEnabled(!isEnabled);
  };

  useEffect(() => {
    onChangeToggle();
  }, [isEnabled]);

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          {text2 && <Text style={styles.text2}>{text2}</Text>}
          <Text style={styles.message}>{text}</Text>
        </View>
        <View>
          {text2 && <Text></Text>}
          <Toggle
            value={isEnabled}
            onPress={onToggle}
            thumbButton={{
              width: 21,
              height: 21,
              radius: 30,
              activeBackgroundColor: '#209BCC',
              inActiveBackgroundColor: '#C2C5CE',
            }}
            trackBar={{
              activeBackgroundColor: 'rgba(32, 155, 204, 1)',
              inActiveBackgroundColor: 'rgba(235, 236, 239, 1)',
              borderActiveColor: 'rgba(32, 155, 204, 1)',
              borderInActiveColor: 'rgba(235, 236, 239, 1)',
              width: 45,
              height: 15,
            }}
          />
        </View>
      </View>
      {!disableHorizontalLine && <View style={styles.horizontalLine} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
    alignItems: 'center',
  },
  message: {
    fontSize: 14,
    fontWeight: '400',
    color: 'white',
  },
  horizontalLine: {
    borderBottomWidth: 1,
    borderBottomColor: '#EBEBEB',
  },
  text2: {
    fontWeight: '400',
    fontSize: 11,
    color: 'white',
    paddingBottom: 10,
  },
});

export default CustomToggleButton;
