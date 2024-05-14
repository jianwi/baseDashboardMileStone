
const config = [
    ["batchDelete","批量删除","Batch Delete","バッチ削除"],
    ["delete","删除","Delete","削除"],
    ['日期标题',"日期标题","Date Title","日付タイトル"],
    ['数据源',"数据源","Data Source","データソース"],
    ['请选择数据源',"请选择数据源","Please select data source","データソースを選択してください"],
    ['日期字段',"日期字段","Date Field","日付フィールド"],
    ['请选择日期字段',"请选择日期字段","Please select date field","日付フィールドを選択してください"],
    ['最早日期',"最早日期","Earliest Date","最も早い日付"],
    ["最晚日期","最晚日期","Latest Date","最新の日付"],
    ['日期',"日期","Date","日付"],
    ['选择日期',"选择日期","Select Date","日付を選択"],
    ['指定日期',"指定日期","Specified Date","指定日付"],
    ['日期格式',"日期格式","Date Format","日付形式"],
    ['图标颜色',"图标颜色","Icon Color","アイコンの色"],
    ['确定',"确定","Confirm","確認"],





]


let rr = {
    zh: {},
    en: {},
    ja: {}
}
config.forEach(item => {
    rr.zh[item[0]] = item[1]
    rr.en[item[0]] = item[2]
    rr.ja[item[0]] = item[3]
})

export default rr
