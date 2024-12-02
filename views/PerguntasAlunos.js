import * as React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaView, StyleSheet, Text, ActivityIndicator, ScrollView } from 'react-native';
import { DataTable, Button } from 'react-native-paper';
import axios from 'axios';


const API_URL = 'http://192.168.0.8:3002'; // Use o IP e a porta do seu servidor

const PerguntasAlunos = ({ navigation }) => {
  const [alunos, setAlunos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  // Função para buscar os alunos
  const fetchAlunos = async () => {
    try {
      const response = await axios.get(`${API_URL}/alunos`);
      setAlunos(response.data);
    } catch (error) {
      setError('Erro ao buscar alunos. Tente novamente mais tarde.');
      console.error('Erro ao buscar alunos:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // Função para calcular a idade e redirecionar com base na faixa etária
  const startQuestions = (aluno) => {
    const nascimento = new Date(aluno.data_nascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    if (
      hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
    ) {
      idade--; // Ajuste caso a data de aniversário ainda não tenha ocorrido este ano
    }

    let telaDestino;
    if (idade >= 0 && idade < 1) {
      telaDestino = 'Socializacao01';
    } else if (idade >= 1 && idade < 2) {
      telaDestino = 'Socializacao12';
    } else if (idade >= 2 && idade < 3) {
      telaDestino = 'Socializacao23';
    } else if (idade >= 3 && idade < 4) {
      telaDestino = 'Socializacao34';
    } else if (idade >= 4 && idade < 5) {
      telaDestino = 'Socializacao45';
    } else if (idade >= 5 && idade <= 6) {
      telaDestino = 'Socializacao56';
    } else {
      telaDestino = null;
    }

    if (telaDestino) {
      navigation.navigate(telaDestino, { alunoId: aluno.id });
    } else {
      alert('Idade fora do intervalo esperado.');
    }
  };

  React.useEffect(() => {
    // Chama a função de busca de alunos ao montar o componente
    fetchAlunos();

    // Adiciona um listener para o evento de foco da tela
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAlunos(); // Atualiza a lista de alunos sempre que a tela é focada
    });

    // Limpa o listener ao desmontar o componente
    return unsubscribe;
  }, [navigation]);

  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <DataTable>
              <DataTable.Header>
                <DataTable.Title style={styles.nomeColumn}>
                  <Text style={styles.headerText}>Nome</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.headerText}>Idade</Text>
                </DataTable.Title>
                <DataTable.Title>
                  <Text style={styles.headerText}>Iniciar Teste</Text>
                </DataTable.Title>
              </DataTable.Header>
              {alunos.length > 0 ? (
                alunos.map((aluno) => (
                  <DataTable.Row key={aluno.id}>
                    <DataTable.Cell style={styles.nomeColumn}>
                      <Text style={styles.cellText}>{aluno.nome}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Text style={styles.cellText}>{aluno.idade}</Text>
                    </DataTable.Cell>
                    <DataTable.Cell>
                      <Button
                        mode="contained"
                        onPress={() => startQuestions(aluno)} // Redireciona para a tela correta
                        style={styles.button}
                        labelStyle={styles.buttonText}
                      >
                        Ir
                      </Button>
                    </DataTable.Cell>
                  </DataTable.Row>
                ))
              ) : (
                <DataTable.Row>
                  <DataTable.Cell style={styles.noDataCell}>
                    <Text style={styles.cellText}>Nenhum aluno encontrado</Text>
                  </DataTable.Cell>
                </DataTable.Row>
              )}
            </DataTable>
          </ScrollView>
        )}
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFDE59',
  },
  scrollView: {
    flexGrow: 2,
  },
  nomeColumn: {
    flex: 2,
  },
  headerText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cellText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#217744',
    justifyContent: 'center',
    width: '100%',
    height: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  noDataCell: {
    textAlign: 'center',
    color: '#888',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default PerguntasAlunos;

