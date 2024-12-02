import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Linguagem56 = ({ navigation }) => {
  const [checked, setChecked] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleRadioChange = (question, value) => {
    setChecked((prevChecked) => ({
      ...prevChecked,
      [question]: value,
    }));
    setShowConfirmation(false);
  };

  const handleExit = () => {
    Alert.alert(
      "Você tem certeza que deseja sair?",
      "O progresso não será salvo",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { text: "Sim", onPress: () => navigation.navigate('WelcomeScreen') }
      ]
    );
  };

  const handleSubmit = () => {
    const allAnswered = questions.every((question) => checked[question]);

    if (allAnswered) {
      setShowConfirmation(true);
      Alert.alert('Respostas enviadas', 'As respostas foram enviadas com sucesso!', [
        { text: 'OK' },
      ]);
      console.log('Respostas:', checked);
    } else {
      Alert.alert(
        'Perguntas incompletas',
        'Todas as perguntas precisam ser preenchidas para enviar.'
      );
    }
  };

  const questions = [
    
    "Consegue indicar alguns, muitos e vários elementos.",
    "Diz seu endereço.",
    "Diz o número de seu telefone.",
    "Aponta para o conjunto que tem mais, menos ou poucos elementos.",
    "Conta piadas simples.",
    "Relata experiências diárias.",
    "Descreve um local ou movimento: através ou entre, longe de, de / desde..., para, por cima de, até.",
    "Responde à pergunta 'Porque' com uma explicação.",
    "Ordena e conta uma estória de 2 a 5 episódios na sequência correta.",
    "Define palavras.",
    "Responde adequadamente a pergunta 'Qual o contrário de ...'.",
    "Responde a pergunta 'O que acontece se...'.",
    "Usa 'ontem' e 'amanhã', corretamente.",
    "Pergunta o significado de perguntas novas ou conhecidas."
    
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Linguagem 5 a 6 anos</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.goBack('Socializacao56')} style={styles.navButton}>
            <Text style={styles.navButtonText}>{" < "}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Cognicao56')} style={styles.navButton}>
            <Text style={styles.navButtonText}>{" > "}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Questions Section */}
      <ScrollView style={styles.scrollContainer}>
        {questions.map((question, index) => (
          <View key={index} style={styles.questionContainer}>
            <Text style={styles.questionText}>{question}</Text>
            <View style={styles.radioButtonContainer}>
              <View style={styles.radioButtonRow}>
                <RadioButton
                  color="#217744"
                  value="sim"
                  status={checked[question] === 'sim' ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioChange(question, 'sim')}
                />
                <Text style={styles.radioButtonLabel}>Sim</Text>
              </View>
              <View style={styles.radioButtonRow}>
                <RadioButton
                  color="#217744"
                  value="nao"
                  status={checked[question] === 'nao' ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioChange(question, 'nao')}
                />
                <Text style={styles.radioButtonLabel}>Não</Text>
              </View>
              <View style={styles.radioButtonRow}>
                <RadioButton
                  color="#217744"
                  value="asVezes"
                  status={checked[question] === 'asVezes' ? 'checked' : 'unchecked'}
                  onPress={() => handleRadioChange(question, 'asVezes')}
                />
                <Text style={styles.radioButtonLabel}>Às vezes</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>

      {/* Exit and Submit Buttons */}
      <View style={styles.exitButtonContainer}>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Enviar Respostas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.exitButton} onPress={handleExit}>
          <Text style={styles.exitButtonText}>Sair</Text>
        </TouchableOpacity>
      </View>

      {/* Confirmation Icon */}
      {showConfirmation && (
        <View style={styles.confirmationContainer}>
          <Ionicons name="checkmark-circle" size={50} color="#217744" />
          <Text style={styles.confirmationText}>Respostas enviadas!</Text>
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFDE59',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  headerButtons: {
    flexDirection: 'row',
  },
  navButton: {
    marginHorizontal: 5,
    padding: 10,
    backgroundColor: '#217744',
    borderRadius: 5,
  },
  navButtonText: {
    fontSize: 20,
    color: 'white',
  },
  scrollContainer: {
    flex: 1,
  },
  questionContainer: {
    marginBottom: 20,
  },
  questionText: {
    fontSize: 18,
    color: 'black', //#333
    marginBottom: 10,
  },
  radioButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  radioButtonRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButtonLabel: {
    fontSize: 16,
    marginLeft: 8,
    color: 'black',
  },
  exitButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  exitButton: {
    padding: 10,
    backgroundColor: '#217744',
    borderRadius: 5,
  },
  exitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  submitButton: {
    padding: 10,
    backgroundColor: '#217744',
    borderRadius: 5,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  confirmationContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  confirmationText: {
    color: '#217744',
    fontSize: 18,
    marginTop: 10,
  },
});

export default Linguagem56;