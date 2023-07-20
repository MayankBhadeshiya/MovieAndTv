import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, { memo } from 'react';
import COLORS from '../Constant/Colors';
import {useNavigation} from '@react-navigation/native';
import ROUTES from '../Constant/Routes';

function MovieItem({
  backdrop_path,
  title,
  release_date = '',
  vote_count,
  id,
  first_air_date = '',
}) {
  const navigation = useNavigation();
  const handlePress = () => {
    navigation.navigate(ROUTES.DETAILS, {
      id: id,
      title: title,
      source: first_air_date === '' ? 'Movies' : 'TV',
    });
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handlePress}>
      {backdrop_path !== null ? (
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
          }}
          defaultSource={require('../IMG/img.png')}
          style={styles.banner}
          resizeMode="stretch"
        />
      ) : (
        <Image
          source={require('../IMG/img.png')}
          defaultSource={require('../IMG/img.png')}
          style={styles.banner}
          resizeMode="stretch"
        />
      )}
      <Text style={styles.title}>{title}</Text>
      <View style={styles.innerContainer}>
        {release_date !== '' && <Text>{release_date}</Text>}
        {first_air_date !== '' && <Text>{first_air_date}</Text>}
        <Text>Votes : {vote_count}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default memo(MovieItem);

const styles = StyleSheet.create({
  container: {
    paddingBottom: 10,
    borderWidth: 1,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
  },
  banner:{
    width: '100%',
    height: 150,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    backgroundColor: COLORS.gray
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  title: {
    color: COLORS.primary,
    paddingHorizontal: 10,
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 8,
  },
});
