---
layout: post
category :   
tagline: ""
tags : [ruby]
title : Ruby Fiddle char array 설정 방법
---
{% include JB/setup %}

    C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/pack.rb:83:in `pack': too few arguments (ArgumentError)
            from C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/pack.rb:83:in `pack'
            from C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/struct.rb:193:in `[]='
            from C:/Ruby200-x64/lib/ruby/2.0.0/fiddle/struct.rb:60:in `block (3 levels) in create'


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

        o.sz = "aaa\0"

        p o.sz
      end
    end

    FiddleSturctTest::test

크기를 모두 채워야 한다.
    o.sz = "aaa\0"

    o.sz = "aaa\0\0"
