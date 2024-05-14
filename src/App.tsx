import './App.css';
import React, {useEffect, useState} from 'react';
import {bitable, dashboard, DashboardState, IDataCondition, Rollup} from "@lark-base-open/js-sdk";
import {Button, ConfigProvider, DatePicker, Input, Select, Spin} from '@douyinfe/semi-ui';
import dayjs from 'dayjs';
import "./i18n/index"
import {useTranslation} from "react-i18next";

import zhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import enUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';

import classnames from 'classnames'
import classNames from 'classnames'
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';

interface IMileStoneConfig{
    title: string;
    dateType: 'date' | 'ref';
    dateInfo: any;
    target: number;
    format: string;
    color: string;
}

const formatOptions = ['YYYY/MM/DD','YYYY-MM-DD','MM-DD','MM/DD/YY','DD/MM/YY']

const colors = ["#1F2329","#1456F0","#7A35F0","#35BD4B","#2DBEAB","#FFC60A","#FF811A","#F54A45"]


dayjs.locale('zh-cn');

function CheckIcon({color}: {color: string}) {
    return <svg width="24" height="24" viewBox="0 0 24 24" fill="none"
                xmlns="http://www.w3.org/2000/svg">
        <path
            d="M6 1C3.23858 1 1 3.23858 1 6V18C1 20.7614 3.23858 23 6 23H18C20.7614 23 23 20.7614 23 18V6C23 3.23858 20.7614 1 18 1H6Z"
            stroke={color} stroke-width="2"/>
        <path
            d="M3 7C3 4.79086 4.79086 3 7 3H17C19.2091 3 21 4.79086 21 7V17C21 19.2091 19.2091 21 17 21H7C4.79086 21 3 19.2091 3 17V7Z"
            fill={color}/>
        <path
            d="M10.145 15.6067L17.221 8.5308C17.4785 8.27328 17.8963 8.27503 18.1538 8.53257C18.4145 8.79326 18.4119 9.218 18.1468 9.4741C15.8213 11.7202 15.3281 12.1957 10.7628 16.6346C10.3818 17.005 9.7738 17.0164 9.38695 16.6522C8.19119 15.5262 7.06993 14.4154 5.90217 13.2492C5.64195 12.9893 5.64287 12.5674 5.90292 12.3074C6.16298 12.0473 6.58477 12.0464 6.84482 12.3064L10.145 15.6067Z"
            fill="white"/>
    </svg>
}

export function SelectRefDate({config, setConfig}:{config: IMileStoneConfig, setConfig: any}) {

    const [tables, setTables] = React.useState<any[]>([]);
    const [fields, setFields] = React.useState<any[]>([]);
    const {t} = useTranslation()
    async function getTables() {
        let tables = await bitable.base.getTableMetaList();
        setTables(tables);
        if (config.dateType === 'ref' && config.dateInfo.tableId) {
            console.log("you have table id")
            getDateFields(config.dateInfo.tableId);
        }
    }
    React.useEffect(()=>{
        getTables();
    }, [])

    async function getDateFields(table_id:string){
        console.log("获取", table_id)
        let table = await bitable.base.getTableById(table_id);
        let fields = await table.getFieldMetaListByType(5);
        setFields(fields)
        setConfig({
            ...config,
            dateInfo: {
                ...config.dateInfo,
                tableId: table_id
            }
        })
    }

    return (<div>
        <div className={'form-item'}>
            <div className={'label'} style={{marginTop:8}}>{t("数据源")}</div>
            <Select
                onChange={async (v)=>{
                    await getDateFields(v as string);
                    setConfig({
                        ...config,
                        dateInfo: {
                            tableId: v,
                            fieldId: '',
                            dateType: 'earliest'
                        }
                    })
                }}
                value={config.dateInfo.tableId}
                style={{
                    width: "100%"
                }}
                placeholder={t('请选择数据源')}
                optionList={tables.map(item=>{
                return {
                    label: <div style={{
                        display: "flex",
                        alignItems: "center"
                    }}>
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M1.33203 2.66634C1.33203 1.92996 1.92898 1.33301 2.66536 1.33301H13.332C14.0684 1.33301 14.6654 1.92996 14.6654 2.66634V13.333C14.6654 14.0694 14.0684 14.6663 13.332 14.6663H2.66536C1.92899 14.6663 1.33203 14.0694 1.33203 13.333V2.66634ZM2.66536 2.66634V13.333H13.332V2.66634H2.66536Z"
                                fill="#646A73"/>
                            <path
                                d="M8.33203 4.66634C7.96384 4.66634 7.66536 4.96482 7.66536 5.33301C7.66536 5.7012 7.96384 5.99967 8.33203 5.99967H11.332C11.7002 5.99967 11.9987 5.7012 11.9987 5.33301C11.9987 4.96482 11.7002 4.66634 11.332 4.66634H8.33203Z"
                                fill="#646A73"/>
                            <path
                                d="M3.9987 5.33301C3.9987 4.96482 4.29718 4.66634 4.66536 4.66634H5.9987C6.36689 4.66634 6.66536 4.96482 6.66536 5.33301C6.66536 5.7012 6.36689 5.99967 5.9987 5.99967H4.66536C4.29717 5.99967 3.9987 5.7012 3.9987 5.33301Z"
                                fill="#646A73"/>
                            <path
                                d="M8.33203 7.33301C7.96384 7.33301 7.66536 7.63148 7.66536 7.99967C7.66536 8.36786 7.96384 8.66634 8.33203 8.66634H11.332C11.7002 8.66634 11.9987 8.36786 11.9987 7.99967C11.9987 7.63148 11.7002 7.33301 11.332 7.33301H8.33203Z"
                                fill="#646A73"/>
                            <path
                                d="M3.9987 7.99967C3.9987 7.63148 4.29718 7.33301 4.66536 7.33301H5.9987C6.36689 7.33301 6.66536 7.63148 6.66536 7.99967C6.66536 8.36786 6.36689 8.66634 5.9987 8.66634H4.66536C4.29717 8.66634 3.9987 8.36786 3.9987 7.99967Z"
                                fill="#646A73"/>
                            <path
                                d="M8.33203 9.99967C7.96384 9.99967 7.66536 10.2982 7.66536 10.6663C7.66536 11.0345 7.96384 11.333 8.33203 11.333H11.332C11.7002 11.333 11.9987 11.0345 11.9987 10.6663C11.9987 10.2982 11.7002 9.99967 11.332 9.99967H8.33203Z"
                                fill="#646A73"/>
                            <path
                                d="M3.9987 10.6663C3.9987 10.2982 4.29718 9.99967 4.66536 9.99967H5.9987C6.36689 9.99967 6.66536 10.2982 6.66536 10.6663C6.66536 11.0345 6.36689 11.333 5.9987 11.333H4.66536C4.29717 11.333 3.9987 11.0345 3.9987 10.6663Z"
                                fill="#646A73"/>
                        </svg>
                        <div style={{marginLeft:2}}>
                            {item.name}
                        </div>
                    </div>,
                    value: item.id,
                }
                })}/>
        </div>
        <div className={'form-item'}>
            <div className={'label'}>
                {t('日期字段')}
            </div>
            <Select
                style={{
                    width: "100%"
                }}
                onChange={v => {
                    setConfig({
                        ...config,
                        dateInfo: {
                            ...config.dateInfo,
                            fieldId: v
                        }
                    })
                }}
                value={config.dateInfo.fieldId}
                placeholder={t('请选择日期字段')}
                optionList={fields.map(item => {
                    return {
                        label: (<div style={{
                            display: 'flex',
                            alignItems: 'center'
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M4.66536 1.33301C5.03355 1.33301 5.33203 1.63148 5.33203 1.99967H10.6654C10.6654 1.63148 10.9638 1.33301 11.332 1.33301C11.7002 1.33301 11.9987 1.63148 11.9987 1.99967C12.2748 1.99967 12.8119 1.99967 13.3321 1.99967C14.0684 1.99967 14.6654 2.59663 14.6654 3.33301V13.333C14.6654 14.0694 14.0684 14.6663 13.332 14.6663H2.66536C1.92899 14.6663 1.33203 14.0694 1.33203 13.333L1.33203 3.33301C1.33203 2.59663 1.92896 1.99967 2.66534 1.99967C3.18554 1.99967 3.72257 1.99967 3.9987 1.99967C3.9987 1.63148 4.29717 1.33301 4.66536 1.33301ZM10.6654 3.33301H5.33203C5.33203 3.7012 5.03355 3.99967 4.66536 3.99967C4.29717 3.99967 3.9987 3.7012 3.9987 3.33301H2.66536V13.333H13.332V3.33301H11.9987C11.9987 3.7012 11.7002 3.99967 11.332 3.99967C10.9638 3.99967 10.6654 3.7012 10.6654 3.33301ZM5.9987 9.99967C5.9987 9.63148 5.70022 9.33301 5.33203 9.33301H4.66536C4.29717 9.33301 3.9987 9.63149 3.9987 9.99967V10.6663C3.9987 11.0345 4.29717 11.333 4.66536 11.333H5.33203C5.70022 11.333 5.9987 11.0345 5.9987 10.6663V9.99967ZM6.9987 6.66634C6.9987 6.29815 7.29718 5.99967 7.66536 5.99967H8.33203C8.70022 5.99967 8.9987 6.29815 8.9987 6.66634V7.33301C8.9987 7.7012 8.70022 7.99967 8.33203 7.99967H7.66536C7.29717 7.99967 6.9987 7.7012 6.9987 7.33301V6.66634ZM8.9987 9.99967C8.9987 9.63148 8.70022 9.33301 8.33203 9.33301H7.66536C7.29717 9.33301 6.9987 9.63149 6.9987 9.99967V10.6663C6.9987 11.0345 7.29718 11.333 7.66536 11.333H8.33203C8.70022 11.333 8.9987 11.0345 8.9987 10.6663V9.99967ZM9.9987 9.99967C9.9987 9.63148 10.2972 9.33301 10.6654 9.33301H11.332C11.7002 9.33301 11.9987 9.63149 11.9987 9.99967V10.6663C11.9987 11.0345 11.7002 11.333 11.332 11.333H10.6654C10.2972 11.333 9.9987 11.0345 9.9987 10.6663V9.99967ZM11.9987 6.66634C11.9987 6.29815 11.7002 5.99967 11.332 5.99967H10.6654C10.2972 5.99967 9.9987 6.29815 9.9987 6.66634V7.33301C9.9987 7.7012 10.2972 7.99967 10.6654 7.99967H11.332C11.7002 7.99967 11.9987 7.7012 11.9987 7.33301V6.66634Z"
                                fill="#646A73"/>
                        </svg>
                        <div style={{marginLeft:2}}>
                            {item.name}
                        </div>
                    </div>),
                    value: item.id,
                }
                })}
            >

            </Select>
        </div>
        <div className={'form-item'}>
            <div className={"tab-wrap"}>
                <div
                    onClick={() => {
                        setConfig({
                            ...config,
                            dateInfo: {
                                ...config.dateInfo,
                                dateType: 'earliest'
                            }
                        })
                    }}
                    className={classnames({
                        "tab-item": true,
                        "active": (!config.dateInfo || config.dateInfo.dateType === 'earliest')
                    })}>
                    {t('最早日期')}
                </div>
                <div
                    onClick={() => {
                        setConfig({
                            ...config,
                            dateInfo: {
                                ...config.dateInfo,
                                dateType: 'latest'
                            }
                        })
                    }}
                    className={classnames({
                        "tab-item": true,
                        "active": (config.dateInfo && config.dateInfo.dateType === 'latest')
                    })}>
                    {t('最晚日期')}
                </div>
            </div>
        </div>

    </div>)

}

export default function App() {
    const [locale, setLocale] = useState(zhCN);
    const {t} = useTranslation()
    const [config, setConfig] = useState<IMileStoneConfig>({
        title: "Project Launch Time",
        color: '#373C43',
        dateType: 'date',
        dateInfo: {},
        target: Date.now(),
        format: 'YYYY-MM-DD',
    })

    const isCreate = dashboard.state === DashboardState.Create
    /** 是否配置模式下 */
    const isConfig = dashboard.state === DashboardState.Config || isCreate;

    const changeDateType = (type: 'date' | 'ref') => {
        let dateInfo = {}
        if (type === 'date') {
        }
        if (type === 'ref') {
            dateInfo = {
                tableId: '',
                fieldId: '',
                dateType: 'earliest'
            }
        }
        setConfig({
            ...config,
            dateType: type,
            dateInfo
        })
    }
    const changeLang = (lang: 'en-us' | 'zh-cn') => {
        if (lang === 'zh-cn') {
            setLocale(zhCN);
            dayjs.locale('zh-cn');
        } else {
            setLocale(enUS);
            dayjs.locale('en-ud');
        }
    }

    const updateConfig = (res: any) => {
        const {customConfig} = res;
        if (customConfig) {
            setConfig(customConfig as any)
            setTimeout(() => {
                // 预留3s给浏览器进行渲染，3s后告知服务端可以进行截图了
                dashboard.setRendered();
            }, 3000);
        }

    }

    React.useEffect(() => {
        if (isCreate) {
            return
        }
        // 初始化获取配置
        dashboard.getConfig().then(updateConfig);
    }, []);


    React.useEffect(() => {
        const offConfigChange = dashboard.onConfigChange((r) => {
            // 监听配置变化，协同修改配置
            updateConfig(r.data);
        });
        return () => {
            offConfigChange();
        }
    }, []);

    const onClick = () => {
        // 保存配置
        console.log("保存配置", config)
        let dataConditions:IDataCondition[]|null = []
        if (config.dateType === 'ref'){
            dataConditions = [{
                tableId: config.dateInfo.tableId,
                series: [{
                    fieldId: config.dateInfo.fieldId,
                    rollup: config.dateInfo.dateType === 'earliest' ? Rollup.MIN : Rollup.MAX
                }]
            }]
        }
        dashboard.saveConfig({
            customConfig: config,
            dataConditions: dataConditions,
        } as any)
    }

    return (
        <main className={classnames({
            'main-config': isConfig,
            'main': true,
        })}>

            <ConfigProvider locale={locale}>

                <div className='content'>
                    <MileStone config={config} isConfig={isConfig} />
                    {/*<Countdown*/}
                    {/*    key={config.target}*/}
                    {/*    config={config}*/}
                    {/*    initialTime={0}*/}
                    {/*    isConfig={isConfig}*/}
                    {/*/>*/}
                </div>
                {
                    isConfig && (
                        <div className='config-panel'>
                            <div className='form'>
                                <div className='form-item'>
                                    <div className='label'>{t("日期标题")}</div>
                                    <Input
                                        value={config.title}
                                        onChange={(v) => {
                                            setConfig({
                                                ...config,
                                                title: v
                                            })
                                        }}/>
                                </div>
                                <div className='form-item'>
                                    <div className={'label'}>{t('日期')}</div>
                                    <div className={'common-wrap'}>
                                        <div style={{
                                            color: '#646A73',
                                            fontSize: 12,
                                        }}>
                                            {t('选择日期')}
                                        </div>
                                        <div className={'tab-wrap'}>
                                            <div
                                                onClick={() => changeDateType('date')}
                                                className={classNames({
                                                    'active': config.dateType === 'date',
                                                    'tab-item': true,
                                                })}>
                                                {t('指定日期')}
                                            </div>
                                            <div
                                                onClick={() => changeDateType('ref')}
                                                className={classNames({
                                                    'active': config.dateType === 'ref',
                                                    'tab-item': true,
                                                })}>
                                                {t('选择日期')}
                                            </div>
                                        </div>
                                        {
                                            config.dateType === 'date' && (
                                                <div>
                                                    <DatePicker
                                                        format={"yyyy/MM/dd"}
                                                        style={{width: '100%', marginTop: 8}}
                                                        value={new Date(config.target)}
                                                        onChange={(date) => {
                                                            setConfig({
                                                                ...config,
                                                                target: new Date(date as string).getTime(),
                                                            })
                                                        }}
                                                    />
                                                </div>
                                            )
                                        }

                                        {
                                            config.dateType === 'ref' && (
                                                <SelectRefDate config={config} setConfig={setConfig}/>
                                            )
                                        }
                                    </div>
                                </div>

                                <div className={'form-item'}>
                                    <div className={'common-wrap'}>
                                        <div style={{
                                            color: '#646A73',
                                            fontSize: 12,
                                        }}>
                                            {t('日期格式')}
                                        </div>
                                        <Select
                                            style={{
                                                marginTop: 8,
                                                width: '100%',
                                            }}
                                            value={config.format}
                                            onChange={(v)=>{
                                                if (!v) return
                                                setConfig({
                                                    ...config,
                                                    format: v as string,
                                                })
                                            }}
                                            optionList={formatOptions.map((v) => ({
                                                label: dayjs(config.target).format(v),
                                                value: v,
                                            }))}></Select>
                                    </div>
                                </div>

                                <div className='form-item'>
                                    <div style={{
                                        color: '#646A73',
                                        fontSize: 12,
                                    }}>
                                        {t('图标颜色')}
                                    </div>
                                    <div style={{
                                        display: 'flex',
                                        marginTop: 8
                                    }}>
                                        {
                                            colors.map(item=>{
                                                if (config.color === item){
                                                    return  <div style={{
                                                        marginRight: 7,
                                                    }}>
                                                        <CheckIcon color={item} />
                                                    </div>
                                                }
                                                return <div
                                                    onClick={()=>{
                                                        setConfig({
                                                            ...config,
                                                            color: item,
                                                        })
                                                    }}
                                                    style={{
                                                    width: 18,
                                                    height: 18,
                                                    borderRadius: 4,
                                                    background: item,
                                                        padding: 2,
                                                        textAlign: 'center',
                                                    marginRight: 7,
                                                }}>
                                                </div>
                                            })
                                        }

                                    </div>
                                </div>
                            </div>

                            <Button
                                className='btn'
                                type="primary"
                                autoInsertSpace={false}
                                onClick={onClick}
                            >
                                {t('确定')}
                            </Button>
                        </div>
                    )
                }
            </ConfigProvider>

        </main>
    )
}


function MileStone({config, isConfig}:{
    config: IMileStoneConfig,
    isConfig: boolean
}) {

    const {title, format, color,target} = config
    const [time, setTime] = useState("")
    const {t} = useTranslation()

    useEffect(()=>{
        async function getTime(){
            if(isConfig){
                console.log('正在配置中',config)
                let tableId = config.dateInfo.tableId
                let fieldId = config.dateInfo.fieldId
                let dateType = config.dateInfo.dateType
                let type = dateType === 'earliest' ? Rollup.MIN : Rollup.MAX
                let data = await dashboard.getPreviewData({
                    tableId: tableId,
                    series: [{
                        fieldId: fieldId,
                        rollup: type
                    }]
                })
                let time = data[1][0].text
                setTime(dayjs(time).format(format))
            }else {
                console.log('正式环境,获取数据', config)
                let info = await dashboard.getData()
                console.log("正式环境的 info", info)
                let time = info[1][0].text
                setTime(dayjs(time).format(format))
            }
        }

        if (config.dateType === "ref"){
            getTime()
        }else {
            setTime(dayjs(config.target).format(config.format))
        }

    },[config, isConfig])


    return (
        <Spin spinning={!time}>
        <div style={{width: '100vw', textAlign: 'center', overflow: 'hidden'}}>
            <div style={{
                display:"flex",
                justifyContent:"center"
            }}>
                <div>
                    <svg style={{
                        width: "18vmin",
                        height: "17vmin",
                    }} width="91" height="90" viewBox="0 0 91 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="90" height="90" rx="20" fill={config.color} fill-opacity="0.1"/>
                        <path
                            d="M63.8286 37.125C59.9929 37.7571 53.7357 37.9286 49.5786 30.0429C45.1214 21.5679 37.9214 21.3107 33.7107 22.0821C31.6643 22.4571 30.1321 24.1714 30.1321 25.8321V46.8964C31.3429 47.3571 32.6393 46.875 32.9714 46.8107C33.0571 46.7893 33.1321 46.7786 33.2286 46.7571C35.9071 46.1679 38.7357 45.8893 45.7429 49.2536C54.5286 53.4643 62.2214 45.7071 65.2 40.3071C65.4143 39.9321 66.1321 38.1429 66.1321 36.4286C65.0929 36.8571 63.8286 37.125 63.8286 37.125ZM27.5714 21H25.8571C25.3857 21 25 21.3857 25 21.8571V68.1429C25 68.6143 25.3857 69 25.8571 69H27.5714C28.0429 69 28.4286 68.6143 28.4286 68.1429V21.8571C28.4286 21.3857 28.0429 21 27.5714 21Z"
                            fill={config.color}/>
                    </svg>
                </div>
                <div style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                }}>
                    <div style={{
                        fontSize: "7vmin",
                        color: "#373c44",
                        fontWeight: 600,
                        padding: "0.4vmin"
                    }}>
                        {time}
                    </div>
                    <div style={{
                        fontSize: "2.5vmin",
                        color: "#5f6369",
                        padding: "0.4vmin",
                        textAlign:"left",
                        fontWeight: 500,
                    }}>
                        {title}
                    </div>
                </div>
            </div>
        </div>
        </Spin>
    );

}
