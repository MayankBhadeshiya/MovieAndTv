import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  FlatList,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {getCollectionDetail} from '../API/api';
import COLORS from '../Constant/Colors';
import MovieItem from '../components/MovieItem';

export default function Collection({route, navigation}) {
  const {width, height} = useWindowDimensions();

  const imageStyle = {
    width: width / height > 1.778 ? (height / 1.5) * 1.778 : width,
    height: width / height > 1.778 ? height / 1.5 : width / 1.778,
  };
  let col = 1;
  if (width > 400 && width <= 1025) {
    col = 2;
  } else if (width > 1025) {
    col = 3;
  }

  const {id, title, backdrop_path} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, []);

  const [data, setdata] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    async function get() {
      const collection = await getCollectionDetail(id);
      if (collection === 'noData') {
        setError(true);
      } else {
        setError(false);
        setdata(collection);
      }
    }
    get();
  }, []);

  if (error) {
    return (
      <View style={style.errorcontainer}>
        <Text style={style.errortext}>Something went Wrong...</Text>
      </View>
    );
  }

  if (data === '') {
    return (
      <View style={style.indicatorcontainer}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    );
  }

  return (
    <SafeAreaView>
      <FlatList
        data={data.parts}
        contentContainerStyle={style.list}
        ListHeaderComponent={() => (
          <View>
            <View style={style.imagecontainer}>
              {backdrop_path !== null ? (
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
                  }}
                  defaultSource={require('../IMG/img.png')}
                  style={[style.image, imageStyle]}
                  resizeMode="stretch"
                />
              ) : (
                <Image
                  source={require('../IMG/img.png')}
                  defaultSource={require('../IMG/img.png')}
                  style={[style.image, imageStyle]}
                  resizeMode="stretch"
                />
              )}
            </View>
            <Text style={style.title}>{data.name}</Text>
            <Text style={style.overview}>{data.overview}</Text>
          </View>
        )}
        numColumns={col}
        key={col}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        renderItem={({item}) => (
          <MovieItem
            key={item.id}
            title={item.title}
            release_date={item.release_date}
            vote_count={item.vote_count}
            id={item.id}
            backdrop_path={item.backdrop_path}></MovieItem>
        )}></FlatList>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  list: {
    alignItems: 'center',
  },
  errorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errortext: {
    fontSize: 24,
  },
  indicatorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 10,
    backgroundColor: COLORS.gray,
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  overview: {
    paddingHorizontal: 20,
    textAlign: 'justify',
    marginBottom: 20,
  },
});
