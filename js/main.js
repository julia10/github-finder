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
            $.ajax({
                url : "https://api.github.com/users/" + username + "/repos",
                data : {
                    client_id:"b1e193804bb0746a1d70",
                    client_secret:"120ee38c313eec6225c68e7723b36cb409178ba2",
                    sort: "created: asc",
                    per_page: 7
                }
            }).done(function(repos){
                //console.log(repos);
                $.each(repos, function(index, value){
                    $("#repos").append(`
                        <div class="well">
                            <div class="row">
                                <div class="col-md-7">
                                    <strong>${value.name}</strong>: ${value.description}
                                </div>
                                <div class="col-md-3">
                                    <span class="label label-default">Forks: ${value.forks_count}</span>
                                    <span class="label label-primary">Watchers: ${value.watchers_count}</span>
                                    <span class="label label-success">Stars: ${value.stargazers_count}</span>
                                </div>

                                <div class="col-md-2">
                                    <a href="${value.html_url}" target="_blank" class="btn btn-default">Link</a>
                                </div>
                            </div>
                        </div>
                    `);
                });
            });
            $("#profile").html(`
            <div class="panel panel-default">
                <div class="panel-heading">${user.name}</div>
                <div class="panel-body">
                    <div class="row">
                        <div class="col-md-3"> 
                            <img class="thumbnail avatar" src="${user.avatar_url}">
                            <a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">Profile Link</a>
                        </div>

                        <div class = "col-md-9"> 
                            <span class="label label-default">Public Repos: ${user.public_repos}</span>
                            <span class="label label-primary">Public Gists: ${user.public_gists}</span>
                            <span class="label label-success">Followers: ${user.followers}</span>
                            <span class="label label-info">Following: ${user.following}</span>
                            <br><br>
                            <ul class="list-group">
                                <li class = "list-group-item"> Company: ${user.company}</li>
                                <li class = "list-group-item" > Website/Blog: ${user.blog}</li>
                                <li class = "list-group-item"> Location: ${user.location}</li>
                                <li class = "list-group-item"> Member Since: ${user.created_at}</li>
                            </ul>


                        </div>
                    </div>
                </div>
            </div>

            <h3 class="page-header">Latest Repos</h3>
            <div id="repos"></div>
            `);
        });

    });
});