// Filename: index.js
// Combined code from all files

import React, { useState, useEffect, useRef } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Button, Alert } from 'react-native';
// App.js content
const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Snake Game</Text>
            <SnakeGame />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 60,
        marginBottom: 20,
    },
});

// SnakeGame.js content
const CELL_SIZE = 20;
const BOARD_SIZE = 15;

const directions = {
    UP: { x: 0, y: -1 },
    DOWN: { x: 0, y: 1 },
    LEFT: { x: -1, y: 0 },
    RIGHT: { x: 1, y: 0 },
};

const generateRandomPosition = () => {
    return {
        x: Math.floor(Math.random() * BOARD_SIZE),
        y: Math.floor(Math.random() * BOARD_SIZE),
    };
};

const SnakeGame = () => {
    const [snake, setSnake] = useState([{ x: 2, y: 2 }]);
    const [direction, setDirection] = useState(directions.RIGHT);
    const [food, setFood] = useState(generateRandomPosition);
    const [isGameOver, setGameOver] = useState(false);

    const moveSnake = () => {
        setSnake((prevSnake) => {
            const newHead = {
                x: (prevSnake[0].x + direction.x + BOARD_SIZE) % BOARD_SIZE,
                y: (prevSnake[0].y + direction.y + BOARD_SIZE) % BOARD_SIZE,
            };

            for (let cell of prevSnake) {
                if (cell.x === newHead.x && cell.y === newHead.y) {
                    setGameOver(true);
                    return prevSnake;
                }
            }

            const newSnake = [newHead, ...prevSnake];
            if (newHead.x === food.x && newHead.y === food.y) {
                setFood(generateRandomPosition());
            } else {
                newSnake.pop();
            }
            return newSnake;
        });
    };

    useEffect(() => {
        if (!isGameOver) {
            const interval = setInterval(moveSnake, 200);
            return () => clearInterval(interval);
        }
    }, [snake, direction, isGameOver]);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.key) {
                case 'ArrowUp':
                    setDirection(directions.UP);
                    break;
                case 'ArrowDown':
                    setDirection(directions.DOWN);
                    break;
                case 'ArrowLeft':
                    setDirection(directions.LEFT);
                    break;
                case 'ArrowRight':
                    setDirection(directions.RIGHT);
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    const resetGame = () => {
        setSnake([{ x: 2, y: 2 }]);
        setDirection(directions.RIGHT);
        setFood(generateRandomPosition());
        setGameOver(false);
    };

    return (
        <View style={snakeStyles.wrapper}>
            <View style={snakeStyles.board}>
                {snake.map((cell, index) => (
                    <View
                        key={index}
                        style={[snakeStyles.cell, { left: cell.x * CELL_SIZE, top: cell.y * CELL_SIZE }]}
                    />
                ))}
                <View style={[snakeStyles.food, { left: food.x * CELL_SIZE, top: food.y * CELL_SIZE }]} />
            </View>
            {isGameOver && (
                <View style={snakeStyles.gameOver}>
                    <Text style={snakeStyles.gameOverText}>Game Over</Text>
                    <Button title="Restart" onPress={resetGame} />
                </View>
            )}
        </View>
    );
};

const snakeStyles = StyleSheet.create({
    wrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    board: {
        width: BOARD_SIZE * CELL_SIZE,
        height: BOARD_SIZE * CELL_SIZE,
        position: 'relative',
        backgroundColor: '#000',
        borderColor: '#eee',
        borderWidth: 1,
    },
    cell: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        backgroundColor: '#0f0',
        position: 'absolute',
    },
    food: {
        width: CELL_SIZE,
        height: CELL_SIZE,
        backgroundColor: '#f00',
        position: 'absolute',
    },
    gameOver: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: [{ translateX: -50 }, { translateY: -50 }],
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gameOverText: {
        color: '#fff',
        fontSize: 24,
        marginBottom: 20,
    },
});

export default App;