const AWS = require('aws-sdk');

AWS.config.update({ region: 'us-east-1' });

exports.handler = async (event) => {
    
    let docClient = new AWS.DynamoDB.DocumentClient();

    let payload = {
        TableName: 'view-count',
        Key: {
            'web-domain': 'adamljayne'
        },
        UpdateExpression: "SET PageViews = PageViews + :v",
        ExpressionAttributeValues: {
            ':v': 1
        },
        ReturnValues: 'ALL_NEW'
    };
    
    let data;
    
    try {
        data = await docClient.update(payload).promise();
        const response = {
            statusCode: 200,
            body: JSON.stringify({ views: data.Attributes.PageViews }),
        };
    return response;
    } catch (e) {
        const response = {
            statusCode: 500,
            body: JSON.stringify({ message: 'Something went wrong' }),
        };
        return response;
    }
};
