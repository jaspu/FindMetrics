//userajaxobj--object to pass to ajax() function when first time calling it for user data
//username--variable for getting the username from the text box

$(document).ready(function()   ///ready function starts here, it will go till end of file
{
var username;

    $('#userform').submit(function(event)  //Submit button function starts here, it will till second last position. Entire code and processing will be within this function
    {

        event.preventDefault();       //To prevent default behaviour of the button

        $('#userdata').html('<div id="loader"><img src="css/loader.gif" alt="loading..."></div>');

        username=$('#usertextbox').val();     //username value fetched from input box

        var userajaxobj={         //Object that has to pass to first ajax call (user profile ajax call) starts here
                            url:'https://api.github.com/users/'+username,
                            data:
                            {
                                  client_id:'',
                                  client_secret:''
                            },
                            dataType:'json'
                        };      //Object that has to pass to first ajax call (user profile ajax call) ends here

                        $.ajax(userajaxobj).done(userdonefunc).fail(userfailfunc);  //first ajax call (user profile ajax call)


          function userfailfunc(xhr)  //fail function of first ajax call (user profile ajax call) starts here
          {
                $('#userdata').html(`<h2>Error Code: ${xhr.status}<br/>Error Text: ${xhr.statusText}</h2>`);
          };                          //fail function of first ajax call (user profile ajax call) ends here


          function userdonefunc(user)   //success (done) function of first ajax call (user profile ajax call) starts here
          {
                  if (user.type=='User')    //if construct for user.type==user starts here
                  {
                                            //  usertablehtml is variable containing code for user table creation

                    var usertablehtml=`<img id="userimage"
                    src="${user.avatar_url}" height="200px"
                    width="200px" alt="${user.name}">           <!--image in the output page -->

                    <h3 id="username">${user.name}</h3>         <!--red color username in the output page -->

                    <hr>                                        <!--horizontal line below username in the output page -->

                    <h4>User Profile:</h4>              <!--User profile line in the output page -->

                    <table id="usertable">                      <!--user profile table starts here -->
                      <thead>
                        <tr>
                          <th class="followers"><a href="" onclick="return false;">Followers<a></th>
                          <th class="following"><a href="" onclick="return false;">Following<a></th>
                          <th class="repositories"><a href="" onclick="return false;">Public Repositories<a></th>
                          <th class="gists"><a href="" onclick="return false;">Public Gists<a></th>
                          <th>Member Since</th>
                          <th>Last Updated</th>
                          <th>Company</th>
                          <th>Website/blog</th>
                          <th>Email-id</th>
                          <th>Location</th>
                          <th>Bio</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>${user.followers}</td>
                          <td>${user.following}</td>
                          <td>${user.public_repos}</td>
                          <td>${user.public_gists}</td>
                          <td>${(user.created_at).substring(0,10)}</td>
                          <td>${(user.updated_at).substring(0,10)}</td>
                          <td>${user.company}</td>
                          <td>${user.blog}</td>
                          <td>${user.email}</td>
                          <td>${user.location}</td>
                          <td>${user.bio}</td>
                        </tr>
                      </tbody>
                     </table>`;

                     $('#userdata').html(usertablehtml);
                     $('#otherdata').html('');

                     $("table#usertable tr th.followers" ).click(followersFunc);  //click table header to call followersFunc function
                     $("table#usertable tr th.following" ).click(followingFunc);  //click table header to call followingFunc function
                     $("table#usertable tr th.repositories" ).click(repositoriesFunc);  //click table header to call repositoriesFunc function
                     $("table#usertable tr th.gists" ).click(gistsFunc);  //click table header to call gistsFunc function
                } //if construct for user.type==user ends here
                else    //else part for user.type==user means user.type==organization starts here
                {

                      var orgsAjaxObj={         //Object that has to pass to organization ajax call starts here
                                          url:'https://api.github.com/orgs/'+username,
                                          data:
                                          {
                                                client_id:'6f446000c412acfd6dfc',
                                                client_secret:'a46f6528b06d4d26701491ac95ca1c86a4164bfd'
                                          },
                                          dataType:'json'
                                      };      //Object that has to pass to organization ajax call ends here

                      $.ajax(orgsAjaxObj).done(orgsDoneFunc); // orgs Ajax Call

                      function orgsDoneFunc(orgs) //Done Function for orgs Ajax Call Starts Here
                      {

                        var members=membersCountFunc();            //membersCountFunc();
                        alert('orgsDone Func '+members);

                        var orgsTableHtml=`<img id="userimage"
                        src="${orgs.avatar_url}" height="200px"
                        width="200px" alt="${orgs.name}">           <!--image in the output page -->

                        <h3 id="username">${orgs.name}</h3>         <!--red color orgsname in the output page -->

                        <hr>                                        <!--horizontal line below orgsname in the output page -->

                        <h4>organization Profile:</h4>              <!--Oganization profile line in the output page -->

                        <table id="orgsTable">                      <!--Organization profile table starts here -->
                          <thead>
                            <tr>
                              <th class="members"><a href="" onclick="return false;">Members<a></th>
                              <th class="repositories"><a href="" onclick="return false;">Public Repositories<a></th>
                              <th>Member Since</th>
                              <th>Last Updated</th>
                              <th>Company</th>
                              <th>Website/blog</th>
                              <th>Email-id</th>
                              <th>Location</th>
                              <th>Description</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <td>${members}</td>
                              <td>${orgs.public_repos}</td>
                              <td>${(orgs.created_at).substring(0,10)}</td>
                              <td>${(orgs.updated_at).substring(0,10)}</td>
                              <td>${orgs.company}</td>
                              <td>${orgs.blog}</td>
                              <td>${orgs.email}</td>
                              <td>${orgs.location}</td>
                              <td>${orgs.description}</td>
                            </tr>
                          </tbody>
                         </table>`;

                         $('#userdata').html(orgsTableHtml);
                         $('#otherdata').html('');

                         $("table#orgsTable tr th.members" ).click(membersFunc);  //click table header to call membersFunc function
                         $("table#orgsTable tr th.repositories" ).click(repositoriesFunc);  //click table header to call repositoriesFunc function


                      }   //Done Function for orgs Ajax Call Starts Here


                }     //else part for user.type==user means user.type==organization ends here

           };    //success (done) function of first ajax call (user profile ajax call) ends here



    });  // Submit button function ends here

    function followersFunc()    //Followers header click (in userprofile table) function starts here
    {
      var followersAjaxObj={                        //object definition for followers ajax call stars here
                                 url:'https://api.github.com/users/'+username+'/followers',
                                 data:
                                 {
                                     client_id:'6f446000c412acfd6dfc',
                                     client_secret:'a46f6528b06d4d26701491ac95ca1c86a4164bfd',
                                 }
                           };       //object definition for followers ajax call ends here


                     $.ajax(followersAjaxObj).done(followersDoneFunc).fail(followersFailFunc);   //ajax call for followers

                     function followersFailFunc(xhr)  //fail function of followers ajax call starts here
                     {
                           $('#otherdata').html(`<h2>Error Code: ${xhr.status}<br/>Error Text: ${xhr.statusText}</h2>`);
                     };                          //fail function of followers ajax call ends here

                     function followersDoneFunc(followers)  //done function of followers ajax call starts here
                     {

                       //Variable for table header creation of followers table
                       var followersTableFirstHtml=`<h4>Followers</h4>
                             <table id="followersTable">
                                   <thead>
                                         <tr>
                                           <th>S.No.</th>
                                           <th>Follower's Login id</th>
                                           <th>Followers Name</th>
                                           <th>Member Since</th>
                                           <th>Company</th>
                                           <th>email-id</th>
                                           <th>Website/blog</th>
                                           <th>Location</th>
                                         </tr>
                                   </thead>
                                   <tbody id="followerstbody">
                                   </tbody>
                             </table>`;

                            $('#otherdata').html(followersTableFirstHtml); // followers table header creation
                            //
                            //  $.each(repos,function(i,val)   //table body creation of followers table stars here
                            //  {
                            //    //Variable for table body creation of followers table
                            //            var repotablesecondhtml=`<tr>
                            //              <td>${i+1}</td>
                            //              <td>${val.name}</td>
                            //              <td>${val.description}</td>
                            //              <td>${val.language}</td>
                            //              <td>${val.size}</td>
                            //              <td>${val.forks}</td>
                            //              <td>${val.watchers_count}</td>
                            //              <td>${val.stargazers_count}</td>
                            //              <td>${(val.created_at).substring(0,10)}</td>
                            //              <td>${val.homepage}</td?
                            //            </tr>`
                            //
                            //            $('#repotable tbody').append(repotablesecondhtml); //table body creation of followers table
                            // });           //table body creation of followers table ends here
                            //
                            //




                     }     //done function of followers ajax call ends here

    };                          //Followers header click (in userprofile table) function ends here

    function followingFunc()    //Following header click (in userprofile table) function starts here
    {
             alert( "Handler for following called." );
    };                          //Following header click (in userprofile table) function ends here

    function repositoriesFunc()    //Public Repositories header click (in userprofile table) function starts here
    {
       var repoajaxobj={                        //repo object defined for repository ajax call stars here
                            url:'https://api.github.com/users/'+username+'/repos',
                            data:
                            {
                                client_id:'6f446000c412acfd6dfc',
                                client_secret:'a46f6528b06d4d26701491ac95ca1c86a4164bfd',
                                sort:'created: asc',
                                per_page: 100,
                                page:1
                           }
                       };       //repo object defined for repository ajax call ends here


                      $.ajax(repoajaxobj).done(repodonefunc).fail(repofailfunc);   //ajax call for repositories

                      function repofailfunc(xhr)  //fail function of repository ajax call starts here
                      {
                            $('#otherdata').html(`<h2>Error Code: ${xhr.status}<br/>Error Text: ${xhr.statusText}</h2>`);
                      };                          //fail function of repository ajax call ends here

                      function repodonefunc(repos)  //done function of repository ajax call starts here
                      {

                        //Variable for table header creation of repositories table
                        var repotablefirsthtml=`<h4>Public Repositories</h4>
                              <table id="repotable">
                                    <thead>
                                          <tr>
                                            <th>S.No.</th>
                                            <th>Repo Name</th>
                                            <th>Description</th>
                                            <th>Language</th>
                                            <th>Size</th>
                                            <th>Forks</th>
                                            <th>Watchers</th>
                                            <th>Stars</th>
                                            <th>Created on</th>
                                            <th>Homepage</th>
                                          </tr>
                                    </thead>
                                    <tbody id="repotbody">
                                    </tbody>
                              </table>`;

                              $('#otherdata').html(repotablefirsthtml); // Repositories table header creation

                              $.each(repos,function(i,val)
                              {
                                        var repotablesecondhtml=`<tr>
                                          <td>${i+1}</td>
                                          <td>${val.name}</td>
                                          <td>${val.description}</td>
                                          <td>${val.language}</td>
                                          <td>${val.size}</td>
                                          <td>${val.forks}</td>
                                          <td>${val.watchers_count}</td>
                                          <td>${val.stargazers_count}</td>
                                          <td>${(val.created_at).substring(0,10)}</td>
                                          <td>${val.homepage}</td?
                                        </tr>`

                                        $('#repotable tbody').append(repotablesecondhtml);
                             });






                      }     //done function of repository ajax call ends here

    };                            //Public Repositories header click (in userprofile table) function ends here

    function gistsFunc()    //Public gists header click (in userprofile table) function starts here
    {
             alert( "Handler for gists called." );
    };                      //Public gists header click (in userprofile table) function ends here

    function membersCountFunc()   // members Count function starts here
    {

      var membersCount;  //variable for members count to be returned to calling function

      var membersAjaxObj={                        //object defined for members ajax call stars here
                           url:'https://api.github.com/orgs/'+username+'/members',
                           data:
                           {
                               client_id:'6f446000c412acfd6dfc',
                               client_secret:'a46f6528b06d4d26701491ac95ca1c86a4164bfd',
                               sort:'created: asc',
                               per_page: 100,
                               page:1
                          }
                      };       //object defined for members ajax call ends here

                      $.ajax(membersAjaxObj).done(membersDoneFunc);

                      function membersDoneFunc(members)  //members done function starts here
                      {
                          membersCount=members.length;
                          alert('membersDoneFunc '+membersCount);
                      }   //members done function ends here
        alert('membersCountFunc '+membersCount);
        return membersCount;

    }                       // members Count function ends here

});   // Whole coding ends here. Means the ready function ends here
