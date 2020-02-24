import {Request, Response} from 'express';

import Note from 'models/note';

interface PageData {
    meta?: {
        charset: string;
        description: string;
    };
    notes?: Note[];
    note?: Note;
    title?: string;
    staticBasePath?: string;
}

// Каждый контроллер (controller) обычно экспортирует
// несколько функций-действий (actions)
export function list(req: Request, res: Response): void {
    const {meta, staticBasePath, title} = req.locals;
    const notes = Note.findAll();

    // Объединяем данные специфичные для контроллера с общими данными
    const data: PageData = {
        meta,
        notes,
        staticBasePath,
        title
    };

    res.render('index', data);
}

export function item(req: Request, res: Response): void {
    const {meta, staticBasePath, title} = req.locals;
    const {name} = req.params;

    const note = Note.find(name);

    const data: PageData = {
        meta,
        note,
        staticBasePath,
        title
    };

    if (note) {
        res.render('note', data);
    } else {
        // Код «404 Not Found» отправляют в ответ на отсутствующий HTTP-ресурс,
        // в нашем случае отсутствующую заметку
        res.sendStatus(404);
    }
}

export function create(req: Request, res: Response): void {
    // Благодаря body-parser мидлваре у нас в поле `body`
    // разобранное тело POST запроса
    const {name, text} = req.body;

    const note = new Note({name, text});

    note.save();

    // Редирект с кодом «302 Moved Temporarily»
    // не позволяет отправлять форму дважды
    res.redirect(302, '/notes');
}
