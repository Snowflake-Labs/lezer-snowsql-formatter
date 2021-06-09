import { Parser } from 'lezer';

// This file was generated by lezer-generator. You probably shouldn't edit it.
const 
  Account = 1,
  Admin = 2,
  Admin_name = 3,
  Admin_password = 4,
  Allowed_IP_List = 5,
  Api = 6,
  Api_allowed_prefixes = 7,
  Api_aws_role_arn = 8,
  Api_blocked_prefixes = 9,
  Api_provider = 10,
  As = 11,
  At = 12,
  Auto_refresh_materialized_views_on_secondary = 13,
  Aws_api_gateway = 14,
  Aws_private_api_gateway = 15,
  Azure_ad_application_id = 16,
  Azure_api_management = 17,
  Azure_tenant_id = 18,
  Before = 19,
  Blocked_IP_List = 20,
  Bool = 21,
  Business = 22,
  Business_critical = 23,
  Cascade = 24,
  Change = 25,
  Clone = 26,
  Columns = 27,
  Comment = 28,
  Create = 29,
  Critical = 30,
  Data_retention_time_in_days = 31,
  Database = 32,
  Default_ddl_collation = 33,
  Desc = 34,
  Describe = 35,
  Drop = 36,
  Edition = 37,
  Email = 38,
  Enabled = 39,
  Enterprise = 40,
  Exists = 41,
  False = 42,
  File = 43,
  First = 44,
  First_name = 45,
  Format = 46,
  From = 47,
  GroupLeft = 48,
  GroupRight = 49,
  IP = 50,
  If = 51,
  Ignoring = 52,
  In = 53,
  Integration = 54,
  Last = 55,
  Last_name = 56,
  List = 57,
  Max_data_extension_time_in_days = 58,
  Must = 59,
  Must_change_password = 60,
  Name = 61,
  Network = 62,
  Not = 63,
  Of = 64,
  Offset = 65,
  On = 66,
  Or = 67,
  Password = 68,
  Policy = 69,
  Region = 70,
  Region_group = 71,
  Replace = 72,
  Replica = 73,
  Restrict = 74,
  Role = 75,
  Schema = 76,
  Select = 77,
  Sequence = 78,
  Share = 79,
  Stage = 80,
  Standard = 81,
  Statement = 82,
  Table = 83,
  And = 84,
  Task = 85,
  Timestamp = 86,
  Transient = 87,
  True = 88,
  Type = 89,
  User = 90,
  View = 91,
  Warehouse = 92,
  Where = 93,
  Null = 94,
  Is = 95,
  Identifier = 104;

const keywordTokens = {
  in: In,
  account:Account,
  and : And,
  admin:Admin,
  admin_name:Admin_name,
  admin_password:Admin_password,
  allowed_ip_list:Allowed_IP_List,
  api:Api,
  api_allowed_prefixes:Api_allowed_prefixes,
  api_aws_role_arn:Api_aws_role_arn,
  api_blocked_prefixes:Api_blocked_prefixes,
  api_provider:Api_provider,
  as:As,
  at:At,
  auto_refresh_materialized_views_on_secondary:Auto_refresh_materialized_views_on_secondary,
  aws_api_gateway:Aws_api_gateway,
  aws_private_api_gateway:Aws_private_api_gateway,
  azure_ad_application_id:Azure_ad_application_id,
  azure_api_management:Azure_api_management,
  azure_tenant_id:Azure_tenant_id,
  before:Before,
  blocked_ip_list:Blocked_IP_List,
  bool:Bool,
  null:Null,
  is:Is,
  business:Business,
  business_critical:Business_critical,
  cascade:Cascade,
  change:Change,
  clone:Clone,
  columns:Columns,
  comment:Comment,
  create:Create,
  critical:Critical,
  data_retention_time_in_days:Data_retention_time_in_days,
  database:Database,
  default_ddl_collation:Default_ddl_collation,
  desc:Desc,
  describe:Describe,
  drop:Drop,
  edition:Edition,
  email:Email,
  enabled:Enabled,
  enterprise:Enterprise,
  exists:Exists,
  false:False,
  file:File,
  first:First,
  first_name:First_name,
  format:Format,
  from:From,
  groupleft:GroupLeft,
  groupright:GroupRight,
  ip:IP,
  identifier:Identifier,
  if:If,
  ignoring:Ignoring,
  integration:Integration,
  last:Last,
  last_name:Last_name,
  list:List,
  max_data_extension_time_in_days:Max_data_extension_time_in_days,
  must:Must,
  must_change_password:Must_change_password,
  name:Name,
  network:Network,
  not:Not,
  of:Of,
  offset:Offset,
  on:On,
  or:Or,
  password:Password,
  policy:Policy,
  region:Region,
  region_group:Region_group,
  replace:Replace,
  replica:Replica,
  restrict:Restrict,
  role:Role,
  schema:Schema,
  select:Select,
  sequence:Sequence,
  share:Share,
  stage:Stage,
  standard:Standard,
  statement:Statement,
  table:Table,
  task:Task,
  timestamp:Timestamp,
  transient:Transient,
  true:True,
  type:Type,
  user:User,
  view:View,
  warehouse:Warehouse,
  where:Where,
};
const specializeIdentifier = (value, stack) => {
  return keywordTokens[value.toLowerCase()] || -1;
};

// This file was generated by lezer-generator. You probably shouldn't edit it.
const parser = Parser.deserialize({
  version: 13,
  states: "#%hOYQPOOOfQPO'#EjOnQPO'#EeOOQO'#Ed'#EdOOQO'#Ec'#EcOyQPO'#E{OOQO'#E{'#E{O!kQPO'#FSO!yQPO'#FTOOQO'#Eb'#EbO#_QPO'#FUQYQPOOO#dQPO,5;UOOQO'#Ef'#EfO#iQPO'#EfO#zQPO'#EfO$]QPO,5;PO$kQPO,5;hO$pQPO,5;gO$uQPO,5;gO$zQPO,5;gO%SQPO,5;gO%XQPO,5;gO%aQPO,5;gO%fQPO,5;gO%kQPO,5;nO%pQPO,5;nO%uQPO,5;nO%zQPO,5;oO&PQPO,5;oOOQO,5;p,5;pOOQO-E9S-E9SOOQO1G0p1G0pO&XQPO'#FVO&^QPO,5;QO&oQPO,5;QO&tQPO'#EnO&|QPO1G0kO'XQPO1G1SO'^QPO1G1RO'fQPO1G1RO'}QPO1G1RO(SQPO1G1RO(XQPO1G1RO(aQQO1G1RO({QPO1G1RO)QQPO1G1RO)YQPO1G1RO)_QPO1G1YO)bQPO1G1YO)gQPO1G1YOOQO1G1Z1G1ZO)lQPO1G1ZOOQO,5;q,5;qOOQO-E9T-E9TOOQO'#Em'#EmOOQO1G0l1G0lO)qQPO'#EoO*PQPO'#EoOOQO,5;Y,5;YO*XQPO'#EpOOQO7+&V7+&VO*jQPO7+&nO*oQPO7+&mO*tQPO7+&mO*yQPO7+&mO+OQPO7+&mO+WQPO7+&mO+]QPO7+&mO+eQPO7+&mO+jQPO7+&mO+oQPO7+&mO+tQPO7+&mO+yQPO7+&mOOQO7+&m7+&mO,OQQO7+&mO,TQQO7+&mO,YQQO7+&mO,_QQO7+&mO,dQPO7+&mO,iQPO7+&mO,nQPO7+&mO,sQPO7+&mO,xQQO7+&mO-^QPO7+&mO-cQPO7+&mOOQO7+&t7+&tO-hQPO7+&tO-mQPO7+&tO-rQPO7+&uO-wQPO,5;ZOOQO,5;Z,5;ZO&oQPO,5;ZO.VQPO'#EjO.hQSO'#EqO/`QSO'#EqOOQO,5;[,5;[O/gQPO<<JYO/lQQO<<JXO/qQPO<<JXO/vQPO<<JXO0OQPO<<JXO0TQPO<<JXO0YQPO<<JXO0sQQO<<JXO0zQPO<<JXO1PQPO<<JXO0nQQO<<JXO0]QPO<<JXO1XQPO<<JXO1^QPO<<JXO1cQPO<<JXO1hQPO<<JXO1mQPO<<JXO1rQQO<<JXO1|QPO<<JXO2RQPO<<JXO1SQPO<<JXOOQO<<JX<<JXO2WQQO<<JXO2]QQO<<JXO2bQQO<<JXO2gQQO<<JXO2lQPO<<JXO2qQPO<<JXO2vQPO<<JXO2{QPO<<J`OOQO<<J`<<J`OOQO<<Ja<<JaOOQO1G0u1G0uO3WQSO,5;UO3bQPO,5;]O3gQPO,5;]O3{QPO,5;]O4QQPO,5;]O&oQPO,5;]O4YQPOAN?tO4_QPOAN?sO4jQPOAN?sO4oQPOAN?sO4tQPOAN?sO4yQPOAN?sO5OQPOAN?sO5TQPOAN?sO5YQPOAN?sOOQOAN?sAN?sO5_QQOAN?sO5dQQOAN?sO5iQQOAN?sO5nQQOAN?sO5sQPOAN?sO5xQPOAN?sO6`QQOAN?sO6gQPOAN?sO6ZQQOAN?sO6lQPOAN?sO6qQQOAN?sO6yQQOAN?sO7UQQOAN?sO7dQPOAN?sO7oQWOAN?sO7tQPOAN?sO7yQPOAN?sO8OQPOAN?sO8TQPOAN?sO8YQQOAN?sO8dQPOAN?sO8iQPOAN?sOOQO'#FW'#FWO8nQPOAN?zOOQOAN?zAN?zO9qQSO1G0wO9{QSO1G0wOOQO1G0w1G0wO:VQSO1G0wO:dQPO1G0wO:xQPO1G0wO8yQSO1G0wO:}QPOG25`O;SQPOG25_O;XQPOG25_O;^QPOG25_O;cQQOG25_O;hQPOG25_O;mQQOG25_O;rQPOG25_O;wQPOG25_O;|QPOG25_O<RQPOG25_O<WQPOG25_O<]QPOG25_O<sQQOG25_O<}QPOG25_OOQOG25_G25_O=SQQOG25_O=XQQOG25_O=^QQOG25_O=cQQOG25_O=hQPOG25_O=mQPOG25_O=rQPOG25_O=wQQOG25_O=|Q`OG25_O>RQQOG25_O>ZQQOG25_O>fQQOG25_O>tQPOG25_O?PQQOG25_O?WQQOG25_OOQO-E9U-E9UOOQOG25fG25fO?]QPO7+&cO?qQPO7+&cO?vQPO7+&cO&oQPO7+&cO@OQSO7+&cOOQO7+&c7+&cO@YQSO7+&cO@gQQOLD*zO@oQQOLD*yO@tQQOLD*yO@yQQOLD*yOAOQPOLD*yOAZQPOLD*yOOQOLD*yLD*yOA`QPOLD*yOAeQQOLD*yOAjQPOLD*yOAoQQOLD*yOAwQQOLD*yOBSQQOLD*yOBbQQOLD*yOBgQQOLD*yOBlQQOLD*yOBqQQOLD*yOBvQPOLD*yOCdQQOLD*yOCkQPOLD*yOCpQPOLD*yOCuQPOLD*yOCzQPOLD*yODPQQOLD*yODZQPOLD*yOD`QPOLD*yODeQPOLD*yODjQQOLD*yODoQPOLD*yODtQPOLD*yODyQSO<<I}OOQO<<I}<<I}OETQSO<<I}OEbQPO<<I}OEvQPO<<I}OE{QSO<<I}O&oQPO<<I}OFVQQO!$'NfOF_QPO!$'NfOFdQPO!$'NeOFiQPO!$'NeOFnQPO!$'NeOFyQPO!$'NeOGOQPO!$'NeOGTQPO!$'NeOGYQPO!$'NeOOQO!$'Ne!$'NeOG_QPO!$'NeOGdQQO!$'NeOGiQQO!$'NeOGnQQO!$'NeOGsQPO!$'NeOGxQPO!$'NeOG}QPO!$'NeOHSQQO!$'NeOHXQQO!$'NeOH^QPO!$'NeOHcQQO!$'NeOHhQQO!$'NeOHpQQO!$'NeOH{QQO!$'NeOIZQPO!$'NeOIwQQO!$'NeOIfQQO!$'NeOJOQPO!$'NeOJTQPO!$'NeOJYQQO!$'NeOJdQQO!$'NeO&oQPOAN?iOJiQSOAN?iOOQOAN?iAN?iOJsQSOAN?iOKQQPOAN?iOKfQSOAN?iOKpQPO!)9DQOKuQPO!)9DQOKzQQO!)9DQOLSQPO!)9DPOLXQPO!)9DPOL^QPO!)9DPOLcQPO!)9DPOLhQQO!)9DPOLmQQO!)9DPOLrQQO!)9DPOLwQQO!)9DPOL|QPO!)9DPOMRQPO!)9DPOMWQPO!)9DPOM]QQO!)9DPOMeQQO!)9DPOMpQQO!)9DPONOQPO!)9DPONTQPO!)9DPONkQQO!)9DPOOQO!)9DP!)9DPONuQQO!)9DPONzQQO!)9DPO! PQQO!)9DPO! UQQO!)9DPO! ZQQO!)9DPO! `QPO!)9DPO! eQQO!)9DPONYQQO!)9DPO! jQPO!)9DPO! uQPO!)9DPO! zQSOG25TO&oQPOG25TO!!UQSOG25TOOQOG25TG25TO!!`QSOG25TO!!mQQO!.K9lO!!uQPO!.K9lO!!zQPO!.K9lO!#PQQO!.K9kO!#UQQO!.K9kO!#ZQQO!.K9kO!#`QQO!.K9kO!#eQPO!.K9kO!#jQPO!.K9kO!#oQPO!.K9kOOQO!.K9k!.K9kO!#zQQO!.K9kO!$PQQO!.K9kO!$XQQO!.K9kO!$dQQO!.K9kO!$iQQO!.K9kO!$nQQO!.K9kO!$sQQO!.K9kO!%UQQO!.K9kO!%dQQO!.K9kO!%iQPO!.K9kO!%tQPO!.K9kO!%yQPO!.K9kO!&OQPO!.K9kO!&TQPO!.K9kO!&YQPO!.K9kO!&_QQO!.K9kO!&iQPO!.K9kO!&qQQO!.K9kO!&vQPO!.K9kO!'OQSOLD*oO&oQPOLD*oO!'YQQO!4//WO!'bQPO!4//WO!'gQQO!4//WO!'oQPO!4//WO!'tQPO!4//VO!'yQPO!4//VO!(OQPO!4//VO!(TQPO!4//VO!(YQPO!4//VO!(_QPO!4//VO!(dQPO!4//VO!(iQPO!4//VOOQO!4//V!4//VO!(nQQO!4//VO!(sQQO!4//VO!(xQPO!4//VO!(}QPO!4//VO!)SQPO!4//VO!)XQQO!4//VO!)^QQO!4//VO!)cQPO!4//VO!)hQQO!4//VO!)mQQO!4//VO!)rQQO!4//VO!)zQQO!4//VO!*VQQO!4//VO!*hQQO!4//VO!*vQPO!4//VO!+RQPO!4//VO!+WQPO!4//VO!+]QSO!$'NZO!+gQPO!9A$rO!+lQPO!9A$rO!+qQQO!9A$rO!+yQPO!9A$rO!,OQQO!9A$rO!,WQPO!9A$qO!,]QPO!9A$qO!,bQPO!9A$qO!,gQPO!9A$qO!,lQQO!9A$qO!,qQQO!9A$qO!,vQQO!9A$qO!,{QQO!9A$qO!-QQPO!9A$qO!-VQPO!9A$qO!-[QQO!9A$qO!-aQQO!9A$qO!-iQQO!9A$qO!-tQPO!9A$qO!-yQPO!9A$qO!.OQQO!9A$qO!.^QPO!9A$qOOQO!9A$q!9A$qO!.cQQO!9A$qO!.hQQO!9A$qO!.mQQO!9A$qO!.rQQO!9A$qO!.wQQO!9A$qO!.|QQO!9A$qO!/_QPO!9A$qO!/dQPO!?$H^O!/oQPO!?$H^O!/tQPO!?$H^O!/yQQO!?$H^O!0RQPO!?$H^O!0WQPO!?$H]O!0]QQO!?$H]O!0bQQO!?$H]O!0gQQO!?$H]O!0lQPO!?$H]O!0qQPO!?$H]O!0vQPO!?$H]O!0{QPO!?$H]O!1QQQO!?$H]O!1VQQO!?$H]OOQO!?$H]!?$H]O!1_QQO!?$H]O!1dQQO!?$H]O!1iQQO!?$H]O!1tQQO!?$H]O!2SQQO!?$H]O!2XQQO!?$H]O!2jQPO!?$H]O!2oQPO!?$H]O!2tQPO!?$H]O!2yQPO!?$H]O!3OQPO!?$H]O!3TQQO!?$H]O!3YQQO!?$H]O!3_QPO!D6=xO!3mQPO!D6=xO!3rQPO!D6=xO!3}QPO!D6=xO!4SQPO!D6=xO!4XQQO!D6=xO!4aQPO!D6=wO!4iQPO!D6=wO!4nQPO!D6=wO!4sQPO!D6=wO!4xQPO!D6=wO!4}QPO!D6=wO!5SQPO!D6=wO!5XQPO!D6=wOOQO!D6=w!D6=wO!5^QQO!D6=wO!5cQPO!D6=wO!5hQPO!D6=wO!5mQQO!D6=wO!5rQQO!D6=wO!5wQPO!D6=wO!5|QQO!D6=wO!6RQQO!D6=wO!6WQQO!D6=wO!6`QQO!D6=wO!6kQQO!D6=wO!6yQQO!D6=wO!7[QPO!D6=wO!7aQPO!D6=wO!7fQPO'#FPO!7kQPO'#FPO!7pQPO'#FPOOQO!IH3d!IH3dO!7uQPO!IH3dO!3_QPO!IH3dO!7zQPO!IH3dO!8PQPO!IH3dO!8[QPO!IH3dO!8aQPO!IH3dO!8fQQO!IH3cO!8kQQO!IH3cO!8pQPO!IH3cO!8xQPO!IH3cO!8}QPO!IH3cO!9SQPO!IH3cO!9XQQO!IH3cO!9^QQO!IH3cO!9cQQO!IH3cO!9hQPO!IH3cO!9mQQO!IH3cO!9rQQO!IH3cO!9zQPO!IH3cO!:PQPO!IH3cO!:UQQO!IH3cO!:aQPO!IH3cOOQO!IH3c!IH3cO!:fQQO!IH3cO!:kQQO!IH3cO!:pQQO!IH3cO!:uQQO!IH3cO!:zQQO!IH3cO!;YQQO!IH3cO!;_QPO,5;kO!;dQPO,5;kO!;iQPO,5;kO!3_QPO# ,)OOOQO# ,)O# ,)OO!;nQPO# ,)OO!;sQPO# ,)OO!;xQPO# ,)OO!<TQPO# ,)OO!<YQPO# ,(}O!<bQPO# ,(}O!<gQQO# ,(}O!<lQQO# ,(}O!<qQPO# ,(}O!<vQQO# ,(}O!<{QPO# ,(}O!=TQPO# ,(}O!=YQPO# ,(}O!=_QPO# ,(}O!=dQQO# ,(}OOQO# ,(}# ,(}O!=iQQO# ,(}O!=nQQO# ,(}O!=vQQO# ,(}O!>RQQO# ,(}O!>WQQO# ,(}O!>fQPO# ,(}O!>kQPO# ,(}O!>pQPO# ,(}O!>uQPO# ,(}O!>zQQO# ,(}O!?PQPO# ,(}O!?UQPO1G1VO!?ZQQO1G1VO!?`QQO1G1VOOQO#&=Lj#&=LjO!3_QPO#&=LjO!?eQPO#&=LjO!?jQPO#&=LjO!?oQPO#&=LjO!?zQQO#&=LiO!@SQPO#&=LiO!@XQPO#&=LiO!@aQPO#&=LiO!@fQPO#&=LiO!@nQPO#&=LiO!@sQQO#&=LiO!@xQQO#&=LiO!@}QPO#&=LiO!AVQPO#&=LiO!A[QPO#&=LiOOQO#&=Li#&=LiO!AaQPO#&=LiO!AfQQO#&=LiO!AkQQO#&=LiO!ApQPO#&=LiO!AuQQO#&=LiO!?}QQO#&=LiO!AzQQO#&=LiO!BVQQO#&=LiO!BeQPO#&=LiO!BjQPO#&=LiO!BoQPO7+&qO!BtQPO7+&qO!ByQPO7+&qOOQO#, BU#, BUO!3_QPO#, BUO!CUQPO#, BUO!CZQPO#, BUOOQO#, BT#, BTO!C`QQO#, BTO!CeQPO#, BTO!CjQQO#, BTO!CrQPO#, BTO!CwQQO#, BTO!C|QQO#, BTO!DRQPO#, BTO!DZQPO#, BTO!DcQPO#, BTO!DhQQO#, BTO!DmQPO#, BTO!DrQQO#, BTO!CmQQO#, BTO!DwQPO#, BTO!D|QPO#, BTO!ERQPO#, BTO!EWQQO#, BTO!E]QQO#, BTO!EbQQO#, BTO!EmQQO<<J]O!ErQPO<<J]O!EzQPO<<J]O!FPQPO<<J]OOQO#137p#137pO!3_QPO#137pO!FUQPO#137pO!FZQPO#137oO!F`QPO#137oOOQO#137o#137oO!FeQQO#137oO!FjQQO#137oO!FoQPO#137oO!FwQPO#137oO!F|QQO#137oO!GRQQO#137oO!GZQPO#137oO!G`QPO#137oO!GeQPO#137oO!GmQPO#137oO!GUQQO#137oO!GrQQO#137oO!G}QPO#137oO!HSQPO#137oO!HXQQO#137oO!H^QPOAN?wO!HfQPOAN?wO!HkQPOAN?wO!HpQPOAN?wOOQO#6E-[#6E-[O!3_QPO#6E-[O!HuQQO#6E-ZO!HzQQO#6E-ZO!IPQPO#6E-ZO!IUQPO#6E-ZO!I^QQO#6E-ZO!IfQPO#6E-ZO!IkQPO#6E-ZOOQO#6E-Z#6E-ZO!IpQQO#6E-ZO!IuQPO#6E-ZO!IzQPO#6E-ZO!JPQQO#6E-ZO!JUQPO#6E-ZO!J^QQO#6E-ZO!JcQQO#6E-ZO!JnQPO#6E-ZOOQOG25cG25cO!JsQPOG25cO!JxQPOG25cO!J}QQOG25cOOQO#<)!v#<)!vOOQO#<)!u#<)!uO!KSQPO#<)!uO!K[QQO#<)!uO!KaQQO#<)!uO!KiQQO#<)!uO!KnQPO#<)!uO!KsQPO#<)!uO!KxQPO#<)!uO!K}QQO#<)!uO!LSQPO#<)!uO!LXQQO#<)!uO!L^QPO#<)!uO!LcQQO#<)!uO!LhQPOLD*}O!LmQPOLD*}O!LrQPOLD*}O!LwQQO#A:FaOOQO#A:Fa#A:FaO!MPQQO#A:FaO!MUQPO#A:FaO!MZQPO#A:FaO!M`QQO#A:FaO!LzQQO#A:FaO!MeQPO#A:FaO!MmQPO#A:FaO!MrQPO#A:FaO!MwQPO#A:FaO!M|QPO!$'NiO!NRQQO!$'NiO!NWQPO!$'NiOOQO#FL;{#FL;{O!N`QQO#FL;{O!NeQPO#FL;{O!NjQQO#FL;{O!NoQQO#FL;{O!NtQPO#FL;{O!N|QQO#FL;{O# UQPO#FL;{O# ZQPO#FL;{O# `QQO!)9DTO# eQPO!)9DTO# mQPO!)9DTO# rQPO#L01gO# wQQO#L01gOOQO#L01g#L01gO# |QPO#L01gO#!UQQO#L01gO#!^QQO#L01gO#!cQPO#L01gO#!hQQO#L01gO#!mQPO!.K9oOOQO!.K9o!.K9oO#!uQPO!.K9oO#!zQQO$#B'ROOQO$#B'R$#B'RO##PQQO$#B'RO##XQQO$#B'RO##^QPO$#B'RO##cQQO$#B'RO##hQPO$#B'ROOQO!4//Z!4//ZO##pQPO!4//ZOOQO$)%Jm$)%JmO##uQQO$)%JmO##zQPO$)%JmO#$PQQO$)%JmO#$UQPO$)%JmO#$^QQO$)%JmO#$fQPO!9A$uO#$kQPO$.7@XO#$pQQO$.7@XOOQO$.7@X$.7@XO#$uQQO$.7@XO#$}QQO$.7@XO#%SQQO!?$HaO#%XQQO$3I5sOOQO$3I5s$3I5sO#%^QQO$3I5sO#%cQPO$3I5sO#%hQPO!D6={OOQO$9-+_$9-+_O#%pQPO$9-+_O#%uQQO$9-+_OOQO!IH3g!IH3gO#%zQQO$>>NyOOQO$>>Ny$>>NyOOQO$D!De$D!De",
  stateData: "#&T~O#}OS#SOS~OmTOrVOsVOtWO!oQO#_PO~O#Z]O#[^O#_PO~OPaOUbOpfO{eO!`hO!ecO!pdO!rdO!wdO!ygO~O!`kO!uiO!|jO!}jO~O!qlO!rmO!ulO!wlO!|lO!}lO~O#unO~O#`pO~O#]qO!P#YX#P#YX#u#YX#`#YX~OZsO!P#YX#P#YX#u#YX#`#YX~O!PtO#P#bP#u#bP#`#bP~O#[vO~O!WwO~O!jxO~O!TzO#[yO~O!O{O~O!T}O#[|O~Op!OO~O!g!PO~O#[!QO~O#[!RO~O!g!SO~O#[!TO~O!T!UO#[!TO~O#[!VO~O#]qO!P#Ya#P#Ya#u#Ya#`#Ya~O#[!XO~O#[!ZO#_PO~O#P!^O#u#Xi#`#Xi~OR!`O~O!T!bO#[!aO~OU!cOp!fO{!eO!p!dO!r!dO!w!dO!y!gO~Oj!hO~O!a!iO~O!T!kO#[!jO~OZ!sOj!qOl!mOo!pOq!nO!P!rO![!oO$Q!lO~O!a!tO~O!T!vO#[!uO~O#[!wO~O!{!yO#u!xO~O#[!zO~Oy!{O~O#]qO#P#cX#u#cX#`#cX~OZ#OO#[!XO~O#[!XO#_#PO#f#QO#u#eP#`#eP~O#q#TO~OY#UO~O!a#VO~O!W#WO~O!T#YO#[#XO~O!O#ZO~O!T#]O#[#[O~Op#^O~O#[#_O~Oy#`O~Oj#aO~O!a#bO~O$P#aO~O$P#cO~O$P#dO~O$P#eO~O#[#fO~O!q#gO~O!k#hO~Oy#iO~Oj#oOl#kOo#nOq#lO![#mO$Q#jO~O!a#pO~OT#qO~O#q#rO~O#u#sO~O#[#tO~O#]qO#P#ca#u#ca#`#ca~O!oQO#[!XO#_#PO#f#QO#`#eP~O!V#xO!a#yO!e#xO!v#xO#R#zO#g#xO#h#xO#i#xO#j#xO#k#xO#l#xO#m#xO~OZ#{O~P.hO#[#|O~O$P#}O~Oy$OO~O!T$QO#[$PO~Oj$RO~O!a$SO~O!T$UO#[$TO~Ol$WOo$ZOq$XO![$YO$Q$VO~Oj$[O~P0bO!a$]O~O!T$_O#[$^O~O#[$`O~Oy$aO~O#[$bO~O#[$cO~O#[$dO~O[$eOc$eO~P0bO#[$fO~O!b$gO~O$P$RO~O$P$hO~O$P$iO~O$P$jO~O#[$kO~Oy$lO~O#q$mO~Ok$nO!r$nO#u$pO~OZ#{O#`pO~P.hO#`$qO~O#[!XO#_#PO#f$rO#n$sO#u#eP#`#eP~O!V$uO~O!a$vO#Q$uO~OS$xO~O^$yO_$yOa$zO~O#[${O~OY$|O~O!a$}O~O#[%OO~Oy%PO~Oj%QO~O!a%RO~O$P%QO~O$P%SO~O$P%TO~O$P%UO~O#[%VO~Oy%WO~Ol%YOo%]Oq%ZO![%[O$Q%XO~Oj%^O~P5}O!a%_O~O#[%`O~Ol%YO$Q%XO~Ol%YOq%ZO$Q%XO~Ol%YOq%ZO![%[O$Q%XO~O!c%aO!t%aO!x%aO~O#t%QO~O#[%bO~O#[%cO~O#[%dO~O#[%eO~O[%fOc%fO~P5}O#[%gO~O#_%hO~Ok$nO!r$nO#u%jO~O!V%kO!a%lO!e%kO!v%kO#R%mO#g%kO#h%kO#i%kO#j%kO#k%kO#l%kO#m%kO~O#u#ei#`#ei~P8yO#u#ei#`#ei~P.hOZ%nO#u#ei#`#ei~P.hO#[!XO#_#PO#f%oO#n%pO#u#eP#`#eP~O#Q%kO~O#q%rO~OW%sO~Ob%tO~OY%uO~O$P%vO~Oy%wO~O$Q%xO~O#[%yO~O#[%zO~Oy%{O~O#[%|O~O#[%}O~O#[&OO~Ol&POo&SOq&QO![&RO$Q%xO~O[&TOc&TO~P<bO#[&UO~O$P&VO~O$P&WO~O$P&XO~O$P&YO~O#[&ZO~Oy&[O~Oj&VO~O$P&]O~O$R&^O~Ol&PO$Q%xO~Ol&POq&QO$Q%xO~Ol&POq&QO![&RO$Q%xO~O!c&_O!t&_O!x&_O~Oj&`O~P<bO#r&aO~O#[!XO#_#PO#f&bO#n&cO#u#eP#`#eP~O!V&eO~O!a&fO#Q&eO~O#u#eq#`#eq~P.hOZ&hO#u#eq#`#eq~P.hO#[&iO#r&jO~O$P&kO~O$P&lO~O$P&mO~O^&nO_&nOa&oO~O#[&pO~Oj&qO~O$Q&rO~O#[&sO~Ol&tO$Q&rO~Ol&tOq&uO$Q&rO~Ol&tOq&uO![&vO$Q&rO~O$P&qO~O$P&wO~O$P&xO~O$P&yO~O!c&zO!t&zO!x&zO~Ol&tOo&{Oq&uO![&vO$Q&rO~Oj&|O~PCRO#[&}O~O#['OO~O#['PO~O#['QO~O['ROc'RO~PCRO#['SO~O#['TO~O#['UO~O$P'VO~O#['WO~O#['XO~O#u#ey#`#ey~P.hOZ'YO#u#ey#`#ey~P.hO#[!XO#_#PO#f'ZO#n'[O#u#eP#`#eP~O#Q'^O~O#u#ey#`#ey~P8yOv'`O#r'aO~O#['bO~O#['cO~O#['dO~O^'eO_'eOa'fO~OW'gO~Ob'hO~OY'iO~O#['jO~Oj'kO~O$P'kO~O$P'lO~O$P'mO~O#['nO~O#['oO~O#['pO~O$P'qO~O$P'rO~O#['sO~O$Q'tO~Ol'uO$Q'tO~Ol'uOq'vO$Q'tO~Ol'uOq'vO!['wO$Q'tO~O!c'xO!t'xO!x'xO~Ol'uOo'yOq'vO!['wO$Q'tO~Oj'zO~PIfO]'{O~O#['|O~O['}Oc'}O~PIfO#r(OO~O#u#e!R#`#e!R~P.hOZ(QO#u#e!R#`#e!R~P.hO#[!XO#_#PO#f(RO#n(SO#u#eP#`#eP~O#u#e!R#`#e!R~P8yO#q(UO~Ov(VO~Ov(VO#r(WO~OV(XO~O`(YO~OW(ZO~Ob([O~O$P(]O~O$P(^O~O$P(_O~O$Q(`O~O#[(aO~O#[(bO~O#[(cO~Ol(dO$Q(`O~Ol(dOq(eO$Q(`O~Ol(dOq(eO![(fO$Q(`O~O#[(gO~O#[(hO~Ol(dOo(iOq(eO![(fO$Q(`O~O[(jOc(jO~PNYO$P(kO~O$P(lO~O$P(mO~O$P(nO~O$P(oO~O#[(pO~O$P(qO~O!c(rO!t(rO!x(rO~O#`(sO~O#u#e!Z#`#e!Z~P8yO#u#e!Z#`#e!Z~P.hOZ(uO#u#e!Z#`#e!Z~P.hO#[(vO#r(wO~O#q(xO~Ov(yO~O$P(zO~O$P({O~O$P(|O~O$P(}O~O#[)OO~O#[)PO~O^)QO_)QOa)RO~O$Q)SO~Ol)TO$Q)SO~Ol)TOq)UO$Q)SO~O$P)VO~O$P)WO~O$P)XO~Ol)TOo)ZOq)UO![)YO$Q)SO~Ol)TOq)UO![)YO$Q)SO~O$P)[O~O!c)]O!t)]O!x)]O~O#[)^O~O#[)_O~O#[)`O~O#[)aO~O#[)bO~O[)cOc)cO~P!$sOz)^O!z)^O~O$P)dO~Od)eO#u)SO~O#u#e!c#`#e!c~P8yOu)gO#r)hO~O#[)iO~O#[)iO#r)jO~O#q)kO~O#_)lO~O#[)mO~O#[)nO~O#[)oO~OV)pO~O`)qO~OW)rO~Ob)sO~O$P)tO~O$P)uO~O#[)vO~O#[)wO~O#[)xO~O$P)yO~O$P)zO~O#[){O~O$P)|O~O$Q)}O~Ol*OO$Q)}O~Ol*OOq*PO$Q)}O~Ol*OOo*ROq*PO![*QO$Q)}O~Ol*OOq*PO![*QO$Q)}O~O!c*SO!t*SO!x*SO~O#[*TO~O#q*UO~O#u#e!k#`#e!k~P8yO#q*VO~Ou*WO~Ou*WO#r*XO~O#[*YO~O#[*YO#r*ZO~O#[*[O~OV*]O~OV*^O~O`*_O~O$P*`O~O$P*aO~O$P*bO~O$P*cO~O#[*dO~O#[*eO~O$Q*fO~Ol*gO$Q*fO~Ol*gOq*hO$Q*fO~O#[*iO~O#[*jO~Ol*gOq*hO![*kO$Q*fO~O#[*lO~O$P*mO~O$P*nO~O$P*oO~O$P*pO~O$P*qO~Ol*gOo*rOq*hO![*kO$Q*fO~O#_*sO~Of*uOx*tO!s*tO~O#q*vO~Ou*wO~Ou*wO#r*xO~O#[*yO~O#`*zO~O$P*{O~O$P*|O~O$P*}O~O#_+OO~O#[+PO~O#[+QO~O#[+RO~O$Q+SO~Ol+TO$Q+SO~O$P+UO~O$P+VO~Ol+TOq+WO$Q+SO~Ol+TOq+WO![+XO$Q+SO~O$P+YO~Ol+TOo+ZOq+WO![+XO$Q+SO~O#[+[O~O#[+]O~O#[+^O~O#[+_O~O#[+`O~O$P+aO~O#r+bO~O|+eO!X+dO!]+cO#u#sP~O$O+gO~Of+iOx+hO!s+hO~O#q+jO~Ou+kO~Ou+kO#r+lO~OX+nOw+mO~O#[+oO~O#_+pO~O#[+qO~O#[+rO~OV+sO~OV+tO~O`+uO~O$P+vO~O#[+wO~O#[+xO~O$P+yO~O$P+zO~O#[+{O~O$P+|O~O$Q+}O~Ol,OO$Q+}O~Ol,OOq,PO$Q+}O~Ol,OOq,PO![,QO$Q+}O~Ol,OOo,ROq,PO![,QO$Q+}O~O#[,SO~O#[,TO~O$O,UO~O$O,VO~O$O,WO~Ou,XO~O$O,ZO~Of,[Ox,XO!s,XO~O#q,]O~Ou,^O~O$P,_O~O$P,`O~OX,bOw,aO~O#[,cO~OV,dO~O#`,eO~O$P,fO~O$P,gO~O$P,hO~O#[,iO~O$Q,jO~Ol,kO$Q,jO~O#[,lO~O#[,mO~Ol,kOq,nO$Q,jO~O#[,oO~O$P,pO~O$P,qO~O$P,rO~O$P,sO~Ol,kOq,nO![,tO$Q,jO~O#r,uO~Oi,vO~O!_,wO~O!_,xO~Ou,zO~O$O,{O~Of,|Ox,zO!s,zO~O#q,}O~Oz-OO!z-OO~O#_-PO~O$P-QO~O$P-RO~O#`-SO~O$P-TO~OX-VOw-UO~O#[-WO~O#_-XO~O#[-YO~O$Q-ZO~O$P-[O~Ol-]O$Q-ZO~Ol-]Oq-^O$Q-ZO~O$P-_O~Ol-]Oq-^O![-`O$Q-ZO~O#[-aO~O#[-OO~O#[-bO~O#[-cO~O$P-dO~O#`-eO~O$O-fO~O$P-gO~O$P-hO~Ou-jO~O$O-kO~Of-lOx-jO!s-jO~Ol-nO$Q-mO~O#[-oO~Oz-pO!z-pO~O#[-qO~OX-sOw-rO~O#[-tO~O$P-uO~O$P-vO~OX-wOw-rO~O#[-xO~OV-yO~O#[-zO~O$P-{O~O$P-|O~O#[-pO~O$P-}O~Ol-nOq.OO$Q-mO~Ol-nOq.OO![.PO$Q-mO~O#[.QO~O#u-mO~O!f.RO~O#[.SO~O!X.UO!].TO#u#sq~Ou.WO~O$O.XO~O$P.YO~O#`.ZO~Ol.]O$Q.[O~Ow.^O~O$P._O~O$P.`O~OX.aOw.^O~Oz.bO!z.bO~O#_.cO~O$P.dO~O#`.eO~O$P.fO~O#[.gO~O#[.bO~O#[.hO~O$P.iO~O$P.jO~Ol.]Oq.kO$Q.[O~O$P.lO~O!].mO#u#sy~O$O.nO~O$O.oO~Ou.qO~O#[.rO~Ow.sO~O$P.tO~O$P.uO~Oz.vO!z.vO~O#_.wO~O$P.xO~Ol.zO$Q.yO~O#[.{O~O#[.|O~OX.}Ow.sO~O#[/OO~Ol.zOq/PO$Q.yO~O#[.vO~O#[/QO~O$P/RO~Oz/SO!z/SO~O$O/TO~Oi/UO~O!_/VO~O$Q/XO~O$P/YO~O#[/ZO~Oz/[O!z/[O~Ol/]O$Q/XO~O#[/^O~O#[/_O~O$P/`O~O#`/_O~Ow/aO~O$P/bO~OX/cOw/aO~O$P/dO~Ol/]Oq/eO$Q/XO~O#[/[O~Oi/fO~O$O/gO~O$P/hO~Oz/iO!z/iO~O$Q/jO~Ol/kO$Q/jO~O$P/lO~O#`/mO~Ow/nO~O#[/oO~O$P/pO~O#_/qO~O$P/rO~O#[/iO~O$P/sO~O$O/tO~O!f/uO~O#[/vO~Ol/xO$Q/wO~O$P/yO~O#[/zO~Ow/{O~O$P/|O~Oz/}O!z/}O~O#[0OO~O#[0PO~O#[/}O~O!f0QO~O$P0RO~O!]0SO#u#s!k~O$P0TO~O#[0UO~O$Q0VO~O$P0WO~Oz0XO!z0XO~Ol0YO$Q0VO~O#`0ZO~Ow0[O~O$P0]O~Oz0^O!z0^O~O$O0_O~O#[0`O~O$Q0aO~Oz0bO!z0bO~Ol0cO$Q0aO~O$P0dO~Ow0eO~O$P0fO~Oz0gO!z0gO~Oi0hO~O$Q0iO~Ol0jO$Q0iO~O$P0kO~O#[0lO~O$P0mO~Oz0nO!z0nO~O$O0oO~O$P0pO~O#[0qO~O$Q0rO~Oz0sO!z0sO~Ol0tO$Q0rO~O!f0uO~O#[0vO~O$Q0wO~Ol0xO$Q0wO~O$P0yO~O$P0zO~O$Q0{O~O$P0|O~O#[0}O~Oz1OO!z1OO~O#[1PO~O$Q1QO~O$Q1RO~O#f#[$O~",
  goto: "'z#{PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP#|$Q$U$^$dPPP$gPP%Z&Z&^&a&dPPPPPPPPP$Q&yPP&}PP$Q$Q'd'j'tTYOZTXOZSSOZT[P#PXROPZ#PR`QSSOZQ[PQ_QQ![tQ#R!^Q#v#PQ$t#xQ%q$uQ&d%kQ']&eR(T'^Q!YsQ!}![S#Q!^#PQ#u#OQ$r#xQ$w#{Q%o$uQ&b%kQ&g%nQ'Z&eQ'_&hQ(P'YQ(R'^Q(t(QR)f(uRu`R!]tR!_uQ#S!^Q#w#PQ$s#xQ%p$uQ&c%kQ'[&eR(S'^TUOZQ+f*tQ,Y+hQ,y,XQ-i,zQ.V-jQ.p.WR/W.qQZORoZQr^S!Wr!|R!|!ZQ$o#rR%i$o",
  nodeNames: "⚠ Account Admin Admin_name Admin_password Allowed_IP_List Api Api_allowed_prefixes Api_aws_role_arn Api_blocked_prefixes Api_provider As At Auto_refresh_materialized_views_on_secondary Aws_api_gateway Aws_private_api_gateway Azure_ad_application_id Azure_api_management Azure_tenant_id Before Blocked_IP_List Bool Business Business_critical Cascade Change Clone Columns Comment Create Critical Data_retention_time_in_days Database Default_ddl_collation Desc Describe Drop Edition Email Enabled Enterprise Exists False File First First_name Format From GroupLeft GroupRight IP If Ignoring In Integration Last Last_name List Max_data_extension_time_in_days Must Must_change_password Name Network Not Of Offset On Or Password Policy Region Region_group Replace Replica Restrict Role Schema Select Sequence Share Stage Standard Statement Table And Task Timestamp Transient True Type User View Warehouse Where Null Is LineComment SnowSQL Stmt SelectStmt Select_no_parens Select_base Target_list Star Identifier Comma Select_with_parens Opl Opr ColIdentifier From_clause From_list Where_clause ExpressionA NumberLiteral Add Sub Gtr Lss Eql Gte Lte StringLiteral CreateStmt CreateAccountStmt EqlSingle Sqt AccountOptional Dot Smc DescribeStmt DropStmt",
  maxTerm: 141,
  skippedNodes: [0,2,21,23,24,30,45,48,49,50,52,56,57,60,66,70,71,74,75,76,92,96],
  repeatNodeCount: 3,
  tokenData: "5S~RwX^#lpq#lrs$ast%Twx%`xy&hyz&mz{&r{|&w|}&|}!O'R!O!P'Y!Q!R(b!R![,t![!])h!]!^/f!^!_/m!_!`/z!`!a0T!c!k)h!k!l0b!l!p)h!p!q3Q!q!})h#R#S)h#S#T4v#T#])h#]#^0b#^#b)h#b#c3Q#c#o)h#y#z#l$f$g#l#BY#BZ#l$IS$I_#l$I|$JO#l$JT$JU#l$KV$KW#l&FU&FV#l~#qY#}~X^#lpq#l#y#z#l$f$g#l#BY#BZ#l$IS$I_#l$I|$JO#l$JT$JU#l$KV$KW#l&FU&FV#lP$fU#nPOY$aZr$ars$xs#O$a#O#P$}#P~$aP$}O#nPP%QPO~$a~%YQ#S~OY%TZ~%TR%gU#rQ#nPOY%yZw%ywx$xx#O%y#O#P&b#P~%yP&OU#nPOY%yZw%ywx$xx#O%y#O#P&b#P~%yP&ePO~%y~&mO#_~~&rO#`~~&wO#Z~~&|O#g~~'RO#]~T'YO#hS$OPo'aP$R`#tW!Q!['dV'kR#fP#[V!Q!['d!g!h't#X#Y'tV'wR{|(Q}!O(Q!Q![(WV(TP!Q![(WV(_P#fP#[V!Q![(WV(i_#fP#[Vwx)h!O!P*Y!P!Q)h!Q![,t![!])h!b!c)h!c!g)h!g!h+Y!h!})h#R#S)h#T#X)h#X#Y+Y#Y#l)h#l#m-t#m#o)hV)mX#[Vwx)h!O!P)h!P!Q)h!Q![)h![!])h!b!c)h!c!})h#R#S)h#T#o)hV*a]#fP#[Vwx)h!O!P)h!P!Q)h!Q![*Y![!])h!b!c)h!c!g)h!g!h+Y!h!})h#R#S)h#T#X)h#X#Y+Y#Y#o)hV+_Z#[Vwx)h{|(Q}!O(Q!O!P)h!P!Q)h!Q![,Q![!])h!b!c)h!c!})h#R#S)h#T#o)hV,XX#fP#[Vwx)h!O!P)h!P!Q)h!Q![,Q![!])h!b!c)h!c!})h#R#S)h#T#o)hV,{]#fP#[Vwx)h!O!P*Y!P!Q)h!Q![,t![!])h!b!c)h!c!g)h!g!h+Y!h!})h#R#S)h#T#X)h#X#Y+Y#Y#o)hV-yZ#[Vwx)h!O!P)h!P!Q)h!Q![.l![!])h!b!c)h!c!i.l!i!})h#R#S)h#T#Z.l#Z#o)hV.sZ#fP#[Vwx)h!O!P)h!P!Q)h!Q![.l![!])h!b!c)h!c!i.l!i!})h#R#S)h#T#Z.l#Z#o)hV/mO$QQ#uT~/rP#j~!_!`/u~/zO#m~V0TO$PQ#kS#qP~0YP#i~!_!`0]~0bO#l~V0g]#[Vwx)h!O!P)h!P!Q)h!Q![)h![!])h!b!c)h!c!p)h!p!q1`!q!})h#R#S)h#T#b)h#b#c1`#c#o)hV1e]#[Vwx)h!O!P)h!P!Q)h!Q![)h![!])h!b!c)h!c!h)h!h!i2^!i!})h#R#S)h#T#Y)h#Y#Z2^#Z#o)hV2eX#fP#[Vwx)h!O!P)h!P!Q)h!Q![)h![!])h!b!c)h!c!})h#R#S)h#T#o)hV3VZ#[Vwx)h!O!P)h!P!Q)h!Q![)h![!])h!b!c)h!c!d3x!d!})h#R#S)h#T#U3x#U#o)hV3}]#[Vwx)h!O!P)h!P!Q)h!Q![)h![!])h!b!c)h!c!p)h!p!q2^!q!})h#R#S)h#T#b)h#b#c2^#c#o)hP4yRO#S4v#S#T$x#T~4v",
  tokenizers: [0, 1, 2, 3, 4],
  topRules: {"SnowSQL":[0,97]},
  specialized: [{term: 104, get: (value, stack) => (specializeIdentifier(value) << 1)}],
  tokenPrec: 4463
});
// This file was generated by lezer-generator. You probably shouldn't edit it.
const 
  Account$1 = 1,
  Admin$1 = 2,
  Admin_name$1 = 3,
  Admin_password$1 = 4,
  Allowed_IP_List$1 = 5,
  Api$1 = 6,
  Api_allowed_prefixes$1 = 7,
  Api_aws_role_arn$1 = 8,
  Api_blocked_prefixes$1 = 9,
  Api_provider$1 = 10,
  As$1 = 11,
  At$1 = 12,
  Auto_refresh_materialized_views_on_secondary$1 = 13,
  Aws_api_gateway$1 = 14,
  Aws_private_api_gateway$1 = 15,
  Azure_ad_application_id$1 = 16,
  Azure_api_management$1 = 17,
  Azure_tenant_id$1 = 18,
  Before$1 = 19,
  Blocked_IP_List$1 = 20,
  Bool$1 = 21,
  Business$1 = 22,
  Business_critical$1 = 23,
  Cascade$1 = 24,
  Change$1 = 25,
  Clone$1 = 26,
  Columns$1 = 27,
  Comment$1 = 28,
  Create$1 = 29,
  Critical$1 = 30,
  Data_retention_time_in_days$1 = 31,
  Database$1 = 32,
  Default_ddl_collation$1 = 33,
  Desc$1 = 34,
  Describe$1 = 35,
  Drop$1 = 36,
  Edition$1 = 37,
  Email$1 = 38,
  Enabled$1 = 39,
  Enterprise$1 = 40,
  Exists$1 = 41,
  False$1 = 42,
  File$1 = 43,
  First$1 = 44,
  First_name$1 = 45,
  Format$1 = 46,
  From$1 = 47,
  GroupLeft$1 = 48,
  GroupRight$1 = 49,
  IP$1 = 50,
  If$1 = 51,
  Ignoring$1 = 52,
  In$1 = 53,
  Integration$1 = 54,
  Last$1 = 55,
  Last_name$1 = 56,
  List$1 = 57,
  Max_data_extension_time_in_days$1 = 58,
  Must$1 = 59,
  Must_change_password$1 = 60,
  Name$1 = 61,
  Network$1 = 62,
  Not$1 = 63,
  Of$1 = 64,
  Offset$1 = 65,
  On$1 = 66,
  Or$1 = 67,
  Password$1 = 68,
  Policy$1 = 69,
  Region$1 = 70,
  Region_group$1 = 71,
  Replace$1 = 72,
  Replica$1 = 73,
  Restrict$1 = 74,
  Role$1 = 75,
  Schema$1 = 76,
  Select$1 = 77,
  Sequence$1 = 78,
  Share$1 = 79,
  Stage$1 = 80,
  Standard$1 = 81,
  Statement$1 = 82,
  Table$1 = 83,
  And$1 = 84,
  Task$1 = 85,
  Timestamp$1 = 86,
  Transient$1 = 87,
  True$1 = 88,
  Type$1 = 89,
  User$1 = 90,
  View$1 = 91,
  Warehouse$1 = 92,
  Where$1 = 93,
  Null$1 = 94,
  Is$1 = 95,
  LineComment = 96,
  SnowSQL = 97,
  Stmt = 98,
  SelectStmt = 99,
  Select_no_parens = 100,
  Select_base = 101,
  Target_list = 102,
  Star = 103,
  Identifier$1 = 104,
  Comma = 105,
  Select_with_parens = 106,
  Opl = 107,
  Opr = 108,
  ColIdentifier = 109,
  From_clause = 110,
  From_list = 111,
  Where_clause = 112,
  ExpressionA = 113,
  NumberLiteral = 114,
  Add = 115,
  Sub = 116,
  Gtr = 117,
  Lss = 118,
  Eql = 119,
  Gte = 120,
  Lte = 121,
  StringLiteral = 122,
  CreateStmt = 123,
  CreateAccountStmt = 124,
  EqlSingle = 125,
  Sqt = 126,
  AccountOptional = 127,
  Dot = 128,
  Smc = 129,
  DescribeStmt = 130,
  DropStmt = 131;

export { Account$1 as Account, AccountOptional, Add, Admin$1 as Admin, Admin_name$1 as Admin_name, Admin_password$1 as Admin_password, Allowed_IP_List$1 as Allowed_IP_List, And$1 as And, Api$1 as Api, Api_allowed_prefixes$1 as Api_allowed_prefixes, Api_aws_role_arn$1 as Api_aws_role_arn, Api_blocked_prefixes$1 as Api_blocked_prefixes, Api_provider$1 as Api_provider, As$1 as As, At$1 as At, Auto_refresh_materialized_views_on_secondary$1 as Auto_refresh_materialized_views_on_secondary, Aws_api_gateway$1 as Aws_api_gateway, Aws_private_api_gateway$1 as Aws_private_api_gateway, Azure_ad_application_id$1 as Azure_ad_application_id, Azure_api_management$1 as Azure_api_management, Azure_tenant_id$1 as Azure_tenant_id, Before$1 as Before, Blocked_IP_List$1 as Blocked_IP_List, Bool$1 as Bool, Business$1 as Business, Business_critical$1 as Business_critical, Cascade$1 as Cascade, Change$1 as Change, Clone$1 as Clone, ColIdentifier, Columns$1 as Columns, Comma, Comment$1 as Comment, Create$1 as Create, CreateAccountStmt, CreateStmt, Critical$1 as Critical, Data_retention_time_in_days$1 as Data_retention_time_in_days, Database$1 as Database, Default_ddl_collation$1 as Default_ddl_collation, Desc$1 as Desc, Describe$1 as Describe, DescribeStmt, Dot, Drop$1 as Drop, DropStmt, Edition$1 as Edition, Email$1 as Email, Enabled$1 as Enabled, Enterprise$1 as Enterprise, Eql, EqlSingle, Exists$1 as Exists, ExpressionA, False$1 as False, File$1 as File, First$1 as First, First_name$1 as First_name, Format$1 as Format, From$1 as From, From_clause, From_list, GroupLeft$1 as GroupLeft, GroupRight$1 as GroupRight, Gte, Gtr, IP$1 as IP, Identifier$1 as Identifier, If$1 as If, Ignoring$1 as Ignoring, In$1 as In, Integration$1 as Integration, Is$1 as Is, Last$1 as Last, Last_name$1 as Last_name, LineComment, List$1 as List, Lss, Lte, Max_data_extension_time_in_days$1 as Max_data_extension_time_in_days, Must$1 as Must, Must_change_password$1 as Must_change_password, Name$1 as Name, Network$1 as Network, Not$1 as Not, Null$1 as Null, NumberLiteral, Of$1 as Of, Offset$1 as Offset, On$1 as On, Opl, Opr, Or$1 as Or, Password$1 as Password, Policy$1 as Policy, Region$1 as Region, Region_group$1 as Region_group, Replace$1 as Replace, Replica$1 as Replica, Restrict$1 as Restrict, Role$1 as Role, Schema$1 as Schema, Select$1 as Select, SelectStmt, Select_base, Select_no_parens, Select_with_parens, Sequence$1 as Sequence, Share$1 as Share, Smc, SnowSQL, Sqt, Stage$1 as Stage, Standard$1 as Standard, Star, Statement$1 as Statement, Stmt, StringLiteral, Sub, Table$1 as Table, Target_list, Task$1 as Task, Timestamp$1 as Timestamp, Transient$1 as Transient, True$1 as True, Type$1 as Type, User$1 as User, View$1 as View, Warehouse$1 as Warehouse, Where$1 as Where, Where_clause, parser };
