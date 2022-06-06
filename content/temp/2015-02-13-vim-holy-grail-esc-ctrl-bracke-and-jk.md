---
categories:
    - vim
date: 2015-02-13T00:00:00Z
description: Vim의 Esc 기원
tags:
    - vim
title: Vi의 Esc 기원
---

Vi 제작자는 자주 모드 전환키로 왜 Esc 키를 선택 했을까?

Vi에서 Esc키는 삽입 모드에서 명령 모드로 전환하는 키로 아주 자주 쓰이는 키다.
방향키 대신 hjkl 키로 방향키를 대신할 만큼 단축키 선정에서 효율성을 중시하는 에디터가 자주 쓰는 키를 불편한 Esc로 선정했다는 것은 이해되지 않는다.

[The Vim Holy Grail](http://federico.galassi.net/2012/06/20/the-vim-holy-grail/)이라는 글에서 힌트를 얻을 수 있다.

인용 요약 하면 아래와 같다.

-   Vi가 만들어질 당시에 쓰였던 키보드는 ADM3A 이란 터미널에 딸려 있는 키보드였다.
-   이 키보드의 Esc키 위치는 현대 키보드의 탭키 위치로 자주 타이핑 하기에 적당한 위치였다.
-   이후 키보드 레이아웃이 바뀌면서 Esc는 자주 누르기 불편한 위치로 이동했지만 Esc로 모드 전환 하는 상태는 유지되었다.

![ADM3A keyboard layout](http://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/KB_Terminal_ADM3A.svg/931px-KB_Terminal_ADM3A.svg.png)
