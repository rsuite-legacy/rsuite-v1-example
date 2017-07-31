/**
 * 根据浏览器语言设置locale
 * 在生产项目中，可根据后端接口返回的值设置
 */
function getLocale() {
  const language = navigator.language;
  return language === 'zh-CN' ? 'zh' : 'en';
}

const initialState = {
  // 设置国际化的语言
  locale: getLocale(),
  menuItems: [
    {
      localeKey: 'Github',
      icon: 'icon icon-github',
      children: [
        {
          localeKey: 'Events',
          link: '/events'
        },
        {
          localeKey: 'Repositories',
          link: '/repos'
        },
        {
          localeKey: 'Users',
          link: '/users'
        }
      ]
    }
  ]
};

export default function settings(state = initialState) {
  return state;
}

