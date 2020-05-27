const express = require('express');
const router = express.Router();
const structjson = require('./structjson.js');
const dialogflow = require('dialogflow');

const config = require('../config/dev');
const projectId = config.googleProjectID;
const sessionId = config.dialogFlowSessionID;
const languageCode = config.dialogFlowSessionLanguageCode;

// 내 계정을 이용하여 dialogflow와의 세션 생성
const sessionClient = new dialogflow.SessionsClient();
const sessionPath = sessionClient.sessionPath(projectId, sessionId);

/* 두 개의 라우트를 만들 것이다. */

// 1. Text Query Route : 클라이언트에서 타이핑을 한 것에 대한 처리
router.post('/textQuery', async (req, res) => {     // await 키워드는 async 함수 내에서 작동하므로 이렇게 명시!
    // 클라이언트에서 받은 정보를 Dialogflow API에게 보내준다.
      
    // The text query request.
    const request = {
        session: sessionPath,
        queryInput: {
            text: {
                // 클라이언트에서 타이핑한 쿼리가 dialogflow agent에게 보내진다. 하드코딩이 아닌, 어떤 쿼리든 여기로 와야 하므로 변수로 담는다.
                text: req.body.text,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };
    
    // Send request and log result to Dialogflow API
    const responses = await sessionClient.detectIntent(request);    // Dialogflow에서 가공한 데이터가 담긴다.
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    res.send(result);
});


// 2. Event Query Route : 타이핑 없이, 특정 이벤트에 대한 응답
router.post('/eventQuery', async (req, res) => {     // await 키워드는 async 함수 내에서 작동하므로 이렇게 명시!
    // 클라이언트에서 받은 정보를 Dialogflow API에게 보내준다.
      
    // The event query request.
    const request = {
        session: sessionPath,
        queryInput: {
            event: {
                // 클라이언트에서 타이핑한 쿼리가 dialogflow agent에게 보내진다. 하드코딩이 아닌, 어떤 쿼리든 여기로 와야 하므로 변수로 담는다.
                name: req.body.event,
                // The language used by the client (en-US)
                languageCode: languageCode,
            },
        },
    };
    
    // Send request and log result to Dialogflow API
    const responses = await sessionClient.detectIntent(request);    // Dialogflow에서 가공한 데이터가 담긴다.
    console.log('Detected intent');
    const result = responses[0].queryResult;
    console.log(`  Query: ${result.queryText}`);
    console.log(`  Response: ${result.fulfillmentText}`);
    
    res.send(result);
});

module.exports = router;