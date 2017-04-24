$(function(){

  // 1.创建蛇移动路线
  var snake=$('#snake');
  for(var i=0;i<20;i++){
    for(var j=0;j<20;j++){
      $('<div>').addClass('block').attr('id',''+i+'_'+j+'').appendTo(snake);
    }
  }

  // 2.绘制蛇
  var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
  var snaketab={'0_0':true,'0_1':true,'0_2':true};

  // 查找对应的div
  function findDiv(x,y){
    return $('#'+x+'_'+y);
  }

  // 通过蛇的位置对蛇进行遍历
  $.each(snake,function(i,v){
    findDiv(v.x,v.y).addClass('snake');
  })

  // 定义蛇移动的初始方向
  var direction='right';

  // 键盘事件
  $(document).on('keyup',function(e){
    console.log(e.keyCode);
    var setTab={'left':37,'right':39,'top':38,'bottom':40};
    var tab={37:'left',38:'top',39:'right',40:'bottom'};
    // 当键盘控制方向同默认移动方向相反时，不进行操作
    if(Math.abs(e.keyCode-setTab[direction])==2){
      return;
    }
    // 当键盘码为其它方向时，改变移动方向
    if(tab[e.keyCode]){
      direction=tab[e.keyCode];
    }
  })

  // 蛇移动的函数
  function move(){
    // 蛇移动位置时，对应新头和旧头的坐标变化
    var oldhd=snake[snake.length-1];
    if(direction=='right'){
      var newhd={
        x:oldhd.x,
        y:oldhd.y+1
      }
    }
    if(direction=='bottom'){
      var newhd={
        x:oldhd.x+1,
        y:oldhd.y
      }
    }
    if(direction=='left'){
      var newhd={
        x:oldhd.x,
        y:oldhd.y-1
      }
    }
    if(direction=='top'){
      var newhd={
        x:oldhd.x-1,
        y:oldhd.y
      }
    }
    // 撞到自己(新头的位置和蛇躯干的位置重叠)
    if(snaketab[newhd.x+'_'+newhd.y]){
      clearInterval(timeId);
      alert('您已经撞到自己了！');
      return;
    }
    if(newhd.x<0||newhd.x>19||newhd.y<0||newhd.y>19){
      clearInterval(timeId);
      alert('您撞到墙上了!');
      return;
    }
    // 将新头的位置插入到数组中
    snake.push(newhd);
    snaketab[newhd.x+'_'+newhd.y]=true;
    findDiv(newhd.x,newhd.y).addClass('snake');
    // 当蛇吃到食物时，重新投放食物
    if(newhd.x==food.x&&newhd.y==food.y){
      findDiv(food.x,food.y).removeClass('food');
      food=dropFood();
    }else{
      // 否则将蛇尾移出
      var foot=snake.shift();
      delete snaketab[foot.x+'_'+foot.y];
      findDiv(foot.x,foot.y).removeClass('snake');
    }
  }

  // 3.食物的随机投放
  function dropFood(){
    // 投放的食物不可同蛇的位置重叠
    do{
      var x=Math.floor(Math.random()*20);
      var y=Math.floor(Math.random()*20);
    }while(snaketab[x+'_'+y]);
    findDiv(x,y).addClass('food');
    return {x:x,y:y};
  }
  var food=dropFood();

  //游戏开始
  var timeId=setInterval(move,150);

})
