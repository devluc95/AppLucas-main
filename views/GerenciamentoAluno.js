import * as React from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StyleSheet } from 'react-native';
import { DataTable, TextInput, Modal, Portal, IconButton, Button, Text } from 'react-native-paper';
import axios from 'axios';

const API_URL = 'http://192.168.0.8:3002';

const GerenciamentoAluno = () => {
  const [visible, setVisible] = React.useState({
    addAluno: false,
    editAluno: false,
    deleteAluno: false
  });
  const [currentAluno, setCurrentAluno] = React.useState(null);
  const [alunos, setAlunos] = React.useState([]);
  const [newAluno, setNewAluno] = React.useState({ nome: '', data_nascimento: '', sexo: '' });

  const fetchAlunos = async () => {
    try {
      const response = await axios.get(`${API_URL}/alunos`);
      setAlunos(response.data);
    } catch (error) {
      console.error('Erro ao buscar alunos:', error.message);
    }
  };

  // Atualiza a lista de alunos toda vez que a página entra em foco
  useFocusEffect(
    React.useCallback(() => {
      fetchAlunos();
    }, [])
  );

  const addAluno = async () => {
    try {
      await axios.post(`${API_URL}/aluno/inserir`, newAluno);
      setNewAluno({ nome: '', data_nascimento: '', sexo: '' });
      hideModal('addAluno');
      await fetchAlunos();
    } catch (error) {
      console.error('Erro ao adicionar aluno:', error.message);
    }
  };

  const updateAluno = async () => {
    if (currentAluno?.id) {
      try {
        await axios.put(`${API_URL}/aluno/atualizar/${currentAluno.id}`, currentAluno);
        setCurrentAluno(null);
        hideModal('editAluno');
        fetchAlunos();
      } catch (error) {
        console.error('Erro ao atualizar aluno:', error.message);
      }
    }
  };

  const deleteAluno = async () => {
    if (currentAluno?.id) {
      try {
        await axios.delete(`${API_URL}/aluno/deletar/${currentAluno.id}`);
        setCurrentAluno(null);
        hideModal('deleteAluno');
        fetchAlunos();
      } catch (error) {
        console.error('Erro ao deletar aluno:', error.message);
      }
    }
  };

  const showModal = (type) => setVisible({ ...visible, [type]: true });
  const hideModal = (type) => setVisible({ ...visible, [type]: false });

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {/* <IconButton icon="plus" size={24} onPress={() => showModal('addAluno')} /> */}
        <DataTable>
          <DataTable.Header>
            <DataTable.Title><Text>Nome</Text></DataTable.Title>
            <DataTable.Title ><Text>Data de Nascimento</Text></DataTable.Title>
            <DataTable.Title style={{ width: 80 }}><Text>Sexo</Text></DataTable.Title>
            <DataTable.Title><Text>Ações</Text></DataTable.Title>
          </DataTable.Header>
          {alunos.length > 0 ? (
            alunos.map(aluno => (
              <DataTable.Row key={aluno.id}>
                <DataTable.Cell><Text>{aluno.nome}</Text></DataTable.Cell>
                <DataTable.Cell><Text>{aluno.data_nascimento}</Text></DataTable.Cell>
                <DataTable.Cell style={{ width: 80 }}><Text>{aluno.sexo}</Text></DataTable.Cell>
                <DataTable.Cell>
                  <IconButton
                    icon="pencil"
                    size={20}
                    onPress={() => {
                      setCurrentAluno(aluno);
                      showModal('editAluno');
                    }}
                  />
                  <IconButton icon="delete" size={20} onPress={() => {
                    setCurrentAluno(aluno);
                    showModal('deleteAluno');
                  }} />
                </DataTable.Cell>
              </DataTable.Row>
            ))
          ) : (
            <DataTable.Row>
              <DataTable.Cell><Text>Nenhum aluno encontrado</Text></DataTable.Cell>
            </DataTable.Row>
          )}
        </DataTable>

        {/* Modais */}
        <Portal>
          <Modal visible={visible.addAluno} onDismiss={() => hideModal('addAluno')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={newAluno.nome}
              onChangeText={text => setNewAluno(prev => ({ ...prev, nome: text }))} 
            />
            <TextInput
              label="Data de Nascimento"
              mode="outlined"
              value={newAluno.data_nascimento}
              onChangeText={text => setNewAluno(prev => ({ ...prev, data_nascimento: text }))}
            />
            <TextInput
              label="Sexo"
              mode="outlined"
              value={newAluno.sexo}
              onChangeText={text => setNewAluno(prev => ({ ...prev, sexo: text }))}
            />
            <Button mode="contained" onPress={addAluno}>Adicionar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('addAluno')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.editAluno} onDismiss={() => hideModal('editAluno')} contentContainerStyle={styles.modal}>
            <TextInput
              label="Nome"
              mode="outlined"
              value={currentAluno?.nome || ''}
              onChangeText={text => setCurrentAluno(prev => prev ? { ...prev, nome: text } : null)}
            />
            <TextInput
              label="Data de Nascimento"
              mode="outlined"
              value={currentAluno?.data_nascimento || ''}
              onChangeText={text => setCurrentAluno(prev => prev ? { ...prev, data_nascimento: text } : null)}
            />
            <TextInput
              label="Sexo"
              mode="outlined"
              value={currentAluno?.sexo || ''}
              onChangeText={text => setCurrentAluno(prev => prev ? { ...prev, sexo: text } : null)}
            />
            <Button mode="contained" onPress={updateAluno}>Salvar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('editAluno')} />
          </Modal>
        </Portal>

        <Portal>
          <Modal visible={visible.deleteAluno} onDismiss={() => hideModal('deleteAluno')} contentContainerStyle={styles.modal}>
            <TextInput label="Nome" mode="outlined" value={currentAluno?.nome || ''} disabled />
            <TextInput label="Data de Nascimento" mode="outlined" value={currentAluno?.data_nascimento || ''} disabled />
            <Button mode="contained" onPress={deleteAluno}>Deletar</Button>
            <IconButton icon="cancel" size={24} onPress={() => hideModal('deleteAluno')} />
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

export default GerenciamentoAluno;
