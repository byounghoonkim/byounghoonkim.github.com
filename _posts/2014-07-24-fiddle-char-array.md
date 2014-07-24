---
layout: post
category :   
tagline: ""
tags : [ruby]
title : Ruby Fiddle char array 설정 방법
---
{% include JB/setup %}

fiddle에서 제공하는 struct를 사용할 때 char buffer를 설정하려고 하면 too few arguments 에러를 만날 수 있다.

    C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/pack.rb:83:in `pack': too few arguments (ArgumentError)
            from C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/pack.rb:83:in `pack'
            from C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/struct.rb:193:in `[]='
            from C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/struct.rb:60:in `block (3 levels) in create'

아래와 같은 코드에서 o.sz = "a\0" 부분에서 에러가 발생하게 된다.

{% highlight ruby %} 
    require "fiddle/import"
    require "fiddle/types"

    module FiddleSturctTest 
      extend Fiddle::Importer
      dlload "kernel32.dll"
      include Fiddle::Win32Types

      CStringArrayStruct = struct([
        "int n",
        "char sz[5]"
      ])

      def self.test

        o = CStringArrayStruct.malloc

        p o.sz

        o.sz = "a\0"

        p o.sz
      end
    end

    FiddleSturctTest::test

{% endhighlight %}

원인은 pack.rb 내에서 해당 버퍼를 채울 때 버퍼 크기 보다 작은 파라미터가 입력 될 경우 에러로 처리 하기 때문이다.
그러므로 버퍼를 설정할 때는 크기를 모두 채워야 한다.
위 코드의 경우 sz의 크기를 5로 설정했으므로 아래와 같이 \0 문자를 3개 더 추가해 주어야 한다.

{% highlight ruby %} 
    o.sz = "a\0\0\0\0"
{% endhighlight %}
