"use strict";
exports.__esModule = true;
exports.format = void 0;
var lezer_tree_1 = require("lezer-tree");
var lezer_snowsql_1 = require("lezer-snowsql");
function format(input) {
    var doc1 = input;
    var functionMap = {
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
        Opr: parenFormatter
    };
    function parse(d, dialectOpt, fragments) {
        var parseInstance = lezer_snowsql_1.parser;
        if (dialectOpt)
            parseInstance = lezer_snowsql_1.parser.configure({ dialect: dialectOpt });
        var parse = parseInstance.startParse(lezer_tree_1.stringInput(d), 0, { fragments: fragments }), result;
        while (!(result = parse.advance())) { }
        return result;
    }
    function multiStmtFormatter(query, count) {
        if (count > 1)
            query += "\n\n\n";
    }
    function mainFormatter(cursor, input) {
        if (typeof input === "string")
            input = lezer_tree_1.stringInput(input);
        var formattedQuery = "";
        var stmtCount = 0;
        for (;;) {
            var isLeaf = !cursor.firstChild();
            if (cursor.type.name == "SelectStmt") {
                stmtCount += 1;
                multiStmtFormatter(formattedQuery, stmtCount);
                formattedQuery += selectStmtFormatter(cursor, 0);
            }
            if (cursor.type.name == "DropStmt") {
                stmtCount += 1;
                multiStmtFormatter(formattedQuery, stmtCount);
                formattedQuery += dropStmtFormatter(cursor, 0);
            }
            if (cursor.type.name == "CreateStmt") {
                stmtCount += 1;
                multiStmtFormatter(formattedQuery, stmtCount);
                formattedQuery += tempFormatter(cursor);
            }
            if (cursor.type.name == "CreateIntegrationStmt") {
                stmtCount += 1;
                if (stmtCount > 1)
                    formattedQuery += "\n\n\n";
                formattedQuery += createIntegrationFormatter(cursor);
            }
            if (cursor.type.name == "UseStmt") {
                stmtCount += 1;
                if (stmtCount > 1)
                    formattedQuery += "\n\n\n";
                formattedQuery += minimumFormatter(cursor, 0);
            }
            if (cursor.type.name == "Smc") {
                formattedQuery += "\n;";
            }
            if (!isLeaf)
                continue;
            for (;;) {
                if (cursor.nextSibling())
                    break;
                if (!cursor.parent()) {
                    return formattedQuery;
                }
            }
        }
    }
    function iterateFormatter(cursor, sep) {
        var query = "";
        var tempCursor = cursor.node.cursor;
        var mainCursor = tempCursor.node.cursor;
        var leafCheck = cursor.node.cursor;
        if (!leafCheck.firstChild()) {
            if ([".", ":"].includes(sliceDoc(leafCheck))) {
                return sliceDoc(leafCheck);
            }
            else
                return sliceDoc(leafCheck) + " ";
        }
        else {
            var stmtCount = 0;
            var isLeaf;
            for (;;) {
                if (tempCursor.type.name == "ObjName" ||
                    tempCursor.type.name == "FunctionCall") {
                    if (tempCursor.type.name == "ObjName") {
                        query += targetFormatter(tempCursor, "") + " ";
                        isLeaf = true;
                    }
                    if (tempCursor.type.name == "FunctionCall") {
                        query += functionCallFormatter(tempCursor, 0);
                        isLeaf = true;
                    }
                }
                else if (tempCursor.firstChild() == false) {
                    var checkChildCursor = tempCursor.node.cursor;
                    query += sliceDoc(checkChildCursor) + sep;
                    isLeaf = !tempCursor.firstChild();
                }
                if (!isLeaf)
                    continue;
                for (;;) {
                    if (tempCursor.nextSibling())
                        break;
                    if (tempCursor.parent()) {
                        if (sliceDoc(tempCursor) == sliceDoc(cursor)) {
                            return query;
                        }
                    }
                }
            }
        }
    }
    function basicIndent(count) {
        var basicIndent = "    ";
        return basicIndent.repeat(count);
    }
    function targetListFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        var children = [];
        children = tempCursor.node.getChildren("Identifier");
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name.toString() == "Identifier") {
                    output += basicIndent(indent + 1) + sliceDoc(tempCursor);
                }
                if (tempCursor.type.name.toString() == "Comma") {
                    output += ",\n";
                }
            } while (tempCursor.nextSibling());
            output += "\n";
        }
        tempCursor.parent();
        return output;
    }
    function noSpacedClauseFormatter(cursor, indent) {
        var output = "";
        output = sliceDoc(cursor);
        return output;
    }
    function iterInside(cursor, sep) {
        var depth = 0;
        var outputArray = [];
        for (;;) {
            var tempCursor = cursor.node.cursor;
            if (!tempCursor.firstChild()) {
                outputArray.push(sliceDoc(tempCursor));
            }
            if (cursor.firstChild()) {
                depth++;
            }
            else {
                for (;;) {
                    if (!depth)
                        return outputArray
                            .join(sep)
                            .replace(" . ", ".")
                            .replace("( ", "(")
                            .replace(" )", ")")
                            .replace(" ,", ",");
                    if (cursor.nextSibling())
                        break;
                    cursor.parent();
                    depth--;
                }
            }
        }
    }
    function iterInsideObj(cursor, sep) {
        var depth = 0;
        var outputArray = [];
        for (;;) {
            var tempCursor = cursor.node.cursor;
            if (!tempCursor.firstChild()) {
                outputArray.push(sliceDoc(tempCursor));
            }
            if (cursor.firstChild()) {
                depth++;
            }
            else {
                for (;;) {
                    if (!depth)
                        return outputArray.join(sep);
                    if (cursor.nextSibling())
                        break;
                    cursor.parent();
                    depth--;
                }
            }
        }
    }
    function noSpaceFormatter(cursor) {
        var output = "";
        output = sliceDoc(cursor) + " ";
        return output;
    }
    function noIndentFormatter(cursor) {
        var output = "";
        output = " " + sliceDoc(cursor) + " ";
        return output;
    }
    function plainFormatter(cursor, indent) {
        return basicIndent(indent) + sliceDoc(cursor) + " ";
    }
    function dropStmtFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Drop") {
                    output += plainFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "DdlTarget") {
                    output += plainFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "IfExists") {
                    output += ifExistsFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Identifier") {
                    output += identifierFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "DropOptions") {
                    output += plainFormatter(tempCursor, indent);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function identifierFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        output = basicIndent(indent) + sliceDoc(tempCursor);
        return output;
    }
    function ifNotExistsFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "If") {
                    output += plainFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Not") {
                    output += plainFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Exists") {
                    output += plainFormatter(tempCursor, indent);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function ifExistsFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "If") {
                    output += plainFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Not") {
                    output += plainFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Exists") {
                    output += plainFormatter(tempCursor, indent);
                }
            } while (tempCursor.nextSibling());
        }
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
                if (tempCursor.type.name == "Select_with_parens") {
                    output += selectWithParensFormatter(tempCursor, indent + 2);
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
    function keywordFormatterNewLine(cursor, indent) {
        return "\n" + basicIndent(indent) + sliceDoc(cursor);
    }
    function keywordFormatterNoNewline(cursor, indent) {
        return basicIndent(indent) + sliceDoc(cursor) + " ";
    }
    function fromListFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Identifier") {
                    output += basicIndent(indent + 1) + sliceDoc(tempCursor);
                }
                if (tempCursor.type.name == "Comma") {
                    output += ",\n";
                }
                if (tempCursor.type.name == "Select_with_parens") {
                    output += selectWithParensFormatter(tempCursor, indent + 2);
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
    function optOrReplaceFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (["Or", "Replace"].includes(tempCursor.type.name)) {
                    output += plainFormatter(tempCursor, indent);
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
                    output += parenFormatter(tempCursor, indent - 3) + "\n";
                }
                if (tempCursor.type.name == "Opr") {
                    output += "\n" + parenFormatter(tempCursor, indent - 2);
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
        var tempCursor = cursor.node.cursor;
        var selectOuput = "";
        if (tempCursor.firstChild()) {
            if (tempCursor.type.name == "SelectDefinition") {
                selectOuput += selectDefinitionFormatter(tempCursor, indent);
            }
        }
        return selectOuput;
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
    function selectDefinitionFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            if (tempCursor.type.name == "SelectBase") {
                output += selectBaseFormatter(tempCursor, indent);
            }
        }
        return output;
    }
    function selectBaseFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "SelectTargetList") {
                    output += selectTargetListFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Select") {
                    output += keywordFormatterNoNewline(tempCursor, indent);
                }
                if (tempCursor.type.name == "Distinct") {
                    output += keywordFormatterNoNewline(tempCursor, indent);
                }
                if (tempCursor.type.name == "FromClause") {
                    output += fromClauseFormatter(tempCursor, indent + 1);
                }
                if (tempCursor.type.name == "WhereClause") {
                    output += whereClauseFormatter(tempCursor, indent);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function fromClauseFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "From") {
                    output +=
                        basicIndent(indent) + keywordFormatterNewLine(tempCursor, 0);
                }
                if (tempCursor.type.name == "FromExpression") {
                    output +=
                        basicIndent(indent) + fromExpressionFormatter(tempCursor, 0);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function whereClauseFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Where") {
                    output +=
                        basicIndent(indent) + keywordFormatterNewLine(tempCursor, 0);
                }
                if (tempCursor.type.name == "ScalarExpression") {
                    output +=
                        "\n" +
                            basicIndent(indent + 1) +
                            scalarExpressionFormatter(tempCursor, 0);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function fromExpressionFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "BaseFromExpression") {
                    var tableNameCursor = tempCursor.node.cursor;
                    tableNameCursor.firstChild();
                    if (tableNameCursor.type.name == "TableObjectName") {
                        var objCheckCursor = tableNameCursor.node.cursor;
                        objCheckCursor.firstChild();
                        if (objCheckCursor.type.name.toString() == "DbtIdentifier") {
                            output +=
                                "\n" +
                                    basicIndent(indent + 1) +
                                    dbtIdentifierFormatter(objCheckCursor, 0);
                        }
                        else {
                            output +=
                                "\n" +
                                    basicIndent(indent + 1) +
                                    targetFormatter(tempCursor, "");
                        }
                    }
                }
                if (tempCursor.type.name == "AliasClause") {
                    var aliasClauseCursor = tempCursor.node.cursor;
                    aliasClauseCursor.firstChild();
                    if (aliasClauseCursor.type.name == "As") {
                        output += " " + trailingSpacedSymbolFormatter(aliasClauseCursor);
                    }
                    aliasClauseCursor.nextSibling();
                    if (aliasClauseCursor.type.name == "IdentifierExt") {
                        output += targetFormatter(aliasClauseCursor, "");
                    }
                }
                if (tempCursor.type.name == "JoinExpression") {
                    output += joinExpressionFormatter(tempCursor, 0);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function baseFromExpressionFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "TableObjectName") {
                    var objCheckCursor = tempCursor.node.cursor;
                    objCheckCursor.firstChild();
                    if (objCheckCursor.type.name.toString() == "DbtIdentifier") {
                        output +=
                            "\n" +
                                basicIndent(indent + 1) +
                                dbtIdentifierFormatter(objCheckCursor, 0);
                    }
                    else {
                        output +=
                            "\n" + basicIndent(indent + 1) + targetFormatter(tempCursor, "");
                    }
                }
                if (tempCursor.type.name == "ParenSelect") {
                    output +=
                        "\n" +
                            basicIndent(indent + 1) +
                            parenSelectFormatter(tempCursor, 1);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function aliasClauseFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "As") {
                    output += " " + trailingSpacedSymbolFormatter(tempCursor);
                }
                if (tempCursor.type.name == "IdentifierExt") {
                    output += targetFormatter(tempCursor, "");
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function parenSelectFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Lparen") {
                    output += noSpacedSymbolFormatter(tempCursor, indent) + "\n";
                }
                if (tempCursor.type.name == "Rparen") {
                    output += noSpacedSymbolFormatter(tempCursor);
                }
                if (tempCursor.type.name == "SelectDefinition") {
                    output += selectDefinitionFormatter(tempCursor, indent);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function joinExpressionFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "CrossAndNaturalJoinKW" ||
                    tempCursor.type.name == "JoinKW") {
                    output += "\n" + targetFormatter(tempCursor, " ");
                }
                if (tempCursor.type.name == "DBTDlcly" ||
                    tempCursor.type.name == "DBTDrcly") {
                    output += noSpacedSymbolFormatter(tempCursor);
                }
                if (tempCursor.type.name == "BaseFromExpression") {
                    output += baseFromExpressionFormatter(tempCursor);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function dbtIdentifierFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "FunctionCall") {
                    output += functionCallFormatter(tempCursor, 0);
                }
                if (tempCursor.type.name == "DBTDlcly" ||
                    tempCursor.type.name == "DBTDrcly") {
                    output += noSpacedSymbolFormatter(tempCursor);
                }
                if (tempCursor.type.name == "Comma") {
                    output += "\n" + basicIndent(indent + 1) + ",";
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function functionCallFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "ObjName") {
                    output += targetFormatter(tempCursor, "");
                }
                if (tempCursor.type.name == "Lparen" ||
                    tempCursor.type.name == "Rparen") {
                    output += noSpacedSymbolFormatter(tempCursor);
                }
                if (tempCursor.type.name == "FunctionArgs") {
                    output += functionArgsFormatter(tempCursor);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function functionArgsFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "FunctionArgExpression") {
                    output += targetFormatter(tempCursor, "");
                }
                if (tempCursor.type.name == "Comma") {
                    output += trailingSpacedSymbolFormatter(tempCursor);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function selectTargetListFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "SelectTarget") {
                    output += basicIndent(indent) + selectTargetFormatter(tempCursor, 0);
                }
                if (tempCursor.type.name == "Comma") {
                    output += "\n" + basicIndent(indent + 1) + ",";
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function selectTargetFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Comma") {
                    output += "\n" + basicIndent(indent + 1) + ",";
                }
                if (tempCursor.type.name == "ScalarExpression") {
                    output += scalarExpressionFormatter(tempCursor);
                }
                if (tempCursor.type.name == "As") {
                    output += trailingSpacedSymbolFormatter(tempCursor);
                }
                if (tempCursor.type.name == "IdentifierExt") {
                    output += targetFormatter(tempCursor, "");
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function scalarExpressionFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            if (tempCursor.type.name == "ObjName") {
                output += targetFormatter(tempCursor, "") + " ";
            }
            else if (tempCursor.type.name == "FunctionCall") {
                output += functionCallFormatter(tempCursor) + " ";
            }
            else {
                output += iterateFormatter(tempCursor, " ");
            }
        }
        output = output
            .replace(/\. /g, ".")
            .replace(/\( /g, "(")
            .replace(/ \)/g, ")")
            .replace(/ ,/g, ",")
            .replace(/ : /g, ":")
            .replace(/ :/g, ":")
            .replace(/ ::/g, ":")
            .replace(/:: /g, "::")
            .replace(/ :: /g, "::");
        return output;
    }
    var expressionArray = [
        "UnaryPlusExpression",
        "UnaryMinusExpression",
        "MulExpression",
        "DivideExpression",
        "PlusExpression",
        "MinusExpression",
        "MulExpression",
        "DivideExpression",
        "ModExpression",
        "BitwiseXORExpression",
        "BitwiseORExpression",
        "BitwiseAndExpression",
        "OrExpression",
        "AndExpression",
        "GtrExpression",
        "LssExpression",
        "LteExpression",
        "GteExpression",
        "EqlExpression",
        "NeqExpression",
        "IsNotExpression",
        "ConcatExpression",
        "LikeAnyExpression",
        "NotLikeExpression",
        "NotInExpression",
        "NotExpression",
    ];
    function targetFormatter(cursor, sep, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        output = iterInside(tempCursor, sep);
        return output;
    }
    function createIntegrationFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Create") {
                    output += keywordFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "OptOrReplace") {
                    output += optOrReplaceFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "IfNotExists") {
                    output += ifExistsFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "IntegrationTypes") {
                    output += IntegrationTypesFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "Integration") {
                    output += plainFormatter(tempCursor, indent);
                }
                if (tempCursor.type.name == "ObjName") {
                    output += targetFormatter(tempCursor, "");
                }
                if (tempCursor.type.name == "KeyValueProperty") {
                    output += KeyValuePropertyFormatter(tempCursor, indent);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function ObjNameFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "Identifier") {
                    output += noSpaceFormatter(tempCursor);
                }
                if (tempCursor.type.name == "Dot") {
                    output += noSpaceFormatter(tempCursor);
                }
                if (tempCursor.type.name == "QuotedString") {
                    output += noSpaceFormatter(tempCursor);
                }
            } while (tempCursor.nextSibling());
        }
        return output + " ";
    }
    function IntegrationTypesFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (["Api", "Storage", "Security", "Notification"].includes(tempCursor.type.name)) {
                    output += plainFormatter(tempCursor);
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function KeyValuePropertyFormatter(cursor, indent) {
        var output = "";
        var tempCursor = cursor.node.cursor;
        if (tempCursor.firstChild()) {
            do {
                if (tempCursor.type.name == "KeyValue") {
                    output += targetFormatter(tempCursor, " ");
                }
                if (tempCursor.type.name == "Eql") {
                    output += spacedSymbolFormatter(tempCursor);
                }
                if (tempCursor.type.name == "KeyName") {
                    output += "\n" + targetFormatter(tempCursor, " ");
                }
            } while (tempCursor.nextSibling());
        }
        return output;
    }
    function keyNameFormatter(cursor) {
        var output = "";
        var tempCursorKeyName = cursor.node.cursor;
        var leaves = [];
        leaves = leafCollector(tempCursorKeyName, "KeyName");
        for (var i = 0; i < leaves.length; i++) {
            output = "\n" + leaves[i];
        }
        return output;
    }
    function keyValueFormatter(cursor) {
        var output = "";
        var tempCursorKeyValue = cursor.node.cursor;
        var leaves = [];
        leaves = leafCollector(tempCursorKeyValue, "KeyValue");
        for (var i = 0; i < leaves.length; i++) {
            output += leaves[i];
        }
        return output;
    }
    function spacedSymbolFormatter(cursor) {
        var output = "";
        output = " " + sliceDoc(cursor) + " ";
        return output;
    }
    function trailingSpacedSymbolFormatter(cursor) {
        var output = "";
        output = sliceDoc(cursor) + " ";
        return output;
    }
    function noSpacedSymbolFormatter(cursor, indent) {
        var output = "";
        output = basicIndent(indent) + sliceDoc(cursor);
        return output;
    }
    function minimumFormatter(cursor, indent) {
        var tempCursor = cursor.node.cursor;
        var checkEndCursor = cursor.node.nextSibling;
        var output = "";
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
    function tempFormatter(cursor) {
        var tempCursor = cursor.node.cursor;
        var formattedQuery = "";
        while (tempCursor.next()) {
            if (tempCursor.type.name == "Smc") {
                break;
            }
            var node = tempCursor.node.firstChild;
            if (node == null) {
                formattedQuery += sliceDoc(tempCursor);
                if ([
                    "EmailAddr",
                    "Identifier",
                    "Urli",
                    "IpA",
                    "LabelName",
                    "StringLiteral",
                ].includes(tempCursor.type.name)) {
                    formattedQuery += "\n";
                    formattedQuery += "    ";
                }
                else {
                    formattedQuery += " ";
                }
            }
        }
        return formattedQuery;
    }
    function focusedNode(cursor) {
        var type = cursor.type, from = cursor.from, to = cursor.to;
        return { type: type, from: from, to: to };
    }
    function leafCollector(leafCursor, targetCursor, options) {
        if (options === void 0) { options = {}; }
        var _a = options.from, from = _a === void 0 ? 0 : _a, _b = options.to, to = _b === void 0 ? leafCursor.to : _b, _c = options.start, start = _c === void 0 ? 0 : _c, _d = options.includeParents, includeParents = _d === void 0 ? false : _d;
        var output = "";
        var leafArray = [];
        var targetCursror = leafCursor;
        var prefixes = [];
        for (;;) {
            var node = focusedNode(leafCursor);
            var leave = false;
            if (node.from <= to && node.to >= from) {
                var enter = !node.type.isAnonymous &&
                    (includeParents || (node.from >= from && node.to <= to));
                if (enter) {
                    leave = true;
                    var isTop = output === "";
                    if (!isTop || node.from > 0) {
                        output += (!isTop ? "\n" : "") + prefixes.join("");
                        var hasNextSibling = leafCursor.nextSibling() && leafCursor.prevSibling();
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
                var isLeaf = !leafCursor.firstChild();
                if (enter) {
                    var hasRange = node.from !== node.to;
                    if (hasRange && isLeaf) {
                        output += leafArray.push(sliceDoc(leafCursor));
                    }
                }
                if (!isLeaf)
                    continue;
            }
            for (;;) {
                if (leave)
                    prefixes.pop();
                leave = leafCursor.type.isAnonymous;
                if (leafCursor.nextSibling())
                    break;
                if (leafCursor.type.name == targetCursor) {
                    return leafArray;
                }
                leave = true;
            }
        }
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
    function sliceDoc(cursor) {
        return doc1.slice(cursor.from, cursor.to);
    }
    var val = parse(input, "dbt");
    return mainFormatter(val.cursor(), input);
}
exports.format = format;
console.log(format("select foo from bar;")); //your query here
