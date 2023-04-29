---
title: 三键成码：在 Powershell 中用三个字母和任意符号输出 Hello World
date: 2023-03-30 19:17:00
layout: "@/templates/zh/Blank.astro"
---

其实 [这篇文章](https://github.com/InvoluteHell/ThreeKeysProgramming/tree/master/OverflowCat) 在去年暑假就已经写好，不过最近我的 [pull request](https://github.com/InvoluteHell/ThreeKeysProgramming/pull/36) 才被合并，已经快忘掉了。现修缮后发出来。

## 规则

三键成码一项编程比赛，要求参赛者仅用三个字母或数字以及任意数量的符号编码输出 `Hello, World!`，并且文件体积最小者获胜。以下是详细规则：

>1. 参赛选手自行挑选三个「字母 / 数字」来编写代码，代码中的「字母 / 数字」**只能且必须** 有这三个（大小写算两个不同的键）
>2. 除此三个「字母 / 数字」外，额外允许使用普通键盘上的所有 ASCII 符号（例如 `{`, `;` 等）
>3. 该程序运行后输出 `Hello, World!`, 有且仅有该内容，要求分毫不差，注意大小写和符号
>4. 上传的所有文件体积最小者获胜！（结果截图、说明文档等的不算）
>5. 不限编程语言，但禁止使用极小众语言；我们对极小众的定义是：[Github 语言统计](https://madnight.github.io/githut/#/pull_requests/2022/1) 上从未出现过的语言
>6. 所有的依赖条件均需是在本比赛开始前就是已有的；否则请上传，作为文件内容统计的一部分！
>7. 要求使用平庸的编译/执行命令、测试环境、文件名，除平庸部分外，其余部分也需要符合上述 1, 2 两条的要求
>8. 静态类型语言的入口函数名，不受 1 中的限制。例如 C 语言的 `int main`, Java 的 `public static void main` 等

截至 2023 年 3 月，PowerShell 在 GitHub 使用量排第 32 名，占比 0.102%，符合要求。[^3psrank]

[^3psrank]: 点击第 5 条规则中的链接查看。

## 代码

选择的 3 个字母：`i`、`e`、`x`。

```powershell
$i=$?+$?
$e=$i+$i
$xi=$x=$e+$i
$xe=""+$x+$x
$xx=""+$x+--$e
$x=(""+$?)[$i]
iex "`$ex=""``$x{$xe}"";`$xe=""``$x{$xx}"""
$ii=$e+++$i
$ix=$ii+$i
$ei=$e*$i
$x="``$x{"
iex "`$e=""$x$e$ei}e$x$xi$xe}$x$xi$xe}$x$xi$ex}, $x$ii$ix}$x$xi$ex}$x$ix$i}$x$xi$xe}$x$xi$e}!"""
$e
```

压成一行时语句结尾需要有分号。

```powershell
$i=$?+$?;$e=$i+$i;$xi=$x=$e+$i;$xe=""+$x+$x;$xx=""+$x+--$e;$x=(""+$?)[$i];iex "`$ex=""``$x{$xe}"";`$xe=""``$x{$xx}""";$ii=$e+++$i;$ix=$ii+$i;$ei=$e*$i;$x="``$x{";iex "`$e=""$x$e$ei}e$x$xi$xe}$x$xi$xe}$x$xi$ex}, $x$ii$ix}$x$xi$ex}$x$ix$i}$x$xi$xe}$x$xi$e}!""";$e
```

### 环境

**PowerShell 7.2.5**，需要自行安装，Windows 自带的版本较旧，没有 Unicode 转义字符。

代码可以在终端直接粘贴，或者通过 `.\x.ps1` 运行。

## 原理

### 选择字母

让我们先来看看其他提交者所用的语言中是怎么做到的：

* JavaScript 有 [JSFuck](http://www.jsfuck.com/) 这种东西，甚至可以只有符号，自然是不消说的
* Python 版本中选择了 `exec`——Python 中的 `eval` 只能执行单纯的表达式，无法创建变量，而且需要 4 个字母；而 `exec` 可以执行代码块
* Bash 用了 `tr`
* Ruby 选了 `c` 和另外两个数字——Ruby 中 <code>&lt;&lt;</code> 是字符串连接运算符，<code>\\&#x24;&gt;</code> 是 `stdout`，后面用格式化字符串 `"%c"` 和一个整数数组
* C 利用了 UB 和不平凡的编译命令
* PHP 选了 `H`、`e`、`l`，剩下的字符惊为天人，不知道是利用了什么隐式类型转换，看不懂

PowerShell 中无法对 Char 进行加减操作，显式地进行类型转换也需要类似 `[char]65` 至少 4 个字母。[^3key1] 所以只能考虑 eval。PowerShell 中的命令名都很长，不过 Invoke-Expression 有别名 `iex`。另外有一个可以执行字符串的操作符 `&`，但是只能是命令名，不能带参数。[^3key2]

[^3key1]: <a href="https://community.idera.com/database-tools/powershell/powertips/b/tips/posts/converting-ascii-and-characters">Converting ASCII and Characters - Power Tips - Power Tips - IDERA Community</a>
[^3key2]: <a href="https://stackoverflow.com/questions/50018274/why-does-invoke-operator-and-invoke-expression-produce-different-results-for">Why does invoke operator (&amp; and Invoke-Expression produce different results for the same input? - Stack Overflow)</a>

### 第一个数字

因为不能直接出现数字了，所以需要想办法得到第一个 Int 类型的值。发现数组下标为空字符串 `''` 时可以得到数组的第一个元素，但是如果想要后面的字母的话，PowerShell 并没有提供 pop 等函数。[^3key3]
数字字面量也都至少需要有 `0` 出现。所以只能通过其他类型隐式转换出 Int 来。

[^3key3]: <a href="https://stackoverflow.com/questions/24754822/powershell-remove-item-0-from-an-array">PowerShell Remove item 0 from an array - Stack Overflow</a>

```powershell
$i = $? + $?
```

- <code>\\&#x24;?</code> 表示上一条命令的返回值，在初始时和上一条命令没有出错时为 `True`。[^3key4]
- PowerShell 中的 `==` 是 `-eq`，需要额外的字母。
- 当 Bool 类型转换为整数时，`True` 是 `1`，故 <code>\\&#x24;i` 为 `2</code>。[^3key5]

剩下的大部分操作都是在构造其他数字，代码的长度应该可以再压缩一点。

[^3key4]: <a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_automatic_variables?view=powershell-7.2#section-1">&#x24;? - PowerShell Core - About - Automatic Variables</a>
[^3key5]: <a href="https://docs.microsoft.com/en-us/powershell/scripting/lang-spec/chapter-06?view=powershell-7.2#64-conversion-to-integer">Conversion#Conversion to integer</a>

### 构造 Unicode

```powershell
$x = ("" + $?)[$i]
```

- `+` 运算符的两个参数类型不一致的时候，会将第二个参数隐式转换为第一个参数的类型。故此处 <code>\\&#x24;e</code> 为 String `"True"`。

至此，我们有了所需的数字和字母 `u`，可以用 `"u{x}"` 来生成一切字符了。不过，`"Hello World!"` 除了可以直接输入的 `e`、空格和 `!`，十六进制值中还需要 `c` 和 `f`。幸好这两个的编码分别为 `63` 和 `66`，没有 a-f 出现。<code>\\&#x24;e</code> 实际上就是：

```powershell
$e = "``u{48}e``u{6c}``u{6c}``u{6f}, ``u{57}``u{6f}``u{72}``u{6c}``u{64}!";
```

#### 转义字符

```powershell
iex "`$ex=""``$x{$xe}"";`$xe=""``$x{$xx}"""
```

- 字符串用双引号的好处是可以直接嵌入变量。如果要 escape 的话，需要在 <code>\\&#x24;</code>、`"`、`` ` `` 前面加上 `` ` ``；`"` 也可以自身重复两次 `""` 来 escape。[^3key6]

[^3key6]: <a href="https://www.rlmueller.net/PowerShellEscape.htm">Escaping in PowerShell</a>

### 打印值

PowerShell 默认打印出前一个表达式的值，所以不需要拼凑出 `"echo"` 再 `iex` 什么的。

### 其他可能的方法

- 变量赋值时可以直接是命令的输出。比如旧版 PowerShell 可以通过 <code>\\&#x24;ls = ls; \\&#x24;ls[x][x]</code> 拿到 ls 命令表头具体的一个 Char，或许有的命令的输出包含全部所需的字母。但是新版中大部分命令的输出不再是字符串而是对象了，两次下标拿到的仍然和原结果一样。
- <code>\\&#x24;error</code> 是一个存放了错误信息字符串的数组。[^3key7] 不过，错误会直接输出，不符合「该程序运行后输出 Hello, World!, 有且仅有该内容，要求分毫不差」的要求。

[^3key7]: <a href="https://www.tutorialspoint.com/what-is-use-of-error-variable-in-powershell">What is use of $error variable in PowerShell?</a>
