import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DataTable, TextInput, Modal, Portal, IconButton, Button } from 'react-native-paper';
import { useFocusEffect } from '@react-navigation/native'; // Import useFocusEffect
import axios from 'axios';

const API_URL = 'http://192.168.0.8:3002'; // Use o IP e a porta do seu servidor

const GerenciamentoUser = () => {
  const [visible, setVisible] = React.useState({
    addUser: false,
    editUser: false,
    deleteUser: false
  });
  const [currentUser, setCurrentUser] = React.useState(null);
  const [users, setUsers] = React.useState([]);
  const [newUser, setNewUser] = React.useState({ nome: '', email: '', senha: '' });

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${API_URL}/usuarios`);
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error.message);
    }
  };

  const addUser = async () => {
    try {
      await axios.post(`${API_URL}/usuario/inserir`, newUser);
      setNewUser({ nome: '', email: '', senha: '' });
      hideModal('addUser');
      fetchUsers();
    } catch (error) {
      console.error('Erro ao adicionar usuário:', error.message);
    }
  };

  const updateUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.put(`${API_URL}/usuario/atualizar/${currentUser.id}`, currentUser);
        setCurrentUser(null);
        hideModal('editUser');
        fetchUsers();
      } catch (error) {
        console.error('Erro ao atualizar usuário:', error.message);
      }
    }
  };

  const deleteUser = async () => {
    if (currentUser?.id) {
      try {
        await axios.delete(`${API_URL}/usuario/deletar/${currentUser.id}`);
        setCurrentUser(null);
        hideModal('deleteUser');
        fetchUsers();
      } catch (error) {
        console.error('Erro ao deletar usuário:', error.message);
      }
    }
  };

  // Utiliza useFocusEffect para atualizar ao acessar a página
  useFocusEffect(
    React.useCallback(() => {
      fetchUsers();
    }, [])
  );

  const showModal = (type) => setVisible({ ...visible, [type]: true });
  const hideModal = (type) => setVisible({ ...visible, [type]: false });

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {/* <IconButton icon="plus" size={24} onPress={() => showModal('addUser')} /> */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Nome</DataTable.Title>
            <DataTable.Title>Email</DataTable.Title>
            <DataTable.Title>Senha</DataTable.Title>
            <DataTable.Title>Ações</DataTable.Title>
          </DataTable.Header>
          {users.length > 0 ? (
            users.map(user => (
              <DataTable.Row key={user.id}>
                <DataTable.Cell>{user.nome}</DataTable.Cell>
                <DataTable.Cell>{user.email}</DataTable.Cell>
                <DataTable.Cell>{user.senha}</DataTable.Cell>
                <DataTable.Cell>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => {
                      setCurrentUser(user);
                      showModal('editUser');
                    }}
                  />
                  <IconButton icon="delete" size={20} onPress={() => {
                    setCurrentUser(user);
                    showModal('deleteUser');
                  }} />
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <DataTable.Row>
              <DataTable.Cell>Nenhum usuário encontrado</DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>

        {/* Modais */}
        <Portal>
          <Modal visible={visible.addUser} onDismiss={() => hideModal('addUser')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={newUser.nome}
              onChangeText={text => setNewUser(prev => ({ ...prev, nome: text }))}
            />
            <TextInput
              label="Email"
              mode="outlined"
              value={newUser.email}
              onChangeText={text => setNewUser(prev => ({ ...prev, email: text }))}
            />
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry
              value={newUser.senha}
              onChangeText={text => setNewUser(prev => ({ ...prev, senha: text }))}
            />
            <Button mode="contained" onPress={addUser}>Adicionar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('addUser')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.editUser} onDismiss={() => hideModal('editUser')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={currentUser?.nome || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, nome: text } : null)}
            />
            <TextInput
              label="Email"
              mode="outlined"
              value={currentUser?.email || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, email: text } : null)}
            />
            <TextInput
              label="Senha"
              mode="outlined"
              secureTextEntry
              value={currentUser?.senha || ''}
              onChangeText={text => setCurrentUser(prev => prev ? { ...prev, senha: text } : null)}
            />
            <Button mode="contained" onPress={updateUser}>Salvar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('editUser')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.deleteUser} onDismiss={() => hideModal('deleteUser')} contentContainerStyle={styles.modal}>
            <TextInput label="Nome" mode="outlined" value={currentUser?.nome || ''} disabled />
            <TextInput label="Email" mode="outlined" value={currentUser?.email || ''} disabled />
            <Button mode="contained" onPress={deleteUser}>Deletar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('deleteUser')} />
          </Modal>
        </Portal>
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  modal: {
    backgroundColor: 'white',
    padding: 20,
    margin: 20,
  },
});

export default GerenciamentoUser;
