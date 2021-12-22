import { Tree, TreeFragment, stringInput, Input, TreeCursor, NodeType } from 'lezer-tree';
import { parser } from 'lezer-snowsql';

export function format(input: string) {
  var doc1: string = input;

  var functionMap: { [key: string]: Function } = {
    Select: keywordFormatter,

    Target_list: targetListFormatter,

    From_clause: fromClauseFormatter,

    Where_clause: whereClauseFormatter,

    From: keywordFormatter,

    From_list: fromListFormatter,

    Lss: noIndentFormatter,

    Lte: noIndentFormatter,

    Gte: noIndentFormatter,

    Eql: noIndentFormatter,

    Opr: parenFormatter,
  };

  function parse(d: string, dialectOpt: string, fragments?: readonly TreeFragment[] | any) {
    let parseInstance = parser;
    if (dialectOpt) parseInstance = parser.configure({ dialect: dialectOpt });
    let parse = parseInstance.startParse(stringInput(d), 0, { fragments }),
      result: Tree | null | any;
    while (!(result = parse.advance())) {}
    return result;
  }

  function multiStmtFormatter(query: string, count: number) {
    if (count > 1) query += '\n\n\n';
  }

  function mainFormatter(cursor: TreeCursor, input: Input | string): string {
    if (typeof input === 'string') input = stringInput(input);
    let formattedQuery = '';
    var stmtCount: number = 0;
    for (;;) {
      const isLeaf = !cursor.firstChild();

      if (cursor.type.name == 'SelectStmt') {
        stmtCount += 1;
        multiStmtFormatter(formattedQuery, stmtCount);
        formattedQuery += selectStmtFormatter(cursor, 0);
      }

      if (cursor.type.name == 'DropStmt') {
        stmtCount += 1;
        multiStmtFormatter(formattedQuery, stmtCount);
        formattedQuery += dropStmtFormatter(cursor, 0);
      }

      if (cursor.type.name == 'CreateStmt') {
        stmtCount += 1;
        multiStmtFormatter(formattedQuery, stmtCount);
        formattedQuery += tempFormatter(cursor);
      }

      if (cursor.type.name == 'CreateIntegrationStmt') {
        stmtCount += 1;
        if (stmtCount > 1) formattedQuery += '\n\n\n';
        formattedQuery += createIntegrationFormatter(cursor);
      }

      if (cursor.type.name == 'UseStmt') {
        stmtCount += 1;
        if (stmtCount > 1) formattedQuery += '\n\n\n';
        formattedQuery += minimumFormatter(cursor, 0);
      }

      if (cursor.type.name == 'Smc') {
        formattedQuery += '\n;';
      }

      if (!isLeaf) continue;

      for (;;) {
        if (cursor.nextSibling()) break;
        if (!cursor.parent()) {
          return formattedQuery;
        }
      }
    }
  }

  function iterateFormatter(cursor: TreeCursor, sep: string): string {
    let query = '';
    var tempCursor = cursor.node.cursor;
    var mainCursor = tempCursor.node.cursor;
    var leafCheck = cursor.node.cursor;
    if (!leafCheck.firstChild()) {
      if (['.', ':'].includes(sliceDoc(leafCheck))) {
        return sliceDoc(leafCheck);
      } else return sliceDoc(leafCheck) + ' ';
    } else {
      var stmtCount: number = 0;
      var isLeaf;

      for (;;) {
        if (tempCursor.type.name == 'ObjName' || tempCursor.type.name == 'FunctionCall') {
          if (tempCursor.type.name == 'ObjName') {
            query += targetFormatter(tempCursor, '') + ' ';
            isLeaf = true;
          }
          if (tempCursor.type.name == 'FunctionCall') {
            query += functionCallFormatter(tempCursor, 0);
            isLeaf = true;
          }
        } else if (tempCursor.firstChild() == false) {
          var checkChildCursor = tempCursor.node.cursor;

          query += sliceDoc(checkChildCursor) + sep;
          isLeaf = !tempCursor.firstChild();
        }

        if (!isLeaf) continue;

        for (;;) {
          if (tempCursor.nextSibling()) break;
          if (tempCursor.parent()) {
            if (sliceDoc(tempCursor) == sliceDoc(cursor)) {
              return query;
            }
          }
        }
      }
    }
  }

  function basicIndent(count: number): string {
    var basicIndent = '    ';
    return basicIndent.repeat(count);
  }

  function targetListFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    var children: any = [];
    children = tempCursor.node.getChildren('Identifier');
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name.toString() == 'Identifier') {
          output += basicIndent(indent + 1) + sliceDoc(tempCursor);
        }

        if (tempCursor.type.name.toString() == 'Comma') {
          output += ',\n';
        }
      } while (tempCursor.nextSibling());
      output += '\n';
    }
    tempCursor.parent();
    return output;
  }

  function noSpacedClauseFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = '';
    output = sliceDoc(cursor);
    return output;
  }

  function iterInside(cursor: TreeCursor, sep: string): any {
    let depth = 0;
    var outputArray = [];
    for (;;) {
      var tempCursor = cursor.node.cursor;
      if (!tempCursor.firstChild()) {
        outputArray.push(sliceDoc(tempCursor));
      }
      if (cursor.firstChild()) {
        depth++;
      } else {
        for (;;) {
          if (!depth) return outputArray.join(sep).replace(' . ', '.').replace('( ', '(').replace(' )', ')').replace(' ,', ',');
          if (cursor.nextSibling()) break;
          cursor.parent();
          depth--;
        }
      }
    }
  }

  function iterInsideObj(cursor: TreeCursor, sep: string): any {
    let depth = 0;
    var outputArray = [];
    for (;;) {
      var tempCursor = cursor.node.cursor;
      if (!tempCursor.firstChild()) {
        outputArray.push(sliceDoc(tempCursor));
      }
      if (cursor.firstChild()) {
        depth++;
      } else {
        for (;;) {
          if (!depth) return outputArray.join(sep);
          if (cursor.nextSibling()) break;
          cursor.parent();
          depth--;
        }
      }
    }
  }

  function noSpaceFormatter(cursor: TreeCursor): string {
    var output: string = '';
    output = sliceDoc(cursor) + ' ';
    return output;
  }

  function noIndentFormatter(cursor: TreeCursor): string {
    var output: string = '';
    output = ' ' + sliceDoc(cursor) + ' ';
    return output;
  }

  function plainFormatter(cursor: TreeCursor, indent?: number): string {
    return basicIndent(indent) + sliceDoc(cursor) + ' ';
  }

  function dropStmtFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = '';

    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Drop') {
          output += plainFormatter(tempCursor, indent);
        }
        if (tempCursor.type.name == 'DdlTarget') {
          output += plainFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'IfExists') {
          output += ifExistsFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Identifier') {
          output += identifierFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'DropOptions') {
          output += plainFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }

    return output;
  }

  function identifierFormatter(cursor: TreeCursor, indent: number): string {
    var output = '';
    var tempCursor = cursor.node.cursor;
    output = basicIndent(indent) + sliceDoc(tempCursor);

    return output;
  }

  function ifNotExistsFormatter(cursor: TreeCursor, indent: number): string {
    var output = '';
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'If') {
          output += plainFormatter(tempCursor, indent);
        }
        if (tempCursor.type.name == 'Not') {
          output += plainFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Exists') {
          output += plainFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function ifExistsFormatter(cursor: TreeCursor, indent: number) {
    var output = '';
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'If') {
          output += plainFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Not') {
          output += plainFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Exists') {
          output += plainFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function expressionFormatter(cursor: TreeCursor, indent: number) {
    var output = '';
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'ColIdentifier') {
          output += colIdentifierFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Select_with_parens') {
          output += selectWithParensFormatter(tempCursor, indent + 2);
        }

        if (['Lss', 'Gtr', 'Gte', 'Lte', 'Eql', 'In', 'Not'].includes(tempCursor.type.name)) {
          output += noIndentFormatter(tempCursor);
        }

        if (tempCursor.type.name == 'NumberLiteral') {
          output += numberLiteralFormatter(tempCursor);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function keywordFormatter(cursor: TreeCursor, indent: number): string {
    return basicIndent(indent) + sliceDoc(cursor) + '\n';
  }

  function keywordFormatterNewLine(cursor: TreeCursor, indent: number): string {
    return '\n' + basicIndent(indent) + sliceDoc(cursor);
  }
  function keywordFormatterNoNewline(cursor: TreeCursor, indent: number): string {
    return basicIndent(indent) + sliceDoc(cursor) + ' ';
  }

  function fromListFormatter(cursor: TreeCursor, indent: number) {
    var output = '';
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Identifier') {
          output += basicIndent(indent + 1) + sliceDoc(tempCursor);
        }

        if (tempCursor.type.name == 'Comma') {
          output += ',\n';
        }

        if (tempCursor.type.name == 'Select_with_parens') {
          output += selectWithParensFormatter(tempCursor, indent + 2);
        }

        if (tempCursor.type.name == 'As') {
          output += noIndentFormatter(tempCursor) + ' ';
        }
        if (tempCursor.type.name == 'ColIdentifier') {
          output += colIdentifierFormatter(tempCursor, 0);
        }
      } while (tempCursor.nextSibling());
    }

    return output;
  }

  function optOrReplaceFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (['Or', 'Replace'].includes(tempCursor.type.name)) {
          output += plainFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function numberLiteralFormatter(cursor: TreeCursor, indent?: number) {
    var output = '';
    output = sliceDoc(cursor);

    return output;
  }

  function selectWithParensFormatter(cursor: TreeCursor, indent: number) {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Opl') {
          output += parenFormatter(tempCursor, indent - 3) + '\n';
        }

        if (tempCursor.type.name == 'Opr') {
          output += '\n' + parenFormatter(tempCursor, indent - 2);
        }

        if (tempCursor.type.name == 'Select_no_parens') {
          output += selectStmtFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function parenFormatter(cursor: TreeCursor, indent: number) {
    var output = '';
    var tempCursor = cursor.node.cursor;
    output = basicIndent(indent) + sliceDoc(tempCursor);
    return output;
  }

  function selectStmtFormatter(cursor: TreeCursor, indent: number) {
    var tempCursor = cursor.node.cursor;
    var selectOuput = '';

    if (tempCursor.firstChild()) {
      if (tempCursor.type.name == 'SelectDefinition') {
        selectOuput += selectDefinitionFormatter(tempCursor, indent);
      }
    }

    return selectOuput;
  }

  function colIdentifierFormatter(cursor: TreeCursor, indent: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      if (tempCursor.type.name == 'Identifier') {
        output += basicIndent(indent) + sliceDoc(tempCursor);
      }
    }

    return output;
  }

  function selectDefinitionFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      if (tempCursor.type.name == 'SelectBase') {
        output += selectBaseFormatter(tempCursor, indent);
      }
    }
    return output;
  }

  function selectBaseFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'SelectTargetList') {
          output += selectTargetListFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Select') {
          output += keywordFormatterNoNewline(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Distinct') {
          output += keywordFormatterNoNewline(tempCursor, indent);
        }

        if (tempCursor.type.name == 'FromClause') {
          output += fromClauseFormatter(tempCursor, indent + 1);
        }

        if (tempCursor.type.name == 'WhereClause') {
          output += whereClauseFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function fromClauseFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'From') {
          output += basicIndent(indent) + keywordFormatterNewLine(tempCursor, 0);
        }
        if (tempCursor.type.name == 'FromExpression') {
          output += basicIndent(indent) + fromExpressionFormatter(tempCursor, 0);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function whereClauseFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Where') {
          output += basicIndent(indent) + keywordFormatterNewLine(tempCursor, 0);
        }
        if (tempCursor.type.name == 'ScalarExpression') {
          output += '\n' + basicIndent(indent + 1) + scalarExpressionFormatter(tempCursor, 0);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function fromExpressionFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'BaseFromExpression') {
          var tableNameCursor: TreeCursor = tempCursor.node.cursor;

          tableNameCursor.firstChild();

          if (tableNameCursor.type.name == 'TableObjectName') {
            var objCheckCursor: TreeCursor = tableNameCursor.node.cursor;
            objCheckCursor.firstChild();

            if (objCheckCursor.type.name.toString() == 'DbtIdentifier') {
              output += '\n' + basicIndent(indent + 1) + dbtIdentifierFormatter(objCheckCursor, 0);
            } else {
              output += '\n' + basicIndent(indent + 1) + targetFormatter(tempCursor, '');
            }
          }
        }
        if (tempCursor.type.name == 'AliasClause') {
          var aliasClauseCursor: TreeCursor = tempCursor.node.cursor;
          aliasClauseCursor.firstChild();

          if (aliasClauseCursor.type.name == 'As') {
            output += ' ' + trailingSpacedSymbolFormatter(aliasClauseCursor);
          }
          aliasClauseCursor.nextSibling();

          if (aliasClauseCursor.type.name == 'IdentifierExt') {
            output += targetFormatter(aliasClauseCursor, '');
          }
        }
        if (tempCursor.type.name == 'JoinExpression') {
          output += joinExpressionFormatter(tempCursor, 0);
        }
      } while (tempCursor.nextSibling());
    }

    return output;
  }

  function baseFromExpressionFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'TableObjectName') {
          var objCheckCursor: TreeCursor = tempCursor.node.cursor;
          objCheckCursor.firstChild();

          if (objCheckCursor.type.name.toString() == 'DbtIdentifier') {
            output += '\n' + basicIndent(indent + 1) + dbtIdentifierFormatter(objCheckCursor, 0);
          } else {
            output += '\n' + basicIndent(indent + 1) + targetFormatter(tempCursor, '');
          }
        }

        if (tempCursor.type.name == 'ParenSelect') {
          output += '\n' + basicIndent(indent + 1) + parenSelectFormatter(tempCursor, 1);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function aliasClauseFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'As') {
          output += ' ' + trailingSpacedSymbolFormatter(tempCursor);
        }

        if (tempCursor.type.name == 'IdentifierExt') {
          output += targetFormatter(tempCursor, '');
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function parenSelectFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Lparen') {
          output += noSpacedSymbolFormatter(tempCursor, indent) + '\n';
        }

        if (tempCursor.type.name == 'Rparen') {
          output += noSpacedSymbolFormatter(tempCursor);
        }
        if (tempCursor.type.name == 'SelectDefinition') {
          output += selectDefinitionFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function joinExpressionFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'CrossAndNaturalJoinKW' || tempCursor.type.name == 'JoinKW') {
          output += '\n' + targetFormatter(tempCursor, ' ');
        }
        if (tempCursor.type.name == 'DBTDlcly' || tempCursor.type.name == 'DBTDrcly') {
          output += noSpacedSymbolFormatter(tempCursor);
        }
        if (tempCursor.type.name == 'BaseFromExpression') {
          output += baseFromExpressionFormatter(tempCursor);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }
  function dbtIdentifierFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'FunctionCall') {
          output += functionCallFormatter(tempCursor, 0);
        }
        if (tempCursor.type.name == 'DBTDlcly' || tempCursor.type.name == 'DBTDrcly') {
          output += noSpacedSymbolFormatter(tempCursor);
        }
        if (tempCursor.type.name == 'Comma') {
          output += '\n' + basicIndent(indent + 1) + ',';
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function functionCallFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'ObjName') {
          output += targetFormatter(tempCursor, '');
        }
        if (tempCursor.type.name == 'Lparen' || tempCursor.type.name == 'Rparen') {
          output += noSpacedSymbolFormatter(tempCursor);
        }

        if (tempCursor.type.name == 'FunctionArgs') {
          output += functionArgsFormatter(tempCursor);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function functionArgsFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'FunctionArgExpression') {
          output += targetFormatter(tempCursor, '');
        }

        if (tempCursor.type.name == 'Comma') {
          output += trailingSpacedSymbolFormatter(tempCursor);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function selectTargetListFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'SelectTarget') {
          output += basicIndent(indent) + selectTargetFormatter(tempCursor, 0);
        }
        if (tempCursor.type.name == 'Comma') {
          output += '\n' + basicIndent(indent + 1) + ',';
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function selectTargetFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Comma') {
          output += '\n' + basicIndent(indent + 1) + ',';
        }

        if (tempCursor.type.name == 'ScalarExpression') {
          output += scalarExpressionFormatter(tempCursor);
        }
        if (tempCursor.type.name == 'As') {
          output += trailingSpacedSymbolFormatter(tempCursor);
        }

        if (tempCursor.type.name == 'IdentifierExt') {
          output += targetFormatter(tempCursor, '');
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function scalarExpressionFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      if (tempCursor.type.name == 'ObjName') {
        output += targetFormatter(tempCursor, '') + ' ';
      } else if (tempCursor.type.name == 'FunctionCall') {
        output += functionCallFormatter(tempCursor) + ' ';
      } else {
        output += iterateFormatter(tempCursor, ' ');
      }
    }

    output = output
      .replace(/\. /g, '.')
      .replace(/\( /g, '(')
      .replace(/ \)/g, ')')
      .replace(/ ,/g, ',')
      .replace(/ : /g, ':')
      .replace(/ :/g, ':')
      .replace(/ ::/g, ':')
      .replace(/:: /g, '::')
      .replace(/ :: /g, '::');
    return output;
  }

  var expressionArray = [
    'UnaryPlusExpression',
    'UnaryMinusExpression',
    'MulExpression',
    'DivideExpression',
    'PlusExpression',
    'MinusExpression',
    'MulExpression',
    'DivideExpression',
    'ModExpression',
    'BitwiseXORExpression',
    'BitwiseORExpression',
    'BitwiseAndExpression',
    'OrExpression',
    'AndExpression',
    'GtrExpression',
    'LssExpression',
    'LteExpression',
    'GteExpression',
    'EqlExpression',
    'NeqExpression',
    'IsNotExpression',
    'ConcatExpression',
    'LikeAnyExpression',
    'NotLikeExpression',
    'NotInExpression',
    'NotExpression',
  ];

  function targetFormatter(cursor: TreeCursor, sep: string, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;
    output = iterInside(tempCursor, sep);
    return output;
  }

  function createIntegrationFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    var tempCursor: TreeCursor = cursor.node.cursor;

    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Create') {
          output += keywordFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'OptOrReplace') {
          output += optOrReplaceFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'IfNotExists') {
          output += ifExistsFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'IntegrationTypes') {
          output += IntegrationTypesFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'Integration') {
          output += plainFormatter(tempCursor, indent);
        }

        if (tempCursor.type.name == 'ObjName') {
          output += targetFormatter(tempCursor, '');
        }

        if (tempCursor.type.name == 'KeyValueProperty') {
          output += KeyValuePropertyFormatter(tempCursor, indent);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function ObjNameFormatter(cursor: TreeCursor, indent?: number): string {
    var output = '';
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'Identifier') {
          output += noSpaceFormatter(tempCursor);
        }

        if (tempCursor.type.name == 'Dot') {
          output += noSpaceFormatter(tempCursor);
        }

        if (tempCursor.type.name == 'QuotedString') {
          output += noSpaceFormatter(tempCursor);
        }
      } while (tempCursor.nextSibling());
    }
    return output + ' ';
  }

  function IntegrationTypesFormatter(cursor: TreeCursor, indent?: number): string {
    var output = '';
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (['Api', 'Storage', 'Security', 'Notification'].includes(tempCursor.type.name)) {
          output += plainFormatter(tempCursor);
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function KeyValuePropertyFormatter(cursor: TreeCursor, indent?: number): string {
    var output = '';
    var tempCursor = cursor.node.cursor;
    if (tempCursor.firstChild()) {
      do {
        if (tempCursor.type.name == 'KeyValue') {
          output += targetFormatter(tempCursor, ' ');
        }

        if (tempCursor.type.name == 'Eql') {
          output += spacedSymbolFormatter(tempCursor);
        }

        if (tempCursor.type.name == 'KeyName') {
          output += '\n' + targetFormatter(tempCursor, ' ');
        }
      } while (tempCursor.nextSibling());
    }
    return output;
  }

  function keyNameFormatter(cursor: TreeCursor): string {
    var output = '';
    var tempCursorKeyName = cursor.node.cursor;
    var leaves: string[] = [];
    leaves = leafCollector(tempCursorKeyName, 'KeyName');

    for (var i = 0; i < leaves.length; i++) {
      output = '\n' + leaves[i];
    }
    return output;
  }

  function keyValueFormatter(cursor: TreeCursor): string {
    var output = '';
    var tempCursorKeyValue = cursor.node.cursor;
    var leaves: string[] = [];
    leaves = leafCollector(tempCursorKeyValue, 'KeyValue');

    for (var i = 0; i < leaves.length; i++) {
      output += leaves[i];
    }

    return output;
  }

  function spacedSymbolFormatter(cursor: TreeCursor): string {
    var output: string = '';
    output = ' ' + sliceDoc(cursor) + ' ';
    return output;
  }

  function trailingSpacedSymbolFormatter(cursor: TreeCursor): string {
    var output: string = '';
    output = sliceDoc(cursor) + ' ';
    return output;
  }

  function noSpacedSymbolFormatter(cursor: TreeCursor, indent?: number): string {
    var output: string = '';
    output = basicIndent(indent) + sliceDoc(cursor);
    return output;
  }

  function minimumFormatter(cursor: TreeCursor, indent): string {
    var tempCursor = cursor.node.cursor;
    var checkEndCursor = cursor.node.nextSibling;

    var output: string = '';
    if (tempCursor.firstChild()) {
      var secondaryTempCursor = tempCursor.node.cursor;
      do {
        if (!secondaryTempCursor.firstChild()) {
          output += plainFormatter(secondaryTempCursor, indent);
        }
      } while (secondaryTempCursor.type.name != checkEndCursor.type.name);
    }

    return output;
  }

  function tempFormatter(cursor: TreeCursor): string {
    var tempCursor = cursor.node.cursor;
    let formattedQuery: string = '';

    while (tempCursor.next()) {
      if (tempCursor.type.name == 'Smc') {
        break;
      }

      const node = tempCursor.node.firstChild;
      if (node == null) {
        formattedQuery += sliceDoc(tempCursor);
        if (['EmailAddr', 'Identifier', 'Urli', 'IpA', 'LabelName', 'StringLiteral'].includes(tempCursor.type.name)) {
          formattedQuery += '\n';
          formattedQuery += '    ';
        } else {
          formattedQuery += ' ';
        }
      }
    }

    return formattedQuery;
  }

  function focusedNode(cursor: TreeCursor): {
    readonly type: NodeType;
    readonly from: number;
    readonly to: number;
  } {
    const { type, from, to } = cursor;
    return { type, from, to };
  }

  function leafCollector(
    leafCursor: TreeCursor,
    targetCursor: String,
    options: {
      from?: number;
      to?: number;
      start?: number;
      includeParents?: boolean;
    } = {}
  ): string[] {
    const { from = 0, to = leafCursor.to, start = 0, includeParents = false } = options;
    let output = '';
    const leafArray: string[] = [];
    const targetCursror = leafCursor;
    const prefixes: string[] = [];
    for (;;) {
      const node = focusedNode(leafCursor);
      let leave = false;
      if (node.from <= to && node.to >= from) {
        const enter = !node.type.isAnonymous && (includeParents || (node.from >= from && node.to <= to));
        if (enter) {
          leave = true;
          const isTop = output === '';
          if (!isTop || node.from > 0) {
            output += (!isTop ? '\n' : '') + prefixes.join('');
            const hasNextSibling = leafCursor.nextSibling() && leafCursor.prevSibling();
            if (hasNextSibling) {
              output += ' ├─ ';
              prefixes.push(' │  ');
            } else {
              output += ' └─ ';
              prefixes.push('    ');
            }
          }
          output += node.type.isError ? colorize(node.type.name, Color.Red) : node.type.name;
        }
        const isLeaf = !leafCursor.firstChild();
        if (enter) {
          const hasRange = node.from !== node.to;
          if (hasRange && isLeaf) {
            output += leafArray.push(sliceDoc(leafCursor));
          }
        }
        if (!isLeaf) continue;
      }
      for (;;) {
        if (leave) prefixes.pop();
        leave = leafCursor.type.isAnonymous;
        if (leafCursor.nextSibling()) break;

        if (leafCursor.type.name == targetCursor) {
          return leafArray;
        }
        leave = true;
      }
    }
  }

  enum Color {
    Red = 31,
    Green = 32,
    Yellow = 33,
  }

  function colorize(value: any, color: number): string {
    return '\u001b[' + color + 'm' + String(value) + '\u001b[39m';
  }

  function sliceDoc(cursor: TreeCursor): string {
    return doc1.slice(cursor.from, cursor.to);
  }

  var val = parse(input, 'dbt');
  return mainFormatter(val.cursor(), input);
}


console.log(format("select * from val;")) //your query here
