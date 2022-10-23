import { FlatList, StyleSheet } from 'react-native';
import React from 'react';
import CharacterCard from './CharacterCard';
import { Result } from '../api/typeApi';

interface Props {character: Result};


export default function CharacterList({character} : Props) {

    const arrayCharacter = [character];
    
    return (

        <FlatList 
            data={arrayCharacter}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            keyExtractor={(character) => String(character.id)}
            renderItem={({item}) => <CharacterCard character={item} /> }
            contentContainerStyle={styles.flatListContentContainer}
        /> 
    
        
    )
}

const styles = StyleSheet.create({
    flatListContentContainer: {
        paddingHorizontal: 5,
    }, 
})

