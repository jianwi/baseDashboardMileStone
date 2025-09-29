
const config = [
    ["batchDelete","批量删除","Batch Delete","バッチ削除"],
    ["delete","删除","Delete","削除"],
    ['日期标题',"日期标题","Date Title","日付タイトル"],
    ['数据源',"数据源","Data Source","データソース"],
    ['请选择数据源',"请选择数据源","Please select data source","データソースを選択してください"],
    ['日期字段',"日期字段","Date Field","日付フィールド"],
    ['请选择日期字段',"请选择日期字段","Please select date field","日付フィールドを選択してください"],
    ['最小日期',"最小日期","Earliest Date","最も早い日付"],
    ["最大日期","最大日期","Latest Date","最新の日付"],
    ['日期',"日期","Date","日付"],
    ['选择日期',"选择日期","Select Date","日付を選択"],
    ['指定日期',"指定日期","Specified Date","指定日付"],
    ['日期格式',"日期格式","Date Format","日付形式"],
    ['图标颜色',"图标颜色","Icon Color","アイコンの色"],
    ['确定',"确定","Confirm","確認"],
    ['距离目标日期{{count}}天',"距离目标日期{{count}}天","{{count}} days from target date","目標日から{{count}}日"],
    ['已超过设定日期',"已超过设定日期","Exceeded the set date","設定日を超過しました"],
    ['项目启动日期',"项目启动日期","Project Launch Date","プロジェクトの開始日"],
    ['选择文件',"选择文件","Select File","ファイルを選択"],
    ['拖拽svg到这里上传，或者',"拖拽svg到这里上传，或者","Drag and drop svg here to upload, or","ここにsvgをドラッグしてアップロードするか、または"],
    ['自定义图标',"自定义图标","Custom Icon","カスタムアイコン"],
    ['预设图标',"预设图标","Preset Icon","プリセットアイコン"],
    ['图标',"图标","Icon","アイコン"]
]


let rr = {
    zh: {},
    en: {},
    ja: {}
}
config.forEach(item => {
    // @ts-ignore
    rr.zh[item[0]] = item[1]
    // @ts-ignore
    rr.en[item[0]] = item[2]
    // @ts-ignore
    rr.ja[item[0]] = item[3]
})

export default rr
