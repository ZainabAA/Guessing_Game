import React, {useState} from 'react';
import { StyleSheet, View } from 'react-native';

import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {

  const [userNumber, setUserNumber] = useState();
  const [guessRound, setGuessRounds] = useState(0);

  const configureNewGameHnadler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
  };

  const gameOverHandler = roundsNum => {
    setGuessRounds(roundsNum);
  };

  let content=<StartGameScreen onStartGame={startGameHandler} />;

  if(userNumber && guessRound<=0){
    content=<GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />;
  } else if(guessRound>0){
    content=<GameOverScreen roundsNum={guessRound} userNumber={userNumber} onRestart={configureNewGameHnadler} />
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess The Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1
  }
});

