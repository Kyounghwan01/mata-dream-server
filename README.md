# MATA-DEREAM

## Intorduction

- **MATA-DEREAM** : 한강 공원에 자리 잡은 사람에게 그 자리를 구매하는 가상 앱
- 앱 프레임 워크 : `react-naticve`, `expo`
- 실시간 통신 : `socket.io`

<br>[![Video Label](http://img.youtube.com/vi/e6tEy4qXAHI/0.jpg)](https://www.youtube.com/watch?v=e6tEy4qXAHI)

## Requirements

- 모바일 앱 (각 핸드폰 스토어에서 `expo` 설치 후 사용)
- 웹으로 구동 하시려면 Xcode, simulator가 설치 요구
- 모바일 사용시, 위치 서비스 `on` 후 실행

## Installation

```javascript
//client
git clone https://github.com/Kyounghwan01/mata-dream-app.git
cd mataDream-app
yarn install
yarn ios or yarn start

```

- client 환경 변수

```javascript
//client root리렉토리 `environment.js` 생성 후 아래 코드 작성
import Constants from "expo-constants";

const localhost = "http://localhost:3001";

const ENV = {
  dev: {
    apiUrl: localhost,
    //https://developers.facebook.com/ 에서 앱 생성후 나온 app id 기입
    FB_appKey: "yourAppId",
    authConst: {
      SOCIAL_ID: "SOCIAL_ID",
      FBTOKEN: "FBTOKEN",
      USERTOKEN: "USERTOKEN"
    }
  }
};

const getEnvVars = (env = Constants.manifest.releaseChannel) => {
  return ENV.dev;
};

export default getEnvVars;
```

```javascript
//server (다른 terminal)
git clone https://github.com/Kyounghwan01/mata-dream-server.git
cd mataDream-server
yarn install
yarn start
```

- server 환경 변수

```javascript
//server root 리렉토리 `.env` 생성 후 아래 환경변수 기입
PORT = 3001;
NODE_ENV = development;
SESSION_SECRET_KEY = 12345;
TOKEN_SECRET_KEY = 123456;
DB_URL =
  "mongodb+srv://mongodbUser:<password>@cluster0-9ockr.gcp.mongodb.net/mata_dream?retryWrites=true&w=majority";
TEST_DB_URL =
  "mongodb+srv://mongodbUser:<password>@cluster0-9ockr.gcp.mongodb.net/test_mata_dream?retryWrites=true&w=majority";
AWS_ACCESS_KEY_ID = "yourAwsAccessKeyId";
AWS_SECRET_ACCESS_KEY = "youtAwsSecretAccessKey";
```

## Features

- Facebook login
- JSON Web Token Authentication
- 로그아웃
- 공원 리스트 페이지
- 공원 별 자리 판매 위치 확인
- 사진 저장, 카메라, 앨범 접근
- 공원 별 자리 등록, 삭제 기능
- 실시간 채팅, 교환 기능
- 동시접속된 상대방의 행동에 따라 실시간으로 다른 반응 도출
  - 판매자 채팅방에 구매자 1 접근시, 실시간으로 구매자 2 접근 못하도록 이벤트
  - 구매자 방 나갈시 다른 구매자가 판매자 채팅방 접근 가능 이벤트
  - 판매자 방 나갈시 구매자도 자동 방 나감 이벤트
  - 교환 수락시, 본인에게 대기 이벤트, 상대방에게는 상대방이 교환 수락 알림 이벤트
  - 교환 거부시, 상대방에게 거부 이벤트

## Skills

### Client-Side

- ES2015+
- react-native
- react-navigation
- Expo

### Server-Side

- Node.js
- Express
- ES2015+
- JSON Web Token Authentication
- MongoDB
- Mongoose
- Atlas

## Test

- Reducer Unit Test (Jest)
- Component Unit Test (Jest, Enzyme)
- end-to-end Test(e2e) (detox) : 아래의 이유, `expo` 지원 중지로 인하여 실패
  - 테스트 실행까지는 성공했으나, detox가 element를 인식하지 못하여 클릭 및 타이핑 불가
  - https://github.com/wix/Detox/blob/master/docs/Guide.Expo.md
  - [Things To Do](#Things-To-Do)

## Deployment & Continuous Integration

### Client

- Google Play Store 배포 (mata-dream)

### Server

- AWS Elastic beanstalk를 통해 서비스 배포
- CircleCI를 통한 배포 자동화

## Project Control

- Git Branch 활용
- Trello 활용한 Task Management

## Challenges

### react-native 특징 파악

- `react-navigation`의 `createSwitchNavigator`, `createBottomNavigator`, `createAppContainer` 특징 파악
  - 결론으로 위 네비게이션을 통해 이미 짜여진 구조에서 새로 화면을 추가 과정 어려움
  - 그에 따라 화면 구조를 먼저 배치하고 내부를 채워 넣는 방법으로 개발 진행

### 실시간 채팅, 정보 교환

- socket room leave 해도 계속 연결
  - `socket`은 해당 컴포넌트를 벗어나면 `disconnect, room leave`를 해줘야 다음 컴포넌트에 영향을 주지 않는데, `react-native`의 경우 `componentWillUnmount`때 위 과정을 실행 해도 `socket`이 끊기지 않음
  - `navigation` prop에 `addListener('didBlur', callback)`에 화면을 벗어나면 나오는 이벤트를 callback에 넣어서 해결.
- 실시간 요청으로 비동기 과정 요
  - 교환이 성공하면, 거래 리스트 페이지로 이동 전, 본인이 성공 한 거래 리스트 삭제 후, 리스트 렌더

### 코드 재사용, 모듈화

- 재사용 가능한 코드
  - 뒤로가기, 로그아웃 버튼 등 대부분의 스크린에 필요한 요소를 컴포넌트 화 하여 분리
  - 그에 따라 `icon`의 이름, `button`의 `onPress` 이벤트가 독립적으로 유지되야함을 깨닫고, `prop`으로 내리기 시작
  - `container`를 하나로 앱 전체를 감싸 앱 내 정보를 `mapDispatchToProps`내 함수로 핸들링 가능 (A라는 함수로 정보를 바꾸면 다른 스크린에서도 동일하게 바뀜, 다른 스크린에서도 A함수 사용 가능)

### AWS S3 자료 저장 및 삭제

- data formatting
  - 받은 사진을 AWS에 전송 전, AWS가 원하는 자료 및 차후 재사용하기 용이하게 데이터 포맷팅
  - 사진 저장 전, AWS s3에 삭제하기 용이한 포맷으로 저장하여, s3에서의 데이터 삭제 과정이 용이하게 이뤄짐

## Things To Do

- e2e test
  - react-native의 경우 expo가 지원을 안하기에 자체적으로는 불가능 하고, `expo build:ios`를 통해 `.ipa`파일을 만들어야 `detox`를 통해 e2e 테스트 실행가능한데, 빌드를 하려면 apple 라이센스를 구입해야만 빌드가 가능하여 작성 중지
  - 기존 사람이 했던 테스트는 자기가 행동한 방식으로만 테스트를 진행하는데, e2e 테스트는 컴퓨터가 사람처럼 행동하는 것으로 몰랐던 에러도 도출 가능
  - 라이센스 구매 시 꼭 해보고 싶은 테스트입니다
- 실시간 기능 `socket.io` 활용한 코드 구간 리펙토링
  - socket을 불러오는 부분을 `api > socket > index.js` 디렉토리로 옮겨서 컴포넌트 파일을 좀 더 가볍게 한다
- 채팅 전송시 알람 기능
  - 채팅 앱의 경우 대부분 알람 기능을 가지고 있고, i안드로이드의 경우 무료로 가능(ios는 유료 계정만 가능)하여 이 기능을 만들어 보고 싶습니다.

## Sincere Thanks

[Ken Huh](https://github.com/Ken123777) / Vanilla Coding
