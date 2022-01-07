import React, { useEffect } from 'react';
import { Alert, FlatList, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import PlaceItem from '../components/PlaceItem';
import { deletePlace } from '../helpers/db';
import * as placesActions from '../store/places-actions';

const PlacesListScreen = props => {
  const places = useSelector(state => state.places.places);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(placesActions.loadPlaces());
  }, [dispatch]);

  const deletePlaceHandler = id => {
    Alert.alert('Delete', 'Do you really want to delete this place?', [
      { text: 'No' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          deletePlace(id);
          dispatch(placesActions.loadPlaces());
        },
      },
    ]);
  };

  return (
    <FlatList
      data={places}
      renderItem={itemData => (
        <PlaceItem
          image={itemData.item.imageUri}
          title={itemData.item.title}
          address={itemData.item.address}
          onSelect={() => {
            props.navigation.navigate('PlaceDetail', { place: itemData.item });
          }}
          onDelete={() => deletePlaceHandler(itemData.item.id)}
        />
      )}
    />
  );
};

PlacesListScreen.navigationOptions = navData => {
  return {
    headerTitle: 'All Places',
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title='Add Place'
          iconName='ios-add'
          onPress={() => {
            navData.navigation.navigate('NewPlace');
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({});

export default PlacesListScreen;
