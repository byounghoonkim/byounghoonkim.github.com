---
title: "Vim 입력모드 노말모드 전환시 한/영 자동 전환하기"
date: 2020-05-23T22:06:31+09:00
---

Vim에서 한글 입력 중에 Esc로 노말 모드 진입할 때 다시 영문으로 바꿔줘야 하는 불편함이 있다.

이 문제를 해결해 보려고 여러 사람들이 여러 방법을 시도 했고 그 흔적들은 아래 블로그 글들에서 볼 수 있다.

-   [Vim Vim에서 ESC를 눌렀을 때 영문 상태로 전환하기 - Seorenn SIGSEGV](http://seorenn.blogspot.com/2011/04/vim-vim-esc.html)
-   [Vim 사용시 한/영 전환 문제 해결하기 - 기계인간 John Grib](https://johngrib.github.io/blog/2017/05/04/input-source/)
-   [VIMOS X한글 입력 상태에서 노멀모드 복귀 후 영어 입력소스로 전환하기 (feat. hammerspoon, autohotkey)](https://coldmater.tistory.com/177)

위 블로그들에서 소개된 방법과 별개로 im-select 라는 툴을 이용하는 방법을 소개한다.
이 방법을 소개하는 이유는 내게 가장 잘 맞았고 기대한 대로 잘 동작하며 Visual Studio Code 의 Vim Mode에서도 비슷한 방법을 적용할 수 있기 때문이다!

아래 설명은 macOS 환경 기준이다.

(다른 환경은 시도해 보지 않았다.)

## im-select 설치하기

아래 명령으로 im-select라는 툴을 설치한다.

(참고 - https://github.com/daipeihust/im-select)

```
curl -Ls https://raw.githubusercontent.com/daipeihust/im-select/master/install_mac.sh | sh
```

위 명령을 실행하면 /usr/local/bin 경로 아래 im-select 라는 실행 파일이 설치된다.

## brglng/vim-im-select 플러그인 설치

'brglng/vim-im-select'라는 Vim 플러그인을 설치한다.

(참고 - https://github.com/brglng/vim-im-select)

(vim-plug를 통해 플러그인을 설치했다. 플러그인을 설치하는 방법은 [vim-plug](https://github.com/junegunn/vim-plug) 페이지를 참고한다.)

```
call plug#begin('~/.vim/plugged')
    Plug 'brglng/vim-im-select'
call plug#end()
```

설치를 완료하면 아래와 같이 한글 입력이 가능한 입력 모드에서
Esc 키를 한번 누르면 영문으로 입력 언어가 변경되면서 노말 모드로 진입하게 되어
추가적인 IME 전환이 필요 없어진다.

<iframe src="https://player.vimeo.com/video/421942102?h=f3018261fb" width="640" height="478" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>
<p><a href="https://vimeo.com/421942102">vim korean -&gt; english auto switch</a> from <a href="https://vimeo.com/user116213665">kimbh</a> on <a href="https://vimeo.com">Vimeo</a>.</p>

이 방법의 모드 전환 시 마다 im-select 프로세스를 실행하기 때문에 저사양 환경에서 입력 전환이 조금 지연되는 단점이 있다.

하지만 설정이 비교적 쉽고 사양만 따라 준다면 기대한 대로 잘 동작한다.
