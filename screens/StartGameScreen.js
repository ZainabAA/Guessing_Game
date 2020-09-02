import React, {useState} from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import Colors from '../constants/colors';

const StartGameScreen = props => {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState();

  const numberInputHandler = inputText => {
    //if(inputText[0]<='9' && inputText[0]>='0' && inputText[1]<='9' && inputText[1]>='0')
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNum = parseInt(enteredValue);
    if(isNaN(chosenNum) || chosenNum<=0 || chosenNum>99){
      Alert.alert('Invalid Number!', 'The number should be between 1 and 99',
        [{text: 'Okay', style: 'destructive', onPress: resetInputHandler}]
      );
      return;
    }
    setEnteredValue('');
    setConfirmed(true);
    setSelectedNumber(chosenNum);
    Keyboard.dismiss();
  };

  let confirmOutput;
  if(confirmed){
    confirmOutput= 
      <Card style={styles.summaryContainer}>
        <Text>You selcted</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <Button title='START GAME' onPress={()=>{props.onStartGame(selectedNumber)}} />
      </Card>
  }

  return(
    <TouchableWithoutFeedback onPress={()=>{
      Keyboard.dismiss();
    }}>
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game!</Text>
        <Card style={styles.inputContainer}>
          <Text>Select a Number</Text>
          <Input style={styles.input} 
            blurOnSubmit autoCapitilize='none' 
            autoCorrect={false} 
            keyboardType='number-pad' 
            maxLength={2}
            onChangeText={numberInputHandler}
            value={enteredValue}/>
          <View style={styles.buttonContainer}>
            <View style={styles.button}><Button onPress={resetInputHandler} title="reset" color={Colors.accent} /></View>
            <View style={styles.button}><Button title="confirm" onPress={confirmInputHandler} color={Colors.primary} /></View>
          </View>
        </Card>
        {confirmOutput}
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles=StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  title: {
    fontSize: 20,
    marginVertical: 10
  },
  inputContainer: {
    width: 300,
    maxWidth: '80%',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 15
  },
  button: {
    width: 90
  },
  input: {
    width: 50,
    textAlign: 'center'
  },
  summaryContainer: {
    margin: 20,
    alignItems: 'center'
  }
});

export default StartGameScreen;