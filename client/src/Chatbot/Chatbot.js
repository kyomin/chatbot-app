import React from 'react';

function Chatbot() {

    const keyPressHandler = (e) => {
        // 엔터 키를 입력한 경우
        if(e.key === 'Enter'){
            if(!e.target.value) {
                return alert('내용을 입력하세요!');
            }

            // 무언가의 내용이 입력되었다면 Text Query Route에 request를 보낸다.
            // textQuery(e.target.value);

            // requset를 보낸 후에 다시 input 창을 빈 스트링으로 만들어 준다.
            e.target.value = "";
        }
    }

    return (
        <div style={{
            height: 700,
            width: 700,
            border: '3px solid black',
            borderRadius: '7px'
        }}>
            <div style={{
                height: 644,
                width: '100%',
                overflow: 'auto'
            }}>

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