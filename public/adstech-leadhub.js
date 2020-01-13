window.onload = f
var acId = '';
var topic = '';
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
    if (a != null && a!= undefined && a != '') {
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
    //product: https://services.adstech.vn/leadpool/v1/leadhub/account/${acId}/group-buttons/${btnId}
    //test: {{rooturl}}/leadhub/account/5d1dd258f0aa61074608b0e3/group-buttons/5e145b4353c3c2000149aa15 (note: on HTTP)
    fetchRetry(`http://dev.adstech.vn:9000/leadhub/account/${acId}/group-buttons/${btnId}`, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    },4).then(result => {
        var style = result.response.style
        var vertical = result.response.vertical
        var styleBtnCall = null
        var styleBtnForm = null
        var styleBtnChat = null
        for (let i = 0; i < result.response.listButton.length; i++) {
            if (result.response.listButton[i].type == "CALL") {
                styleBtnCall = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "FORM") {
                styleBtnForm = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "CHAT"){
                styleBtnChat = result.response.listButton[i]
            }
        }
        writeHtml(style, vertical, styleBtnForm, styleBtnCall, styleBtnChat, acId)
        let leadhub_chatInfo = window.localStorage.getItem('leadhub_chatInfo');
        if (leadhub_chatInfo != null && leadhub_chatInfo != undefined && leadhub_chatInfo != ''){
            let chatInfo = JSON.parse(leadhub_chatInfo);
            document.getElementById('txtName').innerText = chatInfo.name;
            topic = chatInfo.topic;
        }
    })
}
async function fetchRetry (url, options, n) {
    for (let i = 0; i < n; i++) {

        try
        {
            return await fetch(url, options).then(handle).then(result => { return result })
        }
        catch (err)
        {
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

function writeHtml(style, vertical, styleBtnForm, styleBtnCall, styleBtnChat, acId) {
    var html = ''
    var call = ''
    var form = ''
    var chat = ''
    var chatInputInfoDialog = '';
    var chatWithAdmin = '';
    var form1 = ''
    var phone = ''
    var email = ''
    var name = ''
    var city = ''
    var bussiness = ''
    var position = ''
    if (style.left == '45') {
        position = `.adstech-group-btn {
            position:fixed;
            bottom: ${style.bottom -3}%;
            left: ${parseInt(style.left)+2}%;
            right: ${style.right}%;
            top:${style.top}%;
        }`
    }else{
        position = `.adstech-group-btn {
            position:fixed;
            bottom: ${style.bottom - 3}%;
            left: ${parseInt(style.left) -1}%;
            right: ${parseInt(style.right) -1}%;
            top:${style.top}%;
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
                    
                    .adstech-form {
                        display: none;
                        position: fixed;
                        text-align:center;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%,-50%);
                        border: 3px solid #f1f1f1;
                        z-index: 999999;
                        background-color:#fff;
                    }

                    /* Add styles to the form container */
                    .form-container {
                        max-width: 300px;
                        padding: 10px;
                        background-color: #fff;
                    }

                    /* Full-width input fields */
                    .form-container input[type=text],
                    .form-container input[type=email], 
                    .form-container input[type=tel]{
                        width: 90%;
                        padding: 15px;
                        margin: 5px 0 22px 0;
                        border: none;
                        background: #f1f1f1;
                    }

                    /* When the inputs get focus, do something */
                    .form-container input[type=text]:focus,
                    .form-container input[type=email]:focus,
                    .form-container input[type=tel]:focus {
                        background-color: #ddd;
                        outline: none;
                    }

                    /* Set a style for the submit/login button */
                    .form-container .btn {
                        background-color: #4CAF50;
                        color: white;
                        border: none;
                        cursor: pointer;
                        width: 50%;
                        margin-bottom: 10px;
                        opacity: 0.8;
                        float: left;
                        z-index: initial;
                        height:40px;
                    }

                    /* Add a red background color to the cancel button */
                    .form-container .cancel {
                        background-color: #999;
                    }

                    /* Add some hover effects to buttons */
                    .form-container .btn:hover,
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
                        z-index: 999999;
                        transform: translate(-50%,-50%);
                      }
                </style>`
    if (styleBtnCall == null || styleBtnCall == '') {
        call = ''
    } else {
        if (style.color == "#fff") {
            call = `<button class="adstech-btn" style="background-color:${styleBtnCall.buttonColor}">
                    <a href="tel:${styleBtnCall.phoneNumber}">
                        <img src="https://leadpool.adstech.vn/call-white.png" alt="Gọi điện thoại" width="${style.size / 2}" height="${style.size / 2}">
                    </a>
                </button>`
        }else if(style.color == "#000"){
            call = `<button class="adstech-btn" style="background-color:${styleBtnCall.buttonColor}">
                    <a href="tel:${styleBtnCall.phoneNumber}">
                        <img src="https://leadpool.adstech.vn/call-black.png" alt="Gọi điện thoại" width="${style.size / 2}" height="${style.size / 2}">
                    </a>
                </button>`
        }
    }
    if (styleBtnChat == null || styleBtnChat == '') {
        chat = ''
    } else {
        if (style.color == "#fff") {
            chat = `<button class="adstech-btn" style="background-color:${styleBtnChat.buttonColor}" onclick="openChat()">
                    <img src="http://dev.adstech.vn:8090/question_answer-white.png" alt="Gọi điện thoại" width="${style.size / 2}" height="${style.size / 2}">
                </button>`
        } else if(style.color == "#000"){
            chat = `<button class="adstech-btn" style="background-color:${styleBtnChat.buttonColor}" onclick="openChat()">
                    <img src="http://dev.adstech.vn:8090/question_answer-black.png" alt="Gọi điện thoại" width="${style.size / 2}" height="${style.size / 2}">
                </button>`
        }
        chatInputInfoDialog = `
            <div class="container" id="chatInputInfo" style="display: none;  position: fixed; bottom: 5%; right: 5%;">
                <div class="row">
                    <div class="col-md-5 col-md-offset-7">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="panel" style="border: 1px solid ${styleBtnChat.buttonColor}">
                                    <div class="panel-heading" style="border: 1px solid ${styleBtnChat.buttonColor}; background-color: ${styleBtnChat.buttonColor};">
                                        <h6 style="color: white" class="panel-title">Leave your info here, then you can chat with us right now!</h6>
                                    </div>
                                    <div class="panel-footer">
                                        <form id="sendInfo">
                                            <div class="input-group input-group-sm" style="width: 100%">
                                                <input style="width: 100%" type="text" class="form-control" required name="name" placeholder="Your name">
                                                <input style="width: 100%" type="text" class="form-control" required name="topic" placeholder="Your email/phone">
                                                
                                            </div>
                                            <br>
                                            <div class="input-group-btn">
                                                <button style="color: white; background-color: ${styleBtnChat.buttonColor};" class="btn btn-block" type="submit" id="btnSend">Chat with us!</button>
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
            <div class="container" id="chatAdmin" style="display: none; position: fixed; bottom: 5%; right: 5%"> 
                <div class="row">
                    <div class="col-md-5 col-md-offset-7">
                        <div class="row">
                            <div class="col-md-12" >
                                <div class="panel" style="border: 1px solid ${styleBtnChat.buttonColor}">
                                    <div class="panel-heading" style="border: 1px solid ${styleBtnChat.buttonColor}; background-color: ${styleBtnChat.buttonColor};">
                                        <h6 class="panel-title" style="color: white; ">Hello, <span id="txtName"></span></h6>
                                        <br>
                                        <h6 class="panel-title" style="color: white">
                                            Leave your message to connect with us! 
                                        </h6>
                                    </div>
                                    <div class="panel-body" style="height: 400px; overflow-y: scroll;">
                                        <div class="row">
                                            <div class="col-sm-12" id="scollDiv"; >
                                                <table class="table table-hover" id="messageContainer">
                                                    <tr></tr>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="panel-footer">
                                        <form id="sendMessage">
                                            <div class="input-group input-group-sm">
                                                <input type="text" required class="form-control" id="txtText" placeholder="ask us a few question ..">
                                                <span class="input-group-btn">
                                                    <button class="btn" style="color: white; background-color: ${styleBtnChat.buttonColor};" type="submit" id="btnSend">Send</button>
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
        }else if(style.color == "#000"){
            form = `<button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor}" onclick="openForm()">
                    <img src="https://leadpool.adstech.vn/mail-black.png" alt="Đăng ký ngay" width="${style.size / 2}" height="${style.size / 2}">
                </button>`
        }
        form1 = `<div class="adstech-form" id="myForm">
                    <form class="form-container" id="form-adstech" method="POST">
                        <h3>${styleBtnForm.title}</h3>
                        ${name}
                        ${phone}
                        ${email}
                        ${city}
                        ${bussiness}
                        
                        <div style="padding:0px 14px 0px 14px">
                            <button type="submit" class="btn">Xác nhận</button>
                            <button type="button" class="btn cancel" onclick="closeForm()">Hủy bỏ</button>
                        </div>
                    </form>
                </div>
                
                <div id="adstech-alert">
                    ${styleBtnForm.formMessageReturn}
                </div>`
        
        
    }
    if (vertical == false) {
        html = `
                <script defer src='https://cdn.firebase.com/js/client/2.2.1/firebase.js'></script>
                <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                <div class="adstech-group-btn">
                    ${form}
                    <br />
                    ${call}
                    <br />
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
                <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
                <div class="adstech-group-btn">
                    ${call}
                    ${form}
                    ${chat}
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
    }else if(styleBtnChat != null && styleBtnChat != ''){
        connectToFirebase()
    }
}

function openChat(){
    let chatInputInfo = document.getElementById("chatInputInfo");
    let chatAdmin = document.getElementById("chatAdmin")
    if(chatInputInfo.style.display == 'block' || chatAdmin.style.display == 'block'){
        chatInputInfo.style.display = 'none';
        chatAdmin.style.display = 'none';
    }
    else {
        let hasInfo = window.localStorage.getItem('leadhub_chatInfo');
        if(hasInfo != undefined && hasInfo != null && hasInfo != ''){
            chatminiCRM.child(topic).on('child_added', function (snapshot){
                var message = snapshot.val();
                let isCustomer = '';
                if (message.isCustomer == true || message.isCustomer == null){
                    isCustomer = '';
                }
                if (message.isCustomer == false){
                    isCustomer = ' (Admin) '
                }
                // + getHour(message.time)
                let html = 
                '<tr>' + 
                '<td><i class="glyphicon glyphicon-user"></i> ' + message.name + isCustomer + ': </td>' + 
                '<td>' + message.message + ' (' +')'+'</td>' + 
                '</tr>';
                $('#messageContainer tr:last').after(html);
                $('#scollDiv').animate({
                    scrollTop: $('#scollDiv')[0].scrollHeight
                }, 0);
            })
            startChatting()
        }
        else {
            chatInputInfo.style.display = 'block';
        }
    }
    
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function openAlert() {
    document.getElementById("adstech-alert").style.display = "block";
}
function closeAlert() {
    document.getElementById("adstech-alert").style.display = "none";
} 

function getHour(time){
    let result = ''
    let timeArr = time.split(' ');
    result = timeArr[3];
    return result;
}

function connectToFirebase(){
    try {
        chatminiCRM = new Firebase('https://minicrm-245403.firebaseio.com/');
    } catch (error) {
        console.log(error)
    }
    let form = document.getElementById("sendInfo")
    var newItems = false;
    
    form.addEventListener('submit', e => {
        const formData = new FormData(e.target)
        var name = formData.get('name');
        topic = formData.get('topic');
        document.getElementById('txtName').innerText = name;
        topic= acId + '-' + topic.replace(/\./g, '-dot-');
        let obj = {
            name: name,
            topic: topic
        }
        window.localStorage.setItem('leadhub_chatInfo', JSON.stringify(obj))
        chatminiCRM.child(topic).on('child_added', function (snapshot){
            var message = snapshot.val();
            // console.log(message)
            let isCustomerText = (message.isCustomer == false) ? '(admin)' : ''
            let html = 
            '<tr>' + 
            '<td><i class="glyphicon glyphicon-user"></i> ' + message.name + isCustomerText + ': </td>' + 
            '<td>' + message.message + ' ('+ getHour(message.time) +')'+'</td>' + 
            '</tr>';
            $('#messageContainer tr:last').after(html);
            $('#scollDiv').animate({
                scrollTop: $('#scollDiv')[0].scrollHeight
            }, 0);
        })
        var newItems = false;
        e.preventDefault()
        startChatting();
    })
}

function startChatting(){
    document.getElementById("chatInputInfo").style.display = "none";
    document.getElementById("chatAdmin").style.display = "block";
    let form = document.getElementById("sendMessage")
    form.addEventListener('submit', e => {
        var text = $('#txtText').val();
        if(text != ''){
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
            }
            catch(error){
                alert(error)
            }
        }
        e.preventDefault()
    })
}

function sendMessage(body){
    fetchRetry('http://dev.adstech.vn:9000/leadhub/chats', {
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
        },4).then(result => {
            if (result.status == "200") {
                openAlert()
                setTimeout(function () { closeAlert() },3000)
            }else{
                localStorage.setItem('lead'.JSON.stringify(body))
                openAlert()
                setTimeout(function () { closeAlert() },3000)
            }
        })
}