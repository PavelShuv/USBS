$(document).ready(function () {

  	// img cover start
    $('.img-cover').each(function(){
        let imgSrc = $(this).find('img').attr('src');
				console.log(imgSrc);
				
        $(this).css('background-image', 'url('+imgSrc+')');
    });
 		// img cover file start

    // style input file start

    let ObjfieldFile = $('.input-file');
    let flagFileMulti;
    let textChoise;
    let sizeFile;
    let nameFile;
   
    function createNewFileContainer(textChoiseParam, flagFileMultiParam, hintParam){
        let fileContainer = $('<div class="file-input-container"><input class="input-file" type="file" data-flagM="'+flagFileMultiParam+'"></div>')
        let noticeFile = $('<div class="notice-file notice-big-file"><span>Файл слишком большой</span><i></i></div>');
        let docorateFile = $('<div class="file-decorate"><span>'+textChoiseParam+'</span><i></i></div>');
        if(hintParam){
            let hintFile = $('<div class="hint-input-file">'+hintParam+'</div>');
            return fileContainer.append(hintFile).append(docorateFile).append(noticeFile);
        }
        else{
            return fileContainer.append(docorateFile).append(noticeFile);
        }
        
    }

    ObjfieldFile.each(function(){
        let appendFlag = 0;
        textChoise = $(this).data('textchoise');
        flagFileMulti = $(this).data('multy');
        textHint = $(this).data('hint');

        $(this).replaceWith(createNewFileContainer(textChoise, flagFileMulti, textHint));
        
        
    });



    $('body').on('click', '.file-decorate', function () {
        console.log('cl');
        let container = $(this).parents('.file-input-container');
        container.find('.input-file').trigger('click');
    });

    $('body').on('change', '.input-file', function () {
        nameFile = $(this).val().replace(/C:\\fakepath\\/i, '');
        let container = $(this).parents('.file-input-container');
        
        if(nameFile.length>0){
            sizeFile = this.files[0].size;
            if(sizeFile < 500000){
                console.log(nameFile,sizeFile);
                container.find('span').text(nameFile);
                container.addClass('full');

                flagFileMulti = $(this).data('flagm');

                if (flagFileMulti == 1) {
                    $(this).parents('.file-input-container').after(createNewFileContainer(textChoise,"1"));
                }
            }
            else{
                console.log('to big');
                
            }
        }
    });

    $("body").on("click", ".file-decorate i", function (e) {
        e.stopPropagation();
        flagFileMulti = $(this).data('flagm');
        let container = $(this).parents('.file-input-container');
        if (flagFileMulti == 1) {
            container.remove();
        }
        else{
            container.replaceWith(createNewFileContainer(textChoise,"0"));
        }
    });
    // style input file end
    // check email
    var r = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    var mailInput;
    var mailFlag = 1;

    function checkMail(elThis) {
        mailInput = elThis.val();

        if (!r.test(mailInput)) {
            mailFlag = 0;
            elThis.addClass("error-input");

        } else {
            mailFlag = 1;
            elThis.removeClass("error-input")
        }
    }

    $(".check-mail").on("keyup", function () {
        checkMail($(this));

        if (mailInput.length == 0) {
            $(this).removeClass("error-input")
        }
    });
    // check email

    // check require

    $(".btn-send").on("click", function (e) {

        var isEmpty = false;

        checkMail($(this).parents(".form").find(".check-mail"));

        $(this).parents(".form").find(".require").each(function () {

            if ($(this).attr("type") == "checkbox") {
                if (!$(this).is(":checked")) {
                    $(this).parent().addClass("error-input");
                    isEmpty = true;
                }
            }
            if ($(this).is(".style-select")) {

                if ($(this).prev().attr("data-val") == 0) {

                    $(this).prev().addClass("error-input");
                    isEmpty = true;
                }
            }

            if ($(this).attr("type") == "file") {
                $(this).next().addClass("error-input");
            }

            if (!$(this).val()) {
                isEmpty = true;
                $(this).addClass("error-input");
            }
        });

        setTimeout(function () {
            //$(".error-input").removeClass("error-input");
        }, 1000);

        if (isEmpty == true) {
            e.preventDefault();
        };
    });

    // check require


    // custom-select

    $(".style-select").each(function () {
        let firstElOption = $(this).find('option').eq(0).text();
        let dataText = $(this).data('text');
        if(dataText){
            firstElOption = dataText;
        }
       

        let styleSelectBoxElement = $("<div class='custom-select' data-val='0'><span>" + firstElOption + "</span><ul class='ln'></ul><i></i></div>");

        $(this).before(styleSelectBoxElement).hide();

        $(this).find("option").each(function () {
            var optionText = $(this).text();

            $(this).parent().prev().find("ul").append("<li>" + optionText + "</li>");
        });
    });

    $(".custom-select").on("click", function (e) {
        e.preventDefault();
        if ($(this).hasClass("active")) {
            $(this).removeClass("active");
        } else {
            $(".custom-select").removeClass("active");
            $(this).addClass("active");
        }
    });

    $("body").on("click", function (evt) {
        if (!$(evt.target).is('.custom-select, .custom-select > *')) {
            $(".custom-select").removeClass("active");
        }
    });
    $(".custom-select").on("click", "li", function () {
        var liIndex = $(this).index();
        $(this).parents(".custom-select").attr("data-val", (liIndex + 1));
        $(this).parents(".custom-select").next().find("option").eq(liIndex).prop("selected", true);
        $(this).parents(".custom-select").find("span").text($(this).text());
    });
    // custom-select



    $(".close").on("click", function () {
        $(this).parents(".element-show").removeClass("show");
    });

    $(".element-btn").on("click", function (e) {
        e.preventDefault();
        var activeIndex = $(this).attr("data-showEl");
        console.log("obj", activeIndex);
        $("[data-showEl='" + activeIndex + "'].element-show").toggleClass("show");
    });


    var longPhone = 16;
    $(".phone-mask").on("keydown", function (e) {

        // if (!parseInt(e.originalEvent.key)) {
        //     if (e.originalEvent.key != "Backspace") {
        //         e.preventDefault();
        //     }
        // }
        if ($(this).val().length < longPhone) {
            longPhone = 16;
            $(".phone-mask").mask("+7(999)999-99-999", {
                placeholder: " + 7(   )   -  -  "
            });
        } else {
            longPhone = 11;
            $(this).unmask();
            $(".phone-mask").mask("999999999999999999");
        }
    });
    
    $('.products-img').each(function(){
		let imgSrc = $(this).find('img').attr('src');
		$(this).attr('style','background-image: url('+imgSrc+')')
	});
    
    // $(".mCustomScrollbar").mCustomScrollbar();
});