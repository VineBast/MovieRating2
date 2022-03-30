import { useRoute } from '@react-navigation/native';
import { FlatList, StyleSheet, Text, View, } from 'react-native';
import { ButtonGroup, Card, SearchBar, Button } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { useEffect, useState } from "react";
import { StatusBar } from 'expo-status-bar';

const MoviesList = ({ navigation }) => {
    const route = useRoute();
    const [searchText, onChangeSearchText] = useState("");
    const [moviesList, setMoviesList] = useState(route.params);
    const [moviesListConst] = useState(moviesList);
    const [selectedIndex, setSelectedIndex] = useState(null);
    const [selectedIndexSort, setSelectedIndexSort] = useState(null);

    const sortMoviesList = () => {
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
    }

    useEffect(() => {
        if (searchText) {
            const newData = moviesList.filter((item) => {
                const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
                const textData = searchText.toUpperCase();
                return itemData.indexOf(textData) > -1;
            });
            setMoviesList(newData);
        } else {
            setMoviesList(moviesListConst);
        }
    }, [searchText]);

    return (
        <View style={styles.card}>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={onChangeSearchText}
                value={searchText}
                round='true'
                containerStyle={{ backgroundColor: 'white', padding: 5 }}
                inputContainerStyle={{ backgroundColor: 'white' }}
                lightTheme='true'
            ></SearchBar>
            <ButtonGroup
                buttons={['Croissant', 'Décroissant']}
                selectedIndexSort={selectedIndexSort}
                onPress={(valueSort) => {
                    setSelectedIndexSort(valueSort);
                    sortMoviesList();
                }}
            />
            <ButtonGroup
                buttons={['Titre', 'Date de sortie', 'Note']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    setSelectedIndex(value);
                    sortMoviesList();
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
                        <Card.Image source={{ uri: item.imageLink }} />
                        <View style={styles.button}>
                            <Button title="Voir plus"
                                buttonStyle={styles.buttonStyle}
                                onPress={() => navigation.navigate("Détails", moviesListConst[item.id])} />
                        </View>
                        <Card.Divider />
                        <Text style={styles.title}>Date de sortie : </Text>
                        <Text style={[styles.padding_3, styles.comment, styles.grey]}>{item.date}</Text>
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
    buttonStyle: {
        backgroundColor: '#8EDBBE',
        borderRadius: 5,
    },
    button: {
        padding: 2,
    },
    buttonIMDb: {
        padding: 2,
        width: '100%',
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