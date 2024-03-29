---
title: "표준 Go 프로젝트 레이아웃(Standard Go Project Layout)"
date: 2020-06-26T23:06:31+09:00
categories:
- golang
---

* 원문 GibHub - [표준 Go 프로젝트 레이아웃](https://github.com/byounghoonkim/project-layout)
* 원문(영어) Github - [Standard Go Project Layout](https://github.com/golang-standards/project-layout)


Go 애플리케이션 프로젝트를 위한 기본 레이아웃을 설명하는 문서입니다.
코어 Go 개발팀이 정의한 공식적인 표준은 아니지만, Go 에코시스템 안에서는 일반적인 역사적이고 떠오르는 프로젝트 레이아웃 패턴들입니다.
이들 중 몇몇은 다른 것들 보다 더 친숙합니다.
또한 충분히 큰 규모의 실제 애플리케이션에 공통적인 여러 지원 디렉토리 등 여러가지 작은 개선 사항이 포함되어 있습니다.

Go 언어를 배울 때나 PoC나 토이 프로젝트를 만들 때는 이 프로젝트 레이아웃을 적용하는 것은 과합니다.
이럴 때는 심플하게 시작하세요(`main.go` 파일 하나면 충분합니다).
프로젝트가 커지면 코드를 잘 구조화 시키는 것이 중요하다는 사실을 기억하세요.
그렇지 않으면 코드는 수많은 숨겨진 종속성들과 전역 상태로 엉망이 될 것입니다.
프로젝트에 더 많은 사람들이 같이 협업한다면 더 많은 구조가 필요합니다.
이때 패키지와 라이브러리를 관리하는 일반적인 방법을 도입하는 것이 중요합니다.


오픈 소스 프로젝트나 다른 프로젝트에 임포트 되는 프로젝트는 외부로 노출되지 않는(private, 다른 말로는 `internal`) 패키지와 코드를 가지는 것이 중요합니다.
리포지토리를 복제해서 필요한 것을 유지하고 나머지는 모두 삭제하세요!
그것이 있다고 해서 그것을 사용해야 한다는 의미는 아닙니다.
단일 프로젝트에는 이 패턴들은 해당사항이 없습니다.
`vendor` 패턴 조차도 보편적인 것은 아닙니다.

마침내 Go 1.14에서 [`Go Modules`](https://github.com/golang/go/wiki/Modules) 이 프로덕션 배포 준비가 되었습니다.
사용하지 않을 특별한 사유가 없다면 [`Go Modules`](https://blog.golang.org/using-go-modules)를 사용하세요. 그러면 프로젝트를 어디에 두던지 $GOPATH에 대해 신경쓸 필요가 없어집니다.
이 저장소의 기본 `go.mod` 파일은 프로젝트가 Github에서 호스팅 되고 있다고 가정합니다만, 이는 필수 사항은 아닙니다.

모듈 경로는 아무 것이나 지정할 수 있지만, 첫번째 모듈의 경로 이름은 점(dot)을 포함해야 합니다(현재 버전의 Go는 이를 강제하지 않으나 약간 오래된 버전을 사용한다면 이로 인해 빌드가 실패 할 수 있으니 놀라지 마세요).
이에 대해 더 자세히 알고 싶다면 [`37554`](https://github.com/golang/go/issues/37554) 와 [`32819`](https://github.com/golang/go/issues/32819) 이슈를 참고하세요.

이 프로젝트 레이아웃은 의도적으로 일반적입니다. 특정 Go 패키지 구조에 맞추려고 노력하지 않았습니다.
이는 커퓨티니의 힘입니다.
새로운 패턴을 알게 되거나 이미 있는 패턴이 업데이트가 필요하면 이슈를 생성해 주세요.

네이밍, 포맷팅, 스타일 등에서 도움이 필요하면 [`gofmt`](https://golang.org/cmd/gofmt/) 와 [`golint`](https://github.com/golang/lint)를 실행하는 것이 출발점입니다.
그리고 Go 코드 스타일 가이드라인과 추천문서를 읽으세요:
* https://talks.golang.org/2014/names.slide
* https://golang.org/doc/effective_go.html#names
* https://blog.golang.org/package-names
* https://github.com/golang/go/wiki/CodeReviewComments
* [Style guideline for Go packages](https://rakyll.org/style-packages) (rakyll/JBD)

추가적인 배경 정보가 필요하면 [`Go Project Layout`](https://medium.com/golang-learn/go-project-layout-e5213cdcfaa2)를 보세요.

패키지 네이밍 및 구성과 기타 코드 구조 권장 사항에 대한 추가 정보:
* [GopherCon EU 2018: Peter Bourgon - Best Practices for Industrial Programming](https://www.youtube.com/watch?v=PTE4VJIdHPg)
* [GopherCon Russia 2018: Ashley McNamara + Brian Ketelsen - Go best practices.](https://www.youtube.com/watch?v=MzTcsI6tn-0)
* [GopherCon 2017: Edward Muller - Go Anti-Patterns](https://www.youtube.com/watch?v=ltqV6pDKZD8)
* [GopherCon 2018: Kat Zien - How Do You Structure Your Go Apps](https://www.youtube.com/watch?v=oL6JBUk6tj0)

## Go 디렉토리들

### `/cmd`

프로젝트를 위한 메인 애플리케이션들.

각 애플리케이션의 디렉토리 이름은 원하는 실행파일의 이름과 동일해야 합니다(예, `/cmd/myapp`).
애플리케이션 디렉토리에 많은 코드를 두지 마세요.
다른 프로젝트에서 임포트되고 사용되는 것을 고려한다면 코드는 `/pkg` 디렉토리에 있어야 합니다.
재사용이 불가하거나 재사용을 원치 않는 코드는 `/internal` 디렉토리에 두세요.
다른 사람들이 어떻게 사용할지 모르니, 확실히 의도를 밝혀주세요.
일반적으로 `/internal`과 `/pkg`폴더에서 코드를 임포트하고 호출하는 짧은 `main` 함수를 작성합니다.
예시를 보려면 [`/cmd`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/cmd/README.md) 디렉토리를 참고하세요. 

### `/internal`

비공개(private) 애플리케이션 / 라이브러리 코드.

다른 애플리케이션이나 라이브러리에 임포트되길 원하는지 않는 코드들입니다.
Go 컴파일러 자체에서 강제되는 레이아웃 패턴입니다.
더 자세한 사항은 Go 1.4 [`release notes`](https://golang.org/doc/go1.4#internalpackages)을 참고하세요.
`internal`는 최상위 레벨 디렉토리에만 적용되는 것은 아닙니다.
프로젝트 트리의 어느 레벨에서든 하나 이상의 `internal` 디렉토리를 적용할 수 있습니다.
공유할 것과 공유하지 않을 코드를 나누기 위해 인터널 패키지에 구조를 더 추가할 수 있습니다.
이 패턴은 (특히, 작은 규모의 프로젝트에서는) 필수는 아닙니다만, 의도된 패키지 사용을 보여주는 좋은 시각적 단서 입니다. 
실제 애플리케이션 코드를 `/internal/app`(예시, `/internal/app/myapp`)에 위치 시킬 수 있고 이 앱들이 공유하는 코드는  `/internal/pkg`(예시, `/internal/pkg/myprivlib`) 디렉토리에 위치 시킬 수 있습니다.

### `/pkg`

외부 애플리케이션에 의해 사용이 가능한 라이브러리 코드(예시, `/pkg/mypubliclib`).

다른 프로젝트들은 잘 동작하기를 기대하면서 이 라이브러리들을 임포트 할 것입니다. 그래서 여기에 무엇인가를 추가할 때는 신중해야 합니다. :-) 프라이빗 패키지를 임포트 불가하도록 하기위한 방법은 Go에 의해 강제 되는 `internal` 디렉토리입니다.
`/pkg`은 다른 이들이 사용하기에  이 디렉토리에 코드는 안전하다는 커뮤니테이션을 명시적으로 할 수 있는 좋은 방법입니다.

Travis Jeffery의 [`I'll take pkg over internal`](https://travisjeffery.com/b/2019/11/i-ll-take-pkg-over-internal/) 블로그 포스트는  `pkg`와 `internal` 디렉토리의 좋은 개요와 사용에 대한 이해를 제공합니다.

이 패턴은 프로젝트 루트 디렉토리에 Go가 아닌 컴포넌트와 디렉토리를 많이 포함하고 있을 때 다양한 Go 툴들을 쉽게 실행할 수 있도록 코드를 한곳에 그룹핑해 주는 방법을 제공합니다(이 영상들에서 언급한것 처럼: [`Best Practices for Industrial Programming`](https://www.youtube.com/watch?v=PTE4VJIdHPg) from GopherCon EU 2018, [GopherCon 2018: Kat Zien - How Do You Structure Your Go Apps](https://www.youtube.com/watch?v=oL6JBUk6tj0) 그리고 [GoLab 2018 - Massimiliano Pippi - Project layout patterns in Go](https://www.youtube.com/watch?v=3gQa1LWwuzk)).

이 레이아웃 패턴을 사용하는 유명한 Go 리포지토리를 보려면 [`/pkg`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/pkg/README.md)를 참고하세요.
이 패턴을 일반적이지만, 보편적으로 받아들여 지는 것은 아니며 일부 Go 커뮤니티에서는 추천하지 않기도 합니다.


앱 프로젝트가 정말 작거나 중첩 레벨을 추가하는 것이 별로 가치가 없거나(또는 정말 원치 않는다면 :-)) 이 패턴을 사용하지 않아도 괜찮습니다.
프로젝트가 충분히 커져서 루트 디렉토리가 정말 붐빌 때(특히, Go가 아닌 컴포넌트가 많을 때)를 고려해 보세요. 

### `/vendor`

애플리케이션 종속성(수동으로 또는 [`Go Modules`](https://github.com/golang/go/wiki/Modules) 같은 새롭게 내장된 종속성 관리 도구에 의해 관리됨)
`go mod vendor` 명령은 `/vendor` 폴더를 만들게 됩니다.
`-mod=vendor` 옵션이 기본값인 Go 1.14 를 사용하지 않는다면 `go build` 명령에 해당 옵션이 필요할 수도 있습니다.

라이브러리를 빌딩 중이라면 애플리케이션 종속성 폴더를 커밋하지 마세요.

Go [`1.13`](https://golang.org/doc/go1.13#modules)부터 모듈 프록시 기능을 활성화 되었습니다(기본 프록시 서버로 [`https://proxy.golang.org`](https://proxy.golang.org) 사용). 
이 기능이 여러분의 요구와 제약사항에 부합하는지 확인하려면 [`여기`](https://blog.golang.org/module-mirror-launch)를 읽어 보세요.
만약 부합한다면 `vendor` 디렉토리는 전혀 필요하지 않습니다.

## 서버 애플리케이션 디렉토리

### `/api`


OpenAPI/Swagger 스펙, JSON 스키마 파일, 프로토콜 정의 파일.

예시를 보려면 [`/api`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/api/README.md) 디렉토리를 보세요.

## 웹 애플리케이션 디렉토리

### `/web`

웹 애플리케이션용 컴포넌트들: 정적 웹 에셋, 서버 사이드 템플릿 그리고 SPA

## 범용 애플리케이션 디렉토리 

### `/configs`

설정 파일 템플릿 또는 기본 설정들.

`confd`나 `consul-template` 템플릿 파일을 여기 두세요. 

### `/init`

System init (systemd, upstart, sysv) 와 프로세스 관리/감독 (runit, supervisord) 설정들.

### `/scripts`

다양한 빌드, 설치, 분석 등의 오퍼레이션을 수행하기 위한 스크립트들.

여기 스크립트를 작성해서 루트 레벨 Makefile을 작고 심플하게 유지합니다.(예시, [`https://github.com/hashicorp/terraform/blob/master/Makefile`](https://github.com/hashicorp/terraform/blob/master/Makefile)).

예시를 보려면 [`/scripts`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/scripts/README.md) 디렉토리를 보세요.

### `/build`

패키징과 CI(Continuous Integration).

클라우드(AMI), 컨테이너(Docker), OS (deb, rpm, pkg) 패키지 설정들과 스크립트를 `/build/package` 디렉토리에 두세요.


CI (travis, circle, drone) 설정과 스크립트는 `/build/ci` 디렉토리에 두세요.
어떤 CI 도구들(예, Travis CI)들은 설정파일의 위치에 대해 매우 까다로운 편입니다.
(가능하면) `/build/ci` 디렉토리에 설정 파일들을 위치 시키고 CI 도구가 원하는 곳에 파일을 링크 시켜 보세요.

### `/deployments`

IaaS, PaaS, 시스템 그리고 컨테이너 오케스트레이션 배포 설정들과 템플릿들(docker-compose, kubernetes/helm, mesos, terraform, bosh).
어떤 리포들(특히 쿠버네티스에 배포하는 앱들)은 이 디렉토리를 `/deploy` 로 정합니다.

### `/test`

추가적인 외부 테스트 앱과 테스트 데이터.

`/test`는 원하는대로 자유롭게 구조화 해도 됩니다. 
큰 프로젝트에서는 데이터 서브 디릭토리를 만들기도 합니다.
예를 들면, Go가 디렉토리 내부 내용을 무시 하는 `/test/data` 또는 `/test/testdata` 를 만들 수 있습니다. 
Go는 "." 또는 "_"ㅣ 로 시작하는 디렉토리와 파일 또한 무시합니다. 그래서 테스트 데이터 디렉토리 이름을 좀더 유연하게 정할 수 있습니다.

예시를 [`/test`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/test/README.md) 디렉토리를 보세요.

## 기타 디렉토리들

### `/docs`

디자인 문서와 유저 문서( 그리고 godoc 생성 문서).

예시를 보려면 [`/docs`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/docs/README.md) 디렉토리를 보세요.

### `/tools`

프로젝트를 위한 지원 도구들.
이 도구들은 `/pkg`와 `/internal` 디렉토리로부터 코드를 임포트 할 수 있습니다. 

예시는 [`/tools`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/tools/README.md) 디렉토리를 보세요. 

### `/examples`

애플리케이션과 공개 라이브러리를 위한 예시들.

예시는 [`/examples`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/examples/README.md) 디렉토리를 보세요. 

### `/third_party`

외부 헬퍼 도구들, 포크된 코드 그리고 기타 3rd 파티 유틸리티들(예시, Swagger UI).

### `/githooks`

Git 훅들.

### `/assets`

기타 프로젝트에서 사용된 에셋들(이미지, 로고 등등).

### `/website`

Github 페이지를 이용하지 않을 때 프로젝트 웹사이트 데이터는 여기에 위치시킵니다.

예를 보려면 [`/website`](https://github.com/byounghoonkim/project-layout/blob/translate-ko/website/README.md) 디렉토리를 보세요.

## 만들지 말아야 할 디렉토리

### `/src`

어떤 Go 프로젝트들은 `src` 폴더가 있는데, 이것이 흔한 패턴인 Java 세계에서 넘어 온 개발자들에게서 주로 일어 납니다.
Go 코드와 Go 프로젝트가 Java 처럼 보이지 않도록 되도록이면 이런 Java 패턴을 채택하지 마세요. :-)

프로젝트 레벨의 `/src` 디렉토리와 [`How to Write Go Code`](https://golang.org/doc/code.html)에서 설명하는 워크스페이스를 위한 `/src` 디렉토리를 혼동하지 마세요.
`$GOPATH` 환경 변수는 (현재) 워크스페이스를 가리키고 있습니다(윈도우가 아닌 시스템에서는 기본적으로 `$HOME/go`를 가리킴).
이 워크스페이스는 최상위 레벨에 `/pkg`, `/bin` 그리고 `/src` 디렉토리를 가지고 있습니다.
실제 프로젝트들은 `/src` 아래 서브 디렉토리로 끝나게 됩니다. 그래서 프로젝트에   `/src` 디렉토리를 가지게 되면 프로젝트 경로는 이렇게 보일것입니다:`/some/path/to/workspace/src/your_project/src/your_code.go`.
Go 1.11 버전 이상에서는 `GOPATH` 외부에 프로젝트를 위치시킬 수 있습니만,  여전히 이 레이아웃 패턴을 적용시키는 좋은 생각이라는 의미는 아닙니다.


## Badges

* [Go Report Card](https://goreportcard.com/) - `gofmt`, `go vet`, `gocyclo`, `golint`, `ineffassign`, `license`, `misspell`로 코드를 스캔 합니다.
`github.com/golang-standards/project-layout`를 여러분의 프로젝트 참조로 변경하세요. 

* [GoDoc](http://godoc.org) - GoDoc 생성 문서를 온라인 버전으로 제공합니다. 
링크를 여러분의 프로젝트로 바꾸세요.

* Release - 프로젝트의 최신 릴리즈 번호를 보여줍니다. 
여러분의 Github 링크를 가리키도록 변경하세요.
```
[![Go Report Card](https://goreportcard.com/badge/github.com/golang-standards/project-layout?style=flat-square)](https://goreportcard.com/report/github.com/golang-standards/project-layout)
[![Go Doc](https://img.shields.io/badge/godoc-reference-blue.svg?style=flat-square)](http://godoc.org/github.com/golang-standards/project-layout)
[![Release](https://img.shields.io/github/release/golang-standards/project-layout.svg?style=flat-square)](https://github.com/golang-standards/project-layout/releases/latest)
```

## 알림

예시/재사용가능 설정, 스트립트, 코드를 포함한 더 많은 프로젝트 템플릿이 계속 진행 중(WIP)입니다. 


