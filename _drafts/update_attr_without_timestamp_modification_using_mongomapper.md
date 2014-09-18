---
layout: post
category : mongodb 
tagline: ""
tags : [mongomapper]
title: "MongoMapper 에서 timestamp 변경 없이 attribute 갱신하기"
---
{% include JB/setup %}

MongoMapper 를 이용해 일괄 작업으로 필드를 업데이트 하는 작업이 필요했는데,
save할 때마다 timestamp(updated_at)이 갱신되어서 이를 회피할 방법을 찾고 있었다.



