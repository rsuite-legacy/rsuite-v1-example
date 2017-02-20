
const initialState = {
    locale: 'en',
    menuItems: [
        {
            'localeKey': 'Github',
            'icon': 'fa fa-github',
            'children': [
                {
                    'localeKey': 'Events',
                    'link': '/events'
                },
                {
                    'localeKey': 'Repositories',
                    'link': '/repos'
                }
            ]
        }
    ]
};

export default function settings(state = initialState, action) {
    return state;
};
