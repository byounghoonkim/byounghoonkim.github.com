---
layout: post
category : vim 
tagline: ""
tags : [vimtip]
---
{% include JB/setup %}

아래와 같은 목록을 정렬하고 싶을 때가 있습니다. 

	banana
	apple
	pineapple
	banana
	apple
	pineapple
	raspberry
	pineapple
	banana
	apple
	pineapple

Vim에서 아래와 같은 명령을 이용할 수 있습니다.

	:sort
  
	apple
	apple
	apple
	banana
	banana
	banana
	pineapple
	pineapple
	pineapple
	pineapple
	raspberry

역순 정렬은 :sort! 를 사용합니다. Visual block을 선택해서 정렬도 가능합니다.

	:'<,'>sort

중복항목을 제거하고 정렬하려면 아래와 같이 u 옵션을 추가합니다.

	:sort u
  
	apple
	banana
	pineapple
	raspberry

좀더 많은 옵션은 도움말을 참고하세요.

	:help sort
