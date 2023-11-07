def on_on_destroyed(sprite):
    global GAME_SPEED
    info.change_score_by(1)
    if info.score() % 5 == 0:
        GAME_SPEED += -100
        print("Rychlost: " + str(GAME_SPEED))
sprites.on_destroyed(SpriteKind.enemy, on_on_destroyed)

def on_on_overlap(sprite2, otherSprite):
    sprites.destroy(otherSprite)
    scene.camera_shake(4, 500)
    info.change_life_by(-1)
sprites.on_overlap(SpriteKind.player, SpriteKind.enemy, on_on_overlap)

meteorit: Sprite = None
GAME_SPEED = 0
tiles.set_current_tilemap(tilemap("""
    level2
"""))
xwing = sprites.create(img("""
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
    """),
    SpriteKind.player)
tiles.place_on_tile(xwing, tiles.get_tile_location(1, 3))
controller.move_sprite(xwing)
xwing.set_stay_in_screen(True)
info.set_life(3)
info.set_score(0)
game.set_game_over_effect(False, effects.star_field)
GAME_SPEED = 2000

def on_update_interval():
    global meteorit
    meteorit = sprites.create(img("""
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
        """),
        SpriteKind.enemy)
    meteorit.set_position(149, randint(5, 110))
    meteorit.set_velocity(randint(-30, -100), 0)
    meteorit.set_flag(SpriteFlag.DESTROY_ON_WALL, True)
    print(GAME_SPEED)
game.on_update_interval(GAME_SPEED, on_update_interval)
