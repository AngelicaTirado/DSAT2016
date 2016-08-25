
var boxModal = {
    dialog: function(data) {
        var title = data.title;
        var message = data.message;
        var buttons = data.buttons;
        var show = data.show;
        var close = data.close;
        var drag = data.drag;
        var modal = $('.boxModal');
        if (modal.length === 0) {
            $('body').append('<div class="modal-backdrop fade in"></div>');
            $('body').append('<div class="boxModal modal fade in"></div>');
            $('.boxModal').append('<div class="modal-dialog"><div>');
            $('.modal-dialog').append('<div class="modal-content"></div>');
            $('.modal-content').append('<div class="modal-header"></div><div class="modal-body"></div><div class="modal-footer"></div>');
            $('.modal-header').append('<button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>');
            //$('.modal-header').append('<button type="button" class="bootbox-close-button minima" data-dismiss="modal" aria-hidden="true"><i class="fa fa-chevron-down"></i></button>');
            $('.modal-header').append('<h4 class="modal-title">' + title + '</h4>');
            $('.modal-body').html(message);

            if (!show) {
                $('.modal-backdrop').hide();
                $('.modal-dialog').hide();
            }

            /*Estilos*/
            $('.modal-backdrop').css({'z-index': '20000', height: '100%', width: '100%', 'background-color': 'black'});
            $('.boxModal').css({'z-index': '20001', height: '100%', width: '100%', display: 'block'});
            if (drag !== undefined) {
                if (drag) {
                    $('.modal-dialog').draggable({handle: ".modal-header"});
                }
            }
            if (buttons === undefined || buttons === null) {
                $('.modal-footer').css({display: 'none'});
            } else {
                var typeButton = Object.keys(buttons);
                typeButton.forEach(function(entry) {
                    var btnObj = buttons[entry];
                    var btn = '<button data-bb-handler="' + entry + '" type="button" class="btn ' + btnObj.className + '">' + btnObj.label + '</button>';
                    $('.modal-footer').append(btn);
                    $('button[data-bb-handler=' + entry + ']').click(function(event) {
                        processCallBack(event, btnObj.callback);
                    });
                });
            }

            $('.bootbox-close-button.close').click(function(event) {
                processCallBack(event, close);
            });

            if (data.load !== undefined) {
                data.load();
            }
        }
    },
    confirm: function(message, funCB) {
        $('body').append('<div class="modal-backdrop fade in"></div>');
        $('body').append('<div class="boxModal modal fade in"></div>');
        $('.boxModal').append('<div class="modal-dialog"><div>');
        $('.modal-dialog').append('<div class="modal-content"></div>');
        $('.modal-content').append('<div class="modal-header"></div><div class="modal-footer"></div>');
        $('.modal-header').append('<button type="button" class="bootbox-close-button close" data-dismiss="modal" aria-hidden="true">×</button>');
        $('.modal-header').append('<h4 class="modal-title">' + message + '</h4>');

        $('.modal-backdrop').css({'z-index': '20000', height: '100%', width: '100%', 'background-color': 'black'});
        $('.boxModal').css({'z-index': '20001', height: '100%', width: '100%', display: 'block'});
        var buttons = {
            success: {
                label: 'Aceptar',
                className: 'btn-primary',
                callback: function() {
                    funCB(true);
                }
            },
            main: {
                label: 'Cancelar',
                className: 'btn-default',
                callback: function() {
                    funCB(false);
                }
            }
        };

        var typeButton = Object.keys(buttons);
        typeButton.forEach(function(entry) {
            var btnObj = buttons[entry];
            var btn = '<button data-bb-handler="' + entry + '" type="button" class="btn ' + btnObj.className + '">' + btnObj.label + '</button>';
            $('.modal-footer').append(btn);
            $('button[data-bb-handler=' + entry + ']').click(function(event) {
                processCallBack(event, btnObj.callback);
            });
        });
        $('.bootbox-close-button.close').click(function(event) {
            processCallBack(event, function() {
                funCB(false);
            });
        });
    },
    modal: function(attr) {
        if (attr === 'show') {
            $('.boxModal').show();
            $('.modal-backdrop').show();
        } else if (attr === 'hide') {
            $('.boxModal').hide();
            $('.modal-backdrop').hide();
        }
    },
    close: function() {
        $('.modal-backdrop').hide();
        $('.boxModal').hide();
        $('.modal-backdrop').remove();
        $('.boxModal').remove();
    },
    opacityBackdrop: function(opacity) {
        var element = $('.modal-backdrop');
        if (element !== undefined) {
            $('.modal-backdrop').css({'opacity': opacity});
        }
    }
};

function processCallBack(e, callback) {
    e.stopPropagation();
    e.preventDefault();

    $('.modal-backdrop').hide();
    $('.boxModal').hide();
    $('.modal-backdrop').remove();
    $('.boxModal').remove();
    if (callback !== undefined) {
        callback(e);
    }
}
