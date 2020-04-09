import Link from 'next/link';
import React from 'react';

import {NoteData} from 'types';

interface NotesProps {
    notes: NoteData[];
}

export default function Notes({notes}: NotesProps) {
    return (
        <ul>
            {notes.map(note => {
                const linkAs = `/notes/${note.name}`;
                const linkHref = {pathname: '/item', query: {name: note.name}};

                // Для реализации клиентского роутинга (без полной перезагрузки страницы) используем <Link />
                return (
                    <li key={note.name}>
                        <Link as={linkAs} href={linkHref}>
                            <a>{note.name}</a>
                        </Link>
                    </li>
                );
            })}
        </ul>
    );
}
