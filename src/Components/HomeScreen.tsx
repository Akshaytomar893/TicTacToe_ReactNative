import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
const HomeScreen = () => {
  const [clickedBoxes, setClickedBoxes] = useState(Array(9).fill(false));
  const [boxState, setBoxState] = useState(Array(9).fill(''));
  const [FPState, setFPState] = useState<number[]>([]);
  const [SPState, setSPState] = useState<number[]>([]);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [winner, setWinner] = useState('No winner');

  const [isFirstPlayer, setIsFirstPlayer] = useState<boolean>(true);

  const checkIsGameOver = () => {
    const winningPatter = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    if (FPState.length + SPState.length > 8) {
      setIsGameOver(true);
    }
    winningPatter.forEach((pattern: number[]) => {
      if (pattern.every(digit => FPState.includes(digit))) {
        setWinner('Player one wins');
        setIsGameOver(true);
      } else if (pattern.every(digit => SPState.includes(digit))) {
        setWinner('Player two wins');
        setIsGameOver(true);
      }
    });
  };

  const reloadFunction = () => {
    setClickedBoxes(Array(9).fill(false));
    setBoxState(Array(9).fill(''));
    setFPState([]);
    setSPState([]);
    setIsGameOver(false);
    setWinner('No Winner');
  };

  useEffect(() => {
    checkIsGameOver();
  }, [FPState, SPState]);

  const handleBoxClick = (index: number) => {
    if (clickedBoxes[index] || isGameOver) {
      return;
    }
    if (isFirstPlayer) {
      setFPState([...FPState, index]);
    } else {
      setSPState([...SPState, index]);
    }
    const updatedBoxState = [...boxState];
    updatedBoxState[index] = isFirstPlayer ? 'x' : 'o';
    setBoxState(updatedBoxState);
    const updatedClickedBoxes = [...clickedBoxes];
    updatedClickedBoxes[index] = true;
    setClickedBoxes(updatedClickedBoxes);
    setIsFirstPlayer(prev => !prev);
  };

  const renderImage = (index: number) => {
    if (clickedBoxes[index]) {
      if (boxState[index] === 'x') {
        return (
          <Image source={require('../images/x.png')} style={styles.image} />
        );
      } else {
        return (
          <Image source={require('../images/o.png')} style={styles.image} />
        );
      }
    }
    return null;
  };

  return (
    <View style={styles.gridView}>
      <Text> Welcome </Text>
      <View style={styles.gameBox}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8].map(index => (
          <TouchableOpacity
            key={index}
            style={styles.gridBox}
            onPress={() => handleBoxClick(index)}>
            {renderImage(index)}
          </TouchableOpacity>
        ))}
      </View>
      {isGameOver && <Text> Game Over {winner}</Text>}
      <TouchableOpacity style={styles.borderButton} onPress={() => reloadFunction()}>
        <Text>{'Reload'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  gridView: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  borderButton: {
    borderWidth: 4,
    borderColor: 'purple',
    marginTop: 40,
    borderRadius: 5,
    padding: 20,
  },
  gameBox: {
    height: '45%',
    width: '90%',
    display: 'flex',
    flexWrap: 'wrap',
    borderWidth: 2,
    borderColor: 'purple',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridBox: {
    borderWidth: 1,
    borderColor: 'purple',
    width: '33.333%',
    height: '33.333%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
export default HomeScreen;
