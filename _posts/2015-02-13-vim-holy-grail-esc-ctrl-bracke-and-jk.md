---
layout: post
title: "Vi에서의 Esc 기원 그리고 Ctrl-[ 와 jk"
description: "Vim 에서 Esc 의 위치에 대한 고찰"
category: "vim"
tags: [vim]
---
{% include JB/setup %}

필자가 Vim에 익숙해질 무렵부터 가져온 궁금증이 있다.

> 왜 Esc와 같이 치기 어려운 키로 모드 전환을 했을까

Vim에서 Esc키는 삽입 모드에서 명령 모드로 번환하는 키로 아주 자주 쓰이는 키에 속한다. 방향키를 누르기 위한 손의 움직임 조차 줄이려고 hjkl 키로 방향키를 대신할 만큼 단축키 선정에서 효율성을 중시하는 툴이 Vim 이다. 아주 자주 쓰이는 전환 키를 불편한 Esc 로 선정했다는 것이 납득이 가지 않았다.

[The Vim Holy Grail](http://federico.galassi.net/2012/06/20/the-vim-holy-grail/)를 읽고 그 궁금증이 해결되었다. 요약을 하면 다음과 같다.

> Vi가 만들어질 당시에 쓰였던 키보드는 ADM3A 이란 터미널에 딸려 있는 키보드였다. 이 키보드를 기준으로 만든 Vi에서는 Esc가 모드 전환에 적당한 키보드였다. 이후 키보드 레이아웃이 바뀌면서 Esc는 자주 누르기 불편한 위치로 이동하였다.

![key width=200](http://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/KB_Terminal_ADM3A.svg/931px-KB_Terminal_ADM3A.svg.png)
