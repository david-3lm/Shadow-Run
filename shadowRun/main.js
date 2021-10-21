window.onload= function(){

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'id1',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [menu, level]
};

var game = new Phaser.Game(config);

}