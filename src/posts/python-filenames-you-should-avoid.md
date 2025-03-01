---
title: 你不应该使用的 Python 文件名
desc: 最末的结论是，你不应该使用以下名称作为 Python 代码的文件/模块名
date: 2023-01-16 14:58:08
categories: Python
icon: "gravity-ui:logo-python"
layout: "@/layouts/Default.astro"
noscript: true
ext: md
---

在新 VPS 上运行 Python 程序的时候出现了问题：[`pdm`](https://pdm.fming.dev/latest/) 无法正常 install 或者设置 config，`poetry` 可以但是无法正常运行。两者都在获取运行环境的时候发生了同样的错误。以下是一个最小复现例子：

```sh
[neko@host temp]$ ls
select.py
[neko@host temp]$ cat select.py
print("hello, world!")
[neko@host temp]$ python
Python 3.10.9 (main, Dec 19 2022, 17:35:49) [GCC 12.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>> import platform
hello, world!
Traceback (most recent call last):
  File "/usr/lib/python3.10/subprocess.py", line 69, in <module>
    import msvcrt
ModuleNotFoundError: No module named 'msvcrt'

During handling of the above exception, another exception occurred:

Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
  File "/usr/lib/python3.10/platform.py", line 119, in <module>
    import subprocess
  File "/usr/lib/python3.10/subprocess.py", line 76, in <module>
    import selectors
  File "/usr/lib/python3.10/selectors.py", line 291, in <module>
    class SelectSelector(_BaseSelectorImpl):
  File "/usr/lib/python3.10/selectors.py", line 318, in SelectSelector
    _select = select.select
AttributeError: module 'select' has no attribute 'select'
>>>
```

我一 Linux 怎么会需要 `msvcrt`？~~一开始以为是 Arch 仓库里的 Python 有问题~~，或者是 `pip` 安装的时候在 root 用户操作而破坏了系统，但是重装了几次全部依赖也没有解决。排查许久后，发现只有在我的代码文件夹里进入 REPL `import platform` 会报错。然后发现项目里用的一个模块的名称叫 `select.py`。是的，导入 Python 内置的 <a href="https://docs.python.org/3/library/index.html">标准库 <i class="fa-brands fa-python"></i></a> 的时候，**标准库内部的 `import` 也是在当前工作目录下进行的**（！）。

最末的结论是，你不应该使用以下名称作为 Python 代码的文件/模块名：

`abc`, `aifc`, `argparse`, `array`, `ast`, `asyncio`, `atexit`, `audioop`, `base64`, `bdb`, `binascii`, `bisect`, `builtins`, `bz2`, `calendar`, `cgi`, `cgitb`, `chunk`, `cmath`, `cmd`, `code`, `codecs`, `codeop`, `collections`, `colorsys`, `compileall`, `concurrent`, `configparser`, `contextlib`, `contextvars`, `copy`, `copyreg`, `csv`, `ctypes`, `dataclasses`, `datetime`, `dbm`, `decimal`, `difflib`, `dis`, `doctest`, `email`, `ensurepip`, `enum`, `errno`, `faulthandler`, `filecmp`, `fileinput`, `fnmatch`, `fractions`, `ftplib`, `functools`, `gc`, `getopt`, `getpass`, `gettext`, `glob`, `graphlib`, `gzip`, `hashlib`, `heapq`, `hmac`, `html`, `http`, `imaplib`, `imghdr`, `imp`, `importlib`, `inspect`, `io`, `ipaddress`, `itertools`, `json`, `keyword`, `linecache`, `locale`, `logging`, `lzma`, `mailbox`, `mailcap`, `marshal`, `math`, `mimetypes`, `mmap`, `modulefinder`, `msilib`, `msvcrt`, `multiprocessing`, `netrc`, `nntplib`, `numbers`, `operator`, `optparse`, `os`, `pathlib`, `pdb`, `pickle`, `pickletools`, `pipes`, `pkgutil`, `platform`, `plistlib`, `poplib`, `pprint`, `profile`, `py_compile`, `pyclbr`, `pydoc`, `pyexpat`, `queue`, `quopri`, `random`, `re`, `reprlib`, `rlcompleter`, `runpy`, `sched`, `secrets`, `select`, `selectors`, `shelve`, `shlex`, `shutil`, `signal`, `site`, `smtplib`, `sndhdr`, `socket`, `socketserver`, `sqlite3`, `ssl`, `stat`, `statistics`, `string`, `stringprep`, `struct`, `subprocess`, `sunau`, `symtable`, `sys`, `sysconfig`, `tabnanny`, `tarfile`, `telnetlib`, `tempfile`, `test`, `textwrap`, `threading`, `time`, `timeit`, `tkinter`, `token`, `tokenize`, `tomllib`, `trace`, `traceback`, `tracemalloc`, `turtle`, `types`, `typing`, `unicodedata`, `unittest`, `urllib`, `uu`, `uuid`, `venv`, `warnings`, `wave`, `weakref`, `webbrowser`, `winreg`, `winsound`, `wsgiref`, `xdrlib`, `xml`, `xmlrpc`, `zipapp`, `zipfile`, `zipimport`, `zlib`, `zoneinfo` 🐍
