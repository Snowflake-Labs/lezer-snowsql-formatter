"use strict";
exports.__esModule = true;
exports.mainFormatter = exports.printTree = void 0;
var lezer_tree_1 = require("lezer-tree");
var performance = require("perf_hooks").performance;
var lezer_snowsql_1 = require("lezer-snowsql");
var t0 = performance.now();
var doc1 = "select foo, bar from foobar where foo >= 50;";
function parse(d, fragments) {
    var parse = lezer_snowsql_1.parser.startParse(lezer_tree_1.stringInput(d), 0, { fragments: fragments }), result;
    while (!(result = parse.advance())) { }
    return result;
}
var val = parse(doc1);
console.log("\n---\nOriginal Query: \n" + doc1 + "\n----");
function focusedNode(cursor) {
    var type = cursor.type, from = cursor.from, to = cursor.to;
    return { type: type, from: from, to: to };
}
var Color;
(function (Color) {
    Color[Color["Red"] = 31] = "Red";
    Color[Color["Green"] = 32] = "Green";
    Color[Color["Yellow"] = 33] = "Yellow";
})(Color || (Color = {}));
function colorize(value, color) {
    return "\u001b[" + color + "m" + String(value) + "\u001b[39m";
}
function printTree(tree, input, options) {
    if (options === void 0) { options = {}; }
    var cursor = tree.cursor();
    if (typeof input === "string")
        input = lezer_tree_1.stringInput(input);
    var _a = options.from, from = _a === void 0 ? 0 : _a, _b = options.to, to = _b === void 0 ? input.length : _b, _c = options.start, start = _c === void 0 ? 0 : _c, _d = options.includeParents, includeParents = _d === void 0 ? false : _d;
    var output = "";
    var prefixes = [];
    for (;;) {
        var node = focusedNode(cursor);
        var leave = false;
        if (node.from <= to && node.to >= from) {
            var enter = !node.type.isAnonymous &&
                (includeParents || (node.from >= from && node.to <= to));
            if (enter) {
                leave = true;
                var isTop = output === "";
                if (!isTop || node.from > 0) {
                    output += (!isTop ? "\n" : "") + prefixes.join("");
                    var hasNextSibling = cursor.nextSibling() && cursor.prevSibling();
                    if (hasNextSibling) {
                        output += " ├─ ";
                        prefixes.push(" │  ");
                    }
                    else {
                        output += " └─ ";
                        prefixes.push("    ");
                    }
                }
                output += node.type.isError
                    ? colorize(node.type.name, Color.Red)
                    : node.type.name;
            }
            var isLeaf = !cursor.firstChild();
            if (enter) {
                var hasRange = node.from !== node.to;
                output +=
                    " " +
                        (hasRange
                            ? "[" +
                                colorize(start + node.from, Color.Yellow) +
                                ".." +
                                colorize(start + node.to, Color.Yellow) +
                                "]"
                            : colorize(start + node.from, Color.Yellow));
                if (hasRange && isLeaf) {
                    output +=
                        ": " +
                            colorize(JSON.stringify(input.read(node.from, node.to)), Color.Green);
                }
            }
            if (!isLeaf)
                continue;
        }
        for (;;) {
            if (leave)
                prefixes.pop();
            leave = cursor.type.isAnonymous;
            if (cursor.nextSibling())
                break;
            if (!cursor.parent())
                return output;
            leave = true;
        }
    }
}
exports.printTree = printTree;
console.log(printTree(val, doc1));
function mainFormatter(cursor, input) {
    var _a;
    if (typeof input === "string")
        input = lezer_tree_1.stringInput(input);
    var formattedQuery = "";
    var stmtCount = 0;
    for (;;) {
        var isLeaf = !cursor.firstChild();
        if (cursor.type.name == "Select_no_parens" &&
            ((_a = cursor.node.parent) === null || _a === void 0 ? void 0 : _a.type.name) == "SelectStmt") {
            stmtCount += 1;
            if (stmtCount > 1)
                formattedQuery += "\n\n\n";
            formattedQuery += selectStmtFormatter(cursor, 0);
        }
        if (cursor.type.name == "CreateStmt") {
            stmtCount += 1;
            if (stmtCount > 1)
                formattedQuery += "\n\n\n";
            formattedQuery += "Create Placeholder";
        }
        if (cursor.type.name == "Smc") {
            formattedQuery += "\n;";
        }
        if (!isLeaf)
            continue;
        //not a leaf? continue
        for (;;) {
            if (cursor.nextSibling())
                break; //move to the next sibling
            if (!cursor.parent())
                return formattedQuery; //moves to parent, if there's no sibling
        }
    }
}
exports.mainFormatter = mainFormatter;
console.log("\n***************\n" +
    mainFormatter(val.cursor(), doc1) +
    "\n***************\n");
function basicIndent(count) {
    var basicIndent = "  ";
    return basicIndent.repeat(count);
}
function targetListFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        do {
            if (tempCursor.type.name.toString() == "Identifier") {
                output += basicIndent(indent) + sliceDoc(tempCursor);
            }
            if (tempCursor.type.name.toString() == "Comma") {
                output += ",\n";
            }
        } while (tempCursor.nextSibling());
    }
    tempCursor.parent();
    return output;
}
function fromClauseFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        do {
            if (tempCursor.type.name == "From") {
                output += "\n" + keywordFormatter(tempCursor, indent);
            }
            if (tempCursor.type.name == "From_list") {
                output += fromListFormatter(tempCursor, indent + 1);
            }
        } while (tempCursor.nextSibling());
    }
    tempCursor.parent();
    return output;
}
function noIndentFormatter(cursor) {
    var output = "";
    output = " " + sliceDoc(cursor);
    return output;
}
function expressionFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        do {
            if (tempCursor.type.name == "ColIdentifier") {
                output += colIdentifierFormatter(tempCursor, indent);
            }
            if (["Lss", "Gtr", "Gte", "Lte", "Eql", "In", "Not"].includes(tempCursor.type.name)) {
                output += noIndentFormatter(tempCursor);
            }
            if (tempCursor.type.name == "NumberLiteral") {
                output += numberLiteralFormatter(tempCursor);
            }
        } while (tempCursor.nextSibling());
    }
    return output;
}
function keywordFormatter(cursor, indent) {
    return basicIndent(indent) + sliceDoc(cursor) + "\n";
}
function whereClauseFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        do {
            if (tempCursor.type.name == "Where") {
                output += "\n" + keywordFormatter(tempCursor, indent);
            }
            if (tempCursor.type.name == "ExpressionA") {
                output += expressionFormatter(tempCursor, indent + 1);
            }
        } while (tempCursor.nextSibling());
    }
    return output;
}
function fromListFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        do {
            if (tempCursor.type.name == "Identifier") {
                output += basicIndent(indent) + sliceDoc(tempCursor);
            }
            if (tempCursor.type.name == "Comma") {
                output += ",\n";
            }
            if (tempCursor.type.name == "Select_with_parens") {
                output += selectWithParensFormatter(tempCursor, indent + 1);
            }
            if (tempCursor.type.name == "As") {
                output += noIndentFormatter(tempCursor) + " ";
            }
            if (tempCursor.type.name == "ColIdentifier") {
                output += colIdentifierFormatter(tempCursor, 0);
            }
        } while (tempCursor.nextSibling());
    }
    return output;
}
function numberLiteralFormatter(cursor, indent) {
    var output = "";
    output = sliceDoc(cursor);
    return output;
}
function selectWithParensFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        do {
            if (tempCursor.type.name == "Opl") {
                output += parenFormatter(tempCursor, indent - 1) + "\n";
            }
            if (tempCursor.type.name == "Opr") {
                output += "\n" + parenFormatter(tempCursor, indent - 1);
            }
            if (tempCursor.type.name == "Select_no_parens") {
                output += selectStmtFormatter(tempCursor, indent);
            }
        } while (tempCursor.nextSibling());
    }
    return output;
}
function parenFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    output = basicIndent(indent) + sliceDoc(tempCursor);
    return output;
}
function selectStmtFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Select") {
                    output += keywordFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Target_list") {
                    output += targetListFormatter(tempCursor, indent + 1);
                }
                if (tempCursor.type.name == "From_clause") {
                    output += fromClauseFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Where_clause") {
                    output += whereClauseFormatter(tempCursor, indent);
                }
            } while (tempCursor.nextSibling());
        }
    }
    return output;
}
function colIdentifierFormatter(cursor, indent) {
    var output = "";
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
        if (tempCursor.type.name == "Identifier") {
            output += basicIndent(indent) + sliceDoc(tempCursor);
        }
    }
    return output;
}
function sliceDoc(cursor) {
    return doc1.slice(cursor.from, cursor.to);
}
var t1 = performance.now();
console.log("This took " + (t1 - t0) + " milliseconds.");
