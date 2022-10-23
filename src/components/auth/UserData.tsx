import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import useAuth from '../../hooks/useAuth';

export default function UserData() {

  const { auth, logout }= useAuth();

  return (
    <>
      { auth ? (

        <View style={styles.contentUserData} >
          <View style={styles.titleBlock} >
            <Text style={styles.titleUserData}>Welcome,</Text>
            <Text style={styles.titleUserData}> {`${auth.firstName} ${auth.lastName}`} </Text>
          </View>

          <View style={styles.dataContent} >
            <View style={styles.itemMenu} >
              <Text style={styles.itemMenuTitle} > Name: </Text>
              <Text> {`${auth.firstName} ${auth.lastName}`} </Text>
            </View>
            <View style={styles.itemMenu} >
              <Text style={styles.itemMenuTitle} > Email: </Text>
              <Text> {`${auth.email}`} </Text>
            </View>
          </View>

          <Button 
            title='Logout'
            onPress={logout}
          />

        </View>

        
        
        ) : null
      }
    </>
  )
}

const styles = StyleSheet.create({
  contentUserData: {
    marginHorizontal: 20,
    marginTop: 20,
  },
  titleBlock: {
    marginBottom: 30,
  },
  titleUserData: {
    fontWeight: 'bold',
    fontSize: 22,
    paddingTop: 20,
  },
  dataContent: {
    marginBottom: 20,
  },
  itemMenu: {
    flexDirection: "row",
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderColor: "#CFCFCF",
  },
  itemMenuTitle: {
    fontWeight: "bold",
    paddingRight: 10,
    width: 120,
  },
})