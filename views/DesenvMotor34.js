import React, { useState } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { RadioButton } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DesenvMotor34 = ({ navigation }) => {
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
    
    "Faz um quebra cabeça de 3 peças.",
    "Corta algo em pedaços com tesoura.",
    "Pula de uma altura de 20 cm.",
    "Chuta uma bola grande quando enviada para si.",
    "Anda na ponta dos pés.",
    "Corre 10 passos coordenando e alternando o movimento dos braços e pés.",
    "Pedala com triciclo a distância de 1 metro e ½.",
    "Balança em um balanço quando este está em movimento.",
    "Sobe em um escorregador de 1,20m a 1,80m e escorrega.",
    "Dá cambalhotas para frente.",
    "Sobe escadas alternando os pés.",
    "Marcha (anda de forma ritmada).",
    "Apara a bola com ambas as mãos.",
    "Desenha figuras seguindo contornos ou pontilhados.",
    "Recorta ao longo de uma linha reta 20 cm, afastando-se pouco da linha."
      
  ];

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Desenvolvimento Motor {'\n'}3 a 4 anos</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={() => navigation.goBack('AutoCuidados34')} style={styles.navButton}>
            <Text style={styles.navButtonText}>{" < "}</Text>
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
        <TouchableOpacity onPress={() => navigation.navigate('Feedback')} style={styles.nextButton}>
          <Text style={styles.nextButtonText}>Gerar FeedBack</Text>
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
  nextButtonContainer: {
    flexDirection: 'row', // Alinha os botões horizontalmente
    justifyContent: 'space-between', // Espaçamento entre os botões
    marginTop: 20,
    margin: 20,
  },
  nextButton: {
    padding: 10,
    backgroundColor: '#217744',
    borderRadius: 5,
    flex: 0,
  },
  nextButtonText: {
    color: 'white',
    fontSize: 16,
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

export default DesenvMotor34;