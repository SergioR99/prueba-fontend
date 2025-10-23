import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, Text, useColorScheme, View } from 'react-native';

const UserCard = () => {
  const { name, email, phone, company, addressStreet, address } = useLocalSearchParams();
  const theme = useColorScheme();
  const isDark = theme === "dark";

  const styles = StyleSheet.create({
    userContent: {
      backgroundColor: '#2686f3ff',
      borderRadius: '50%',
      padding: 16,
      width: 80,
      height: 80,
      textAlign: 'center',
      borderWidth: 8,
      borderColor: isDark ? "#121212" :  "#FFF",
      marginHorizontal: 'auto',
      zIndex: 10
    },
    userImg: {
      width: 32,
      height: 32,
    },
    contentGeneral: {
      backgroundColor: isDark ? "#121212ff" : "#FFFFFF",
      padding: 24,
      marginTop: -20,
    },
    text: {
      fontSize: 16,
      color: isDark ? "#ffffff" : '#696969ff',
      marginBottom: 16,
      textAlign: 'center'
    }
  });

  return (
    <View>
      <View style={styles.userContent}>
        <Image 
          style={styles.userImg}
          source={require('@/assets/images/perfil.png')} 
        />
      </View>
      <View style={styles.contentGeneral}>
        <Text style={styles.text}>Nombre: {name}</Text>
        <Text style={styles.text}>Email: {email}</Text>
        <Text style={styles.text}>Teléfono: {phone}</Text>
        <Text style={styles.text}>Dirección: {address} - {addressStreet}</Text>
        <Text style={styles.text}>Empresa: {company}</Text>
      </View>
    </View>
  )
}

export default UserCard