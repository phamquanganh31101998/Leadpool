window.onload = f

function f() {
    var acId = ''
    var btnId = ''
    var scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        if (scripts[i].src.indexOf('&gBtnId=') > 0) {
            var src = scripts[i].src.split('?')[1]
            var accid = src.split('&')[0]
            acId = accid.split('=')[1]
            var GbtnId = src.split('&')[1]
            btnId = GbtnId.split('=')[1]
        }
    }
    fetch(`https://services.adstech.vn/leadpool/v1/leadhub/account/${acId}/group-buttons/${btnId}`, {
        method: 'GET',
        headers: new Headers({
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        })
    }).then(handle).then(result => {
        var style = result.response.style
        var vertical = result.response.vertical
        var styleBtnCall = null
        var styleBtnForm = null
        for (let i = 0; i < result.response.listButton.length; i++) {
            if (result.response.listButton[i].type == "CALL") {
                styleBtnCall = result.response.listButton[i]
            } else if (result.response.listButton[i].type == "FORM") {
                styleBtnForm = result.response.listButton[i]
            }
        }
        writeHtml(style, vertical, styleBtnForm, styleBtnCall, acId)
    })
}

function handle(response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);

        if (response.ok) return data;

        const error = (data && data.error) || response.statusText;
        return Promise.reject(error);
    });
}

function writeHtml(style, vertical, styleBtnForm, styleBtnCall, acId) {
    var html = ''
    var call = ''
    var form = ''
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
        html = `<div class="adstech-group-btn">
                    ${form}
                    <br />
                    ${call}
                </div>
                ${form1}
                ${css}`
    } else {
        html = `<div class="adstech-group-btn">
                    ${call}
                    ${form}
                </div>
                ${form1}
                ${css}`
    }

    var div = document.createElement("div");
    div.id = "adstech-group-btn";
    document.body.appendChild(div);
    document.getElementById("adstech-group-btn").innerHTML = html;
    if (styleBtnForm != null && styleBtnForm != '') {
        send(acId)
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
        fetch(`https://services.adstech.vn/leadpool/v1/leadhub/contacts`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        }).then(handle).then(result => {
                openAlert()
            setTimeout(function () { closeAlert() },3000)
        })
        e.preventDefault()
        closeForm()
    })
}