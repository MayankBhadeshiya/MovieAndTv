import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Linking,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useLayoutEffect, useState} from 'react';
import {ActivityIndicator} from 'react-native';
import COLORS from '../Constant/Colors';
import {windowHeight, windowWidth} from '../Util/Dimensions';
import {getMovieDetail, getMovieProvider, getTvDetail} from '../API/api';
import ROUTES from '../Constant/Routes';

export default function Details({route, navigation}) {
  const {id, title, source} = route.params;
  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  }, [route.params]);

  const [data, setdata] = useState('');
  const [provider, setprovider] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function get() {
      if (source === 'Movies') {
        const movieProvider = await getMovieProvider(id);
        setprovider(movieProvider.results.IN);
        const movie = await getMovieDetail(id);
        if (movie === 'noData') {
          setError(true);
        } else {
          setError(false);
          setdata(movie);
        }
      } else if (source === 'TV') {
        const Tv = await getTvDetail(id);
        if (Tv === 'noData') {
          setError(true);
        } else {
          setError(false);
          setdata(Tv);
        }
      }
    }
    get();
  }, [route.params]);

  if (error) {
    return (
      <View style={styles.errorcontainer}>
        <Text style={styles.errortext}>Something went Wrong...</Text>
      </View>
    );
  }

  if (data === '') {
    return (
      <View style={styles.indicatorcontainer}>
        <ActivityIndicator size={'large'}></ActivityIndicator>
      </View>
    );
  }
  const handlePress = collection => {
    navigation.navigate(ROUTES.COLLECTION, {
      id: collection.id,
      title: collection.name,
      backdrop_path: collection.backdrop_path,
    });
  };
  return (
    <ScrollView>
      <View style={styles.imagecontainer}>
        <Image
          source={{
            uri: `https://image.tmdb.org/t/p/original/${data.poster_path}`,
          }}
          defaultSource={require('../IMG/img.png')}
          style={styles.image}
        />
      </View>
      {data.tagline !== '' && <Text style={styles.title}>{data.tagline}</Text>}
      {source === 'Movies' && (
        <View style={styles.date}>
          <Text>Global Relese : {data.release_date}</Text>
          {data.homepage !== '' && (
            <Text
              onPress={() => Linking.openURL(`${data.homepage}`)}
              style={styles.link}>
              Go to the website
            </Text>
          )}
        </View>
      )}
      {source === 'TV' && (
        <View style={styles.date}>
          <View>
            <Text>First air Date : {data.first_air_date}</Text>
            <Text>Last air Date : {data.last_air_date}</Text>
          </View>
          {data.homepage !== '' && (
            <Text
              onPress={() => Linking.openURL(`${data.homepage}`)}
              style={styles.link}>
              Go to the website
            </Text>
          )}
        </View>
      )}
      {source === 'TV' && (
        <View style={styles.totalSeasons}>
          {data.number_of_seasons !== '' && (
            <Text>Total Seasons : {data.number_of_seasons}</Text>
          )}
        </View>
      )}
      {data.genres.length > 0 && (
        <View style={styles.ItemContainer}>
          <Text>Genres : </Text>
          <View style={styles.ItemList}>
            {data.genres.map(l => (
              <View key={l.id} style={styles.item}>
                <Text style={styles.ItemText}>{l.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {data.spoken_languages.length > 0 && (
        <View style={styles.ItemContainer}>
          <Text>Spoken Languages : </Text>
          <View style={styles.ItemList}>
            {data.spoken_languages.map(l => (
              <View key={l.english_name} style={styles.item}>
                <Text style={styles.ItemText}>{l.english_name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {data.production_companies.length > 0 && (
        <View style={styles.ItemContainer}>
          <Text>Production companies : </Text>
          <View style={styles.ItemList}>
            {data.production_companies.map(l => (
              <View key={l.name} style={styles.item}>
                <Text style={styles.ItemText}>{l.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {source === 'Movies' && data.belongs_to_collection !== null && (
        <TouchableOpacity
          style={styles.collectionbutton}
          onPress={handlePress.bind(this, data.belongs_to_collection)}>
          <Text style={styles.collectionText}>Go to the Collection</Text>
        </TouchableOpacity>
      )}
      {data.overview !== '' && <Text style={styles.overview}>{data.overview}</Text>}
      {source === 'TV' && (
        <View style={styles.seasonsContainer}>
          <Text style={styles.seasonsText}>Latest Seasons :</Text>
          <ScrollView horizontal={true}>
            {data.seasons
              .reverse()
              .slice(0, 10)
              .map(s => (
                <View key={s.id} style={styles.seasonsItem}>
                  {s.poster_path !== null ? (
                    <Image
                      source={{
                        uri: `https://image.tmdb.org/t/p/original/${s.poster_path}`,
                      }}
                      defaultSource={require('../IMG/img.png')}
                      style={styles.seasonsPoster}
                      resizeMode="stretch"
                    />
                  ) : (
                    <Image
                      source={require('../IMG/img.png')}
                      defaultSource={require('../IMG/img.png')}
                      style={styles.seasonsPoster}
                      resizeMode="stretch"
                    />
                  )}
                  <Text>{s.name}</Text>
                  <Text>Ep : {s.episode_count}</Text>
                </View>
              ))}
          </ScrollView>
        </View>
      )}
      {data.networks && data.networks.length > 0 && (
        <View style={styles.ItemContainer}>
          <Text>Networks : </Text>
          <View style={styles.ItemList}>
            {data.networks.map(l => (
              <View key={l.name} style={styles.networkitem}>
                <Image
                  source={{
                    uri: `https://image.tmdb.org/t/p/original/${l.logo_path}`,
                  }}
                  resizeMode="contain"
                  defaultSource={require('../IMG/img.png')}
                  style={styles.networkimage}
                />
                <Text style={styles.networkItemText}>{l.name}</Text>
              </View>
            ))}
          </View>
        </View>
      )}
      {provider &&
        Object.keys(provider).includes('rent') &&
        provider.rent.length > 0 && (
          <View style={styles.ItemContainer}>
            <Text>Rent on : </Text>
            <View style={styles.ItemList}>
              {provider.rent.map(l => (
                <View key={l.provider_id} style={styles.networkitem}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${l.logo_path}`,
                    }}
                    resizeMode="contain"
                    defaultSource={require('../IMG/img.png')}
                    style={styles.networkimage}
                  />
                  <Text style={styles.networkItemText}>{l.provider_name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      {provider &&
        Object.keys(provider).includes('buy') &&
        provider.buy.length > 0 && (
          <View style={styles.ItemContainer}>
            <Text>Buy on : </Text>
            <View style={styles.ItemList}>
              {provider.buy.map(l => (
                <View key={l.provider_id} style={styles.networkitem}>
                  <Image
                    source={{
                      uri: `https://image.tmdb.org/t/p/original/${l.logo_path}`,
                    }}
                    resizeMode="contain"
                    defaultSource={require('../IMG/img.png')}
                    style={styles.networkimage}
                  />
                  <Text style={styles.networkItemText}>{l.provider_name}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  imagecontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: windowWidth,
    height: (windowHeight * 2) / 3,
    marginBottom: 10,
    backgroundColor: COLORS.gray,
  },
  networkimage: {
    width: 'auto',
    height: 50,
    marginBottom: 10,
  },
  link: {
    color: COLORS.blue,
  },
  indicatorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: COLORS.primary,
  },
  date: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  totalSeasons: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  overview: {
    paddingHorizontal: 20,
    textAlign: 'justify',
    marginBottom: 20,
  },
  ItemContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  ItemList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  item: {
    paddingHorizontal: 6,
    marginHorizontal: 3,
    paddingVertical: 2,
    marginTop: 3,
    borderRadius: 4,
    backgroundColor: COLORS.primary,
  },
  networkitem: {
    paddingHorizontal: 6,
    marginHorizontal: 5,
    marginVertical: 5,
  },
  ItemText: {
    color: COLORS.white,
  },
  networkItemText: {
    color: COLORS.black,
  },
  collectionbutton: {
    marginBottom: 20,
    marginHorizontal: 20,
    backgroundColor: COLORS.primary,
    paddingVertical: 5,
    borderRadius: 5,
  },
  collectionText: {
    textAlign: 'center',
    color: COLORS.white,
  },
  errorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errortext: {
    fontSize: 24,
  },
  seasonsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  seasonsText:{
    marginBottom:5
  },
  seasonsItem:{
    marginHorizontal: 10
  },
  seasonsPoster: {
    backgroundColor: COLORS.gray,
    width: 100,
    height: 150,
  },
});
