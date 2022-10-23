import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';
import React from 'react';
import { Result } from '../api/typeApi';
import {useNavigation} from '@react-navigation/native' ;

interface Props {character: Result};

export default function CharacterCard({character} : Props) {

    const navigation =  useNavigation();
    
    const goToCharacter = () => {
        navigation.navigate("Character", {id: character.id})
    }

  return (
    <TouchableWithoutFeedback onPress={goToCharacter}>
        
        <View style={styles.card}>
            <View style={styles.spacing}>
                <View style={styles.bgStyles}>
                    <Text style={styles.characterName}> {character.name}</Text>
                    {character.comics ?(
                        <Text style={styles.comicsNumber}> in #{character.comics.available} comics </Text>
                    ): null}
                    { character.thumbnail ?(
                        <Image 
                        source={{uri: `${character.thumbnail.path}.${character.thumbnail.extension}` }} 
                        style={styles.imageList}/>
                    ): null}
                </View>
                
            </View>
        </View> 
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        height: 150
    },
    spacing: {
        flex: 1,
        padding: 5
    },
    bgStyles:{
        flex: 1,
        backgroundColor: "#e23636",
        borderRadius: 15,
        padding: 2,
    },
    imageList: {
        position: 'absolute',
        bottom: 1,
        right: 10,
        width: 95,
        height: 95,
        borderRadius: 15,
    },
    characterName: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        paddingTop: 10,
    },
    comicsNumber: {
        color: '#fff',
        fontSize: 11,
    },
})