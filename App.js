import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Importe suas telas
import HomeScreen from './views/HomeScreen';
import CadastroUser from './views/CadastroUser';
import Login from './views/Login';
import ForgotPassword from './views/ForgotPassword';
import CadastroAluno from './views/CadastroAluno';
import Feedback from './views/FeedBack';
import Socializacao01 from './views/Socializacao01';
import Socializacao12 from './views/Socializacao12';
import Socializacao23 from './views/Socializacao23';
import Socializacao34 from './views/Socializacao34';
import Socializacao45 from './views/Socializacao45';
import Socializacao56 from './views/Socializacao56';
import WelcomeScreen from './views/WelcomeScreen';
import GerenciamentoUser from './views/GerenciamentoUser';
import GerenciamentoAluno from './views/GerenciamentoAluno';
import Linguagem01 from './views/Linguagem01';
import Linguagem12 from './views/Linguagem12';
import Linguagem23 from './views/Linguagem23';
import Linguagem34 from './views/Linguagem34';
import Linguagem45 from './views/Linguagem45';
import Linguagem56 from './views/Linguagem56';
import Cognicao01 from './views/Cognicao01';
import Cognicao12 from './views/Cognicao12';
import Cognicao23 from './views/Cognicao23';
import Cognicao34 from './views/Cognicao34';
import Cognicao45 from './views/Cognicao45';
import Cognicao56 from './views/Cognicao56';
import AutoCuidados01 from './views/AutoCuidados01';
import AutoCuidados12 from './views/AutoCuidados12';
import AutoCuidados23 from './views/AutoCuidados23';
import AutoCuidados34 from './views/AutoCuidados34';
import AutoCuidados45 from './views/AutoCuidados45';
import AutoCuidados56 from './views/AutoCuidados56';
import DesenvMotor01 from './views/DesenvMotor01';
import DesenvMotor12 from './views/DesenvMotor12';
import DesenvMotor23 from './views/DesenvMotor23';
import DesenvMotor34 from './views/DesenvMotor34';
import DesenvMotor45 from './views/DesenvMotor45';
import DesenvMotor56 from './views/DesenvMotor56';
import PerguntasAlunos from './views/PerguntasAlunos';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

// Stack Navigator para HomeScreen, Login e CadastroUser
function AuthStack({ setIsLoggedIn }) {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Login" 
        options={{ headerShown: false }} 
      >
        {props => <Login {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Stack.Screen>
      <Stack.Screen 
        name="CadastroUser" 
        component={CadastroUser} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="ForgotPassword" 
        component={ForgotPassword} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="WelcomeScreen" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// Stack Navigator para telas acessíveis pelo Drawer
function MainStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="WelcomeScreen" 
        component={WelcomeScreen} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="CadastroAluno" 
        component={CadastroAluno} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Feedback" 
        component={Feedback} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Linguagem01" 
        component={Linguagem01} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Linguagem12" 
        component={Linguagem12} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Linguagem23" 
        component={Linguagem23} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Linguagem34" 
        component={Linguagem34} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Linguagem45" 
        component={Linguagem45} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Linguagem56" 
        component={Linguagem56} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Socializacao01" 
        component={Socializacao01} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Socializacao12" 
        component={Socializacao12} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Socializacao23" 
        component={Socializacao23} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Socializacao34" 
        component={Socializacao34} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Socializacao45" 
        component={Socializacao45} 
        options={{ headerShown: false }} 
      /><Stack.Screen 
      name="Socializacao56" 
      component={Socializacao56} 
      options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cognicao01" 
        component={Cognicao01} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cognicao12" 
        component={Cognicao12} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cognicao23" 
        component={Cognicao23} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cognicao34" 
        component={Cognicao34} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cognicao45" 
        component={Cognicao45} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="Cognicao56" 
        component={Cognicao56} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AutoCuidado01" 
        component={AutoCuidados01} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AutoCuidados12" 
        component={AutoCuidados12} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AutoCuidados23" 
        component={AutoCuidados23} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AutoCuidados34" 
        component={AutoCuidados34} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AutoCuidados45" 
        component={AutoCuidados45} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="AutoCuidados56" 
        component={AutoCuidados56} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DesenvMotor01" 
        component={DesenvMotor01} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DesenvMotor12" 
        component={DesenvMotor12} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DesenvMotor23" 
        component={DesenvMotor23} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DesenvMotor34" 
        component={DesenvMotor34} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DesenvMotor45" 
        component={DesenvMotor45} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="DesenvMotor56" 
        component={DesenvMotor56} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="GerenciamentoUser" 
        component={GerenciamentoUser} 
        options={{ headerShown: false }} 
      />
    </Stack.Navigator>
  );
}

// Tela de Logout
function LogoutScreen({ setIsLoggedIn, navigation }) {
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setIsLoggedIn(false);
    });
    return unsubscribe;
  }, [navigation]);

  return null;
}

// Drawer Navigator
function DrawerNavigator({ setIsLoggedIn }) {
  return (
    <Drawer.Navigator
      initialRouteName="Inicio" 
      screenOptions={{
        headerShown: true,
        headerStyle: { backgroundColor: '#FFDD59' },
        headerTitle: '',
      }}
    >
      <Drawer.Screen name="Inicio" component={MainStack} />
      <Drawer.Screen name="Gerenciar Usuários" component={GerenciamentoUser} />
      <Drawer.Screen name="Gerenciar Alunos" component={GerenciamentoAluno} />      
      <Drawer.Screen name="Cadastro Usuario" component={CadastroUser} />
      <Drawer.Screen name="Cadastro Aluno" component={CadastroAluno} />
      <Drawer.Screen name="Perguntas" component={PerguntasAlunos} />
      <Drawer.Screen name="Feedback" component={Feedback} />
      <Drawer.Screen
        name="Sair"
        options={{
          headerShown: false,
          drawerItemStyle: { marginTop: 20 },
        }}
      >
        {props => <LogoutScreen {...props} setIsLoggedIn={setIsLoggedIn} />}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {isLoggedIn ? (
          <DrawerNavigator setIsLoggedIn={setIsLoggedIn} />
        ) : (
          <AuthStack setIsLoggedIn={setIsLoggedIn} />
        )}
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
