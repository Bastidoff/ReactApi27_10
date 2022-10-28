import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

export default function App(){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      {isLoading ? <ActivityIndicator size="large" color="purple"/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (

            <TouchableOpacity 
              style={[styles.buttons, {backgroundColor: item.id%2==1 ? "orange" : "gray"}]}
              onPress={()=>{
                if(confirm(`¿Está seguro de Eliminar el usuario ${item.name}, ${item.username}?`)){
                  alert("Cliente borrado")
                }
              }}
              >
              <Text>{item.name}</Text>
            </TouchableOpacity>
            
          )}
        />
      )}
    </View>
  );
};


const styles = StyleSheet.create({  
  container: {  
    flex: 1,  
    justifyContent: 'center',  
    alignItems: 'center',  
    backgroundColor: '#F5FCFF',  
  },  
  buttons:{
    borderRadius:10,
    padding:10,
    justifyContent:'center',
    alignItems:'items',
    height:40,
    marginBottom:10
  }
});  