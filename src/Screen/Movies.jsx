import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  SafeAreaView,
  useWindowDimensions,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import MovieItem from '../components/MovieItem';
import COLORS from '../Constant/Colors';
import {useSelector} from 'react-redux';
import {getMovieList} from '../API/api';

export default function Movies() {
  const [data, setData] = useState('');
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [page, setPage] = useState(1);
  const connected = useSelector(state => state.userReducer.conection);
  const {width} = useWindowDimensions();
  let col = 1;
  if (width > 400 && width <= 1025) {
    col = 2;
  } else if (width > 1025) {
    col = 3;
  }
  useEffect(() => {
    if (connected && refreshing) {
      async function get() {
        const movies = await getMovieList(page);
        setRefreshing(false);
        if (movies === 'noData') {
          setError(true);
        } else {
          setError(false);
          if (page === 1) {
            setData(movies.results);
            setPage(prev => prev + 1);
          } else if (page >= 30) {
            return;
          } else {
            setData(prev => [...movies.results, ...prev]);
            setPage(prev => prev + 1);
          }
        }
      }
      get();
    }
  }, [connected, refreshing]);

  const onRefresh = () => {
    setRefreshing(true);
  };

  if (error) {
    return (
      <ScrollView
        contentContainerStyle={style.errorcontainer}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <Text style={style.errortext}>Something went Wrong...</Text>
      </ScrollView>
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
    <SafeAreaView style={style.container}>
      <FlatList
        data={data}
        contentContainerStyle={style.list}
        key={col}
        numColumns={col}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        renderItem={({item}) => (
          <MovieItem
            title={item.title}
            release_date={item.release_date}
            vote_count={item.vote_count}
            id={item.id}
            backdrop_path={item.backdrop_path}></MovieItem>
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }></FlatList>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  container: {backgroundColor: COLORS.white},
  indicatorcontainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
});
