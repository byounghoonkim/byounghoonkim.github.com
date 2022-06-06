---
title: "Docker로 Golang 프로젝트 빌드 하기"
date: 2019-10-25T22:19:22+09:00
draft: false
tags:
- docker
- golang
categories:
- docker
- golang
---

새로운 Golang 버전이 나오면 내 프로젝트가 잘 빌드 되는지 확인해 보고 싶을 때가 있다. 
또 다른 버전에서 프로젝트가 잘 빌드 되는지 확인해 보고 싶을 때도 있다.

여러 Golang 버전을 관리하는 방법은 [gvm](https://github.com/moovweb/gvm) 도 있지만 여러가지 설정도 해야 하고 필요한 버전들을 설치해야 해서 조금 불편할 수도 있다.

Docker를 이용하면 간단히 프로젝트를 빌드해 볼 수 있다. 그 방법을 간단히 알아 보자.

## 샘플 프로젝트 
빌드할 프로젝트 hello라는 프로젝트를 만들고 main.go 파일을 작성한다.

```
hello
├── compile.sh
└── main.go
```

``` go
package main
import "fmt"
func main() {
    fmt.Println("Hello")
}
```

## 빌드 하기 
``` bash
GOLANG_VERSION="1.13.1"

GOX_INST_CMD="go get github.com/mitchellh/gox"
GOX_BUILD_CMD="gox -output=build/{{.OS}}/{{.Arch}}/{{.Dir}}"

PROJECT_DIR=`basename "$(pwd)"`

docker run -it --rm \
	-v $(pwd):/$PROJECT_DIR \
	golang:$GOLANG_VERSION \
	bash -c "cd /$PROJECT_DIR && $GOX_INST_CMD && $GOX_BUILD_CMD && exit"
```

위 샘플 compile.sh 스크립트는 golang 1.13.1 버전에서 빌드한다.
여러 플랫폼용으로 잘 빌드 되는지 확인하기 위해 [gox](https://github.com/mitchellh/gox)를 사용해 빌드한다.
빌드된 바이너리는 host 에 남기기 위해 docker run 명령에 volume 파라미터로 프로젝트 폴더를 연결한다.

## 빌드 결과

``` bash
$ file ./build/**/hello
./build/darwin/386/hello:     Mach-O i386 executable
./build/darwin/amd64/hello:   Mach-O 64-bit x86_64 executable
./build/freebsd/386/hello:    ELF 32-bit LSB executable, Intel 80386, version 1 (FreeBSD), statically linked, not stripped
./build/freebsd/amd64/hello:  ELF 64-bit LSB executable, x86-64, version 1 (FreeBSD), statically linked, not stripped
./build/freebsd/arm/hello:    ELF 32-bit LSB executable, ARM, EABI5 version 1 (FreeBSD), statically linked, not stripped
./build/linux/386/hello:      ELF 32-bit LSB executable, Intel 80386, version 1 (SYSV), statically linked, not stripped
./build/linux/amd64/hello:    ELF 64-bit LSB executable, x86-64, version 1 (SYSV), statically linked, not stripped
./build/linux/arm/hello:      ELF 32-bit LSB executable, ARM, EABI5 version 1 (SYSV), statically linked, not stripped
./build/linux/mips/hello:     ELF 32-bit MSB executable, MIPS, MIPS32 version 1 (SYSV), statically linked, not stripped
./build/linux/mips64/hello:   ELF 64-bit MSB executable, MIPS, MIPS-III version 1 (SYSV), statically linked, not stripped
./build/linux/mips64le/hello: ELF 64-bit LSB executable, MIPS, MIPS-III version 1 (SYSV), statically linked, not stripped
./build/linux/mipsle/hello:   ELF 32-bit LSB executable, MIPS, MIPS32 version 1 (SYSV), statically linked, not stripped
./build/linux/s390x/hello:    ELF 64-bit MSB executable, IBM S/390, version 1 (SYSV), statically linked, not stripped
./build/netbsd/386/hello:     ELF 32-bit LSB executable, Intel 80386, version 1 (NetBSD), statically linked, for NetBSD 5.99, not stripped
./build/netbsd/amd64/hello:   ELF 64-bit LSB executable, x86-64, version 1 (NetBSD), statically linked, for NetBSD 5.99, not stripped
./build/netbsd/arm/hello:     ELF 32-bit LSB executable, ARM, EABI5 version 1 (NetBSD), statically linked, for NetBSD 5.99, not stripped
./build/openbsd/386/hello:    ELF 32-bit LSB executable, Intel 80386, version 1 (OpenBSD), statically linked, for OpenBSD, not stripped
./build/openbsd/amd64/hello:  ELF 64-bit LSB executable, x86-64, version 1 (OpenBSD), statically linked, for OpenBSD, not stripped

```

Docker 이미지를 이용하면 비교적 시스템에 영향을 미치지 않고 여러 버전의 golang 에서 기존 프로젝트의 빌드를 테스트 해 볼 수 있다. 
