class SplashScene extends Phaser.Scene {

	constructor(){
		super({key:"SplashScene"})

		this.whoosh = {};
		this.skater = {};
	}

	preload(){
		this.load.image("cn-logo","cnlogo.png");
		this.load.image("skater","skater.png");
		this.load.audio("whoosh","zapsplat_foley_stick_bendy_whoosh_air_fast_004_12684.mp3");
	}

	create(){

		

		//fade in logo
		var logo = this.add.image(0,200,'cn-logo').setOrigin(0,0);

		//Make it 1/2 it's original size
		logo.setScale(.5,.5);
		

		logo.x = window.innerWidth/2 - logo.displayWidth/2;
		
		console.log(`Window width ${window.innerWidth}`)
		console.log(JSON.stringify(logo))
		console.log(logo)
		
		//hide it
		logo.alpha = 0;

		//set up skater image
		this.skater = this.add.image(-250,logo.y + logo.displayHeight/2,'skater');

		this.whoosh = this.sound.add('whoosh');

		this.whoosh.loop = true;
		this.whoosh.rate = .25;


		//make it 1/2 it's original size
		this.skater.scaleX = 0.5;
		this.skater.scaleY = 0.5;

		
		//Fade logo in and then slide skater in from left to right onComplete of logo fade
		this.tweens.add({
			targets : [logo],
			alpha : 1,
			duration : 2500,

			onComplete: ()=>{
				//tween move skater from offscreen to logo left
				this.tweens.add({
					targets : [this.skater],
					x : logo.x + logo.displayWidth,
					ease:'Power2',
					duration : 1000,
					yoyo:true,
					flipX:true,
					onStart:()=>{
						this.whoosh.play();
					},
					completeDelay:300,
					onComplete: ()=>{
						this.whoosh.stop();
						this.scene.start("PlayerSelectionScene",{"super":"man"})
					}
				})
			}
		})


		//tween move skater from offscreen to logo left
		
		
	}

	update(){
		if(this.tweens.isTweening(this.skater)){
			//this.whoosh.play();
		} else {
			//this.whoosh.stop();
		}
	}
}
