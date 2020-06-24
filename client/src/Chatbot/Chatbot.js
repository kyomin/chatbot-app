import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { saveMessage } from '../_actions/message_actions';
import Message from './Section/Message';

function Chatbot() {
    const dispatch = useDispatch();
    const messagesFromRedux = useSelector(state => state.message.messages);

    // 페이지 로드될 때의 동작
    useEffect(() => {
        eventQuery('welcomeToMyWebsite');
    }, []);

    const textQuery = async (text) => {
        // step1) 클라이언트가 입력한 메시지 처리. 채팅 창에 해당 메시지를 올린다.

        // dialogflow가 응답으로 보내준 json데이터와 형식을 맞춘다. => postman에서 확인할 수 있다.
        let conversation = {
            who: 'you',
            content: {
                text: {
                    text: text
                }
            }
        }

        dispatch(saveMessage(conversation));

        // step2) 챗봇이 보낸 response 메시지를 처리한다.

        const textQueryVariables = {
            text
        };
        
        try {
            // Text Query Route에 request를 보낸다.
            const response = await axios.post('/api/dialogflow/textQuery', textQueryVariables);     // await으로 인해 서버에서 처리가 반환될 때까지 기다린다.
            
            for(let content of response.data.fulfillmentMessages) {
                conversation = {
                    who: 'kyobot',
                    content: content
                };
    
                dispatch(saveMessage(conversation));
            }
        } catch(err) {
            conversation = {
                who: 'kyobot',
                content: {
                    text: {
                        text: "Error occured, please check the problem"
                    }
                }
            };

            dispatch(saveMessage(conversation));
        }
    }


    const eventQuery = async (event) => {

        const eventQueryVariables = {
            event
        };
        
        try {
            // Event Query Route에 request를 보낸다.
            const response = await axios.post('/api/dialogflow/eventQuery', eventQueryVariables);     // await으로 인해 서버에서 처리가 반환될 때까지 기다린다.
            
            for(let content of response.data.fulfillmentMessages) {
                let conversation = {
                    who: 'kyobot',
                    content: content
                };
    
                dispatch(saveMessage(conversation));
            }
        } catch(err) {
            let conversation = {
                who: 'kyobot',
                content: {
                    text: {
                        text: "Error occured, please check the problem"
                    }
                }
            };

            dispatch(saveMessage(conversation));
        }
    }


    const keyPressHandler = (e) => {
        // 엔터 키를 입력한 경우
        if(e.key === 'Enter'){
            if(!e.target.value) {
                return alert('내용을 입력하세요!');
            }

            // 무언가의 내용이 입력되었다면 Text Query Route에 request를 보낸다.
            textQuery(e.target.value);

            // requset를 보낸 후에 다시 input 창을 빈 스트링으로 만들어 준다.
            e.target.value = "";
        }
    }


    const renderOneMessage = (message, idx) => {
        return <Message key={idx} who={message.who} text={message.content.text.text} />
    }


    const renderMessage = (returnedMessages) => {

        if(returnedMessages) {
            return returnedMessages.map((message, idx) => {
                return renderOneMessage(message, idx);
            });
        } else {
            return null;
        }
    }

    return (
        <div style={{
            height: 700,
            width: 700,
            border: '3px solid black',
            borderRadius: '7px'
        }}>
            <div style={{ height: 644, width: '100%', overflow: 'auto' }}>
                {renderMessage(messagesFromRedux)}
            </div>

            <input
                style={{
                    margin: 0,
                    width: '100%',
                    height: 50,
                    borderRadius: '4px',
                    padding: '5px',
                    fontSize: '1rem'
                }}
                placeholder="Kyobot에게 말을 걸어보세요~"
                type="text"
                onKeyPress={keyPressHandler}
            />
        </div>
    )
}

export default Chatbot;