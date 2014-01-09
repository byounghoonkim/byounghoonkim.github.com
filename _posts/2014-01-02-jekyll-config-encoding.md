---
layout: post
title: "jekyll serve 시 invalid byte sequence 해결방법"
description: ""
category: ""
tags: [jekyll tip, windows]
---
{% include JB/setup %}

윈도우 시스템에서 jekyll을 사용할 때 한글이 포함된 포스팅을 시작하면 
다음과 같은 메시지를 보게 됩니다.

    Generating... Error reading file D:/jekyll_test/_posts/2014-01-02-test.md: invalid byte sequence in CP949
    Liquid Exception: invalid byte sequence in CP949 in _posts/2014-01-02-test.md/#excerpt
    
Ubuntu 에서는 이런 에러 메시지를 볼 수 없습니다.
윈도우에서 동작하는 jekyll 이 utf-8 이 아닌 cp949로 동작 하기 때문입니다.
\_config.yml 파일에 아래와 같이 encoding을 설정해서 해결 했습니다. 

    encoding: "utf-8"
