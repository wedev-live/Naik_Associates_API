"use strict";
var Quickbooks = function (quickbooks) {};
var dbConn = require("../../config/db.config");
var js2xmlparser = require("js2xmlparser");

Quickbooks.createtoken = function (req, result) {
  
  console.log(req.realmId, "realmid===>");

  dbConn.query(
    "call proc_quickbooks_token_upsert(?,?,?,?,?,?)",
    [
      req.accesstoken,
      req.refreshtoken,
      req.tokentype,
      req.expiresin,
      req.loginuserid,
      req.realmId,
    ],
    function (err, res) {
      if (err) {
        
        result(null, 0);
        throw new Error(err);
      } else {
       
        const obj = {
          accesstoken: req.accesstoken,
          refreshtoken: req.refreshtoken,
          expiresin: req.tokentype,
          tokentype: req.expiresin,
          realmid: req.realmId,
        };
        result(null, obj);
      }
    }
  );
};

Quickbooks.checkactivetoken = async function (req, result) {
  dbConn.query(
    "call proc_quickbooks_checkactivetoken(?)",
    [req.loginuserid],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        // var insertIDArray = res[0];

        result(null, res[0]);
      }
    }
  );
};

Quickbooks.gettoken = function (req, result) {
  

  dbConn.query(
    "call proc_quickbooks_token_selectall(?)",
    [req.loginuserid],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.exceptionQuickbook = function (req, result) {
 
  dbConn.query(
    "call proc_quickbooksyncLog_insert(?,?,?,?,?,?,?,?)",
    [
      req.MethodName,
      req.ClassName,
      req.Request,
      req.Response,
      req.Status,
      req.Message,
      req.ModueType,
      req.CreatedBy,
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookidsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_customers_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookidunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_customer_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookvendorsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_suppliers_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookvendorunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_suppliers_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookitemsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_Item_Quickbook_SelectedById(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,   
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookitemunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );


  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_items_and_item_variations_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
     0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbooksalesuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_sales_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbooksaleunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_sales_QuickBook_Sync(?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.salestype,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookcategoriessuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_categories_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookcategoriesunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_Categories_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookreceivingssuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_receivings_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookreceivingsunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_Receivings_QuickBook_Sync(?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.ReceivingType,
      req.startdate ,
      req.enddate ,
     0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookemployeesssuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_employees_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookemployeessunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_Employee_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookBankDepositHistorysuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_BankDeposit_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookBankDepositHistoryunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_BankDepositHistory_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
       0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookBankTransfersuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_TransferHistory_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookBankTransferunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_TransferHistory_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookjournalEntrysuccess  = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_JournalItems_Quickbook_SelectedById(?,?,?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.filtertext ,
      req.ordercolumn ,
      req.currentorder ,
      req.startdate ,
      req.enddate ,
      xmlfiltercolumnsearchtext
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbookjournalEntryunsuccess  = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_Journal_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};



Quickbooks.getcustomerfaildata = function (req, result) {
 
  dbConn.query(
    "call proc_quickbookscustomer_faildata()",
    [],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};



Quickbooks.batchupdatecustomerfaildata = function (req, result) {
 
  dbConn.query(
    "call proc_batchupdatecustomer_faildata()",
    [],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};



Quickbooks.quickbookPaybillunsuccess = function (req, result) {
    dbConn.query(
      "call proc_Paybills_QuickBook_Sync(?,?,?,?,?)",
      [
        req.pagenumber,
        req.pagesize,
        req.startdate ,
        req.enddate ,
        0
      ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};

Quickbooks.quickbooksalespaymentsunsuccess = function (req, result) {
  dbConn.query(
    "call proc_sales_payments_QuickBook_Sync(?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.startdate ,
      req.enddate ,
      0
    ],
  function (err, res) {
    if (err) {
      // result(err, null);
      result(null, 0);
      throw new Error(err);
    } else {
      result(null, res[0]);
    }
  }
);
};

Quickbooks.onfleetsaleunsuccess = function (req, result) {
  const xmlfiltercolumnsearchtextXmldata =
    req.filtercolumnsearchtext === ""
      ? ""
      : JSON.parse(req.filtercolumnsearchtext);

  let xmlfiltercolumnsearchtext = "";

  xmlfiltercolumnsearchtext = js2xmlparser.parse(
    "FilterColumnTextXmlData",
    xmlfiltercolumnsearchtextXmldata
  );

  console.log(req.pagenumber,
    req.pageSize,
    req.filtertext ,
    req.ordercolumn ,
    req.currentorder ,
    req.startdate ,
    req.enddate ,
    xmlfiltercolumnsearchtext , "ssf")

  xmlfiltercolumnsearchtext = xmlfiltercolumnsearchtext.replace(/&amp;/g, "&");
  dbConn.query(
    "call proc_sale_Delivery_Sync(?,?,?,?,?,?)",
    [
      req.pagenumber,
      req.pagesize,
      req.salestype,
      req.startdate ,
      req.enddate ,
      0
    ],
    function (err, res) {
      if (err) {
        // result(err, null);
        result(null, 0);
        throw new Error(err);
      } else {
        result(null, res[0]);
      }
    }
  );
};





module.exports = Quickbooks;
