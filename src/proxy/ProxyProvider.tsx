import {ApisauceInstance, create} from 'apisauce';
import * as React from 'react';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import {FlatList, StyleSheet, ActivityIndicator,Text, View, Image} from 'react-native';
import CharacterCard from '../components/CharacterCard';

type MarvelHeroesListResponse = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {};
  results: { [x: string]: MarvelResponse | undefined};
};

type MarvelHeroComicsListResponse = {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  etag: string;
  data: {};
  results: { [x: string]: MarvelResponse | undefined};
};

type MarvelResponse = MarvelHeroesListResponse | MarvelHeroComicsListResponse;
type MarvelHeroData = { 
  [key: string]: {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: [];
  } 
};

type MarvelComicData = { 
  [key: string]: {
    offset:  number;
    limit:   number;
    total:   number;
    count:   number;
    results: [];
  } 
};
   
type MarvelData = MarvelHeroData | MarvelComicData;

type ContextStateUninitialized = {
  url?: undefined;
  isFetching: false;
  data?: undefined;
};

type ContextStateInitialized = {
  url: string;
  isFetching: false;
  data?: undefined;
};

type ContextStateFetching<T> = {
  url: string;
  isFetching: true;
  data?: T;
};

type ContextStateFetched<T> = {
  url: string;
  isFetching: false;
  data: T;
  apisauceInstance: ApisauceInstance;
};

type ApiRequestContextState<T> =
  | ContextStateUninitialized
  | ContextStateInitialized
  | ContextStateFetching<T>
  | ContextStateFetched<T>;

interface IActions {
  paginate(): void;
}

const initialState = {
  isFetching: false,
};

type Props = {
  url: string;
  maxResultsPerPage: number;
  children: JSX.Element;
};

type ProxyHandler<T, P extends string> = {
  get?(target: T, p: P, receiver: any): any;
  set?(
    target: {results: {[key in P]?: T}},
    p: P,
    value: any,
    receiver: any,
  ): boolean;
};

declare const Proxy: {
  new <T extends object>(
    target: {results: {[key in string]?: T}; apiInstance: ApisauceInstance},
    handler: ProxyHandler<T, string>,
  ): {[key: string]: Promise<T>};
};


const marvelProxy = new Proxy<MarvelResponse>(
  {apiInstance: create({baseURL: 'https://gateway.marvel.com:443'}), results: {}},
  {
    get: function <T extends MarvelResponse>(
      target: {
        results: {
          [key in string]?: T;
        };
      },
      url: string,
    ) {
      const values = target;

      return new Promise<T>(async (resolve, reject) => {
        if (values.results.hasOwnProperty(url)) {
          resolve(values.results[url] as T);
          return;
        }

        try {
          const response = await (target as {
            results: {
              [key in string]?: T;
            };
            apiInstance: ApisauceInstance;
          }).apiInstance.get<T>(url);
          const {data} = response;
          if (response.status !== 200 || !data) {
            throw new Error('Error fetching data');
          }

          (target as {
            results: {
              [key in string]?: T;
            };
          }).results[url] = data;

          resolve(data);
        } catch (e) {
          reject(e);
        }
      });
    },
    set: (target, url: string, value) => {
      target.results[url] = value;
      return true;
    },
  },
);

const ApiRequestContext = createContext<
  [ApiRequestContextState<MarvelData>, IActions]
>([initialState as ContextStateUninitialized, {paginate: () => undefined}]);

function getAuthQueryStringParams(): {
  apikey: string;
  ts: string;
  hash: string;
} {
    return {
        apikey: '5f9bc130cc1e128aabc6ff2d892dee54',
        ts: '1',
        hash: '3fdeb8797479a34f742c3e8f6419bbd4'
    }
}

function getPaginationQueryStringParams(
  maxResults: number,
  page: number,
): {
  limit: string;
  offset: string;
} {
    return {
        limit: String(maxResults),
        offset: String(page)
    }
}

export function CachedRequestsProvider({
  children,
  url,
  maxResultsPerPage,
}: Props) {
  const [state, setState] = useState<ApiRequestContextState<MarvelData>>({
    isFetching: false,
    url,
  } as ContextStateInitialized);

  const [page, setPage] = useState(0);

  const getNavigatableUrl = useCallback((): string => {
    const newUrl = new URL(url);
    Object.entries({
      ...getAuthQueryStringParams(),
      ...getPaginationQueryStringParams(maxResultsPerPage, page),
    }).forEach((param) => {
      newUrl.searchParams.append(param[0], param[1]);
    });
    return newUrl.toString().replace('/?', '?');
  }, [page, state]);

  useEffect(() => {
    if (state.isFetching || !state.url) {
      return;
    }

    setState(
      state.url !== url
        ? {
            isFetching: true,
            url,
          }
        : {
            ...state,
            isFetching: true,
          },
    );
    marvelProxy[getNavigatableUrl()].then((value) => {
     
      const dataList : any = value.data
      const dataUrl : any = (state && state.data ? state.data[url] : [])
      setState({
        ...state,
        isFetching: false,
        data: {
          [url]: {
            count: dataList.count, 
            limit: dataList.limit,
            offset:  dataList.offset,
            results: (state && state.data && dataUrl && dataUrl.results && dataUrl.results.length > 0  ? [...state.data[url].results,...dataList.results, ] : dataList.results)
          }
        }
      } as ContextStateFetched<MarvelData>);
    });
  }, [page, url]);

  return (
    <ApiRequestContext.Provider
      value={[
        state,
        {
          paginate: () => {setPage(page + 10)}
        }
      ]}>
      {children}
    </ApiRequestContext.Provider>
  );
}

export const useCachedRequests = (): [
  ApiRequestContextState<MarvelData>,
  IActions,
] => {
  return useContext(ApiRequestContext);
};

function HeroesList() {
  const [state, actions] = useCachedRequests();
  
  if (state && state.data){
    const dataList: any = Object.values(state.data)[0];
    return (
      <View>
        <FlatList
            data={dataList.results}
            renderItem={({item}) => <CharacterCard character={item} /> }
            contentContainerStyle={styles.flatListContentContainer}
            onEndReached={actions.paginate}
            onEndReachedThreshold={0.1}
            ListFooterComponent={ 
              state.isFetching === false ?   
              (<ActivityIndicator 
                size='large'
                style={styles.spiner}
                color="#e23636" />) : null  }
        />
      </View>
    );
  }
  else {
    return (<View><Text>Loading..</Text></View>)
  }
}
export function HeroesProvidedComponent({url}: {url: string}) {
  return (
    <CachedRequestsProvider maxResultsPerPage={10} url={url}>
      <HeroesList />
    </CachedRequestsProvider>
  );
}

function ComicsList({character}: any) {
  const [state, actions] = useCachedRequests();
 
  if (state && state.data){
    const dataList: any = Object.values(state.data)[0];
    return (
      <View>
        <FlatList
          data={dataList.results}
         ListHeaderComponent={
            <View style={styles.contentCharacter}>
                <Text style={styles.characterName} >{character.name}</Text>
                <Image source={{uri: `${character.thumbnail.path}.${character.thumbnail.extension}`}} style={styles.imageCharacter} />
                <View style={{flexDirection:'row'}} >
                  <Text style={styles.characterDescription} > {character.description}</Text>
                </View>
                <Text style={styles.FontComicsAppearance} > Appears in comics</Text> 
            </View>}
          renderItem={({item}) => 
            <View style={styles.content}>
              <Text style={styles.textComics}> {item.title} </Text>
              <Image source={{uri: `${item.thumbnail.path}.${item.thumbnail.extension}` }} style={styles.imageComics}/>
            </View>
            }
          contentContainerStyle={styles.contentComics}
          onEndReached={actions.paginate}
          onEndReachedThreshold={0.1}
          ListFooterComponent={
            state.isFetching === false ? 
            (<ActivityIndicator 
                size='large'
                style={styles.spiner}
            />) : null}
        />
      </View>
    );
  }
  else {
    return (<View><Text>Loading..</Text></View>)
  }
}



export function ComicsProvidedComponent({url, character}: {url: string, character: {}}) {
  return (
    <CachedRequestsProvider maxResultsPerPage={10} url={url}>
      <ComicsList character={character} />
    </CachedRequestsProvider>
  );
}

const styles = StyleSheet.create({
  flatListContentContainer: {
      paddingHorizontal: 5,
  }, 
  spiner: {
    marginTop: 20,
    marginBottom: 60,
  },
  contentCharacter: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10
  },
  imageCharacter: {
    width: 300,
    height: 300,
    borderRadius: 10
  },
  characterName: {
      paddingTop: 15,
      paddingBottom: 10,
      marginLeft: 20,
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 20,
  },
  centerContent: {
      alignItems: 'center',
  },
  characterDescription:{
      paddingTop: 20,
      paddingBottom: 15,
      fontSize: 15,
      fontWeight: 'bold',
      color: '#fff',
      width: '97%',
      flex: 1,
      flexWrap: 'wrap',
  },
  FontComicsAppearance: {
      color: '#fff', 
      fontSize: 20,
  },
  contentComics: {
      width: 400,
      paddingBottom: 50,
      alignItems: 'center',
  },
  content: {
      marginTop: 20,
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: 10,
      width: 300,
      height: 300,
  },
  imageComics: {
      width: 250,
      height: 250,
      borderRadius: 10,
  },
  textComics: {
      paddingBottom: 10,
      fontWeight: 'bold'
  },
})