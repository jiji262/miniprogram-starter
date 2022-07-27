

# 微信小程序快速开发模版（原生开发）

微信小程序快速开发模版（原生开发），提供了小程序开发最基本的一系列功能，包括用户登录、使用微信头像、使用微信昵称、多tab切换、自定义字体等功能，可以帮助用户快速搭建一个初始的小程序项目。

项目依赖：
- 云开发
- [TDesign 微信小程序组件库](https://github.com/Tencent/tdesign-miniprogram)
- [霞鶩文楷字体](https://github.com/lxgw/LxgwWenKai)


## 简介

在几年前，曾经写过一个小程序登录授权的模板项目，其中使用了`wx.login`和`wx.getUserInfo`等官方接口。但是微信的规则就像三四月南方的天气一样，晴雨不定，说变就变。最新的规则已经和项目中的实现逻辑有较大的出入了。

最新的规则如下：

<pre>
自 2022 年 10 月 25 日 24 时后（以下统称 “生效期” ），用户头像昵称获取规则将进行如下调整：

自生效期起，小程序 wx.getUserProfile 接口将被收回：生效期后发布的小程序新版本，通过 wx.getUserProfile 接口获取用户头像将统一返回默认灰色头像，昵称将统一返回 “微信用户”。生效期前发布的小程序版本不受影响，但如果要进行版本更新则需要进行适配。
自生效期起，插件通过 wx.getUserInfo 接口获取用户昵称头像将被收回：生效期后发布的插件新版本，通过 wx.getUserInfo 接口获取用户头像将统一返回默认灰色头像，昵称将统一返回 “微信用户”。生效期前发布的插件版本不受影响，但如果要进行版本更新则需要进行适配。通过 wx.login 与 wx.getUserInfo 接口获取 openId、unionId 能力不受影响。
「头像昵称填写能力」支持获取用户头像昵称：如业务需获取用户头像昵称，可以使用「头像昵称填写能力」（基础库 2.21.2 版本开始支持），具体实践可见下方《最佳实践》。
小程序 wx.getUserProfile 与插件 wx.getUserInfo 接口兼容基础库 2.21.2 以下版本的头像昵称获取需求：上述「头像昵称填写能力」从基础库 2.21.2 版本开始支持（覆盖微信 8.0.16 以上版本）。对于来自更低版本的基础库与微信客户端的访问，小程序通过 wx.getUserProfile 接口将正常返回用户头像昵称，插件通过 wx.getUserInfo 接口将返回用户头像昵称，开发者可继续使用以上能力做向下兼容。
</pre>

本来想基于之前的项目来写，沿袭使用`wx.login`的思路，但是既然有了云开发，细想一下，如果只是为了构建一个简单的用户体系，大可不必这么麻烦，于是有了这个项目。

### 项目目录结构

该微信小程序模板采用基础的 JavaScript + WXSS + ESLint 进行构建，并使用了微信云开发和腾讯官方的[TDesign组件库](https://github.com/Tencent/tdesign-miniprogram)。

项目目录结构如下：

```
|cloudfunctions  //云函数目录
 | |fun
 | | |getOpenId
 | | |user         //用户操作云函数
 |project.config.json
 |.npmrc
 |.prettierignore
 |.gitignore
 |.prettierrc
 |.eslintrc.js
 |miniprogram   //小程序源码目录
 | |app.js
 | |app.json
 | |app.wxss
 | |config
 | |custom-tab-bar
 | |utils
 | |style
 | |components
 | |common
 | | |userManager.js  //user相关操作
 | | |updateManager.js
 | |package.json
 | |pages
 | | |home          //首页
 | | |usercenter    //用户中心页面
 | | | |index.wxml
 | | | |name-edit   //昵称修改页面
 | | | |person-info //个人信息页面
 | | | |components  //组件
 | | | | |user-center-card
 | | | | |ui-select-picker
 | | | |index.json
 | |services
 | | |_utils        //一些有用的utils函数
 | | |home          //首页数据服务
 | |model   //API数据适配层
```


### 添加新页面

1. 在 `pages `目录下创建对应的页面文件夹
2. 在 `app.json` 文件中的 ` "pages"` 数组中加上页面路径
3. [可选] 在 `project.config.json` 文件的 `"miniprogram-list"` 下添加页面配置

## :hammer: 构建运行

1. `cd miniprogram && npm install`
2. 小程序开发工具中引入工程
3. 构建 npm
4. 上传云函数（开发者工具中，上传并部署：云端安装依赖）
5. 云开发环境中，添加数据库表`user`
6. 编译小程序运行即可

## :art: 代码风格控制

`eslint` `prettier`

## :iphone: 基础库版本

最低基础库版本`^2.6.5`

## 参考文档

[文档：小程序登录](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/login.html)

[文档：获取头像昵称](https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/userProfile.html)

[2022-05-09：小程序用户头像昵称获取规则调整公告](https://developers.weixin.qq.com/community/develop/doc/00022c683e8a80b29bed2142b56c01)
