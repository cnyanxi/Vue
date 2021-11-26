var PLAYER = {
	img :player,
	x: (WIDTH - PLAYER_WIDTH) * 0.5,
	y: HEIGHT - PLAYER_HEIGHT,
	width: PLAYER_WIDTH,
	height: PLAYER_HEIGHT,
	speed: PLAYER_SPEED,
	HP: 5,
	count: 0, 
	isIce: false,
	isPoisoning :false,
	isLiving:true,
	poisoningTimer:null,
	draw: function (ctx) {
		 if(this.count < 6) {
		            ctx.drawImage(this.img, 0 , 0, this.width,  this.height,this.x, this.y, this.width, this.height)
		        }else {
		            ctx.drawImage(this.img, 0 , this.height, this.width, this.height,this.x, this.y, this.width, this.height)
		        }
		        // 画好之后 就让计数值递增
		        this.count ++
		        // 当画完上半张和下半张之后，就让计数值归0 开始下一轮
		        if(this.count >= 11) {
		            this.count = 0
		        }
	},
	ice:function() {
		this.isIce = true;
		this.img = drawice;
	},
	poisoning:function() {
		this.isPoisoning = true;
		this.img = drawpoisoningImg;
		console.log('查看定时器是否为空：' + PLAYER.poisoningTimer)
		if(this.poisoningTimer)  return
		console.log('定时器非空：' + PLAYER.poisoningTimer)
		this.poisoningTimer = setInterval(() => {
			this.HP -=1
		}, 2000)
	},
	bomb:function(){
		this.isLiving = false;
		this.HP = 0;
		this.img = drawdeadImg;
	},
	//鼠标移动函数
	init: function (canvas) {
		// canvas.onmousemove = function (evt) {
		// 	PLAYER.x = evt.offsetX - PLAYER_WIDTH / 2


		// 	//边缘检测处理
		// 	if (PLAYER.x < 0) {
		// 		PLAYER.x = 0;
		// 	}
		// 	if (PLAYER.x > WIDTH - PLAYER_WIDTH) {
		// 		PLAYER.x = WIDTH - PLAYER_WIDTH;
		// 	}

		// };
		window.onmousemove = function (e) {
			console.log("移动");
			console.log(e.pageX);
			// 如果发现玩家的x坐标 小于鼠标的x坐标，就让玩家向右移动到鼠标的位置
			if (PLAYER.x < e.pageX - canvas.offsetLeft) {
				PLAYER.x += PLAYER.speed;
			} else {
				PLAYER.x -= PLAYER.speed;
			}
	  
			// player.x = e.offsetX;
	  
			// //  做一个边缘检测  最右边
			if (PLAYER.x > WIDTH -PLAYER.width) {
				PLAYER.x = WIDTH - PLAYER.width;
			}
			// 边缘检测 最左边
			if (PLAYER.x < 0) {
				PLAYER.x = 0;
			}
		  };
	
	},
	drawHP: function (ctx) {
		if(PLAYER.HP > 5){
			PLAYER.HP = 5;
		}
		if(PLAYER.HP < 1){
			PLAYER.isLiving =false
		}
		for (i = 0; i < 5; i++) {
			if (i < this.HP) {
				ctx.drawImage(heartImg, WIDTH - 50 - i * 55, 0, HEART_WIDTH, HEART_HEIGHT)
			} else {
				ctx.drawImage(skullImg, WIDTH - 50 - i * 55, 7, SKULL_WIDTH, SKULL_HEIGHT)
			} 
		}
	},
	die() {
		window.onmousemove = null;
	  },
}