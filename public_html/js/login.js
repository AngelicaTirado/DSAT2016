
/* global Storage */

var loginAPI = {};
var logout={};
loginAPI = (function () {
    var cveoper = '';

    function init() {
        var result = '';
        if (typeof Storage !== 'undefined') {
            var c = localStorage.getItem('cveoper');
            if (c !== null && c !== '') {
                result = c;
                cveoper = c;
            } else {
                makeFormLogin();
            }
        } else {

        }
        return result;
    }


    function makeFormLogin() {

        try {
            var b = document.querySelector('body');
            var node = document.createElement('div');
            node.className = 'backdiv';
            b.appendChild(node);
            node = document.createElement('div');
            node.className = 'content-form';
            b.appendChild(node);
            node = document.createElement('div');
            node.className = 'modal-dialog';
            var content = document.querySelector('.content-form');
            content.appendChild(node);
            loadForm();
        } catch (e) {
            console.error('No se pudo crear formulario de login ' + e);
        }
    }

    function loadForm() {
        try {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (xhttp.readyState === 4 && xhttp.status === 200) {
                    document.querySelector(".modal-dialog").innerHTML = xhttp.responseText;
                    delegateEvents();
                } else if (xhttp.readyState === 4 && xhttp.status === 404) {
                    console.error('No se pudo cargar formulario formulario de login ');
                }
            };
            xhttp.open("GET", "templates/login.html?var=" + Math.random(), true);
            xhttp.send();
        } catch (e) {
            console.error('error en la llamada AJAX al formulario de login');
        }

    }

    function delegateEvents() {
        try {
            var u = document.querySelector('#usr');
            var p = document.querySelector('#psw');
            var btn = document.querySelector('#btn-login');
            if (u !== null) {
                u.addEventListener('keypress', function (e) {
                    if (e.keyCode === 13) {
                        requestLoginAJAX(e);
                    }
                }, false);
            }
            if (p !== null) {
                p.addEventListener('keypress', function (e) {
                    if (e.keyCode === 13) {
                        requestLoginAJAX(e);
                    }
                }, false);
            }
            if (btn !== null) {
                btn.addEventListener('click', requestLoginAJAX, false);
            }
        } catch (e) {
            console.error('Error al ligar eventos');
        }

    }

    function requestLoginAJAX(e) {
        try {
            if (validar()) {
                var u = document.querySelector('#usr');
                var p = document.querySelector('#psw');
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function () {
                    if (xhttp.readyState === 4 && xhttp.status === 200) {
                        hanledResponse(JSON.parse(xhttp.responseText));
                    } else if (xhttp.readyState === 4 && xhttp.status === 404) {
                        document.querySelector('.msg-login').textContent = 'Error en servicio de autenticacion';
                        document.querySelector('.msg-login').style.display = 'block';
                        return false;
                    }
                };
                xhttp.open(urlServices['serviceLogin'].type, urlServices['serviceLogin'].url, true);
                xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded; charset=UTF-8");
                xhttp.send('u=' + u.value + '&p=' + p.value);
            } else {
                document.querySelector('.msg-login').textContent = 'Error en servicio de autenticacion';
                document.querySelector('.msg-login').style.display = 'block';
                return false;
            }
        } catch (e) {

        }
    }

    function hanledResponse(data) {
        if (typeof data !== "undefined" && typeof data[0] !== "undefined") {
            if (data[0].success) {
                localStorage.setItem('cveoper', data[0].cveoper);
                localStorage.setItem('user', data[0].user);
                var b = document.querySelector('body');
                var back = document.querySelector('.backdiv');
                var form = document.querySelector('.content-form');
                b.removeChild(back);
                b.removeChild(form);
                llena_tabla()
            } else {
                document.querySelector('.msg-login').textContent = data[0].messages;
                document.querySelector('.msg-login').style.display = 'block';
                return false;
            }
        }else{
            document.querySelector('.msg-login').textContent = 'Ocurrio un error al obtener información.';
            document.querySelector('.msg-login').style.display = 'block';
            return false;
        }
    }

    function validar() {
        var u = document.querySelector('#usr');
        var p = document.querySelector('#psw');
        if (u !== null && p !== null) {
            if (u.value !== '') {
                if (p.value !== '') {
                    return true;
                } else {
                    document.querySelector('.msg-login').textContent = 'El campo de contraseña esta vacio';
                    document.querySelector('.msg-login').style.display = 'block';
                    return false;
                }
            } else {
                document.querySelector('.msg-login').textContent = 'El campo de usuario esta vacio';
                document.querySelector('.msg-login').style.display = 'block';
                return false;
            }
        } else {
            document.querySelector('.msg-login').textContent = 'No existen los campos';
            document.querySelector('.msg-login').style.display = 'block';
            return false;
        }
    }

    logout= (function () {
        try {
            this.cveoper = '';
            localStorage.removeItem('cveoper');
            localStorage.removeItem('user');
            location.reload(true);
        } catch (e) {
            console.error('No es posible cerrar la sesion ' + e);
        }
    });
    return {
        logout: logout,
        init: init
    };
})();


(function () {
    window.onload = function () {
        loginAPI.init();
    };

})();
