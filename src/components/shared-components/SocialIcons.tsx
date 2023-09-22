import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import GoogleIcon from '../../../assets/icons/GoogleIcon';
import FacebookIcon from '../../../assets/icons/FacebookIcon';
import AppleIcon from '../../../assets/icons/AppleIcon';

const SocialIcons = () => {
  return (
    <View style={{flexDirection: 'row',gap: 8,justifyContent: 'center'}}>
        <View style={styles.roundCardContainer}>
            <GoogleIcon />
        </View>
        <View style={styles.roundCardContainer}>
            <FacebookIcon />
        </View>
        <View style={styles.roundCardContainer}>
            <AppleIcon />
        </View>

    </View>
  )
}

export default SocialIcons

const styles = StyleSheet.create({
    roundCardContainer: {
        width: 55,
        height: 55,
        backgroundColor: 'white',
        borderRadius: 35,
        justifyContent: 'center',
        alignItems: 'center'
    }
})