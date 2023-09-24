import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';

export const TermsPolicyScreen = ({route}: any) => {
  const isTermsConditionsRoute = route.name === 'TermsConditions';
  const termsAndConditionsText = `
Welcome to Fit Circle!

These terms and conditions outline the rules and regulations for the use of Fit Circle's Website, located at Fit Circle.

By accessing this website we assume you accept these terms and conditions. Do not continue to use Fit Circle if you do not agree to take all of the terms and conditions stated on this page.

The following terminology applies to these Terms and Conditions, Privacy Statement and Disclaimer Notice and all Agreements: "Client", "You" and "Your" refers to you, the person log on this website and compliant to the Company’s terms and conditions. "The Company", "Ourselves", "We", "Our" and "Us", refers to our Company. "Party", "Parties", or "Us", refers to both the Client and ourselves. All terms refer to the offer, acceptance and consideration of payment necessary to undertake the process of our assistance to the Client in the most appropriate manner for the express purpose of meeting the Client’s needs in respect of provision of the Company’s stated services, in accordance with and subject to, prevailing law of Netherlands. Any use of the above terminology or other words in the singular, plural, capitalization and/or he/she or they, are taken as interchangeable and therefore as referring to same.
Cookies
  `;

  const privacyPolicyText = `
Please read Privacy Policy

Reservation of Rights
We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amen these terms and conditions and it’s linking policy at any time. By continuously linking to our Website, you agree to be bound to and follow these linking terms and conditions.
  
Removal of links from our website
If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
  
We do not ensure that the information on this website is correct, we do not warrant its completeness or accuracy; nor do we promise to ensure that the website remains available or that the material on the website is kept up to date.
  
Disclaimer
To the maximum extent permitted by applicable law, we exclude all representations, warranties and conditions relating to our website and the use of this website. Nothing in this disclaimer will:
  `;

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Text style={styles.heading}>
            {isTermsConditionsRoute ? 'Terms & Conditions' : 'Privacy Policy'}
          </Text>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.termsText}>
            {isTermsConditionsRoute
              ? termsAndConditionsText
              : privacyPolicyText}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292a2c',
    paddingHorizontal: 16,
  },
  contentContainer: {
    marginHorizontal: 16,
  },
  heading: {
    fontWeight: '700',
    fontSize: 16.8,
    color: 'white',
  },
  termsText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
  },
});
