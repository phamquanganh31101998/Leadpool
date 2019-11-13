window.onload = f

function f() {
    var acId = ''
    var btnId = ''
    var scripts = document.getElementsByTagName("script");
    console.log(scripts[0].src)
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
        console.log(result)
        // var callBtn = result.response.listButton[1]
        // var formBtn = result.response.listButton[0]
        // var number = callBtn.phoneNumber
        // var opTb = 'bottom'
        // var opLr = 'left'
        // var x = callBtn.style.bottom
        // var y = callBtn.style.left
        // var x1 = formBtn.style.bottom
        // var y1 = formBtn.style.bottom
        // var height = callBtn.style.size
        // var width = callBtn.style.size
        // var tOb = `${opTb}:${x};`
        // var lOr = `${opLr}:${y};`
        // var call = callBtn.description
        // var color = callBtn.buttonColor
        // var colorForm = formBtn.buttonColor
        // console.log(result.response)
        // writeHtml(number, width, height, tOb, lOr, color, colorForm, x1, y1, opTb, opLr, call)
        var style = result.response.style
        var vertical = result.response.vertical
        var styleBtnCall = result.response.listButton[1]
        var styleBtnForm = result.response.listButton[0]
        writeHtml(style, vertical, styleBtnForm, styleBtnCall)
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

function writeHtml(style, vertical, styleBtnForm, styleBtnCall) {
    var html = ''
    if (vertical == false) {
        html = `<div class="adstech-group-btn">
    <button class="adstech-btn" style="background-color:${styleBtnCall.buttonColor}">
        <a href="tel:${styleBtnCall.phoneNumber}">
            <img src="http://staging.adstech.vn:8181/icon.png" alt="Gọi điện thoại" width="30px">
        </a>
    </button>
    <br />
    <button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor}" onclick="openForm()">
        <img src="http://staging.adstech.vn:8181/form.png" alt="Đăng ký ngay" width="30px">
    </button>
</div>
<div class="adstech-form" id="myForm">
    <form action="#" class="form-container">
        <h1>${styleBtnForm.title}</h1>

        <input type="text" placeholder="Nhập tên của bạn" name="name" required>

        <input type="text" placeholder="Nhập số điện thoại" name="phone" required>

        <input type="text" placeholder="Nhập email" name="email" required>

        <input type="text" placeholder="Nhập địa chỉ" name="address" required>

        <div>
            <button type="submit" class="btn">Xác nhận</button>
            <button type="button" class="btn cancel" onclick="closeForm()">Hủy bỏ</button>
        </div>
    </form>
</div>
<style>
    .adstech-group-btn {
        position: fixed;
        bottom: ${style.bottom}%;
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
        z-index: 9;
    }

    /* Add styles to the form container */
    .form-container {
        max-width: 300px;
        padding: 10px;
        background-color: white;
    }

    /* Full-width input fields */
    .form-container input[type=text],
    .form-container input[type=password] {
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
</style>`
    } else {
        html = `<div class="adstech-group-btn">
    <button class="adstech-btn" style="background-color:${styleBtnCall.buttonColor}">
        <a href="tel:${styleBtnCall.phoneNumber}">
            <img src="http://staging.adstech.vn:8181/icon.png" alt="Gọi điện thoại" width="30px">
        </a>
    </button>
    <button class="adstech-btn" style="background-color:${styleBtnForm.buttonColor}" onclick="openForm()">
        <img src="http://staging.adstech.vn:8181/form.png" alt="Đăng ký ngay" width="30px">
    </button>
</div>
<div class="adstech-form" id="myForm">
    <form action="#" class="form-container">
        <h1>${styleBtnForm.title}</h1>

        <input type="text" placeholder="Nhập tên của bạn" name="name" required>

        <input type="text" placeholder="Nhập số điện thoại" name="phone" required>

        <input type="text" placeholder="Nhập email" name="email" required>

        <input type="text" placeholder="Nhập địa chỉ" name="address" required>

        <div>
            <button type="submit" class="btn">Xác nhận</button>
            <button type="button" class="btn cancel" onclick="closeForm()">Hủy bỏ</button>
        </div>
    </form>
</div>
<style>
    .adstech-group-btn {
        position: fixed;
        bottom: ${style.bottom}%;
        left: ${style.left}%;
        right: ${style.right}%;
        top:${style.top}%
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
        bottom: 20px;
        right: 45px;
        border: 3px solid #f1f1f1;
        z-index: 9;
    }

    /* Add styles to the form container */
    .form-container {
        max-width: 300px;
        padding: 10px;
        background-color: white;
    }

    /* Full-width input fields */
    .form-container input[type=text],
    .form-container input[type=password] {
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
</style>`
    }

    var div = document.createElement("div");
    div.id = "call";
    document.body.appendChild(div);
    document.getElementById("call").innerHTML = html;
}

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}