---
layout: post
category : vim 
tagline: ""
tags : [vimtip]
---
{% include JB/setup %}

아래와 같은 목록이 있고 이를 정렬해야 할 필요가 있다고 가정해 봅시다.

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
