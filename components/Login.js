import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View, Linking } from 'react-native';
import { Input, Button } from 'react-native-elements';

const Login = ({ navigation }) => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setIsLogged] = useState(false);

    const doLogin = () => {
        if ((login == "Login") && (password == "Password")) {
            setIsLogged(true);
            navigation.navigate("Ajouter");
        }
        else {
            console.log("else doLogin");
            alert("Mauvais mot de passe");
        }
    }
    const logout = () => {
        setIsLogged(false);
    }

    if (isLogged == true) {
        return (
            <View style={styles.container}>
                <View style={styles.button}>
                    <Button buttonStyle={styles.buttonStyle} title="Ajouter des films" onPress={() => navigation.navigate("Ajouter")} />
                </View>
                <View style={styles.button}>
                    <Button buttonStyle={styles.buttonStyleOff} title="Se déconnecter" onPress={() => logout()} />
                </View>
            </View>
        );
    }
    return (
        <View style={styles.container}>
            <Input
                value={login}
                onChangeText={setLogin}
                placeholder="Login"
                leftIcon={{ type: 'font-awesome', name: 'user' }}
            />
            <Input
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                secureTextEntry={true}
                leftIcon={{ type: 'font-awesome', name: 'lock' }}
            />
            <View style={styles.button}>
                <Button buttonStyle={styles.buttonStyle} 
                title="Se connecter" onPress={() => doLogin()} />
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
    buttonStyle: {
        backgroundColor: '#8EDBBE',
        borderRadius: 5,
    },
    buttonStyleOff: {
        backgroundColor: '#F52F2F',
        borderRadius: 5,
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