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

- 22.03.31(목)
  코멘트 모달 실제 정보 넣기, 코멘트 입력하기 수강 완료
  ㄴ updateDoc 배웠다. 공식문서에 숫자 값 늘리기가 있음 이걸로 써서 comment 적을 때마다 count 올라가게 만듬
  ㄴ 다른 파일의 정보를 불러올 때는 props를 사용한다는 것을 잊지말자!!!

- 22.04.03(일)
  리트윗 컬렉션 추가, 리트윗 분기 처리, 리트윗 유무 표현하기, 좋아요 구현하기 수강 완료
  ㄴ getPostInfo.js와 handleLike.js를 만들어서 function module을 만들었다. 이것을 통해서 좋아요 클릭하면 카운터가 추가됬다가 사라지게 만들었다. 이번에 오류는 처리하기 힘들었는데 구버전에서 값을 부르는 코드를 현버전에서 사용하면 error가 발생하는 문제였다. 결국에는 id 위치를 찾아내서 그걸 그대로 사용해서 되기는 했는데 이번 오류 기록을 참고 잘하도록 해보자. 그리고 내가 만드는 Climb View app에는 retweet 기능은 안넣어도 될 것 같아서 좋아요 기능만 넣었다.

  트윗페이지 만들기 수강 완료
  ㄴ 트윗페이지 front-end 만들기 완료
  ㄴ @click="router.go(-1)"를 이용하면 해당 button을 클릭했을 때 전 페이지로 간다는 것을 배움

  트윗 정보 가져오기, 트윗페이지 - 버튼 구현 및 코멘트 가져오기 수강 완료
  ㄴ 해당 내용은 전부 이전에 배운 함수 그대로 이용하는 것이므로 따로 내용을 적지는 않겠음
  ㄴ 코멘트 가져오기 했을 때 오류 발생으로 해결함. post 생성할 때 id를 추가하지 않은 것으로 자세한 것은 trouble log에 입력함

- 22.04.06(수)
  프로필 페이지 - 데이터 연결 수강 완료
  ㄴ moment말고 dayjs를 사용해서 날짜 정보 수정 완료

- 22.04.08(금)
  프로필 페이지 - 트윗, 리트윗, 좋아요 트윗 가져오기 / 다른 사용자 프로필 조회 수강 완료
  ㄴ 해당 강의 들은것 아직 지금 app에 적용 안함
  ㄴ 프로필이랑 post click 옵션들에 helped도 추가해서 만들어볼 예정

- 22.04.09(토)
  프로필 페이지 - 프로필 수정 모달 팝업 구현 수강 완료

  프로필 페이지 - post, 좋아요 post 가져오기 적용 완료

  프로필 페이지 - 다른 사용자 프로필 조회 적용 완료

  프로필 페이지 - 프로필 수정 모달 팝업 적용 완료

- 22.04.12(화)
  프로필 이미지 - 이미지 스토리지 업로드 수강 완료

- 22.04.14(목)
  이미지 스토리지 업로드 적용 완료
  ㄴ storage 보안 설정 완료, firestore에 대한 보안 설정 필요
  ㄴ Menu 부분에 대한 layout 재작성 필요. profile 항목 추가 및 logout button 개정 진행 중

- 22.04.15(금)
  팔로우 & 언팔로우 수강 완료, 알림 페이지 수강 중
  ㄴ firebase Pricing 정책보고 app에 대한 전면적인 변화가 필요할 것 같음
  ㄴ 당근마켓처럼 클릭한 암장만 post가 뜨게 만드는게 그나마 적게 read값을 가질 것 같음

- 22.04.16(토)
  알림 페이지 수강 완료
  ㄴ 알림 페이지 적용 완료
  ㄴ firebase read count 정책에 대한 제대로 된 이해 필요. 이를 기준으로 코드 재정립 필요할 듯

- 22.04.29(금)
  search - 검색 함수 구현 완료
  내일은 video custom하기

- 22.05.02(월)
  video custom 구현 완료 - 일단은 단순히 video 클릭하면 play랑 pause만 하게 했음. 나중에 기회가 되면 클릭 시 play랑 pause icon도 fade되게 만들게 해야겠음

- 22.05.08(일)
  Login 시 사용자 정보가 초기화되는거 관련해서 그렇게 안되도록 수정 완료
  Nick name도 추가함
  ㄴ profile edit 수정 완료 / 데이터 넘기는 것은 아직 완료 안함
  Login 구글말고는 없앰 / 나중에 apple이랑 facebook login도 넣어야함

- 22.05.11(수)
  profile edit 수정 최종 완료 / background image 없앰, user 정보 수정 관련 구현 완료

- 22.06.08(수)
  비디오 여러개 업로드 완료
  - 코멘트 모달 편집 목표
    ㄴ 코멘트 모달 팝업 시 이전 코멘트들 보이게하기

- 22.07.16(토)
  store / index.js 수정 완료
  
- 22.07.17(일)
  수정 완료 항목
  1. src/pages/videoRecord.vue
  2. src/components/VideoRecordFocusModal.vue
  3. src/components/centerSelectModal.vue
  4. src/components/PostModal.vue
  5. src/components/VideoFocusModal.vue
  6. src/components/post.vue
  7. src/components/videoRecordPostModal.vue
  8. src/components/Menu.vue
