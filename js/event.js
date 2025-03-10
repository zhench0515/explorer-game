import app from './init.js'
import keyboard from './keyboard.js'

const _stage = app.stage

export function explorerEvent(explorer) {
  // 为探索者绑定键盘事件
  const left = keyboard('ArrowLeft')
  const right = keyboard('ArrowRight')
  const up = keyboard('ArrowUp')
  const down = keyboard('ArrowDown')
  const wallWidth = 40 // 墙的宽度
  // 按下左箭头键
  left.press = () => {
    // 右箭头键按下时，左箭头键不生效
    if (right.isDown) return
    if (explorer.x <= wallWidth) {
      // 左移到墙的左侧时，左箭头键不生效
      explorer.vx = 0
      explorer.x = wallWidth
      return
    }
    explorer.vx = -5
    explorer.vy = 0
  }
  // 松开左箭头键
  left.release = () => {
    // 如果右箭头键没有按下，左箭头松开时精灵x轴不动
    if (!right.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }
  // 按下右箭头键
  right.press = () => {
    // 左箭头键按下时，右箭头键不生效
    if (left.isDown) return
    if (explorer.x >= _stage.width - explorer.width - wallWidth) {
      // 右移到墙的右侧时，右箭头键不生效
      explorer.vx = 0
      explorer.x = _stage.width - explorer.width - wallWidth
      return
    }
    explorer.vx = 5
    explorer.vy = 0
  }
  // 松开右箭头键
  right.release = () => {
    // 如果左箭头键没有按下，右箭头松开时精灵x轴不动
    if (!left.isDown && explorer.vy === 0) {
      explorer.vx = 0
    }
  }
  // 按下上箭头键
  up.press = () => {
    // 下箭头键按下时，上箭头键不生效
    if (down.isDown) return
    if (explorer.y <= wallWidth) {
      explorer.vy = 0
      explorer.y = wallWidth
      return
    }
    explorer.vx = 0
    explorer.vy = -5
  }
  // 松开上箭头键
  up.release = () => {
    // 如果下箭头键没有按下，上箭头松开时精灵y轴不动
    if (!down.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }
  // 按下下箭头键
  down.press = () => {
    // 上箭头键按下时，下箭头键不生效
    if (up.isDown) return
    if (explorer.y >= _stage.height - explorer.height - wallWidth) {
      explorer.vy = 0
      explorer.y = _stage.height - explorer.height - wallWidth
      return
    }
    explorer.vx = 0
    explorer.vy = 5
  }
  // 松开下箭头键
  down.release = () => {
    // 如果上箭头键没有按下，下箭头松开时精灵y轴不动
    if (!up.isDown && explorer.vx === 0) {
      explorer.vy = 0
    }
  }
  return explorer
}

export default {
  explorerEvent,
}
