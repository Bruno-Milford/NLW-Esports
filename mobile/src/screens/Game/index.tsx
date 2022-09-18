import { useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';

import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard/index';
import { Background } from '../../components/Background';

import { Entypo } from '@expo/vector-icons';

import logoImg from '../../assets/logo-nlw-esports.png'

import { styles } from './styles';
import { THEME } from '../../theme';

import { GameParams } from '../../@types/navigation';

export function Game() {
  const route = useRoute();
  const navigation = useNavigation();
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const game = route.params as GameParams;

  function handleGoBack() {
    navigation.goBack();
  }

  useEffect(() => {
    fetch(`http://10.0.0.143:3333/games/${ game.id }/ads`)
      .then(response => response.json())
      .then(data => setDuos(data));
  }, [])

  return (
    <Background>
      <ScrollView>
        <SafeAreaView style={ styles.container }>
          <View style={ styles.header }>
            <TouchableOpacity onPress={ handleGoBack }>
              <Entypo 
                name="chevron-thin-left"
                color={ THEME.COLORS.CAPTION_300 }
                size={ 20 }
              />
            </TouchableOpacity>

            <Image source={ logoImg } style={ styles.logo } />
            <View style={ styles.right }/>
          </View>

          <Image
            source={{ uri: game.bannerUrl }}
            style={ styles.cover } 
            resizeMode="cover"
          />

          <Heading title={ game.title } subtitle="Conecte-se e comece a jogar" />

          <FlatList  
            data={ duos }
            keyExtractor={ item => item.id }
            renderItem={({ item }) => (
              <DuoCard  
                data={ item } 
                onConnect={ () => {} }  
              />
            )}
            style={ styles.containerList }
            contentContainerStyle={[ duos.length > 0 ? styles.contentList : styles.emptyListContent ]}
            horizontal
            showsHorizontalScrollIndicator={ false }
            ListEmptyComponent={ () => (
              <Text style={ styles.emptyListText }>
                Não há anúncios publicados ainda.
              </Text>
            ) }
          />
        </SafeAreaView>
      </ScrollView>
    </Background>
  );
}