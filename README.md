<<<<<<< HEAD

안녕하세요!

이 프로젝트는 웹 프로그래밍을 이용하여 챗봇 애플리케이션을 만든 프로젝트입니다.

Dialogflow API를 이용하였습니다.


쓰여진 기술은 다음과 같습니다.

	front-end : React.js

	back-end : Node.js & MongoDB & Dialogflow API


이 어플리케이션을 실행시키기 위해서는 다음의 절차를 밟아야 합니다.

	1. config 폴더 내의 dev.js 파일 안에 자신의 mongoDB 정보를 기입합니다.
	2. root 디렉토리에서의 "npm install" 명령어는 Server Dependencies를 위한 것입니다.
	3. client 디렉토리에서의 "npm install" 명령어는 Front-end Dependencies를 위한 것입니다.


동작 처리를 위해 노드 서버에서 다음의 2가지 라우트를 설계하였습니다.

	1. Text Query Route

	클라이언트에서 타이핑을 하면, 해당 텍스트 값이 Text Query Route로 가고, 여기 처리를 거친 후 적절한 응답을 보내줍니다.

	2. Event Query Route

	타이핑 없이, 특정 이벤트에 대한 응답을 처리합니다.
	예를 들어, 새로고침 후 페이지가 로드되는 이벤트가 발생할 때, 처음으로 보여지는 챗봇의 대사가 그것입니다.



어플리케이션을 실행시킬 때 발생하는 문제나, 코드에 대한 의문점 및 개선 사항에 대한 의견은 다음의 연락처로 문의 바랍니다!

e-mail : kim031504@naver.com

>>>>>>> 7fc45acd9c9ad9acafadc7177275c8d5d9bddac8
