import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const CadastroAluno = ({ navigation }) => {
  const [nome, setNome] = useState('');
  const [sexo, setSexo] = useState('');
  const [dataNascimento, setDataNascimento] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // Função para calcular a idade
  const calcularIdade = (nascimento) => {
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    if (
      hoje.getMonth() < nascimento.getMonth() ||
      (hoje.getMonth() === nascimento.getMonth() && hoje.getDate() < nascimento.getDate())
    ) {
      idade--;
    }
    return idade;
  };

  useEffect(() => {
    const checkFields = () => {
      if (nome && sexo && dataNascimento) {
        setIsButtonDisabled(false);
      } else {
        setIsButtonDisabled(true);
      }
    };

    checkFields();
  }, [nome, sexo, dataNascimento]);

  const handleSave = async () => {
    // Verifica se a data de nascimento é maior que a data atual
    if (dataNascimento > new Date()) {
      Alert.alert("Data de Nascimento inválida", "A data de nascimento não pode ser maior que a data atual.");
      return;
    }

    const idade = calcularIdade(dataNascimento);

    if (idade >= 7) {
      Alert.alert("Idade inválida", "O aluno deve ter menos de 7 anos para ser cadastrado.");
      return;
    }

    try {
      const response = await fetch('http://192.168.0.6:3002/aluno/inserir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome,
          data_nascimento: dataNascimento.toISOString().split('T')[0], // Formata a data para o formato YYYY-MM-DD
          sexo,
        }),
      });

      if (response.ok) {
        const aluno = await response.json();
        Alert.alert("Sucesso", "Aluno cadastrado com sucesso!");
      } else {
        const errorData = await response.json();
        Alert.alert("Erro", errorData.error || "Erro ao cadastrar aluno.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Erro ao conectar com o servidor.");
    }
  };

  const handleExit = () => {
    Alert.alert("Você tem certeza que deseja sair?", "", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sim", onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Aluno</Text>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Nome:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome completo"
          placeholderTextColor="#000"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.radioContainer}>
        <Text style={styles.radioLabel}>Sexo:</Text>
        <TouchableOpacity
          style={[styles.radioButton, sexo === 'M' && styles.radioButtonSelected]}
          onPress={() => setSexo('M')}
        >
          <Text>Masculino</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.radioButton, sexo === 'F' && styles.radioButtonSelected]}
          onPress={() => setSexo('F')}
        >
          <Text>Feminino</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.dateContainer}>
        <Text style={styles.dateLabel}>Data de Nascimento:</Text>
        <TouchableOpacity style={styles.dateInput} onPress={() => setShowDatePicker(true)}>
          <Text>{Intl.DateTimeFormat('pt-BR').format(dataNascimento)}</Text>
        </TouchableOpacity>
      </View>

      {showDatePicker && (
        <DateTimePicker
          value={dataNascimento}
          mode="date"
          display="default"
          onChange={(event, date) => {
            setShowDatePicker(Platform.OS === 'ios');
            if (date) setDataNascimento(date);
          }}
          locale="pt-BR"
        />
      )}

      <TouchableOpacity
        style={[styles.saveButton, isButtonDisabled && styles.saveButtonDisabled]}
        onPress={handleSave}
        disabled={isButtonDisabled}
      >
        <Text style={styles.saveButtonText}>Gravar</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFDE59',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    padding: 40,
    color: '#000',
  },
  input: {
    height: 45,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    marginBottom: 20,
    paddingHorizontal: 10,
    backgroundColor: 'white',
    fontSize: 15,
    width: 310,
  },
  radioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 1,
    fontSize: 18,
  },
  radioLabel: {
    marginRight: 20,
    color: '#000',
  },
  radioButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 15,
    padding: 10,
    marginTop: -25,
    marginRight: 10,
    backgroundColor: '#fff',
    fontSize: 18,
    width: 150,
    alignItems: 'center',
  },
  radioButtonSelected: {
    backgroundColor: '#FFF',
    borderColor: '#217744',
    borderWidth: 3,
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    padding: 5,
  },
  dateLabel: {
    marginRight: 10,
    color: '#000',
  },
  dateInput: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    width: 220,
  },
  saveButton: {
    backgroundColor: '#217744',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonDisabled: {
    backgroundColor: '#4DA470',
  },
  saveButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 2,
  },
});

export default CadastroAluno;
