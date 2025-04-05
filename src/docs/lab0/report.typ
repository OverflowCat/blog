#set text(lang: "zh", font: ("IBM Plex Serif", "Noto Serif CJK SC"), size: 1.1em)
#set page(margin: 0cm, width: 14cm, height: auto)
#set par(justify: true, leading: 1em)
#show heading: set text(font: ("Latin Modern Sans", "IBM Plex Sans SC"), weight: "bold")
#show heading: set block(above: 2em, below: 1.1em)
#set heading(
  numbering: (..lvs) => if lvs.pos().len() == 3 [
    Thinking 0.#lvs.pos().at(2)#h(.5em)
  ] /* else { none } */,
)
#show raw: set text(font: "BlexMono Nerd Font", size: 1.22em)
#import "../utils.typ": q
#import "@preview/codly:1.2.0": *
#import "@preview/codly-languages:0.1.1": *
#show: codly-init.with()

#codly(languages: codly-languages)

== 思考题

=== Git 的使用 1

#q[执行命令 ```sh cat Untracked.txt``` 和 ```sh cat Stage.txt```，对比两次运行的结果，体会
  README.txt 两次所处位置的不同。]

对比两者的输出，可以看到 `README.txt` 从 Untracked files 列表中移动到了 Changes to be committed 列表中。

#q[执行命令 ```sh cat Modified.txt```，观察其结果和第一次执行 ```sh add``` 命令之前的 status 是否一样，并思考原因。]

当前的 status 显示 README.txt 处于 "Changes not staged for commit" 并且是 modified 状态，这意味着在 `README.txt` 被添加到暂存区之后内容又被修改了，但修改还没有被添加到暂存区。

=== 箭头与命令

#figure(
  image("lifecycle.svg"),
  caption: "Git 中的四种状态转换关系",
)<lifecycle>

#q[仔细看看@lifecycle，思考一下箭头中的 add the file、stage the file 和
commit 分别对应的是 Git 里的哪些命令呢？]

- `add the file` 和 `stage the file` 对应的是 `git add` 命令；
- `commit` 对应的是 `git commit` 命令。

=== Git 的一些场景


#codly(number-format: none)
+ #q[代码文件 `print.c` 被错误删除时，应使用什么命令将其恢复？]
  ```sh
  git checkout print.c
  ```

+ #q[代码文件 `print.c` 被错误删除后，执行了 ```sh git rm print.c``` 命令，此时应当使用什么命令将其恢复？]

  ```sh
  git restore print.c
  ```

+ #q[无关文件 `hello.txt` 已经被添加到暂存区时，如何在不删除此文件的前提下将其移出暂存区？]

  ```sh
  git reset hello.txt
  ```

=== Git 的使用 2

+ #q[使用 ```sh git log``` 命令查看提交日志，看是否已经有三次提交，记下提交说明为 3 的哈希值。]

```
538d89392bb30646faeaf5823be2f16006f5fe88
```

+ #q[进行版本回退。执行命令 ```sh git reset --hard HEAD^``` 后，再执行 ```sh git log```，观察其变化。]

`HEAD^` 代表当前的前一个版本（提交 2）。```sh git log``` 观察提交记录，3 版本的提交会消失。

+ #q[找到提交说明为 1 的哈希值，执行命令 ```sh git reset --hard``` 后，再执行 ```sh git log```，观察其变化。]

当前 HEAD 指向了版本 1。

+ #q[现在已经回到了旧版本，为了再次回到新版本，执行 ```sh git reset --hard```，再执行 ```sh git log```，观察其变化。]

发现 3 版本恢复，版本历史回到了最新状态。

=== echo 的使用

#include "echo-usage.typ"

=== 文件的操作

#q[使用你知道的方法（包括重定向）创建下图内容的文件（文件命名为 `test`），将创建该文件的命令序列保存在
  `command` 文件中，并将 `test` 文件作为批处理文件运行，将运行结果输出至 result 文件中。给出
  `command` 文件和 `result` 文件的内容，并对最后的结果进行解释说明（可以从
  `test` 文件的内容入手）。]

#codly(number-format: numbering.with("1"))
#codly(header: [test])
```bash
echo 'echo Shell Start...
echo set a = 1
a=1
echo set b = 2
b=2
echo set c = a+b
c=$[$a+$b]
echo c = $c
echo save c to ./file1
echo $c>file1
echo save b to ./file2
echo $b>file2
echo save a to ./file3
echo $a>file3
echo save file1 file2 file3 to file4
cat file1>file4
cat file2>>file4
cat file3>>file4
echo save file4 to ./result
cat file4>>result' > command
```

#codly(header: [command])
```bash
3
2
1
3
2
1
```

#let q1 = raw("echo echo Shell Start", lang: "bash")
#let q2 = raw("echo `echo Shell Start`", lang: "bash")
#let q1a = raw("echo Shell Start", lang: "bash")
#let q2a = raw("Shell Start", lang: "bash")

#q[具体实现的过程中思考下列问题：

  + #q1 与 #q2 效果是否有区别；
  + ```sh echo echo $c>file1``` 与 ```sh echo `echo $c>file1` ``` 效果是否有区别。
]

+ #q1 会输出 #q1a，而 #q2 会输出 #q2a。这是因为被 ```sh ` ` ``` 包围的字符串会被当成命令先执行，然后将结果作为参数传递给外部命令；而前者则是将后面的三个单词（`echo`、`Shell`、`Start`）作为参数传递给 `echo` 命令。

2.
  - 第一个命令调用外层的 ```sh echo``` 命令，其参数为字符串 ```sh "echo"``` 和变量 ```sh $c``` 的值，同时整个命令的标准输出被重定向到文件 `file1`。文件 `file1` 中会写入 `echo` 与变量 ```sh $c``` 的值使用空格拼接的字符串。
  - 第二个命令先执行被 ```sh ` ` ``` 包围的 ```sh echo $c>file1```，即将变量 ```sh $c``` 的值写入文件 `file1`，然后将结果作为参数传递给外部的 `echo` 命令。由于 ```sh ` ` ``` 内的命令反回值为空，所以最终的结果是 `file1` 中只有变量 ```sh $c``` 的值，而终端上没有输出。

== 难点分析

+ Makefile 调用子目录下的 Makefile：```makefile $(MAKE) -C subdir```。实测 `cd` 后目录不会发生改变。
+ sed 替换文本时可使用不同的分隔符，如 ```sh sed 's|/|\\|g'```。
+ bash 里从完整路径提取不含扩展名的文件名：
  ```sh
  filename=${file##*/}
  ${filename%.*}
  ```

== 实验体会

虽然平时对 Git 略有涉猎，但本次实验让我对 Git 的基本操作有了更深入的理解，学会了以前没遇到过的情况。同时，通过文件的操作部分，我也复习了 Shell 脚本中重定向、调用命令等操作。这对于后续实验的进行想必会有很大的帮助。
