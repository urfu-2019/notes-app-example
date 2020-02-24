const storage: Note[] = [];

interface NoteData {
    name: string;
    text: string;
}

// Модели замыкают на себя работу с даннымии обычно представляют собой «класс»

class Note {
    static find(name?: string): Note | undefined {
        return storage.find((note: Note) => note.name === name);
    }

    static findAll(): Note[] {
        return storage;
    }

    name: string;

    text: string;

    constructor({name, text}: NoteData) {
        this.name = name;
        this.text = text;
    }

    save(): void {
        storage.push(this);
    }
}

export default Note;
