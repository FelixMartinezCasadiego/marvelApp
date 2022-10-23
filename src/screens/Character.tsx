import { View, StyleSheet } from 'react-native';
import React, {useState, useEffect} from 'react';
import { Result } from '../api/typeApi';
import { marvelCharacterById } from '../api';
import ComicsContainerByCharacter from '../components/ComicsContainerByCharacter';


interface Props {route: Result};

export default function Character({route} : Props) {
  
  const [character, setCharacter] = useState<Result[]>();

  useEffect(() => {
    (
      async () => { 
        try {
          const responseCharacterById = await marvelCharacterById(route.params.id);
          if(responseCharacterById){
            setCharacter(responseCharacterById)
          }
          
        } catch (error) {
          throw error
        }
       }
    )()
  }, [route]);
   

  return (
    <>
      { character ? 
        ( 
          <>
              <View style={styles.bgContent} >
                <ComicsContainerByCharacter character={character[0]} />
              </View>
          </>

        ) 
        : '' }
    </>
  )
}

const styles = StyleSheet.create({
  bgContent: {
    height: "100%",
    backgroundColor: '#518cca',
  }
})