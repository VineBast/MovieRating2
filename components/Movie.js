import { useRoute } from '@react-navigation/native';
import { StyleSheet, Text, View, Linking } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';

const Movie = ({ }) => {
    const route = useRoute();
    const [movie, setMovie] = useState(route.params);

    return (
        <View>
            <Card>
                <Card.Title>{movie.title}</Card.Title>
                <Card.Divider />
                <Card.Image source={{ uri: movie.imageLink }} />
                <View style={styles.buttonIMDb}>
                    <Button
                        title='Voir sur IMDb'
                        buttonStyle={styles.buttonStyleIMDb}
                        onPress={() => Linking.openURL(movie.IMDb)} />
                </View>
                <Card.Divider />
                <Text style={styles.title}>Date de sortie : </Text>
                <Text style={[styles.padding_3, styles.comment, styles.grey]}>{movie.date}</Text>
                <Text style={styles.title}>Synopsis : </Text>
                <Text style={[styles.padding_3, styles.grey]}>{movie.synopsis} </Text>
                <Text style={styles.title}>Note :</Text>
                <Rating
                    style={styles.padding_3}
                    type='custom'
                    readonly
                    startingValue={movie.rate}
                    imageSize={25}
                    ratingCount={10}
                    size={10}
                    ratingColor='#FFE656'
                />
            </Card>
            <StatusBar syle='auto' />
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
    },
    buttonIMDb: {
        padding: 2,
        width: '100%',
    },
    buttonStyleIMDb: {
        backgroundColor: '#f4c418',
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

export default Movie;