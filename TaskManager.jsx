import React, {useState} from 'react'
import {StyleSheet, Pressable, TextInput, View, Text, ScrollView} from "react-native";

export const TaskManager = () => {
    const [tasks, setTasks] = React.useState([])
    const [userTaskText, setUserTaskText] = useState('')
    const addTask = (taskTitle) => {
        if (userTaskText === '') return;
        tasks.push({
            id: Date.now(),
            title: taskTitle,
            completed: false
        });
        setTasks(tasks);
        setUserTaskText('');
    }
    const toggleComplete = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                return {...task, completed: !task.completed}
            }
            return task;
        });
        setTasks(updatedTasks);
    }
    const Task = ({task}) => {
        return (
            <View style={styles.taskContainer}>
                <Text key={task.id}>{task.title}: {task.completed ? "Complete" : "Incomplete"}</Text>
                <Pressable style={styles.completeButton} onPress={() => toggleComplete(task.id)}>
                    <Text>
                        Toggle {task.completed ? "Incomplete" : "Complete"}
                    </Text>
                </Pressable>

            </View>
        )
    }
    return (
        <View style={styles.container}>
            <Text style={styles.header}>Task Manager</Text>
            <TextInput
                style={styles.input}
                onChangeText={setUserTaskText}
                value={userTaskText}
                placeholder="Enter Task..."
            />
            <Pressable style={styles.button} onPress={() => addTask(userTaskText)}>
                <Text>
                    Add task
                </Text>
            </Pressable>
            <ScrollView style={styles.tasks}>
                {
                    tasks.map(task => <Task key={task.id} task={task}/>)
                }
            </ScrollView>
        </View>
    )
}
const width = 300
const styles = StyleSheet.create({
    header: {
        marginBottom: 10,
        fontSize: 28
    },
    container: {
        height: 200,
        width: width,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 50,
        marginBottom: 50
    },
    input: {
        width: width,
        height: 50,
        borderWidth: 1,
        padding: 5
    },
    button: {
        width: width,
        height: 50,
        borderWidth: 2,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 5,
        padding: 5
    },
    tasks: {
        width: width,
        flex: 1,
        flexBasis: 1,
        marginTop: 5,
        borderWidth: 2,
        borderRadius: 25,
        padding: 10
    },
    taskContainer: {
        flex: 1,
        marginBottom: 5
    },
    completeButton: {
        borderWidth: 2,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5
    }
})