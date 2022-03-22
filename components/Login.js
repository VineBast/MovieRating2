import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Linking } from 'react-native';

const Login = ({ navigation }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const doLogin = () => {
        if ((login == "Login") && (password == "Password")) {
            navigation.navigate("Home");
        }
        else {
            console.log("else doLogin");
            alert("Wrong login or password");
        }
    }

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                value={login}
                onChangeText={setLogin}
                placeholder="Login"
            />
            <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
            />
            <View style={styles.button}>
                <Button color='#5F6790' title="Login" onPress={() => doLogin()} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',

    },
    button: {
        padding: 2,
        width: '40 %',
    },
    input: {
        width: '90%',
        borderBottomWidth: 1,
        margin: 1,
        fontSize: 20,
        padding: 5
    },
    card: {
        flex: 1,
        justifyContent: 'center',
        padding: 1,
    },
    padding_3: {
        padding: 3,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 15
    },
    comment: {
        fontStyle: 'italic'
    },
    grey: {
        color: 'grey'
    },
    colorBlue: {
        color: 'blue'
    }
});

export default Login;