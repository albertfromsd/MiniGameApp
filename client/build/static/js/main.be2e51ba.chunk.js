(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{104:function(e,t,a){e.exports={entirePage:"LoginReg_entirePage__P2JZ4",loginReg:"LoginReg_loginReg__10UXJ",hidden:"LoginReg_hidden__3RBYY",regform:"LoginReg_regform__3eaAa"}},112:function(e,t,a){e.exports=a(189)},123:function(e,t,a){},14:function(e,t,a){e.exports={flexColCen:"Views_flexColCen__lIGZz",flexRowCen:"Views_flexRowCen__3NO-q",contentRow:"Views_contentRow__-gBcm",onlyDiv:"Views_onlyDiv__2qbIE",textWhite:"Views_textWhite__1c2bX",textRed:"Views_textRed__2dXHn",btn:"Views_btn__Ceqzt",buttonMsg:"Views_buttonMsg__1it2P",focus:"Views_focus__2K86u",activeBtn:"Views_activeBtn__25a12",inactiveBtn:"Views_inactiveBtn__3zHXU",prettyBtn:"Views_prettyBtn__14e9Z",inputRow:"Views_inputRow__GxJmG",buttonRow:"Views_buttonRow__cTs-p"}},169:function(e,t){},185:function(e,t,a){e.exports=a.p+"static/media/game (1).87e5da07.gif"},186:function(e,t,a){e.exports=a.p+"static/media/game (2).50a2c1df.gif"},187:function(e,t,a){e.exports=a.p+"static/media/game (3).7682298c.gif"},188:function(e,t,a){},189:function(e,t,a){"use strict";a.r(t);var n=a(22),r=a(0),o=a.n(r),c=a(34),m=a.n(c),s=a(56),l=a(8),u=a(10),i=(a(123),a(53),a(4)),b=(a(104),a(47),a(23),a(41));var d=a(105),E=a.n(d),g=a(42);var N=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){var t=e.socket,a=e.roomName;e.dispatch;return o.a.createElement(o.a.Fragment,null,o.a.createElement(g.a,{variant:"outline-secondary",onClick:function(e){t.emit("disconnect"),Object(u.b)("/")}},"Go to Lobby"),o.a.createElement(g.a,{variant:"outline-secondary",onClick:function(e){t.emit("navigateParty",{roomName:a,gameName:""})}},"Go to Game Room"))})),h=a(38),f=a.n(h),_=a(51),p=a(66),v=a(39);var O=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){e.socket;var t=e.roomName;e.dispatch;return o.a.createElement(o.a.Fragment,null,o.a.createElement(_.a,{bg:"secondary",variant:"dark"},o.a.createElement(_.a.Brand,{href:"/".concat(t)},"MiniGame Party"),o.a.createElement(_.a.Toggle,{"aria-controls":"basic-navbar-nav"}),o.a.createElement(_.a.Collapse,{id:"basic-navbar-nav"},o.a.createElement(p.a,{className:"mr-auto"},o.a.createElement(p.a.Link,{href:"#"},"Home"),o.a.createElement(p.a.Link,{href:"#link"},"Link"),o.a.createElement(v.a,{title:"Dropdown",id:"basic-nav-dropdown"},o.a.createElement(v.a.Item,{onClick:function(e,a){console.log(a),Object(u.b)("/"+t+"/"+a)}},"Math Head"),o.a.createElement(v.a.Item,{href:"/".concat(t,"/typefaster")},"Type faster"),o.a.createElement(v.a.Item,{href:"/".concat(t,"/")},"Wise To Memorise"),o.a.createElement(v.a.Divider,null),o.a.createElement(v.a.Item,{href:"#action/3.4"},"Separated link"))),o.a.createElement(N,{roomName:t}))))})),j=a(110);var k=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName}}))((function(e){var t=e.socket,a=e.userName,n=e.roomName,c=(e.dispatch,Object(r.useState)([])),m=Object(i.a)(c,2),s=m[0],l=m[1],u=Object(r.useState)([]),b=Object(i.a)(u,2),d=b[0],E=b[1],g=Object(r.useState)([]),N=Object(i.a)(g,2),h=(N[0],N[1]);return Object(r.useEffect)((function(){t.emit("scoreboardUpdate",{userName:a,roomName:n}),t.on("refreshScoreboard",(function(e){h(e.scoreboardList),l(e.userList),E(e.scoreList)}))}),[t,n,a]),o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:[f.a.flexRowCen,f.a.textWhite].join(" ")},o.a.createElement(j.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},o.a.createElement("tbody",null,o.a.createElement("tr",{className:f.a.sbUser},s.map((function(e,t){return o.a.createElement("td",{key:t,className:f.a.cellWidth},e)}))),o.a.createElement("tr",{className:f.a.sbScore},d.map((function(e,t){return o.a.createElement("td",{key:t},e," ")})))))))})),S=a(5),y=a.n(S);var C=Object(l.b)((function(e){return{socket:e.socket,gameName:e.gameName,userName:e.userName,userScore:e.userScore}}))((function(e){var t,a=e.socket,n=e.dispatch,c=e.userName,m=e.roomName,s=Object(r.useState)(""),l=Object(i.a)(s,2),u=l[0],b=l[1];Object(r.useEffect)((function(){a.on("fullParty",(function(e){b(e)}))}),[a]);var d=function(e){t=e.target.value,n({type:"SETGAMENAME",gameName:t}),n({type:"SETROOMNAME",gameName:t}),a.emit("navigateParty",{roomName:m,gameName:t})};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:[y.a.flexColCen,y.a.textWhite,y.a.onlyDiv].join(" ")},o.a.createElement("div",{className:y.a.flexColCen},o.a.createElement("h2",{className:y.a.textWhite},"Welcome, ",c,"!"),o.a.createElement("h3",{className:y.a.textWhite},"You are in Room: ",m),o.a.createElement("br",null),o.a.createElement("h3",{className:y.a.textWhite},"Pick a game below:"),o.a.createElement("br",null),o.a.createElement("p",{style:{color:"red"}},u),o.a.createElement("div",{className:y.a.flexRowCen},o.a.createElement("div",{className:y.a.flexColCen},o.a.createElement("button",{onClick:d,value:"mathhead",className:y.a.gameBtn},"Math Head")," ",o.a.createElement("br",null),o.a.createElement("button",{onClick:d,value:"wisetomemorize",className:y.a.gameBtn},"Wise to Memorize")," ",o.a.createElement("br",null),o.a.createElement("button",{onClick:d,value:"dontcomeinsideme",className:y.a.gameBtn},"Don't Come Inside Me")," ",o.a.createElement("br",null)),o.a.createElement("div",{className:y.a.flexColCen},o.a.createElement("button",{onClick:d,value:"typefastermaster",className:y.a.gameBtn},"Type Faster Master")," ",o.a.createElement("br",null),o.a.createElement("button",{onClick:d,value:"littleboxes",className:y.a.gameBtn},"Little Boxes")," ",o.a.createElement("br",null),o.a.createElement("button",{onClick:d,value:"dropafatshot",className:y.a.gameBtn},"Drop a Fat Shot")," ",o.a.createElement("br",null))))))})),w=a(28),x=a.n(w);Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,roomName:e.roomName,userScore:e.userScore}}))((function(e){var t=e.socket,a=(e.userName,e.roomName,Object(r.useState)([])),n=Object(i.a)(a,2),c=n[0],m=n[1];return Object(r.useEffect)((function(){return t.on("refreshChatLog",(function(e){m(e)})),function(){t.disconnect(t.id)}}),[t]),o.a.createElement(o.a.Fragment,null,c.map((function(e,t){return o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{key:t},e.user,":"),o.a.createElement("p",null,e.message))})))}));Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,roomName:e.roomName,userScore:e.userScore}}))((function(e){var t=e.socket,a=(e.userName,e.roomName,Object(r.useState)({user:[t.id],message:""})),n=Object(i.a)(a,2),c=n[0],m=n[1];return o.a.createElement("form",{onSubmit:function(e){e.preventDefault(),console.log("msg.length: "+c.message.length),c.message.length>0&&(console.log("MsgState.message: "+c),t.emit("new message",c),m({user:[t.id],message:""}))},className:x.a.chatFormBox},o.a.createElement("input",{type:"text",className:x.a.inputMsg,name:"message",value:c.message,placeholder:"Enter message here",onChange:function(e){m({user:[t.id],message:e.target.value})}}),o.a.createElement("button",{type:"submit",className:x.a.buttonMsg},"Send"))}));var M=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,roomName:e.roomName,userScore:e.userScore}}))((function(e){var t=e.socket,a=e.userName,n=e.roomName,c=Object(r.useState)([]),m=Object(i.a)(c,2),s=m[0],l=m[1],u=Object(r.useState)(""),b=Object(i.a)(u,2),d=b[0],E=b[1];Object(r.useEffect)((function(){t.on("updateChatLog",(function(e){l(e)}))}),[t,n]);return o.a.createElement("div",{style:{height:"60%"}},o.a.createElement("div",{className:x.a.chatBox},s.map((function(e,t){return e.userName===a?o.a.createElement("div",{key:t,className:x.a.sentMessage},o.a.createElement("p",{style:{backgroundColor:"royalblue"}}," ",e.msg," ")):o.a.createElement("div",{key:t,className:x.a.recievedMessage},o.a.createElement("p",{style:{backgroundColor:"silver"}}," ",e.userName.toLocaleUpperCase()," : ",e.msg))}))),o.a.createElement("form",{onSubmit:function(e){e.preventDefault();new Date;t.emit("newMsg",{roomName:n,userName:a,userInput:d}),E("")}},o.a.createElement("input",{type:"text",placeholder:"Type message here",value:d,onChange:function(e){return E(e.target.value)}}),o.a.createElement("input",{type:"submit",value:"Send"})))}));var T=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){var t=e.socket,a=e.userName,n=e.roomName,c=e.userScore;(null==a||a.length<1)&&Object(u.b)("/");var m=Object(r.useState)("hidden"),s=Object(i.a)(m,2),l=s[0],b=s[1],d=Object(r.useState)("hidden"),E=Object(i.a)(d,2),g=E[0],N=E[1],h=Object(r.useState)("Easy"),f=Object(i.a)(h,2),_=f[0],p=f[1],v=Object(r.useState)(),O=Object(i.a)(v,2),j=O[0],k=O[1],S=Object(r.useState)(),C=Object(i.a)(S,2),w=C[0],x=C[1],M=Object(r.useState)(""),T=Object(i.a)(M,2),R=T[0],F=T[1],B=Object(r.useState)([]),G=Object(i.a)(B,2),W=G[0],P=G[1],D=Object(r.useState)("white"),I=Object(i.a)(D,2),L=I[0],A=I[1],H=Object(r.useState)(""),U=Object(i.a)(H,2),Y=U[0],V=U[1],q=Object(r.useState)(0),J=Object(i.a)(q,2),z=J[0],Z=J[1];Object(r.useEffect)((function(){t.emit("mathHeadEntered",{socketId:t.id,userName:a,roomName:n,totalTime:z,gameName:"mathhead"}),t.on("syncNewUser",(function(e){Object(u.b)("/"+n+"/"+e)})),t.on("sharedMathHeadTarget",(function(e){b("visible"),N("hidden"),k(e.question),x(e.answer),V(e.createdAt)})),t.on("answeredMathHeadTarget",(function(e){b("hidden"),N("visible"),P([e.userName+" beat you! ",e.question+" equals "+e.answer+"!","It took that player "+e.totalTimeTaken+" seconds to beat you!","You can get it next time!"]),A("orange")}))}),[t,n,a,"mathhead",c]);var K=function(e){p(e.target.value)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:y.a.entirePage},o.a.createElement("h2",{className:y.a.textWhite},"Math Head"),o.a.createElement("br",null),o.a.createElement("div",null,["Easy","Medium","Hard","Genius"].map((function(e,t){return o.a.createElement("button",{onClick:K,key:t,name:e,value:e,className:e==_?y.a.activeBtn:y.a.inactiveBtn},e)}))),o.a.createElement("br",null),o.a.createElement("button",{onClick:function(e){var a=(new Date).getTime();V(a),Z(0),P([]),b("visible");var n,r,o,c,m=["+","-","\xd7"],s=function(e,t){return Math.floor(Math.random()*(e-t)+t)};"Easy"==_&&(n=21,r=2,o=2,c=0),"Medium"==_&&(n=52,r=5,o=3,c=0),"Hard"==_&&(n=102,r=11,o=3,c=0),"Genius"==_?(n=1002,r=11,o=3,c=0):p("Easy"),function(e,n,r,o){var c,l=s(e,n),u=s(e,n),i=m[s(r,o)];"+"==i&&(c=l+u),"-"==i&&(c=l-u),"\xd7"==i&&(c=l*u),t.emit("mathHeadTargetGenerated",{question:l+" "+i+" "+u,answer:c,createdAt:a})}(n,r,o,c)},className:y.a.createBtn},"Create "+_+" Problem"),o.a.createElement("br",null),o.a.createElement("div",{className:"hidden"==l?y.a.hiddenForm:y.a.visibleForm},o.a.createElement("p",{className:y.a.textWhite},j),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),R==w){var r=(new Date).getTime(),o=Math.round(+r-+Y)/1e3,c=15-o;console.log("points: "+c),V(""),P(["\ud83c\udfc6\ud83c\udfc6 You got it! \ud83c\udfc6\ud83c\udfc6",j+" does equal "+R+"!","You scored "+c+" points!","It took you "+o+" seconds"]),A("green"),F(""),b("hidden"),t.emit("mathHeadTargetAnswered",{socketId:t.id,userName:a,roomName:n,question:j,answer:w,totalTimeTaken:o,points:c})}else P(["WRONG!",j+" does not equal "+R+"!"]),A("red");F(""),N("visible")}},o.a.createElement("input",{type:"text",placeholder:"Enter you answer here",value:R,onChange:function(e){return F(e.target.value)}}),o.a.createElement("input",{type:"submit",value:"Submit"}))),o.a.createElement("br",null),o.a.createElement("div",{className:"hidden"==g?y.a.hiddenForm:y.a.visibleForm},W.length>0&&W.map((function(e,t){return o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{style:{color:L},key:t},e),o.a.createElement("br",null))})))))}));var R=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){e.roomName;var t=Object(r.useState)(null),a=Object(i.a)(t,2),n=(a[0],a[1],Object(r.useState)("")),c=Object(i.a)(n,2);c[0],c[1];return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:y.a.entirePage},o.a.createElement("h2",{className:y.a.textWhite},"Wise to Memorize")))})),F=a(175);var B=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName}}))((function(e){var t=e.socket,a=e.userName,n=e.roomName;e.userScore;(null==a||a.length<1)&&Object(u.b)("/");var c=Object(r.useState)("hidden"),m=Object(i.a)(c,2),s=m[0],l=m[1],b=Object(r.useState)("hidden"),d=Object(i.a)(b,2),E=d[0],g=d[1],N=Object(r.useState)("Easy"),h=Object(i.a)(N,2),f=h[0],_=h[1],p=Object(r.useState)(""),v=Object(i.a)(p,2),O=v[0],j=v[1],k=Object(r.useState)(""),S=Object(i.a)(k,2),C=S[0],w=S[1],x=Object(r.useState)(""),M=Object(i.a)(x,2),T=M[0],R=(M[1],Object(r.useState)([])),B=Object(i.a)(R,2),G=B[0],W=B[1],P=Object(r.useState)("white"),D=Object(i.a)(P,2),I=D[0],L=D[1],A=Object(r.useState)(""),H=Object(i.a)(A,2),U=H[0],Y=H[1],V=Object(r.useState)(0),q=Object(i.a)(V,2),J=q[0],z=q[1];Object(r.useEffect)((function(){t.emit("typeFasterEntered",{socketId:t.id,userName:a,roomName:n,totalTime:J,gameName:"typefastermaster"}),t.on("syncNewUser",(function(e){Object(u.b)("/"+n+"/"+e)})),t.on("sharedTypeFasterTarget",(function(e){console.log("sharedTypeFasterTarget activated:"+e.target),l("visible"),g("hidden"),j(e.target),Y(e.createdAt)})),t.on("answeredTypeFasterTarget",(function(e){console.log("Data from typeFaster client: "+e.userName),l("hidden"),g("visible"),W([e.userName+" wins! ","It took that player "+e.totalTimeTaken+" seconds.","They scored "+e.points+" points!","You can get it next time!"]),L("orange")}))}),[t,n,a]);var Z=function(e){_(e.target.value)};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:y.a.entirePage},o.a.createElement("h3",{className:y.a.textWhite}," ",o.a.createElement("i",null," ",T," ",a),"  "),o.a.createElement("br",null),o.a.createElement("h2",{className:y.a.textWhite},"Type Faster Master"),o.a.createElement("br",null),o.a.createElement("div",null,["Easy","Medium","Hard","Genius"].map((function(e,t){return o.a.createElement("button",{onClick:Z,key:t,name:e,value:e,className:e==f?y.a.activeBtn:y.a.inactiveBtn},e)}))),o.a.createElement("br",null),o.a.createElement("button",{onClick:function(){var e,a=(new Date).getTime();Y(a),z(0),W([]),l("visible"),"Easy"===f&&(e=F(2)),"Medium"==f&&(e=F(4)),"Hard"==f&&(e=F(6)),"Genius"==f&&(e=Math.random().toString(36).substring(2,20)+F(4).join("")),console.log("stringState: "+O),console.log("targetString created: "+e),t.emit("typeFasterTargetGenerated",{target:e,createdAt:a})},className:y.a.createBtn},"Create "+f+" Problem"),o.a.createElement("br",null),o.a.createElement("div",{className:"hidden"==s?y.a.hiddenForm:y.a.visibleForm},o.a.createElement("p",{className:y.a.textWhite}," ",O," "),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("br",null),o.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),C==O.join("")){var r=new Date,o=r.getTime();r.getSeconds().toString();var c=Math.round(+o-+U)/1e3,m=20-(+o-+U)/1e3;Y(""),W(["\ud83c\udfc6\ud83c\udfc6 You got it! \ud83c\udfc6\ud83c\udfc6","You scored "+m+" points!","It took you "+c+" seconds"]),L("green"),w(""),l("hidden"),t.emit("typeFasterTargetAnswered",{socketId:t.id,userName:a,roomName:n,string:O,totalTimeTaken:c,points:m})}if("Genius"!=f&&C===O.join("")){var s=(new Date).getTime(),u=Math.round(+s-+U)/1e3,i=20-(+s-+U)/1e3;Y(""),W(["\ud83c\udfc6\ud83c\udfc6 You got it! Genius! \ud83c\udfc6\ud83c\udfc6","You scored "+i+" points!","It took you "+u+" seconds"]),L("green"),t.emit("typeFasterTargetAnswered",{socketId:t.id,userName:a,roomName:n,string:O,totalTimeTaken:u,points:i})}else W(["WRONG!","You had a typo in there!"]),L("red");w(""),g("visible")}},o.a.createElement("input",{type:"text",placeholder:"Type faster here",value:C,onChange:function(e){return w(e.target.value)},onPaste:function(e){return e.preventDefault()}}),o.a.createElement("button",{name:"submitButton",style:{backgroundColor:"pink"},type:"submit"},"Go!"))),o.a.createElement("br",null),o.a.createElement("div",{className:"hidden"==E?y.a.hiddenForm:y.a.visibleForm},G.length>0&&G.map((function(e,t){return o.a.createElement(o.a.Fragment,null,o.a.createElement("p",{style:{color:I},key:t},e),o.a.createElement("br",null))})))))}));var G=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){e.roomName;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:y.a.entirePage},o.a.createElement("h2",{className:y.a.textWhite}," Little Boxes ")))}));var W=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){e.roomName;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:y.a.entirePage},o.a.createElement("h2",{className:y.a.textWhite},"Don't Come Inside Me!")))}));var P=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){e.roomName;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:y.a.entirePage},o.a.createElement("h2",{className:y.a.textWhite}," Drop a Fat Shot ")))})),D=a(14),I=a.n(D),L=a(75),A=a.n(L);var H=Object(l.b)((function(e){return{socket:e.socket,userName:e.userName}}))((function(e){var t=e.dispatch,a=e.userName,n=e.roomName;(null==a||a.length<1)&&Object(u.b)("/");var c=Object(r.useState)((function(){return E()("/api")})),m=Object(i.a)(c,1)[0],s=Object(r.useState)([]),l=Object(i.a)(s,2),b=(l[0],l[1]);return t({type:"SETSOCKET",socket:m}),Object(r.useEffect)((function(){return m.emit("enteredGameRoom",{socketId:m.id,userName:a,roomName:n,gameName:""}),m.on("syncNewUser",(function(e){Object(u.b)("/"+n+"/"+e)})),m.emit("scoreboardUpdate",{userName:a,roomName:n}),m.on("refreshScoreboard",(function(e){b(e.scoreboardList)})),m.on("partyNavigator",(function(e){Object(u.b)("/"+e.roomName+"/"+e.gameName)})),function(){m.disconnect()}}),[m,a,n]),o.a.createElement(o.a.Fragment,null,o.a.createElement(A.a,{top:!0,big:!0},o.a.createElement(O,{socket:m,roomName:n}),o.a.createElement(k,{socket:m,roomName:n,userName:a}),o.a.createElement("div",{className:I.a.contentRow},o.a.createElement("div",{className:y.a.gameComponent},o.a.createElement(u.a,null,o.a.createElement(C,{path:"/",socket:m}),o.a.createElement(T,{path:"/mathhead",socket:m,roomName:n}),o.a.createElement(B,{path:"/typefastermaster",socket:m,roomName:n}),o.a.createElement(R,{path:"/wisetomemorize",socket:m,roomName:n}),o.a.createElement(G,{path:"/littleboxes",socket:m,roomName:n}),o.a.createElement(W,{path:"/dontcomeinsideme",socket:m,roomName:n}),o.a.createElement(P,{path:"/dropafatshot",socket:m,roomName:n}))),o.a.createElement(o.a.Fragment,null,o.a.createElement(M,{socket:m})))))})),U=a(50);var Y=Object(l.b)((function(e){return{userName:e.userName,userScore:e.userScore}}))((function(e){var t=e.dispatch,c=Object(r.useState)({uName:"",rName:"",rPassword:""}),m=Object(i.a)(c,2),s=m[0],l=m[1],d=Object(r.useState)(""),E=Object(i.a)(d,2),g=E[0],N=E[1],h=function(e){l(Object(n.a)({},s,Object(b.a)({},e.target.name,e.target.value)))};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:[I.a.textWhite,I.a.onlyDiv].join(" ")},o.a.createElement("br",null),o.a.createElement("div",{className:I.a.flexColCen},o.a.createElement(U.a,null,o.a.createElement(U.a.Item,null,o.a.createElement("img",{height:"420px",src:a(185)})),o.a.createElement(U.a.Item,null,o.a.createElement("img",{height:"420px",src:a(186)})),o.a.createElement(U.a.Item,null,o.a.createElement("img",{height:"420px",src:a(187)}))),o.a.createElement("br",null),o.a.createElement("br",null)),o.a.createElement("div",{className:[I.a.textWhite,I.a.onlyDiv,I.a.flexColCen].join(" ")},o.a.createElement("h1",null,"Join the Party, Join the Fun!"),o.a.createElement("br",null),o.a.createElement("p",{className:I.a.textRed},"Please enter your desired nick name and room you wish to enter or create"),o.a.createElement("br",null)," ",o.a.createElement("br",null),o.a.createElement("form",{className:I.a.flexColCen,onSubmit:function(e){e.preventDefault(),s.uName.length>0&&s.rName.length>0?(t({type:"SETUSERNAME",userName:s.uName}),t({type:"SETROOMNAME",roomName:s.rName}),Object(u.b)("/"+s.rName)):N("Please enter both a user and room name")}},o.a.createElement("p",{style:{color:"red"}},g),o.a.createElement("div",{className:I.a.inputRow},o.a.createElement("label",null,"Nick Name: "),o.a.createElement("input",{type:"text",name:"uName",value:s.uName,onChange:h})),o.a.createElement("br",null),o.a.createElement("div",{className:I.a.inputRow},o.a.createElement("label",null,"Room Name:"),o.a.createElement("input",{type:"text",name:"rName",value:s.rName,onChange:h})),o.a.createElement("br",null),o.a.createElement("div",{className:I.a.inputRow},o.a.createElement("label",null,"Password:"),o.a.createElement("input",{type:"password",name:"rPassword",value:s.rPassword,onChange:h})),o.a.createElement("br",null),o.a.createElement("div",{className:I.a.buttonRow},o.a.createElement("button",{type:"submit",name:"roomButton",value:"enterRoom",className:I.a.prettyBtn},"Enter Room"),o.a.createElement("button",{type:"submit",name:"roomButton",value:"createRoom",className:I.a.prettyBtn},"Create Room"))))))}));var V=Object(l.b)((function(e){return{userName:e.userName,userScore:e.userScore}}))((function(e){return e.dispatch,o.a.createElement(o.a.Fragment,null,o.a.createElement(u.a,null,o.a.createElement(Y,{path:"/"}),o.a.createElement(H,{path:"/:roomName/*"})))}));a(188),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var q=Object(s.b)((function(e,t){switch(t.type){case"SETSOCKET":return Object(n.a)({},e,{socket:t.socket});case"SETUSERNAME":return Object(n.a)({},e,{userName:t.userName});case"SETROOMNAME":return Object(n.a)({},e,{roomName:t.roomName});case"SETGAMENAME":return Object(n.a)({},e,{gameName:t.gameName});case"CHANGETOTALSCORE":return Object(n.a)({},e,{userScore:t.userScore});case"LOGOUT":return Object(n.a)({},e,{socket:null,userName:null,userScore:null});default:return e}}),{socket:null,userName:null,userScore:null,roomName:null,gameName:null});m.a.render(o.a.createElement(l.a,{store:q},o.a.createElement(V,null)),document.getElementById("minigameapp")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},23:function(e,t,a){e.exports={loginForm:"Form_loginForm__1_hPT",formRow:"Form_formRow__2fNxM",rowCenter:"Form_rowCenter__3mY1B"}},28:function(e,t,a){e.exports={chatBox:"Chat_chatBox__34E6S",chatLogMsgs:"Chat_chatLogMsgs__3rYH9",chatFormBox:"Chat_chatFormBox__1U2XZ",inputMsg:"Chat_inputMsg__2v_c0",msgLog:"Chat_msgLog__2BQ30",message:"Chat_message__3n5kJ",recievedMessage:"Chat_recievedMessage__PJEtb",sentMessage:"Chat_sentMessage__1Imme",container:"Chat_container__2QJSA",buttonMsg:"Chat_buttonMsg__1jyZc",focus:"Chat_focus__1vT98",buttonReset:"Chat_buttonReset__IldEq",user:"Chat_user__2KxPm"}},38:function(e,t,a){e.exports={flexRow:"GlobalComponents_flexRow__22PMv",flexRowCen:"GlobalComponents_flexRowCen__3ykpQ",flexColCen:"GlobalComponents_flexColCen__5o5C2",textWhite:"GlobalComponents_textWhite__T8vzD",sbUser:"GlobalComponents_sbUser__2ZlSN",sbScore:"GlobalComponents_sbScore__2OL0S",cellWidth:"GlobalComponents_cellWidth__1H58r",navButton:"GlobalComponents_navButton__25okk"}},5:function(e,t,a){e.exports={entirePage:"Games_entirePage__1k91F",flexColCen:"Games_flexColCen__2ZTuC",flexRowCen:"Games_flexRowCen__1NIEg",onlyDiv:"Games_onlyDiv__2LRmW",gameComponent:"Games_gameComponent__3YsQw",textRed:"Games_textRed__3A1qH",textWhite:"Games_textWhite__JhkKf",gameBtn:"Games_gameBtn__2hB4U",buttonMsg:"Games_buttonMsg__3Yh7S",focus:"Games_focus__215gg",activeBtn:"Games_activeBtn__2khwC",inactiveBtn:"Games_inactiveBtn__5g2Jj",createBtn:"Games_createBtn__Apku9",hiddenForm:"Games_hiddenForm__1_zOw",visibleForm:"Games_visibleForm__1Kx5e"}}},[[112,1,2]]]);
//# sourceMappingURL=main.be2e51ba.chunk.js.map