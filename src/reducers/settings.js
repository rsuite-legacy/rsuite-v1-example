
const initialState = {
  locale: 'en',
  menuItems: [
    {
      'localeKey': 'Github',
      'icon': 'icon icon-github',
      'children': [
        {
          'localeKey': 'Events',
          'link': '/events'
        },
        {
          'localeKey': 'Repositories',
          'link': '/repos'
        },
        {
          'localeKey': 'Users',
          'link': '/users'
        }
      ]
    }
  ]
};

export default function settings(state = initialState, action) {
  return state;
};
