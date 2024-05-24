import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Pressable, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {
  const [text, setText] = useState('');
  const [showHomePage, setShowHomePage] = useState(false);
  const [showNoteArea, setShowNoteArea] = useState(false);
  const [noteText, setNoteText] = useState('');
  const [savedNotes, setSavedNotes] = useState([]);
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Track selected note for editing

  useEffect(() => {
    const timerhello = setTimeout(() => {
      setText("Hello!");
    }, 1000);

    const timer = setTimeout(() => {
      setText("It's XP time! 📃");
    }, 2000);

    const timer2 = setTimeout(() => {
      setText("Let's write!");
    }, 3000);

    const timerex = setTimeout(() => {
      setText("e");
    }, 3500);

    const timerx = setTimeout(() => {
      setText("ex");
    }, 4000);

    const timerxp = setTimeout(() => {
      setText("exp");
    }, 4500);

const timerxpo = setTimeout(() => {
      setText("expo");
    }, 5000);

    const timerxpos = setTimeout(() => {
      setText("expos");
    }, 5500);

    const timerxposi = setTimeout(() => {
      setText("exposi");
    }, 6000);

    const timerxposit = setTimeout(() => {
      setText("exposit");
    }, 6500);

    const timerxpositi = setTimeout(() => {
      setText("expositi");
    }, 7000);

    const timerxpositio = setTimeout(() => {
      setText("expositio");
    }, 7500);

    const timerxposition = setTimeout(() => {
      setText("exposition");
    }, 8000);

    const timer3 = setTimeout(() => {
      setShowHomePage(true);
      setText('');
    }, 8500);
    // Load saved notes from AsyncStorage on component mount
    loadNotes();

    return () => {
      clearTimeout(timerhello);
      clearTimeout(timer);
      clearTimeout(timer2);
      clearTimeout(timer3);
      clearTimeout(timerex);
      clearTimeout(timerx);
      clearTimeout(timerxp);
      clearTimeout(timerxpo);
      clearTimeout(timerxpos);
      clearTimeout(timerxposi);
      clearTimeout(timerxposit);
      clearTimeout(timerxpositi);
      clearTimeout(timerxpositio);
      clearTimeout(timerxposition);
      
    };
  }, []);

  const loadNotes = async () => {
    try {
      const storedNotes = await AsyncStorage.getItem('notes');
      if (storedNotes !== null) {
        setSavedNotes(JSON.parse(storedNotes));
      }
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const saveNote = async () => {
    try {
      const newNote = { id: Date.now(), text: noteText };
      const updatedNotes = [...savedNotes, newNote];
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
      setSavedNotes(updatedNotes);
      setNoteText('');
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };

  const handleNoteButtonClick = () => {
    setShowNoteArea(true);
  };

  const handleSaveNote = async () => {
    try {
      if (selectedNoteId !== null) {
        // If a note is selected for editing
        const updatedNotes = savedNotes.map((note) =>
          note.id === selectedNoteId ? { ...note, text: noteText } : note
        );
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        setSavedNotes(updatedNotes);
      } else {
        // If it's a new note
        const newNote = { id: Date.now(), text: noteText };
        const updatedNotes = [...savedNotes, newNote];
        await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        setSavedNotes(updatedNotes);
      }
      setShowNoteArea(false);
      setNoteText('');
      setSelectedNoteId(null);
    } catch (error) {
      console.error('Error saving note:', error);
    }
  };
  

   // Existing code...

   const handleNoteClick = (noteId) => {
    if (selectedNoteId === noteId) {
      // If the selected note is clicked again, trigger editing
      setEditingNoteId(noteId); // Set the editing note ID
      const editingNote = savedNotes.find(note => note.id === noteId); // Find the editing note
      if (editingNote) {
        setNoteText(editingNote.text); // Populate noteText with the text of the editing note
        setShowNoteArea(true); // Show the note editing area
      }
    } else {
      // Otherwise, select the note
      setSelectedNoteId(noteId); // Set the selected note ID
      const selectedNote = savedNotes.find(note => note.id === noteId); // Find the selected note
      if (selectedNote) {
        setNoteText(selectedNote.text); // Populate noteText with the text of the selected note
        setShowNoteArea(false); // Hide the note editing area
      }
    }
  };
  

  const handleDeleteAllNotes = async () => {
    try {
      // Clear all notes from AsyncStorage
      await AsyncStorage.removeItem('notes');
      // Clear the savedNotes state
      setSavedNotes([]);
    } catch (error) {
      console.error('Error deleting all notes:', error);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      // Filter out the selected note from the list of saved notes
      const updatedNotes = savedNotes.filter(note => note.id !== noteId);
      setSavedNotes(updatedNotes); // Update the list of saved notes
      setSelectedNoteId(null); // Clear selected note ID
      setNoteText(''); // Clear note text
  
      // Update AsyncStorage to reflect the changes
      await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };
  

  const renderHomePage = () => {
    return (
      <View style={[styles.homePage, { backgroundColor: 'transparent' }]}>
        <View style={styles.notesContainer}>
          {showHomePage && (
            <>
              {savedNotes.map(note => (
                  <View style={styles.noteItem}>
                    <Text>{note.text.length > 7 ? note.text.substring(0, 7) + '...' : note.text}</Text>
                    <Pressable onPress={() => handleNoteClick(note.id)}>
                    <Text style={styles.editButton}>📝</Text>
                    </Pressable>
                    <Pressable onPress={() => handleDeleteNote(note.id)}>
                      <Text style={styles.deleteButton}>🗑️</Text>
                    </Pressable>
                    
                  </View>
              ))}
            </>
          )}
        </View>
        <Pressable style={styles.createButton} onPress={handleNoteButtonClick}>
          <Text style={styles.createText}>+</Text>
        </Pressable>
        {savedNotes.length > 0 && (
          <Pressable style={styles.deleteAllButton} onPress={handleDeleteAllNotes}>
            <Text style={[styles.deleteAllText, { color: 'white' }, { fontWeight: 'bold' }, { lineHeight: 40 }]}>Delete All</Text>
          </Pressable>
        )}
      </View>
    );
  };

  const renderNoteArea = () => {
    if (showNoteArea) {
      return (
        <View style={styles.noteArea}>
          <TextInput
            style={styles.noteInput}
            multiline={true}
            value={noteText}
            onChangeText={setNoteText}
            placeholder="Write your note here..."
          />
          <Pressable style={styles.saveButton} onPress={handleSaveNote}>
            <Text style={styles.saveText}>Save</Text>
          </Pressable>
        </View>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        style={styles.gradient}
        colors={["#FF0000", "#0000FF"]}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
      >
        <Text style={[styles.text, { display: showHomePage ? 'none' : 'flex' }]}>
          {showHomePage ? null : text}
        </Text>
        {renderHomePage()}
        {renderNoteArea()}
        <StatusBar style='auto' />
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: 'silver',
    fontSize: 20,
    marginBottom: 20,
  },
  homePage: {
    position: 'absolute',
    top: 1,
    right: 1,
    zIndex: 2, // Ensure the button is above the gradient background
  },
  createButton: {
    backgroundColor: 'transparent',
    borderRadius: 25,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'stretch',
    borderWidth: 2,
    borderColor: 'white',
    paddingVertical: -20,
    paddingHorizontal: 15,
    marginTop: 10,
    alignSelf: 'flex-end', // Align the button to the right
  },
  createText: {
    color: 'white',
    fontSize: 30,
    lineHeight: 50,
  },
  noteArea: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '80%',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 10,
  },
  noteInput: {
    height: 100,
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  saveButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveText: {
    color: 'white',
    fontSize: 18,
  },
  notesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center', // Vertically align notes
  },
  noteItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 5,
    padding: 10,
    margin: 5,
    alignItems: 'center', // Center content horizontally
    justifyContent: 'center', // Center content vertically
  },
  noteText: {
    color: 'black', // Set text color to black
  },
  deleteButton: {
    color: 'red',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
  deleteAllButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    alignSelf: 'flex-end', // Align the button to the right
  },
  deleteAllText: {
    color: 'white',
    fontWeight: 'bold',
  },
  editButton: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5,
  },
});