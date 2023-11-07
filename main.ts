function changeGameLevel () {
    if (info.score() % LEVEL_SCORE_STEP == 0) {
        if (level < 10) {
            level += 1
            xwing.sayText("Lelev " + level, 500, false)
        }
    }
}
sprites.onDestroyed(SpriteKind.Enemy, function (sprite) {
    info.changeScoreBy(1)
    changeGameLevel()
})
function createMeteorit () {
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
}
function getNewMeteoritesNumber () {
    meteorite_multiply = randint(0, 1) * level
    if (meteorite_multiply == 0) {
        meteorite_multiply = 1
    }
    return meteorite_multiply
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    scene.cameraShake(4, 500)
    info.changeLifeBy(-1)
})
let meteorit: Sprite = null
let meteorite_multiply = 0
let LEVEL_SCORE_STEP = 0
let level = 0
let xwing: Sprite = null
tiles.setCurrentTilemap(tilemap`level2`)
xwing = sprites.create(img`
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
level = 1
LEVEL_SCORE_STEP = 10
let GAME_SPEED = 1000
meteorite_multiply = 3
game.setGameOverEffect(false, effects.starField)
game.onUpdateInterval(GAME_SPEED, function () {
    for (let index = 0; index < getNewMeteoritesNumber(); index++) {
        createMeteorit()
    }
})
