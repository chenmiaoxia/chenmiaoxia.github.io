module.exports = {
  title: 'rosy miao blog',
  description: 'Just playing around',
  themeConfig: {
    displayAllHeaders: true,
    nav: [
      { text: 'Github', link: 'https://github.com/chenmiaoxia' },
    ],
    sidebar: [
      {
        title: '面试',
        path: '/interview/',
        children: [
          {
            title: '面试真题',
            path: '/interview/',
          },
          {
            title: '手写系列',
            path: '/interview/answer',
          }
        ]
      },
      {
        title: '测试来着',
        path: '/test/'
      }
    ]
  }
}