class Scene1 extends Phaser.Scene {
  map;
  tiles;
  platforms;
  player;
  cursors;
  keysWASD;
  spacebar;
  pickups;

  constructor() {
    // register scene with game engine
    super("Scene1");
  }
  preload() {
    // preload all assets

    // load tile assets - first param = Phaser 'key', 2nd param = path to file
    this.load.image("autumn-01", "png/tiles/01.png");
    this.load.image("autumn-02", "png/tiles/02.png");
    this.load.image("autumn-03", "png/tiles/03.png");
    this.load.image("autumn-04", "png/tiles/04.png");
    this.load.image("autumn-11", "png/tiles/11.png");

    // load JSON map, params as above
    this.load.tilemapTiledJSON("scene1map", "Tiled/scene1map.tmj");

    // load sprite sheet
    this.load.spritesheet("cat", "Sprites/cat.png", {
      frameWidth: 32,
      frameHeight: 32,
    });

    // load background
    this.load.image("background1", "png/elements/background.png");

    this.load.spritesheet("cake", "pickups/cute-cakesa.png", {
      frameWidth: 39,
      frameHeight: 34,
    });
  }

  create() {
    // place items on screen
    this.cameras.main.setBounds(0, 0, 2816, 1280);
    this.physics.world.setBounds(0, 0, 2816, 1280);

    // create backgrounds
    this.add
      .image(0, 0, "background1")
      .setOrigin(0, 0)
      .setDisplaySize(2816, 1883);

    // create map based on tiled json file
    this.map = this.make.tilemap({ key: "scene1map" });

    // add tile set image, 1st param = name of tile set in Tile, 2nd = Phaser key
    this.tiles = [
      this.map.addTilesetImage("AutumnPlatform", "autumn-01"),
      this.map.addTilesetImage("02", "autumn-02"),
      this.map.addTilesetImage("03", "autumn-03"),
      this.map.addTilesetImage("04", "autumn-04"),
      this.map.addTilesetImage("11", "autumn-11"),
    ];

    // create layers 1st param = name of layer in Tiled, 2nd = Phaser tileset ref
    this.platforms = this.map.createLayer("platforms", this.tiles);

    // sets up collision
    this.map.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(128, 500, "cat");
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
    this.player.setScale(4);
    this.player.body.setSize(22, 18).setOffset(5, 7);
    this.player.setCollideWorldBounds(true);
    this.physics.add.collider(this.player, this.platforms);

    // creates a pickup
    this.pickups = this.physics.add.group();

    // add a cake for each point in the object layer 'pickups'
    const cakes = this.map.createFromObjects("pickups", {
      key: "cake",
    });

    // add the cake to the physics group
    this.pickups.addMultiple(cakes);
    cakes.forEach((cake) =>
      cake.setFrame(Phaser.Math.Between(0, 2)).setScale(2),
    );
    this.physics.add.collider(this.pickups, this.platforms);
    this.physics.add.overlap(
      this.player,
      this.pickups,
      this.collectPickup,
      null,
      this,
    );

    // animations
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("cat", { start: 66, end: 73 }),
      frameRate: 12,
      repeat: -1,
    });

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("cat", { start: 3, end: 3 }),
      frameRate: 6,
      repeat: -1,
    });

    // controls
    this.cursors = this.input.keyboard.createCursorKeys();
    this.keysWASD = this.input.keyboard.addKeys("W, A, S, D");
    this.spacebar = this.input.keyboard.addKey(
      Phaser.Input.Keyboard.KeyCodes.SPACE,
    );
  }

  collectPickup(player, pickup) {
    pickup.destroy();
  }

  update() {
    // updates game elements each frame

    // negate player x force
    this.player.body.setVelocityX(0);
    if (this.cursors.left.isDown || this.keysWASD.A.isDown) {
      this.player.body.setVelocityX(-128 * 3);
      this.player.play("run", true);
      this.player.setFlipX(true);
    } else if (this.cursors.right.isDown || this.keysWASD.D.isDown) {
      this.player.body.setVelocityX(128 * 3);
      this.player.play("run", true);
      this.player.setFlipX(false);
    } else {
      this.player.play("idle", true);
    }

    const isTouchingGround =
      this.player.body.touching.down || this.player.body.blocked.down;

    if (this.spacebar.isDown && isTouchingGround) {
      this.player.body.setVelocityY(-128 * 9);
    }
  }
}
