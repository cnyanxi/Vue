var canvas = document.querySelector("#canvas");
//创建了一个ctx变量  画布的画笔  
var ctx = canvas.getContext('2d');
// 整个再来一盘的页面结构元素
var restartEle = document.querySelector('.restart');

// 再来一盘的按钮
var restartBtn = document.querySelector('.restart-btn');

// 显示游戏结束后的分数
var scoreEle = document.querySelector('.restart-msg span');
// 再来一盘的按钮 绑定点击事件 ， 点击之后 让游戏 重新开始
restartBtn.onclick = function () {
    game.restart()
}
//画布宽和高
canvas.width = WIDTH;
canvas.height = HEIGHT;
//鼠标移动函数
score = 0;
PLAYER.init(canvas);
var count = 0;
var game = {
    timer: 0,
    play: function () {
        game.timer = setInterval(function () {
            game.clear();
            count++;
            if (PLAYER.isLiving) {
                //绘制底部接元宝的财神篮子
                PLAYER.draw(ctx);
                //通过控制HP来控制爱心和骷髅的显示
                PLAYER.drawHP(ctx);
                //花
                generateCoin();
                //鸟
                generateBird();
                //奥利给
                generateShit();
                //奥利给碰撞
                checkCollideShit()
                //花碰撞
                checkCollideCoin();
                //红蘑菇
                generateMushroom_red();
                //红蘑菇碰撞
                checkCollideMushroom_red();
                //绿蘑菇
                generateMushroom_green();
                //绿蘑菇碰撞
                checkCollideMushroom_green();
                //冰
                generateice();
                //冰碰撞
                checkCollideice();
                //冰
                generateweasel();
                //冰碰撞
                checkCollideweasel();
                //炸弹
                generatebomb();
                //炸弹碰撞
                checkCollidebomb();
                //蛇
                generatesnake();
                //蛇碰撞
                checkCollidesnake();
                 //小火龙
                 generatefire();
                 //小火龙碰撞
                 checkCollidefire();
            } else {
                game.checkDie();
                PLAYER.die(canvas);
                if(PLAYER.isIce){
                   PLAYER.img = drawicedeadImg
                }else{
                   PLAYER.img = drawdeadImg
                }
            }
            ctx.font = "30px 黑体";
            ctx.textBaseline = "top";
            ctx.fillStyle = "#fff";
            ctx.fillText(`玩家：${score}朵花`, 0, 0);

        }, 1000 / FPS);
    },
    clear: function () {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    },
    checkDie: function () {
        if (PLAYER.HP < 1) {
            // 让重新开始的那个页面元素 显示出来；
            restartEle.style.display = 'block';
            scoreEle.innerText = score;
            PLAYER.draw(ctx);
        }
    },
    restart: function () {
        // 重启界面隐藏
        restartEle.style.display = 'none';
        PLAYER.isLiving = true;
        // 初始化一下玩家信息 重新绑定事件 把玩家血量恢复为5
        PLAYER.speed = 10
        PLAYER.HP = 5
        score = 0
        PLAYER.img = player
        PLAYER.X = (WIDTH - PLAYER_WIDTH) * 0.5
        PLAYER.init(canvas);
        coinList.clear()
        birdList.clear()
        shitList.clear()
        mushroom_redList.clear()
        mushroom_greenList.clear()
        iceList.clear()
        weaselList.clear()
        bombList.clear()
        snakeList.clear()
        fireList.clear()
        clearInterval(PLAYER.poisoningTimer)
        PLAYER.poisoningTimer = null
        let end = setInterval(function (){},10000);
        for(let i= 1;i <= end ; i++){
              clearInterval(i);
        }
        game.play()
    }
}