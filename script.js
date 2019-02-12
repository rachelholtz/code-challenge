var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://github-trending-api.now.sh/repositories",
        "method": "GET",
        beforeSend: function () {
            // loading gif while search function is being run
            $('#loading-animation').fadeIn();
        },
        complete: function () {
            // stop the loading gif
            $('#loading-animation').fadeOut();
            $('.sort-stars').fadeIn();
        },
    };

    $.ajax(settings).done(function (response) {

        function eachObj(){
            var wrapper = $('#results'), container;
            for (var key in response) {
                container = $('<div class="col-md-3 item"></div>');
                wrapper.append(container);
                container.append('<h3 class="name">' + response[key].name + '</h3>');
                container.append('<p class="description">' + response[key].description + '</p>');
                container.append('<p class="stars">' + response[key].stars + '</p>');
            }
            console.log(response);
        }

        function sort(){

            response.sort(
                function (a, b) {
                    return b.stars - a.stars;
                }
            );

            eachObj();
        }

        $( document ).ready(
            eachObj()
        );

        $('button').on('click', function(e) {
            e.preventDefault();
            $('#results').empty();
            sort();
            $('.sort-stars').addClass('disable');
        });

    });