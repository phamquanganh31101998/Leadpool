var atLh_tag = document.createElement('script');
atLh_tag.src = "https://leadpool.adstech.vn/firebase.js";
atLh_tag.type = "text/javascript";
atLh_tag.setAttribute('defer','');
var atLh_scripts = document.getElementsByTagName("script")[0]
atLh_scripts.parentNode.insertBefore(atLh_tag, atLh_scripts);
window.onload = adstechLeadhubOnload
var atLh_acId = ''
var atLh_topic = ''
var atLh_fb = ''
var atLh_zl = ''
var atlh_re_fb = ''
var atlh_rs_zl = ''
var atLh_url = window.location.href
var atLh_arrTrack = []
var atLh_styleBtnChat = ''
var atLh_chatminiCRM = null
var atlh_check_devide = false
var atlh_form_return = ''
var email = null
var atLh_rqApi = 'https://services.adstech.vn/leadpool/v1/leadhub'
//product: https://services.adstech.vn/leadpool/v1/leadhub
//test: http://dev.adstech.vn:9000/leadhub
function adstechLeadhubOnload() {
    var atLh_btnId = ''
    var atLh_scripts = document.getElementsByTagName("script")
    let atLh_lead_out = localStorage.getItem('lead')
    if (atLh_lead_out != null && atLh_lead_out != undefined && atLh_lead_out != '') {
        adstechCreateLead(JSON.parse(atLh_lead_out),'FORM')
    }
    for (let i = 0; i < atLh_scripts.length; i++) {
        if (atLh_scripts[i].src.indexOf('&gBtnId=') > 0) {
            var src = atLh_scripts[i].src.split('?')[1]
            var accid = src.split('&')[0]
            atLh_acId = accid.split('=')[1]
            var GbtnId = src.split('&')[1]
            atLh_btnId = GbtnId.split('=')[1]
        }
    }
    var atLh_track = ''
    if (atLh_url.indexOf('?') > 0) {
        atLh_track = atLh_url.split('?')[1]
        atLh_arrTrack = atLh_track.split('&')
    } else {
        atLh_track = null
    }
    if (atLh_track == '' || atLh_track == null) {
        atLh_utm_source = null
        atLh_utm_medium = null
        atLh_utm_campaign = null
        atLh_utm_term = null
        atLh_utm_content = null
        atLh_gclid = null
    }else{
        for(let index = 0; index < atLh_arrTrack.length; index++){
            if(atLh_arrTrack[index].indexOf('utm_source') == 0){
                localStorage.setItem('atLh_utm_source', atLh_arrTrack[index].split('=')[1])
            }else if(atLh_arrTrack[index].indexOf('utm_medium') == 0){
                localStorage.setItem('atLh_utm_medium',atLh_arrTrack[index].split('=')[1])
            }else if(atLh_arrTrack[index].indexOf('utm_campaign') == 0){
                localStorage.setItem('atLh_utm_campaign',atLh_arrTrack[index].split('=')[1])
            }else if(atLh_arrTrack[index].indexOf('utm_term') == 0){
                localStorage.setItem('atLh_utm_term',atLh_arrTrack[index].split('=')[1])
            }else if(atLh_arrTrack[index].indexOf('utm_content') == 0){
                localStorage.setItem('atLh_utm_content',atLh_arrTrack[index].split('=')[1])
            }else if(atLh_arrTrack[index].indexOf('gclid') == 0){
                localStorage.setItem('atLh_gclid',atLh_arrTrack[index].split('=')[1])
            }
        }
    }
    fetchRetry(`${atLh_rqApi}/account/${atLh_acId}/group-buttons/${atLh_btnId}`, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }, 4).then(result => {
        var atLh_style = result.response.style
        var atLh_vertical = result.response.vertical
        var atLh_styleBtnCall = null
        var atLh_styleBtnForm = null
        var atLh_styleBtnFacebook = null
        var atLh_styleBtnZalo = null
        for (let i = 0; i < result.response.listButton.length; i++) {
            if (result.response.listButton[i].type == "CALL") {
                atLh_styleBtnCall = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "FORM") {
                atLh_styleBtnForm = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "CHAT") {
                atLh_styleBtnChat = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "FACEBOOK") {
                atLh_styleBtnFacebook = result.response.listButton[i]
                atlh_re_fb = result.response.listButton[i].resourceName
            } else if (result.response.listButton[i].type == "ZALO") {
                atLh_styleBtnZalo = result.response.listButton[i]
                atlh_rs_zl = result.response.listButton[i].resourceName
            }
        }
        adstechLeadhubWriteHtml(atLh_style, atLh_vertical, atLh_styleBtnForm, atLh_styleBtnCall, atLh_styleBtnChat, atLh_acId, atLh_styleBtnFacebook, atLh_styleBtnZalo, atLh_btnId)
        let leadhub_chatInfo = window.localStorage.getItem('leadhub_chatInfo')
        if (leadhub_chatInfo != null && leadhub_chatInfo != undefined && leadhub_chatInfo != '') {
            let chatInfo = JSON.parse(leadhub_chatInfo)
            document.getElementById('atLhTxtName').innerText = chatInfo.name;
            atLh_topic = chatInfo.topic;
        }
        if(result.response.createdBy != null){email = result.response.createdBy}
    })
}
async function fetchRetry(url, options, n) {
    for (let i = 0; i < n; i++) {

        try {
            return await fetch(url, options).then(handle).then(result => {
                return result
            })
        } catch (err) {
            const isLastAttempt = i + 1 === n;
            if (isLastAttempt) throw err;
        }
    }
}
function handle(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (response.ok) return data;

        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
    });
}
function adstechLeadhubWriteHtml(style, vertical, styleBtnForm, styleBtnCall, styleBtnChat, atLh_acId, styleBtnFacebook, styleBtnZalo, gBtnId) {
    let atLh_html = ''
    let atLh_call = ''
    let atLh_form = ''
    let atLh_chat = ''
    let facebook = ''
    let zalo = ''
    let atLh_chatInputInfoDialog = ''
    let atLh_chatWithAdmin = ''
    let atLh_form1 = ''
    let phone = ''
    let email = ''
    let name = ''
    let city = ''
    let bussiness = ''
    let position = ''
    let brCall = ''
    let brForm = ''
    let brChat = ''
    let brZalo = ''
    let formCall = ''
    if (style.left == '45') {
        position = `.adstech-group-btn {
            position:fixed;
            bottom: ${style.bottom -3}%;
            left: ${parseInt(style.left)+2}%;
            right: ${style.right}%;
            top:${style.top}%;
            z-index: 99999999;
        }`
    } else {
        position = `.adstech-group-btn {
            position:fixed;
            bottom: ${style.bottom - 3}%;
            left: ${parseInt(style.left) -1}%;
            right: ${parseInt(style.right) -1}%;
            top:${style.top}%;
            z-index: 99999999;
        }`
    }
    let css = `<style>
                    ${position}

                    .adstech-btn {
                        border: none;
                        color: white;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        margin: 4px 2px;
                        border-radius: 50%;
                        width: ${style.size}px;
                        height:${style.size}px;
                        box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.5);
                    }
                    
                    #chatAdmin .input-group-sm>.form-control:not(textarea) {
                        height: calc(1.5em + 1rem + 2px) !important;
                    }
                    .adstech-form {
                        display: none;
                        position: fixed;
                        text-align:center;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        border: 3px solid #f1f1f1;
                        z-index: 99999999;
                        background-color:#fff;
                    }
                    #adstech-form{
                        padding-bottom:20px
                    }
                    #adstech-form ::-webkit-scrollbar {
                        width: 8px;
                        height: 10px;
                        z-index: 999;
                    }
                
                    /* Handle */
                    #adstech-form ::-webkit-scrollbar-thumb {
                        -webkit-border-radius: 15px;
                        border-radius: 15px;
                        background: #eff2f9;
                    }
                    /* Add styles to the form container */
                    .adstech-form-container {
                        max-width: 400px;
                        padding: 10px;
                        background-color: #fff;
                    }

                    /* Full-width input fields */
                    .adstech-form-container input[type=text],
                    .adstech-form-container input[type=email], 
                    .adstech-form-container input[type=tel]{
                        width: 90%;
                        padding: 15px;
                        margin: 5px 0 22px 0;
                        border: none;
                        background: #f1f1f1;
                    }

                    /* When the inputs get focus, do something */
                    .adstech-form-container input[type=text]:focus,
                    .adstech-form-container input[type=email]:focus,
                    .adstech-form-container input[type=tel]:focus {
                        background-color: #ddd;
                        outline: none;
                    }

                    /* Set a style for the submit/login button */
                    .adstech-form-container .btn-adstech {
                        color: white;
                        border: none;
                        cursor: pointer;
                        width: 100% !important;
                        margin-bottom: 10px;
                        opacity: 0.8;
                        float: left;
                        z-index: 9999999;
                        height:40px;
                    }

                    /* Add a red background color to the cancel button */
                    .adstech-form-container .cancel-adstech {
                        background-color: #999;
                    }

                    /* Add some hover effects to buttons */
                    .adstech-form-container .btn-adstech:hover,
                    .open-button:hover {
                        opacity: 1;
                    }
                    .adstech-alert {
                        padding: 20px;
                        background-color:#d4edda;
                        color: #155724;
                        margin-bottom: 15px;
                        display: none;
                        max-width:400px;
                        position: fixed;
                        text-align:center;
                        left: 50%;
                        top: 50%;
                        z-index: 9999999;
                        transform: translate(-50%,-50%);
                    }
                    .adstech-chat-form{
                        width:400px;
                    }
                    .adstech-row-mesaage{
                        width:100%;
                        padding-top: 5%;
                    }
                    @media only screen and (max-width: 420px) {
                        .adstech-form-container {
                            width: 300px;
                            padding: 10px;
                            z-index: 99999999;
                            background-color: #fff;
                        }
                        .adstech-chat-form{
                            width:100%;
                            margin-left:5%
                        }
                    }
                    @media screen and (max-width: 1024px) and (min-width: 450px) {
                        .adstech-chat-form{
                            width:100%;
                            margin-left:10%
                        }
                    }
                </style>`
    if (styleBtnCall == null || styleBtnCall == '') {
        atLh_call = ''
    } else {
        if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
            if (style.color == "#fff") {
                atLh_call = `<button class="adstech-btn" onclick="atLhOpenCall()" style="background-color:${styleBtnCall.buttonColor};padding:0px;border-radius:50% !important">
                            <a href="tel:${styleBtnCall.phoneNumber}" style="width:100%;height:100%">
                                <img src="https://leadpool.adstech.vn/call-white.png" style="max-width:${style.size - 18}px;height:${style.size -18}" alt="Gọi điện thoại" width="${style.size - 18}px" height="${style.size -18}px">
                            </a>
                        </button>`
            } else if (style.color == "#000") {
                atLh_call = `<button class="adstech-btn" onclick="atLhOpenCall()" style="background-color:${styleBtnCall.buttonColor};padding:0px;border-radius:50% !important">
                            <a href="tel:${styleBtnCall.phoneNumber}" style="width:100%;height:100%">
                                <img src="https://leadpool.adstech.vn/call-black.png" style="max-width:${style.size - 18}px;height:${style.size -18}"  alt="Gọi điện thoại" width="${style.size -18}px" height="${style.size -18}px">
                            </a>
                        </button>`
            }
            atlh_check_devide = false
            brCall = '<br />'
        }
        else{
            if (style.color == "#fff") {
                atLh_call = `<button class="adstech-btn" onclick="atLhOpenFormCall()" style="background-color:${styleBtnCall.buttonColor};padding:0px;border-radius:50% !important">
                            <a style="width:100%;height:100%">
                                <img src="https://leadpool.adstech.vn/call-white.png" style="max-width:${style.size - 18}px;height:${style.size -18}"  alt="Gọi điện thoại" width="${style.size -18}px" height="${style.size -18}px">
                            </a>
                        </button>`
            } else if (style.color == "#000") {
                atLh_call = `<button class="adstech-btn" onclick="atLhOpenFormCall()" style="background-color:${styleBtnCall.buttonColor};padding:0px;border-radius:50% !important">
                            <a style="width:100%;height:100%">
                                <img src="https://leadpool.adstech.vn/call-black.png" style="max-width:${style.size - 18}px;height:${style.size -18}"  alt="Gọi điện thoại" width="${style.size -18}px" height="${style.size -18}px">
                            </a>
                        </button>`
            }
            formCall = `<div class="adstech-form" id="adstech-call">
                            <div style="float:right;margin-top:2px; margin-right:5px; color:red;text-align:center">
                                <a href="javascript:void(0);" onclick="document.getElementById('adstech-call').style.display='none'" style="width:25px;height:25px;border-radius:50%; background-color:#fff; box-shadow:none;border: none;font-size:25px;color:red">&times;</a>
                            </div>
                            <form class="adstech-form-container" id="call-adstech" method="POST">
                                <h3>Gọi ngay cho chúng tôi theo số : ${styleBtnCall.phoneNumber} hoặc</h3>
                                <h3>Để lại thông tin để chúng tôi liên hệ với bạn</h3>
                                <input type="text" placeholder="Họ và tên" name="nameCall" required>
                                <input type="tel" placeholder="Số điện thoại" pattern="[0]{1}[0-9]{9}" title="Nhập đúng số điện thoại của bạn" name="phoneCall" required>
                                <div style="padding:0px 14px 0px 14px">
                                    <input type="submit" class="btn-adstech" value="Yêu cầu gọi lại" style="background-color:${styleBtnCall.buttonColor};"/>
                                </div>
                            </form>
                        </div>
                        <div class="adstech-alert" id="adstech-alert-call"></div>`
            brCall = '<br />'
            atlh_check_devide = true
        }
    }
    if (styleBtnChat == null || styleBtnChat == '') {
        atLh_chat = ''
    } else {
        if (style.color == "#fff") {
            atLh_chat = `<button class="adstech-btn" style="background-color:${styleBtnChat.buttonColor};padding:0px;border-radius:50% !important" onclick="openChat()">
                    <img src="https://leadpool.adstech.vn/question_answer-white.png" alt="Chat" style="max-width:${style.size - 18}px;height:${style.size -18}"  width="${style.size - 18}px" height="${style.size -18}px">
                </button>`
        } else if (style.color == "#000") {
            atLh_chat = `<button class="adstech-btn" style="background-color:${styleBtnChat.buttonColor};padding:0px;border-radius:50% !important" onclick="openChat()">
                    <img src="https://leadpool.adstech.vn/question_answer-black.png" alt="Chat" style="max-width:${style.size - 18}px;height:${style.size -18}"  width="${style.size - 18}px" height="${style.size -18}px">
                </button>`
        }
        brChat = '<br />'
        atLh_chatInputInfoDialog = `
            <div id="chatInputInfo" style="z-index: 99999999; display: none;  position: fixed; bottom: 5%; right: 5%; padding:10px; max-width:400px">
                <div class="adstech-chat-form">
                    <div style="border: 1px solid ${styleBtnChat.buttonColor}">
                        <div style="float:right;margin-top:2px; margin-right:5px; color:red;text-align:center">
                            <a href="javascript:void(0);" onclick="document.getElementById('chatInputInfo').style.display='none'" style="width:25px;height:25px;border-radius:50%; background-color:${styleBtnChat.buttonColor}; box-shadow:none;border: none;font-size:25px;color:red">&times;</a>
                        </div>
                        <div style="padding:10px;border: 1px solid ${styleBtnChat.buttonColor}; background-color: ${styleBtnChat.buttonColor};">
                            <h6 style="color: white; margin:auto" class="panel-title">Hãy cho chúng tôi biết bạn là ai</h6>
                        </div> 
                        <div style="padding:15px; background-color:#fff"> 
                            <form class='adstech-form-container' id="atLhSendInfo" method="POST">
                                <input style="width: 100%;margin-top:-10px !important" type="text" class="form-control" required name="name" placeholder="Tên">
                                <input style="width: 100%;margin-top:-10px !important" type="text" class="form-control" required name="topic" placeholder="Email/Số điện thoại">
                                <input style="width:100%;color: white; background-color: ${styleBtnChat.buttonColor};margin-top:-20px" class="btn-adstech" type="submit" id="btnSend" value="Gửi thông tin">
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div class="adstech-alert" id="adstech-alert-chat"></div>
        `
        atLh_chatWithAdmin = `
            <div id="chatAdmin" style="z-index: 99999999;background-color:#fff !important; display: none; position: fixed; bottom: 5%; right: 5%; max-width:400px">
                <div style="background-color: ${styleBtnChat.buttonColor};width:100%">
                    <div style="width:10%;float:right;margin-top:5px; margin-right:10px; color:red;text-align:center">
                        <a href="javascript:void(0);" onclick="document.getElementById('chatAdmin').style.display='none'" style="width:25pxheight:25px;border-radius:50%; background-color:transparent; box-shadow:none;border: none;font-size:25px;color:red">x</a>
                    </div>
                    <div style="width:90%;padding:10px;border: 1px solid ${styleBtnChat.buttonColor}; background-color: transparent;">
                        <h6 style="color: white; ">Xin chào, <span id="atLhTxtName"></span>. Hãy chat với chúng tôi</h6>
                    </div>
                    <div style="height: 350px;background-color:#fff; overflow-y: scroll; width:100%">
                        <div id="atLhMessageContainer" style="width:100%">
                        </div>
                    </div>
                    <div style="background-color:#fff" style="clear:both">
                        <form id="atLhSendessage" method="POST" style="background-color:#fff">
                            <span style="width:100%">
                                <div style="width:80%;float:left"><input type="text" required class="form-control" id="atLhTxtText"placeholder="nói gì đó .."></div>
                                <div style="width:20%;float:left"><input class="btn" style="width:100%;color: white; background-color: ${styleBtnChat.buttonColor};" type="submit" id="btnSend" value="Gửi"></div>
                            </span>
                        </form>
                    </div>
                </div>
            </div>
        `
    }
    if (styleBtnForm == null || styleBtnForm == '') {
        atLh_form = ''
        atLh_form1 = ''
    } else {
        for (let i = 0; i < styleBtnForm.properties.length; i++) {
            if (styleBtnForm.properties[i] == 'email') {
                email = `<input type="email" placeholder="Địa chỉ email" name="email" pattern="[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$" title="Nhập đúng email của bạn" required>`
            } else if (styleBtnForm.properties[i] == "lastName") {
                name = `<input type="text" placeholder="Họ và tên" name="name" required>`
            } else if (styleBtnForm.properties[i] == 'phone') {
                phone = `<input type="tel" placeholder="Số điện thoại" pattern="[0]{1}[0-9]{9}" title="Nhập đúng số điện thoại của bạn" name="phone" required>`
            } else if (styleBtnForm.properties[i] == 'city') {
                city = `<input type="text" placeholder="Địa chỉ" name="city" required>`
            } else if (styleBtnForm.properties[i] == 'bussiness') {
                bussiness = `<input type="text" placeholder="Nghề nghiệp" name="bussiness" required>`
            }
        }
        if (style.color == "#fff") {
            atLh_form = `<button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor};padding:0px;border-radius:50% !important" onclick="atLhOpenFrom()">
                    <img src="https://leadpool.adstech.vn/mail-white.png" alt="Đăng ký ngay" style="max-width:${style.size - 18}px;height:${style.size -18}"  width="${style.size -18}px" height="${style.size -18}px">
                </button>`
        } else if (style.color == "#000") {
            atLh_form = `<button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor};padding:0px;border-radius:50% !important" onclick="atLhOpenFrom()">
                    <img src="https://leadpool.adstech.vn/mail-black.png" alt="Đăng ký ngay" style="max-width:${style.size - 18}px;height:${style.size -18}"  width="${style.size -18}px" height="${style.size -18}px">
                </button>`
        }
        atLh_form1 = `<div class="adstech-form" id="adstech-form">
                        <div style="float:right;margin-top:5px; margin-right:10px; color:red;text-align:center"><a href="javascript:void(0);" onclick="document.getElementById('adstech-form').style.display='none'" style="border-radius:50%; background-color:#fff; box-shadow:none;border: none; width:20px;height:20px;font-size:25px;color:red">&times;</a></div>
                        <form class="adstech-form-container" id="form-adstech" method="POST">
                            <h3>${styleBtnForm.title}</h3>
                            ${name}
                            ${phone}
                            ${email}
                            ${city}
                            ${bussiness}
                            <div style="padding:0px 14px 0px 14px">
                                <input type="submit" class="btn-adstech" style="background-color:${styleBtnForm.buttonColor};color:white" value="${styleBtnForm.description}">
                            </div>
                        </form>
                    </div>
                    <div class="adstech-alert" id="adstech-alert-form">
                    </div>`
        brForm = '<br />'
        atlh_form_return = styleBtnForm.formMessageReturn
    }
    if (styleBtnFacebook == null || styleBtnFacebook == '') {
        facebook = ''
    } else {
        atLh_fb = `https://m.me/${styleBtnFacebook.phoneNumber}`
        facebook = '<button class="adstech-btn" style="padding:0px;border-radius:50% !important" onclick="atLhOpenFacebook()"><a><img src="https://leadpool.adstech.vn/mess.png" id="adstech-open-fb" alt="Facebook" width="100%" height="100%"></a></button>'
    }
    if (styleBtnZalo == null || styleBtnZalo == '') {
        zalo = ''
    } else {
        atLh_zl = `https://zalo.me/${styleBtnZalo.phoneNumber}`
        zalo = '<button class="adstech-btn" style="padding:0px;border-radius:50% !important" onclick="atLhOpenZalo()"><a><img src="https://leadpool.adstech.vn/zalo.png" id="adstech-open-zl" alt="Zalo" width="100%" height="100%"></a></button>'
        brZalo = '<br />'
    }
    if (vertical == false) {
        atLh_html = `
                <div class="adstech-group-btn">
                    ${facebook}
                    ${brZalo}
                    ${zalo}
                    ${brForm}
                    ${atLh_form}
                    ${brCall}
                    ${atLh_call}
                    ${brChat}
                    ${atLh_chat}
                </div>
                ${atLh_chatInputInfoDialog}
                ${atLh_chatWithAdmin}
                ${atLh_form1}
                ${css}
                ${formCall}
                `
    } else {
        atLh_html = `
                <div class="adstech-group-btn">
                    ${atLh_call}
                    ${atLh_form}
                    ${atLh_chat}
                    ${facebook}
                    ${zalo}
                </div>
                ${atLh_chatInputInfoDialog}
                ${atLh_chatWithAdmin}
                ${atLh_form1}
                ${css}
                ${formCall}`
    }

    let div = document.createElement("div");
    div.id = "adstech-group-btn";
    document.body.appendChild(div);
    document.getElementById("adstech-group-btn").innerHTML = atLh_html;
    // var atLh_chatminiCRM = new Firebase('https://minicrm-245403.firebaseio.com/');
    if (styleBtnForm != null && styleBtnForm != '') {
        atLhSend(atLh_acId,styleBtnForm,gBtnId)
    }
    if (atLh_styleBtnChat != null && atLh_styleBtnChat != '') {
        let atLh_scripts = document.getElementsByTagName("script")
        for (let index = 0; index < atLh_scripts.length; index++) {
            if (atLh_scripts[index].src.indexOf('leadpool.adstech.vn/firebase.js') > 0) {
                atLh_chatminiCRM = new Firebase('https://leadpoolproduct.firebaseio.com/');
                atLhConnectToFirebase(atLh_acId,styleBtnChat,gBtnId)
            }
        }
    }
    if(atlh_check_devide == true && styleBtnCall != null && styleBtnCall != ''){
        atLhOpenCall(atLh_acId,styleBtnCall,gBtnId)
    }
}
function openChat() {
    let chatInputInfo = document.getElementById("chatInputInfo")
    let chatAdmin = document.getElementById("chatAdmin")
    if (chatInputInfo.style.display == 'block' || chatAdmin.style.display == 'block') {
        chatInputInfo.style.display = 'none'
        chatAdmin.style.display = 'none'
    } else {
        let hasInfo = window.localStorage.getItem('leadhub_chatInfo')
        if (hasInfo != undefined && hasInfo != null && hasInfo != '') {
            atlhChatting()
            atLhStartChatting()
        } else {
            chatInputInfo.style.display = 'block'
        }
    }

}
function atLhOpenFrom() {
    let atLh_checkForm = document.getElementById("adstech-form")
    if(atLh_checkForm.style.display == 'block'){
        document.getElementById("adstech-form").style.display = 'none'
    }else{
        document.getElementById("adstech-form").style.display = 'block'
    }
}
function atLhOpenCall(atLh_acId,styCall,gBtnId){
    if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
        atLhSendTracing('CALL',styCall.resourceName)
    }
    else {
        let alert = `<div class="adstech-leadhub-alert-call" id="adstech-leadhub-alert-call">
                        <h6>Cảm ơn bạn đã để lại số điện thoại, chúng tôi sẽ liên hệ với bạn trong thời gian sớm nhất</h6>
                    </div>`
        const form = document.getElementById("call-adstech")
        form.addEventListener('submit', e => {
            const formData = new FormData(e.target)
            let name = formData.get('nameCall')
            let phone = formData.get('phoneCall')
            let body = [{
                property: 'accountId',
                value: atLh_acId
            }, {
                property: 'firstName',
                value: name
            }, {
                property: 'phone',
                value: phone
            }, {
                property: 'email',
                value: `${phone}@gmail.com`
            }, {
                property: 'buttonGroupId',
                value: gBtnId
            }]
            if(styCall.resourceName != undefined && styCall.resourceName != '' && styCall.resourceName != null){
                let a = {
                    property: 'resourceName',
                    value: styCall.resourceName
                }
                body.push(a)
            }
            if(atLh_gclid != undefined && atLh_gclid != '' && atLh_gclid!= null){
                let a = {
                    property: 'gclid',
                    value: atLh_gclid
                }
                body.push(a)
            }
            e.preventDefault()
            adstechCreateLead(body,'CALL')
            atLhSendTracing('CALL',styCall.resourceName)
            document.getElementById("adstech-call").style.display = "none"
            document.getElementById("adstech-alert-call").innerHTML = alert
            document.getElementById("adstech-alert-call").style.display = "block";
        })
    }
}
function atLhOpenFormCall(){
    let atLh_checkForm = document.getElementById("adstech-call")
    if(atLh_checkForm.style.display == 'block'){
        document.getElementById("adstech-call").style.display = "none"
    }else{
        document.getElementById("adstech-call").style.display = 'block'
    }
}
function atLhCloseForm() {
    document.getElementById("adstech-form").style.display = "none";
}
function atLhCloseAlert() {
    if(document.getElementById("adstech-alert-form") != null && document.getElementById("adstech-alert-form") != undefined && document.getElementById("adstech-alert-form") != ''){
        document.getElementById("adstech-alert-form").style.display = "none";
    }
    if(document.getElementById("adstech-alert-call") != null && document.getElementById("adstech-alert-call") != undefined && document.getElementById("adstech-alert-call") != ''){
        document.getElementById("adstech-alert-call").style.display = "none";
    }
    if(document.getElementById("adstech-alert-chat") != null && document.getElementById("adstech-alert-chat") != undefined && document.getElementById("adstech-alert-chat") != ''){
        document.getElementById("adstech-alert-chat").style.display = "none";
    }
}
function atLhOpenFacebook() {
    if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
        let element = document.getElementById("adstech-open-fb")
        element.classList.add("at-onclick-fb",)
        window.location = atLh_fb
        atLhSendTracing('FACEBOOK',atlh_re_fb)
    }
    else {
        let element = document.getElementById("adstech-open-fb")
        element.classList.add("at-onclick-fb")
        window.open(atLh_fb)
        atLhSendTracing('FACEBOOK',atlh_re_fb)
    }
}
function atLhOpenZalo() {
    if(navigator.userAgent.match(/Android/i) || navigator.userAgent.match(/webOS/i) || navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/BlackBerry/i) || navigator.userAgent.match(/Windows Phone/i)){
        let element = document.getElementById("adstech-open-zl")
        element.classList.add("at-onclick-zl")
        window.location = atLh_zl
        atLhSendTracing('ZALO',atlh_re_zl)
    }
    else {
        let element = document.getElementById("adstech-open-zl")
        element.classList.add("at-onclick-zl")
        window.open(atLh_zl)
        atLhSendTracing('ZALO',atlh_re_zl)
    }
}
function atLhGetHour(time) {
    let result = ''
    let timeArr = time.split(' ')
    result = timeArr[3]
    return result
}
function atLhConnectToFirebase(atLh_acId,styChat,gBtnId) {
    let form = document.getElementById("atLhSendInfo")
    form.addEventListener('submit', e => {
        const formData = new FormData(e.target)
        let name = formData.get('name')
        atLh_topic = formData.get('topic')
        let body = [
            {
                property: 'accountId',
                value: atLh_acId
            },
            {
                property: 'firstName',
                value: name
            },
            {
                property: 'email',
                value: atLh_topic
            },
            { 
                property: 'buttonGroupId',
                value: gBtnId
            }
        ]
        if(styChat.resourceName != undefined && styChat.resourceName != '' && styChat.resourceName != null){
            let a = {
                property: 'resourceName',
                value: styChat.resourceName
            }
            body.push(a)
        }
        if(atLh_gclid != undefined && atLh_gclid != '' && atLh_gclid!= null){
            let a = {
                property: 'gclid',
                value: atLh_gclid
            }
            body.push(a)
        }
        adstechCreateLead(body,'CHAT')
        document.getElementById('atLhTxtName').innerText = name
        atLh_topic = atLh_acId + '-' + atLh_topic.replace(/\./g, '-dot-')
        let obj = {
            name: name,
            topic: atLh_topic
        }
        window.localStorage.setItem('leadhub_chatInfo', JSON.stringify(obj))
        atlhChatting()
        e.preventDefault()
        let alert = `<div class="adstech-leadhub-alert-chat" id="adstech-leadhub-alert-chat">
                        <h6>Cảm ơn bạn đã để lại đăng ký</h6>
                    </div>`
        document.getElementById("adstech-alert-chat").innerHTML = alert
        document.getElementById("adstech-alert-chat").style.display = "block";
        atLhStartChatting()
    })
}
function atlhChatting() {
    atLh_chatminiCRM.child(atLh_topic).on('child_added', function (snapshot) {
        let message = snapshot.val()
        let isCustomer = ''
        if (message.isCustomer == true || message.isCustomer == null) {
            isCustomer = ''
        }
        if (message.isCustomer == false) {
            isCustomer = ' (Admin)'
        }
        let atLh_html = ''
        if(isCustomer != '' && isCustomer != null){
            atLh_html = `
                <div style="width: 80%; float: left; margin-left: 2%; margin-top: 2%;text-align:left">
                    <span style="background-color: #e5e5e5;border-radius: 10px;padding:5px 10px">${message.name}${isCustomer}: ${message.message}</span>
                </div>`
                let div = document.createElement("div")
                div.className  = "adstech-row-mesaage";
                div.innerHTML = atLh_html
                document.getElementById("atLhMessageContainer").appendChild(div);
                div.scrollIntoView()
        }
        
    })
}
function atLhStartChatting() {
    document.getElementById("chatInputInfo").style.display = "none"
    document.getElementById("chatAdmin").style.display = "block"
    let form = document.getElementById("atLhSendessage")
    form.addEventListener('submit', e => {
        let text = document.getElementById('atLhTxtText').value
        if (text != '') {
            try {
                var body = {
                    topic: atLh_topic,
                    name: document.getElementById('atLhTxtName').innerText,
                    message: text,
                    accountId: atLh_acId,
                    isCustomer: true
                }
                atLhSendessage(body)
                document.getElementById('atLhTxtText').value = ''
                let user = JSON.parse(localStorage.getItem('leadhub_chatInfo'))
                var atLh_html = `
                    <div style=" width: 80%; float: right;  color: white; margin-right: 2%; margin-top: 2%;padding:0px 5px;text-align:right">
                        <span style="border-radius: 10px;background-color: ${atLh_styleBtnChat.buttonColor};padding:5px 10px">${user.name}: ${text}</span>
                    </div>`
                let div = document.createElement("div")
                div.className  = "adstech-row-mesaage";
                div.innerHTML = atLh_html
                document.getElementById("atLhMessageContainer").appendChild(div);
                div.scrollIntoView()
            } catch (error) {
                alert(error)
            }
        }
        e.preventDefault()
    })
}
function atLhSendessage(body) {
    fetchRetry(`${atLh_rqApi}/chats`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }, 5).then(result => {
        console.log(result)
    }).catch(error => {
        console.log(error)
    })
}
function atLhSend(atLh_acId,styForm,gBtnId) {
    let alert = `<div class="adstech-leadhub-alert-form" id="adstech-leadhub-alert-form">
                        <h6>${atlh_form_return}</h6>
                    </div>`
    const form = document.getElementById("form-adstech")
    form.addEventListener('submit', e => {
        const formData = new FormData(e.target)
        let email = formData.get('email')
        let name = formData.get('name')
        let phone = formData.get('phone')
        let city = formData.get('city')
        let bussiness = formData.get('bussiness')
        let body = [{
            property: 'accountId',
            value: atLh_acId
        }, {
            property: 'email',
            value: email
        },{
            property: 'buttonGroupId',
            value: gBtnId
        }]
        if (name != undefined && name != '' && name != null) {
            let a = {
                property: 'firstName',
                value: name
            }
            body.push(a)
        }
        if (phone != undefined && phone != '' && phone != null) {
            let a = {
                property: 'phone',
                value: phone
            }
            body.push(a)
        }
        if (city != undefined && city != '' && city != null) {
            let a = {
                property: 'city',
                value: city
            }
            body.push(a)
        }
        if (bussiness != undefined && bussiness != '' && bussiness != null) {
            let a = {
                property: 'bussiness',
                value: bussiness
            }
            body.push(a)
        }
        if(styForm.resourceName != undefined && styForm.resourceName != '' && styForm.resourceName != null){
            let a = {
                property: 'resourceName',
                value: styForm.resourceName
            }
            body.push(a)
        }
        if(atLh_gclid != undefined && atLh_gclid != '' && atLh_gclid!= null){
            let a = {
                property: 'gclid',
                value: atLh_gclid
            }
            body.push(a)
        }
        adstechCreateLead(body,'FORM')
        atLhSendTracing('FORM',styForm.resourceName)
        e.preventDefault()
        atLhCloseForm()
        document.getElementById("adstech-alert-form").innerHTML = alert
        document.getElementById("adstech-alert-form").style.display = "block";
    })
}
function adstechCreateLead(body,btn) {
    let url = null
    if (email == null){
        url = `${atLh_rqApi}/contacts?source_from_mar=${btn}`
    }else{
        url = `${atLh_rqApi}/contacts?source_from_mar=${btn}&email_noti=${email}`
    }
    fetchRetry(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }, 4).then(result => {
        if (result.code == "SUCCESS" || result.message == "SPAM SERVER") {
            localStorage.removeItem('lead')
            setTimeout(function () {
                atLhCloseAlert()
            }, 2000)
        } else {
            localStorage.setItem('lead',JSON.stringify(body))
            setTimeout(function () {
                atLhCloseAlert()
            }, 2000)
        }
    }).catch(err =>{
        localStorage.setItem('lead',JSON.stringify(body))
            setTimeout(function () {
                atLhCloseAlert()
        }, 2000)
    })
}
function atLhSendTracing(type,rsName) {
    let day = new Date()
    let monthCover = ''
    let dayCover = ''
    let hoursCover = ''
    let minusCover = ''
    let seconCover = ''
    let atLh_utm_source = localStorage.getItem('atLh_utm_source')
    let atLh_utm_medium = localStorage.getItem('atLh_utm_medium')
    let atLh_utm_campaign = localStorage.getItem('atLh_utm_campaign')
    let atLh_utm_term = localStorage.getItem('atLh_utm_term')
    let atLh_utm_content = localStorage.getItem('atLh_utm_content')
    let atLh_gclid = localStorage.getItem('atLh_gclid')
    if((day.getMonth() + 1) < 10) {monthCover = `0${day.getMonth() + 1}`}
    else{monthCover = day.getMonth() + 1}
    if(day.getDate() < 10) {dayCover = `0${day.getDate()}`}
    else{dayCover = day.getDate()}
    if(day.getHours() < 10) {hoursCover = `0${day.getHours()}`}
    else{hoursCover = day.getHours()}
    if(day.getMinutes() < 10) {minusCover = `0${day.getMinutes()}`}
    else{minusCover = day.getMinutes()}
    if(day.getSeconds() < 10) {seconCover = `0${day.getSeconds()}`}
    else{seconCover = day.getSeconds()}
    let body = {
        type: type,
        accountId: atLh_acId,
        link: atLh_url,
        conversionValue: 0.0,
        resourceName: rsName,
        time: `${day.getFullYear()}-${monthCover}-${dayCover} ${hoursCover}:${minusCover}:${seconCover}+07:00`
    }
    if(atLh_utm_source != null && atLh_utm_source != undefined && atLh_utm_source != ''){body.utm_source = atLh_utm_source}
    if(atLh_utm_medium != null && atLh_utm_medium != undefined && atLh_utm_medium != ''){body.utm_medium = atLh_utm_medium}
    if(atLh_utm_campaign != null && atLh_utm_campaign != undefined && atLh_utm_campaign != ''){body.utm_campaign = atLh_utm_campaign}
    if(atLh_utm_term != null && atLh_utm_term != undefined && atLh_utm_term != ''){body.utm_term = atLh_utm_term}
    if(atLh_utm_content != null && atLh_utm_content != undefined && atLh_utm_content != ''){body.utm_content = atLh_utm_content}
    if(atLh_gclid != null && atLh_gclid != undefined && atLh_gclid != ''){body.gclid = atLh_gclid}
    fetchRetry(`${atLh_rqApi}/tracking-source-utm`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }, 4).then(result => {
        console.log(result)
    })
}