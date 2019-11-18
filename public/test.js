window.onload = f

function f() {
    var acId = ''
    var btnId = ''
    var scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
        var src = scripts[i].src.split('?')[1]
        if (src.indexOf('&gBtnId') > 0) {
            var accid = src.split('&')[0]
            acId = accid.split('=')[1]
            var GbtnId = src.split('&')[1]
            btnId = GbtnId.split('=')[1]
        }
    }
    fetch(`http://dev.adstech.vn:9000/leadhub/account/${acId}/group-buttons/${btnId}`, {
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
        var properties = null
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
    var css = `<style>
                    .adstech-group-btn {
                        position: fixed;
                        bottom: ${style.bottom - 3}%;
                        left: ${style.left}%;
                        right: ${style.right}%;
                        top:${style.top}%;
                        
                    }

                    .adstech-btn {
                        border: none;
                        color: white;
                        text-align: center;
                        text-decoration: none;
                        display: inline-block;
                        margin: 4px 2px;
                        border-radius: 50%;
                        width: ${style.size}px;
                        height:${style.size}px
                    }

                    .adstech-form {
                        display: none;
                        position: fixed;
                        bottom: 60px;
                        right: 35%;
                        border: 3px solid #f1f1f1;
                        z-index: 999999;
                    }

                    /* Add styles to the form container */
                    .form-container {
                        max-width: 300px;
                        padding: 10px;
                        background-color: white;
                    }

                    /* Full-width input fields */
                    .form-container input[type=text],
                    .form-container input[type=email], 
                    .form-container input[type=number]{
                        width: 90%;
                        padding: 15px;
                        margin: 5px 0 22px 0;
                        border: none;
                        background: #f1f1f1;
                    }

                    /* When the inputs get focus, do something */
                    .form-container input[type=text]:focus,
                    .form-container input[type=password]:focus {
                        background-color: #ddd;
                        outline: none;
                    }

                    /* Set a style for the submit/login button */
                    .form-container .btn {
                        background-color: #4CAF50;
                        color: white;
                        padding: 16px 20px;
                        border: none;
                        cursor: pointer;
                        width: 50%;
                        margin-bottom: 10px;
                        opacity: 0.8;
                        float: left;
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
                    #alert {
                        padding: 20px;
                        background-color:#e09900; /* Red */
                        color: white;
                        margin-bottom: 15px;
                        display: none;
                        width:20%;
                        position: fixed;
                        bottom:30%;
                        left:40%;
                        text-align:center
                      }
                </style>`
    if (styleBtnCall == null || styleBtnCall == '') {
        call = ''
    } else {
        if (style.color == "#fff") {
            call = `<button class="adstech-btn" style="background-color:${styleBtnCall.buttonColor}">
                    <a href="tel:${styleBtnCall.phoneNumber}">
                        <img src="http://localhost:8080/call-white.png" alt="Gọi điện thoại" width="${style.size - 20}px">
                    </a>
                </button>`
        }else if(style.color == "#000"){
            call = `<button class="adstech-btn" style="background-color:${styleBtnCall.buttonColor}">
                    <a href="tel:${styleBtnCall.phoneNumber}">
                        <img src="http://localhost:8080/call-black.png" alt="Gọi điện thoại" width="${style.size - 20}px">
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
                email = `<input type="email" placeholder="Nhập email" name="email" required>`
            } else if (styleBtnForm.properties[i] == "lastName") {
                name = `<input type="text" placeholder="Nhập tên của bạn" name="name" required>`
            } else if (styleBtnForm.properties[i] == 'phone') {
                phone = `<input type="number" placeholder="Nhập số điện thoại" name="phone" required>`
            } else if (styleBtnForm.properties[i] == 'city') {
                city = `<input type="text" placeholder="Nhập địa chỉ" name="city" required>`
            } else if (styleBtnForm.properties[i] == 'bussiness') {
                bussiness = `<input type="text" placeholder="Nhập nghề nghiệp của bạn" name="bussiness" required`
            }
        }
        if (style.color == "#fff") {
            form = `<button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor}" onclick="openForm()">
                    <img src="http://localhost:8080/mail-white.png" alt="Đăng ký ngay" width="${style.size - 20}px">
                </button>`
        }else if(style.color == "#000"){
            form = `<button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor}" onclick="openForm()">
                    <img src="http://localhost:8080/mail-black.png" alt="Đăng ký ngay" width="${style.size - 20}px">
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
                        <div>
                            <button type="submit" class="btn">Xác nhận</button>
                            <button type="button" class="btn cancel" onclick="closeForm()">Hủy bỏ</button>
                        </div>
                    </form>
                </div> 
                <div id="alert">
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
    div.id = "call";
    document.body.appendChild(div);
    document.getElementById("call").innerHTML = html;
    send(acId)
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

function openAlert() {
    document.getElementById("alert").style.display = "block";
}
function closeAlert() {
    document.getElementById("alert").style.display = "none";
} 
function send(acId) {
    const form = document.querySelector('form')
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
        fetch(`http://dev.adstech.vn:9000/leadhub/contacts`, {
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