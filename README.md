# react-mobx-ts-realworld


## 스펙분석

`페이지 구성`

Home, Sign in, Sign up, Post 쓰기, 마이페이지, 설정, Post 보기

`공통`

좌측 상단의 title을 통해 Home으로 이동

작업 간 통신중 대기가 필요한 경우 Loading… 나타내기

버튼을 누르고 작업이 이루어지는 동안 버튼이 음영 및 마우스 포인터 변경

`Home`

Global Feed 탭을 통해 모든 게시글 확인

게시글 내용을 클릭하여 Post 화면으로 이동

profile 클릭시 마이페이지로 이동

Popular tags 항목을 클릭하여 해당 tag를 위한 탭을 생성(탭 자리는 하나만 추가된다.)

게시글 좌측 하트버튼을 통해 Like하기

현재 보여주고 있는 탭에 밑줄 나타내기

__로그인 후__

초록색 header 삭제

Your Feed 탭이 제일 첫번째로 생성

우측 상단에 New Post, Settings, 마이페이지 버튼 생성

`Sign in`

Need an account? 항목을 통해 Sign Up으로 이동

Email, Password 항목을 입력하고 Sign in 버튼을 통해 로그인

Email의 형식에 맞지 않으면 말풍선을 통한 설명

email이나 password 가 맞지 않으면 invalid 문구를 email 칸 위에 경고문구 보이기

`Sign up`

Have an account? 항목을 통해 Sign in 으로 이동

Username, Email, Password 항목을 입력하고 Sign in 버튼을 통해 회원가입

blank, too long(username: 20, pw: 72)

`New Post`

Article Title 입력하기

What’s this article about? 입력하기

Write your article (in markdown) 입력하기

Enter tags 입력하기

Tag 입력시 하단에 태그 미리보기 추가하기

Publish Article 버튼으로 글 올리기

`Settings`

URL of profile picture 입력하기

Username 입력하기

Email 입력하기

New Password 입력하기

Update Settings 버튼을 통해 정보 업데이트 하기

Or click here to logout 버튼을 통해 로그아웃 하기

`Personal Page`

My Articles 탭을 통해 자신이 쓴 글 보기

Favorited Articles 탭을 통해 Like 한 글 보기

없는 경우 ‘No articles are here… yet.’ 이라고 나타내기

Edit Profile Settings 버튼을 통해 Setting 페이지로 이동

header 중앙에 profile picture 및 Username 나타내기

`Article Page`

header 내 profile 클릭을 통해 ‘Personal Page’로 이동하기

Edit Article 버튼을 통해 ‘New Post’내 현재 글이 채워진 페이지로 이동하기

Delete Article 버튼을 통해 현재 글 삭제후, Home으로 이동하기

__로그인 후__

댓글 입력란이 생성되고 글상자의 위아래 크기 조절 가능

Write a comment 라는 placeholder 나타내기

글상자 밑에 profile picture 보여주기

Post Comment 버튼을 통해 자신의 사진, 쓴 날짜와 함께 댓글로 나타내기

자신이 쓴 댓글은 휴지통 버튼을 통해 삭제하기
