(function($){
    $(document).on('ready', function(){
        $('#firstname').prop('disabled','disabled');
        $('#lastname').prop('disabled','disabled');
        $('#lastname').parent().prev().removeClass("required");

        setTimeout(function(){
            $("td.datetime").find('.datetimepicker').children().prop('disabled','disabled');

            $("#birthdate_datepicker_description").on('keydown', function(){
                alert('This field is non-editable');
                $("td.datetime").find('.datetimepicker').children().prop('disabled','disabled');
                return false;
            });

            $("div.datetimepicker").find('button').on('click',function(){
                alert('This field is non-editable');
                $("td.datetime").find('.datetimepicker').children().prop('disabled','disabled');
                return false;
            });
        },100);

        $('#firstname').on('keydown',function(){
            alert('This field is non-editable');
            $('#firstname').prop('disabled','disabled');
            return false;
        });

        $('#lastname').on('keydown',function(){
            alert('This field is non-editable');
            $('#lastname').prop('disabled','disabled');
            return false;
        });
    });
})(jQuery);