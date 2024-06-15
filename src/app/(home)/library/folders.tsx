import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import Modal from 'react-native-modal';
//npm install react-native-modal


export default function FolderPage() {
 const [folders, setFolders] = useState<{ id: string, name: string, description: string }[]>([
   { id: '1', name: 'This is title', description: 'This is description' },
   { id: '2', name: 'Folder 1', description: 'Click Add Folder to Create New Folder' },
   { id: '3', name: 'Folder 2', description: 'Click X to remove the Folder' },
   // Add initial folders here
 ]);


 const [showRemoveButtons, setShowRemoveButtons] = useState(false);
 const [isModalVisible, setModalVisible] = useState(false);
 const [newFolderName, setNewFolderName] = useState('');
 const [newFolderDescription, setNewFolderDescription] = useState('');


 const addFolder = () => {
   setFolders([...folders, { id: (folders.length + 1).toString(), name: newFolderName, description: newFolderDescription }]);
   setNewFolderName('');
   setNewFolderDescription('');
   setModalVisible(false);
 };


 const removeFolder = (id: string) => {
   setFolders(folders.filter(folder => folder.id !== id));
 };


 const toggleRemoveButtons = () => {
   setShowRemoveButtons(!showRemoveButtons);
 };


 return (
   <View style={styles.container}>
     <Text style={styles.header}>Folders</Text>
     <FlatList
       data={folders}
       keyExtractor={(item) => item.id}
       renderItem={({ item }) => (
         <TouchableOpacity
         onPress={() => {
           router.push({pathname: './[detail]', params: item});
         }}
         >
         <View style={styles.folderBox}>
           <View>
             <Text style={styles.folderText}>{item.name}</Text>
             <Text style={styles.folderDescription}>{item.description}</Text>
           </View>
           {showRemoveButtons && (
             <TouchableOpacity style={styles.removeButton} onPress={() => removeFolder(item.id)}>
               <Text style={styles.removeButtonText}>Remove</Text>
             </TouchableOpacity>
           )}
         </View>
         </TouchableOpacity>
       )}
     />
     <View style={styles.footer}>
       <TouchableOpacity style={styles.controllerButton} onPress={toggleRemoveButtons}>
         <Text style={styles.controllerButtonText}>X</Text>
       </TouchableOpacity>
       <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
         <Text style={styles.addButtonText}>Add Folder</Text>
       </TouchableOpacity>
     </View>


     <Modal isVisible={isModalVisible}>
       <View style={styles.modalContent}>
         <Text style={styles.modalTitle}>New Folder</Text>
         <TextInput
           style={styles.input}
           placeholder="Folder Name"
           value={newFolderName}
           onChangeText={setNewFolderName}
         />
         <TextInput
           style={styles.input}
           placeholder="Folder Description"
           value={newFolderDescription}
           onChangeText={setNewFolderDescription}
         />
         <View style={styles.modalButtons}>
           <TouchableOpacity style={styles.modalButton} onPress={addFolder}>
             <Text style={styles.modalButtonText}>Add</Text>
           </TouchableOpacity>
           <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
             <Text style={styles.modalButtonText}>Cancel</Text>
           </TouchableOpacity>
         </View>
       </View>
     </Modal>
   </View>
 );
}


const styles = StyleSheet.create({
 container: {
   flex: 1,
   padding: 16,
 },
 header: {
   fontSize: 32, 
   fontWeight: 'bold',
   color: '#b8860b',
   textAlign: 'center', 
   marginBottom: 16,
   marginTop: 19,
 },
 folderBox: {
   backgroundColor: '#f0f0f0',
   padding: 16,
   marginBottom: 8,
   borderRadius: 8,
   flexDirection: 'row',
   justifyContent: 'space-between',
   alignItems: 'center',
 },
 folderText: {
   fontSize: 18,
 },
 folderDescription: {
   fontSize: 14,
   color: '#555',
 },
 addButton: {
   backgroundColor: '#007bff',
   padding: 16,
   alignItems: 'center',
   borderRadius: 8,
   flex: 1,
   marginLeft: 8,
 },
 addButtonText: {
   color: '#fff',
   fontSize: 18,
 },
 removeButton: {
   backgroundColor: '#ff4444',
   padding: 8,
   borderRadius: 4,
 },
 removeButtonText: {
   color: '#fff',
   fontSize: 14,
 },
 footer: {
   flexDirection: 'row',
   alignItems: 'center',
   marginTop: 16,
 },
 controllerButton: {
   backgroundColor: '#ff4444',
   width: 40,
   height: 40,
   borderRadius: 20,
   alignItems: 'center',
   justifyContent: 'center',
 },
 controllerButtonText: {
   color: '#fff',
   fontSize: 18,
 },
 modalContent: {
   backgroundColor: 'white',
   padding: 22,
   borderRadius: 4,
   borderColor: 'rgba(0, 0, 0, 0.1)',
 },
 modalTitle: {
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 12,
 },
 input: {
   height: 40,
   borderColor: '#ccc',
   borderWidth: 1,
   marginBottom: 12,
   paddingHorizontal: 8,
 },
 modalButtons: {
   flexDirection: 'row',
   justifyContent: 'space-between',
 },
 modalButton: {
   padding: 10,
   backgroundColor: '#007bff',
   borderRadius: 4,
 },
 modalButtonText: {
   color: 'white',
   fontSize: 16,
 },
});
