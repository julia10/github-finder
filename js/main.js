$(document).ready(function(){
    $("#searchUser").on("keyup", function(e){
        let username = e.target.value;

        //Make request to GitHub
        $.ajax({
            url : "https://api.github.com/users/" + username,
            data : {
                client_id:"b1e193804bb0746a1d70",
                client_secret:"120ee38c313eec6225c68e7723b36cb409178ba2"
            }
        }).done(function(user){
            $("#profile").html(`
            <div class="panel panel-default">
                <div class="panel-heading">${user.name}</div>
                <div class="panel-body">Panel Content</div>
            </div>
            `);
        });

    });
});