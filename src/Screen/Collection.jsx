import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  FlatList,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {getCollectionDetail} from '../API/api';
import {windowHeight, windowWidth} from '../Util/Dimensions';
import COLORS from '../Constant/Colors';
import MovieItem from '../components/MovieItem';

export default function Collection({route, navigation}) {
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
    <ScrollView>
      <View style={style.imagecontainer}>
        {backdrop_path !== null ? (
          <Image
            source={{
              uri: `https://image.tmdb.org/t/p/original/${backdrop_path}`,
            }}
            defaultSource={require('../IMG/img.png')}
            style={style.image}
            resizeMode="stretch"
          />
        ) : (
          <Image
            source={require('../IMG/img.png')}
            defaultSource={require('../IMG/img.png')}
            style={style.image}
            resizeMode="stretch"
          />
        )}
      </View>
      <Text style={style.title}>{data.name}</Text>
      <Text style={style.overview}>{data.overview}</Text>
      <View>
        {data.parts.map(part => {
            return (
              <MovieItem
                key={part.id}
                title={part.title}
                release_date={part.release_date}
                vote_count={part.vote_count}
                id={part.id}
                backdrop_path={part.backdrop_path}></MovieItem>
            );
        })}
      </View>
    </ScrollView>
  );
}

const style = StyleSheet.create({
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
    width: windowWidth,
    height: windowHeight / 4,
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
