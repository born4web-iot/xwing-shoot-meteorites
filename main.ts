sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let meteorit: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
let xwing = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . 1 . . . . . . . . . 
    . . . . 2 1 1 . . . . . . . . . 
    . . . . . . 1 1 1 1 . . . . . . 
    . . . . . . 1 1 . . 1 . . . . . 
    . . . . . . 1 1 1 1 1 1 1 1 . . 
    . . . . . . 1 1 1 1 1 1 1 1 1 1 
    . . . . 2 1 1 . . . . . . . . . 
    . . . . . . 1 . . . . . . . . . 
    . . . . . . 1 1 1 . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
tiles.placeOnTile(xwing, tiles.getTileLocation(1, 3))
controller.moveSprite(xwing)
xwing.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
game.setGameOverEffect(false, effects.starField)
game.onUpdateInterval(500, function () {
    meteorit = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . e e e e e e e e . . . . . 
        . . . e . e e e . e e . . . . . 
        . . e e e e e e e e e e . . . . 
        . . e . e . e e e . e e . . . . 
        . . e . e e e . e e e . . . . . 
        . . e e e e e e e . e e . . . . 
        . . e e . e e . e e e e . . . . 
        . . . e e e e e e e e . . . . . 
        . . . . e e e . e e . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Enemy)
    meteorit.setPosition(149, randint(5, 110))
    meteorit.setVelocity(randint(-30, -100), 0)
    meteorit.setFlag(SpriteFlag.DestroyOnWall, true)
})
