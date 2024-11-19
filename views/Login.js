import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const Login = ({ navigation, setIsLoggedIn }) => {
  const [email, setEmail] = useState(''); // Alterado para 'email'
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (email && password) {
      try {
        const response = await fetch('http://172.16.6.227:3002/usuario/login', { // Ajuste o URL conforme necessário
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, senha: password }), // Campos enviados para a API
        });

        if (!response.ok) {
          const errorData = await response.json();
          alert(errorData.error || 'Erro ao fazer login.'); // Mensagem de erro
          return;
        }

        const data = await response.json();
        setIsLoggedIn(true); // Atualiza o estado de login
        navigation.navigate('WelcomeScreen'); // Navega para WelcomeScreen ao fazer login
      } catch (error) {
        alert('Erro ao conectar ao servidor.'); // Mensagem de erro de conexão
      }
    } else {
      alert('Por favor, preencha todos os campos.'); // Mensagem de erro simples
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleGoHome = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email" // Alterado para 'Email'
        placeholderTextColor="#919191"
        value={email} // Alterado para 'email'
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor="#919191"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Voltar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotPasswordText}>Esqueci minha senha</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFDE59',
    padding: 20,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  input: {
    height: 50,
    backgroundColor: '#fff',
    borderColor: '#217744',
    borderWidth: 2,
    marginBottom: 20,
    paddingHorizontal: 25,
    borderRadius: 15,
    width: '100%', // Usar largura total
    maxWidth: 350, // Limite máximo de largura
    color: '#000',
    fontSize: 18,
  },
  button: {
    backgroundColor: '#217744',
    borderRadius: 15,
    padding: 15,
    width: '100%', // Usar largura total
    maxWidth: 350, // Limite máximo de largura
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
  forgotPasswordText: {
    fontSize: 16,
    color: 'black',
    marginTop: 20,
  },
});

export default Login;
