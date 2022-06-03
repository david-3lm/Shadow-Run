import Menu from "./scenes/menu.js";
import Level from "./scenes/level.js";
import SceneBackground from "./scenes/sceneBackground.js";
import MenuBackground from "./scenes/menuBackground.js";
import Credits from "./scenes/credits.js";
import Code from "./scenes/code.js"
import CodeLevel from "./scenes/codeLevel.js"
import Tienda from "./scenes/tienda.js"
import Config from "./scenes/config.js"

window.onload= function(){

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'id1',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 2000 },
            debug: false
        }
    },
    scene: [Menu, Level, CodeLevel, SceneBackground, MenuBackground, Credits, Code, Config, Tienda]
};

var game = new Phaser.Game(config);

}
