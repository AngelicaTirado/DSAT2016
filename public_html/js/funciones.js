/*function comprueba_extension() {
    var archivo = $("#file").val();
    extensiones_permitidas = new Array(".7z");
    mierror = "";
    if (!archivo) {
        //Si no tengo archivo, es que no se ha seleccionado un archivo en el formulario 
        inicializa();
    } else {
        //recupero la extensión de este nombre de archivo 
        extension = (archivo.substring(archivo.lastIndexOf("."))).toLowerCase();
        //compruebo si la extensión está entre las permitidas 
        permitida = false;
        for (var i = 0; i < extensiones_permitidas.length; i++) {
            if (extensiones_permitidas[i] == extension) {
                var filename = $("#file").val().split('\\').pop(); //Elimino C:\\fakepath
                var arregloDeCadenas = filename.split("_");
                console.log(arregloDeCadenas);
                var a = 3;
                if (arregloDeCadenas.length == a)
                {
                    var res = filename.substring(0, 5);
                    //console.log(res);
                    if (res == 'mcmgn') {
                        var x = "_";
                        var campo = filename.charAt(5);
                        //console.log(filename.charAt(5));
                        if (campo == x) {
                            var y = 8; //cve_oper
                            var digito = filename.substring(6, 14);//cve_oper localización
                            //console.log(filename.substring(6, 14));
                            if (digito.length == y) {
                                var z = "_";
                                var campo2 = filename.charAt(14);
                                if (campo2 == z) {
                                    permitida = true;
                                } else {
                                    permitida = false;
                                }
                            }
                        }
                    }

                }
            }
        }
        if (!permitida) {
            //event.preventDefault() //cumple con la condición del smoke
            smoke.confirm('Archivo incorrecto. Por favor verifique el archivo.', function (e) {
                if (e) {
                    inicializa();
                }
            }, {ok: "Ok"});

        } else {
            activa_btnUpload(1);//1habilita boton
        }
    }
}*/


/*function llena_tabla() {
    document.getElementById('mnu_usuario').innerHTML=localStorage.getItem('user');
    sendAJAX(urlServices['serviceDataTable'].url, {"tramo_control": localStorage.getItem('cveoper')}, urlServices['serviceDataTable'].type, function (data) {
        $('#myTable').html('<thead>'
                          +'<tr>'
                          +'<th data-field="nombre_archivo">Nombre del Archivo</th>'
                          +'<th data-field="estatus">Estatus</th>'
                          +'<th data-field="fecha_ftp">Fecha</th>'
                          +'<th data-field="error">Error</th>'
                          +'</tr>'
                          +'</thead>');
        if (typeof data !== "undefined") {
            var datosJSON = JSON.stringify(data);
            datosJSON = datosJSON.toString();
            datosJSON = JSON.parse(datosJSON);
            var tr;
            var arra = datosJSON[0].datos;
            if (typeof arra !== "undefined" && arra.length > 0) {
                if (typeof arra[0].nombre_archivo !== "undefined"){
                    for (var i = 0; i < arra.length; i++) {
                        tr = $('<tr/>');
                        tr.append("<td>" + arra[i].nombre_archivo + "</td>" + "<td>" + arra[i].estatus + "</td>"+ "<td>" + arra[i].fecha_ftp + "</td>"+ "<td>" + arra[i].error + "</td>");
                        $('#myTable').append(tr);
                    }                    
                }else if (typeof arra[0].upload !== "undefined"){
                    if (arra[0].upload === false){
                        //console.log(localStorage.getItem('user'));
                        if (typeof localStorage.getItem('user') !== "undefined" && localStorage.getItem('user') !== null){
                            smoke.confirm(arra[0].msj, function (e) {
                                if (e) {
                                    //inicializa();
                                }
                            }, {ok: "Ok"});
                        }
                    }
                }  
            }
        }
      
    }, function () {
        //console.log('subiendo archivo');
    });
} 

/*$(document).ready(function () {
    llena_tabla();

});*/

var sendAJAX = function (URL, data, type, myfunction, bs, withCredentials) {
    if (type !== null && type !== '') {
        type = type.toUpperCase();
    }
    if (URL === null && URL === '') {
        return '';
    }
    var credential = false;
    if (typeof withCredentials !== 'undefined') {
        credential = false || withCredentials;

    }
    $.ajax({
        type: type.toString(),
        url: URL,
        contentType: 'application/x-www-form-urlencoded; charset=UTF-8', //multipart/form-data, or text/plain
        dataType: 'json', //(xml, json, script, or html
        cache: false,
        async: true,
        xhrFields: {withCredentials: credential},
        crossDomain: true, //false si es mismo dominio, true  para forzar el uso de cross domain usar sonp
        data: data,
        beforeSend: function () {
            if (bs !== null && bs !== '') {
                bs(); //beforeSend function 
            }
        },
        success: function (dataJSON) {
            var dataBack = [{}];
            dataBack[0].operation = true;
            dataBack[0].datos = dataJSON;
            myfunction(dataBack);
        },
        error: function () {
            var dataBack = [{}];
            dataBack[0].operation = false;
            dataBack[0].messages = ['Error de conexión'];
            myfunction(dataBack);
        }

    });
};

//Upload
$(document).ready(
        function () {
            inicializa();
            /*$("#file").on("change",
                    function (event) {
                        event.preventDefault();
                        //uploadArchivo();
                        comprueba_extension()
                    });
            $("#btn_upload").on("click",
                    function (event) {
                        event.preventDefault();
                        uploadArchivo();
                    });*/
            $("#mnu_salir").on("click",
                    function (event) {
                        event.preventDefault();
                        logout();
                    });
        });

function inicializa() {
    //console.log(usrLoginText);
    //$("#file").prop('disabled', false);
    //document.getElementById("examinar").reset();
    //activa_btnUpload(0);//desHabilita boton
    //$('#btn_upload').html("Subir <i class='fa fa-upload'></i>");
    //$("#msj_result").html('');  
    //llena_tabla();
}

/*function uploadArchivo() {
    $("#file").prop('disabled', true);
    var data = new FormData();
    $.each($('#file')[0].files, function (i, file) {
        //data.append('file-'+i, file);
        data.append('file', file);
    });

    var url = "Upload.do";
    activa_btnUpload(0);//Deshabilita boton
    $("#closeFileInput").toggleClass('close');
    $("#closeFileInput").html('');
    $('#btn_upload').html("Enviando <i class='fa fa-cog fa-spin'></i> ");
    var upload = false;
    var msj = '';
    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        success: function (result) {
            $.each(result, function (i, item) {
                $.each(item, function (etq, val) {
                    if (etq == 'upload') {
                        upload = val;
                    }
                    if (etq == 'msj') {
                        if (val != '') {
                            msj = val;
                        }
                    }
                });
            });
            if (upload) {
                //$("#msj_result").html('Operaci&oacuten exitosa.');
                 smoke.confirm('Operaci&oacuten exitosa.', function (e) {
                    if (e) {
                        
                    }
                }, {ok: "Ok"});
            } else {
                //$("#msj_result").html(msj);
                smoke.confirm(msj, function (e) {
                    if (e) {
                        
                    }
                }, {ok: "Ok"});
            }
            $("#closeFileInput").toggleClass('close');
            $("#closeFileInput").html('&times;');
            inicializa();
        },
        error: function (xhr, ajaxOptions, thrownError) {
            //alert(xhr.status + ' ' +thrownError + ' Ocurrio un error al obtener informaci\u00F3n.');
        }
    });

}

function activa_btnUpload(valor) {
    if (valor > 0) {
        $("#btn_upload").attr("disabled", false);
    } else {
        $("#btn_upload").attr("disabled", true);
    }
}*/
