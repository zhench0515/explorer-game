// 探索者运动
export function explorerPlay(sprite, _stage, wallWidth) {
  sprite.x += sprite.vx
  if (sprite.x <= wallWidth) {
    sprite.x = wallWidth
  }
  if (sprite.x >= _stage.width - sprite.width - wallWidth) {
    sprite.x = _stage.width - sprite.width - wallWidth
  }
  sprite.y += sprite.vy
  if (sprite.y <= wallWidth) {
    sprite.y = wallWidth
  }
  if (sprite.y >= _stage.height - sprite.height - wallWidth) {
    sprite.y = _stage.height - sprite.height - wallWidth
  }
}

export function interceptorPlay(sprite, _stage, wallWidth) {
  sprite.y += sprite.vy
  if (sprite.y <= wallWidth) {
    sprite.y = wallWidth
    sprite.vy = 1
  }
  if (sprite.y >= _stage.height - sprite.height - wallWidth) {
    sprite.y = _stage.height - sprite.height - wallWidth
    sprite.vy = -1
  }
}
