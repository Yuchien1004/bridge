//延遲器(雖然感覺沒有效果)
function delay(n){
  return new Promise(function(resolve){
      window.setTimeout(function(){
        resolve();
      },n*1000);
  });
}
const allrule = ["小良子","小主人","黃良","女主人","黃良子"]
const Prologuedialogue = ["（小良子倒在東岸水溝邊）"/*1*/,"過了一會兒，小良子睜開眼睛，醒了過來"/*2*/,"……這裡是哪裡，我為什麼會在這裡？"/*3*/,
"頭好痛，好冷，好餓……"/*4*/,"（不知從何而來的嗚咽聲，正在逐漸增強）"/*5*/,"什麼聲音？（四處張望）"/*6*/,"哇，好漂亮的橋！聲音是從橋那邊傳來的嗎？"/*7*/,
"黃良！黃良！把孩子叫回去，不要讓他跑過橋來…黃良！"/*8*/,"（突然出現在橋前，張開兩隻胳膊）"/*9*/,"你是誰…（突然發狂）不要攔我，我要過橋，我要過橋！"/*10*/,
"…啊！"/*11*/,"小良子嘴角裂開流血，接著手臂、大腿一直到頭，渾身是血汩汩流不止"/*12*/,"啊！好痛，為什麼？…（伸出手）幫幫我！"/*13*/,"……"/*14*/,
"為什麼，為什麼……"/*15*/,"……"/*16*/];
const Prologueaction = ["a11000000","a11000000","a11010000","a11010000","a11000000","a11010000",
"a11110000","a11000000","a11003000","a11013000","a11013000","a11003000","a11013000","a11003010",
"a11013000","a11003010"];
const Prologuespecial = ["這是一座血色的橋，似乎剛建好不久"];
const AllPrologue = [Prologuedialogue,Prologueaction,Prologuespecial];
var body = document.body;
var face = "right";
var m = 0;
now = "static";
operation = 0;
type = "none"
const ruleone = document.getElementById("ruleone");
const ruletwo = document.getElementById("ruletwo");
const blackscreen = document.getElementById("blackscreen");
const chapter = document.getElementById("chapter");
const Prologue = document.getElementById("Prologue");
const First = document.getElementById("First");
const Title = document.getElementById("Title");
const Face = document.getElementById("face");
const Press = document.getElementById("Press");
const dialogue = document.getElementById("dialogue");
const talk = document.getElementById("talk");
const rn = document.getElementById("rn");
const Name = document.getElementById("name")
const end = document.getElementById("end")
const inventory = document.getElementById("inventory")
const hungry = document.getElementById("hungry")
speed = 3;
function Tochapter(e){
  var e = e||window.event;
  switch(e.keyCode){
    case 32:
      document.removeEventListener("keydown",Tochapter,false);
      blackscreen.style.backgroundColor = 'rgb(0, 0, 0, 1)';
      setTimeout(function(){
        chapter.style.display = "block";
        Prologue.style.display = "block";
        Title.style.display = "none";
        Face.style.display = "none";
        Press.style.display = "none";
        blackscreen.style.backgroundColor = 'rgb(0, 0, 0, 0)';
        setTimeout(function(){
          blackscreen.style.display = "none";
        },2000);
      },2000);
  }
}
document.addEventListener("keydown",Tochapter,false);
function startmove(e){
  var e = e||window.event;
  switch(e.keyCode){
    case 65:
      face = "left";
      break;
    case 68:
      face = "right";
      break;
    case 32:
      if(ruleone.offsetLeft >= (body.offsetWidth/2-60) && ruleone.offsetLeft <= (body.offsetWidth/2)){
        document.removeEventListener("keydown",startmove,false);
        document.removeEventListener("keydown",move,false);
        document.removeEventListener("keyup",stand,false);
        TypeText(Prologuespecial[0]).then(function(){
          k++
          talk.innerHTML = "";
          main()
        })

      }
  }
}
function move(e){
  var e = e||window.event;
  switch(e.keyCode){
    case 65:
      var left = ruleone.offsetLeft;
      left = parseInt(left);
      ruleone.style.left = (left-speed) + "px";
      if (ruleone.offsetLeft >= (body.offsetWidth/2-40)){
        speed = 3;
      }
      if (ruleone.offsetLeft < -10){
          speed = 0;
      }
      action()
      break;
    case 68:
      var left = ruleone.offsetLeft;
      left = parseInt(left);
      ruleone.style.left = (left+speed) + "px";
      if (ruleone.offsetLeft >= (body.offsetWidth/2-40)){
          speed = 0;
      }
      if (ruleone.offsetLeft < -10){
        speed = 3;
      }
      action()
      break;
  }
}
var n = 0;
var s = 5;
function action(){
  const circleright = ['photo/A_1_right.png',"photo/A_3_right.png",'photo/A_2_right.png'];
  const circleleft = ['photo/A_1_left.png',"photo/A_3_left.png",'photo/A_2_left.png'];
  if (now == "static"){
    if (face == "right"){
      ruleone.style.backgroundImage = "url('photo/A_1_right.png')";
      now = "move"
    }else{
      ruleone.style.backgroundImage = "url('photo/A_1_left.png')";
      now = "move"
    }
  }else{
    if (face == "right"){
      ruleone.style.backgroundImage = "url('" + circleright[m] + "')";
    }else{
      ruleone.style.backgroundImage = "url('" + circleleft[m] + "')";
    }
  }
  if (n % s == 0) {
    if (face == "right"){
        if (m == circleright.length - 1){
          m = 0;
        }else{
          m += 1;
        }
        ruleone.style.backgroundImage = "url('" + circleright[m] + "')";
    }else{
      if (m == circleleft.length - 1){
        m = 0;
      }else{
        m += 1;
      }
      ruleone.style.backgroundImage = "url('" + circleleft[m] + "')";
    }
    n = 0
  }
  n++
}
function stand(){
  if (face == "right"){
    ruleone.style.backgroundImage = "url('photo/A_3_right.png')";
    now = "static";
  }else{
    ruleone.style.backgroundImage = "url('photo/A_3_left.png')";
    now = "static";
  }
}
function start(i){
  if(i==1){
    main();
    setTimeout(function(){
      blackscreen.style.display = "flex";
    },20);
    blackscreen.style.backgroundColor = 'rgb(0, 0, 0, 1)';
    setTimeout(function(){
      chapter.style.display = "none";
      Prologue.style.display = "none";
      First.style.display = "none";
      document.body.style.backgroundImage = "url('photo/PrologueScenes.PNG')";
      blackscreen.style.backgroundColor = 'rgb(0, 0, 0, 0)';
      ruleone.style.display = "block"
      dialogue.style.display = "block"
      hungry.style.display = "block"
      inventory.style.display = "block"
      setTimeout(function(){
        blackscreen.style.display = "none";
      },2000);
    },2000);
  }
}
let circle = 0;
let waitingsecond = 0;
function TypeText(text){
  return new Promise(function(resolve,reject){
    waitingsecond = text.length;
    const intervalId = setInterval(() => {
      talk.textContent = text.substring(0,circle + 1);
      circle++;
      var listener = function(){
        document.removeEventListener("keydown",listener,false);
        clearInterval(intervalId);
        talk.textContent = text;
        waitingsecond = 0;
        circle = 0;
        resolve()
      }
      document.addEventListener('keydown',listener,false);
      if(circle > text.length){
        clearInterval(intervalId);
        document.removeEventListener("keydown",listener,false);
        circle = 0;
        waitingsecond = 0;
        resolve()
      }
    },100);
  });
}
k = 0;
function main(){
  plot = AllPrologue[1][k]
  if(k == 8){
    ruleone.style.left = "42vw";
    ruleone.style.backgroundImage = "url('photo/A_3_right.png')";
  }
  if(k == 11){
    ruleone.style.width = "50px";
    ruleone.style.height = "100px";
    ruleone.style.top = "59vh";
    ruleone.style.backgroundImage = "url('photo/Dead.png')";
  }
  if(k==15){
    Name.innerHTML = "";
    setTimeout(function(){
      blackscreen.style.backgroundColor = 'rgb(0, 0, 0, 1)';
    },1000);
    blackscreen.style.display = "flex";
    rn.style.display = "none";
    end.style.display = "block";
    setTimeout(function(){
      dialogue.style.display = "none";
      ruleone.style.display = "none";
      ruletwo.style.display = "none";
      hungry.style.display = "block"
      inventory.style.display = "block"
      rn.style.display = "none";
      chapter.style.display = "block";
      Prologue.style.display = "block";
      blackscreen.style.backgroundColor = 'rgb(0, 0, 0, 0)';
      end.style.display = "none";
      setTimeout(function(){
        blackscreen.style.display = "none";
      },2000);
      k++
    },6000);
  }
  if(parseInt(plot.charAt(5),10) != 0){
    ruletwo.style.display = "block";
    ruletwo.style.backgroundImage = "url('photo/D.png')";
  }
  else{
    ruletwo.style.display = "none";
  }
  if(parseInt(plot.charAt(4),10) != 0){
    rn.style.display = "flex";
    Name.innerHTML = allrule[parseInt(plot.charAt(1),10)-1];
  }else if(parseInt(plot.charAt(7),10) != 0){
    rn.style.display = "flex";
    Name.innerHTML = allrule[parseInt(plot.charAt(5),10)-1];
  }else{
    rn.style.display = "none";
  }
  ruleTalk = AllPrologue[0][k];
  TypeText(ruleTalk).then(delay(2)).then(function(){
    var nextpart = function(){
      document.removeEventListener("keydown",nextpart,false);
      k++
      talk.innerHTML = "";
      main()
    }
    if(parseInt(plot.charAt(3),10) != 0){
      setTimeout(function(){
        Name.innerHTML = "";
        rn.style.display = "none";
        talk.innerHTML = "";
        document.addEventListener("keydown",startmove,false);
        document.addEventListener("keydown",move,false);
        document.addEventListener("keyup",stand,false);
      },2000);
    }
    else{
      document.addEventListener("keydown",nextpart,false);
    }
  })
}


