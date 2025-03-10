// 测试PIXI对象是否引入成功
let type = 'WebGL'
if (!PIXI?.utils?.isWebGLSupported()) {
  type = 'canvas'
}
PIXI?.utils?.sayHello(type)
