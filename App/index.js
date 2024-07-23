// Filename: index.js
// Combined code from all files
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Button, TextInput, ScrollView } from 'react-native';

const WorkoutTracker = () => {
    const [workouts, setWorkouts] = useState([]);
    const [exercise, setExercise] = useState('');
    const [reps, setReps] = useState('');
    const [sets, setSets] = useState('');

    const addWorkout = () => {
        if (exercise && reps && sets) {
            setWorkouts([...workouts, { exercise, reps, sets }]);
            setExercise('');
            setReps('');
            setSets('');
        }
    };

    return (
        <ScrollView style={{ flex: 1, padding: 20 }}>
            <Text style={styles.label}>Exercise</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. Pushups"
                value={exercise}
                onChangeText={setExercise}
            />
            
            <Text style={styles.label}>Reps</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 15"
                keyboardType="number-pad"
                value={reps}
                onChangeText={setReps}
            />
            
            <Text style={styles.label}>Sets</Text>
            <TextInput
                style={styles.input}
                placeholder="e.g. 3"
                keyboardType="number-pad"
                value={sets}
                onChangeText={setSets}
            />
            
            <Button title="Add Workout" onPress={addWorkout} />
            
            {workouts.length > 0 && (
                <View style={styles.listContainer}>
                    <Text style={styles.listTitle}>Workouts</Text>
                    {workouts.map((workout, index) => (
                        <View key={index} style={styles.listItem}>
                            <Text style={styles.listItemText}>{`${workout.exercise} - ${workout.reps} reps x ${workout.sets} sets`}</Text>
                        </View>
                    ))}
                </View>
            )}
        </ScrollView>
    );
};

const App = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Workout Tracker</Text>
            <WorkoutTracker />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 50,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    label: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 5,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 10,
    },
    listContainer: {
        marginTop: 20,
    },
    listTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    listItem: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 5,
        marginBottom: 10,
        borderColor: '#ccc',
        borderWidth: 1,
    },
    listItemText: {
        fontSize: 16,
    },
});

export default App;