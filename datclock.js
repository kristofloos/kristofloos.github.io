// Silly Clock 3 (updated) by http://www.btinternet.com/~kurt.grigg/javascript
//Hide from old Netscape 4.
if (!document.layers){

//Clock colours
dCol='#008000'; // date colour.
fCol='#0000ff'; // face colour.
mCol='#000000'; // minutes colour.
hCol='#ff0000'; // hours colour.
sCol='#7788ff'; // seconds colour.

//Controls
kgy1=5;    //Y distance from mouse to clock centre.
kgx1=80;   //X distance from mouse to clock centre.
kgv1=0.6;  //Follow/delay speed.
kgv2=20;   //Run speed (timeout).

//Alter nothing below! Alignments will be lost!
var ie=(navigator.appName == "Microsoft Internet Explorer")?true:false;
var n7=(document.getElementById&&!ie);
var o7=(navigator.appName.indexOf("Opera") != -1)?true:false;

kgd=new Array("ZONDAG","MAANDAG","DINSDAG","WOENSDAG","DONDERDAG","VRIJDAG","ZATERDAG");
kgm=new Array("JANUARI","FEBRUARI","MAART","APRIL","MEI","JUNI","JULI","AUGUSTUS","SEPTEMBER","OKTOBER","NOVEMBER","DECEMBER");
date=new Date();
day=date.getDate();
year=date.getYear();
if (year < 2000) year=year+1900; 
tmpdate=" "+kgd[date.getDay()]+" "+day+" "+kgm[date.getMonth()]+" "+year;
D=tmpdate.split("");
N='1 2 3 4 5 6 7 8 9 10 11 12';
N=N.split(" ");
F=N.length;
H='...';
H=H.split("");
M='....';
M=M.split("");
S='.....';
S=S.split("");
Dy=new Array();
Dx=new Array();
DY=new Array();
DX=new Array();
kgh1=40;
kgw1=40;
kgmy=0;
kgmx=0;
kgs=0;
kga1=360/F;
kga2=360/D.length;
kgh2=kgh1/5.5;
kgw2=kgw1/5.5;
kgy2=-7;
kgx2=-3;
tmr=null;
tmps=new Array();
tmpm=new Array(); 
tmph=new Array();
tmpf=new Array(); 
tmpd=new Array();
if (ie){ 
  document.write('<div id="anti_scrollbars" style="position:absolute;top:0px;left:0px"><div style="position:relative">'); 
}
algn=new Array();
for (i=0; i < D.length; i++) {
  algn[i]=(parseInt(D[i]) || D[i]==0)?10:9;
  document.write('<div id="_date'+i+'" class="css2" style="font-size:'+algn[i]+'px;color:'+dCol+'">'+D[i]+'</div>');
  tmpd[i]=document.getElementById("_date"+i).style;
}
for (i=0; i < F; i++) {
  document.write('<div id="_face'+i+'" class="css2" style="color:'+fCol+'">'+N[i]+'</div>');
  tmpf[i]=document.getElementById("_face"+i).style; 
}
for (i=0; i < H.length; i++) {
  document.write('<div id="_hours'+i+'" class="css1" style="color:'+hCol+'">'+H[i]+'</div>');
  tmph[i]=document.getElementById("_hours"+i).style;
}
for (i=0; i < M.length; i++) {
  document.write('<div id="_minutes'+i+'" class="css1" style="color:'+mCol+'">'+M[i]+'</div>');
  tmpm[i]=document.getElementById("_minutes"+i).style; 
}
for (i=0; i < S.length; i++) {
  document.write('<div id="_seconds'+i+'" class="css1" style="color:'+sCol+'">'+S[i]+'</div>');
  tmps[i]=document.getElementById("_seconds"+i).style;         
}
if (ie) { 
 document.write('</div></div>');
}
var vis=true;
function onoff() {
  if (vis==true){ 
    vis=false;
    document.con1.con2.value="Klok AAN";
  } else { 
    vis=true;
    document.con1.con2.value="Klok UIT";
    Delay();
  }
  kill();
}
function kill() {
  if (vis) { 
    document.onmousemove=(n7)?mouseNS:mouseIEO;
  } else document.onmousemove=null;
} 
if (n7) {
  window.captureEvents(Event.MOUSEMOVE);
  function mouseNS(e) {
    kgmy = e.pageY+kgy1-(window.pageYOffset);
    kgmx = e.pageX+kgx1;
    if (!vis) kill();
  }
  if (n7)document.onmousemove=mouseNS;
}
if (ie||o7) {
  function mouseIEO() {
    kgmy=(ie)?event.clientY+kgy1:event.clientY+kgy1-(window.pageYOffset);
    kgmx=event.clientX+kgx1;
    if (!vis) kill();
  }
  document.onmousemove=mouseIEO;
}
var sum=parseInt(D.length+F+H.length+M.length+S.length)+1;
for (i=0; i < sum; i++) {
  Dy[i]=0;
  Dx[i]=0;
  DY[i]=0;
  DX[i]=0;
}

function ClockAndAssign() {
  time=new Date();
  secs=time.getSeconds();
  sec=Math.PI*(secs-15)/30;
  mins=time.getMinutes();
  min=Math.PI*(mins-15)/30;
  hrs=time.getHours();
  hr=Math.PI*(hrs-3)/6+Math.PI*parseInt(time.getMinutes())/360;
  if (ie) {
    anti_scrollbars.style.top=window.document.body.scrollTop;
  }
  for (i=0; i < S.length; i++) {
    tmps[i].top=Dy[D.length+F+H.length+M.length+i]+kgy2+(i*kgh2)*Math.sin(sec)+kgs;
    tmps[i].left=Dx[D.length+F+H.length+M.length+i]+kgx2+(i*kgw2)*Math.cos(sec);
  }
  for (i=0; i < M.length; i++){
    tmpm[i].top=Dy[D.length+F+H.length+i]+kgy2+(i*kgh2)*Math.sin(min)+kgs;
    tmpm[i].left=Dx[D.length+F+H.length+i]+kgx2+(i*kgw2)*Math.cos(min);
  }
  for (i=0; i < H.length; i++){
    tmph[i].top=Dy[D.length+F+i]+kgy2+(i*kgh2)*Math.sin(hr)+kgs;
    tmph[i].left=Dx[D.length+F+i]+kgx2+(i*kgw2)*Math.cos(hr);
  }
  for (i=0; i < F; i++){
    tmpf[i].top=Dy[D.length+i]+kgh1*Math.sin(-1.0471+i*kga1*Math.PI/180)+kgs;
    tmpf[i].left=Dx[D.length+i]+kgw1*Math.cos(-1.0471+i*kga1*Math.PI/180);
  }
  for (i=0; i < D.length; i++){
    tmpd[i].top=Dy[i]+kgh1*1.5*Math.sin(-sec+i*kga2*Math.PI/180)+kgs;
    tmpd[i].left=Dx[i]+kgw1*1.5*Math.cos(-sec+i*kga2*Math.PI/180);
  }
  if (!vis)clearTimeout(tmr);
}
function Delay() {
  kgs=(ie)?0:window.pageYOffset;
  Dy[0]=(vis)?Math.round(DY[0]+=((kgmy)-DY[0])*kgv1):-100;
  Dx[0]=(vis)?Math.round(DX[0]+=((kgmx)-DX[0])*kgv1):-100;
  for (i=1; i < sum; i++) {
    Dy[i]=(vis)?Math.round(DY[i]+=(Dy[i-1]-DY[i])*kgv1):-100;
    Dx[i]=(vis)?Math.round(DX[i]+=(Dx[i-1]-DX[i])*kgv1):-100;
  }
  tmr=setTimeout('Delay()',kgv2);
  ClockAndAssign();
}
window.onload=Delay;
}
