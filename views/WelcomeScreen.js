import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const WelcomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bem-vindo ao aplicativo!</Text>
      
      {/* Texto do título e descrição diretamente na tela */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>GUIA PORTAGE DE EDUCAÇÃO PRÉ-ESCOLAR</Text>
      </View>
      <Image 
        source={require('../assets/img/logo_psico2.png')} 
        style={styles.logo} 
        resizeMode="contain" 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDE59',
  },
  welcomeText: {
    fontSize: 26,
    color: 'black',
    marginBottom: 40,
    fontWeight: 'bold',
  },
  titleContainer: {
    marginBottom: 30,
    width: 300,
  },
  title: {
    fontSize: 32, // Ajuste o tamanho para corresponder à imagem
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  description: {
    fontSize: 16, // Ajuste o tamanho para corresponder à imagem
    color: 'black',
    textAlign: 'center',
  },
  logo: {
    width: 320,
    height: 320,
    marginTop: -30,
  },
});

export default WelcomeScreen;
