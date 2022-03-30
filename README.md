# Climb_community_app

22.03.12
side section부터 main section까지 제작 완료

22.03.13
section별로 component화 완료

22.03.17(목)
vue router를 이용한 페이지 전환 적용 완료
-. 페이지 구성을 어떻게 꾸밀건지 생각 필요
ㄴ 홈, 메시지, 알람 이외에 더 필요한건 없을지?
ㄴ 홈 화면은 트위터랑 너무 같음. 홈 화면에 대한 구성을 어떻게 할지도 생각 필요(업데이트는 대부분 동영상 위주로 올려질건데...)
ㄴ Follow section에 대한 고민도 필요(Follow뿐만이 아니라 암장 검색 칸도 넣는 것이 좋겠다.)

22.03.19(토)
layout 적용 완료
페이지마다 구성 수정 실시함
ㄴroutes를 통해서 페이지 연결할 시 profile이 연결되는 문제 아직 해결 안됨

22.03.20(일)
firebase 프로젝트 생성 및 authentication 완료
firebase authentication 회원가입 및 firestore 데이터 저장 완료
ㄴ 강의 내용과 현재 버전이 달라서 헤맸지만 공식문서를 통해서 버전 맞게 설정 완료. 테스트 시 정상 확인
ㄴ 해당 버전에 따른 설정은 추후에도 계속 될것 같으니 Bear에 기록하였고 유의하면서 진행하기

민감 정보인것 같은것은 github에서 삭제함. 다음에도 천천히 살펴보고 문제될 여지가 없도록 push하기로 하자.

- 오전 09:00 ~ 11:30
  login 및 input validation 설정 완료

- 22.03.21(월)
  vuex 강의 수강 완료
  ㄴ 페이지가 바뀌거나 새로고침을 해도 사용자 인증을 유지하는 vuex-persistedstate를 배움
  ㄴ console을 보는데 좀 더 유용할 수 있는 vue chrome extention(Vue.js devtools)도 깔음

결국 오늘은 vuex와 vue-persistedstate를 활용하여 사용자 인증을 계속 유지하는 방법을 배움
하나 유의할 점은 이제까지 firebase관련 회원가입이나 로그인은 전 버전이 적용이 안되었는데 사용자 정보를 가져오는 것은 전 버전이나 현 버전 둘 다 사용이 가능하다. 전 버전은 메모에 기록만 해두고 현 버전으로 등록해놓는다.

- 22.03.23(수)
  navigation guard 강의 수강 완료
  ㄴ 로그인을 한게 아니면 다른 페이지로 못넘어가게 하는 방법을 배움 - router에서 navigation guard를 쓰는거임
  ㄴ 로그아웃하는 법도 배움. 이것도 버전별에 따라서 코드 형태가 약간은 다른데 구버전으로는 적용을 안해봤음.

* 왼쪽 아래 프로필 클릭하면 새창이 온오프되게하는 방법도 찾아보는게 좋을듯하다. toggle로 하면 될려나
  -> @click="변수 = !변수"를 통해서 해결함!!

- 22.03.28(월)
  트윗 유저 정보 추가하기 강의 수강 완료
  ㄴ firebase의 getDoc과 doc를 사용해서 post.uid와 user.uid를 사용해서 서로 data 가져다 쓰는 것을 배움

- 22.03.29(화)
  트윗 모달 팝업 강의 수강 완료
  ㄴ 모탈 팝업을 올리는 방법을 배움
  ㄴ tailwind UI 홈페이지의 존재을 알음, 공짜 UI가 좀 있어서 활용도 있을 듯
  ㄴ \$emit 처음 써봄, 공식문서만 봤을 때는 이해 못했었는데 공식 문서 다시보면서 하면 이해할 수 있을 듯

  트윗 모달 반응형 수정 수강 완료
  ㄴ 이거는 그냥 배운 front-end 응용하는 것이기 때문에 따로 내용을 적거나 기록하지는 않겠음

- 22.03.30(수)
  트윗 모달에 function 연결하기 수강 완료
  ㄴ 이번 강의는 함수를 모듈화해서 다른 페이지에서 동일한것을 사용할 수 있게 한것이므로 중요한 내용이다!! 명심하자!!!

  코멘트 모달 팝업 수강 완료
  ㄴ 코멘트 모달 팝업 front-end는 이전에 tweet front-end 만드는것 조금 수정한 것이라서 따로 내용을 기록하지는 않겠음
