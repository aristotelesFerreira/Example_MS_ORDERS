import * as AWS from "@aws-sdk/client-sns";
const client = new AWS.SNS({ region: "us-east-1" });

export const publishEventProjectCreated = async () => {
  try {
    let params = {
      Message: JSON.stringify({
        event: "create-project",
      }),
      TopicArn: "ARN_SNS",
    };

    await client.publish(params);
  } catch (err) {
    console.log("SNS ERROR", err);
  }
};
