const Quickbooks = require("../models/quickbooks.model");

const RefreshToken = require("../../../config/RefershToken");
const Queue = require('bull');
const myQueue = new Queue('myQueue');
const axios = require("axios");
const configs=require("../../../config/common.config")

var batchSize=25;
exports.createtoken = function (req, res) {
  //handles null error
  let Msg = 0;
  console.log(req, "controllerreq");
  Quickbooks.createtoken(req, function (err, result) {
    console.log(result.accesstoken.length, "result");

    if (err) {
     
      res.send(
        '<script>window.close();alert("Please try again! Failed to connect with the Quickbooks.");</script>'
      );
    }
    if (result.accesstoken.length > 0) {
      console.log("success---------");
     
      res.send(
        '<script>window.close();alert("You are Successfully Connected to Quickbooks.");</script>'
      );

     
    } else {
     
      res.send(
        '<script>window.close();alert("Please try again! Failed to connect with the Quickbooks.");</script>'
      );
    }
    
  });

  
};

exports.gettoken = function (req, res) {
  //handles null error
 // console.log(req, "controllerreq");

  var errorFn = function (e) {
    console.log("Invalid JWT token!");
    console.log(e);
    res.redirect("/");
  };

  Quickbooks.gettoken(req.query, function (err, result) {
   // console.log(result, "result");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.companyname = async function (req, res) {
  console.log(req.query);

  if (!req.query.loginuserid) {
    return res.status(400).send('Missing loginuserid');
  }

  try {
    // Fetch the token data
    const responseResult = await axios.get(
      `${configs.quickbookBaseUrl}/quickbooks/refreshtoken?loginuserid=${req.query.loginuserid}`
    );
    
    console.log("777response", responseResult.data.ResponseData);
    const tokenData = responseResult.data.ResponseData;

    // Fetch the existing customer info
    const existingCustomer = await axios.get(
      `${configs.quickbooksyncapiurl}/${tokenData.realmid}/companyinfo/${tokenData.realmid}?minorversion=73`,
      {
        headers: {
          Authorization: `Bearer ${tokenData.accesstoken}`,
        },
      }
    );
 console.log(existingCustomer.data.CompanyInfo.CompanyName);
 
    return res.status(200).send(existingCustomer.data.CompanyInfo.CompanyName);
    
  } catch (error) {
    console.error("Error fetching data", error?.response?.data?.fault);
    return res.status(500).send('Error fetching data');
  }
};

exports.refreshtoken = async function (req, res) {
  const requestObj = {
    loginuserid: req.query.loginuserid,
  };

  console.log("requestObj =>", requestObj)
  const tokenData = await RefreshToken(requestObj);

  res.json({
    ResponseID: 0,
    ResponseCode: "SUCCESS",
    ResponseData: tokenData,
    ResponseMessage: "",
    ResponseJSON: "",
    OtherData: "",
  });
};

exports.exceptionQuickbook = function (req, res) {
  
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res
      .status(400)
      .send({ error: true, message: "Please provide all required field" });
  } else {
    Quickbooks.exceptionQuickbook(req.body, function (err, result) {
    
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });

      if (result[0].ID > 0) {
        res.json({
          ResponseID: result[0].ID,
          ResponseCode: "SUCCESS",
          ResponseData: [],
          ResponseMessage: "Data save successfully!",
          ResponseJSON: "",
          OtherData: "",
        });
      } else if (result[0].ID == -1) {
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "ProductId or ItemNumber already exists!",
          ResponseJSON: "",
          OtherData: "",
        });
      } else
        res.json({
          ResponseID: result,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: "Something went wrong!",
          ResponseJSON: "",
          OtherData: "",
        });
    });
  }
};

exports.quickbookidsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookidsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookidunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookidunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookvendorsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookvendorsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookvendorunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookvendorunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookitemsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookitemsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookitemunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookitemunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbooksalesuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbooksalesuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};


exports.quickbooksaleunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbooksaleunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookcategoriessuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookcategoriessuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};


exports.quickbookcategoriesunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookcategoriesunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookreceivingssuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookreceivingssuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookreceivingsunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookreceivingsunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookemployeesssuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookemployeesssuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookemployeessunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookemployeessunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookBankDepositHistorysuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookBankDepositHistorysuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookBankDepositHistoryunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookBankDepositHistoryunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookBankTransfersuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookBankTransfersuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};



exports.getcustomerfaildata = function (req, res) {
  // console.log( "result0");
  Quickbooks.getcustomerfaildata(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookBankTransferunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookBankTransferunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookjournalEntrysuccess  = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookjournalEntrysuccess (req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbookjournalEntryunsuccess  = function (req, res) {
  console.log( "result0");
  Quickbooks.quickbookjournalEntryunsuccess (req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.batchupdatecustomerfaildata = function (req, res) {
  // console.log( "result0");

  const Success = (postrequeestData, responsedata) => {
    const sucessobject = {
      MethodName: "upsert",
      ClassName: "customers.controller.js",
      Request: JSON.stringify(postrequeestData),
      Response: JSON.stringify(responsedata.data),
      Status: JSON.stringify(responsedata.status),
      Message: JSON.stringify(responsedata.statusText),
      ModueType: "customers",
      CreatedBy: postrequeestData.loginuserid,
    };
    return sucessobject;
  };

  const Error = (postrequeestData, error) => {
    const errorobject = {
      MethodName: "upsert",
      ClassName: "customers.controller.js",
      Request: JSON.stringify(postrequeestData),
      Response: JSON.stringify(error),
      Status: error.status,
      Message: error.code,
      ModueType: "customers",
      CreatedBy: postrequeestData.loginuserid,
    };
    return errorobject;
  };

  const UpdateData=async (tokenData,batcharray,postrequeestData)=>{
     
    try {
      console.log("quickbooks")
      // for(let i=0; i<itemarray.length; i++) {
      //   // if(itemarray[i].operation =="update") {
      //     const existingCustomer = await axios.get(
      //       `${configs.quickbooksyncapiurl}/${tokenData.realmid}/item/${batcharray[i].Customer.Id}`,
      //       {
      //         headers: {
      //           Authorization: `Bearer ${tokenData.accesstoken}`,
      //         },
      //       }
      //     );
  
      //     // // // console.log(existingItem?.data?.Item,"items==>")
      //     const syncToken = existingCustomer?.data?.Customer.SyncToken;
      //     const updatedSyncToken = parseInt(syncToken) + 1;

      //    // Assign the updated SyncToken value to the item for batch update
      //    batcharray[i].Customer.SyncToken = updatedSyncToken.toString();
      //    batcharray[i].Customer.SyncToken = syncToken;
      //   // }
      // }

      const requestBody = {
        BatchItemRequest: batcharray
      };

      // // // console.log(requestBody,"requestBody1234")
      // // // console.log(requestBody.BatchItemResponse[1].Fault,"requestBody")
  
     
       const responsedata = await axios.post(
        `${configs.quickbooksyncapiurl}${tokenData.realmid}/batch?minorversion=70`,
        requestBody,
        {
          headers: {
            "Content-Type": "application/json;charset=UTF-8",
            Authorization: `Bearer ${tokenData.accesstoken}`,
          },
        }
      );
     
      // const sucessdata = Success(postrequeestData, responsedata);
      // quickbooklog.exceptionQuickbook(sucessdata);
      console.log(responsedata.data, "responsedata1234")
      // const quickbookid = responsedata.data?.Customer?.Id;
      // return quickbookid;
   
   
    } catch (error) {
      console.error("Error during Axios call:", error);
      // const errordata = Error(postrequeestData, error);
      // quickbooklog.exceptionQuickbook(errordata);
      console.error('Error during Axios call:', error);
      return 0;
    }  
  }


  const QueueProcess=async(quickbookarray)=>{
    try {
      // Enqueue a background job
      await myQueue.add('processData', quickbookarray);
  
      // Respond immediately to the client
      res.json({ message: 'Process has been Started' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  QueueProcess(req.body.quickbookarray)

  myQueue.process('processData', async (job) => {
    let startIndex = 0;
    let curr_batch = 0;
    let batcharray=[]
    console.log(job,"jobs====>")

    while (startIndex < job.length) {
      const endIndex = Math.min(startIndex + batchSize, job.length);
  
      const currentBatch = job.slice(startIndex, endIndex);
      //console.log(currentBatch.length,"length===>")
      for (let i = 0; i < currentBatch.length; i++) {
        // if(currentBatch[i].QuickbookID==0){
          const customerobj={
            "bId": `Customer${i+1}`,
            "operation": "create",
            "Customer": {
              "FullyQualifiedName": currentBatch[i].CompanyName, 
              "PrimaryEmailAddr": {
                "Address": currentBatch[i].Email,
              },
              "DisplayName": currentBatch[i].CompanyName,
              "GivenName": currentBatch[i].FirstName,
              "Suffix": currentBatch[i].LastName,
              // "Title": namearray[0],
              "FamilyName": currentBatch[i].LastName,
              "PrimaryPhone": {
                "FreeFormNumber": currentBatch[i].PhoneNumber,
              },
              "CompanyName": currentBatch[i].CompanyName,
              "BillAddr": {
                // CountrySubDivisionCode: "CA",
                "CountrySubDivisionCode": currentBatch[i].State,
                "City": currentBatch[i].City,
                "PostalCode": currentBatch[i].Zip,
                "Line1": currentBatch[i].Address1,
                "Line2":currentBatch[i].Address2,
                "Country": currentBatch[i].Country,
              },
              "Balance": currentBatch[i].Balance,
              // "GivenName": currentBatch[i].Balance,        
            }
          }     
       
          batcharray.push(customerobj);
          // i++
        
        // i++
        //  }
      }
  
      // To Make API call for the batch
      // await RefreshToken(itemarray,req,{},curr_batch,batchSize,itemVariations,endIndex);

      await axios
      .get(
        `${configs.quickbookBaseUrl}/quickbooks/refreshtoken?loginuserid=${req.body.loginuserid}`
      )
      .then((responseResult) => {
       //console.log("response", responseResult.data.ResponseData);
        const tokenData = responseResult.data.ResponseData;

       
        if (tokenData.IsValid) {
            (async () => {
              try {
               
               const quickbookID = await UpdateData(tokenData,batcharray,req.body);
                if(endIndex==job.length){
                  // console.log( postrequestbody.xmlVariaction," postrequestbody.xmlVariaction")
                  BatchUpdateFailData()
                 }
              } catch (error) {
                console.error('Error:', error);
                BatchUpdateFailData(0)
              }
            })();
          // }
        }
      })
      .catch((error) => {
        // // console.log(error);
        BatchUpdateFailData(0);
      });
  
      // Clear the array for the next batch
      batcharray=[]
  
      // SetTimeout Delay for 2 seconds
      await delay(2000);
  
      // Updating startIndex for the next batch
      startIndex = endIndex;
      curr_batch++;
      
  }});

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


 const BatchUpdateFailData=()=>{
   try {
    Quickbooks.batchupdatecustomerfaildata(req.body,  function (err, result) {
      // console.log(result, "result1");
      if (err)
        res.json({
          ResponseID: 0,
          ResponseCode: "ERROR",
          ResponseData: [],
          ResponseMessage: err,
          ResponseJSON: "",
          OtherData: "",
        });
  
      if (result) {
        res.json({
          ResponseID: 0,
          ResponseCode: "SUCCESS",
          ResponseData: result,
          ResponseMessage: "",
          ResponseJSON: "",
          OtherData: "",
        });
      } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
    });
   } catch (error) {
    
   }
 }
};

exports.quickbookPaybillunsuccess = function (req, res) {
  // console.log( "result0");
  Quickbooks.quickbookPaybillunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

exports.quickbooksalespaymentsunsuccess = function (req, res) {
  // console.log( "result0");
  Quickbooks.quickbooksalespaymentsunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};


exports.onfleetsaleunsuccess = function (req, res) {
  console.log( "result0");
  Quickbooks.onfleetsaleunsuccess(req.query, function (err, result) {
    console.log(result, "result1");
    if (err)
      res.json({
        ResponseID: 0,
        ResponseCode: "ERROR",
        ResponseData: [],
        ResponseMessage: err,
        ResponseJSON: "",
        OtherData: "",
      });

    if (result) {
      res.json({
        ResponseID: 0,
        ResponseCode: "SUCCESS",
        ResponseData: result,
        ResponseMessage: "",
        ResponseJSON: "",
        OtherData: "",
      });
    } else res.json({ ResponseID: result, ResponseCode: "ERROR", ResponseData: [], ResponseMessage: "Something went wrong!", ResponseJSON: "", OtherData: "" });
  });
};

