(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{103:function(e,t,a){},12:function(e,t,a){e.exports={flexRow:"GlobalComponents_flexRow__2JSrw",flexRowCen:"GlobalComponents_flexRowCen__22HLQ",flexColCen:"GlobalComponents_flexColCen__32gkU",textWhite:"GlobalComponents_textWhite__7iibq",sbUser:"GlobalComponents_sbUser__LGtwO",sbScore:"GlobalComponents_sbScore__6Qhxn",cellWidth:"GlobalComponents_cellWidth__zGtay",navButton:"GlobalComponents_navButton__2jhmB"}},14:function(e,t,a){e.exports={loginForm:"Form_loginForm__3jRnC",formRow:"Form_formRow__3Supy",rowCenter:"Form_rowCenter__1Asse"}},150:function(e,t){},165:function(e,t,a){e.exports=a.p+"static/media/game (1).87e5da07.gif"},166:function(e,t,a){e.exports=a.p+"static/media/game (2).50a2c1df.gif"},167:function(e,t,a){e.exports=a.p+"static/media/game (3).7682298c.gif"},168:function(e,t,a){},169:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(26),c=a.n(o),m=a(5),s=a(6),l=(a(103),a(37),a(1)),i=(a(84),a(43),a(14),a(27)),u=a(13);var d=a(85),b=a.n(d),E=a(44);var h=Object(m.b)((function(e){return{socket:e.socket,userName:e.userName}}))((function(e){var t=e.socket,a=e.roomName,n=(e.userName,e.dispatch);return r.a.createElement(r.a.Fragment,null,r.a.createElement(E.a,{variant:"outline-secondary",onClick:function(e){t.emit("navigateParty",{roomName:a,gameName:""})}},"Return to Game Room"),r.a.createElement(E.a,{variant:"outline-secondary",onClick:function(e){t.disconnect(),n({type:"LOGOUT"}),Object(s.b)("/")}},"Logout"))})),g=a(12),N=a.n(g),f=a(35),v=a(57);var p=Object(m.b)((function(e){return{userName:e.userName,admin:e.admin}}))((function(e){var t=e.socket,a=(e.dispatch,e.roomName),o=e.userName;e.admin;Object(n.useEffect)((function(){(void 0==o||o.length<1||void 0==a||a.length<1)&&Object(s.b)("/")}),[t,o,a]);return r.a.createElement(r.a.Fragment,null,r.a.createElement(f.a,{bg:"secondary",variant:"dark"},r.a.createElement(f.a.Brand,{href:"/".concat(a)},"MiniGame Party"),r.a.createElement(f.a.Toggle,{"aria-controls":"basic-navbar-nav"}),r.a.createElement(f.a.Collapse,{id:"basic-navbar-nav"},r.a.createElement(v.a,{className:"mr-auto"},r.a.createElement(v.a.Link,{href:"#"},"Home")),r.a.createElement("div",null,r.a.createElement("p",{className:N.a.textWhite},"Logged in as: ",r.a.createElement("i",null," ",o," "))),r.a.createElement(h,{className:N.a.flexColCen,roomName:a}))))})),_=a(88);var O=Object(m.b)((function(e){return{userName:e.userName}}))((function(e){var t=e.socket,a=e.userName,o=e.roomName,c=e.dispatch,m=Object(n.useState)([]),i=Object(l.a)(m,2),u=i[0],d=i[1],b=Object(n.useState)([]),E=Object(l.a)(b,2),h=E[0],g=E[1];return Object(n.useEffect)((function(){(null===a||a.length<1||void 0===a||null===o||o.length<1||void 0===o)&&Object(s.b)("/"),t.on("refreshScoreboard",(function(e){d(e.userList),g(e.scoreList),c({type:"SETSCOREBOARD",scoreboard:e.scoreboardList,userList:e.userList,scoreList:e.scoreList})}))}),[t,o,a]),r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:[N.a.flexRowCen,N.a.textWhite].join(" ")},r.a.createElement(_.a,{striped:!0,bordered:!0,hover:!0,variant:"dark"},r.a.createElement("tbody",null,r.a.createElement("tr",{className:N.a.sbUser},u.map((function(e,t){return r.a.createElement("td",{key:t,className:N.a.cellWidth},e)}))),r.a.createElement("tr",{className:N.a.sbScore},h.map((function(e,t){return r.a.createElement("td",{key:t},e," ")})))))))})),j=a(3),y=a.n(j);var w=Object(m.b)((function(e){return{userName:e.userName,admin:e.admin}}))((function(e){var t,a=e.socket,o=e.dispatch,c=e.userName,m=(e.admin,e.roomName),i=Object(n.useState)(""),u=Object(l.a)(i,2),d=u[0],b=u[1];Object(n.useEffect)((function(){a.on("fullParty",(function(e){b(e)}))}),[a]);var E=function(e){(void 0==c||c.length<1||void 0==m||m.length<1)&&Object(s.b)("/"),t=e.target.value,o({type:"SETGAMENAME",gameName:t}),o({type:"SETROOMNAME",roomName:m}),a.emit("navigateParty",{roomName:m,userName:c,gameName:t})};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:[y.a.flexColCen,y.a.textWhite,y.a.onlyDiv].join(" ")},r.a.createElement("div",{className:y.a.flexColCen},r.a.createElement("h2",{className:y.a.textWhite},"Welcome, ",c,"!"),r.a.createElement("h3",{className:y.a.textWhite},"You are in Room: ",m),r.a.createElement("br",null),r.a.createElement("h3",{className:y.a.textWhite},"Pick a game below:"),r.a.createElement("br",null),r.a.createElement("p",{style:{color:"red"}},d),r.a.createElement("div",{className:y.a.flexRowCen},r.a.createElement("div",{className:y.a.flexColCen},r.a.createElement("button",{onClick:E,value:"mathhead",className:y.a.gameBtn},"Math Head")," "),r.a.createElement("div",{className:y.a.flexColCen},r.a.createElement("button",{onClick:E,value:"typefastermaster",className:y.a.gameBtn},"Type Faster Master")," ")))))})),C=a(31),S=a.n(C);var k=Object(m.b)((function(e){return{userName:e.userName}}))((function(e){var t=e.socket,a=e.userName,o=e.roomName,c=Object(n.useState)([]),m=Object(l.a)(c,2),i=m[0],u=m[1],d=Object(n.useState)(""),b=Object(l.a)(d,2),E=b[0],h=b[1],g=Object(n.useState)(!1),N=Object(l.a)(g,2);N[0],N[1];Object(n.useEffect)((function(){(null===a||a.length<1||void 0===a||null===o||o.length<1||void 0===o)&&Object(s.b)("/"),t.on("updateChatLog",(function(e){u(e)}))}),[t,o,a]);return r.a.createElement("div",{style:{height:"60%"}},r.a.createElement("div",{className:S.a.chatBox},i.map((function(e,t){return e.userName===a?r.a.createElement("div",{key:t,className:S.a.sentMessage},r.a.createElement("p",{style:{backgroundColor:"royalblue"}}," ",e.msg," ")):r.a.createElement("div",{key:t,className:S.a.recievedMessage},r.a.createElement("p",{style:{backgroundColor:"silver"}}," ",e.userName.toLocaleUpperCase()," : ",e.msg))}))),r.a.createElement("form",{onSubmit:function(e){e.preventDefault();var n=new Date;t.emit("newMsg",{roomName:o,userName:a,userInput:E,timestamp:n}),h("")}},r.a.createElement("input",{type:"text",placeholder:"Type message here",value:E,onChange:function(e){return h(e.target.value)}}),r.a.createElement("input",{type:"submit",value:"Send"})))}));var x=Object(m.b)((function(e){return{socket:e.socket,roomName:e.roomName,gameName:e.gameName,userName:e.userName}}))((function(e){var t=e.socket,a=Object(n.useState)(0),o=Object(l.a)(a,2),c=o[0],m=o[1],s=Object(n.useState)(new Date),i=Object(l.a)(s,2),u=i[0],d=(i[1],function(){var e=c-(+new Date-+u),t={};return e>0&&(t={seconds:Math.floor(e/1e3%60),milliseconds:e%1e3}),t}),b=Object(n.useState)(d()),E=Object(l.a)(b,2),h=E[0],g=E[1];Object(n.useEffect)((function(){setTimeout((function(){g(d())}),1)})),Object(n.useEffect)((function(){t.on("startTimer",(function(e){m(e.timeAllowed),console.log("incoming data.timeAllowed: "+e.timeAllowed)}))}),[t]);var f=[];return Object.keys(h).forEach((function(e){h[e]||(h[e]=0),f.push(r.a.createElement("span",{key:e},h[e]," ",e," "))})),r.a.createElement("div",{className:N.a.textWhite},f.length?f:r.a.createElement("span",null,"Time's up!"))}));var T=Object(m.b)((function(e){return{userName:e.userName}}))((function(e){var t=e.socket,a=e.userName,o=e.roomName,c=Object(n.useState)(!1),m=Object(l.a)(c,2),i=(m[0],m[1],Object(n.useState)("hidden")),u=Object(l.a)(i,2),d=u[0],b=u[1],E=Object(n.useState)("hidden"),h=Object(l.a)(E,2),g=h[0],N=h[1],f=Object(n.useState)("Medium"),v=Object(l.a)(f,2),p=v[0],_=v[1],O=Object(n.useState)(),j=Object(l.a)(O,2),w=j[0],C=j[1],S=Object(n.useState)(),k=Object(l.a)(S,2),T=k[0],R=k[1],M=Object(n.useState)(""),G=Object(l.a)(M,2),F=G[0],A=G[1],B=Object(n.useState)([]),W=Object(l.a)(B,2),D=W[0],L=W[1],P=Object(n.useState)("white"),U=Object(l.a)(P,2),I=U[0],Y=U[1],V=Object(n.useState)(""),H=Object(l.a)(V,2),q=H[0],z=H[1],J=Object(n.useState)(0),K=Object(l.a)(J,2),Q=(K[0],K[1]),X=Object(n.useState)(0),Z=Object(l.a)(X,2),$=(Z[0],Z[1]);Object(n.useEffect)((function(){a&&o||Object(s.b)("/"),t.emit("mathHeadEntered",{userName:a,roomName:o,gameName:"mathhead"}),t.on("syncNewUser",(function(e){dispatchEvent({}),Object(s.b)("/"+o+"/"+e)})),t.on("sharedMathHeadTarget",(function(e){b("hidden"),b("visible"),N("hidden"),C(e.question),R(e.answer),z(e.createdAt),$(e.timeAllowed)})),t.on("answeredMathHeadTarget",(function(e){b("hidden"),N("visible"),L([e.userName+" beat you! ",e.question+" equals "+e.answer+"!","They beat you in "+e.totalTimeTaken+" seconds","They scored "+e.points+" points!","You can get it next time!"]),Y("orange")}))}),[t,o,a,"mathhead"]);var ee=function(e){_(e.target.value)};return r.a.createElement("div",{className:y.a.entirePage},r.a.createElement("h3",{className:y.a.textWhite}," ",r.a.createElement("i",null," ",a," "),"  "),r.a.createElement("br",null),r.a.createElement("h2",{className:y.a.textWhite},"Math Head"),r.a.createElement("br",null),r.a.createElement("div",null,["Easy","Medium","Hard","Genius"].map((function(e,t){return r.a.createElement("button",{onClick:ee,key:t,name:e,value:e,className:e===p?y.a.activeBtn:y.a.inactiveBtn},e)}))),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(e){var a=(new Date).getTime();z(a),Q(0),L([]),b("visible");var n,r,o,c,m=["+","-","\xd7"],s=function(e,t){return Math.floor(Math.random()*(e-t)+t)};"Easy"===p&&(n=21,r=2,o=2,c=0),"Medium"===p&&(n=52,r=5,o=3,c=0),"Hard"===p&&(n=102,r=11,o=3,c=0),"Genius"===p?(n=1002,r=11,o=3,c=0):_("Easy"),function(e,n,r,o){var c,l=s(e,n),i=s(e,n),u=m[s(r,o)];"+"===u&&(c=l+i),"-"===u&&(c=l-i),"\xd7"===u&&(c=l*i),t.emit("mathHeadTargetGenerated",{question:l+" "+u+" "+i,answer:c,createdAt:a,timeAllowed:2e4})}(n,r,o,c)},className:y.a.createBtn},"Create "+p+" Problem"),r.a.createElement("br",null),r.a.createElement("div",{className:"hidden"===d?y.a.hiddenForm:y.a.visibleForm},"hidden"===d?r.a.createElement("p",null," Countdown timer not yet activated "):r.a.createElement(x,null),r.a.createElement("p",{className:y.a.textWhite},w),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),F==T){var n=(new Date).getTime(),r=Math.round(+n-+q)/1e3,c=20-r;console.log("points: "+c),z(""),L(["\ud83c\udfc6\ud83c\udfc6 You got it! \ud83c\udfc6\ud83c\udfc6",w+" does equal "+F+"!","You scored "+c+" points!","It took you "+r+" seconds"]),Y("green"),A(""),b("hidden"),t.emit("mathHeadTargetAnswered",{socketId:t.id,userName:a,roomName:o,question:w,answer:T,totalTimeTaken:r,points:c.toFixed(3)})}else L(["WRONG!",w+" does not equal "+F+"!"]),Y("red");A(""),N("visible")}},r.a.createElement("input",{type:"text",placeholder:"Enter you answer here",value:F,onChange:function(e){return A(e.target.value)}}),r.a.createElement("input",{type:"submit",value:"Submit"}))),r.a.createElement("br",null),r.a.createElement("div",{className:"hidden"===g?y.a.hiddenForm:y.a.visibleForm},D.length>0&&D.map((function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{style:{color:I},key:t},e),r.a.createElement("br",null))}))))}));var R=Object(m.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){e.roomName;var t=Object(n.useState)(null),a=Object(l.a)(t,2),o=(a[0],a[1],Object(n.useState)("")),c=Object(l.a)(o,2);c[0],c[1];return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.a.entirePage},r.a.createElement("h2",{className:y.a.textWhite},"Wise to Memorize")))})),M=a(155);var G=Object(m.b)((function(e){return{userName:e.userName}}))((function(e){var t=e.socket,a=e.userName,o=e.roomName,c=Object(n.useState)(!1),m=Object(l.a)(c,2),i=(m[0],m[1],Object(n.useState)("hidden")),u=Object(l.a)(i,2),d=u[0],b=u[1],E=Object(n.useState)("hidden"),h=Object(l.a)(E,2),g=h[0],N=h[1],f=Object(n.useState)("Easy"),v=Object(l.a)(f,2),p=v[0],_=v[1],O=Object(n.useState)(""),j=Object(l.a)(O,2),w=j[0],C=j[1],S=Object(n.useState)(""),k=Object(l.a)(S,2),x=k[0],T=k[1],R=Object(n.useState)([]),G=Object(l.a)(R,2),F=G[0],A=G[1],B=Object(n.useState)("white"),W=Object(l.a)(B,2),D=W[0],L=W[1],P=Object(n.useState)(""),U=Object(l.a)(P,2),I=U[0],Y=U[1],V=Object(n.useState)(0),H=Object(l.a)(V,2),q=(H[0],H[1]);Object(n.useEffect)((function(){a&&o||Object(s.b)("/"),t.emit("typeFasterEntered",{userName:a,roomName:o,gameName:"typefastermaster"}),t.on("syncNewUser",(function(e){Object(s.b)("/"+o+"/"+e)})),t.on("sharedTypeFasterTarget",(function(e){console.log("sharedTypeFasterTarget activated:"+e.target),b("hidden"),b("visible"),N("hidden"),C(e.target),Y(e.createdAt)})),t.on("answeredTypeFasterTarget",(function(e){console.log("Data from typeFaster client: "+e.userName),b("hidden"),N("visible"),A([e.userName+" beat you! ","They beat you in"+e.totalTimeTaken+" seconds","They scored "+e.points+" points!","You can get it next time!"]),L("orange")}))}),[t,o,a,"typefastermaster"]);var z=function(e){_(e.target.value)};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.a.entirePage},r.a.createElement("h3",{className:y.a.textWhite}," ",r.a.createElement("i",null," ",a," "),"  "),r.a.createElement("br",null),r.a.createElement("h2",{className:y.a.textWhite},"Type Faster Master"),r.a.createElement("br",null),r.a.createElement("div",null,["Easy","Medium","Hard","Genius"].map((function(e,t){return r.a.createElement("button",{onClick:z,key:t,name:e,value:e,className:e==p?y.a.activeBtn:y.a.inactiveBtn},e)}))),r.a.createElement("br",null),r.a.createElement("button",{onClick:function(){var e,a=(new Date).getTime();Y(a),q(0),A([]),b("visible"),"Easy"===p&&(e=M(2)),"Medium"==p&&(e=M(4)),"Hard"==p&&(e=M(6)),"Genius"==p&&(e=Math.random().toString(36).substring(2,20)+M(4).join(""),console.log("Genius string: "+e)),t.emit("typeFasterTargetGenerated",{target:e,createdAt:a})},className:y.a.createBtn},"Create "+p+" Problem"),r.a.createElement("br",null),r.a.createElement("div",{className:"hidden"==d?y.a.hiddenForm:y.a.visibleForm},r.a.createElement("p",{className:y.a.textWhite}," ",w," "),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("br",null),r.a.createElement("form",{onSubmit:function(e){if(e.preventDefault(),"Genius"==p&&x==w.join("")){var n=new Date,r=n.getTime();n.getSeconds().toString();var c=Math.round(+r-+I)/1e3,m=40-(+r-+I)/1e3;Y(""),A(["\ud83c\udfc6\ud83c\udfc6 You got it! Genius! \ud83c\udfc6\ud83c\udfc6","You scored "+m+" points!","It took you "+c+" seconds"]),L("green"),T(""),b("hidden"),t.emit("typeFasterTargetAnswered",{socketId:t.id,userName:a,roomName:o,string:w,totalTimeTaken:c,points:m.toFixed(3)})}if("Genius"!=p&&x==w.join("")){var s=(new Date).getTime(),l=Math.round(+s-+I)/1e3,i=20-(+s-+I)/1e3;Y(""),A(["\ud83c\udfc6\ud83c\udfc6 You got it! \ud83c\udfc6\ud83c\udfc6","You scored "+i+" points!","It took you "+l+" seconds"]),L("green"),T(""),b("hidden"),t.emit("typeFasterTargetAnswered",{socketId:t.id,userName:a,roomName:o,string:w,totalTimeTaken:l,points:i})}else A(["WRONG!","You had a typo in there!"]),L("red");T(""),N("visible")}},r.a.createElement("input",{type:"text",placeholder:"Type faster here",value:x,onChange:function(e){return T(e.target.value)},onPaste:function(e){return e.preventDefault()}}),r.a.createElement("button",{name:"submitButton",style:{backgroundColor:"pink"},type:"submit"},"Go!"))),r.a.createElement("br",null),r.a.createElement("div",{className:"hidden"==g?y.a.hiddenForm:y.a.visibleForm},F.length>0&&F.map((function(e,t){return r.a.createElement(r.a.Fragment,null,r.a.createElement("p",{style:{color:D},key:t},e),r.a.createElement("br",null))})))))}));var F=Object(m.b)((function(e){return{socket:e.socket,userName:e.userName,userScore:e.userScore}}))((function(e){e.roomName;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.a.entirePage},r.a.createElement("h2",{className:y.a.textWhite}," Little Boxes ")))}));var A=Object(m.b)((function(e){return{userName:e.userName}}))((function(e){e.roomName;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.a.entirePage},r.a.createElement("h2",{className:y.a.textWhite},"Don't Come Inside Me!")))}));var B=Object(m.b)((function(e){return{userName:e.userName}}))((function(e){e.roomName;return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:y.a.entirePage},r.a.createElement("h2",{className:y.a.textWhite}," Drop a Fat Shot ")))})),W=a(9),D=a.n(W),L=a(54),P=a.n(L);var U=Object(m.b)((function(e){return{userName:e.userName,admin:e.admin}}))((function(e){var t=e.dispatch,a=e.userName,o=e.roomName,c=Object(n.useState)((function(){return b()("http://localhost:8000")})),m=Object(l.a)(c,1)[0],i=Object(n.useState)(!1),u=Object(l.a)(i,2);u[0],u[1];return Object(n.useEffect)((function(){m.emit("enteredGameRoom",{userName:a,roomName:o,gameName:" "}),t({type:"SETSOCKET",socket:m}),t({type:"SETUSERNAME",userName:a}),t({type:"SETROOMNAME",roomName:o}),t({type:"SETGAMENAME",gameName:" "})}),[]),Object(n.useEffect)((function(){return(null===a||a.length<1||void 0===a||null===o||o.length<1||void 0===o)&&Object(s.b)("/"),m.on("setAdmin",(function(e){console.log(e),t({type:"SETADMIN",admin:e})})),m.emit("chatLogUpdate",{userName:a,roomName:o}),m.emit("scoreboardUpdate",{userName:a,roomName:o}),m.on("syncNewUser",(function(e){t({type:"SETADMIN",admin:e.name}),Object(s.b)("/"+o+"/"+e.currentGame)})),m.on("partyNavigator",(function(e){Object(s.b)("/"+e.roomName+"/"+e.gameName)})),function(){m.disconnect()}}),[m,a,o]),r.a.createElement(r.a.Fragment,null,r.a.createElement(P.a,{top:!0,big:!0},r.a.createElement(p,{socket:m,roomName:o}),r.a.createElement(O,{socket:m,roomName:o}),r.a.createElement("div",{className:D.a.contentRow},r.a.createElement("div",{className:y.a.gameComponent},r.a.createElement(s.a,null,r.a.createElement(w,{path:"/",socket:m,roomName:o}),r.a.createElement(T,{path:"/mathhead",socket:m,roomName:o}),r.a.createElement(G,{path:"/typefastermaster",socket:m,roomName:o}),r.a.createElement(R,{path:"/wisetomemorize",socket:m,roomName:o}),r.a.createElement(F,{path:"/littleboxes",socket:m,roomName:o}),r.a.createElement(A,{path:"/dontcomeinsideme",socket:m,roomName:o}),r.a.createElement(B,{path:"/dropafatshot",socket:m,roomName:o}))),r.a.createElement("div",{className:S.a.chatComponent},r.a.createElement(k,{socket:m,roomName:o})))))})),I=a(90);Object(m.b)((function(e){return{socket:e.socket,roomName:e.roomName,gameName:e.gameName,userName:e.userName}}))((function(e){e.socket,e.roomName,e.gameName,e.userName,e.startTime;var t=Object(n.useState)([]),a=Object(l.a)(t,2),o=a[0],c=a[1],m=0,s=o.length%2==0?"Start":"Stop";return r.a.createElement("div",{className:"elapsedTime"},r.a.createElement("p",{style:{color:"white"}},function(){for(var e=0;e<o.length;e+=2){var t=o[e],a=o[e+1]||new Date;m+=a-t}return m/1e3+" seconds"}()),r.a.createElement("button",{onClick:function(e){c([].concat(Object(I.a)(o),[new Date]))},style:{color:"white"}},s))}));var Y=a(34);var V=Object(m.b)((function(e){return{userName:e.userName}}))((function(e){var t=e.dispatch,o=Object(n.useState)({uName:"",rName:"",rPassword:""}),c=Object(l.a)(o,2),m=c[0],d=c[1],b=Object(n.useState)(""),E=Object(l.a)(b,2),h=E[0],g=E[1],N=function(e){d(Object(u.a)({},m,Object(i.a)({},e.target.name,e.target.value)))};return r.a.createElement(r.a.Fragment,null,r.a.createElement("div",{className:[D.a.textWhite,D.a.onlyDiv].join(" ")},r.a.createElement("br",null),r.a.createElement("div",{className:D.a.flexColCen},r.a.createElement(Y.a,null,r.a.createElement(Y.a.Item,null,r.a.createElement("img",{height:"420px",alt:"minigameparty.gif",src:a(165)})),r.a.createElement(Y.a.Item,null,r.a.createElement("img",{height:"420px",alt:"mathhead",src:a(166)})),r.a.createElement(Y.a.Item,null,r.a.createElement("img",{height:"420px",alt:"typefastermaster",src:a(167)}))),r.a.createElement("br",null),r.a.createElement("br",null)),r.a.createElement("div",{className:[D.a.textWhite,D.a.onlyDiv,D.a.flexColCen].join(" ")},r.a.createElement("h1",null,"Join the Party, Join the Fun!"),r.a.createElement("p",{className:D.a.textRed},"Please enter your desired nick name and room you wish to enter or create"),r.a.createElement("br",null)," ",r.a.createElement("br",null),r.a.createElement("form",{className:D.a.flexColCen,onSubmit:function(e){e.preventDefault(),m.uName.length>0&&m.rName.length>0?(t({type:"SETUSERNAME",userName:m.uName}),t({type:"SETROOMNAME",roomName:m.rName}),Object(s.b)("/"+m.rName)):g("Please enter both a user and room name")}},r.a.createElement("p",{style:{color:"red"}},h),r.a.createElement("div",{className:D.a.inputRow},r.a.createElement("label",null,"Nick Name: "),r.a.createElement("input",{type:"text",name:"uName",value:m.uName,onChange:N})),r.a.createElement("br",null),r.a.createElement("div",{className:D.a.inputRow},r.a.createElement("label",null,"Room Name:"),r.a.createElement("input",{type:"text",name:"rName",value:m.rName,onChange:N})),r.a.createElement("br",null),r.a.createElement("div",{className:D.a.inputRow},r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",name:"rPassword",value:m.rPassword,onChange:N})),r.a.createElement("br",null),r.a.createElement("div",{className:D.a.buttonRow},r.a.createElement("button",{type:"submit",name:"roomButton",value:"enterRoom",className:D.a.prettyBtn},"Enter Room"),r.a.createElement("button",{type:"submit",name:"roomButton",value:"createRoom",className:D.a.prettyBtn},"Create Room"))))))}));var H=Object(m.b)((function(e){return{}}))((function(e){return e.dispatch,r.a.createElement(r.a.Fragment,null,r.a.createElement(s.a,null,r.a.createElement(V,{path:"/"}),r.a.createElement(U,{path:"/:roomName/*"})))})),q=a(40),z=function(e,t){switch(t.type){case"SETSOCKET":return Object(u.a)({},e,{socket:t.socket});case"SETADMIN":return Object(u.a)({},e,{admin:t.admin});case"SETROOMNAME":return Object(u.a)({},e,{roomName:t.roomName});case"SETGAMENAME":return Object(u.a)({},e,{gameName:t.gameName});case"SETUSERNAME":return Object(u.a)({},e,{userName:t.userName});case"SETSCOREBOARD":return Object(u.a)({},e,{scoreboard:t.scoreboard,userList:t.userList,scoreList:t.scoreList});case"LOGOUT":return Object(u.a)({},e,{socket:null,userName:null,roomName:null,gameName:null});default:return e}},J=Object(q.b)(z,{socket:null,roomName:null,admin:null,userName:null,gameName:null}),K=(a(168),Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)));function Q(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(r.a.createElement(m.a,{store:J},r.a.createElement(H,null)),document.getElementById("minigameapp")),function(e){if("serviceWorker"in navigator){if(new URL("",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("","/service-worker.js");K?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var n=a.headers.get("content-type");404===a.status||null!=n&&-1===n.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):Q(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):Q(t,e)}))}}()},3:function(e,t,a){e.exports={entirePage:"Games_entirePage__1cnte",flexColCen:"Games_flexColCen__39eYA",flexRowCen:"Games_flexRowCen__2XsI6",onlyDiv:"Games_onlyDiv__h4Cq2",gameComponent:"Games_gameComponent__1dDdz",textRed:"Games_textRed__33dc2",textWhite:"Games_textWhite__2rsfO",gameBtn:"Games_gameBtn__3tgiA",buttonMsg:"Games_buttonMsg__gN0yM",focus:"Games_focus__2y6pc",activeBtn:"Games_activeBtn__1EOdD",inactiveBtn:"Games_inactiveBtn__7L0zO",createBtn:"Games_createBtn__1zq-V",hiddenForm:"Games_hiddenForm__s_VAT",visibleForm:"Games_visibleForm__1xiGu"}},31:function(e,t,a){e.exports={chatComponent:"Chat_chatComponent__1WldI",chatBox:"Chat_chatBox__Y5YCr",chatLogMsgs:"Chat_chatLogMsgs__3xJBU",chatFormBox:"Chat_chatFormBox__3uJYu",inputMsg:"Chat_inputMsg__38Ah3",msgLog:"Chat_msgLog__1OGkj",message:"Chat_message__2W5D0",recievedMessage:"Chat_recievedMessage__3Ur7C",sentMessage:"Chat_sentMessage__Np0Yf",container:"Chat_container__7z5hS",buttonMsg:"Chat_buttonMsg__19Sri",focus:"Chat_focus__zdCyw",buttonReset:"Chat_buttonReset__1KgDu",user:"Chat_user__3HVhS"}},84:function(e,t,a){e.exports={entirePage:"LoginReg_entirePage__2n3EE",loginReg:"LoginReg_loginReg__IzJXY",hidden:"LoginReg_hidden__p1j6C",regform:"LoginReg_regform__28i1v"}},9:function(e,t,a){e.exports={flexColCen:"Views_flexColCen__mzneq",flexRowCen:"Views_flexRowCen__3YTGs",contentRow:"Views_contentRow__m3-vG",onlyDiv:"Views_onlyDiv__1DMrm",textWhite:"Views_textWhite__2ZAQU",textRed:"Views_textRed__1IfLO",btn:"Views_btn__35cjE",buttonMsg:"Views_buttonMsg__1Leqh",focus:"Views_focus__2OPqs",activeBtn:"Views_activeBtn__1T9f1",inactiveBtn:"Views_inactiveBtn__oRts5",prettyBtn:"Views_prettyBtn__26K0t",inputRow:"Views_inputRow__3tMPp",buttonRow:"Views_buttonRow__3nuYP"}},91:function(e,t,a){e.exports=a(169)}},[[91,1,2]]]);
//# sourceMappingURL=main.ba30149d.chunk.js.map