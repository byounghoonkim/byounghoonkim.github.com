---
title: "리눅스의 스레드 구현 살펴보기 - 리눅스는 스레드를 일반 프로세스로 구현한다"
date: 2019-03-07T00:00:00Z
draft: 
tags:
- linux_kernel
- linux
categories:
- linux
---

"리눅스는 스레드를 일반 프로세스로 구현한다." 라는 문구의 의미에 대해 좀더 깊이 살펴보고 어떤 의미를 가지는지 확인해 본다.


책 <리눅스 커널 심층 분석>의 리눅스 스레드 구현 이라는 장에는 아래와 같은 설명이 나온다.

>The Linux Implementation of Threads
...
Linux has a unique implementation of threads.
To the Linux kernel, there is no concept of a thread. 
Linux implements all threads as standard processes.
The Linux kernel does not provide any special scheduling semantics or data structures to represent threads.
Instead, a thread is merely a process that shares certain resources with other processes.
Each thread has a unique task_struct and appears to the kernel as a normal process—
threads just happen to share resources, such as an address space, with other processes.
This approach to threads contrasts greatly with operating systems such as Microsoft
Windows or Sun Solaris, which have explicit kernel support for threads (and sometimes
call threads lightweight processes).The name “lightweight process” sums up the difference in
philosophies between Linux and other systems.To these other operating systems, threads
are an abstraction to provide a lighter, quicker execution unit than the heavy process.To
Linux, threads are simply a manner of sharing resources between processes (which are
already quite lightweight). For example, assume you have a process that consists of four
threads. On systems with explicit thread support, one process descriptor might exist that,
in turn, points to the four different threads.The process descriptor describes the shared
resources, such as an address space or open files.The threads then describe the resources
they alone possess. Conversely, in Linux, there are simply four processes and thus four
normal task_struct structures.The four processes are set up to share certain resources.
The result is quite elegant
...

스레드라는 개념을 명시적으로 구현한 윈도우나 솔라리스 등의 운영체제와는 달리 
리눅스에서의 스레드 구현은 단지 프로세스 간에 리소스를 공유 하는 형태로 구현한다고 설명한다.


리눅스에서는 스레드를 생성할 때 스레드 생성과 관련된 명시적인 커널 API(윈도우의 경우 PsCreateSystemThread 와 같은)를 
호출하는 것이 대신 프로세스를 클론하고 클론된 프로세스에서 클론한 프로세스의 리소스를 공유하는 형태로 구현한다.


코드로 알아 보기 위해 아래와 같은 스레드 생성 코드를 작성했다.

```c
#include <stdio.h>
#include <unistd.h>
#include <pthread.h>

static void* thread(void *arg)
{
	printf("sleeping... 100 seconds...\n");
	sleep(100);
	return 0;
}

void main() 
{
	pthread_t tid;
	int ret;
	void *res;

	ret = pthread_create(&tid, NULL, &thread, NULL);
	printf("waiting... \n");
	ret = pthread_join(tid, &res);
}
```

위 코드를 컴파일(gcc main.c -lpthread)한 후 strace를 통해 실행하면 
아래와 같이 pthread_create 호출 시 clone API 를 호출하는 것을 확인할 수 있다.
(좀더 자세한 사항은 man clone(2) 의 CLONE_THREAD 부분을 참고하기 바란다.)

```bash
> strace ./a.out
...
brk(NULL)                               = 0x55966b82a000
brk(0x55966b84b000)                     = 0x55966b84b000
clone(child_stack=0x7f306daeffb0, flags=CLONE_VM|CLONE_FS|CLONE_FILES|CLONE_SIGHAND|CLONE_THREAD|CLONE_SYSVSEM|CLONE_SETTLS|CLONE_PARENT_SETTID|CLONE_CHILD_CLEARTID, parent_
tidptr=0x7f306daf09d0, tls=0x7f306daf0700, child_tidptr=0x7f306daf09d0) = 2126                                                                                              
futex(0x7f306dede8c0, FUTEX_WAIT_PRIVATE, 2, NULLsleeping... 100 seconds...
) = 0
write(1, "waiting... \n", 12waiting... 
...
```

간단하게 나마 리눅스 커널에서는 스레드라는 것이 다른 프로세스의 리소스를 공유하는 프로세스라는 점을 알아 보았다. 그럼 유저 모드에서는 그 영향이 나타날까? thread id 라는 것이 process id 와 동일할 것일까?


위에서 작성한 프로그램을 백그라운드로 실행한다(./a.out &).
그리고 thread 에 관한 정보를 출력하기 위해 ps 명령에 -Lf 옵션을 주어 실행한다.
```bash
> ./a.out &
[1] 4308
waiting... 
sleeping... 100 seconds...

> ps -Lf
UID        PID  PPID   LWP  C NLWP STIME TTY          TIME CMD
...
bhkim     4308  2028  4308  0    2 23:02 pts/4    00:00:00 ./a.out
bhkim     4308  2028  4310  0    2 23:02 pts/4    00:00:00 ./a.out
...

```
ps의 출력 정보 중 PID 4308 이라는 항목으로 두줄의 정보가 나온다.
thread id 정도가 있어야 할 자리에 LWP ID가 출력된다. 
첫번째 줄의 LWP 항목은 자신의 PID 와 동일한 값을 가진다.
그리고 두번째 줄의 LWP 항목은 4310 의 값을 가진다. 
LWP는 light wight process의 약자로 리눅스 커널이 스레드를 프로세스로 구현함으로 인해 나타난 증상이라고 볼 수 있다.


LWP 항목은 실제로 PID 의 대용으로 사용할 수 있다. 
예를 들면, kill 4310 과 같은 명령으로 LWP 4310 인 프로세스를 종료할 수도 있다.


요약,

1. 리눅스 커널은 스레드를 프로세스를 이용해 구현한다.
1. LWP 라는 이름은 리눅스의 스레드 구현에 기인한 산물이다.
1. 리눅스의 커널 구현은 스레드를 명시적으로 구현하는 다른 운영체제와 대조된다.


