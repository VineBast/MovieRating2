import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Button, FlatList, StyleSheet, Text, TextInput, View, Linking } from 'react-native';
import { Card } from 'react-native-elements';
import { Rating } from 'react-native-ratings';
import { useState } from "react";
import { StatusBar } from 'expo-status-bar';

const App = () => {
  const [titleInput, onChangeTitle] = useState("");
  const [commentsInput, onChangeComments] = useState("");
  const [synopsisInput, onChangesynopsis] = useState("");
  const [linkInput, onChangeLink] = useState("");
  const [rateInput, onChangeRate] = useState(null);
  const [page, setPage] = useState("home");
  const [moviesList, setMoviesList] = useState([{
    id: 0,
    title: 'Only God Forgives',
    comments: 'Parfaite réalisation de Nicolas Winding Refn !',
    IMDb: 'https://www.imdb.com/title/tt1602613/?ref_=nv_sr_srsg_0',
    synopsis: "Julian est un trafiquant de drogue vivant dans le monde criminel de Bangkok qui voit sa vie se compliquer lorsque sa mère l'oblige à rechercher et à tuer l'assassin de son frère.",
    rate: 10,
    imageLink: require('./img/only.jpeg')
  }]);

  const addMovie = () => {
    let id = moviesList.length;
    setMoviesList([...moviesList, {
      id: id,
      title: titleInput,
      comments: commentsInput,
      IMDb: linkInput,
      synopsis: synopsisInput,
      rate: rateInput
    }]);
  }

  if (page == "home") {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeTitle}
          value={titleInput}
          placeholder="Titre du film">
        </TextInput>

        <TextInput
          style={styles.input}
          onChangeText={onChangeRate}
          value={rateInput}
          keyboardType="numeric"
          placeholder="Note / 10 (ex: 3)">
        </TextInput>

        <TextInput
          style={styles.input}
          onChangeText={onChangesynopsis}
          value={synopsisInput}
          placeholder="Synopsis">
        </TextInput>

        <TextInput
          style={styles.input}
          onChangeText={onChangeComments}
          value={commentsInput}
          placeholder="Commentaires">
        </TextInput>

        <TextInput
          style={styles.input}
          onChangeText={onChangeLink}
          value={linkInput}
          placeholder="Lien IMDb">
        </TextInput>
        <View style={styles.button}>
          <Button color='#5F6790' title='Ajouter' onPress={addMovie} />
        </View>
        <View style={styles.button}>
          <Button color='#5F6790' title='Voir les films' onPress={() => setPage("list")} />
        </View>
        <StatusBar syle='auto' />
      </View>
    );
  }
  else if (page == "list") {
    return (
      <View style={styles.card}>
        <FlatList
          data={moviesList}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card>
              <Card.Title>{item.title}</Card.Title>
              <Card.Divider />
              <Card.Image source={item.imageLink} />
              <Card.Divider />
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
        <Button color='#5F6790' title='Home' onPress={() => setPage("home")} />
        <StatusBar syle='auto' />
      </View>
    );
  }
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
  colorBlue : {
    color : 'blue'
  }
});

export default App;