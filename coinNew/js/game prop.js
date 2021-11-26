var coinList = new ObjList()

//花
function coin(x, y) {
	this.x = x
	this.y = y
	this.width = COIN_WIDTH
	this.height = COIN_HEIGHT
	this.speed = COIN_SPEED
	this.img = coinImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (coinList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			coinList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//花绘制及移动
function generateCoin() {

	if (count % COIN_FREQUENT === 0) {
		coinList.data.push(new coin(getRandomInt(0, WIDTH - COIN_WIDTH), -COIN_HEIGHT))
	}
	coinList.data.forEach(function (coin) {
		coin.move(coinList)
		coin.draw(ctx)
	})
}
//花碰撞
function checkCollideCoin() {
	var result = isCollideOneAndGroup(PLAYER, coinList.data);
	if (result) {
		score += 1;
		coinList.recycle(result);
	}
}
var birdList = new ObjList()
//鸟
function bird(x, y) {
	    this.x = x,
		this.y = y,
		this.width = BIRD_WIDTH,
		this.height = BIRD_HEIGHT,
		this.speed = BIRD_SPEED,
		this.img = birdImg,
		this.count = 0,
		this.timer = setInterval(() => {
			shitList.data.push(new Shit(this.x, this.y))
		}, 2000)
	this.draw = function (ctx) {
		// if(this.count < 6) {
		//          ctx.drawImage(this.img, 0 , this.height*0.67, this.width, this.height,this.x, this.y+this.height*0.67, this.width, this.height)

		//        }else {
		//           ctx.drawImage(this.img, 0 ,-this.height*0.33, this.width,  this.height,this.x, this.y+this.height*(-0.33), this.width, this.height)
		//        }
		//        // 画好之后 就让计数值递增
		//        this.count ++
		//        // 当画完上半张和下半张之后，就让计数值归0 开始下一轮
		//        if(this.count >= 11) {
		//            this.count = 0
		//        }
		if (this.count < 25) {
			ctx.drawImage(this.img, 0, this.height * 0.67, this.width, this.height, this.x, this.y + this.height * 0.5, this.width, this.height)

		} else {
			ctx.drawImage(this.img, 0, -this.height * 0.33, this.width, this.height, this.x, this.y, this.width, this.height)
		}
		// 画好之后 就让计数值递增
		this.count++
		// 当画完上半张和下半张之后，就让计数值归0 开始下一轮
		if (this.count >= 49) {
			this.count = 0
		}
	}
	this.move = function (birdList) {
		this.x -= this.speed
		if (this.x < -300) {
			clearInterval(this.timer)
			birdList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//鸟绘制及移动
function generateBird() {
	if (count % BIRD_FREQUENT === 0) {
		birdList.data.push(new bird(BIRD_WIDTH + WIDTH, getRandomInt(50, 200)))
	}
	birdList.data.forEach(function (bird) {
		bird.move(birdList)
		bird.draw(ctx)
	})
}
//大便
var shitList = new ObjList()

function Shit(x, y) {
	this.x = x,
		this.y = y,
		this.width = SHIT_WIDTH,
		this.height = SHIT_HEIGHT,
		this.speed = SHIT_SPEED,
		this.img = shitImg

	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (shitList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			shitList.recycle(this)
		}
	}

}
// 奥利给绘制及移动
function generateShit() {
	shitList.data.forEach(function (bird) {
		bird.move(birdList)
		bird.draw(ctx)
	})
}
//奥里给碰撞
function checkCollideShit() {
	var result = isCollideOneAndGroup(PLAYER, shitList.data);
	if (result) {
		shitList.recycle(result);
		PLAYER.HP -= 1
		PLAYER.speed = 5
	}
}
//红蘑菇
var mushroom_redList = new ObjList()

function Mushroom_red(x, y) {
	this.x = x
	this.y = y
	this.width = MUSHROOM_RED_WIDTH
	this.height = MUSHROOM_RED_HEIGHT
	this.speed = MUSHROOM_RED_SPEED
	this.img = mushroom_redImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (mushroom_redList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			mushroom_redList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//红蘑菇绘制及移动
function generateMushroom_red() {

	if (count % MUSHROOM_RED_FREQUENT === 0) {
		mushroom_redList.data.push(new Mushroom_red(getRandomInt(0, WIDTH - MUSHROOM_RED_WIDTH ), -MUSHROOM_RED_HEIGHT))
	}
	mushroom_redList.data.forEach(function (mushroom_red) {
		mushroom_red.move(mushroom_redList)
		mushroom_red.draw(ctx)
	})
}
//红蘑菇碰撞
function checkCollideMushroom_red() {
	var result = isCollideOneAndGroup(PLAYER, mushroom_redList.data);
	if (result) {
		mushroom_redList.recycle(result);
		PLAYER.HP += 1
	}
}
//绿蘑菇
var mushroom_greenList = new ObjList()

function Mushroom_green(x, y) {
	this.x = x
	this.y = y
	this.width = MUSHROOM_GREEN_WIDTH
	this.height = MUSHROOM_GREEN_HEIGHT
	this.speed = MUSHROOM_GREEN_SPEED
	this.img = mushroom_greenImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (mushroom_greenList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			mushroom_greenList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//绿蘑菇绘制及移动
function generateMushroom_green() {

	if (count % MUSHROOM_GREEN_FREQUENT === 0) {
		mushroom_greenList.data.push(new Mushroom_green(getRandomInt(0, WIDTH - MUSHROOM_GREEN_WIDTH ), -MUSHROOM_GREEN_HEIGHT))
	}
	mushroom_greenList.data.forEach(function (mushroom_green) {
		mushroom_green.move(mushroom_greenList)
		mushroom_green.draw(ctx)
	})
}
//绿蘑菇碰撞
function checkCollideMushroom_green() {
	var result = isCollideOneAndGroup(PLAYER, mushroom_greenList.data);
	if (result) {
		mushroom_greenList.recycle(result);
		PLAYER.img = player
		PLAYER.poisoningTimer = clearInterval(PLAYER.poisoningTimer)
	}
}
//冰
var iceList = new ObjList()

function Ice(x, y) {
	this.x = x
	this.y = y
	this.width = ICE_WIDTH
	this.height = ICE_HEIGHT
	this.speed =ICE_SPEED
	this.img = iceImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (iceList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			iceList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//冰绘制及移动
function generateice() {

	if (count % ICE_FREQUENT === 0) {
		iceList.data.push(new Ice(getRandomInt(0, WIDTH - ICE_WIDTH ), -ICE_HEIGHT))
	}
	iceList.data.forEach(function (ice) {
		ice.move(iceList)
		ice.draw(ctx)
	})
}
//冰碰撞
function checkCollideice() {
	var result = isCollideOneAndGroup(PLAYER, iceList.data);
	if (result) {
		iceList.recycle(result);
		PLAYER.ice()
		PLAYER.speed = 3
	}
}
//黄鼠狼 
var weaselList = new ObjList()

function weasel(x, y) {
	this.x = x
	this.y = y
	this.width = WEASEL_WIDTH
	this.height = WEASEL_HEIGHT
	this.speed =WEASEL_SPEED
	this.img = weaselImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (weaselList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			weaselList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//黄鼠狼绘制及移动
function generateweasel() {

	if (count % WEASEL_FREQUENT === 0) {
		weaselList.data.push(new weasel(getRandomInt(0, WIDTH -WEASEL_WIDTH ), -WEASEL_HEIGHT))
	}
	weaselList.data.forEach(function (weasel) {
		weasel.move(weaselList)
		weasel.draw(ctx)
	})
}
//黄鼠狼碰撞
function checkCollideweasel() {
	var result = isCollideOneAndGroup(PLAYER, weaselList.data);
	if (result) {
		weaselList.recycle(result);
		score = parseInt(score*0.5),
		PLAYER.HP -= 2
	}
}
//炸弹
var bombList = new ObjList()

function bomb(x, y) {
	this.x = x
	this.y = y
	this.width = BOMB_WIDTH
	this.height = BOMB_HEIGHT
	this.speed =BOMB_SPEED
	this.img = bombImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (bombList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			bombList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//炸弹绘制及移动
function generatebomb() {

	if (count % BOMB_FREQUENT === 0) {
		bombList.data.push(new bomb(getRandomInt(0, WIDTH - BOMB_WIDTH ), -BOMB_HEIGHT))
	}
	bombList.data.forEach(function (bomb) {
		bomb.move(bombList)
		bomb.draw(ctx)
	})
}
//炸弹碰撞
function checkCollidebomb() {
	var result = isCollideOneAndGroup(PLAYER, bombList.data);
	if (result) {
		bombList.recycle(result);
		PLAYER.bomb()
	}
}
//蛇
var snakeList = new ObjList()

function snake(x, y) {
	this.x = x
	this.y = y
	this.width = SNAKE_WIDTH
	this.height = SNAKE_HEIGHT
	this.speed =SNAKE_SPEED
	this.img = snakeImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (snakeList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			snakeList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//蛇绘制及移动
function generatesnake() {

	if (count % SNAKE_FREQUENT === 0) {
		snakeList.data.push(new snake(getRandomInt(0, WIDTH - SNAKE_WIDTH ), -SNAKE_HEIGHT))
	}
	snakeList.data.forEach(function (snake) {
		snake.move(snakeList)
		snake.draw(ctx)
	})
}
//蛇碰撞
function checkCollidesnake() {
	var result = isCollideOneAndGroup(PLAYER, snakeList.data);
	if (result) {
		snakeList.recycle(result);
		PLAYER.poisoning()
	}
}
//小火龙
var fireList = new ObjList()

function fire(x, y) {
	this.x = x
	this.y = y
	this.width = FIRE_WIDTH
	this.height = FIRE_HEIGHT
	this.speed =FIRE_SPEED
	this.img =  fireImg;
	this.draw = function (ctx) {
		ctx.drawImage(
			this.img,
			this.x,
			this.y,
			this.width,
			this.height
		)
	}
	this.move = function (fireList) {
		this.y += this.speed
		if (this.y > HEIGHT + 300) {
			fireList.recycle(this)
		}
	}

	//this.timer = setTimeout(() => {
	//	this.speed = this.speed * 2
	//}, 1000 * getRandomInt(1, 3))

}
//小火龙绘制及移动
function generatefire() {

	if (count % FIRE_FREQUENT === 0) {
		fireList.data.push(new fire(getRandomInt(0, WIDTH - FIRE_WIDTH ), -FIRE_HEIGHT))
	}
	fireList.data.forEach(function (fire) {
		fire.move(fireList)
		fire.draw(ctx)
	})
}
//小火龙碰撞
function checkCollidefire() {
	var result = isCollideOneAndGroup(PLAYER, fireList.data);
	if (result) {
		fireList.recycle(result);
		PLAYER.img = player
		PLAYER.speed = 10
	}
}

