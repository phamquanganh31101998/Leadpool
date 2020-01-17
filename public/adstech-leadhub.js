window.onload = f
var acId = '';
var topic = '';
var fb = '';
var zl = '';
var url = window.location.href;
var utm_source = null;
var utm_medium = null;
var utm_campaign = null;
var utm_term = null;
var utm_content = null;
var gclid = null;
var arrTrack = []
var styleBtnChat = '';
function f() {
    var tag = document.createElement("script");
    tag.src = "https://cdn.firebase.com/js/client/2.2.1/firebase.js";
    document.getElementsByTagName("head")[0].appendChild(tag);
    var tag2 = document.createElement("script");
    tag2.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js";
    document.getElementsByTagName("head")[0].appendChild(tag2);
    // var acId = ''
    var btnId = ''
    var chatminiCRM = null;
    var scripts = document.getElementsByTagName("script");
    let a = localStorage.getItem('lead')
    if (a != null && a != undefined && a != '') {
        createLead(a)
    }
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf('&gBtnId=') > 0) {
            var src = scripts[i].src.split('?')[1]
            var accid = src.split('&')[0]
            acId = accid.split('=')[1]
            var GbtnId = src.split('&')[1]
            btnId = GbtnId.split('=')[1]
        }
    }
    var track = ''
    if (url.indexOf('?') > 0) {
        track = url.split('?')[1]
        arrTrack = track.split('&')
    } else {
        track = null
    }
    if (track == '' || track == null) {
        utm_source = null
        utm_medium = null
        utm_campaign = null
        utm_term = null
        utm_content = null
        gclid = null
    }else{
        for(let index = 0; index < arrTrack.length; index++){
            if(arrTrack[index].indexOf('utm_source') == 0){
                utm_source = arrTrack[index].split('=')[1]
            }else if(arrTrack[index].indexOf('utm_medium') == 0){
                utm_medium = arrTrack[index].split('=')[1]
            }else if(arrTrack[index].indexOf('utm_campaign') == 0){
                utm_campaign = arrTrack[index].split('=')[1]
            }else if(arrTrack[index].indexOf('utm_term') == 0){
                utm_term = arrTrack[index].split('=')[1]
            }else if(arrTrack[index].indexOf('utm_content') == 0){
                utm_content = arrTrack[index].split('=')[1]
            }else if(arrTrack[index].indexOf('gclid') == 0){
                gclid = arrTrack[index].split('=')[1]
            }
        }
    }
    //product: https://services.adstech.vn/leadpool/v1/leadhub/account/${acId}/group-buttons/${btnId}
    //test: http://dev.adstech.vn:9000/leadhub/account/${acId}/group-buttons/${btnId} (note: on HTTP)
    fetchRetry(`https://services.adstech.vn/leadpool/v1/leadhub/account/${acId}/group-buttons/${btnId}`, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }, 4).then(result => {
        var style = result.response.style
        var vertical = result.response.vertical
        var styleBtnCall = null
        var styleBtnForm = null
        var styleBtnFacebook = null
        var styleBtnZalo = null
        for (let i = 0; i < result.response.listButton.length; i++) {
            if (result.response.listButton[i].type == "CALL") {
                styleBtnCall = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "FORM") {
                styleBtnForm = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "CHAT") {
                styleBtnChat = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "FACEBOOK") {
                styleBtnFacebook = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "ZALO") {
                styleBtnZalo = result.response.listButton[i]
            }
        }
        writeHtml(style, vertical, styleBtnForm, styleBtnCall, styleBtnChat, acId, styleBtnFacebook, styleBtnZalo)
        let leadhub_chatInfo = window.localStorage.getItem('leadhub_chatInfo');
        if (leadhub_chatInfo != null && leadhub_chatInfo != undefined && leadhub_chatInfo != '') {
            let chatInfo = JSON.parse(leadhub_chatInfo);
            document.getElementById('txtName').innerText = chatInfo.name;
            topic = chatInfo.topic;
        }
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

function writeHtml(style, vertical, styleBtnForm, styleBtnCall, styleBtnChat, acId, styleBtnFacebook, styleBtnZalo) {
    var html = ''
    var call = ''
    var form = ''
    var chat = ''
    var facebook = ''
    var zalo = ''
    var chatInputInfoDialog = ''
    var chatWithAdmin = ''
    var form1 = ''
    var phone = ''
    var email = ''
    var name = ''
    var city = ''
    var bussiness = ''
    var position = ''
    let brCall = ''
    let brForm = ''
    let brChat = ''
    let brZalo = ''
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
    var css = `<style>
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
                        z-index: 9999999;
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
                    .adstech-form-container .btn {
                        color: white;
                        border: none;
                        cursor: pointer;
                        width: 100%;
                        margin-bottom: 10px;
                        opacity: 0.8;
                        float: left;
                        z-index: 9999999;
                        height:40px;
                    }

                    /* Add a red background color to the cancel button */
                    .adstech-form-container .cancel {
                        background-color: #999;
                    }

                    /* Add some hover effects to buttons */
                    .adstech-form-container .btn:hover,
                    .open-button:hover {
                        opacity: 1;
                    }
                    #adstech-alert {
                        padding: 20px;
                        background-color:#e09000;
                        color: white;
                        margin-bottom: 15px;
                        display: none;
                        width:20%;
                        position: fixed;
                        text-align:center;
                        left: 50%;
                        top: 50%;
                        z-index: 9999999;
                        transform: translate(-50%,-50%);
                      }
                </style>`
    if (styleBtnCall == null || styleBtnCall == '') {
        call = ''
    } else {
        if (style.color == "#fff") {
            call = `<button class="adstech-btn" onclick="openCall()" style="background-color:${styleBtnCall.buttonColor}">
                        <a href="tel:${styleBtnCall.phoneNumber}">
                            <img src="https://leadpool.adstech.vn/call-white.png" alt="Gọi điện thoại" width="${style.size / 2}" height="${style.size / 2}">
                        </a>
                    </button>`
            brCall = '<br />'
        } else if (style.color == "#000") {
            call = `<button class="adstech-btn" onclick="openCall()" style="background-color:${styleBtnCall.buttonColor}">
                        <a href="tel:${styleBtnCall.phoneNumber}">
                            <img src="https://leadpool.adstech.vn/call-black.png" alt="Gọi điện thoại" width="${style.size / 2}" height="${style.size / 2}">
                        </a>
                    </button>`
            brCall = '<br />'
        }
    }
    if (styleBtnChat == null || styleBtnChat == '') {
        chat = ''
    } else {
        if (style.color == "#fff") {
            chat = `<button class="adstech-btn" style="background-color:${styleBtnChat.buttonColor}" onclick="openChat()">
                    <img src="https://leadpool.adstech.vn/question_answer-white.png" alt="Chat" width="${style.size / 2}" height="${style.size / 2}">
                </button>`
            brChat = '<br />'
        } else if (style.color == "#000") {
            chat = `<button class="adstech-btn" style="background-color:${styleBtnChat.buttonColor}" onclick="openChat()">
                    <img src="https://leadpool.adstech.vn/question_answer-black.png" alt="Chat" width="${style.size / 2}" height="${style.size / 2}">
                </button>`
            brChat = '<br />'
        }
        chatInputInfoDialog = `
            <div class="container" id="chatInputInfo" style="z-index: 99999999; display: none;  position: fixed; bottom: 5%; right: 5%; padding:10px">
                <div style="width:100%">
                    <div style="width:30%;margin-left:70%">
                        <div style="width:100%">
                            <div style="width:100%">
                                <div class="panel" style="border: 1px solid ${styleBtnChat.buttonColor}">
                                    <div class="panel-heading" style="padding:10px;border: 1px solid ${styleBtnChat.buttonColor}; background-color: ${styleBtnChat.buttonColor};">
                                        <h6 style="color: white; margin:auto" class="panel-title">Hãy cho chúng tôi biết bạn là ai</h6>
                                    </div> 
                                    <div class="panel-footer" style="padding:15px; background-color:#fff"> 
                                        <form id="sendInfo" method="POST">
                                            <div class="input-group input-group-sm" style="width: 100%">
                                                <input style="width: 100%" type="text" class="form-control" required name="name" placeholder="Tên">
                                                <input style="width: 100%" type="text" class="form-control" required name="topic" placeholder="Email/Số điện thoại">
                                            </div>
                                            <br>
                                            <div class="input-group-btn">
                                                <button style="color: white; background-color: ${styleBtnChat.buttonColor};" class="btn btn-block" type="submit" id="btnSend">Chat</button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
        chatWithAdmin = `
            <div class="container" id="chatAdmin" style="z-index: 99999999; display: none; position: fixed; bottom: 5%; right: 5%"> 
                <div style="width:100%">
                    <div style="width:30%;margin-left:70%">
                        <div style="width:100%">
                            <div style="width:100%">
                                <div style="border: 1px solid ${styleBtnChat.buttonColor}">
                                    <div style="padding:10px;border: 1px solid ${styleBtnChat.buttonColor}; background-color: ${styleBtnChat.buttonColor};">
                                        <h6 class="panel-title" style="color: white; ">Xin chào, <span id="txtName"></span>. Hãy chat với chúng tôi</h6>
                                    </div>
                                    <div style="height: 350px;background-color:#fff; overflow-y: scroll;">
                                        <div style="width:100%">
                                            <div style="width:100% id="scollDiv"; >
                                                <table class="table" id="messageContainer">
                                                    <tr></tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div style="background-color:#fff">
                                        <form id="sendMessage" method="POST">
                                            <div class="input-group input-group-sm">
                                                <input type="text" required class="form-control" id="txtText" placeholder="nói gì đó ..">
                                                <span class="input-group-btn">
                                                    <button class="btn" style="color: white; background-color: ${styleBtnChat.buttonColor};" type="submit" id="btnSend">Gửi</button>
                                                </span>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
    if (styleBtnForm == null || styleBtnForm == '') {
        form = ''
        form1 = ''
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
            form = `<button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor}" onclick="openForm()">
                    <img src="https://leadpool.adstech.vn/mail-white.png" alt="Đăng ký ngay" width="${style.size / 2}" height="${style.size / 2}">
                </button>`
            brForm = '<br />'
        } else if (style.color == "#000") {
            form = `<button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor}" onclick="openForm()">
                    <img src="https://leadpool.adstech.vn/mail-black.png" alt="Đăng ký ngay" width="${style.size / 2}" height="${style.size / 2}">
                </button>`
            brForm = '<br />'
        }
        form1 = `<div class="adstech-form" id="adstech-form">
                    <div style="float:right;margin-top:5px; margin-right:10px; color:red"><button onclick="document.getElementById('adstech-form').style.display='none'" style="border-radius:50%; background:#fff; box-shadow:none;border: none; width:20px;height:20px;font-size:25px">&times;</button></div>
                    <form class="adstech-form-container" id="form-adstech" method="POST">
                        <h3>${styleBtnForm.title}</h3>
                        ${name}
                        ${phone}
                        ${email}
                        ${city}
                        ${bussiness}
                        <div style="padding:0px 14px 0px 14px">
                            <button type="submit" class="btn" style="background-color:${styleBtnForm.buttonColor};">${styleBtnForm.description}</button>
                        </div>
                    </form>
                </div>
                
                <div id="adstech-alert">
                    ${styleBtnForm.formMessageReturn}
                </div>`
    }
    if (styleBtnFacebook == null || styleBtnFacebook == '') {
        facebook = ''
    } else {
        fb = `https://m.me/${styleBtnFacebook.phoneNumber}`
        facebook = '<button class="adstech-btn" style="padding:0px" onclick="openFacebook()"><a><img src="https://leadpool.adstech.vn/mess.png" id="adstech-open-fb" alt="Facebook" width="100%" height="100%"></a></button>'
    }
    if (styleBtnZalo == null || styleBtnZalo == '') {
        zalo = ''
    } else {
        zl = `https://zalo.me/${styleBtnZalo.phoneNumber}`
        zalo = '<button class="adstech-btn" style="padding:0px" onclick="openZalo()"><a><img src="https://leadpool.adstech.vn/zalo.png" id="adstech-open-zl" alt="Zalo" width="100%" height="100%"></a></button>'
        brZalo = '<br />'
    }
    if (vertical == false) {
        html = `
                <script defer src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
                <div class="adstech-group-btn">
                    ${facebook}
                    ${brZalo}
                    ${zalo}
                    ${brForm}
                    ${form}
                    ${brCall}
                    ${call}
                    ${brChat}
                    ${chat}
                </div>
                ${chatInputInfoDialog}
                ${chatWithAdmin}
                ${form1}
                ${css}
                `
    } else {
        html = `
                <script defer src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
                <div class="adstech-group-btn">
                    ${call}
                    ${form}
                    ${chat}
                    ${facebook}
                    ${zalo}
                </div>
                ${chatInputInfoDialog}
                ${chatWithAdmin}
                ${form1}
                ${css}`
    }

    var div = document.createElement("div");
    div.id = "adstech-group-btn";
    document.body.appendChild(div);
    document.getElementById("adstech-group-btn").innerHTML = html;
    // var chatminiCRM = new Firebase('https://minicrm-245403.firebaseio.com/');
    if (styleBtnForm != null && styleBtnForm != '') {
        send(acId)
    }
    if (styleBtnChat != null && styleBtnChat != '') {
        connectToFirebase()
    }
}

function openChat() {
    let chatInputInfo = document.getElementById("chatInputInfo");
    let chatAdmin = document.getElementById("chatAdmin")
    if (chatInputInfo.style.display == 'block' || chatAdmin.style.display == 'block') {
        chatInputInfo.style.display = 'none';
        chatAdmin.style.display = 'none';
    } else {
        let hasInfo = window.localStorage.getItem('leadhub_chatInfo');
        if (hasInfo != undefined && hasInfo != null && hasInfo != '') {
            let customerInfo = JSON.parse(hasInfo)
            chatminiCRM.child(topic).on('child_added', function (snapshot) {
                var message = snapshot.val();
                let isCustomer = '';
                if (message.isCustomer == true || message.isCustomer == null) {
                    isCustomer = '';
                }
                if (message.isCustomer == false) {
                    isCustomer = ' (Admin)'
                }
                // + getHour(message.time)
                // let html =
                //     '<tr>' +
                //     '<td><i class="glyphicon glyphicon-user"></i> ' + message.name + isCustomer + ': </td>' +
                //     '<td>' + message.message + '</td>' +
                //     '</tr>';
                let html = ''
                if(message.name == customerInfo.name){
                    html = `<tr style="padding-top: 5%;">
                        <td style="border-radius: 10px; max-width: 80%; float: right; background-color: ${styleBtnChat.buttonColor}; color: white; margin-right: 2%; margin-top: 2%;">${message.name}${isCustomer}: ${message.message}</td>
                    </tr>`
                }
                else {
                    html = `<tr style="padding-top: 5%;">
                        <td style="border-radius: 10px; max-width: 80%; float: left; background-color: #e5e5e5; margin-left: 2%; margin-top: 2%;">${message.name}${isCustomer}: ${message.message}</td>
                    </tr>`
                }
                $('#messageContainer tr:last').after(html);
                $('#scollDiv').animate({
                    scrollTop: $('#scollDiv')[0].scrollHeight
                }, 0);
            })
            startChatting()
        } else {
            chatInputInfo.style.display = 'block';
        }
    }

}

function openForm() {
    document.getElementById("adstech-form").style.display = "block";
}

function openCall(){
    sendTracing('CALL')
}

function closeForm() {
    document.getElementById("adstech-form").style.display = "none";
}

function openAlert() {
    document.getElementById("adstech-alert").style.display = "block";
}

function closeAlert() {
    document.getElementById("adstech-alert").style.display = "none";
}

function openFacebook() {
    sendTracing('FACEBOOK')
    var element = document.getElementById("adstech-open-fb");
    element.classList.add("at-onclick-fb");
    window.open(fb)
}

function openZalo() {
    sendTracing('ZALO')
    var element = document.getElementById("adstech-open-zl");
    element.classList.add("at-onclick-zl");
    window.open(zl)
}

function getHour(time) {
    let result = ''
    let timeArr = time.split(' ');
    result = timeArr[3];
    return result;
}

function connectToFirebase() {
    try {
        chatminiCRM = new Firebase('https://leadpoolproduct.firebaseio.com/');
    } catch (error) {
        console.log(error)
    }
    let form = document.getElementById("sendInfo")
    var newItems = false;

    form.addEventListener('submit', e => {
        const formData = new FormData(e.target)
        var name = formData.get('name');
        topic = formData.get('topic');
        let body = [
            {
                property: 'accountId',
                value: acId
            },
            {
                property: 'lastName',
                value: name
            },
            {
                property: 'email',
                value: topic
            },
        ]
        // console.log(body)
        //product: https://services.adstech.vn/leadpool/v1/leadhub/contacts?source_from_mar=CHAT
        //test: http://dev.adstech.vn:9000/leadhub/contacts?source_from_mar=CHAT
        fetchRetry(`https://services.adstech.vn/leadpool/v1/leadhub/contacts?source_from_mar=CHAT`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }, 4).then(result => {
            console.log(result)
        }).catch(error => {
            console.log(error)
        })
        document.getElementById('txtName').innerText = name;
        topic = acId + '-' + topic.replace(/\./g, '-dot-');
        let obj = {
            name: name,
            topic: topic
        }
        window.localStorage.setItem('leadhub_chatInfo', JSON.stringify(obj))
        chatminiCRM.child(topic).on('child_added', function (snapshot) {
            var message = snapshot.val();
            let isCustomer = '';
            if (message.isCustomer == true || message.isCustomer == null) {
                isCustomer = '';
            }
            if (message.isCustomer == false) {
                isCustomer = ' (Admin)'
            }
            // let html =
            //     '<tr>' +
            //     '<td><i class="glyphicon glyphicon-user"></i> ' + message.name + isCustomerText + ': </td>' +
            //     '<td>' + message.message + '</td>' + 
            //     '</tr>';
            let html = '';
            if(message.name == obj.name){
                html = `
                <tr style="padding-top: 5%;">
                    <td style="border-radius: 10px; max-width: 80%; float: right; background-color: ${styleBtnChat.buttonColor}; color: white; margin-right: 2%; margin-top: 2%;">
                        ${message.name}${isCustomer}: ${message.message}
                    </td>
                </tr>`
            }
            else {
                html = `
                <tr style="padding-top: 5%;">
                    <td style="border-radius: 10px; max-width: 80%; float: left; background-color: #e5e5e5; margin-left: 2%; margin-top: 2%;">
                        ${message.name}${isCustomer}: ${message.message}
                    </td>
                </tr>`
            }
            $('#messageContainer tr:last').after(html);
            $('#scollDiv').animate({
                scrollTop: $('#scollDiv')[0].scrollHeight
            }, 0);
        })
        var newItems = false;
        sendTracing('CHAT')
        e.preventDefault()
        startChatting();
    })
}

function startChatting() {
    document.getElementById("chatInputInfo").style.display = "none";
    document.getElementById("chatAdmin").style.display = "block";
    let form = document.getElementById("sendMessage")
    form.addEventListener('submit', e => {
        var text = $('#txtText').val();
        if (text != '') {
            try {
                var body = {
                    topic: topic,
                    name: document.getElementById('txtName').innerText,
                    message: text,
                    accountId: acId,
                    isCustomer: true
                }
                sendMessage(body)
                document.getElementById('txtText').value = ''
            } catch (error) {
                alert(error)
            }
        }
        e.preventDefault()
    })
}

function sendMessage(body) {
    //product: https://services.adstech.vn/leadpool/v1/leadhub/chats
    //test: http://dev.adstech.vn:9000/leadhub/chats
    fetchRetry('https://services.adstech.vn/leadpool/v1/leadhub/chats', {
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

function send(acId) {
    const form = document.getElementById("form-adstech")
    form.addEventListener('submit', e => {
        const formData = new FormData(e.target)
        var email = formData.get('email')
        var name = formData.get('name')
        var phone = formData.get('phone')
        var city = formData.get('city')
        var bussiness = formData.get('bussiness')
        var body = [{
            property: 'accountId',
            value: acId
        }, {
            property: 'email',
            value: email
        }]
        if (name != undefined && name != '' && name != null) {
            let a = {
                property: 'lastName',
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
        createLead(body)
        sendTracing('FORM')
        e.preventDefault()
        closeForm()
    })
}

function createLead(body) {
    fetchRetry(`https://services.adstech.vn/leadpool/v1/leadhub/contacts`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }, 4).then(result => {
        if (result.status == "200") {
            localStorage.removeItem('lead'.JSON.stringify(body))
            openAlert()
            setTimeout(function () {
                closeAlert()
            }, 3000)
        } else {
            localStorage.setItem('lead'.JSON.stringify(body))
            openAlert()
            setTimeout(function () {
                closeAlert()
            }, 3000)
        }
    })
}

function sendTracing(type) {
    let body = {
        type: type,
        accountId: acId,
        link: url
    }
    if(utm_source != null){body.utm_source = utm_source}
    if(utm_medium != null){body.utm_medium = utm_medium}
    if(utm_campaign != null){body.utm_campaign = utm_campaign}
    if(utm_term != null){body.utm_term = utm_term}
    if(utm_content != null){body.utm_content = utm_content}
    if(gclid != null){body.gclid = gclid}
    //product: https://services.adstech.vn/leadpool/v1/leadhub/tracking-source-utm
    //test: http://dev.adstech.vn:9000/leadhub/tracking-source-utm
    fetchRetry(`https://services.adstech.vn/leadpool/v1/leadhub/tracking-source-utm`, {
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