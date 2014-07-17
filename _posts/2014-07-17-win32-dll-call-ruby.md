---
layout: post
title: "Ruby에서 Win32 DLL API 호출하기" 
description: ""
category: ""
tags: [Ruby Win32]
---
{% include JB/setup %}

{% highlight ruby %}
require 'fiddle'
require 'fiddle/import'
require 'fiddle/types'

module Win32Test
  extend Fiddle::Importer
  dlload 'user32.dll'

  include Fiddle::Win32Types

  extern "DWORD MessageBoxA(HWND, LPCSTR, LPCSTR, DWORD)"

  def self.msgbox
    MessageBoxA(0, "OK?", "Please Confirm", 0x40)
  end

end

Win32Test.msgbox

{% endhighlight %}

좀더 복잡한 구조체를 사용하여 호출해야 한다면 [process_tree.rb](https://github.com/unak/mswin-build/blob/master/lib/mswin-build/process_tree.rb)를 확인해 보자.
