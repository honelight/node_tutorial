// module.exports.age=25;

// module.exports.addNote = function(input){
//     console.log('addNote');
//     return input+' new note';
// };

// module.exports.add = function(a,b){
//     return a+b;
// }

const fs = require('fs');

var fetchNotes = function(){
    try{
        var notesString = fs.readFileSync('notes-data.json');
        notes = JSON.parse(notesString);
        return notes;
    }catch(e){
        return [];
    }   
}

var saveNotes = function(note, notes){
    var duplicateNotes = notes.filter(
        (value)=>value.title===note.title
    );
    if(duplicateNotes.length === 0){
        notes.push(note);
        fs.writeFileSync('notes-data.json', JSON.stringify(notes));
        return note;
    }else{
        console.log("Note title "+note.title +" already in use");
        return undefined;
    }
}

var addNote = function(title, body){
    var notes = fetchNotes();
    var note = {
        "title":title, 
        "body": body
    }; 
    saveNotes(note, notes);
    return note;
}

var getAll = function(){
    return fetchNotes();
}

var read = function(key){
    var notes = fetchNotes();
    var noteValues = notes.filter(value=>value.title===key)
    return noteValues;
}

var remove = function(key){
    var notes = fetchNotes();
    var newNotes = notes.filter(value=>value.title!==key)

    if(notes.length !== newNotes.length){
        fs.writeFileSync('notes-data.json', JSON.stringify(newNotes));
        return newNotes;
    }else{
        return undefined;
    }
}

var logNote = function(note){
    console.log(`Title: ${note.title}`);
    console.log(`Body: ${note.body}`);
}

module.exports = {
    addNote: addNote,
    getAll: getAll,
    read: read,
    remove: remove,
    logNote: logNote
};