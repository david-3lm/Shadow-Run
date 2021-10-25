import SceneBackground from "./sceneBackground.js";

export default class Menu extends Phaser.Scene {

    constructor(){
        super({key:"Menu"});
    }

preload()
{
    // //carga de imagenes
    // this.load.image();
    // //carga de sprites
    // this.load.spritesheet();

    this.scene.launch("SceneBackground",SceneBackground);
    this.scene.sendToBack("SceneBackground");

    this.load.image("interface", "assets/menu/MENU_NEON.png");
    this.load.image("hover_r", "assets/menu/CUADRADO_SELEC_CODIGO.png");
    this.load.image("hover_l", "assets/menu/CUADRADO_SELEC_PLAY.png");
    this.load.image("hover_bl", "assets/menu/CUADRADO_SELEC_CREDIT.png");
    this.load.image("hover_br", "assets/menu/CUADRADO_SELEC_CONFIG.png");
    this.load.image("hover_b", "assets/menu/CUADRADO_SELEC_TIENDA.png");

    console.log("menu");
}

create()
{

    // //limites camara (fuera escena)
    // this.cameras.main.setBounds();
    // this.add.image();
    // //colisiones con obstaculos
    // this.physics.add.collider();
    // //camara que seguirá a jugador
    // this.cameras.main.startFollow();
    // //comprobar overlap con orbes 
    // this.physics.add.overlap();
    // //objeto cursor para uso teclado;
    // this.cursors = this.input.keyboard.createCursorKeys();

    this.interface= this.add.image(-5,0,"interface").setScale(0.9).setOrigin(0,-0.05);
    this.interface.depth = 0.1;

    //hover con sus posiciones iniciales(fuera de la pantalla) y finales(donde encajan)

    //code
    this.hover_r=this.add.image(950,280,"hover_r");
    this.hover_r.startx = 950;
    this.hover_r.endx = 590;

    //play
    this.hover_l=this.add.image(218,285,"hover_l");
    this.hover_l.startx = 218;
    this.hover_l.endx = -120;

    //credits
    this.hover_bl=this.add.image(107,620,"hover_bl");
    this.hover_bl.starty = 620;
    this.hover_bl.endy = 510;

    //configuracion
    this.hover_br=this.add.image(696,620,"hover_br");
    this.hover_br.starty = 620;
    this.hover_br.endy = 510;

    //tienda
    this.hover_b=this.add.image(410,630,"hover_b");
    this.hover_b.starty = 630;
    this.hover_b.endy = 520;

    //teclado
    this.cursors = this.input.keyboard.createCursorKeys();

    console.log(this.hover_b.y)
}

update(time, delta)
{

//TECLA DERECHA

    if (this.cursors.right.isDown){

        //si se encontraba en credits
        if(this.hover_bl.y == this.hover_bl.endy){

        this.tweens.add({
            targets: this.hover_b,
            duration:100,
            y: this.hover_b.endy,
        });
        
        this.hover_bl.y = this.hover_bl.starty;
        console.log(this.hover_b.y)
        //console.log(this.hover_b.endy)
        }

        //si se encontraba en tienda
        if(this.hover_b.y == this.hover_b.endy){

        this.tweens.add({
            targets: this.hover_br,
            duration:100,
            y: this.hover_br.endy,
        });
        this.hover_b.y = this.hover_b.starty;
        }

        //si se encontraba en play
        if(this.hover_l.x == this.hover_l.startx){
            console.log(this.hover_l.x)
            console.log(this.hover_l.startx)

            this.tweens.add({
                targets: this.hover_r,
                duration:100,
                x:this.hover_r.endx,
            });
            this.hover_l.x = this.hover_l.endx;
        }
        
    }    


    //TECLA IZQUIERDA

    if (this.cursors.left.isDown){

        //si se encontraba en configuracion
        if(this.hover_br.y == this.hover_br.endy){

            this.tweens.add({
                targets: this.hover_b,
                duration:100,
                y: this.hover_b.endy,
            });
            this.hover_br.y = this.hover_br.starty;
            }
    
        //si se encontraba en tienda    
        if(this.hover_b.y == this.hover_b.endy){
    
            this.tweens.add({
                targets: this.hover_bl,
                duration:100,
                y: this.hover_bl.endy,
            });
            this.hover_b.y = this.hover_b.starty;
        }

        //si se encontraba en code
        if(this.hover_r.x != this.hover_r.startx){
            this.tweens.add({
                targets: this.hover_l,
                duration:100,
                x:this.hover_l.startx,
            });
            this.hover_r.x = this.hover_r.startx;
        }
    }

    //TECLA ABAJO

    ////si se encontraba en play
    if (this.cursors.down.isDown & this.hover_l.x == this.hover_l.startx){

        
        this.tweens.add({
            targets: this.hover_bl,
            duration:100,
            y: this.hover_bl.endy,
    });
    
    this.hover_l.x = this.hover_l.endx;
    
    }

    ////si se encontraba en code
    if (this.cursors.down.isDown & this.hover_r.x == this.hover_r.endx){

        
        this.tweens.add({
            targets: this.hover_br,
            duration:100,
            y: this.hover_br.endy,
    });
    
    this.hover_r.x = this.hover_r.startx;
    
    }

    //TECLA ARRIBA

    //si se encontraba en configuracion
    if (this.cursors.up.isDown & this.hover_br.y == this.hover_br.endy){

        this.tweens.add({
            targets: this.hover_r,
            duration:100,
            x: this.hover_r.endx,
    });
    
    this.hover_br.y = this.hover_br.starty;
    
    }

    //si se encontraba en creditos
    if (this.cursors.up.isDown & this.hover_bl.y == this.hover_bl.endy){

        
        this.tweens.add({
            targets: this.hover_l,
            duration:100,
            x: this.hover_l.startx,
    });
    
    this.hover_bl.y = this.hover_bl.starty;
    
    }
    
 }

}
