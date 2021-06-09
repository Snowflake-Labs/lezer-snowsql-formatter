import {
    Tree,
    TreeFragment,
    stringInput,
    NodeType,
    Input,
    TreeCursor,
  } from "lezer-tree";
  const { performance } = require("perf_hooks");
  import { parser } from "lezer-snowsql";
  var t0 = performance.now();
  
  let doc1 = `select foo, bar from foobar where foo >= 50;`;
  
  function parse(d: string, fragments?: readonly TreeFragment[] | any) {
    let parse = parser.startParse(stringInput(d), 0, { fragments }),
      result: Tree | null | any;
    while (!(result = parse.advance())) {}
    return result;
  }
  var val = parse(doc1);
  
  console.log("\n---\nOriginal Query: \n" + doc1 + "\n----");
  
  function focusedNode(cursor: TreeCursor): {
    readonly type: NodeType;
    readonly from: number;
    readonly to: number;
  } {
    const { type, from, to } = cursor;
    return { type, from, to };
  }
  
  enum Color {
    Red = 31,
    Green = 32,
    Yellow = 33,
  }
  
  function colorize(value: any, color: number): string {
    return "\u001b[" + color + "m" + String(value) + "\u001b[39m";
  }
  
  export function printTree(
    tree: Tree,
    input: Input | string,
    options: {
      from?: number;
      to?: number;
      start?: number;
      includeParents?: boolean;
    } = {}
  ): string {
    const cursor = tree.cursor();
    if (typeof input === "string") input = stringInput(input);
    const {
      from = 0,
      to = input.length,
      start = 0,
      includeParents = false,
    } = options;
    let output = "";
    const prefixes: string[] = [];
    for (;;) {
      const node = focusedNode(cursor);
      let leave = false;
      if (node.from <= to && node.to >= from) {
        const enter =
          !node.type.isAnonymous &&
          (includeParents || (node.from >= from && node.to <= to));
        if (enter) {
          leave = true;
          const isTop = output === "";
          if (!isTop || node.from > 0) {
            output += (!isTop ? "\n" : "") + prefixes.join("");
            const hasNextSibling = cursor.nextSibling() && cursor.prevSibling();
            if (hasNextSibling) {
              output += " ├─ ";
              prefixes.push(" │  ");
            } else {
              output += " └─ ";
              prefixes.push("    ");
            }
          }
          output += node.type.isError
            ? colorize(node.type.name, Color.Red)
            : node.type.name;
        }
        const isLeaf = !cursor.firstChild();
        if (enter) {
          const hasRange = node.from !== node.to;
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
              colorize(
                JSON.stringify(input.read(node.from, node.to)),
                Color.Green
              );
          }
        }
        if (!isLeaf) continue;
      }
      for (;;) {
        if (leave) prefixes.pop();
        leave = cursor.type.isAnonymous;
        if (cursor.nextSibling()) break;
        if (!cursor.parent()) return output;
        leave = true;
      }
    }
  }
  
  console.log(printTree(val, doc1));
  
  export function mainFormatter(
    cursor: TreeCursor,
    input: Input | string
  ): string {
    if (typeof input === "string") input = stringInput(input);
    let formattedQuery: string = "";
    var stmtCount: number = 0;
    for (;;) {
      const isLeaf = !cursor.firstChild();
  
      if (
        cursor.type.name == "Select_no_parens" &&
        cursor.node.parent?.type.name == "SelectStmt"
      ) {
        stmtCount += 1;
        if (stmtCount > 1) formattedQuery += "\n\n\n";
        formattedQuery += selectStmtFormatter(cursor, 0);
      }
  
      if (cursor.type.name == "CreateStmt") {
        stmtCount += 1;
        if (stmtCount > 1) formattedQuery += "\n\n\n";
        formattedQuery += "Create Placeholder";
      }
  
      if (cursor.type.name == "Smc") {
        formattedQuery += "\n;";
      }
  
      if (!isLeaf) continue;
      //not a leaf? continue
  
      for (;;) {
        if (cursor.nextSibling()) break; //move to the next sibling
        if (!cursor.parent()) return formattedQuery; //moves to parent, if there's no sibling
      }
    }
  }
  
  console.log(
    "\n***************\n" +
      mainFormatter(val.cursor(), doc1) +
      "\n***************\n"
  );
  
  function basicIndent(count: number): string {
    var basicIndent: string = "  ";
    return basicIndent.repeat(count);
  }
  
  function targetListFormatter(cursor: TreeCursor, indent: number) :string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
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
  
  function fromClauseFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
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
  
  function noIndentFormatter(cursor: TreeCursor): string {
    var output: string = "";
    output = " " + sliceDoc(cursor);
    return output;
  }
  
  function expressionFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == "ColIdentifier") {
          output += colIdentifierFormatter(tempCursor, indent);
        }
  
        if (
          ["Lss", "Gtr", "Gte", "Lte", "Eql", "In", "Not"].includes(
            tempCursor.type.name
          )
        ) {
          output += noIndentFormatter(tempCursor);
        }
  
        if (tempCursor.type.name == "NumberLiteral") {
          output += numberLiteralFormatter(tempCursor);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }
  function keywordFormatter(cursor: TreeCursor, indent:number): string {
    return basicIndent(indent) + sliceDoc(cursor) + "\n";
  }
  
  function whereClauseFormatter(cursor: TreeCursor, indent:number): string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
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
  function fromListFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
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
  
  function numberLiteralFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = "";
    output = sliceDoc(cursor);
  
    return output;
  }
  
  function selectWithParensFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
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
  function parenFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
    output = basicIndent(indent) + sliceDoc(tempCursor);
    return output;
  }
  function selectStmtFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
  
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
  
  function colIdentifierFormatter(cursor: TreeCursor, indent: number) {
    var output: string = "";
    var tempCursor: TreeCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      if (tempCursor.type.name == "Identifier") {
        output += basicIndent(indent) + sliceDoc(tempCursor);
      }
    }
  
    return output;
  }
  
  function sliceDoc(cursor: TreeCursor): string {
    return doc1.slice(cursor.from, cursor.to);
  }
  
  var t1 = performance.now();
  
  console.log("This took " + (t1 - t0) + " milliseconds.");
  