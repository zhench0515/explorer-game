import app from './init.js'
import { _Sprite, _Text } from './aliases.js'
import { randomInt } from './utils.js'
import { explorerEvent } from './event.js'

const _stage = app.stage

// 添加墙
export function addWall(texture) {
  const walls = []
  // 生成第一堵墙
  for (let i = 0; i < 15; i++) {
    let wall = new _Sprite(texture)
    wall.height = 40
    wall.width = 40
    wall.x = i * 40
    wall.y = 0
    walls.push(wall)
  }
  // 生成第二堵墙
  for (let i = 1; i < 15; i++) {
    let wall = new _Sprite(texture)
    wall.height = 40
    wall.width = 40
    wall.x = 0
    wall.y = 40 * i
    walls.push(wall)
  }
  // 生成第三堵墙
  for (let i = 1; i < 15; i++) {
    let wall = new _Sprite(texture)
    wall.height = 40
    wall.width = 40
    wall.x = 40 * i
    wall.y = 560
    walls.push(wall)
  }
  // 生成第四堵墙
  for (let i = 1; i < 14; i++) {
    let wall = new _Sprite(texture)
    wall.height = 40
    wall.width = 40
    wall.x = 560
    wall.y = 40 * i
    walls.push(wall)
  }
  return walls
}

// 添加探索者
export function addExplorer(texture) {
  let explorer = new _Sprite(texture)
  explorer.height = 40
  explorer.width = 40
  explorer.x = 60
  // 垂直居中
  explorer.y = _stage.height / 2 - explorer.height / 2
  explorer.vx = 0 // x轴速度，0为不动，-1为向左，1为向右
  explorer.vy = 0 // y轴速度，0为不动，-1为向上，1为向下
  return explorerEvent(explorer)
}

// 添加宝物
export function addTreasure(texture) {
  let treasure = new _Sprite(texture)
  treasure.height = 40
  treasure.width = 40
  treasure.x = _stage.width - treasure.width - 40
  // 垂直居中
  treasure.y = _stage.height / 2 - treasure.height / 2
  return treasure
}
// 添加拦截者
export function addInterceptor(texture) {
  const interceptors = []
  // 生成8个拦截者
  const xOffset = 120 // x偏移量
  const count = 8 // 拦截者数量
  const spacing = 40 // 间隔
  for (let i = 0; i < count; i++) {
    let interceptor = new _Sprite(texture)
    interceptor.height = 40
    interceptor.width = 40
    interceptor.x = xOffset + i * spacing
    // 随机生成y坐标
    interceptor.y = randomInt(40, _stage.height - interceptor.height - 40)
    interceptor.vy = Math.round(Math.random()) ? 1 : -1 // y轴速度，0为不动，-1为向上，1为向下
    interceptors.push(interceptor)
  }
  return interceptors
}

// 添加文字
export function addText(str, x, y) {
  const message = new _Text(str, {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center',
  })
  message.position.set(x, y)
  return message
}

const add = {
  addWall,
  addExplorer,
  addTreasure,
  addInterceptor,
  addText,
}

export default add
