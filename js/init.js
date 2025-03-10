import { _Application } from './aliases.js'

// 创建一个应用程序，生成一个HTML <canvas>元素，将其插入到DOM中
export default new _Application({
  width: 600,
  height: 600,
  // transparent: false, // 透明背景，默认是false，黑色背景，设置为true，背景透明
  // antialias: true, // 抗锯齿，默认是false，设置为true，抗锯齿，使字体和图形边缘更加平滑
  // resolution: 2, // 分辨率，默认是1，设置为2，分辨率为2，图像会放大两倍
  // forceCanvas: false, // 强制使用canvas，默认是false，设置为true，强制使用canvas
  forceWebGL: true, // 强制使用WebGL，默认是false，设置为true，强制使用WebGL
  backgroundColor: 0x1099bb, // 背景颜色，默认是0x000000，设置为0x1099bb，背景颜色为蓝色
})
