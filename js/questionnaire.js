var currentSlide = "thisPagesUniqueKey"
var parentSlide = "root"


var qFunc = function () {

    $('.text').text('loading . . .');
    nextSlideTransitionAnim();
    $.ajax({
        type: "GET",
        url: "../questions.json",
        dataType: 'json',
        success: function (response) {

            $('.text').html();
            $('.text').text('');
            if (parentSlide != "root" && parentSlide != "") {
                $('.text').append('<a class="previous round" onclick="onPrevBtnClick()">&#8249;</a>');
            }
            var slides = response.slides;
            for (var i = 0; i < slides.length; i++) {
                if (slides[i].key == currentSlide) {
                    if (parentSlide == "") {
                        parentSlide = slides[i].parentKey;
                        if (parentSlide != "root") {
                            $('.text').append('<a class="previous round" onclick="onPrevBtnClick()">&#8249;</a>');
                        }
                    }
                    $('.text').append('<div class="questionContainer"> <h2>' + slides[i].question + '</h2></div>');
                    if (slides[i].isAnswerVisualized) {
                        var answershtml = '<div class="answerContainer visualAnswerContainer">';
                        var answers = slides[i].visualAnswers;
                        for (var j = 0; j < answers.length; j++) {
                            answershtml += '<div class="visualAnswer"><img class="answerImg" src="' + answers[j].imageUrl +
                                '"onclick="onAnswerClick(\'' + answers[j].nextSlidekey + '\')" /><div class="imageCaption" <h7>' + answers[j].imageCaption + '</h7> </div>' +
                                '<span class="tooltiptext">' + answers[j].imageDescription + '</span> </div>';
                        }
                        $('.text').append(answershtml + '</div>');
                    } else {
                        var answers = slides[i].verbalAnswers;
                        for (var j = 0; j < answers.length; j++) {
                            $('.text').append('<div class="answerContainer" onclick="onAnswerClick(\'' + answers[j].nextSlidekey + '\')"> <div class="verbalAnswer"> <h4>' + answers[j].text + '</h4></div></div>');
                        }
                    }
                    $('.text').append('<div class="moreInfoContainer"><h4>' + slides[i].moreInfo +
                        '</h4></div><textarea class="usersExplanationsInput" placeholder="Do you have anything else to say? If yes type it here">');

                }
            }
        },
    });

}

var onAnswerClick = function (nxtSlideKey) {
    parentSlide = currentSlide;
    currentSlide = nxtSlideKey;
    qFunc();
}

var onPrevBtnClick = function () {
    currentSlide = parentSlide;
    parentSlide = "";
    qFunc();
}

var nextSlideTransitionAnim = function () {
    $('.text').fadeTo(100, 0.0, "linear", function () {
        // Animation complete.
        $('.text').fadeTo(1000, 1.0, "linear");
    });

}

qFunc();