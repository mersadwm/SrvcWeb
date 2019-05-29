var currentSlide = "thisPagesUniqueKey"
var parentSlide = "root"

class SlideResult {
    constructor(question, answer, extraDetail) {
        this.question = question;
        this.answer = answer;
        this.extraDetail = extraDetail;
    }
}

var resultCollection = []

var qFunc = async function () {

    $('.questionnaireContainer').text('loading . . .');
    nextSlideTransitionAnim();
    await $.ajax({
        type: "GET",
        url: "../questions.json",
        dataType: 'json',
        data: {},
        success: function (response) {

            $('.questionnaireContainer').html();
            $('.questionnaireContainer').text('');
            if (parentSlide != "root" && parentSlide != "") {
                $('.questionnaireContainer').append('<a class="previous round btnHighlight unselectable" onclick="onPrevBtnClick()">&#8249;</a>');
            }
            var slides = response.slides;
            for (var i = 0; i < slides.length; i++) {
                if (slides[i].key == currentSlide) {
                    if (parentSlide == "") {
                        parentSlide = slides[i].parentKey;
                        if (parentSlide != "root") {
                            $('.questionnaireContainer').append('<a class="previous round btnHighlight" onclick="onPrevBtnClick()">&#8249;</a>');
                        }
                    }
                    $('.questionnaireContainer').append('<div class="questionContainer unselectable"> <h2>' + slides[i].question + '</h2></div>');
                    if (slides[i].isAnswerVisualized) {
                        var answershtml = '<div class="answerContainer visualAnswerContainer">';
                        var answers = slides[i].visualAnswers;
                        for (var j = 0; j < answers.length; j++) {
                            answershtml += '<div class="visualAnswer"><img class="answerImg" src="' + answers[j].imageUrl +
                                '"onclick="onAnswerClick(\'' + answers[j].nextSlidekey + '\', \' ' + answers[j].imageCaption + '   \' )" /><div class="imageCaption unselectable" <h7>' +
                                answers[j].imageCaption + '</h7> </div>' +
                                '<span class="tooltiptext unselectable">' + answers[j].imageDescription + '</span> </div>';
                        }
                        $('.questionnaireContainer').append(answershtml + '</div>');
                    } else {
                        var answers = slides[i].verbalAnswers;
                        for (var j = 0; j < answers.length; j++) {
                            $('.questionnaireContainer').append('<div class="answerContainer" onclick="onAnswerClick(\'' + answers[j].nextSlidekey + '\', \' ' + answers[j].text +
                                '\')"> <div class="verbalAnswer"> <h4 class="unselectable">' + answers[j].text + '</h4></div></div>');
                        }
                    }
                    $('.questionnaireContainer').append('<div class="moreInfoContainer unselectable"><h4>' + slides[i].moreInfo +
                        '</h4></div><textarea class="usersExplanationsInput" placeholder="Do you have anything else to say? If yes type it here">');
                    resultCollection.push(new SlideResult(slides[i].question, "", ""))
                }
            }
        },
    });

}

var onAnswerClick = function (nxtSlideKey, chosenAnswer) {
    parentSlide = currentSlide;
    currentSlide = nxtSlideKey;
    resultCollection[resultCollection.length - 1].answer = chosenAnswer;
    resultCollection[resultCollection.length - 1].extraDetail = $('.usersExplanationsInput').val();
    // printQuestionnaireResult();
    qFunc();
}

var onPrevBtnClick = function () {
    currentSlide = parentSlide;
    parentSlide = "";
    resultCollection.pop();
    qFunc();
}

var nextSlideTransitionAnim = function () {
    try {
        $('.questionnaireContainer').fadeTo(100, 0.0, "linear", function () {
            // Animation complete.
            $('.questionnaireContainer').fadeTo(1000, 1.0, "linear");
        });
    } catch (err) {}

}

var printQuestionnaireResult = function () {
    for (var i = 0; i < resultCollection.length; i++) {
        console.log(resultCollection[i].question + '\n' +
            resultCollection[i].answer + '\n' +
            resultCollection[i].extraDetail + '\nLength: ' + resultCollection.length + '\n\n\n');
    }
}


qFunc();