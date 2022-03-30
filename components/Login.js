import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';

const Login = ({ navigation }) => {
    const [login, setLogin] = useState("");
    const [loginTemp, onChangeLoginTemp] = useState("");
    const [passwordTemp, onChangePasswordTemp] = useState("");
    const [passwordTempNew, onChangePasswordTempNew] = useState("");
    const [password, setPassword] = useState("");
    const [isLogged, setIsLogged] = useState(false);

    const doLogin = () => {
        if ((login == "Login") && (password == "Password")) {
            setIsLogged(true);
            navigation.navigate("Accueil");
        }
        else {
            alert("Erreur de mot de passe");
        }
    }
    const logout = () => {
        setIsLogged(false);
    }

    const changeLogin = () => {
        setLogin(loginTemp);
        onChangeLoginTemp('');
    }

    const changePassword = () => {
        if (passwordTemp == password) {

            setPassword(passwordTempNew);
        } else {
            alert('Erreur de mot de passe');
        }
    }

    if (isLogged) {
        return (
            <View style={styles.container}>
                <Text
                style={{padding: 20}}
                    h1
                    h1Style={{ color: '#8EDBBE' }}>
                    Bonjour {login}
                </Text>
                <Input
                    value={loginTemp}
                    onChangeText={onChangeLoginTemp}
                    placeholder="Entrez votre nouveau login"
                />
                <View style={styles.button}>
                    <Button
                        title="Changer login"
                        type='outline'
                        onPress={changeLogin} />
                </View>
                <Input
                    value={passwordTempNew}
                    onChangeText={onChangePasswordTempNew}
                    placeholder="Entrez votre nouveau mot de passe"
                    secureTextEntry={true}
                    type='outline'
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                />
                <Input
                    value={passwordTemp}
                    onChangeText={onChangePasswordTemp}
                    placeholder="Entrez votre ancien mot de passe"
                    secureTextEntry={true}
                    type='outline'
                    leftIcon={{ type: 'font-awesome', name: 'lock' }}
                />
                <View style={styles.button}>
                    <Button
                        title="Changer mot de passe"
                        type='outline'
                        onPress={changePassword} />
                </View>
                <View style={styles.button}>
                    <Button
                        buttonStyle={styles.buttonStyleOff}
                        title="Se déconnecter"
                        onPress={() => logout()} />
                </View>
                <View style={styles.button}>
                    <Button
                        buttonStyle={styles.buttonStyle}
                        title="Accueil"
                        onPress={() => navigation.navigate("Accueil")} />
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
            <View style={styles.buttonConnect}>
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
        width: '100%',
    },
    buttonConnect: {
        padding: 2,
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