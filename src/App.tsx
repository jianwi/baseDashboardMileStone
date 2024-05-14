import './App.css';
import React, {useEffect, useState} from 'react';
import {bitable, dashboard, DashboardState, IDataCondition, Rollup} from "@lark-base-open/js-sdk";
import {Button, ConfigProvider, DatePicker, Input, Select, Spin} from '@douyinfe/semi-ui';
import {getTime} from './utils';
import dayjs from 'dayjs';

import zhCN from '@douyinfe/semi-ui/lib/es/locale/source/zh_CN';
import enUS from '@douyinfe/semi-ui/lib/es/locale/source/en_US';

import classnames from 'classnames'
import classNames from 'classnames'
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import {set} from "@douyinfe/semi-foundation/lib/es/utils/object";

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

function CheckIcon({color}) {
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

export function SelectRefDate({config, setConfig}) {

    const [tables, setTables] = React.useState<any[]>([]);
    const [fields, setFields] = React.useState<any[]>([]);
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

    async function getDateFields(table_id){
        console.log("获取", table_id)
        let table = await bitable.base.getTableById(table_id);
        let fields = await table.getFieldMetaListByType(5);
        setFields(fields)
        setConfig({
            ...config,
            dateInfo: {
                ...config.dateInfo,
                tableId: table_id,
                fieldId: config.dateInfo.fieldId
            }
        })
    }

    return (<div>
        <div className={'form-item'}>
            <div className={'label'} style={{marginTop:8}}>数据源</div>
            <Select
                onChange={v=>{
                    setConfig({
                        ...config,
                        dateInfo: {
                            tableId: v,
                            fieldId: '',
                            dateType: 'earliest'
                        }
                    })
                    getDateFields(v);
                }}
                value={config.dateInfo.tableId}
                style={{
                    width: "100%"
                }}
                placeholder={'请选择数据源'}
                optionList={tables.map(item=>{
                return {
                    label: item.name,
                    value: item.id,
                }
            })}/>
        </div>
        <div className={'form-item'}>
            <div className={'label'}>
                日期字段
            </div>
            <Select
                style={{
                    width: "100%"
                }}
                onChange={v=>{
                    setConfig({
                        ...config,
                        dateInfo: {
                            ...config.dateInfo,
                            fieldId: v
                        }
                    })
                }}
                value={config.dateInfo.fieldId}
                placeholder={'请选择日期字段'}
                optionList={fields.map(item=>{
                return {
                    label: item.name,
                    value: item.id,
                }})}
            >

            </Select>
        </div>
        <div className={'form-item'}>
            <div className={"tab-wrap"}>
                <div
                    onClick={()=>{
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
                    最早日期
                </div>
                <div
                    onClick={()=>{
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
                    最晚日期
                </div>
            </div>
        </div>

    </div>)
    
}

export default function App() {
    const [locale, setLocale] = useState(zhCN);
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
                                    <div className='label'>日期标题</div>
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
                                    <div className={'label'}>日期</div>
                                    <div className={'common-wrap'}>
                                        <div style={{
                                            color: '#646A73',
                                            fontSize: 12,
                                        }}>
                                            选择日期
                                        </div>
                                        <div className={'tab-wrap'}>
                                            <div
                                                onClick={() => changeDateType('date')}
                                                className={classNames({
                                                    'active': config.dateType === 'date',
                                                    'tab-item': true,
                                                })}>
                                                指定日期
                                            </div>
                                            <div
                                                onClick={() => changeDateType('ref')}
                                                className={classNames({
                                                    'active': config.dateType === 'ref',
                                                    'tab-item': true,
                                                })}>
                                                选择日期
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
                                                                target: new Date(date).getTime(),
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
                                            日期格式
                                        </div>
                                        <Select
                                            style={{
                                                marginTop: 8,
                                                width: '100%',
                                            }}
                                            value={config.format}
                                            onChange={(v)=>{
                                                setConfig({
                                                    ...config,
                                                    format: v,
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
                                        图标颜色
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
                                size="middle"
                                type="primary"
                                autoInsertSpace={false}
                                onClick={onClick}
                            >
                                确定
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
                    <svg width="91" height="90" viewBox="0 0 91 90" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" width="90" height="90" rx="20" fill={config.color} fill-opacity="0.1"/>
                        <path
                            d="M63.8286 37.125C59.9929 37.7571 53.7357 37.9286 49.5786 30.0429C45.1214 21.5679 37.9214 21.3107 33.7107 22.0821C31.6643 22.4571 30.1321 24.1714 30.1321 25.8321V46.8964C31.3429 47.3571 32.6393 46.875 32.9714 46.8107C33.0571 46.7893 33.1321 46.7786 33.2286 46.7571C35.9071 46.1679 38.7357 45.8893 45.7429 49.2536C54.5286 53.4643 62.2214 45.7071 65.2 40.3071C65.4143 39.9321 66.1321 38.1429 66.1321 36.4286C65.0929 36.8571 63.8286 37.125 63.8286 37.125ZM27.5714 21H25.8571C25.3857 21 25 21.3857 25 21.8571V68.1429C25 68.6143 25.3857 69 25.8571 69H27.5714C28.0429 69 28.4286 68.6143 28.4286 68.1429V21.8571C28.4286 21.3857 28.0429 21 27.5714 21Z"
                            fill={config.color}/>
                    </svg>
                </div>
                <div>
                    <div style={{
                        fontSize: 32,
                        color: "#333",
                        fontWeight: 700,
                        padding: "15px 10px "
                    }}>
                        {time}
                    </div>
                    <div style={{
                        fontSize: 18,
                        color: "#666",
                        paddingLeft: "10px",
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

function Countdown({config, initialTime, isConfig}: {
    config: ICountDownConfig,
    initialTime: number,
    isConfig: boolean
}) {
    const {units, target, color} = config
    const [time, setTime] = useState(target ?? 0);
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(time => {
                return time - 1;
            });
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    const timeCount = getTime({target: target, units: units.map((v) => availableUnits[v])})


    if (time <= 0) {
        return (
            <div style={{
                fontSize: 26
            }}>
                请点击右上角配置时间
            </div>
        )
    }

    return (
        <div style={{width: '100vw', textAlign: 'center', overflow: 'hidden'}}>

        {config.othersConfig.includes('showTitle') ? <p className={classnames('count-down-title', {
                'count-down-title-config': isConfig
            })}>
                距离: {convertTimestamp(target * 1000)} 还有
            </p> : null}
            <div className='number-container' style={{ color }}>
                {timeCount.units.sort((a, b) => b.unit - a.unit).map(({ count, title }) => {
                    return <div key={title}>
                        <div className='number'>{count}</div>
                        <div className='number-title'>{title} </div>
                    </div>
                })}
            </div>

        </div>
    );
}

function convertTimestamp(timestamp: number) {
    const date = new Date(timestamp);
    return dayjs(timestamp).format('YYYY-MM-DD HH:mm:ss')
}

