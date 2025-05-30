```cj /override/#s /result/#v /func isConstExpr(expr: /#i /parenthesizedExpr/#s
class MyVisitor <: Visitor {
    public var result = ArrayList<BinaryExpr>()

    private func isConstExpr(expr: BinaryExpr): Bool {
        let isLeftConst = match (expr.leftExpr) {
            case left: LitConstExpr => true
            case left: BinaryExpr => isConstExpr(left)
            case left: ParenExpr => isConstExpr(left)
            case left: UnaryExpr => isConstExpr(left)
            case _ => false
        }
        if (!isLeftConst) { // early return
            return false
        }
        let isRightConst = match (expr.rightExpr) {
            case right: LitConstExpr => true
            case right: BinaryExpr => isConstExpr(right)
            case right: ParenExpr => isConstExpr(right)
            case right: UnaryExpr => isConstExpr(right)
            case _ => false
        }
        isRightConst
    }

    private func isConstExpr(expr: UnaryExpr): Bool {
        match (expr.op) {
            ...
        }
    }

    private func isConstExpr(expr: ParenExpr): Bool {
        match (expr.parenthesizedExpr) {
            case inner: BinaryExpr => isConstExpr(inner)
            case inner: LitConstExpr => true
            case inner: ParenExpr => isConstExpr(inner)
            case inner: UnaryExpr => isConstExpr(inner)
            case _ => false
        }
    }

    public override func visit(expr: BinaryExpr) {
        if (isConstExpr(expr)) {
            result.append(expr)
            breakTraverse() // 不会继续遍历子节点
        }
        return
    }
}

...
let program = parseProgram(tokens)
program.traverse(visitor)
```
