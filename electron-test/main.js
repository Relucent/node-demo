const electron = require('electron');
// 控制应用生命周期的模块
const {app} = electron;
// 创建本地浏览器窗口的模块
const {BrowserWindow} = electron;
 
// 指向窗口对象的一个全局引用，如果没有这个引用，那么当该javascript对象被垃圾回收的
// 时候该窗口将会自动关闭
let win;
 
function createWindow() {
  // 创建一个新的浏览器窗口
  win = new BrowserWindow({width: 500, height: 300});
 
  // 并且装载应用的index.html页面
  win.loadURL(`file:// ${__dirname}/index.html`);
 
  // 打开开发工具页面
  win.webContents.openDevTools();
 
  // 当窗口关闭时调用的方法
  win.on('closed', () => {
    // 解除窗口对象的引用，通常而言如果应用支持多个窗口的话，你会在一个数组里
    // 存放窗口对象，在窗口关闭的时候应当删除相应的元素。
    win = null;
  });
}
 
// 当Electron完成初始化并且已经创建了浏览器窗口，则该方法将会被调用。
app.on('ready', createWindow);

// 当所有的窗口被关闭后退出应用
app.on('window-all-closed', () => {
  // 对于OS X系统，应用和相应的菜单栏会一直激活直到用户通过Cmd + Q显式退出
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
 
app.on('activate', () => {
  // 对于OS X系统，当dock图标被点击后会重新创建一个app窗口，并且不会有其他窗口打开
  if (win === null) {
    createWindow();
  }
});