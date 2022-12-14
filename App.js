import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, View, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import axios from 'axios';

export default function App(){
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [sid, setSid] = useState('');
/* 
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
  } */

  const saveCliente = async () => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y Apellido obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(`http://172.16.61.227:3000/api/clientes`, {
        nombre,
        apellidos,
      });
      alert("Cliente agregado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };


  const updateCliente = async (id) => {
    if (!nombre.trim() || !apellidos.trim()) {
      alert("Nombre y Apellido obligatorios");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.put(`http://172.16.61.227:3000/api/clientes/${id}`, {
        nombre,
        apellidos,
      });
      alert("Cliente actualizado correctamente ...")
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };


  const deleteCliente = async (id) => {
    setLoading(true);
    try {
      if(confirm("¿Está seguro de eliminar el cliente?")){
        const response = await axios.delete(`http://172.16.61.227:3000/api/clientes/${id}`);
        alert("Cliente actualizado correctamente ...")
      }
      
    } catch (error) {
      console.log(error)
    }
    finally{
      setLoading(false);
    }
  };


  const getClientes = async () => {
    try{
      const url = `http://172.16.61.227:3000/api/clientes`;
      const response = await axios.get(url);
      setData(response.data)
  
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  };

  const getClientePorID = async (id) => {
    try{
      const url = `http://172.16.61.227:3000/api/clientes/${id}`;
      const response = await axios.get(url);
      setData(response.data)
      setNombre(response.data.nombre)
      setApellidos(response.data.apellidos)
  
    }
    catch(error){
      console.log(error)
    }
    finally{
      setLoading(false)
    }
  };


  useEffect(() => {
    getClientes();
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style={[styles.buttons, {backgroundColor:"green"}]}
        onPress={()=>getClientePorID(sid)}
        >
          <Text style={{color:"yellow"}}>Buscar por id</Text>

      </TouchableOpacity>

      <View>
        <TextInput
        style={styles.inputs}
        placeholder="Ingrese ID a buscar"
        onChangeText={sid => setSid(sid)}
        value={sid}
        ></TextInput>

<TextInput
        style={styles.inputs}
        placeholder="Ingrese Nombre"
        onChangeText={nombre => setNombre(nombre)}
        value={nombre}
        ></TextInput>

<TextInput
        style={styles.inputs}
        placeholder="Ingrese Aprellidos"
        onChangeText={apellidos => setApellidos(apellidos)}
        value={apellidos}
        ></TextInput>
      </View>

      {isLoading ? <ActivityIndicator size="large" color="purple"/> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (

            <TouchableOpacity 
              style={[styles.buttons, {backgroundColor: item.id%2==1 ? "orange" : "gray"}]}
              onPress={()=>{
                if(confirm(`¿Está seguro de Eliminar el usuario ${item.nombre} ${item.apellidos}?`)){
                  alert("Cliente borrado")
                }
              }}
              >
              <Text>{item.nombre} {item.apellidos}</Text>
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
  },
  inputs:{
    borderColor:"green",
    borderRadius:10,
    marginTop:5,
    textAlign:"center",
    padding:5
  }
});  