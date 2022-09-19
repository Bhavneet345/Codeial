class toggleFriend{
    constructor(toggleElement){
        this.toggler = toggleElement;
        this.togglefriend();
    }
    togglefriend(){
        $(this.toggler).click(function(e){
            e.preventDefault();
            let self = this;
            $.ajax({
                type: 'get', 
                url: $(self).attr('href')
            })
            .done(function(data){
                if(data.data.added == true){
                    $(self).html('remove');
                }
                else{
                    $(self).html('add');
                }
            })
            .fail(function(err){
                console.log('error in completing the request');
            });
        });
    }
}