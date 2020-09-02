import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';

const randomGeneratorBetween = (min, max, exclude) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  //const randomNum = Math.floor(Math.random() * (max-min)) + min;
  const randomNum = Math.floor(min+(max-min)/2);
  if(randomNum === exclude){
    return randomGeneratorBetween(min, max, exclude);
  }
  else{
    return randomNum;
  }
}

const GameScreen = props => {


  const [currentGuess, setCurrentGuess] = useState(randomGeneratorBetween(1, 100, props.userChoice));
  const [rounds, setRounds] = useState(0);

  const currentMax=useRef(100);  //useRef doesn't rerender the component (unlike useState)
  const currentMin=useRef(1);

  const {userChoice, onGameOver} = props; //takes the values from props and saves them in var of the same name (used in useEffect)

  useEffect(() => {  //this is executed after every rerender
    if(currentGuess===props.userChoice){
      props.onGameOver(rounds);
    }
  }, [currentGuess, onGameOver, userChoice]); //instead of executing after every rerender, second parameret specifies that after the change of any of the specified values, this will execute

  const nextGuessHandler = direction => {
    if((direction=='higher' && currentGuess>props.userChoice) || (direction=='lower' && currentGuess<props.userChoice)){
      Alert.alert("Don't cheat!", "This is not true..");
      return;
    }
    if(direction=='lower'){
      currentMax.current=currentGuess;
    }
    if(direction=='higher'){
      currentMin.current=currentGuess;
    }
    setCurrentGuess(randomGeneratorBetween(currentMin.current, currentMax.current, currentGuess));
    setRounds(curRounds => curRounds+1);
  };

  return(
    <View style={styles.screen}>
      <Text>Computer's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <Button title='LOWER' onPress={nextGuessHandler.bind(this, 'lower')} />
        <Button title='HIGHER' onPress={nextGuessHandler.bind(this, 'higher')} />
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '80%'
  }
});

export default GameScreen;