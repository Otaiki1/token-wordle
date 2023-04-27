const credentials = {
  apiKey: "e193fbd531ef0aaf74b4257da4c028b5b5aa9700ba3726d1eb9d50895bf7dd4a",
  username: "sandbox",
};

const AfricasTalking = require("africastalking")(credentials);
// import AfricasTalking from "africastalking";

// const username = "sandbox";
// const apiKey =
//   "b2d1ff5368f0abcebcac8200291fec75281e8fe642d255c1ac01f40fe8f59c8c";

const airtime = AfricasTalking.AIRTIME;

export default async function handler(req, res) {
  console.log("reqq", req.body);

  if (req.method === "POST") {
    // Parse the request body to get the phone number and amount
    const { phoneNumber, amount } = req.body;
    console.log(phoneNumber);

    try {
      // Send airtime using the airtime instance created above
      const options = {
        recipients: [
          {
            phoneNumber,
            amount,
            currencyCode: "NGN",
          },
        ],
      };
      const response = airtime.send(options);
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
