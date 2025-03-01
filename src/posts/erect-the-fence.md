---
title: Graham 扫描法求凸包
desc: 在一个二维的花园中，有一些用 $(x, y)$ 坐标表示的树。由于安装费用十分昂贵，你的任务是先用最短的绳子围起所有的树。只有当所有的树都被绳子包围时，花园才能围好栅栏。你需要找到正好位于栅栏边界上的树的坐标。
date: 2022-11-19 22:58:41
tags:
- 力扣每日挑战
- Rust
categories:
- 题解
- Selected
math: mathjax
layout: "@/layouts/Default.astro"
noscript: true
ext: md
---

## 题目

今天的力扣（LCUS）每日挑战是 [587. 安装栅栏](https://leetcode.cn/problems/erect-the-fence/)．

> 在一个二维的花园中，有一些用 $(x, y)$ 坐标表示的树．由于安装费用十分昂贵，你的任务是先用最短的绳子围起所有的树．只有当所有的树都被绳子包围时，花园才能围好栅栏．你需要找到正好位于栅栏边界上的树的坐标．

## 知识点

其实质是求若干点组成的二维 [凸包](https://oi-wiki.org/geometry/convex-hull/)（convex hull）．常用的求法有 Graham 扫描法（[Graham's scan](https://en.wikipedia.org/wiki/Graham_scan)）和 Andrew 算法，本文提供了一个由 Rust 实现的 Graham 扫描法．

## 思路

算法的步骤如下：

1. 若点个数少于 3 个，则直接返回输入．否则按如下方法求解．
2. 首先，找出纵坐标最小的点．若有多个，则选横坐标最小的点．以该点建立极坐标系．
3. 此时，将所有的点按照极角的大小升序排列，若有极角相同的，则再按该点到极点距离升序排列．
4. 然后维护一个栈．先将排列好的点的前两个入栈，然后对于其后的每一个点 $C$，记栈中最后一个点为 $B$，倒数第二个点为 $A$，若以 $A$ 为圆心，$\overrightarrow{AC}$ 在 $\overrightarrow{AB}$ 顺时针方向，则说明为凹，需要出栈一次，重复上述步骤，直至$\overrightarrow{AC}$ 与 $\overrightarrow{AB}$ 重合，或前者在后者逆时针方向．此时再将 C 点入栈．
5. 处理完所有的点后，需要再找出不在栈中但在栈的最后一个点与栈的第一个点构成的线段上的点．

## 示例

### 输入数据

```python
[[3,0],[4,0],[5,0],[6,1],[7,2],[7,3],[7,4],[6,5],[5,5],[4,5],[3,5],[2,5],[1,4],[1,3],[1,2],[2,1],[4,2],[0,3]]
```

```
- - * * * * * -
- * - - - - - *
* * - - - - - *
- * - - * - - *
- - * - - - * -
- - - * * * - -
```

### 预期结果

```python
[[4,5],[2,5],[6,1],[3,5],[2,1],[1,4],[1,2],[7,4],[7,3],[7,2],[3,0],[0,3],[5,0],[5,5],[4,0],[6,5]]
```

```
- - * * * * * -
- * - - - - - *
* - - - - - - *
- * - - - - - *
- - * - - - * -
- - - * - * - -
```

### 错误结果

若没有第 5 步，则缺少两点 $(1, 2), (2, 1)$ $\small{\mathrm{(0-indexed)}}$．

```python
[[7,3],[5,0],[7,4],[4,5],[1,4],[4,0],[5,5],[6,1],[3,0],[6,5],[2,5],[7,2],[0,3],[3,5]]
```

```
- - * * * * * -
- * - - - - - *
* - - - - - - *
- - - - - - - *
- - - - - - * -
- - - * * * - -
```

## 计算

需要用到一些向量的性质．

### 判断逆时针

两向量叉积为正，则 $\overrightarrow{AC}$ 在 $\overrightarrow{AB}$ 的逆时针方向．

### 判断点在线段上

记线段为 $AB$，点为 $P$，保证 $A$、$B$、$P$ 三点不重合．若 $\overrightarrow{AP}\cdot\overrightarrow{BP} = -|AP|\cdot|BP|$，则点在线段上．

## 代码

```rust
use std::{cmp::Ordering::*, collections::HashSet};
#[derive(Copy, Clone, Debug, Hash, Eq, PartialEq)]
struct Tree(i32, i32);
impl Solution {
    #[inline]
    fn cross_product(x_1: i32, y_1: i32, x_2: i32, y_2: i32) -> i32 {
        x_1 * y_2 - x_2 * y_1
    }

    pub fn outer_trees(trees: Vec<Vec<i32>>) -> Vec<Vec<i32>> {
        if trees.len() < 3 {
            return trees;
        }
        let mut init = (114514, 114514);
        trees.iter().for_each(|t| match t[1].cmp(&init.1) {
            Less => {
                init = (t[0], t[1]);
            }
            Equal => {
                init.0 = init.0.min(t[0]);
            }
            _ => {}
        });
        // println!("左下角的点是 {:?}", init);
        let mut trees: Vec<Tree> = trees
            .into_iter()
            .map(|t| Tree(t[0] - init.0, t[1] - init.1))
            // 这里以左下角的点为 (0, 0)
            .collect();
        trees.sort_by(
            |a, b| match { 0.cmp(&Self::cross_product(a.0, a.1, b.0, b.1)) } {
                Equal => (a.0.pow(2) + a.1.pow(2)).cmp(&(b.0.pow(2) + b.1.pow(2))),
                res => res,
            },
        );
        let mut stack = Vec::new();
        stack.push(trees[0]);
        stack.push(trees[1]);
        for t in trees.iter().skip(2) {
            while {
                let length = stack.len();
                length > 1 && {
                    let (a, b) = (stack[stack.len() - 2], stack[stack.len() - 1]);
                    let x_1 = t.0 - a.0;
                    let y_1 = t.1 - a.1;
                    let x_2 = b.0 - a.0;
                    let y_2 = b.1 - a.1;
                    Self::cross_product(x_1, y_1, x_2, y_2) > 0
                }
            } {
                stack.pop().unwrap();
            }
            stack.push(t.clone());
        }
        let mut trees: HashSet<_> = trees.into_iter().collect();
        for x in &stack {
            trees.remove(x);
        }
        let Tree(p1x, p1y) = stack[stack.len() - 1];
        let Tree(p2x, p2y) = stack[0];
        let extra: Vec<Tree> = trees // 栈中最后一个点与栈中第一个点构成的线段上的点
            .into_iter()
            .filter_map(|a| {
                let Tree(p_x, p_y) = a;
                let vec1 = (p_x - p1x, p_y - p1y);
                let vec2 = (p_x - p2x, p_y - p2y);
                if (vec1.0 * vec2.0 + vec1.1 * vec2.1).pow(2)
                    == (vec1.0.pow(2) + vec1.1.pow(2)) * (vec2.0.pow(2) + vec2.1.pow(2))
                {
                    Some(a)
                } else {
                    None
                }
            })
            .collect();
        stack
            .into_iter()
            .chain(extra.into_iter())
            .map(|x| vec![x.0 + init.0, x.1 + init.1])
            .collect()
    }
}

// 以下是测试部分
struct Solution;
fn main() {
    let res: HashSet<Vec<i32>> = HashSet::from_iter(
        Solution::outer_trees(vec![vec![1, 1], vec![2, 2],
        vec![2, 0], vec![2, 4], vec![3, 3], vec![4, 2]]).into_iter(),
    );
    assert_eq!(
        res,
        HashSet::from_iter(
            vec![vec![1, 1], vec![2, 0], vec![4, 2],
            vec![3, 3], vec![2, 4]].into_iter()
        )
    );

    let res: HashSet<Vec<i32>> = HashSet::from_iter(Solution::outer_trees(vec![
        vec![3, 0], vec![4, 0], vec![5, 0], vec![6, 1], vec![7, 2], vec![7, 3],
        vec![7, 4], vec![6, 5], vec![5, 5], vec![4, 5], vec![3, 5], vec![2, 5],
        vec![1, 4], vec![1, 3], vec![1, 2], vec![2, 1], vec![4, 2], vec![0, 3]
    ]));
    assert_eq!(
        res, HashSet::from_iter(
            vec![vec![4, 5], vec![2, 5], vec![6, 1], vec![3, 5], vec![2, 1],
            vec![1, 4], vec![1, 2], vec![7, 4], vec![7, 3], vec![7, 2], vec![3, 0],
            vec![0, 3], vec![5, 0], vec![5, 5], vec![4, 0], vec![6, 5]].into_iter()
        )
    );
}
```

以上．🌲
