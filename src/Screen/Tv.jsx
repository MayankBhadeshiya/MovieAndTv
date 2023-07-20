import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  RefreshControl,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {getTvList} from '../API/api';
import MovieItem from '../components/MovieItem';
import COLORS from '../Constant/Colors';
import { windowWidth } from '../Util/Dimensions';

export default function Tv() {
  const [data, setData] = useState('');
  const [error, setError] = useState(false);
  const [refreshing, setRefreshing] = useState(true);
  const [page, setPage] = useState(1);
  const connected = useSelector(state => state.userReducer.conection);

  useEffect(() => {
    if (connected && refreshing) {
      async function get() {
        const tv = await getTvList(page);
        setRefreshing(false);
        if (tv === 'noData') {
          setError(true);
        } else {
          setError(false);
          if (page === 1) {
            setData(tv.results);
            setPage(prev => prev + 1);
          } else if (page >= 30) {
            return;
          } else {
            setData(prev => [...tv.results, ...prev]);
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
        numColumns={windowWidth > 400 ? 2 : 1}
        keyExtractor={item => item.id}
        initialNumToRender={5}
        renderItem={({item}) => (
          <MovieItem
            title={item.name}
            first_air_date={item.first_air_date}
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
