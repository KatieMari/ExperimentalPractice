class Scene1 extends Phaser.Scene {

    map;
    tiles;
    platforms;
    player;
    cursors;
    keysWASD;
    spacebar;

    constructor() {
        // register scene with game engine
        super('Scene1')
    }
    preload() {
        // preload all assets

        // load tile assets - first param = Phaser 'key', 2nd param = path to file
        this.load.image('platform-tiles', 'Tiles/tiles_1024_128x128.png');

        // load JSON map, params as above
        this.load.tilemapTiledJSON('scene1map', 'Tiled/scene1map.tmj')

        // load sprite sheet
        this.load.spritesheet('boy-run', 'Sprites/boy_run.png', {
            frameWidth: 100,
            frameHeight: 160
        })

        // load background
        this.load.image('background1', 'Background_1/Background1_Layer_1.png');
        this.load.image('background2', 'Background_1/Background1_Layer_2.png');
        this.load.image('background3', 'Background_1/Background1_Layer_3.png');

    }

    create() {
        // place items on screen

        this.physics.world.setBounds(0, 0, 2816, 1280);

        // create backgrounds
        this.add.image(1440, 500, 'background1');
        this.add.image(1440, 780, 'background2');
        this.add.image(1440, 750, 'background3');

        // create map based on tiled json file
        this.map = this.make.tilemap({ key: 'scene1map' })

        // add tile set image, 1st param = name of tile set in Tile, 2nd = Phaser key
        this.tiles = this.map.addTilesetImage('platforms', 'platform-tiles')

        // create layers 1st param = name of layer in Tiled, 2nd = Phaser tileset ref
        this.platforms = this.map.createLayer('platforms', this.tiles)

        // sets up collision
        this.map.setCollisionBetween(0, 9999);

        this.player = this.physics.add.sprite(128, 1280 - 128 * 3, 'boy-run')
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        // animations
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('boy-run', { start: 0, end: 49 }),
            frameRate: 60,
            repeat: -1
        })

        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('boy-run', { start: 10, end: 10 }),
            frameRate: 60,
            repeat: -1
        })

        // controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keysWASD = this.input.keyboard.addKeys("W, A, S, D");
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    }

    update() {
        // updates game elements each frame

        // negate player x force 
        this.player.body.setVelocityX(0);
        if (this.cursors.left.isDown || this.keysWASD.A.isDown) {
            this.player.body.setVelocityX(-128 * 3);
            this.player.play('run', true)
            this.player.setFlipX(true)
        } else if (this.cursors.right.isDown || this.keysWASD.D.isDown) {
            this.player.body.setVelocityX(128 * 3);
            this.player.play('run', true)
            this.player.setFlipX(false)
        } else {
            this.player.play('idle', true);
        }

        const isTouchingGround = this.player.body.touching.down || this.player.body.blocked.down;

        if (this.spacebar.isDown && isTouchingGround) {
            this.player.body.setVelocityY(-128 * 9);
        }

    }
}