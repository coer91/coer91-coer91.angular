import { IMenu } from "coer91.tools/interfaces";

export const NAVIGATION: IMenu[] = [
    { id: 1, label: 'g g g gggg',   icon: 'i91-alarm', path: '/one' },
    { id: 2, label: 'two',   icon: '', path: '/one' },
    { id: 3, label: 'three',   icon: 'i91-alarm',                 path: '/one' },
    
    { id: 4, label: 'four',  icon: 'i91-bars', items: [
        { id: 5, label: 'inner-five',  icon: '', path: '/one' },
        { id: 6, label: 'inner-sisx',  icon: '', path: '/one' },
        { id: 4, label: 'four',  icon: 'i91-bars', items: [ 
            { id: 5, label: 'five',  icon: '', path: '/one' },
            { id: 6, label: 'sisx',  icon: '', path: '/one' },
        ]}
    ]},

    
];