export default class MenuBackground extends Phaser.Scene {
    constructor() {
        super({key: "MenuBackground"});
    }

    preload() {
        this.load.image('sky', 'assets/sprites/Background.png');

        this.load.image('Backbuilds', 'assets/sprites/BackBuildings.png');

        this.load.image('Builds3', 'assets/sprites/Back2Bs.png');

        this.load.image('Builds2', 'assets/sprites/BackBs.png');

        this.load.image('FrontBuilds', 'assets/sprites/FrontBuildings.png');

        this.load.image('Rails', 'assets/sprites/AllRails.png');

        this.load.image('FogBack', 'assets/sprites/FogBack.png');

        this.load.image('FogFront', 'assets/sprites/FogFront.png');

        this.load.image('ShipFront', 'assets/sprites/ShipFront.png');

        this.load.image('ShipBack', 'assets/sprites/ShipBack.png');

    } 

    create() {
        //dimensiones
        this.HEIGHT=600;
        this.WIDTH=900;

        //------------Scene--------------
        //cielo
        this.sky = this.add.image(450, 300, 'sky');

        //ultimos edificios
        this.backbuildings1 = this.add.image(0, this.HEIGHT-378, 'Backbuilds').setOrigin(0,0);
        this.backbuildings2 = this.add.image(this.WIDTH, this.HEIGHT-378, 'Backbuilds').setOrigin(0,0);

        //Neblina trasera 1
        this.fogback1 = this.add.image(0, this.HEIGHT-482, 'FogBack').setOrigin(0,0);

        //edificios del fondo 2
        this.back2bs1 = this.add.image(0, 20, 'Builds3').setOrigin(0,0);
        this.back2bs2 = this.add.image(this.WIDTH, 20, 'Builds3').setOrigin(0,0);

        //Neblina trasera 2
        this.fogback2 = this.add.image(0, this.HEIGHT-482, 'FogBack').setOrigin(0,0);

        //edificios del fondo 1
        this.backbs1 = this.add.image(0, 20, 'Builds2').setOrigin(0,0);
        this.backbs2 = this.add.image(this.WIDTH, 20, 'Builds2').setOrigin(0,0);

        //Neblina trasera 3
        this.fogback3 = this.add.image(0, this.HEIGHT-482, 'FogBack').setOrigin(0,0);

        //Naves traseras 1
        this.shipsb1=this.add.group({
            key: 'ShipBack',
            repeat: 5,
            setXY:{
                x: 50,
                y: 300,
                stepX: 200,
                stepY: 60
            }

        });

        this.shipsb1.children.iterate((s)=>{
            s.alpha=0.8;
            s.setScale(0.75);
        });

        //Naves traseras 2
        this.shipsb2=this.add.group({
            key: 'ShipBack',
            repeat: 5,
            setXY:{
                x: 70,
                y: 300,
                stepX: 200,
                stepY: 60
            }

        });

        this.shipsb2.children.iterate((s)=>{
            s.alpha=0.8;
            s.setScale(0.75);
            s.flipX=true;
        });

        //Railes
        this.rails1 = this.add.image(0, 25, 'Rails').setOrigin(0,0);
        this.rails2 = this.add.image(this.WIDTH*2, 25, 'Rails').setOrigin(0,0);

        //Neblina trasera 4
        this.fogback4 = this.add.image(0, this.HEIGHT-482, 'FogBack').setOrigin(0,0);

        //edificios delanteros
        this.buildings1 = this.add.image(0, 25, 'FrontBuilds').setOrigin(0,0);
        this.buildings2 = this.add.image(this.WIDTH*2, 25, 'FrontBuilds').setOrigin(0,0);

        //Naves delanteras 1
        this.ships1=this.add.group({
            key: 'ShipFront',
            repeat: 3,
            setXY:{
                x: 50,
                y: 300,
                stepX: 200,
                stepY: 60
            }

        });

        this.ships1.children.iterate((s)=>{
            s.alpha=0.8;
            s.setScale(0.75);
        });

        //Naves delanteras 2
        this.ships2=this.add.group({
            key: 'ShipFront',
            repeat: 3,
            setXY:{
                x: 70,
                y: 300,
                stepX: 200,
                stepY: 60
            }

        });

        this.ships2.children.iterate((s)=>{
            s.alpha=0.8;
            s.setScale(0.75);
            s.flipX=true;
        });


        //Neblina trasera 5
        this.fogback5 = this.add.image(0, this.HEIGHT-482, 'FogBack').setOrigin(0,0);
        this.fogback5.alpha=0.5;

        //Neblina delantera
        this.fogfront1 = this.add.image(0, this.HEIGHT-350, 'FogFront').setOrigin(0,0);
        this.fogfront1.alpha=0.4;
        this.fogfront2 = this.add.image(this.WIDTH, this.HEIGHT-350, 'FogFront').setOrigin(0,0);
        this.fogfront2.alpha=0.4;


        //cursor
        this.cursor = this.input.keyboard.createCursorKeys();

       
    }
    update(time, delta) {

        //Crear la sensación de movimiento y profundidad

        //últimos
        
        
        if(this.backbuildings1.x<=0){
            this.backbuildings2.x=this.backbuildings1.x+this.WIDTH;
            if(this.backbuildings2.x<=0){
                this.backbuildings1.x=this.backbuildings2.x+this.WIDTH;
            }
        }
        this.backbuildings1.x+=-0.1;
        this.backbuildings2.x+=-0.1;
        

        //edificios del fondo 2
        
        
        if(this.back2bs1.x<=0){
            this.back2bs2.x=this.back2bs1.x+this.WIDTH;
            if(this.back2bs2.x<=0){
                this.back2bs1.x=this.back2bs2.x+this.WIDTH;
            }
        }
        this.back2bs1.x+=-0.2;
        this.back2bs2.x+=-0.2;
        

        //edificios del fondo 1
        
        
        if(this.backbs1.x<=0){
            this.backbs2.x=this.backbs1.x+this.WIDTH;
            if(this.backbs2.x<=0){
                this.backbs1.x=this.backbs2.x+this.WIDTH;
            }
        }
        this.backbs1.x+=-0.3;
        this.backbs2.x+=-0.3;
        

        //edificios del frente, raíles y niebla delantera
        
        
        if(this.buildings1.x<=0){
            this.buildings2.x=this.buildings1.x+this.WIDTH*2;
            this.rails2.x=this.rails1.x+this.WIDTH*2;
            this.fogfront2.x=this.fogfront1.x+this.WIDTH*2;
            if(this.buildings2.x<=0){
                this.buildings1.x=this.buildings2.x+this.WIDTH*2;
                this.rails1.x=this.rails2.x+this.WIDTH*2;
                this.fogfront1.x=this.fogfront2.x+this.WIDTH*2;
            }
        }
        this.buildings1.x+=-0.4;
        this.buildings2.x+=-0.4;
        this.rails1.x+=-0.4;
        this.rails2.x+=-0.4;
        this.fogfront1.x+=-0.4;
        this.fogfront2.x+=-0.4;
        

        //Movimiento neblina delantera

        if(this.fogfront1.x>=1){
            this.fogfront2.x=this.fogfront1.x-this.WIDTH;
            if(this.fogfront2.x>=1){
                this.fogfront1.x=this.fogfront2.x-this.WIDTH;
            }
        }
        if(this.fogfront1.x<=0){
            this.fogfront2.x=this.fogfront1.x+this.WIDTH;
            if(this.fogfront2.x<=0){
                this.fogfront1.x=this.fogfront2.x+this.WIDTH;
            }
        }
        this.fogfront1.x+=-0.1;
        this.fogfront2.x+=-0.1;

        
        //movimiento naves
        //delanteras derecha-izquierda
        this.ships1.children.iterate((s)=>{
            if(s.x<=-34){
                s.x=934;
                s.y=Phaser.Math.Between(256, 512)
            }
            s.x-=8;
        });

        //delanteras izquierda-derecha
        this.ships2.children.iterate((s)=>{
            if(s.x>=this.WIDTH+34){
                s.x=-34;
                s.y=Phaser.Math.Between(256, 512)
            }
            s.x+=8;
        });
        
        //traseras derecha-izquierda
        this.shipsb1.children.iterate((s)=>{
            if(s.x<=-17){
                s.x=917;
                s.y=Phaser.Math.Between(256, 360)
            }
            s.x-=4;
        });

        //traseras izquierda-derecha
        this.shipsb2.children.iterate((s)=>{
            if(s.x>=this.WIDTH+17){
                s.x=-17;
                s.y=Phaser.Math.Between(256, 360)
            }
            s.x+=4;
        });
    }


}
