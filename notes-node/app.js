const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');
const titleOption = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOption = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
}

const argv = yargs.command('add','Add a new note', {
    title: titleOption,
    body: bodyOption
})
.command('list','List all notes')
.command('read','Read a note',{
    title:titleOption
})
.command('remove', 'Remove a note',{
    title:titleOption
})
.help()
.argv;
var command = process.argv[2];
// console.log("Command: "+command);
// console.log("Process ", process.argv)
// console.log("Yargs ", argv);

if(command=="add"){
    var note = notes.addNote(argv.title, argv.body);
    notes.logNote(note);
}
else if(command=="list"){
    var result = notes.getAll();
    result.forEach(element => {
        notes.logNote(element);
    });
}
else if(command=="read"){
    var results = notes.read(argv.title);
    if(results){
        notes.logNote(results[0]);
    }else{
        console.log("Note not found");
    }
}
else if(command=="remove"){
    var removedNotes = notes.remove(argv.title);
    var message = removedNotes ? "Note was removed":"Note not found";
}
else{
    console.log("Command not recognized");
}