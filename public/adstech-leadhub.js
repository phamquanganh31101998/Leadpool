window.onload=adstechLeadhubOnload;var atLh_acId="",atLh_topic="",atLh_fb="",atLh_zl="",atLh_url=window.location.href,atLh_utm_source=null,atLh_utm_medium=null,atLh_utm_campaign=null,atLh_utm_term=null,atLh_utm_content=null,atLh_gclid=null,atLh_arrTrack=[],atLh_styleBtnChat="",atLh_chatminiCRM=null,atlh_check_devide=!1,atlh_form_return="",atLh_rqApi="https://services.adstech.vn/leadpool/v1/leadhub";function adstechLeadhubOnload(){var t=document.createElement("script");t.src="https://cdn.firebase.com/js/client/2.2.1/firebase.js",document.getElementsByTagName("head")[0].appendChild(t);var e="",n=document.getElementsByTagName("script");let a=localStorage.getItem("lead");null!=a&&null!=a&&""!=a&&adstechCreateLead(JSON.parse(a),"FORM");for(let t=0;t<n.length;t++)if(n[t].src.indexOf("&gBtnId=")>0){var o=n[t].src.split("?")[1],i=o.split("&")[0];atLh_acId=i.split("=")[1],e=o.split("&")[1].split("=")[1]}var l="";if(atLh_url.indexOf("?")>0?(l=atLh_url.split("?")[1],atLh_arrTrack=l.split("&")):l=null,""==l||null==l)atLh_utm_source=null,atLh_utm_medium=null,atLh_utm_campaign=null,atLh_utm_term=null,atLh_utm_content=null,atLh_gclid=null;else for(let t=0;t<atLh_arrTrack.length;t++)0==atLh_arrTrack[t].indexOf("utm_source")?atLh_utm_source=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_medium")?atLh_utm_medium=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_campaign")?atLh_utm_campaign=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_term")?atLh_utm_term=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_content")?atLh_utm_content=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("gclid")&&(atLh_gclid=atLh_arrTrack[t].split("=")[1]);fetchRetry(`${atLh_rqApi}/account/${atLh_acId}/group-buttons/${e}`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json"})},4).then(t=>{var e=t.response.style,n=t.response.vertical,a=null,o=null,i=null,l=null;for(let e=0;e<t.response.listButton.length;e++)"CALL"==t.response.listButton[e].type?a=t.response.listButton[e]:"FORM"==t.response.listButton[e].type?o=t.response.listButton[e]:"CHAT"==t.response.listButton[e].type?atLh_styleBtnChat=t.response.listButton[e]:"FACEBOOK"==t.response.listButton[e].type?i=t.response.listButton[e]:"ZALO"==t.response.listButton[e].type&&(l=t.response.listButton[e]);adstechLeadhubWriteHtml(e,n,o,a,atLh_styleBtnChat,atLh_acId,i,l);let d=window.localStorage.getItem("leadhub_chatInfo");if(null!=d&&null!=d&&""!=d){let t=JSON.parse(d);document.getElementById("atLhTxtName").innerText=t.name,atLh_topic=t.topic}})}async function fetchRetry(t,e,n){for(let a=0;a<n;a++)try{return await fetch(t,e).then(handle).then(t=>t)}catch(t){if(a+1===n)throw t}}function handle(t){return t.text().then(e=>{const n=e&&JSON.parse(e);if(t.ok)return n;const a=n&&n.error||t.statusText;return Promise.reject(a)})}function adstechLeadhubWriteHtml(t,e,n,a,o,i,l,d){let r="",s="",c="",h="",p="",u="",m="",g="",y="",f="",b="",v="",x="",L="",_="",w="",$="",k="",C="",I="",B=`<style>\n                    ${_="45"==t.left?`.adstech-group-btn {\n            position:fixed;\n            bottom: ${t.bottom-3}%;\n            left: ${parseInt(t.left)+2}%;\n            right: ${t.right}%;\n            top:${t.top}%;\n            z-index: 99999999;\n        }`:`.adstech-group-btn {\n            position:fixed;\n            bottom: ${t.bottom-3}%;\n            left: ${parseInt(t.left)-1}%;\n            right: ${parseInt(t.right)-1}%;\n            top:${t.top}%;\n            z-index: 99999999;\n        }`}\n\n                    .adstech-btn {\n                        border: none;\n                        color: white;\n                        text-align: center;\n                        text-decoration: none;\n                        display: inline-block;\n                        margin: 4px 2px;\n                        border-radius: 50%;\n                        width: ${t.size}px;\n                        height:${t.size}px;\n                        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);\n                    }\n                    \n                    #chatAdmin .input-group-sm>.form-control:not(textarea) {\n                        height: calc(1.5em + 1rem + 2px) !important;\n                    }\n                    .adstech-form {\n                        display: none;\n                        position: fixed;\n                        text-align:center;\n                        left: 50%;\n                        top: 50%;\n                        transform: translate(-50%,-50%);\n                        border: 3px solid #f1f1f1;\n                        z-index: 99999999;\n                        background-color:#fff;\n                    }\n                    #adstech-form{\n                        padding-bottom:20px\n                    }\n                    #adstech-form ::-webkit-scrollbar {\n                        width: 8px;\n                        height: 10px;\n                        z-index: 999;\n                    }\n                \n                    /* Handle */\n                    #adstech-form ::-webkit-scrollbar-thumb {\n                        -webkit-border-radius: 15px;\n                        border-radius: 15px;\n                        background: #eff2f9;\n                    }\n                    /* Add styles to the form container */\n                    .adstech-form-container {\n                        width: 400px;\n                        padding: 10px;\n                        background-color: #fff;\n                    }\n\n                    /* Full-width input fields */\n                    .adstech-form-container input[type=text],\n                    .adstech-form-container input[type=email], \n                    .adstech-form-container input[type=tel]{\n                        width: 90%;\n                        padding: 15px;\n                        margin: 5px 0 22px 0;\n                        border: none;\n                        background: #f1f1f1;\n                    }\n\n                    /* When the inputs get focus, do something */\n                    .adstech-form-container input[type=text]:focus,\n                    .adstech-form-container input[type=email]:focus,\n                    .adstech-form-container input[type=tel]:focus {\n                        background-color: #ddd;\n                        outline: none;\n                    }\n\n                    /* Set a style for the submit/login button */\n                    .adstech-form-container .btn-adstech {\n                        color: white;\n                        border: none;\n                        cursor: pointer;\n                        width: 100% !important;\n                        margin-bottom: 10px;\n                        opacity: 0.8;\n                        float: left;\n                        z-index: 9999999;\n                        height:40px;\n                    }\n\n                    /* Add a red background color to the cancel button */\n                    .adstech-form-container .cancel-adstech {\n                        background-color: #999;\n                    }\n\n                    /* Add some hover effects to buttons */\n                    .adstech-form-container .btn-adstech:hover,\n                    .open-button:hover {\n                        opacity: 1;\n                    }\n                    .adstech-alert {\n                        padding: 20px;\n                        background-color:#d4edda;\n                        color: #155724;\n                        margin-bottom: 15px;\n                        display: none;\n                        max-width:400px;\n                        position: fixed;\n                        text-align:center;\n                        left: 50%;\n                        top: 50%;\n                        z-index: 9999999;\n                        transform: translate(-50%,-50%);\n                    }\n                    .adstech-chat-form{\n                        width:100%;\n                    }\n                    @media only screen and (max-width: 420px) {\n                        .adstech-form-container {\n                            width: 300px;\n                            padding: 10px;\n                            z-index: 99999999;\n                            background-color: #fff;\n                        }\n                        .adstech-chat-form{\n                            width:100%;\n                            margin-left:5%\n                        }\n                    }\n                    @media screen and (max-width: 1024px) and (min-width: 450px) {\n                        .adstech-chat-form{\n                            width:100%;\n                            margin-left:10%\n                        }\n                    }\n                </style>`;if(null==a||""==a?s="":navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)?("#fff"==t.color?s=`<button class="adstech-btn" onclick="atLhOpenCall()" style="background-color:${a.buttonColor};padding:0px">\n                            <a href="tel:${a.phoneNumber}" style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-white.png" style="max-width:${t.size-18}px;height:${t.size-18}" alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`:"#000"==t.color&&(s=`<button class="adstech-btn" onclick="atLhOpenCall()" style="background-color:${a.buttonColor};padding:0px">\n                            <a href="tel:${a.phoneNumber}" style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-black.png" style="max-width:${t.size-18}px;height:${t.size-18}"  alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`),atlh_check_devide=!1,w="<br />"):("#fff"==t.color?s=`<button class="adstech-btn" onclick="atLhOpenFormCall()" style="background-color:${a.buttonColor};padding:0px">\n                            <a style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-white.png" style="max-width:${t.size-18}px;height:${t.size-18}"  alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`:"#000"==t.color&&(s=`<button class="adstech-btn" onclick="atLhOpenFormCall()" style="background-color:${a.buttonColor};padding:0px">\n                            <a style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-black.png" style="max-width:${t.size-18}px;height:${t.size-18}"  alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`),I=`<div class="adstech-form" id="adstech-call">\n            <div style="float:right;margin-top:2px; margin-right:5px; color:red">\n                                <a href="javascript:void(0);" onclick="document.getElementById('adstech-call').style.display='none'" style="width:25px;height:25px;border-radius:50%; background-color:#fff; box-shadow:none;border: none;font-size:25px;color:red">&times;</a>\n                                </div>\n            <form class="adstech-form-container" id="call-adstech" method="POST">\n                            <h3>Để lại thông tin để chúng tôi liên hệ với bạn</h3>\n                            <input type="text" placeholder="Họ và tên" name="nameCall" required>\n                            <input type="tel" placeholder="Số điện thoại" pattern="[0]{1}[0-9]{9}" title="Nhập đúng số điện thoại của bạn" name="phoneCall" required>\n                            <div style="padding:0px 14px 0px 14px">\n                                <input type="submit" class="btn-adstech" value="Gui lien he" style="background-color:${a.buttonColor};"/>\n                            </div>\n                        </form></div>\n                        <div class="adstech-alert" id="adstech-alert-call">\n                    \n                </div>`,w="<br />",atlh_check_devide=!0),null==o||""==o?h="":("#fff"==t.color?h=`<button class="adstech-btn" style="background-color:${o.buttonColor};padding:0px" onclick="openChat()">\n                    <img src="https://leadpool.adstech.vn/question_answer-white.png" alt="Chat" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`:"#000"==t.color&&(h=`<button class="adstech-btn" style="background-color:${o.buttonColor};padding:0px" onclick="openChat()">\n                    <img src="https://leadpool.adstech.vn/question_answer-black.png" alt="Chat" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`),k="<br />",m=`\n            <div id="chatInputInfo" style="z-index: 99999999; display: none;  position: fixed; bottom: 5%; right: 5%; padding:10px; max-width:400px">\n                <div style="width:100%">\n                    <div class="adstech-chat-form">\n                        <div style="width:100%">\n                            <div style="width:100%">\n                                <div style="border: 1px solid ${o.buttonColor}">\n                                <div style="float:right;margin-top:2px; margin-right:5px; color:red">\n                                <a href="javascript:void(0);" onclick="document.getElementById('chatInputInfo').style.display='none'" style="width:25px;height:25px;border-radius:50%; background-color:${o.buttonColor}; box-shadow:none;border: none;font-size:25px;color:red">&times;</a>\n                                </div>\n                                    <div style="padding:10px;border: 1px solid ${o.buttonColor}; background-color: ${o.buttonColor};">\n                                        <h6 style="color: white; margin:auto" class="panel-title">Hãy cho chúng tôi biết bạn là ai</h6>\n                                    </div> \n                                    <div style="padding:15px; background-color:#fff"> \n                                        <form class='adstech-form-container' id="atLhSendInfo" method="POST">\n                                            <div class="input-group input-group-sm" style="width: 100%">\n                                                <input style="width: 100%" type="text" class="form-control" required name="name" placeholder="Tên">\n                                                <input style="width: 100%" type="text" class="form-control" required name="topic" placeholder="Email/Số điện thoại">\n                                            </div>\n                                            <br>\n                                            <div class="input-group-btn">\n                                                <input style="width:100%;color: white; background-color: ${o.buttonColor};" class="btn-adstech" type="submit" id="btnSend" value="Gửi thông tin">\n                                            </div>\n                                        </form>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        `,g=`\n            <div id="chatAdmin" style="z-index: 99999999; display: none; position: fixed; bottom: 5%; right: 5%; max-width:400px"> \n                <div style="width:100%">\n                    <div class="adstech-chat-form">\n                        <div style="width:100%">\n                            <div style="width:100%">\n                                <div style="border: 1px solid ${o.buttonColor}">\n                                <div style="float:right;margin-top:5px; margin-right:10px; color:red">\n                                <a href="javascript:void(0);" onclick="document.getElementById('chatAdmin').style.display='none'" style="width:25px;height:25px;border-radius:50%; background-color:${o.buttonColor}; box-shadow:none;border: none;font-size:25px;color:red">&times;</a>\n                                </div>\n                                    <div style="width:100%;padding:10px;border: 1px solid ${o.buttonColor}; background-color: ${o.buttonColor};">\n                                        <div style="width:100%"><h6 style="color: white; ">Xin chào, <span id="atLhTxtName"></span>. Hãy chat với chúng tôi</h6></div>\n                                    </div>\n                                    <div style="height: 350px;background-color:#fff; overflow-y: scroll;">\n                                        <div style="width:100%">\n                                            <div style="width:100% id="scollDiv"; >\n                                                <table class="table" id="atLhMessageContainer">\n                                                    <tr></tr>\n                                                </table>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    <div style="background-color:#fff" style="clear:both">\n                                        <form id="atLhSendessage" method="POST" style="background-color:#fff">\n                                                <span style="width:100%">\n                                                    <div style="width:80%;float:left"><input type="text" required class="form-control" id="atLhTxtText" placeholder="nói gì đó .."></div>\n                                                    <div style="width:20%;float:left"><input class="btn" style="width:100%;color: white; background-color: ${o.buttonColor};" type="submit" id="btnSend" value="Gửi"></div>\n                                                </span>\n                                            </div>\n                                        </form>\n                                    </div>\n                                </div>\n                            </div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        `),null==n||""==n)c="",y="";else{for(let t=0;t<n.properties.length;t++)"email"==n.properties[t]?b='<input type="email" placeholder="Địa chỉ email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" title="Nhập đúng email của bạn" required>':"lastName"==n.properties[t]?v='<input type="text" placeholder="Họ và tên" name="name" required>':"phone"==n.properties[t]?f='<input type="tel" placeholder="Số điện thoại" pattern="[0]{1}[0-9]{9}" title="Nhập đúng số điện thoại của bạn" name="phone" required>':"city"==n.properties[t]?x='<input type="text" placeholder="Địa chỉ" name="city" required>':"bussiness"==n.properties[t]&&(L='<input type="text" placeholder="Nghề nghiệp" name="bussiness" required>');"#fff"==t.color?c=`<button class="adstech-btn" style="background-color:${n.buttonColor};padding:0px" onclick="atLhOpenFrom()">\n                    <img src="https://leadpool.adstech.vn/mail-white.png" alt="Đăng ký ngay" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`:"#000"==t.color&&(c=`<button class="adstech-btn" style="background-color:${n.buttonColor};padding:0px" onclick="atLhOpenFrom()">\n                    <img src="https://leadpool.adstech.vn/mail-black.png" alt="Đăng ký ngay" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`),y=`<div class="adstech-form" id="adstech-form">\n                    <div style="float:right;margin-top:5px; margin-right:10px; color:red"><a href="javascript:void(0);" onclick="document.getElementById('adstech-form').style.display='none'" style="border-radius:50%; background-color:#fff; box-shadow:none;border: none; width:20px;height:20px;font-size:25px;color:red">&times;</a></div>\n                    <form class="adstech-form-container" id="form-adstech" method="POST">\n                        <h3>${n.title}</h3>\n                        ${v}\n                        ${f}\n                        ${b}\n                        ${x}\n                        ${L}\n                        <div style="padding:0px 14px 0px 14px">\n                            <button type="submit" class="btn-adstech" style="background-color:${n.buttonColor};color:white">${n.description}</button>\n                        </div>\n                    </form>\n                </div>\n                \n                <div class="adstech-alert" id="adstech-alert-form">\n                </div>`,$="<br />",atlh_form_return=n.formMessageReturn}null==l||""==l?p="":(atLh_fb=`https://m.me/${l.phoneNumber}`,p='<button class="adstech-btn" style="padding:0px" onclick="atLhOpenFacebook()"><a><img src="https://leadpool.adstech.vn/mess.png" id="adstech-open-fb" alt="Facebook" width="100%" height="100%"></a></button>'),null==d||""==d?u="":(atLh_zl=`https://zalo.me/${d.phoneNumber}`,u='<button class="adstech-btn" style="padding:0px" onclick="atLhOpenZalo()"><a><img src="https://leadpool.adstech.vn/zalo.png" id="adstech-open-zl" alt="Zalo" width="100%" height="100%"></a></button>',C="<br />"),r=0==e?`\n                <div class="adstech-group-btn">\n                    ${p}\n                    ${C}\n                    ${u}\n                    ${$}\n                    ${c}\n                    ${w}\n                    ${s}\n                    ${k}\n                    ${h}\n                </div>\n                ${m}\n                ${g}\n                ${y}\n                ${B}\n                ${I}\n                `:`\n                <div class="adstech-group-btn">\n                    ${s}\n                    ${c}\n                    ${h}\n                    ${p}\n                    ${u}\n                </div>\n                ${m}\n                ${g}\n                ${y}\n                ${B}\n                ${I}`;let A=document.createElement("div");A.id="adstech-group-btn",document.body.appendChild(A),document.getElementById("adstech-group-btn").innerHTML=r,null!=n&&""!=n&&atLhSend(i),null!=atLh_styleBtnChat&&""!=atLh_styleBtnChat&&(atLh_chatminiCRM=new Firebase("https://leadpoolproduct.firebaseio.com/"),atLhConnectToFirebase()),1==atlh_check_devide&&null!=a&&""!=a&&atLhOpenCall()}function openChat(){let t=document.getElementById("chatInputInfo"),e=document.getElementById("chatAdmin");if("block"==t.style.display||"block"==e.style.display)t.style.display="none",e.style.display="none";else{let e=window.localStorage.getItem("leadhub_chatInfo");if(null!=e&&null!=e&&""!=e){let t=JSON.parse(e);atLh_chatminiCRM.child(atLh_topic).on("child_added",function(e){var n=e.val();let a="";1!=n.isCustomer&&null!=n.isCustomer||(a=""),0==n.isCustomer&&(a=" (Admin)");let o="";o=n.name==t.name?`<tr style="padding-top: 5%;">\n                        <td style="border-radius: 10px; max-width: 80%; float: right; background-color: ${atLh_styleBtnChat.buttonColor}; color: white; margin-right: 2%; margin-top: 2%;">${n.name}${a}: ${n.message}</td>\n                    </tr>`:`<tr style="padding-top: 5%;">\n                        <td style="border-radius: 10px; max-width: 80%; float: left; background-color: #e5e5e5; margin-left: 2%; margin-top: 2%;">${n.name}${a}: ${n.message}</td>\n                    </tr>`;var i=document.getElementById("atLhMessageContainer"),l=i.insertRow(i.rows.length-1);l.innerHTML=o,l.scrollIntoView()}),atLhStartChatting()}else t.style.display="block"}}function atLhOpenFrom(){"block"==document.getElementById("adstech-form").style.display?document.getElementById("adstech-form").style.display="none":document.getElementById("adstech-form").style.display="block"}function atLhOpenCall(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))atLhSendTracing("CALL");else{let t='<div class="adstech-leadhub-alert-call" id="adstech-leadhub-alert-call">\n                        <h6>Cảm ơn bạn đã để lại số điện thoại, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</h6>\n                    </div>';document.getElementById("call-adstech").addEventListener("submit",e=>{const n=new FormData(e.target);let a=n.get("nameCall"),o=n.get("phoneCall"),i=[{property:"accountId",value:atLh_acId},{property:"lastName",value:a},{property:"phone",value:o},{property:"email",value:`${o}@gmail.com`}];e.preventDefault(),adstechCreateLead(i,"CALL"),atLhSendTracing("CALL"),document.getElementById("adstech-call").style.display="none",document.getElementById("adstech-alert-call").innerHTML=t,document.getElementById("adstech-alert-call").style.display="block"})}}function atLhOpenFormCall(){"block"==document.getElementById("adstech-call").style.display?document.getElementById("adstech-call").style.display="none":document.getElementById("adstech-call").style.display="block"}function atLhCloseForm(){document.getElementById("adstech-form").style.display="none"}function atLhCloseAlert(){null!=document.getElementById("adstech-alert-form")&&null!=document.getElementById("adstech-alert-form")&&""!=document.getElementById("adstech-alert-form")&&(document.getElementById("adstech-alert-form").style.display="none"),null!=document.getElementById("adstech-alert-call")&&null!=document.getElementById("adstech-alert-call")&&""!=document.getElementById("adstech-alert-call")&&(document.getElementById("adstech-alert-call").style.display="none")}function atLhOpenFacebook(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){document.getElementById("adstech-open-fb").classList.add("at-onclick-fb"),window.location=atLh_fb,atLhSendTracing("FACEBOOK")}else{document.getElementById("adstech-open-fb").classList.add("at-onclick-fb"),window.open(atLh_fb),atLhSendTracing("FACEBOOK")}}function atLhOpenZalo(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){document.getElementById("adstech-open-zl").classList.add("at-onclick-zl"),window.location=atLh_zl,atLhSendTracing("ZALO")}else{document.getElementById("adstech-open-zl").classList.add("at-onclick-zl"),window.open(atLh_zl),atLhSendTracing("ZALO")}}function atLhGetHour(t){let e="";return e=t.split(" ")[3]}function atLhConnectToFirebase(){document.getElementById("atLhSendInfo").addEventListener("submit",t=>{const e=new FormData(t.target);let n=e.get("name");atLh_topic=e.get("topic"),adstechCreateLead([{property:"accountId",value:atLh_acId},{property:"lastName",value:n},{property:"email",value:atLh_topic}],"CHAT"),document.getElementById("atLhTxtName").innerText=n;let a={name:n,topic:atLh_topic=atLh_acId+"-"+atLh_topic.replace(/\./g,"-dot-")};window.localStorage.setItem("leadhub_chatInfo",JSON.stringify(a)),atLh_chatminiCRM.child(atLh_topic).on("child_added",function(t){let e=t.val(),n="";1!=e.isCustomer&&null!=e.isCustomer||(n=""),0==e.isCustomer&&(n=" (Admin)");let o="";o=e.name==a.name?`\n                <tr style="padding-top: 5%;">\n                    <td style="border-radius: 10px; max-width: 80%; float: right; background-color: ${atLh_styleBtnChat.buttonColor}; color: white; margin-right: 2%; margin-top: 2%;">\n                        ${e.name}${n}: ${e.message}\n                    </td>\n                </tr>`:`\n                <tr style="padding-top: 5%;">\n                    <td style="border-radius: 10px; max-width: 80%; float: left; background-color: #e5e5e5; margin-left: 2%; margin-top: 2%;">\n                        ${e.name}${n}: ${e.message}\n                    </td>\n                </tr>`;var i=document.getElementById("atLhMessageContainer"),l=i.insertRow(i.rows.length-1);l.innerHTML=o,l.scrollIntoView()}),t.preventDefault(),atLhStartChatting()})}function atLhStartChatting(){document.getElementById("chatInputInfo").style.display="none",document.getElementById("chatAdmin").style.display="block",document.getElementById("atLhSendessage").addEventListener("submit",t=>{let e=document.getElementById("atLhTxtText").value;if(""!=e)try{atLhSendessage({topic:atLh_topic,name:document.getElementById("atLhTxtName").innerText,message:e,accountId:atLh_acId,isCustomer:!0}),document.getElementById("atLhTxtText").value=""}catch(t){alert(t)}t.preventDefault()})}function atLhSendessage(t){fetchRetry(`${atLh_rqApi}/chats`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)},5).then(t=>{console.log(t)}).catch(t=>{console.log(t)})}function atLhSend(t){let e=`<div class="adstech-leadhub-alert-form" id="adstech-leadhub-alert-form">\n                        <h6>${atlh_form_return}</h6>\n                    </div>`;document.getElementById("form-adstech").addEventListener("submit",n=>{const a=new FormData(n.target);let o=a.get("email"),i=a.get("name"),l=a.get("phone"),d=a.get("city"),r=a.get("bussiness"),s=[{property:"accountId",value:t},{property:"email",value:o}];if(null!=i&&""!=i&&null!=i){let t={property:"lastName",value:i};s.push(t)}if(null!=l&&""!=l&&null!=l){let t={property:"phone",value:l};s.push(t)}if(null!=d&&""!=d&&null!=d){let t={property:"city",value:d};s.push(t)}if(null!=r&&""!=r&&null!=r){let t={property:"bussiness",value:r};s.push(t)}adstechCreateLead(s,"FORM"),atLhSendTracing("FORM"),n.preventDefault(),atLhCloseForm(),document.getElementById("adstech-alert-form").innerHTML=e,document.getElementById("adstech-alert-form").style.display="block"})}function adstechCreateLead(t,e){fetchRetry(`${atLh_rqApi}/contacts?source_from_mar=${e}`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)},4).then(e=>{"SUCCESS"==e.code||"SPAM SERVER"==e.message?(localStorage.removeItem("lead"),setTimeout(function(){atLhCloseAlert()},2e3)):(localStorage.setItem("lead",JSON.stringify(t)),setTimeout(function(){atLhCloseAlert()},2e3))}).catch(e=>{localStorage.setItem("lead",JSON.stringify(t)),setTimeout(function(){atLhCloseAlert()},2e3)})}function atLhSendTracing(t){let e={type:t,accountId:atLh_acId,link:atLh_url};null!=atLh_utm_source&&(e.utm_source=atLh_utm_source),null!=atLh_utm_medium&&(e.utm_medium=atLh_utm_medium),null!=atLh_utm_campaign&&(e.utm_campaign=atLh_utm_campaign),null!=atLh_utm_term&&(e.utm_term=atLh_utm_term),null!=atLh_utm_content&&(e.utm_content=atLh_utm_content),null!=atLh_gclid&&(e.gclid=atLh_gclid),fetchRetry(`${atLh_rqApi}/tracking-source-utm`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)},4).then(t=>{console.log(t)})}