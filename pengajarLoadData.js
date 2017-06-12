var AWS = require('aws-sdk');
var fs = require('fs');

AWS.config.update({
    region: "eu-central-1"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing movies into DynamoDB. Please wait.");

var allPengajars = JSON.parse(fs.readFileSync('datapengajar.json', 'utf8'));
allPengajars.forEach(function(pengajar) {
    var params = {
        TableName: "tpa",
        Item: {
            "nama":  pengajar.nama,
            "image": pengajar.photo
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add pengajar", pengajar.nama, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", pengajar.nama);
       }
    });
});
