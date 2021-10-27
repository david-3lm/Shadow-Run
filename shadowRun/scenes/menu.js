import MenuBackground from "./menuBackground.js";

export default class Menu extends Phaser.Scene {

    constructor(){
        super({key:"Menu"});
    }

preload()
{
    //Escena de la ciudad para el fondo del menu
    this.scene.launch("MenuBackground",MenuBackground);
    this.scene.sendToBack("MenuBackground");

    //carga de imagenes
    this.load.image("interface", "assets/menu/MENU_NEON.png");
    this.load.image("hover_r", "assets/menu/CUADRADO_SELEC_CODIGO.png");
    this.load.image("hover_l", "assets/menu/CUADRADO_SELEC_PLAY.png");
    this.load.image("hover_bl", "assets/menu/CUADRADO_SELEC_CREDIT.png");
    this.load.image("hover_br", "assets/menu/CUADRADO_SELEC_CONFIG.png");
    this.load.image("hover_b", "assets/menu/CUADRADO_SELEC_TIENDA.png");

    //carga de audios
    this.load.audio("nav_der", "assets/menu/Menu_nav_der.mp3");
    this.load.audio("nav_izq", "assets/menu/Menu_nav_izq.mp3");
    this.load.audio("nav_center", "assets/menu/Menu_nav_center.mp3");
    this.load.audio("main_t", "assets/menu/ShadowRun_Maintheme.mp3");
    this.load.audio("select", "assets/menu/Menu_select_alt.mp3");
    
}

create()
{

    //interfaz con el dibujo de botones, titulo, etc.
    this.interface= this.add.image(-5,0,"interface").setScale(0.9).setOrigin(0,-0.05);
    this.interface.depth = 0.1;

    //AUDIO(MUSICA)
    this.music = this.sound.add("main_t");
    //su configuracion
    var mConfig = {
        mute: false,
        volume: 0.25,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: true,
        delay: 0
    }
    //su activacion
    this.music.play(mConfig);

    //bajo la imagen de interfaz se colocan imagenes que cuadran con los botones para simular una especie de hover
    //a cada hover(imagen) se le crea atributos con sus posiciones iniciales(fuera de la pantalla) y finales(donde encajan)
    //Hover para las casillas:

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

    //-----------
    //TECLADO
    this.cursors = this.input.keyboard.createCursorKeys();

    //AUDIO
    this.a_navder = this.sound.add("nav_der");
    this.a_navizq = this.sound.add("nav_izq");
    this.a_navcenter = this.sound.add("nav_center");
    this.a_select = this.sound.add("select");

    //El jugador por defecto estará en play
    //Estado se utilizará para saber en que opcion se encuentra el jugador cuando vaya a seleccionar
    this.estado = "play";
}

update(time, delta)
{

//TECLA DERECHA

    if (this.cursors.right.isDown){

        //si se encontraba en credits la tecla derecha va a (va no selecciona)
        //TIENDA
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

        //si se encontraba en tienda la tecla derecha va a
        //CONFIGURACION
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

        //si se encontraba en play la tecla derecha va a
        //CODE
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

        //si se encontraba en configuracion
        //TIENDA
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
    
        //si se encontraba en tienda 
        //CREDITOS   
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

        //si se encontraba en code
        //PLAY
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
    //si se encontraba en play
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
    //si se encontraba en code
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

    //TECLA DE SELECCION 
    if(this.cursors.space.isDown){
        //audio para seleccion
        this.a_select.play();

        //En funcion del estado(en que opcion esta el jugador) inicia esa escena y duerme la actual

        //opcion play
        if (this.estado == "play"){
            this.scene.launch("Level");
            this.scene.stop("Menu");
            this.scene.stop("MenuBackground");
               
        }

        //op creditos
        if(this.estado == "creditos"){
            this.scene.launch("Credits");
            this.scene.sleep("Menu");
        }

        //op code
        if(this.estado == "code"){
            this.scene.launch("Code");
            this.scene.sleep("Menu");
        }

        //op tienda
        if(this.estado == "tienda"){
            this.scene.launch("Tienda");
            this.scene.sleep("Menu");
        }

        //op configuracion
        if(this.estado == "configuracion"){
            this.scene.launch("Config");
            this.scene.sleep("Menu");
        }
    }
    
 }

}
