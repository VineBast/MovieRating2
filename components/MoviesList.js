import { NavigationContainer, useRoute } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Linking } from 'react-native';
import { ButtonGroup, Card } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { useEffect, useState, useLayoutEffect } from "react";
import { StatusBar } from 'expo-status-bar';

const MoviesList = () => {
    const route = useRoute();
    const moviesList = route.params;
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [selectedIndexSort, setSelectedIndexSort] = useState(0);

    useEffect(() => {
        console.log('UseEffect');
        
        console.log(selectedIndex);
        console.log(selectedIndexSort);
        if (selectedIndex == 0 && selectedIndexSort == 0) {
            moviesList.sort((a, b) => b.title.localeCompare(a.title))
        }
        if (selectedIndex == 0 && selectedIndexSort == 1) {
            moviesList.sort((a, b) => a.title.localeCompare(b.title));
        }
        if (selectedIndex == 1 && selectedIndexSort == 0) {
            moviesList.sort((a, b) => b.date - a.date);
        }
        if (selectedIndex == 1 && selectedIndexSort == 1) {
            moviesList.sort((a, b) => a.date - b.date);
        }
        if (selectedIndex == 2 && selectedIndexSort == 0) {
            moviesList.sort((a, b) => b.rate - a.rate);
        }
        if (selectedIndex == 2 && selectedIndexSort == 1) {
            moviesList.sort((a, b) => a.rate - b.rate);
        }        
    }, [selectedIndex, selectedIndexSort]);

    return (
        <View style={styles.card}>
            <ButtonGroup
                buttons={['Titre', 'Date de sortie', 'Note']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(0);
                    setSelectedIndex(value);
                }}
            />
            <ButtonGroup
                buttons={['Croissant', 'Décroissant']}
                selectedIndex={selectedIndexSort}
                onPress={(valueSort) => {
                    setSelectedIndexSort(0)
                    setSelectedIndexSort(valueSort);
                }}
            />
            <FlatList
                data={moviesList}
                extraData={moviesList}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <Card>
                        <Card.Title>{item.title}</Card.Title>
                        <Card.Divider />
                        <Card.Image source={item.imageLink} />
                        <Card.Divider />
                        <Text style={styles.title}>Date de sortie : </Text>
                        <Text style={[styles.padding_3, styles.comment, styles.grey]}>{item.date}</Text>
                        <Text style={styles.title}>Synopsis : </Text>
                        <Text style={[styles.padding_3, styles.grey]}>{item.synopsis} </Text>
                        <Text style={styles.title}>Commentaires :</Text>
                        <Text style={[styles.padding_3, styles.comment, styles.grey]}>{item.comments}</Text>
                        <Text style={styles.title}>Note :</Text>
                        <Rating
                            style={styles.padding_3}
                            type='custom'
                            readonly
                            startingValue={item.rate}
                            imageSize={25}
                            ratingCount={10}
                            size={10}
                            ratingColor='#FFE656'
                        />
                        <Text style={[styles.title, styles.colorBlue]} onPress={() => Linking.openURL(item.IMDb)}>IMDb</Text>
                    </Card>
                )}
            />
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


export default MoviesList;