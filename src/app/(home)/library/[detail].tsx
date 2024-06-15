import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { useLocalSearchParams } from 'expo-router';


export default function FolderDetail() {
 const detail = useLocalSearchParams() as { name: string; description: string };


 console.log(detail.name);


 return (
   <View style={styles.container}>
     <View style={styles.header}>
       <Text style={styles.title}>{detail.name}</Text>
       <Text style={styles.description}>{detail.description}</Text>
     </View>
     <View style={styles.content}>
       <Text style={styles.messageTitle}>This folder has no sets</Text>
       <Text style={styles.messageDescription}>
         Organize your study sets by adding them to this folder.
       </Text>
     </View>
     <TouchableOpacity style={styles.addButton}>
       <Text style={styles.addButtonText}>Add a set</Text>
     </TouchableOpacity>
   </View>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   backgroundColor: '--background--',
   padding: 16,
 },
 header: {
   alignItems: 'flex-start',
   marginBottom: 24,
 },
 title: {
   fontSize: 30,
   fontWeight: 'bold',
   color: '#B8860B',
 },
 description: {
   fontSize: 20,
   color: '#B8860B',
   marginBottom: 8,
 },
 content: {
   flex: 1,
   justifyContent: 'center',
   alignItems: 'center',
 },
 messageTitle: {
   fontSize: 24,
   fontWeight: 'bold',
   color: '#333',
   textAlign: 'center',
 },
 messageDescription: {
   fontSize: 16,
   color: '#777',
   textAlign: 'center',
   marginTop: 8,
 },
 addButton: {
   backgroundColor: '#007bff',
   padding: 16,
   alignItems: 'center',
   borderRadius: 8,
   position: 'absolute',
   bottom: 16,
   left: 16,
   right: 16,
 },
 addButtonText: {
   color: '#fff',
   fontSize: 18,
 },
});
