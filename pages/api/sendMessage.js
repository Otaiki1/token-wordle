// const credentials = {
//   // apiKey: '0e01817f532176428c4f24e44312a48899763ddf9fd1520292fef9836859e153',
//   apiKey: "cb0b70490af7eb28f2c9c2e16bea7d81465a2dc7df02ddba82ba44cb44c15b5a",
//   username: "tokenWordle",
// };

const AfricasTalking = require("africastalking");
const africastalking = AfricasTalking({
  apiKey: "cb0b70490af7eb28f2c9c2e16bea7d81465a2dc7df02ddba82ba44cb44c15b5a",
  username: "tokenWordle",
});
// import AfricasTalking from "africastalking";

// const username = "sandbox";
// const apiKey =
//   "b2d1ff5368f0abcebcac8200291fec75281e8fe642d255c1ac01f40fe8f59c8c";

//   const airtime = AfricasTalking.AIRTIME;

export default async function handler(req, res) {
  console.log("reqq", req.body);

  if (req.method === "POST") {
    // Parse the request body to get the phone number and amount
    const { phoneNumber, amount } = req.body;
    console.log(phoneNumber);

    try {
      // Send airtime using the airtime instance created above
      // const options = {
      //   recipients: [
      //     {
      //       phoneNumber,
      //       amount,
      //       currencyCode: "NGN",
      //     },
      //   ],
      // };
      const response = africastalking.SMS.send({
        to: phoneNumber,
        message: "Hey ,You have received 100 Naira Airtime",
      });
      console.log("response is ", response);

      // Send a success response back to the client
      res.status(200).json({ success: true, response });
    } catch (error) {
      // Send an error response back to the client
      console.log("FAILED");
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    // Send a "method not allowed" response if the request method is not POST
    res.status(405).json({ success: false, message: "Method not allowed" });
  }
}
