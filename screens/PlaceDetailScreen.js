import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const PlaceDetailScreen = props => {
  const place = props.navigation.getParam('place');
  return (
    <View style={styles.screen}>
      <Text>Välkommen till {place.title}!</Text>
    </View>
  );
};

PlaceDetailScreen.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam('place').title,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PlaceDetailScreen;
