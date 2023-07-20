const BASEURL = 'https://api.themoviedb.org/3';
const TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0MDdhM2YzNTQ4N2IxYTdjY2U5MTE2ZDE3ZGFlMjE4MSIsInN1YiI6IjY0OGFhN2Q3NTU5ZDIyMDBlMjA0N2ZkYyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.bw50vVBFpg0ML9x64owYF_wnyHLtT1TpTBr8gfaY70E';

var myHeaders = new Headers();
myHeaders.append('Authorization', `Bearer ${TOKEN}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow',
};

export async function getMovieList(page) {
  try {
    const response = await fetch(
      `${BASEURL}/discover/movie?page=${page}&region=IN&sort_by=popularity.desc`,
      requestOptions,
    );
    if(response.status === 200) {
        const result = await response.json();
        return result    
    }
    else{
      console.log(response.status);
      return 'noData';  
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';
  }
}

export async function getMovieDetail(id) {
  try {
    const response = await fetch(`${BASEURL}/movie/${id}`, requestOptions);
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response.status);
      return 'noData';  
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';  
  }
}

export async function getMovieProvider(id) {
  try {
    const response = await fetch(
      `${BASEURL}/movie/${id}/watch/providers`,
      requestOptions,
    );
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response.status);
      return 'noData';  
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';  
  }
}

export async function getTvList(page) {
  try {
    const response = await fetch(
      `${BASEURL}/tv/on_the_air?page=${page}`,
      requestOptions,
    );
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response.status);
      return 'noData';  
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';  
  }
}

export async function getTvDetail(id) {
  try {
    const response = await fetch(`${BASEURL}/tv/${id}`, requestOptions);
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response.status);
      return 'noData';  
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';  
  }
}

export async function getCollectionDetail(id) {
  try {
    const response = await fetch(
      `${BASEURL}/collection/${id}`,
      requestOptions,
    );
    if (response.status === 200) {
      const result = await response.json();
      return result;
    } else {
      console.log(response.status);
      return 'noData';
    }
  } catch (err) {
    console.log(err.message);
    return 'noData';
  }
}