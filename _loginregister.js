/**
 * 登录注册JS插件 ， 一个JS即可搞定登录注册页面、样式 、JS逻辑、提交后台交互；
 * 不需要加载任何插件 ， 加载这个JS库，调用 _loginregister.register() 函数即可搞定；
 * 
 * 码砖不易，使用时请保留作者姓名和联系方式。
 * 
 * @author email: kyle946@163.com
 * @version 1.0
 * @type type
 */


_loginregister = {};
_loginregister.param = {
    msgbox_width : 568 ,
    msgbox_height : 432 ,
    register_submit_url : "",
    register_login_url : "" ,
    register_sendmsg_url : "" 
};

//_loginregister.param.msgbox_width = 568;
//_loginregister.param.msgbox_height = 432;
//_loginregister.param.register_submit_url = "";
//_loginregister.param.register_login_url = "";
//_loginregister.param.register_sendmsg_url = '';


//begin ---------------------------------------------------------------------
_loginregister.register = function () {

    var bg = document.getElementById("_loginregister.msgbox_node.background");
    var cn = document.getElementById("_loginregister.msgbox_node.content_box");
    if (bg && cn) {
        bg.remove();
        cn.remove();
        //bg.style.display = "block";
        //cn.style.display = "block";
        //return;
    }

    _loginregister.msgbox(function (content) {
        var html = '<div style="background-color: #fff; width: 92%; padding: 4%;"> <div style="font-size: 26px;">手机号注册</div> <div style="margin-top: 5px;">已有账号？ <a href="javascript:void(0)" onclick="_loginregister.login()" style="color:#00c1de;">登录</a></div> <form id="_loginregister_register_form" name="_loginregister_register_form"> <div style="margin-top: 20px;"> <input type="text" name="" value="+86" readonly="readonly" style="font-size: 16px;  width: 18%; display: inline-block; outline: 0; height: 38px;border:1px solid #eaeaea;" /> <input style="width: 80%; outline: 0; font-size: 16px;  display: inline-block; height: 38px;border:1px solid #eaeaea;" type="text" name="username" value="" placeholder="手机号" /> </div> <div style="margin-top: 15px;"> <input type="text" name="verifycode" placeholder="短信验证码" value="" style="width: 70%; outline: 0; font-size: 16px;  display: inline-block; height: 38px;border:1px solid #eaeaea;" /> <button style="border:1px solid #444; background-color: #fff; outline: 0; cursor: pointer; width:28%; height: 38px;" type="button" onclick="_loginregister.register_sendmsg()">发送验证码</button> </div> <div style="margin-top: 15px;"> <input style="width: 99%; outline: 0; font-size: 16px;  display: inline-block; height: 38px;border:1px solid #eaeaea;" type="password" name="password" value="" placeholder="设置密码" /> </div> <div style="margin-top: 15px;"> <label> <input type="checkbox" name="RegistrationAgreement" value="ON" /> 我接受用户注册协议 </label> </div> <div style="margin-top: 15px;"> <button style="width: 99%; height: 42px; background-color: #ff8b8b; color:#fff; border:0;outline: 0; cursor: pointer; border-radius: 5px;" type="button" onclick="_loginregister.register_submit()">注册</button> </div> <div id="_loginregister_register_tips" style="margin-top: 20px; font-size: 12px; color:#c00; height: 20px;"></div> </form> </div>';
        content.innerHTML = html;
    });
};

_loginregister.register_submit = function () {
    var tips = document.getElementById("_loginregister_register_tips");
    var mobile = document._loginregister_register_form.username.value;
    var verifycode = document._loginregister_register_form.verifycode.value;
    var password = document._loginregister_register_form.password.value;
    var RegistrationAgreement;
    if (document._loginregister_register_form.RegistrationAgreement.checked === true) {
        RegistrationAgreement = 1;
    } else {
        RegistrationAgreement = 0;
    }

    var rule = new RegExp(/^[0-9]{11,11}$/);
    if (rule.test(mobile) == false) {
        tips.innerHTML = "提示：请填写一个有效的手机号码！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    rule = new RegExp(/^[0-9]{6,6}$/);
    if (rule.test(verifycode) == false) {
        tips.innerHTML = "提示：短信验证码格式不正确！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    rule = new RegExp(/^.{6,16}$/);
    if (rule.test(password) == false) {
        tips.innerHTML = "提示：请设置一个6到16位字符的密码！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    if (RegistrationAgreement === 0) {
        tips.innerHTML = "提示：请接受用户注册协议！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    tips.innerHTML = "";

    if (_loginregister.param.register_submit_url === '') {
        tips.innerHTML = "提示：没有配置注册地址！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }
    
    var senddata = {
        mobile: mobile,
        pwd: password,
        verify: verifycode,
        RegistrationAgreement: RegistrationAgreement
    };

    _loginregister.ajax(_loginregister.param.register_submit_url, senddata, function (result) {
        if (typeof result === 'object') {
            if (result.code === 1) {
                tips.innerHTML = "注册成功！";
                tips.style.color = "#00a005";
                tips.style.display = "block";
                return;
            } else {
                var r_msg = "提示：注册失败，接口异常！";
                if (result.msg) {
                    r_msg = result.msg;
                }
                tips.innerHTML = r_msg;
                tips.style.color = "#c00";
                tips.style.display = "block";
                return;
            }
        } else {
            tips.innerHTML = "提示：接口数据异常";
            tips.style.color = "#c00";
            tips.style.display = "block";
            return;
        }
    });


};


_loginregister.register_sendmsg = function () {
    var tips = document.getElementById("_loginregister_register_tips");
    var mobile = document._loginregister_register_form.username.value;
    var rule = new RegExp(/^[0-9]{11,11}$/);
    if (rule.test(mobile) == false) {
        tips.innerHTML = "提示：请填写一个有效的手机号码！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    if (_loginregister.param.register_sendmsg_url == '') {
        tips.innerHTML = "提示：没有配置短信发送地址！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    var senddata = {
        mobile: mobile
    };

    _loginregister.ajax(_loginregister.param.register_sendmsg_url, senddata, function (result) {
        if (typeof result === 'object') {
            if (result.code === 1) {
                tips.innerHTML = "短信已经发送！";
                tips.style.color = "#00a005";
                tips.style.display = "block";
                return;
            } else {
                var r_msg = "提示：注册失败，接口异常！";
                if (result.msg) {
                    r_msg = result.msg;
                }
                tips.innerHTML = r_msg;
                tips.style.color = "#c00";
                tips.style.display = "block";
                return;
            }
        } else {
            tips.innerHTML = "提示：接口数据异常";
            tips.style.color = "#c00";
            tips.style.display = "block";
            return;
        }

    });
};
//end ---------------------------------------------------------------------



//begin ---------------------------------------------------------------------

_loginregister.login = function () {

    var bg = document.getElementById("_loginregister.msgbox_node.background");
    var cn = document.getElementById("_loginregister.msgbox_node.content_box");
    if (bg && cn) {
        bg.remove();
        cn.remove();
        //bg.style.display = "block";
        //cn.style.display = "block";
        //return;
    }

    _loginregister.msgbox(function (content) {
        var html = '<div style="background-color: #fff; width: 92%; padding: 4%;"> <div style="font-size: 26px;">欢迎登录</div> <div style="margin-top: 5px;">还没有账号？ <a href="javascript:void(0)"  onclick="_loginregister.register()" style="color:#00c1de;">注册</a></div> <form id="_loginregister_login_form" name="_loginregister_login_form"> <div style="margin-top: 20px;"> <input type="text" name="" value="+86" readonly="readonly" style="font-size: 16px;  width: 18%; display: inline-block; outline: 0; height: 38px;border:1px solid #eaeaea;" /> <input style="width: 80%; outline: 0; font-size: 16px;  display: inline-block; height: 38px;border:1px solid #eaeaea;" type="text" name="username" value="" placeholder="手机号" /> </div>  <div style="margin-top: 15px;"> <input style="width: 99%; outline: 0; font-size: 16px;  display: inline-block; height: 38px;border:1px solid #eaeaea;" type="password" name="password" value="" placeholder="输入密码" /> </div>  <div style="margin-top: 15px;"> <button style="width: 99%; height: 42px; background-color: #ff8b8b; color:#fff; border:0;outline: 0; cursor: pointer; border-radius: 5px;" type="button" onclick="_loginregister.login_submit()">登录</button> </div> <div id="_loginregister_login_tips" style="margin-top: 20px; font-size: 12px; color:#c00; height: 20px;"></div> </form> </div>';
        content.innerHTML = html;
    });
};

_loginregister.login_submit = function(){
    // _loginregister.param.register_login_url
    
    var tips = document.getElementById("_loginregister_login_tips");
    var mobile = document._loginregister_login_form.username.value;
    var password = document._loginregister_login_form.password.value;

    var rule = new RegExp(/^[0-9]{11,11}$/);
    if (rule.test(mobile) == false) {
        tips.innerHTML = "提示：请填写一个有效的手机号码！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    rule = new RegExp(/^.{6,16}$/);
    if (rule.test(password) == false) {
        tips.innerHTML = "提示：请输入密码！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }

    tips.innerHTML = "";

    if (_loginregister.param.register_login_url === '') {
        tips.innerHTML = "提示：没有配置登录地址！";
        tips.style.color = "#c00";
        tips.style.display = "block";
        return;
    }
    
    var senddata = {
        mobile: mobile,
        pwd: password,
        verify: verifycode
    };

    _loginregister.ajax(_loginregister.param.register_login_url, senddata, function (result) {
        if (typeof result === 'object') {
            if (result.code === 1) {
                tips.innerHTML = "登录成功！";
                tips.style.color = "#00a005";
                tips.style.display = "block";
                return;
            } else {
                var r_msg = "提示：登录失败，接口异常！";
                if (result.msg) {
                    r_msg = result.msg;
                }
                tips.innerHTML = r_msg;
                tips.style.color = "#c00";
                tips.style.display = "block";
                return;
            }
        } else {
            tips.innerHTML = "提示：接口数据异常";
            tips.style.color = "#c00";
            tips.style.display = "block";
            return;
        }
    });

};

//end ---------------------------------------------------------------------

_loginregister.ajax = function (url, sendData, callback) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            var res = xmlhttp.responseText;
            var result = res;
            var respon_header = xmlhttp.getResponseHeader('content-type').toString();
            if (respon_header.indexOf('application/json') !== false) {
                result = JSON.parse(res);
            }

            //执行回调函数 
            if (typeof callback === 'function') {
                callback(result);
            }
        }
    };
    xmlhttp.open("POST", url, true);
    xmlhttp.setRequestHeader("X-Requested-With", "XMLHttpRequest");
    xmlhttp.setRequestHeader('content-type', 'application/json');
    xmlhttp.send(JSON.stringify(sendData));
};


_loginregister.msgbox_node = {
    background: document.createElement("div"),
    content_box: document.createElement("div"),
    content: document.createElement("div"),
    close_button: document.createElement('a')
};

_loginregister.msgbox = function (callback) {
    document.body.appendChild(_loginregister.msgbox_node.background);
    document.body.appendChild(_loginregister.msgbox_node.content_box);
    _loginregister.msgbox_node.content_box.appendChild(_loginregister.msgbox_node.close_button);
    _loginregister.msgbox_node.content_box.appendChild(_loginregister.msgbox_node.content);

    _loginregister.msgbox_node.close_button.href = "javascript:_loginregister.close();";
    _loginregister.msgbox_node.close_button.innerHTML = "关闭";

    _loginregister.msgbox_node.background.id = "_loginregister.msgbox_node.background";
    _loginregister.msgbox_node.content_box.id = "_loginregister.msgbox_node.content_box";



    //设置样式 
    _loginregister.msgbox_node.background.style.position = 'absolute';
    _loginregister.msgbox_node.background.style.background = '#000';
    _loginregister.msgbox_node.background.style.left = '0px';
    _loginregister.msgbox_node.background.style.top = '0px';
    _loginregister.msgbox_node.background.style.zIndex = 1000;
    _loginregister.msgbox_node.background.style.opacity = 0.5;
    _loginregister.msgbox_node.background.style.filter = 'alpha(opacity=0.5)';
    _loginregister.msgbox_node.background.style.display = 'block';

    _loginregister.msgbox_node.content_box.style.position = 'absolute';
    _loginregister.msgbox_node.content_box.style.background = '#fff';
    _loginregister.msgbox_node.content_box.style.zIndex = 1500;
    _loginregister.msgbox_node.content.style.background = '#fff';
    _loginregister.msgbox_node.content.style.display = 'block';
    _loginregister.msgbox_node.content.style.padding = '10px 0px';
    _loginregister.msgbox_node.content.style.height = "100%";
    _loginregister.msgbox_node.content.style.width = "100%";

    _loginregister.msgbox_node.close_button.style.fontSize = '16px';
    _loginregister.msgbox_node.close_button.style.textDecoration = 'none';
    _loginregister.msgbox_node.close_button.style.color = '#979797';
    _loginregister.msgbox_node.close_button.style.display = 'block';
    _loginregister.msgbox_node.close_button.style.position = 'absolute';
    _loginregister.msgbox_node.close_button.style.right = '20px';
    _loginregister.msgbox_node.close_button.style.top = '12px';

    _loginregister.msgbox_init();
    window.onresize = _loginregister.msgbox_init;

    //回调函数
    if (typeof callback === 'function') {
        callback(_loginregister.msgbox_node.content);
    }
};

_loginregister.close = function () {

    var bg = document.getElementById("_loginregister.msgbox_node.background");
    var cn = document.getElementById("_loginregister.msgbox_node.content_box");
    bg.remove();
    cn.remove();
//    _loginregister.msgbox_node.background.style.display = 'none';
//    _loginregister.msgbox_node.content_box.style.display = 'none';
};


_loginregister.msgbox_init = function () {
    //设置宽高
    _loginregister.msgbox_node.background.style.height = _loginregister.page.total(1) + 'px';
    _loginregister.msgbox_node.background.style.width = _loginregister.page.total(0) + 'px';
    var h = (_loginregister.page.height() - _loginregister.param.msgbox_height) / 2;
    _loginregister.msgbox_node.content_box.style.top = (h + _loginregister.page.top()) + 'px';
    _loginregister.msgbox_node.content_box.style.left = (_loginregister.page.width() - _loginregister.param.msgbox_width) / 2 + 'px';

    _loginregister.msgbox_node.content_box.style.width = _loginregister.param.msgbox_width + 'px';
    _loginregister.msgbox_node.content_box.style.height = _loginregister.param.msgbox_height + 'px';
};


_loginregister.page = {};

_loginregister.page.top = function () {
    return document.documentElement.scrollTop || document.body.scrollTop;
};

_loginregister.page.width = function () {
    return self.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
};

_loginregister.page.height = function () {
    return self.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
};

// @param int d  1高度，0宽度 
_loginregister.page.total = function (d) {
    var b = document.body, e = document.documentElement;
    return d ? Math.max(Math.max(b.scrollHeight, e.scrollHeight), Math.max(b.clientHeight, e.clientHeight)) :
            Math.max(Math.max(b.scrollWidth, e.scrollWidth), Math.max(b.clientWidth, e.clientWidth));
};
