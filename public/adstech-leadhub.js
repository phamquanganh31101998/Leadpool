var atLh_tag=document.createElement("script");atLh_tag.src="https://leadpool.adstech.vn/firebase.js",atLh_tag.type="text/javascript",atLh_tag.setAttribute("defer","");var atLh_scripts=document.getElementsByTagName("script")[0];atLh_scripts.parentNode.insertBefore(atLh_tag,atLh_scripts),window.onload=adstechLeadhubOnload;var atLh_acId="",atLh_topic="",atLh_fb="",atLh_zl="",atLh_url=window.location.href,atLh_utm_source=null,atLh_utm_medium=null,atLh_utm_campaign=null,atLh_utm_term=null,atLh_utm_content=null,atLh_gclid=null,atLh_arrTrack=[],atLh_styleBtnChat="",atLh_chatminiCRM=null,atlh_check_devide=!1,atlh_form_return="",email=null,atLh_rqApi="https://services.adstech.vn/leadpool/v1/leadhub";function adstechLeadhubOnload(){var t="",e=document.getElementsByTagName("script");let n=localStorage.getItem("lead");null!=n&&null!=n&&""!=n&&adstechCreateLead(JSON.parse(n),"FORM");for(let n=0;n<e.length;n++)if(e[n].src.indexOf("&gBtnId=")>0){var a=e[n].src.split("?")[1],o=a.split("&")[0];atLh_acId=o.split("=")[1];var l=a.split("&")[1];t=l.split("=")[1]}var i="";if(atLh_url.indexOf("?")>0?(i=atLh_url.split("?")[1],atLh_arrTrack=i.split("&")):i=null,""==i||null==i)atLh_utm_source=null,atLh_utm_medium=null,atLh_utm_campaign=null,atLh_utm_term=null,atLh_utm_content=null,atLh_gclid=null;else for(let t=0;t<atLh_arrTrack.length;t++)0==atLh_arrTrack[t].indexOf("utm_source")?atLh_utm_source=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_medium")?atLh_utm_medium=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_campaign")?atLh_utm_campaign=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_term")?atLh_utm_term=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("utm_content")?atLh_utm_content=atLh_arrTrack[t].split("=")[1]:0==atLh_arrTrack[t].indexOf("gclid")&&(atLh_gclid=atLh_arrTrack[t].split("=")[1]);fetchRetry(`${atLh_rqApi}/account/${atLh_acId}/group-buttons/${t}`,{method:"GET",headers:new Headers({Accept:"application/json","Content-Type":"application/json"})},4).then(e=>{var n=e.response.style,a=e.response.vertical,o=null,l=null,i=null,r=null;for(let t=0;t<e.response.listButton.length;t++)"CALL"==e.response.listButton[t].type?o=e.response.listButton[t]:"FORM"==e.response.listButton[t].type?l=e.response.listButton[t]:"CHAT"==e.response.listButton[t].type?atLh_styleBtnChat=e.response.listButton[t]:"FACEBOOK"==e.response.listButton[t].type?i=e.response.listButton[t]:"ZALO"==e.response.listButton[t].type&&(r=e.response.listButton[t]);adstechLeadhubWriteHtml(n,a,l,o,atLh_styleBtnChat,atLh_acId,i,r,t);let d=window.localStorage.getItem("leadhub_chatInfo");if(null!=d&&null!=d&&""!=d){let t=JSON.parse(d);document.getElementById("atLhTxtName").innerText=t.name,atLh_topic=t.topic}null!=e.response.createdBy&&(email=e.response.createdBy)})}async function fetchRetry(t,e,n){for(let a=0;a<n;a++)try{return await fetch(t,e).then(handle).then(t=>t)}catch(t){if(a+1===n)throw t}}function handle(t){return t.text().then(e=>{const n=e&&JSON.parse(e);if(t.ok)return n;const a=n&&n.error||t.statusText;return Promise.reject(a)})}function adstechLeadhubWriteHtml(t,e,n,a,o,l,i,r,d){let c="",s="",h="",p="",u="",m="",g="",y="",f="",b="",x="",L="",v="",_="",w="",$="",k="",I="",C="",B="",A=`<style>\n                    ${w="45"==t.left?`.adstech-group-btn {\n            position:fixed;\n            bottom: ${t.bottom-3}%;\n            left: ${parseInt(t.left)+2}%;\n            right: ${t.right}%;\n            top:${t.top}%;\n            z-index: 99999999;\n        }`:`.adstech-group-btn {\n            position:fixed;\n            bottom: ${t.bottom-3}%;\n            left: ${parseInt(t.left)-1}%;\n            right: ${parseInt(t.right)-1}%;\n            top:${t.top}%;\n            z-index: 99999999;\n        }`}\n\n                    .adstech-btn {\n                        border: none;\n                        color: white;\n                        text-align: center;\n                        text-decoration: none;\n                        display: inline-block;\n                        margin: 4px 2px;\n                        border-radius: 50%;\n                        width: ${t.size}px;\n                        height:${t.size}px;\n                        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);\n                    }\n                    \n                    #chatAdmin .input-group-sm>.form-control:not(textarea) {\n                        height: calc(1.5em + 1rem + 2px) !important;\n                    }\n                    .adstech-form {\n                        display: none;\n                        position: fixed;\n                        text-align:center;\n                        left: 50%;\n                        top: 50%;\n                        transform: translate(-50%,-50%);\n                        border: 3px solid #f1f1f1;\n                        z-index: 99999999;\n                        background-color:#fff;\n                    }\n                    #adstech-form{\n                        padding-bottom:20px\n                    }\n                    #adstech-form ::-webkit-scrollbar {\n                        width: 8px;\n                        height: 10px;\n                        z-index: 999;\n                    }\n                \n                    /* Handle */\n                    #adstech-form ::-webkit-scrollbar-thumb {\n                        -webkit-border-radius: 15px;\n                        border-radius: 15px;\n                        background: #eff2f9;\n                    }\n                    /* Add styles to the form container */\n                    .adstech-form-container {\n                        max-width: 400px;\n                        padding: 10px;\n                        background-color: #fff;\n                    }\n\n                    /* Full-width input fields */\n                    .adstech-form-container input[type=text],\n                    .adstech-form-container input[type=email], \n                    .adstech-form-container input[type=tel]{\n                        width: 90%;\n                        padding: 15px;\n                        margin: 5px 0 22px 0;\n                        border: none;\n                        background: #f1f1f1;\n                    }\n\n                    /* When the inputs get focus, do something */\n                    .adstech-form-container input[type=text]:focus,\n                    .adstech-form-container input[type=email]:focus,\n                    .adstech-form-container input[type=tel]:focus {\n                        background-color: #ddd;\n                        outline: none;\n                    }\n\n                    /* Set a style for the submit/login button */\n                    .adstech-form-container .btn-adstech {\n                        color: white;\n                        border: none;\n                        cursor: pointer;\n                        width: 100% !important;\n                        margin-bottom: 10px;\n                        opacity: 0.8;\n                        float: left;\n                        z-index: 9999999;\n                        height:40px;\n                    }\n\n                    /* Add a red background color to the cancel button */\n                    .adstech-form-container .cancel-adstech {\n                        background-color: #999;\n                    }\n\n                    /* Add some hover effects to buttons */\n                    .adstech-form-container .btn-adstech:hover,\n                    .open-button:hover {\n                        opacity: 1;\n                    }\n                    .adstech-alert {\n                        padding: 20px;\n                        background-color:#d4edda;\n                        color: #155724;\n                        margin-bottom: 15px;\n                        display: none;\n                        max-width:400px;\n                        position: fixed;\n                        text-align:center;\n                        left: 50%;\n                        top: 50%;\n                        z-index: 9999999;\n                        transform: translate(-50%,-50%);\n                    }\n                    .adstech-chat-form{\n                        width:400px;\n                    }\n                    .adstech-row-mesaage{\n                        width:100%;\n                        padding-top: 5%;\n                    }\n                    @media only screen and (max-width: 420px) {\n                        .adstech-form-container {\n                            width: 300px;\n                            padding: 10px;\n                            z-index: 99999999;\n                            background-color: #fff;\n                        }\n                        .adstech-chat-form{\n                            width:100%;\n                            margin-left:5%\n                        }\n                    }\n                    @media screen and (max-width: 1024px) and (min-width: 450px) {\n                        .adstech-chat-form{\n                            width:100%;\n                            margin-left:10%\n                        }\n                    }\n                </style>`;if(null==a||""==a?s="":navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)?("#fff"==t.color?s=`<button class="adstech-btn" onclick="atLhOpenCall()" style="background-color:${a.buttonColor};padding:0px;border-radius:50% !important">\n                            <a href="tel:${a.phoneNumber}" style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-white.png" style="max-width:${t.size-18}px;height:${t.size-18}" alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`:"#000"==t.color&&(s=`<button class="adstech-btn" onclick="atLhOpenCall()" style="background-color:${a.buttonColor};padding:0px;border-radius:50% !important">\n                            <a href="tel:${a.phoneNumber}" style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-black.png" style="max-width:${t.size-18}px;height:${t.size-18}"  alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`),atlh_check_devide=!1,$="<br />"):("#fff"==t.color?s=`<button class="adstech-btn" onclick="atLhOpenFormCall()" style="background-color:${a.buttonColor};padding:0px;border-radius:50% !important">\n                            <a style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-white.png" style="max-width:${t.size-18}px;height:${t.size-18}"  alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`:"#000"==t.color&&(s=`<button class="adstech-btn" onclick="atLhOpenFormCall()" style="background-color:${a.buttonColor};padding:0px;border-radius:50% !important">\n                            <a style="width:100%;height:100%">\n                                <img src="https://leadpool.adstech.vn/call-black.png" style="max-width:${t.size-18}px;height:${t.size-18}"  alt="Gọi điện thoại" width="${t.size-18}px" height="${t.size-18}px">\n                            </a>\n                        </button>`),B=`<div class="adstech-form" id="adstech-call">\n                            <div style="float:right;margin-top:2px; margin-right:5px; color:red;text-align:center">\n                                <a href="javascript:void(0);" onclick="document.getElementById('adstech-call').style.display='none'" style="width:25px;height:25px;border-radius:50%; background-color:#fff; box-shadow:none;border: none;font-size:25px;color:red">&times;</a>\n                            </div>\n                            <form class="adstech-form-container" id="call-adstech" method="POST">\n                                <h3>Gọi ngay cho chúng tôi theo số : ${a.phoneNumber} hoặc</h3>\n                                <h3>Để lại thông tin để chúng tôi liên hệ với bạn</h3>\n                                <input type="text" placeholder="Họ và tên" name="nameCall" required>\n                                <input type="tel" placeholder="Số điện thoại" pattern="[0]{1}[0-9]{9}" title="Nhập đúng số điện thoại của bạn" name="phoneCall" required>\n                                <div style="padding:0px 14px 0px 14px">\n                                    <input type="submit" class="btn-adstech" value="Yêu cầu gọi lại" style="background-color:${a.buttonColor};"/>\n                                </div>\n                            </form>\n                        </div>\n                        <div class="adstech-alert" id="adstech-alert-call"></div>`,$="<br />",atlh_check_devide=!0),null==o||""==o?p="":("#fff"==t.color?p=`<button class="adstech-btn" style="background-color:${o.buttonColor};padding:0px;border-radius:50% !important" onclick="openChat()">\n                    <img src="https://leadpool.adstech.vn/question_answer-white.png" alt="Chat" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`:"#000"==t.color&&(p=`<button class="adstech-btn" style="background-color:${o.buttonColor};padding:0px;border-radius:50% !important" onclick="openChat()">\n                    <img src="https://leadpool.adstech.vn/question_answer-black.png" alt="Chat" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`),I="<br />",g=`\n            <div id="chatInputInfo" style="z-index: 99999999; display: none;  position: fixed; bottom: 5%; right: 5%; padding:10px; max-width:400px">\n                <div class="adstech-chat-form">\n                    <div style="border: 1px solid ${o.buttonColor}">\n                        <div style="float:right;margin-top:2px; margin-right:5px; color:red;text-align:center">\n                            <a href="javascript:void(0);" onclick="document.getElementById('chatInputInfo').style.display='none'" style="width:25px;height:25px;border-radius:50%; background-color:${o.buttonColor}; box-shadow:none;border: none;font-size:25px;color:red">&times;</a>\n                        </div>\n                        <div style="padding:10px;border: 1px solid ${o.buttonColor}; background-color: ${o.buttonColor};">\n                            <h6 style="color: white; margin:auto" class="panel-title">Hãy cho chúng tôi biết bạn là ai</h6>\n                        </div> \n                        <div style="padding:15px; background-color:#fff"> \n                            <form class='adstech-form-container' id="atLhSendInfo" method="POST">\n                                <input style="width: 100%;margin-top:-10px !important" type="text" class="form-control" required name="name" placeholder="Tên">\n                                <input style="width: 100%;margin-top:-10px !important" type="text" class="form-control" required name="topic" placeholder="Email/Số điện thoại">\n                                <input style="width:100%;color: white; background-color: ${o.buttonColor};margin-top:-20px" class="btn-adstech" type="submit" id="btnSend" value="Gửi thông tin">\n                            </form>\n                        </div>\n                    </div>\n                </div>\n            </div>\n            <div class="adstech-alert" id="adstech-alert-chat"></div>\n        `,y=`\n            <div id="chatAdmin" style="z-index: 99999999;background-color:#fff !important; display: none; position: fixed; bottom: 5%; right: 5%; max-width:400px">\n                <div style="background-color: ${o.buttonColor};width:100%">\n                    <div style="width:10%;float:right;margin-top:5px; margin-right:10px; color:red;text-align:center">\n                        <a href="javascript:void(0);" onclick="document.getElementById('chatAdmin').style.display='none'" style="width:25pxheight:25px;border-radius:50%; background-color:transparent; box-shadow:none;border: none;font-size:25px;color:red">x</a>\n                    </div>\n                    <div style="width:90%;padding:10px;border: 1px solid ${o.buttonColor}; background-color: transparent;">\n                        <h6 style="color: white; ">Xin chào, <span id="atLhTxtName"></span>. Hãy chat với chúng tôi</h6>\n                    </div>\n                    <div style="height: 350px;background-color:#fff; overflow-y: scroll; width:100%">\n                        <div id="atLhMessageContainer" style="width:100%">\n                        </div>\n                    </div>\n                    <div style="background-color:#fff" style="clear:both">\n                        <form id="atLhSendessage" method="POST" style="background-color:#fff">\n                            <span style="width:100%">\n                                <div style="width:80%;float:left"><input type="text" required class="form-control" id="atLhTxtText"placeholder="nói gì đó .."></div>\n                                <div style="width:20%;float:left"><input class="btn" style="width:100%;color: white; background-color: ${o.buttonColor};" type="submit" id="btnSend" value="Gửi"></div>\n                            </span>\n                        </form>\n                    </div>\n                </div>\n            </div>\n        `),null==n||""==n)h="",f="";else{for(let t=0;t<n.properties.length;t++)"email"==n.properties[t]?x='<input type="email" placeholder="Địa chỉ email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" title="Nhập đúng email của bạn" required>':"lastName"==n.properties[t]?L='<input type="text" placeholder="Họ và tên" name="name" required>':"phone"==n.properties[t]?b='<input type="tel" placeholder="Số điện thoại" pattern="[0]{1}[0-9]{9}" title="Nhập đúng số điện thoại của bạn" name="phone" required>':"city"==n.properties[t]?v='<input type="text" placeholder="Địa chỉ" name="city" required>':"bussiness"==n.properties[t]&&(_='<input type="text" placeholder="Nghề nghiệp" name="bussiness" required>');"#fff"==t.color?h=`<button class="adstech-btn" style="background-color:${n.buttonColor};padding:0px;border-radius:50% !important" onclick="atLhOpenFrom()">\n                    <img src="https://leadpool.adstech.vn/mail-white.png" alt="Đăng ký ngay" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`:"#000"==t.color&&(h=`<button class="adstech-btn" style="background-color:${n.buttonColor};padding:0px;border-radius:50% !important" onclick="atLhOpenFrom()">\n                    <img src="https://leadpool.adstech.vn/mail-black.png" alt="Đăng ký ngay" style="max-width:${t.size-18}px;height:${t.size-18}"  width="${t.size-18}px" height="${t.size-18}px">\n                </button>`),f=`<div class="adstech-form" id="adstech-form">\n                        <div style="float:right;margin-top:5px; margin-right:10px; color:red;text-align:center"><a href="javascript:void(0);" onclick="document.getElementById('adstech-form').style.display='none'" style="border-radius:50%; background-color:#fff; box-shadow:none;border: none; width:20px;height:20px;font-size:25px;color:red">&times;</a></div>\n                        <form class="adstech-form-container" id="form-adstech" method="POST">\n                            <h3>${n.title}</h3>\n                            ${L}\n                            ${b}\n                            ${x}\n                            ${v}\n                            ${_}\n                            <div style="padding:0px 14px 0px 14px">\n                                <input type="submit" class="btn-adstech" style="background-color:${n.buttonColor};color:white" value="${n.description}">\n                            </div>\n                        </form>\n                    </div>\n                    <div class="adstech-alert" id="adstech-alert-form">\n                    </div>`,k="<br />",atlh_form_return=n.formMessageReturn}null==i||""==i?u="":(atLh_fb=`https://m.me/${i.phoneNumber}`,u='<button class="adstech-btn" style="padding:0px;border-radius:50% !important" onclick="atLhOpenFacebook()"><a><img src="https://leadpool.adstech.vn/mess.png" id="adstech-open-fb" alt="Facebook" width="100%" height="100%"></a></button>'),null==r||""==r?m="":(atLh_zl=`https://zalo.me/${r.phoneNumber}`,m='<button class="adstech-btn" style="padding:0px;border-radius:50% !important" onclick="atLhOpenZalo()"><a><img src="https://leadpool.adstech.vn/zalo.png" id="adstech-open-zl" alt="Zalo" width="100%" height="100%"></a></button>',C="<br />"),c=0==e?`\n                <div class="adstech-group-btn">\n                    ${u}\n                    ${C}\n                    ${m}\n                    ${k}\n                    ${h}\n                    ${$}\n                    ${s}\n                    ${I}\n                    ${p}\n                </div>\n                ${g}\n                ${y}\n                ${f}\n                ${A}\n                ${B}\n                `:`\n                <div class="adstech-group-btn">\n                    ${s}\n                    ${h}\n                    ${p}\n                    ${u}\n                    ${m}\n                </div>\n                ${g}\n                ${y}\n                ${f}\n                ${A}\n                ${B}`;let E=document.createElement("div");if(E.id="adstech-group-btn",document.body.appendChild(E),document.getElementById("adstech-group-btn").innerHTML=c,null!=n&&""!=n&&atLhSend(l,n,d),null!=atLh_styleBtnChat&&""!=atLh_styleBtnChat){let t=document.getElementsByTagName("script");for(let e=0;e<t.length;e++)t[e].src.indexOf("leadpool.adstech.vn/firebase.js")>0&&(atLh_chatminiCRM=new Firebase("https://leadpoolproduct.firebaseio.com/"),atLhConnectToFirebase(l,o,d))}1==atlh_check_devide&&null!=a&&""!=a&&atLhOpenCall(l,a,d)}function openChat(){let t=document.getElementById("chatInputInfo"),e=document.getElementById("chatAdmin");if("block"==t.style.display||"block"==e.style.display)t.style.display="none",e.style.display="none";else{let e=window.localStorage.getItem("leadhub_chatInfo");null!=e&&null!=e&&""!=e?(atlhChatting(),atLhStartChatting()):t.style.display="block"}}function atLhOpenFrom(){"block"==document.getElementById("adstech-form").style.display?document.getElementById("adstech-form").style.display="none":document.getElementById("adstech-form").style.display="block"}function atLhOpenCall(t,e,n){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i))atLhSendTracing("CALL");else{let a='<div class="adstech-leadhub-alert-call" id="adstech-leadhub-alert-call">\n                        <h6>Cảm ơn bạn đã để lại số điện thoại, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</h6>\n                    </div>';document.getElementById("call-adstech").addEventListener("submit",o=>{const l=new FormData(o.target);let i=l.get("nameCall"),r=l.get("phoneCall"),d=[{property:"accountId",value:t},{property:"firstName",value:i},{property:"phone",value:r},{property:"email",value:`${r}@gmail.com`},{property:"buttonGroupId",value:n}];if(null!=e.resourceName&&""!=e.resourceName&&null!=e.resourceName){let t={property:"resourceName",value:e.resourceName};d.push(t)}if(null!=atLh_gclid&&""!=atLh_gclid&&null!=atLh_gclid){let t={property:"gclid",value:atLh_gclid};d.push(t)}o.preventDefault(),adstechCreateLead(d,"CALL"),atLhSendTracing("CALL"),document.getElementById("adstech-call").style.display="none",document.getElementById("adstech-alert-call").innerHTML=a,document.getElementById("adstech-alert-call").style.display="block"})}}function atLhOpenFormCall(){"block"==document.getElementById("adstech-call").style.display?document.getElementById("adstech-call").style.display="none":document.getElementById("adstech-call").style.display="block"}function atLhCloseForm(){document.getElementById("adstech-form").style.display="none"}function atLhCloseAlert(){null!=document.getElementById("adstech-alert-form")&&null!=document.getElementById("adstech-alert-form")&&""!=document.getElementById("adstech-alert-form")&&(document.getElementById("adstech-alert-form").style.display="none"),null!=document.getElementById("adstech-alert-call")&&null!=document.getElementById("adstech-alert-call")&&""!=document.getElementById("adstech-alert-call")&&(document.getElementById("adstech-alert-call").style.display="none"),null!=document.getElementById("adstech-alert-chat")&&null!=document.getElementById("adstech-alert-chat")&&""!=document.getElementById("adstech-alert-chat")&&(document.getElementById("adstech-alert-chat").style.display="none")}function atLhOpenFacebook(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){document.getElementById("adstech-open-fb").classList.add("at-onclick-fb"),window.location=atLh_fb,atLhSendTracing("FACEBOOK")}else{document.getElementById("adstech-open-fb").classList.add("at-onclick-fb"),window.open(atLh_fb),atLhSendTracing("FACEBOOK")}}function atLhOpenZalo(){if(navigator.userAgent.match(/Android/i)||navigator.userAgent.match(/webOS/i)||navigator.userAgent.match(/iPhone/i)||navigator.userAgent.match(/iPad/i)||navigator.userAgent.match(/iPod/i)||navigator.userAgent.match(/BlackBerry/i)||navigator.userAgent.match(/Windows Phone/i)){document.getElementById("adstech-open-zl").classList.add("at-onclick-zl"),window.location=atLh_zl,atLhSendTracing("ZALO")}else{document.getElementById("adstech-open-zl").classList.add("at-onclick-zl"),window.open(atLh_zl),atLhSendTracing("ZALO")}}function atLhGetHour(t){let e="";return e=t.split(" ")[3]}function atLhConnectToFirebase(t,e,n){document.getElementById("atLhSendInfo").addEventListener("submit",a=>{const o=new FormData(a.target);let l=o.get("name");atLh_topic=o.get("topic");let i=[{property:"accountId",value:t},{property:"firstName",value:l},{property:"email",value:atLh_topic},{property:"buttonGroupId",value:n},{property:"resourceName",value:""}];if(null!=e.resourceName&&""!=e.resourceName&&null!=e.resourceName){let t={property:"resourceName",value:e.resourceName};i.push(t)}if(null!=atLh_gclid&&""!=atLh_gclid&&null!=atLh_gclid){let t={property:"gclid",value:atLh_gclid};i.push(t)}adstechCreateLead(i,"CHAT"),document.getElementById("atLhTxtName").innerText=l;let r={name:l,topic:atLh_topic=t+"-"+atLh_topic.replace(/\./g,"-dot-")};window.localStorage.setItem("leadhub_chatInfo",JSON.stringify(r)),atlhChatting(),a.preventDefault();document.getElementById("adstech-alert-chat").innerHTML='<div class="adstech-leadhub-alert-chat" id="adstech-leadhub-alert-chat">\n                        <h6>Cảm ơn bạn đã để lại đăng ký</h6>\n                    </div>',document.getElementById("adstech-alert-chat").style.display="block",atLhStartChatting()})}function atlhChatting(){atLh_chatminiCRM.child(atLh_topic).on("child_added",function(t){let e=t.val(),n="";1!=e.isCustomer&&null!=e.isCustomer||(n=""),0==e.isCustomer&&(n=" (Admin)");let a="";if(""!=n&&null!=n){a=`\n                <div style="width: 80%; float: left; margin-left: 2%; margin-top: 2%;text-align:left">\n                    <span style="background-color: #e5e5e5;border-radius: 10px;padding:5px 10px">${e.name}${n}: ${e.message}</span>\n                </div>`;let t=document.createElement("div");t.className="adstech-row-mesaage",t.innerHTML=a,document.getElementById("atLhMessageContainer").appendChild(t),t.scrollIntoView()}})}function atLhStartChatting(){document.getElementById("chatInputInfo").style.display="none",document.getElementById("chatAdmin").style.display="block",document.getElementById("atLhSendessage").addEventListener("submit",t=>{let e=document.getElementById("atLhTxtText").value;if(""!=e)try{atLhSendessage({topic:atLh_topic,name:document.getElementById("atLhTxtName").innerText,message:e,accountId:atLh_acId,isCustomer:!0}),document.getElementById("atLhTxtText").value="";let t=JSON.parse(localStorage.getItem("leadhub_chatInfo"));var n=`\n                    <div style=" width: 80%; float: right;  color: white; margin-right: 2%; margin-top: 2%;padding:0px 5px;text-align:right">\n                        <span style="border-radius: 10px;background-color: ${atLh_styleBtnChat.buttonColor};padding:5px 10px">${t.name}: ${e}</span>\n                    </div>`;let a=document.createElement("div");a.className="adstech-row-mesaage",a.innerHTML=n,document.getElementById("atLhMessageContainer").appendChild(a),a.scrollIntoView()}catch(t){alert(t)}t.preventDefault()})}function atLhSendessage(t){fetchRetry(`${atLh_rqApi}/chats`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)},5).then(t=>{console.log(t)}).catch(t=>{console.log(t)})}function atLhSend(t,e,n){let a=`<div class="adstech-leadhub-alert-form" id="adstech-leadhub-alert-form">\n                        <h6>${atlh_form_return}</h6>\n                    </div>`;document.getElementById("form-adstech").addEventListener("submit",o=>{const l=new FormData(o.target);let i=l.get("email"),r=l.get("name"),d=l.get("phone"),c=l.get("city"),s=l.get("bussiness"),h=[{property:"accountId",value:t},{property:"email",value:i},{property:"buttonGroupId",value:n}];if(null!=r&&""!=r&&null!=r){let t={property:"firstName",value:r};h.push(t)}if(null!=d&&""!=d&&null!=d){let t={property:"phone",value:d};h.push(t)}if(null!=c&&""!=c&&null!=c){let t={property:"city",value:c};h.push(t)}if(null!=s&&""!=s&&null!=s){let t={property:"bussiness",value:s};h.push(t)}if(null!=e.resourceName&&""!=e.resourceName&&null!=e.resourceName){let t={property:"resourceName",value:e.resourceName};h.push(t)}if(null!=atLh_gclid&&""!=atLh_gclid&&null!=atLh_gclid){let t={property:"gclid",value:atLh_gclid};h.push(t)}adstechCreateLead(h,"FORM"),atLhSendTracing("FORM"),o.preventDefault(),atLhCloseForm(),document.getElementById("adstech-alert-form").innerHTML=a,document.getElementById("adstech-alert-form").style.display="block"})}function adstechCreateLead(t,e){let n=null;fetchRetry(n=null==email?`${atLh_rqApi}/contacts?source_from_mar=${e}`:`${atLh_rqApi}/contacts?source_from_mar=${e}&email_noti=${email}`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)},4).then(e=>{"SUCCESS"==e.code||"SPAM SERVER"==e.message?(localStorage.removeItem("lead"),setTimeout(function(){atLhCloseAlert()},2e3)):(localStorage.setItem("lead",JSON.stringify(t)),setTimeout(function(){atLhCloseAlert()},2e3))}).catch(e=>{localStorage.setItem("lead",JSON.stringify(t)),setTimeout(function(){atLhCloseAlert()},2e3)})}function atLhSendTracing(t){let e={type:t,accountId:atLh_acId,link:atLh_url};null!=atLh_utm_source&&(e.utm_source=atLh_utm_source),null!=atLh_utm_medium&&(e.utm_medium=atLh_utm_medium),null!=atLh_utm_campaign&&(e.utm_campaign=atLh_utm_campaign),null!=atLh_utm_term&&(e.utm_term=atLh_utm_term),null!=atLh_utm_content&&(e.utm_content=atLh_utm_content),null!=atLh_gclid&&(e.gclid=atLh_gclid),fetchRetry(`${atLh_rqApi}/tracking-source-utm`,{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(e)},4).then(t=>{console.log(t)})}