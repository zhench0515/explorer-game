import app from './init.js'
import { _resources, _loader } from './aliases.js'
import { addWall, addExplorer, addTreasure, addInterceptor, addText } from './add.js'
import { explorerPlay, interceptorPlay } from './play.js'
import { hitTestRectangle } from './utils.js'

const _stage = app.stage
const wallWidth = 40 // 墙的宽度
let gameState = 'playing' // 游戏状态：playing、win、lose
let hitInterceptor = false // 是否碰撞拦截者
let hitTreasure = false // 是否碰撞宝物
let stateTips = 'playing' // 游戏状态提示

document.getElementById('app').appendChild(app.view)
// 加载纹理贴图集。
_loader.add('images/textureMap.json').load(setup)

// 通过纹理贴图集创建精灵
export default function setup() {
  const _textureMap = _resources['images/textureMap.json'].textures
  // 添加纹理墙
  const walls = addWall(_textureMap['1.png'])
  walls.forEach(wall => {
    _stage.addChild(wall)
  })

  // 添加探索者
  let explorer = addExplorer(_textureMap['2.png'])
  _stage.addChild(explorer)
  // 循环探索者运动
  app.ticker.add(() => updateAdnHitTest1(explorer, treasure, _stage, wallWidth))

  // 添加宝物
  const treasure = addTreasure(_textureMap['4.png'])
  _stage.addChild(treasure)

  // 添加拦截者
  const interceptors = addInterceptor(_textureMap['3.png'])
  interceptors.forEach(interceptor => {
    _stage.addChild(interceptor)
    // 循环拦截者运动
    app.ticker.add(() => updateAdnHitTest2(explorer, interceptor, _stage, wallWidth))
  })

  // 添加文字
  stateTips = addText(gameState, 60, 6)
  stateTips.style.fill = 0x000000
  _stage.addChild(stateTips)
}

// 刷新探险者的位置及检测碰撞宝物
function updateAdnHitTest1(explorer, treasure, _stage, wallWidth) {
  explorerPlay(explorer, _stage, wallWidth)
  // 检测碰撞宝物
  hitTreasure = hitTestRectangle(explorer, treasure)
  if (hitTreasure) {
    gameState = 'win'
    stateTips.text = 'You Win'
    stateTips.style.fill = 0x00ff00
    // 停止游戏
    app.ticker.stop()
    // 停止探索者的移动
    explorer.vx = 0
    explorer.vy = 0
  }
}

// 刷新拦截者的位置及检测碰撞
function updateAdnHitTest2(explorer, interceptor, _stage, wallWidth) {
  interceptorPlay(interceptor, _stage, wallWidth)
  // 探险者与拦截者进行碰撞检测
  hitInterceptor = hitTestRectangle(explorer, interceptor)
  if (hitInterceptor) {
    gameState = 'lose'
    stateTips.text = 'Game Over'
    stateTips.style.fill = 0xff0000
    // 停止游戏
    app.ticker.stop()
    // 停止探索者的移动及置灰
    explorer.vx = 0
    explorer.vy = 0
    explorer.alpha = 0.6
  }
}
