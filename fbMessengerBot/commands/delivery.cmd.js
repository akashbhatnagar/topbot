/**
 * Created by akash.bhatnagar on 4/7/17.
 */
var axios = require('axios');
var fbMessage = require('../fbMessage/fbMessage');

var DELIVERY_API_SERVER = "https://api.delivery.com/merchant/search/delivery?client_id=MmUyYzJlM2NjZDkzODUzYjdkNGI5MjZiZDNkYWQ1NjM2&merchant_type=R&address=";

const config = {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
};

module.exports = function (commandArguments) {

    const url = DELIVERY_API_SERVER + commandArguments;
    // const url = "https://api.github.com/users/codeheaven-io";

    return new Promise(function (resolve, reject) {

        var a;

        axios.get(url,config)
            .then(function (response) {
                console.log(response);

                a = new fbMessage
                    .GenericTemplate();

                for (var i=0; i<10; i++) {

                    a.addElement({
                        title: response.data.merchants[i].summary.name,
                        image_url: response.data.merchants[i].yelp_info.rating.image_url,
                        subtitle: "Type: " + response.data.merchants[i].summary.type_label + " Phone: " + response.data.merchants[i].summary.phone
                    })
                    .addButton({
                        type: "web_url",
                        url: response.data.merchants[i].summary.url.complete,
                        title: "Go to Merchant Site"
                    })
                    .addButton({
                        type: "phone_number",
                        title: "Call Merchant",
                        payload: "+1" + response.data.merchants[i].summary.phone
                    })

                }

                 a =  a.compose();

                /*a = new fbMessage
                    .GenericTemplate()
                    .addElement({
                        title:      response.login,
                        image_url:  response.avatar_url,
                        subtitle:   response.type
                    })
                    .compose();*/
                /*a = new fbMessage
                    .PlainText("This is the result: " + response.data.login)
                    .compose();*/
                /*a = new fbMessage
                    .PlainText("This is the result: " + response.data.merchants[0].summary.name)
                    .compose();*/

                resolve(a);

            })
            .catch(function (error) {
                console.log(error);
                a = new fbMessage
                    .PlainText("Couldn't find any data for the address: " + commandArguments)
                    .compose();

                resolve(a);
            });


    });

}