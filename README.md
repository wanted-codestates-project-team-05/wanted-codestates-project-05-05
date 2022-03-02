## Description

원티드 프리온보딩 코스에서 프로젝트로 **오드컨셉 패션 웹페이지**를 개발하였습니다. 첫화면인 뷰어 페이지에는 로딩과 에러 처리가 되어있고, 키워드를 검색 했을 시 상품 리스트 페이지로 이동하고, url 또는 숫자를 입력하면 상품 상세 페이지로 이동합니다.
상품 리스트 페이지에선 상품을 클릭하면 이미지가 나타나고, 상품 상세 페이지에서는 이미지 클릭 시 왼쪽 바에 상품 정보가 나타납니다.

## Usage(자세한 실행 방법)

1. git clone

```jsx
<과제1>
git clone https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-05.git

<과제2>
git clone https://github.com/wanted-codestates-project-team-05/wanted-codestates-project-05-05-2.git
```

2. wanted_pre_onboarding 폴더를 인터프린터나 컴파일러로 열기
3. 필요한 라이브러리 설치

```
npm install
```

4. 실행

```
npm run start
```

기술스택

- react.js 사용
- react-router 페이지 이동
- localstory로 데이터 저장
- CSS는 styled-component를 사용하였습니다.
- 배포는 vercel 을 이용하여 진행했습니다

# 배포주소

```jsx
<과제1>
https://wanted-codestates-project-05-05-01.vercel.app/

<과제2>
https://wanted-codestates-project-05-05-02-sigma.vercel.app/
```

# 구현 내용

## <수영님>

- product_code나 image_url로 검색 했을 때, 그 이미지의 상품, 상세정보등을 왼쪽에 표현하고, 오른쪽에는 이름이 같은 제품을 나열
- localStorage에 저장된 데이터를 이용하여 정보 표시
- 품명이 같은 것을 검색하여 오른쪽에 표시
- 나열된 제품을 클릭하면 왼쪽 상품이 클릭한 제품으로 대체되어 상세정보 제공
- params에서 바뀌는 product_code를 활용하여 상품 변경

## <승규님>

- 상품 리스트 페이지

### 구현 방법

- 상품카드가 일정한 크기를 가지도록 flex로 form을 구성하였습니다.
- 반응형웹을 위해 미디어 쿼리를 사용하여 화면이 작아지면 한줄에 보여지는 카드가 줄어들도록 하였습니다.
- 페이지네이션 대신 더 보기 버튼을 구현하였습니다. 버튼을 누르면 필터를 통해 보여지는 리스트 항목를 컨트롤 하였습니다.

### 구현한 이유

- 더 보기 버튼을 구현한 이유는 전 프로젝트에서 페이지네이션을 구현했기때문에 이번에는 더 보기 버튼으로 구현을 했습니다.

### 주요 화면 캡쳐 사진

<img width="500" src="https://user-images.githubusercontent.com/56882147/156359389-580e8b3b-42a1-4114-8f29-212f629fe027.png"/>

## <성현님>

## src/hooks/useLocalStorage.js

### useLocalStorage custom hook 생성

- localStorage 상태 조회 및 변경을 수월하게 하기 위해서 custom hook을 만들었습니다.

## src/component/home/Home.js

### fetch를 이용한 네트워크 요청

- 네트워크 요청을 보내 필요한 데이터를 받아오는 코드를 작성했습니다.
- 만약, 브라우저 캐시(로컬 스토리지)에 필요한 데이터가 있다면 성능을 위해 네트워크 요청을 보내지 않습니다.
- 이후 비동기로 로딩 및 에러 처리를 진행했습니다.
  로딩 : 데이터 요청 후 응답받기까지
  에러처리 : 데이터 요청 실패 시

controlled input

- 검색 input을 controlled input으로 만들어서, 상태를 관리하였습니다.

### 검색 알고리즘 구현

- 검색어에 따라 3가지 type으로 나누어 검색을 진행합니다.

  1. 검색어가 숫자로만 이루어져 있을 때
     검색어 예시 : 1
     주어진 데이터들의 product_code와 비교 후 일치하는 결과가 있을 때만 반환합니다.

  2. 검색어가 https 문자열 또는 .jpg를 포함하고 있으면
     검색어 예시 : https://static.pxl.ai/problem/images/VT-070.jpg
     주어진 데이터들의 image_url와 비교 후 일치하는 결과가 있을 때만 반환합니다.

  3. 그 외
     검색어 예시 : 원피스
     주어진 데이터들의 name과 비교 후 일치하는 결과들을 모두 반환합니다.

- 이후 비동기로 에러처리를 진행했습니다.
  에러처리 : 결과값이 없으면, 타입에 따른 검색 방법을 안내하며 사용자에게 결과가 없다고 안내

  <img width="500" alt="스크린샷 2022-03-02 오후 7 24 50" src="https://user-images.githubusercontent.com/70502670/156343654-661c86f0-b1d1-4649-b841-757c9f09ce97.png"/>

라우터 params 설정
검색 시, url에 검색 쿼리에 사용한 데이터가 직관적으로 보일 수 있도록 라우터 params를 설정하여 페이지를 이동합니다.

## src/component/searchUrl

브라우저 캐시 사용(로컬 스토리지)

- 커스텀 푹 useLocalStorage를 이용하여 브라우저 캐시에서 필요한 값을 이용할 수 있도록 코드를 변경했습니다.

## <운규님>

- 검색어 하이라이트 기능

  검색 키워드와 텍스트를 props로 받아 텍스트에 검색 키워드가 포함되어 있다면 정규표현식과 split를 이용하여 키워드를 기준으로 분리하여 array로 만든 후 map을 이용하여 검색 키워드와 같다면 bold처리하고 아니라면 span태그로 감싸 반환합니다.
  만약 검색 키워드가 텍스트에 없다면 텍스트를 span태그로 감싸 반환합니다.

    <img width="500" src="https://user-images.githubusercontent.com/85268135/156363651-299e37ea-03d5-4062-9d5b-809c9dea17cc.gif" />

## <정민님>

- 뷰어 페이지 Ui개발
- 검색결과 로딩처리

  뷰어 페이지에 미디어 쿼리를 사용해 데스트탑,패드,휴대폰 크기로 반응형을 주었습니다.
  헤더와 로딩 처리 기능은 공용 컴포넌트로 만들었습니다.
  로딩 처리는 react-loader-spinner 라는 라이브러리를 사용하여 구현 하였고,
  props로 메시지를 받아 여러 컴포넌트에서 사용할 수 있도록 해주었습니다.
  헤더 부분은 클릭 시 뷰어 페이지로 이동하도록 해주었습니다.

  <img width="500" src="https://user-images.githubusercontent.com/56882147/156365123-b28d9d74-4fac-4c27-b691-c44e38fe102a.png"/>

## <승연님>

- 공통 UI 컴포넌트 item 제작 <br>

  상품 아이템이 반복이 되어서 공통 컴포넌트로 하여 구현하였습니다.
  아이템의 정보는 props로 받아와서 정보를 담아서 화면에 보여주었습니다. <br>
  검색어를 입력한 단어와 상품 이름이 일치할 때 텍스트 하이라이트를 보여주기 위해
  쿼리 키워드를 받아와서 사용하였습니다. <br>

<img src="https://user-images.githubusercontent.com/54584337/156363456-7d03e12b-00f9-48f4-96a2-d73aaf072c6f.png" width="200px">

<br>
<br>
<br>

# 개발 중 어려웠던 점

## <수영님>

useEffect 사용시 cleanup 함수를 사용하라는 콘솔에러가 있어 이해하고 해결하는데 어려움
useEffect에 return을 이용하여 unmount될때 상태 값을 없애 줌

## <승규님>

기초적인 틀을 만들기위해 flex를 사용했는데 생각한대로 가운데로 정렬을 안해서 애를 먹었습니다.

**해결방법**해결은 의외로 간단하게 미디어쿼리와 같이 사용하여 크기를 지정해 주었더니 해결되었습니다.

## <성현님>

useState를 이용해 상태를 변경했을 때, 바로 데이터를 사용할 수 없고 컴포넌트가 업데이트 된 후에 사용할 수 있는데, 이러한 점을 간과해서 어려움을 겪었습니다.

**해결 방법** 필요없는 상태가 없는지 확인 후, useState 사용 빈도를 줄이고 비동기적으로 코드를 작성할 때 함수안에서 return 값을 주어 필요한 경우에 바로 이용할 수 있도록 구현했습니다.

## <승연님>

검색어를 쿼리로 가져오는 것이 막막했었습니다.

**해결방법**
useLocation, QueryString을 사용하여 location의 search 값만 가져올 수 있었습니다.
