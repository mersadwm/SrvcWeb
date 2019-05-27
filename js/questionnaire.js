var currentSlide = "thisPagesUniqueKey"



var qFunc = function () {

    $('.text').text('loading . . .');

    $.ajax({
        type: "GET",
        url: "../resources/data/questions.json",
        dataType: 'json',
        success: function (response) {
            $('.text').html('');
            var slides = response.slides;
            for (var i = 0; i < slides.length; i++) {
                if (slides[i].key == currentSlide) {
                    $('.text').append('<div class="questionContainer"> <h2>' + slides[i].question + '</h2></div>');
                    if (slides[i].isAnswerVisualized) {
                        var answershtml = '<div class="answerContainer visualAnswerContainer">';
                        var answers = slides[i].visualAnswers;
                        for (var j = 0; j < answers.length; j++) {
                            answershtml += '<div class="visualAnswer"><img class="answerImg" src="' + answers[j].imageUrl 
                            + '" /><div class="imageCaption" <h7>' + answers[j].imageCaption + '</h7> </div>' 
                            + '<span class="tooltiptext">' + answers[j].imageDescription +'</span>' + '</div>' ;
                        }
                        $('.text').append(answershtml + '</div>');
                    } else {
                        var answers = slides[i].verbalAnswers;
                        for (var j = 0; j < answers.length; j++) {
                            $('.text').append('<div class="answerContainer"><h6>' + answers[j].text + '</h6></div>');
                        }
                    }
                    $('.text').append('<div class="moreInfoContainer"><h4>' + slides[i].moreInfo +
                        '</h4></div><textarea class="usersExplanationsInput" placeholder="Do you have anything else to say? If yes type it here">');
                }
            }
        },
    });

}

qFunc();