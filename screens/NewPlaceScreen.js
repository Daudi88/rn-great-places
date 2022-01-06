import React, { useState } from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import * as placesActions from '../store/places-actions';
import Colors from '../constants/Colors';
import ImagePicker from '../components/ImagePicker';
import LocationPicker from '../components/LocationPicker';

const NewPlaceScreen = props => {
  const [titleValue, setTitleValue] = useState('');
  const [pickedImage, setPickedImage] = useState();
  const dispatch = useDispatch();

  const titleChangeHandler = text => {
    setTitleValue(text);
  };

  const imageTakenHandler = imagePath => {
    setPickedImage(imagePath);
  };

  const savePlaceHandler = () => {
    dispatch(placesActions.addPlace(titleValue, pickedImage));
    props.navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput
          style={styles.textInput}
          onChangeText={titleChangeHandler}
          value={titleValue}
        />
        <ImagePicker onImageTaken={imageTakenHandler} />
        <LocationPicker navigation={props.navigation} />
        <Button
          title='Save Place'
          color={Colors.primary}
          onPress={savePlaceHandler}
        />
      </View>
    </ScrollView>
  );
};

NewPlaceScreen.navigationOptions = {
  headerTitle: 'Add Place',
};

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});

export default NewPlaceScreen;
