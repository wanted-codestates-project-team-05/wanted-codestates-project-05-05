# 구현내용

- product_code나 image_url로 검색 했을 때, 그 이미지의 상품, 상세정보등을 왼쪽에 표현하고, 오른쪽에는 이름이 같은 제품을 나열

  - localStorage에 저장된 데이터를 이용하여 정보 표시
  - 품명이 같은 것을 검색하여 오른쪽에 표시

- 나열된 제품을 클릭하면 왼쪽 상품이 클릭한 제품으로 대체되어 상세정보 제공
  - params에서 바뀌는 product_code를 활용하여 상품 변경

# 어려웠던 점

- useEffect 사용시 cleanup 함수를 사용하라는 콘솔에러가 있어 이해하고 해결하는데 어려움
  - useEffect에 return을 이용하여 unmount될때 상태 값을 없애 줌
