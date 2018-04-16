class PlayerSelectionScene extends Phaser.Scene {

	
	constructor(){

		super({key:"PlayerSelectionScene"});
		//Define a member attribute for each character in the game. Could have used array I guess.
		this.cursors = null;
		this.player1 = null;
		this.player2 = null;
		this.metro = null;
		this.panther = {};

		//Define number of characters that can be selected on this screen
		this.totalSlotsRemaining = 2;

		//Finally defined an array of fighters object used to make accessing fighters easier in 
		//my drawFighters() utility methods
		this.fighters = [];
		
		//Hold computed width based on Viewport Width Size
		this.newDisplayWidthForEachFigure = 0;
		//Bad name but this is the 'Play' Button that drops from top of screen
		this.play = {};
		//The hidden characters images 1 and 2.
		this.question1 = {};
		this.question2 = {};	
		//Max characters per column printed in the character selection area
		this.maxCols = game.config.maxCharactersPerRow;
		//Array which holds characters user selected on this screen
		this.userSelectedCharacters = [];
		//Reference to background theme Music
		this.themeMusic = {};


		//Tween to Slide Fighters left and off screen 
		this.hideFighters = (callback)=>{

			this.tweens.add({

        		targets:this.fighters,
        		x: -200,
        		duration:500,
        		
        		onComplete : callback
			})
		}

		//Utitlity method to Add Fighter to internal array and resize if necessary based
		//on available horizontal and vertical space in the selection area
		this.addFighter = (fighter)=>{

			var maxHeightAvailable = window.outerHeight * .5; //600px

			this.fighters[this.fighters.length] = fighter;
			
			var figures = this.fighters;

			//Now determine max placement width for each figure based on window width
			this.newDisplayWidthForEachFigure = parseInt(window.outerWidth *.60)/this.maxCols;

			//Use division to determine if characters will they all fit on 1 row.
			//If not reduce size and redistribute across remaining rows
			var rowsNeeded = Math.round(this.fighters.length / this.maxCols);

			var maxHeightForEachFigure = maxHeightAvailable/rowsNeeded;

			console.log(`Win width ${window.outerWidth} New width for each figure computed as ${this.newDisplayWidthForEachFigure}`)
			
			//Now resize (scale) fighters to fit screen
			for(var x = 0; x < figures.length; x++){
				var oldWidth = figures[x].displayWidth;
				var oldHeight = figures[x].displayHeight;
				figures[x].displayWidth = this.newDisplayWidthForEachFigure;
				figures[x].displayHeight = this.newDisplayWidthForEachFigure/oldWidth * oldHeight;

				//Need to make image smaller if we have so many fighters that they wrap to new rows
				if(figures[x].displayHeight > maxHeightForEachFigure){
					var reducePct = maxHeightForEachFigure / figures[x].displayHeight;
					figures[x].displayHeight = reducePct * figures[x].displayHeight;
					figures[x].displayWidth = reducePct * figures[x].displayWidth;
					this.newDisplayWidthForEachFigure = this.newDisplayWidthForEachFigure * reducePct;
				}				
			}

			
		}

		//Draw Fighters into Selection Area
		this.drawFighters = (yCoord)=>{
			console.log(`YCoord is ${yCoord}`)
			var chars = this.fighters;
			var vertical = yCoord;
			var cols = 0;
			var row = 1;
			var beginRowIndex = 0;
			console.log(`Total characters is ${chars.length} with width ${this.newDisplayWidthForEachFigure}`)
			for(var index = 0; index < chars.length; index++,cols++){
				console.log(`Character ${index} with display width ${chars[index].displayWidth}`)
				chars[index].y =  chars[beginRowIndex].y;
				if(index > 0){
					if(cols < this.maxCols){
						chars[index].x =  parseInt(chars[index-1].x) + parseInt(chars[index-1].displayWidth) ;
						console.log(`The value of x for ${index} is ${chars[index].x}`);
					} else {
						row +=1;
						chars[index].x =  parseInt(window.outerWidth/2) - (this.newDisplayWidthForEachFigure * this.maxCols)/4;
						chars[index].y = chars[beginRowIndex].y + chars[beginRowIndex].displayHeight;
						beginRowIndex = index;
						cols = 0;
						
					}
				} else {
										
					chars[index].x =  parseInt(window.outerWidth/2) - (this.newDisplayWidthForEachFigure * this.maxCols)/4
					chars[index].y = vertical;
					console.log(`The value of x for ${index} is ${chars[index].x}`);
				}
				
				console.log(`Character ${index} placed at point(${chars[index].x},${chars[index].y}) with display width ${chars[index].displayWidth}`)
				
			}
		}

		//Draw Selection Box Region
		this.drawCharacterSelectedBox = ()=>{


	        var graphics = this.add.graphics();

			var color = 74165476;
			var thickness = 2;
			var alpha = 1;


			graphics.lineStyle(thickness, color, alpha);

			graphics.fillStyle(color)

			var leftBoxCornerX = window.outerWidth/2 - window.outerWidth * .60/2;

			var leftBoxCornerY = this.fighters[this.fighters.length-1].y * 1.25;
			var BoxWidth = window.outerWidth * .60;

			var BoxHeight = window.outerHeight * .20
			
			graphics.fillRect(leftBoxCornerX, leftBoxCornerY, BoxWidth, BoxHeight);
			


			console.log({leftBoxCornerY:leftBoxCornerY,BoxHeight:BoxHeight, origin:graphics.origin})
							

			//Add Buttons	
			this.question1 = this.add.image(0,0,'characterselect').setOrigin(0,0)
				.setX(leftBoxCornerX).setY(leftBoxCornerY + BoxHeight/4).setScale(.5,.5);

			this.question2 = this.add.image(0,0,'characterselect').setOrigin(0,0)
				.setX(leftBoxCornerX + BoxWidth - this.question1.displayWidth).setY(leftBoxCornerY + BoxHeight/4).setScale(.5,.5);


			var vs = this.add.image(0,0,'vs').setOrigin(0,0).setScale(.20,.20);

			vs.setX(leftBoxCornerX + BoxWidth/2 - vs.displayWidth/2).setY(leftBoxCornerY + BoxHeight/2 - vs.displayHeight/2)
	        
	        vs.depth = 100;
		}

	}


	preload(){

		this.cursors = this.input.keyboard.createCursorKeys();
		this.load.image('stadium','stadiumbackground.jpg');
		this.load.image('vs','vs.png')
		this.load.audio("sound","rocky-theme.mp3");
		this.load.audio("coindrop","coin_3.mp3");
		this.someFight = this.load.audio("fight","ahx_10.mp3");
		this.load.audio("hover","mouseoverplayer.mp3");
		this.load.audio("selectplayer","selectplayer.mp3");
		this.load.audio("letsgo","letsgo.mp3");
		this.load.audio("punch","hadouken.mp3");
		this.load.audio("hulksmash","smash.mp3");
		this.load.audio("buttercuppunch","buttercuppunch.mp3");
		this.load.audio("bowpunch","shout.mp3");
		this.load.audio("pantherpunch","panther1.mp3");
		this.load.image("characterselect","characterselect.png");
		this.load.audio("boing","boing.mp3");

        this.
            load.spritesheet('characters', 'hockeyspritesheet.png',{ frameWidth: 138,frameHeight:140, start:1});
            this.
            load.spritesheet('characters2', 'hulkspritesheet2.png',{ frameWidth: 179,frameHeight:230, start:1})
	
        this.
            load.spritesheet('buttons', 'buttons.png',{ frameWidth: 220,frameHeight:110, start:1});

        this.
            load.spritesheet('bow', 'knifespritesheet.png',{ frameWidth: 95,frameHeight:150, start:1});

        this.
            load.spritesheet('panther', 'blackpantherspritesheet.png',{ frameWidth: 205,frameHeight:235, start:1});
	}

	


	
		// Function Name: Create
		// 	Creates an instance of the GUI for display to user
		// Param
		// 	data - data is a json object passed to this function and eventually printed to page
	
	create(data){



		console.log(data)
	
		this.stadium = this.add.image(0,0,'stadium');

		var text = this.add.text(window.outerWidth/2, window.outerHeight * .05, 'Choose Your Players', { font: window.outerWidth *.08 + 'px Arial', fill: '#FFFFFF' });

		text.x = window.innerWidth/2 - text.width/2;

		this.metro = this.add.sprite(0,0,'bow',1).setScale(1.5,1.5).setInteractive();

		this.metro.respawn = {sheet:"knifespritesheet.png",};
		
		this.metro.attack = this.anims.create({
			key:'bow',
			frames: this.anims.generateFrameNumbers('bow',{frames:[0,1,2,3,4,0]}),
			frameRate:8
		})

		this.metro.anims.load('bow');

	
		this.metro.punch = this.sound.add("bowpunch");
	
		this.metro.punch.rate = .5;

		this.addFighter(this.metro);
		
		this.panther = this.add.sprite(0,0,'panther',1).setScale(1.25,1.25).setInteractive();

		this.panther.attack = this.anims.create({
			key:'pantherattack',
			frames: this.anims.generateFrameNumbers('panther',{frames:[0,1,2,3,4,0]}),
			frameRate:8
		})

		this.panther.anims.load('pantherattack');

		this.panther.punch = this.sound.add("pantherpunch");
		
		this.panther.punch.rate = 3;

		this.addFighter(this.panther);


		this.themeMusic = this.sound.add("sound",{loop:"true"});

		this.themeMusic.play();

		this.sound.add("selectplayer").play();

		this.stadium.setOrigin(0,0)
		this.stadium.scaleX = 3.0;
		this.stadium.scaleY = 2.0;

		this.default = {};

		this.default.punch = this.sound.add("punch");
		this.default.punch.loop = true;
		
		this.punch = this.default.punch;




		//Position Sprite at coord (0,0) ->(defaults to first Frame of spritesheet) 
		this.player1 = this.add.sprite(0,0,'characters').setInteractive();
		
		this.player1.attack = this.anims.create({
            key: 'player1Attack',
            frames: this.anims.generateFrameNumbers('characters',{frames:[0,0,1,1,2,2,3,3,3,0]}),
            frameRate: 12
        });

        this.player1.anims.load('player1Attack');

		this.player1.alpha = 1;

		//Load Into Array for easier placement on screen later
		this.addFighter(this.player1);


		//Position Sprite at coord (300,300) ->(defaults to first Frame) 
		this.player2 = this.add.sprite(0,0,'characters').setInteractive();

		this.player2.attack = this.anims.create({
            key: 'player2Attack',
            frames: this.anims.generateFrameNumbers('characters', {frames:[4,6,7,7,4]}),
            frameRate: 8,
            repeat: 0,

        });
        this.player2.anims.load('player2Attack');

		//Add Custom Punch Sound for Buttercup
        this.player2.punch = this.sound.add("buttercuppunch");

		this.player2.alpha = .8;

		this.addFighter(this.player2);


		//Add Player 3
		this.player3 = this.add.sprite(0,0,'characters2').setInteractive();

        
        this.player3.attack = this.anims.create({
            key: 'player3Attack',
            frames: this.anims.generateFrameNumbers('characters2', {frames:[0,4,5,6,0]}),
            frameRate: 3,
            repeat: 0,

        });

        this.player3.anims.load('player3Attack');

        //Add Custom Punch Sound for Hulk
        this.player3.punch = this.sound.add("hulksmash");

        this.addFighter(this.player3);

		//sprite.x = window.innerWidth/2 - sprite.width/2;
		
        //Capture Mouseover onMouseEnter
        this.input.on('pointerover',(pointer,objs)=>{
        	if(!objs[0].attack){
        		return;
        	}
        	this.anims = objs[0].anims;
        	this.punch.loop= true;
        	this.sound.add("hover").play();
        	console.log(objs[0])
        	objs[0].flipX = true;
        	objs[0].alpha = 1;
        	if(objs[0].punch){
        		this.punch = objs[0].punch;
        	} else {

        		this.punch = this.default.punch;
        	}

        	this.punch.play();
        	
        	
        	
        		objs[0].anims.play(objs[0].attack.key);
        	

        }).on('pointerout',(pointer,objs)=>{
        	

        	objs[0].alpha = .7;
        	objs[0].flipX = false;
        	if(objs[0].punch){
        		objs[0].punch.stop();
        	}
        	
        	//objs[0].anims.pause(objs[0].attack.key)
        }).on('pointerdown',(pointer,objs)=>{


        	

        	this.sound.add("coindrop").play();


        	if(objs.length == 0){
        		return;
        	}

        	if(objs[0] && objs[0].name == "playButton"){
        		console.log(objs[0])
        		console.log("Time to Play")
        		this.themeMusic.stop();
        		this.scene.start("GamePlayScene",this.userSelectedCharacters);
        		return;
        	}

        	if(this.totalSlotsRemaining-- <= 0){
        		console.log("type something")
        		return;

        	} 
        	
        	var challenger = this.add.sprite(-200,this.question1.y,objs[0].frame.source.texture.key,objs[0].attack.frames[0].textureFrame).setScale(1,1)
        	
        	

        	this.tweens.add({
        		targets:challenger,
        		x: this.userSelectedCharacters.length == 0 ? this.question1.x + this.question1.displayWidth/2: this.question2.x + this.question2.displayWidth/2,
        		duration:1000,
        		ease:'Bounce',
        		onComplete:()=>{
        			challenger.anims.load(objs[0].attack.key);
        			this.userSelectedCharacters.push(objs[0]);

        			this.punch.play();
        			this.anims = challenger.anims;
        			challenger.anims.play(objs[0].attack.key);
        			if(this.totalSlotsRemaining == 0){
        				
        				var fight = this.sound.add("fight").play()
        				
        				this.play.anims.play("active");

        				this.hideFighters(()=>{
		        			this.play.alpha = 1;
		        			this.sound.add("boing").play();
		        			this.tweens.add({

				        		targets:[this.play],
				        		y: this.fighters[0].y,
				        		
				        		duration:500,
				        		ease:'Bounce',
				        		onComplete : ()=>{
				        			this.sound.add("letsgo").play();
				        		}		        		
							})
        				});  
        						      			
        			}
        		}
        	})

        	console.log(objs[0].attack.frames[0].textureFrame)

        })

        this.drawFighters((text.y + text.displayHeight) * 1.5);

        this.drawCharacterSelectedBox();

        this.play = this.add.sprite(0,-100,'buttons',0).setInteractive().setOrigin(0,0);
        this.play.name = "playButton";
        
        this.play.setX(window.innerWidth/2 - this.play.width/2);
        this.play.alpha = 0;
        this.anims.create({
        	key:"active",
        	frames: this.anims.generateFrameNumbers('buttons', {frames:[1,1,1,1,0,0,0,0]}),
        	frameRate:3,
        	repeat:-1
        })
        

        this.play.anims.load("active");
        
       
	}

	update(){
		if(!this.anims.isPlaying){
			this.default.punch.stop();
			this.punch.stop();
		}
	}

	
}

