type Level = {
    id: string;
    hints: string [];
    imgSrc: string;
    imgAlt: string;
    password: string;
};

const PICKLE_RICK_ID = 'pickle-rick';
const MR_MESEEKS_ID = 'mr-meeseeks';

export const levels: Level[] = [
    {
        id: PICKLE_RICK_ID,
        hints: [
            'Ogórek i Rick połączeni w jedno',
            'Hasło to dwa słowa, drugie to imię',
            'Ogórek po angielsku to Pickle',
        ],
        imgSrc: './../assets/pickle-rick.jpg',
        imgAlt: 'Kreskówkowy wizerunek antropomorficznego zielonego ogórka z twarzą, leżącego na szarej powierzchni ze zdziwionym wyrazem twarzy. Postać ma dwoje dużych oczu z niebieskimi tęczówkami, szeroko otwarte usta z widocznymi zębami i jest podkreślona jaśniejszymi odcieniami zieleni i plamami.',
        password: 'pickle rick',
    },
    {
        id: MR_MESEEKS_ID,
        hints: [
            'Wysoka, humanoidalna postać o niebieskiej skórze',
            'Ma wydłużone, wąskie kończyny, dużą cebulkowatą głowę, małe, czarne oczy i wysoki głos',
            'Hasło składa się z dwóch słów',
            'Pierwsze słowo to "mr."',
        ],
        imgSrc: './../assets/mr-meeseeks.png',
        imgAlt: 'Wysoka, humanoidalna postać o niebieskiej skórze. Ma wydłużone, wąskie kończyny, dużą cebulkowatą głowę, małe, czarne oczy i wysoki głos',
        password: 'mr. meeseeks',
    },
];

export const getLevel = (index: number) => levels[index];