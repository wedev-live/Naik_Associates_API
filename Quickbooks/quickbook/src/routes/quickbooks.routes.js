var tools = require("../../../config/tools.js");
var express = require("express");
var jwt = require("../../../config/jwt.js");
const fs = require("fs");
var router = express.Router();
const crypto = require("crypto");
var config = require("../../../config/config.json");
// var dbConn = require("./config/db.config.js")

var quickbookscontroller = require("../controllers/quickbooks.controller.js");

/** /sign_in_with_intuit **/
let loginuserid;

router.get("/sign_in_with_intuit", function (req, res) {
  // Set the OpenID scopes
  tools.setScopes("sign_in_with_intuit");
  loginuserid = req.query.lu;
  console.log(loginuserid, "loginuserid");

  // Constructs the authorization URI.
  var uri = tools.intuitAuth.code.getUri({
    // Add CSRF protection
    state: tools.generateAntiForgery(req.session),
  });
  // Redirect
  console.log("Redirecting to authorization uri 1: " + uri);

  // return
  res.redirect(uri);
});

router.get(
  "/callback",
  function (req, res, next) {
    

    // Exchange auth code for access token
    tools.intuitAuth.code.getToken(req.originalUrl).then(
      function (token) {
        
        tools.saveToken(req.session, token);
        req.session.realmId = req.query.realmId;

        var errorFn = function (e) {
          console.log("Invalid JWT token!");
          console.log(e);
          res.redirect("/");
        };

        if (token.data.id_token) {
          try {
           

            jwt.validate(
              token.data.id_token,
              function () {
               

                console.log(token, "token1234");
                // req.tokenid = token.data.id_token;
                req.accesstoken = token.data.access_token;
                req.refreshtoken = token.data.refresh_token;
                req.expiresin = token.expires;
                req.tokentype = token.data.token_type;
                req.loginuserid = loginuserid;
                req.realmId = req.query.realmId;

                next();

               
              },
              errorFn
            );
          } catch (e) {
            errorFn(e);
          }
        } else {
         
          res.send(
            '<script>window.close();window.alert("Please try again! Failed to connect with the Quickbooks.");</script>'
          );
        }
      },
      function (err) {
        console.log(err);
       
        let alertMsg =
          "Please try again! Failed to connect with the Quickbooks.";
        res.send(
          '<script>window.close();window.alert("Please try again! Failed to connect with the Quickbooks.");</script>'
        );
      }
    );
  },
  quickbookscontroller.createtoken
);

router.get("/gettoken", quickbookscontroller.gettoken);

router.get("/companyname", quickbookscontroller.companyname);

router.post("/webhook", function (req, res) {
  console.log(req.body, "request");

  var webhookPayload = JSON.stringify(req.body);
  console.log("The paylopad is :" + JSON.stringify(req.body));

  
  var signature = req.get("intuit-signature");

  var fields = ["realmId", "name", "id", "operation", "lastUpdated"];
  var newLine = "\r\n";

  // if signature is empty return 401
  if (!signature) {
    return res.status(401).send("FORBIDDEN");
  }

  // if payload is empty, don't do anything
  if (!webhookPayload) {
    return res.status(200).send("success");
  }

  /**
   * Validates the payload with the intuit-signature hash
   */
  var hash = crypto
    .createHmac("sha256", config.webhooksVerifier)
    .update(webhookPayload)
    .digest("base64");
  if (signature === hash) {
    console.log("The Webhook notification payload is :" + webhookPayload);

    /**
     * Write the notification to CSV file
     */
    var appendThis = [];
    for (var i = 0; i < req.body.eventNotifications.length; i++) {
      var entities = req.body.eventNotifications[i].dataChangeEvent.entities;
      var realmID = req.body.eventNotifications[i].realmId;
      for (var j = 0; j < entities.length; j++) {
        var notification = {
          realmId: realmID,
          name: entities[i].name,
          id: entities[i].id,
          operation: entities[i].operation,
          lastUpdated: entities[i].lastUpdated,
        };
        appendThis.push(notification);
      }
    }

   
    return res.status(200).send("SUCCESS");
  }
  return res.status(401).send("FORBIDDEN");
});

router.get("/refreshtoken", quickbookscontroller.refreshtoken);

router.post(
  "/exceptionquickbooksyc",
  quickbookscontroller.exceptionQuickbook
);

// quickbook customer success btn api
router.get
("/quickbookidsuccess", quickbookscontroller.quickbookidsuccess);

// quickbook customer btn api
router.get
("/quickbookidunsuccess", quickbookscontroller.quickbookidunsuccess);


// quickbook vendor success btn api
router.get
("/quickbookvendorsuccess", quickbookscontroller.quickbookvendorsuccess);

// quickbook vendor btn api
router.get
("/quickbookvendorunsuccess", quickbookscontroller.quickbookvendorunsuccess);


// quickbook item success btn api
router.get
("/quickbookitemsuccess", quickbookscontroller.quickbookitemsuccess);

// quickbook item btn api
router.get
("/quickbookitemunsuccess", quickbookscontroller.quickbookitemunsuccess);

// quickbook sale success btn api
router.get
("/quickbooksalesuccess", quickbookscontroller.quickbooksalesuccess);

// quickbook sale btn api
router.get
("/quickbooksaleunsuccess", quickbookscontroller.quickbooksaleunsuccess);

// quickbook categories success btn api
router.get
("/quickbookcategoriessuccess", quickbookscontroller.quickbookcategoriessuccess);

// quickbook categories btn api
router.get
("/quickbookcategoriesunsuccess", quickbookscontroller.quickbookcategoriesunsuccess);

// quickbook receivings success btn api
router.get
("/quickbookreceivingssuccess", quickbookscontroller.quickbookreceivingssuccess);

// quickbook receivings btn api
router.get
("/quickbookreceivingsunsuccess", quickbookscontroller.quickbookreceivingsunsuccess);

// quickbook employees success btn api
router.get
("/quickbookemployeesssuccess", quickbookscontroller.quickbookemployeesssuccess);

// quickbook employees btn api
router.get
("/quickbookemployeessunsuccess", quickbookscontroller.quickbookemployeessunsuccess);

// quickbook BankDepositHistory success btn api
router.get
("/quickbookBankDepositHistorysuccess", quickbookscontroller.quickbookBankDepositHistorysuccess);

// quickbook BankDepositHistory btn api
router.get
("/quickbookBankDepositHistoryunsuccess", quickbookscontroller.quickbookBankDepositHistoryunsuccess);

// quickbook BankTransfer success btn api
router.get
("/quickbookBankTransfersuccess", quickbookscontroller.quickbookBankTransfersuccess);

// quickbook BankTransfer btn api
router.get
("/quickbookBankTransferunsuccess", quickbookscontroller.quickbookBankTransferunsuccess);

// quickbook journalEntry success btn api
router.get
("/quickbookjournalEntrysuccess" , quickbookscontroller.quickbookjournalEntrysuccess)

// quickbook journalEntry btn api
router.get
("/quickbookjournalEntryunsuccess" , quickbookscontroller.quickbookjournalEntryunsuccess)

router.get
("/getcustomerfaildata", quickbookscontroller.getcustomerfaildata);

router.post("/batchupdatecustomerfaildata",  quickbookscontroller.batchupdatecustomerfaildata)

// quickbook paybills btn api
router.get("/quickbookPaybillsunsuccess" , quickbookscontroller.quickbookPaybillunsuccess)

router.get("/quickbooksalespaymentssunsuccess" , quickbookscontroller.quickbooksalespaymentsunsuccess)


// quickbook sale btn api
router.get
("/onfleetsaleunsuccess", quickbookscontroller.onfleetsaleunsuccess);




module.exports = router;
