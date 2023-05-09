---
title: "競技プログラミングの文脈における「グラフを陽に持つ」という表現について"
description: ""
pubDate: "2023-05-05"
heroImage: "/placeholder-hero.jpg"
author: "allegrogiken"
category: "competitive_programming"
---

AtCoderなどのグラフ問題の解説において「グラフを陽に持たずに〜しましょう」といった表現に遭遇することがあります。
この表現は稀に登場しますが、具体的な解説をウェブ上で見つけることができませんでした。私なりの理解をこの記事で表現してみようと思います。

https://twitter.com/kyuridenamida/status/420008450588831745

## グラフを陽に持つ実装の例

例えば、グラフの頂点数と辺が与えられる場合を考えます。
この場合、よくある実装としてはグラフを「隣接リスト」の形で組み立てることをすると思います。
このパターンは「陽に持つ」実装と言えます。

```D:grid.d
// グラフを隣接リストで表現する
auto graph = new int[][](N, 0);
foreach(e; edges) {
  graph[e[0]] ~= e[1];
  graph[e[1]] ~= e[0];
}

// グラフを探索する
for(auto queue = DList!int(0); !queue.empty;) {
  auto cur = queue.front;
  queue.removeFront;

  foreach(next; graph[cur]) {
    queue.insertBack(next);
  }
}
```

## グラフを陽に持たない実装の例

例えば `N*N` 正方形上のマス目があり、とあるマスからは右、あるいは下にだけ移動することができる・・ というようなケースを考えます。

こういったマス目上の実装をする場合、辺をデータで表現するまでもなく `(x, y) => (x + 1, y)` あるいは `(x, y) => (x, y + 1)` の遷移を考えれば良いです。
このため、頂点ごとの辺情報を組み立てておく必要はありませんね。こういったケースが「陽に持たずに」遷移を実装していると言えます。

```D:grid.d
alias Coord = Tuple!(int, "x", int, "y");

// グラフを探索する
for(auto queue = DList!Coord(Coord(0, 0)); !queue.empty;) {
  auto cur = queue.front;
  queue.removeFront;

  foreach(next; [Coord(cur.x + 1, cur.y), Coord(cur.x, cur.y + 1)]) {
    queue.insertBack(next);
  }
}
```


