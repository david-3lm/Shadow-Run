import MenuBackground from "./menuBackground.js";

export default class Menu extends Phaser.Scene {

    constructor(){
        super({key:"Menu"});
    }

preload()
{
    this.scene.launch("MenuBackground",MenuBackground);
    this.scene.sendToBack("MenuBackground");

    this.load.image("interface", "assets/menu/MENU_NEON.png");
    this.load.image("hover_r", "assets/menu/CUADRADO_SELEC_CODIGO.png");
    this.load.image("hover_l", "assets/menu/CUADRADO_SELEC_PLAY.png");
    this.load.image("hover_bl", "assets/menu/CUADRADO_SELEC_CREDIT.png");
    this.load.image("hover_br", "assets/menu/CUADRADO_SELEC_CONFIG.png");
    this.load.image("hover_b", "assets/menu/CUADRADO_SELEC_TIENDA.png");

    this.load.audio("nav_der", "assets/SFX/Menu_nav_der.mp3");
    this.load.audio("nav_izq", "assets/SFX/Menu_nav_izq.mp3");
    this.load.audio("nav_center", "assets/SFX/Menu_nav_center.mp3");
    this.load.audio("main_t", "assets/SFX/ShadowRun_Maintheme.mp3");
    this.load.audio("select", "assets/SFX/Menu_select_alt.mp3");
    
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

    this.music = this.sound.add("main_t");
    var mConfig = {
        mute: false,
        volume: 0.25,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    this.music.play(mConfig);

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

    //audio

    this.a_navder = this.sound.add("nav_der");
    this.a_navizq = this.sound.add("nav_izq");
    this.a_navcenter = this.sound.add("nav_center");
    this.a_select = this.sound.add("select");

    //estado 
    this.estado = "play";
}

update(time, delta)
{

//TECLA DERECHA

    if (this.cursors.right.isDown){

        //TIENDA
        //si se encontraba en credits
        if(this.hover_bl.y == this.hover_bl.endy){

            //audio
            this.a_navcenter.play();

            //animacion
            this.tweens.add({
                targets: this.hover_b,
                duration:100,
                y: this.hover_b.endy,
            });
            
            this.hover_bl.y = this.hover_bl.starty;

            //Estado
            this.estado = "tienda";
        }

        //CONFIGURACION
        //si se encontraba en tienda
        if(this.hover_b.y == this.hover_b.endy){

            //audio    
            this.a_navder.play();

            //animacion
            this.tweens.add({
                targets: this.hover_br,
                duration:100,
                y: this.hover_br.endy,
            });
            this.hover_b.y = this.hover_b.starty;

            //Estado
            this.estado = "configuracion";

        }

        //CODE
        //si se encontraba en play
        if(this.hover_l.x == this.hover_l.startx){

            //sonido
            this.a_navder.play();
            console.log(this.a_navder.key)

            //animacion
            this.tweens.add({
                targets: this.hover_r,
                duration:100,
                x:this.hover_r.endx,
            });
            this.hover_l.x = this.hover_l.endx;

            //Estado
            this.estado = "code";
        }
        
    }    


    //TECLA IZQUIERDA

    if (this.cursors.left.isDown){

        //TIENDA
        //si se encontraba en configuracion
        if(this.hover_br.y == this.hover_br.endy){

            //audio
            this.a_navcenter.play();

            //animacion
            this.tweens.add({
                targets: this.hover_b,
                duration:100,
                y: this.hover_b.endy,
            });
            this.hover_br.y = this.hover_br.starty;

            //Estado
            this.estado = "tienda";
        }
    
        //CREDITOS
        //si se encontraba en tienda    
        if(this.hover_b.y == this.hover_b.endy){
    
            //audio
            this.a_navizq.play();

            //animacion
            this.tweens.add({
                targets: this.hover_bl,
                duration:100,
                y: this.hover_bl.endy,
            });
            this.hover_b.y = this.hover_b.starty;

            //Estado
            this.estado = "creditos";
        }

        //PLAY
        //si se encontraba en code
        if(this.hover_r.x != this.hover_r.startx){

            //audio
            this.a_navizq.play();
            console.log(this.a_navizq.key)

            //animacion
            this.tweens.add({
                targets: this.hover_l,
                duration:100,
                x:this.hover_l.startx,
            });
            this.hover_r.x = this.hover_r.startx;

            //Estado
            this.estado = "play";
        }
    }

    //TECLA ABAJO

    //CREDITOS
    ////si se encontraba en play
    if (this.cursors.down.isDown && this.hover_l.x == this.hover_l.startx){

        this.a_navder.play();

        this.tweens.add({
            targets: this.hover_bl,
            duration:100,
            y: this.hover_bl.endy,
        });
    
        this.hover_l.x = this.hover_l.endx;

        //Estado
        this.estado = "creditos";
    
    }

    //CONFIGURACION
    ////si se encontraba en code
    if (this.cursors.down.isDown && this.hover_r.x == this.hover_r.endx){

        this.a_navizq.play();
        
        this.tweens.add({
            targets: this.hover_br,
            duration:100,
            y: this.hover_br.endy,
        });
    
        this.hover_r.x = this.hover_r.startx;

        //Estado
        this.estado = "configuracion";
    
    }

    //TECLA ARRIBA

    //CODE
    //si se encontraba en configuracion
    if (this.cursors.up.isDown && this.hover_br.y == this.hover_br.endy){

        this.a_navizq.play();

        this.tweens.add({
            targets: this.hover_r,
            duration:100,
            x: this.hover_r.endx,
        });
    
        this.hover_br.y = this.hover_br.starty;

        //Estado
        this.estado = "code";
    
    }

    //PLAY
    //si se encontraba en creditos
    if (this.cursors.up.isDown && this.hover_bl.y == this.hover_bl.endy){

        this.a_navder.play();
        
        this.tweens.add({
            targets: this.hover_l,
            duration:100,
            x: this.hover_l.startx,
        });
    
    this.hover_bl.y = this.hover_bl.starty;

        //Estado
        this.estado = "code";
    
    }

    if(this.cursors.space.isDown){
        this.a_select.play();

        if (this.estado == "play"){
            this.scene.launch("Level");
            this.scene.stop("Menu");
            this.scene.stop("MenuBackground");
               
        }

        if(this.estado == "creditos"){
            this.scene.launch("Credits");
            this.scene.sleep("Menu");
            this.hover_bl.y = this.hover_bl.starty;
            this.hover_l.x = this.hover_l.startx;
            this.estado = "play";
            this.scene.sleep("Menu");
        }

        if(this.estado == "code"){
            this.scene.launch("CodeLevel");
            //this.scene.sleep("Menu");
            this.scene.stop("Menu");
            this.scene.stop("MenuBackground");
        }

        if(this.estado == "tienda"){
            this.scene.launch("Tienda");
            this.scene.sleep("Menu");
            this.hover_b.y = this.hover_b.starty;
            this.hover_l.x = this.hover_l.startx;
            this.estado = "play";
            this.scene.sleep("Menu");
        }

        if(this.estado == "configuracion"){
            this.scene.launch("Config");
            this.scene.sleep("Menu");
        }
    }
    
 }

}
