import { StyleSheet, View} from 'react-native';
import { ButtonGroup, Button, Input } from 'react-native-elements';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';

const ApiKey = () => {
    return ('k_19o8ngj2');
    //return ('k_h6zff0y9');
}

const createRequest = (movieTitle) => {
    return ("https://imdb-api.com/fr/API/SearchMovie/" + ApiKey() + "/" + movieTitle);
}
const createOptionRequest = (movieId) => {
    return ("https://imdb-api.com/fr/API/Title/" + ApiKey() + "/" + movieId);
}

const createLinkRequest = (movieId) => {
    return ("https://imdb-api.com/en/API/ExternalSites/" + ApiKey() + "/" + movieId);
}

const HomeScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [showLocal, setShowLocal] = useState(true);
    const [showIMDb, setShowIMDb] = useState(false);
    const [titleInput, onChangeTitle] = useState("");
    const [titleInputIMDb, onChangeTitleIMDb] = useState("");
    const [dateInput, onChangeDate] = useState("");
    const [synopsisInput, onChangeSynopsis] = useState("");
    const [linkInput, onChangeLink] = useState("");
    const [imageInput, onChangeImageInput] = useState("");
    const [rateInput, onChangeRate] = useState(null);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [moviesList, setMoviesList] = useState([{
        id: 0,
        title: 'Only God Forgives',
        date: 2013,
        IMDb: 'https://www.imdb.com/title/tt1602613/?ref_=nv_sr_srsg_0',
        synopsis: "Julian est un trafiquant de drogue vivant dans le monde criminel de Bangkok qui voit sa vie se compliquer lorsque sa mère l'oblige à rechercher et à tuer l'assassin de son frère.",
        rate: 10,
        imageLink: 'https://fr.web.img6.acsta.net/pictures/210/002/21000216_20130419192202667.jpg'
    }, {
        id: 1,
        title: 'The Batman',
        date: 2022,
        IMDb: 'https://www.imdb.com/title/tt1877830/?ref_=nv_sr_srsg_0',
        synopsis: "Lorsque le Riddler, un tueur en série maniaque, commence à assassiner des personnalités politiques clés à Gotham, Batman est obligé d'enquêter sur la corruption cachée de la ville et de remettre en question l'implication de sa famille.",
        rate: 9,
        imageLink: 'https://fr.web.img5.acsta.net/pictures/22/02/16/17/42/3125788.jpg'
    }, {
        id: 2,
        title: 'Encanto',
        date: 2021,
        IMDb: 'https://www.imdb.com/title/tt2953050/',
        synopsis: "En Colombie, une jeune femme doit faire face à la frustration d'être la seule de sa famille à ne pas avoir de pouvoirs magiques.",
        rate: 8,
        imageLink: 'https://fr.web.img6.acsta.net/pictures/21/09/29/10/15/0378531.jpg'
    }, {
        id: 3,
        title: 'Juste la fin du monde',
        date: 2016,
        IMDb: 'https://www.imdb.com/title/tt4645368/?ref_=nv_sr_srsg_0',
        synopsis: "Louis (Gaspard Ulliel), un écrivain en phase terminale, retourne dans sa famille après une longue absence pour lui annoncer sa mort prochaine.",
        rate: 10,
        imageLink: 'https://fr.web.img5.acsta.net/pictures/16/08/19/11/38/081608.jpg'
    }, {
        id: 4,
        title: 'Tenet',
        date: 2020,
        IMDb: 'https://www.imdb.com/title/tt6723592/',
        synopsis: "Un espion est sélectionné pour déjouer un complot menant à une 3ème guerre mondiale. Aidé de mystérieux objets à entropie 'inversée' dont il doit découvrir la provenance, son enquête commence avec pour seul indice un nom de code : 'TENET'.",
        rate: 5,
        imageLink: 'https://fr.web.img2.acsta.net/pictures/20/08/03/12/15/2118693.jpg'
    }
    ]);

    const findMovie = async () => {
        setIsLoading(true);
        let movieTitle = titleInputIMDb;
        let res = await fetch(createRequest(movieTitle));
        let movieInfos = await res.json();
        let resTrailer = await fetch(createOptionRequest(movieInfos.results[0].id));
        let resLink = await fetch(createLinkRequest(movieInfos.results[0].id));
        let link = await resLink.json();
        let trailerInfo = await resTrailer.json();
        let movieObj = {
            title: movieInfos.results[0].title,
            synopsis: trailerInfo.plotLocal,
            image: movieInfos.results[0].image,
            date: link.year,
            IMDb: link.imDb.url
        };
        addMovieIMDb(movieObj);
    }

    const addMovie = () => {
        setIsLoading(true);
        let id = moviesList.length;
        setMoviesList([...moviesList, {
            id: id,
            title: titleInput,
            date: dateInput,
            IMDb: linkInput,
            synopsis: synopsisInput,
            rate: rateInput,
            imageLink: imageInput
        }]);
        setIsLoading(false);
        onChangeTitleIMDb('');
        onChangeTitle('');
        onChangeDate('');
        onChangeRate('');
        onChangeLink('');
        onChangeSynopsis('');
        onChangeImageInput('');
    }

    const addMovieIMDb = (movieObj) => {
        let id = moviesList.length;
        setMoviesList([...moviesList, {
            id: id,
            title: movieObj.title,
            synopsis: movieObj.synopsis,
            imageLink: movieObj.image,
            date: movieObj.date,
            IMDb: movieObj.IMDb,
            rate: rateInput
        }]);
        setIsLoading(false);
        onChangeTitleIMDb('');
        onChangeTitle('');
        onChangeDate('');
        onChangeRate('');
        onChangeLink('');
        onChangeSynopsis('');
        onChangeImageInput('');
    }

    const show = () => {
        setShowIMDb(!showIMDb);
        setShowLocal(!showLocal);
    }

    return (
        <View style={styles.container}>
            <ButtonGroup
                buttons={['Local', 'IMDb']}
                selectedIndex={selectedIndex}
                onPress={(value) => {
                    if (value != selectedIndex) {
                        show();
                        setSelectedIndex(value);
                    }
                }}
            />
            {showIMDb ? (
                <Input
                    onChangeText={onChangeTitleIMDb}
                    value={titleInputIMDb}
                    placeholder="Recherche IMDb (titre + date en option)">
                </Input>) : null}

            {showLocal ? (<Input
                onChangeText={onChangeTitle}
                value={titleInput}
                placeholder="Titre du film">
            </Input>) : null}

            {showLocal ? (<Input
                onChangeText={onChangeDate}
                value={dateInput}
                keyboardType="numeric"
                placeholder="Année de sortie">
            </Input>) : null}

            {showLocal ? (<Input
                onChangeText={onChangeSynopsis}
                value={synopsisInput}
                placeholder="Synopsis">
            </Input>) : null}

            {showLocal ? (<Input
                onChangeText={onChangeLink}
                value={linkInput}
                placeholder="Lien IMDb">
            </Input>) : null}

            {showLocal ? (<Input
                onChangeText={onChangeImageInput}
                value={imageInput}
                placeholder="Lien Image">
            </Input>) : null}

            <Input
                onChangeText={onChangeRate}
                value={rateInput}
                keyboardType="numeric"
                placeholder="Note / 10">
            </Input>
            <View style={styles.button}>
                {showIMDb ? (
                    <Button
                        buttonStyle={styles.buttonStyleIMDb} loading={isLoading}
                        title='Ajouter avec IMDb' onPress={findMovie} />) : null}
                {showLocal ? (
                    <Button buttonStyle={styles.buttonStyle} loading={isLoading} title='Ajouter' onPress={addMovie} />) : null}
            </View>

            <View style={styles.button}>
                <Button
                    buttonStyle={styles.buttonStyle}
                    title='Voir les films'
                    onPress={() => navigation.navigate("Films", moviesList)} />
            </View>
            <View style={styles.button}>
                <Button
                    title='Paramètres'
                    onPress={() => navigation.navigate("Profil")} />
            </View>
            <StatusBar syle='auto' />
        </View >

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center'

    },
    button: {
        padding: 2,
        width: '100%',
    },
    buttonStyle: {
        backgroundColor: '#8EDBBE',
        borderRadius: 5,
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
    inputIMDb: {
        width: '90%',
        borderBottomWidth: 1,
        color: "#f4c418",
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


export default HomeScreen;