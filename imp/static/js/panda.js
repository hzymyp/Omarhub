$(document).ready(function(){
        $("ul#category-tab li a").click(function() {
                //change the current tab to active state
                $("ul#category-tab li a").removeClass("active");
                $(this).addClass("active");

                //get the id of the tab
                var category = $(this).prop('id');
                var callbackUrl = '/content/provider/get'+category+'s';

                if (category === 'all') {
                    callbackUrl = '/content/provider/getrecentall';
                }


                //send ajax to get the events/offer/needs
                $.ajax({
                        url: callbackUrl,
                        type: 'post',
                        data: {'cursor':0,'mode':1},
                        success: function(contentJson) {
                            contentJson = JSON.parse(contentJson);
                            if (category === 'people') {
                                showPeople(contentJson);
                            }

                            else {
                                showContent(contentJson);
                            }
                        }
                });
                return false;
        });

        function showContent(contentJson) {
            if (contentJson === 'null') {
                $('#content-items')[0].innerHTML = "<p>No items in the database.</p>";
            }

            else {
                $('#content-items')[0].innerHTML = '';
                var i = contentJson.length-1;
                for (i;i>=0;i--) {
                    var item = contentJson[i];
                    var contentItem = $('<div class="content-item"></div>');

                    //parse the user info box
                    var userContainer = $('<div class="user-container grid_2 omega"></div>');
                    var userInfo = $('<div class="user-info"></div>');
                    var avatarWrap = $('<a class="avatar-wrap" href="#"></a>');
                    var avatarImg = $('<img class="avatar"></img>');
                    avatarImg.prop('src', '/static/img/avatar.jpg');
                    avatarWrap.append(avatarImg);
                    var pName = $('<p>Name</p>');
                    pName.html(item.author.first_name+' '+item.author.last_name);
                    var pLocation = $('<p>Location</p>');
                    pLocation.html(item.author.location);
                    userInfo.append(avatarWrap);
                    userInfo.append(pName);
                    userInfo.append(pLocation);
                    userContainer.append(userInfo);

                    //parse the content details
                    var itemDetails = $('<div class="item-details grid_9 alpha"></div');
                    var itemDetailMain = $('<div class="item-details-main"></div>');
                    var followLink = $('<a href="#" class="follow-item-button"></a>');
                    itemDetailMain.append(followLink);

                    var generalInfo = $('<div class="general-info"></div');
                    var itemHeader = $('<h3 class="item-title"></h3>');
                    itemHeader.html(item.title);
                    var itemTime = $('<p class="item-time">May-2123 to May-23</p>');
                    itemTime.html(item.start_date+'-'+item.end_date);
                    generalInfo.append(itemHeader);
                    generalInfo.append(itemTime);
                    itemDetailMain.append(generalInfo);

                    var descriptionWrap = $('<div class="item-description-wrap"></div>');
                    var itemDescription = $('<p class="item-description"></p>');
                    itemDescription.html(item.description);

                    descriptionWrap.append(itemDescription);
                    itemDetailMain.append(descriptionWrap);
                    itemDetails.append(itemDetailMain);

                    var itemTags = $('<div class="item-details-tags"></div>');
                    itemDetails.append(itemTags);
                    contentItem.append(itemDetails);
                    contentItem.append(userContainer);

                    var clearFix = $('<div class="clearfix"></div>');

                    clearFix.append(contentItem);
                    $('#content-items').append(clearFix);
                }
            }
        }
        $('#all').trigger('click');
});
