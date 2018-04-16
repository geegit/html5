class GamePlayScene extends Phaser.Scene {

	constructor(){
		super({key:"GamePlayScene"});
		this.characters = [];
		this.player1 = {anims:{}};
		this.player2 = {anims:{}};
	}


	
	init(players){
		
		this.characters = players;
		
		console.log("loading...",players);

		console.log(game.config.maxCharactersPerRow);

	}

	preload(){

		

	}

	create(){

		this.player1 = this.add.sprite(50,150,this.characters[0].texture.key);

		this.player1.anims = Object.assign(this.player1.anims, this.characters[0].anims);

		this.player1.setInteractive();

		this.player1.x = 150;
		this.player1.y = 150;
		
		this.player1.anims.repeat = -1;
		console.log(`Animation key is ${this.player1.anims.currentAnim.key}`);
		

		this.player1.anims.load("bow");
		this.player1.anims.play("bow");

		this.input.on('pointerover',(pointer,objs)=>{

			console.log(`I'm over it`)
		
			//objs[0].anims.play(this.player1.anims.currentAnim.key + "_one");
		})
		

		//this.add.sprite(50,350,this.characters[1].texture.key);
	}
}