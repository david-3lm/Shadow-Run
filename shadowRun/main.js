import Menu from "./scenes/menu.js";
import Level from "./scenes/level.js";
import SceneBackground from "./scenes/sceneBackground.js";

window.onload= function(){

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'id1',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 600 },
            debug: false
        }
    },
    scene: [Level, Menu]
};

var game = new Phaser.Game(config);

}