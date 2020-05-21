function pluralize(time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo(time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }

  if ((time + '').length === 10) {
    time = +time * 1000
  }

  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    date = new Date(parseInt(time))
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

/* 数字 格式化*/
export function nFormatter(num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function html2Text(val) {
  const div = document.createElement('div')
  div.innerHTML = val
  return div.textContent || div.innerText
}

export function toThousandslsFilter(num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function accountingFilter(val) {
  let match = ''
  if (val === '') {
    match = `--`
  } else {
    match = `￥${val.toFixed(2)}`
  }
  return match
}

// 港口代码对照表
export function portCodeFilter(val) {
  const map = {
    5184: '5184-滘口港',
    5189: '5189-新港',
    5182: '5182-澜石港',
    5153: '5153-容奇港',
    5154: '5154-北滘港',
    51541: '51541-北滘港一期',
    51542: '51542-北滘港二期',
    5158: '5158-勒流港',
    5112: '5112-九江港',
    5113: '5113-北村港',
    5114: '5114-平洲港',
    5119: '5119-三山港',
    5183: '5183-西南码头',
    5194: '5194-三水港',
    5181: '5181-珠江码头',
    5138: '5138-食出码头'
  }
  return map[val]
}

// 集装箱位置
export function locationFilter(val) {
  const map = {
    OBV: 'OBV-船上位置',
    NGI: 'NGI-闸口入场位置',
    NGO: 'NGO-闸口出场位置',
    THA: 'THA-拖车停泊处',
    MLO: 'MLO-失踪箱位置',
    YAR: 'YAR-堆场',
    CFS: 'CFS-交接库',
    CIP: 'CIP-海关验货台',
    CRS: 'CRS-修理站',
    OSD: 'OSD-码头外堆场'
  }
  return map[val]
}

// 集装箱作业类型
export function activityTypeFilter(val) {
  const map = {
    CI: 'CI-更改箱号',
    CL: 'CL-取消装船',
    CO: 'CO-更改箱主',
    CP: 'CP-更改卸货港',
    CS: 'CS-更改箱状态',
    CV: 'CV-更改航次',
    DG: 'DG-码头外堆场交箱',
    DP: 'DP-码头外堆场提箱',
    DT: 'DT-集装箱扣留',
    FG: 'FG-CFS回场',
    FP: 'FP-CFS装拆',
    GI: 'GI-闸口交箱',
    GO: 'GO-闸口提箱',
    IG: 'IG-关检交箱',
    IP: 'IP-关检提箱',
    MC: 'MC-失踪箱申报',
    MD: 'MD-失踪箱删除',
    RG: 'RG-修理站交箱',
    RP: 'RP-修理站提箱',
    RT: 'RT-集装箱放行',
    VD: 'VD-卸船',
    VL: 'VL-装船',
    YM: 'YM-场内搬移',
    YS: 'YS-位置更改',
    HR: 'HR-海关放行'
  }
  return map[val]
}

// 散货作业类型
export function bulkTypeFilter(val) {
  const map = {
    FP: 'FP-装拆',
    GI: 'GI-入闸',
    GO: 'GO-出闸',
    WI: 'WI-入仓',
    WO: 'WO-出仓',
    VD: 'VD-卸船',
    VL: 'VL-装船',
    YM: 'YM-搬移'
  }
  return map[val]
}

// 集装箱状态
export function containerStatusFilter(val) {
  const map = {
    EM: 'EM-空箱',
    IF: 'IF-入口重箱',
    IM: 'IM-入口空箱',
    XF: 'XF-出口重箱',
    XM: 'XM-出口空箱',
    TF: 'TF-中转入口重箱',
    TM: 'TM-中转入口空箱',
    OF: 'OF-中转出口重箱',
    OM: 'OM-中转出口空箱',
    RE: 'RE-船上捣载',
    SH: 'SH-船上搬移',
    XI: 'XI-入口转出口',
    XW: 'XW-取消出口'
  }
  return map[val]
}

// 集装箱类型
export function containerTypeFilter(val) {
  const map = {
    GP: 'GP-干货箱',
    'GH(HC/HQ)': 'GH(HC/HQ)-干货高箱',
    HT: 'HT-挂衣箱',
    OT: 'OT-开顶箱',
    RF: 'RF-冷冻箱',
    RH: 'RH-冷高箱',
    TK: 'TK-油罐箱',
    FR: 'FR-框架箱'
  }
  return map[val]
}

// 散货包装类型
export function bulkPackingFilter(val) {
  const map = {
    1: '1-木箱',
    2: '2-纸箱',
    3: '3-桶装',
    4: '4-散装',
    5: '5-托盘',
    6: '6-包',
    7: '7-其他'
  }
  return map[val]
}

// 查验准备操作类型
export function chkReadyFilter(val) {
  const map = {
    LF: 'LF-吊装（包括拖运，拆箱等）',
    MV: 'MV-移位',
    WI: 'WI-入仓',
    WO: 'WO-出仓',
    WH: 'WH-仓储费',
    A1: 'A1-打通道',
    B1: 'B1-过机',
    B2: 'B2-普通过磅',
    B3: 'B3-搬移过磅'
  }
  return map[val]
}

export function actTypeFilter(val) {
  const map = {
    1: 'LF-吊装（包括拖运，拆箱等）',
    2: 'MV-移位',
    3: 'WH-仓储'
  }
  return map[val]
}

// 重吉标记
export function leFlagFilter(val) {
  const map = {
    L: 'L-重',
    E: 'E-吉'
  }
  return map[val]
}

// 进出口标记
export function ieFlagFilter(val) {
  const map = {
    I: 'I-进口',
    E: 'E-出口',
    O: 'O-出口',
    U: 'U-未指定'
  }
  return map[val]
}

// 扣留标记
export function holdFlagFilter(val) {
  const map = {
    Y: 'Y-是',
    N: 'N-否'
  }
  return map[val]
}

// 查验来源
export function typeFilter(val) {
  const map = {
    CUS: 'CUS-海关',
    CIQ: 'CIQ-海关',
    CUS2: 'CUS2-海关补充'
  }
  return map[val]
}

// 审核状态
export function auditStatusFilter(val) {
  const map = {
    '0': '未确认',
    '1': '已确认',
    '2': '退回'
  }
  return map[val]
}

export function auditStatusFilter2(val) {
  const map = {
    0: '未审核',
    1: '审核通过',
    2: '审核不过',
  }
  return map[val]
}

export function auditStatusFilter3(val) {
  const map = {
    0: '未审核',
    1: '审核通过',
    2: '审核不过',
    3: '已提交审核'
  }
  return map[val]
}

// 查验结果
export function resTypeFilter(val) {
  const map = {
    '0': '异常',
    '1': '正常',
    null: '暂无信息'
  }
  return map[val]
}

// 查验方式
export function checkTypeFilter(val) {
  const map = {
    A: 'A-彻底查验',
    B: 'B-抽查',
    C: 'C-外形查验',
    J: 'J-机检查验',
    '1': '1-查验'
  }

  return map[val]
}

// 放行指令类型
export function releaseTypeFilter(val) {
  const map = {
    '2': '2-放行'
  }

  return map[val]
}

// 查验费用状态
export function statusFilter(val) {
  const map = {
    0: '监管科审核通过',
    1: '区审核通过',
    2: '市复核通过',
    3: '经促局核实通过',
    4: '商务局审批通过',
    5: '生成报表',
    6: '码头送审',
    7: '确认报表',
    8: '区审核不通过',
    9: '市复核不通过',
    10: '经促局核实不通过',
    11: '商务局审批不通过',
    12: '监管科审核不通过',
    13: '该月无查验费用',
    14: '生成报表失败',
  }

  return map[val]
}

// 处理意见
export function dealTypeFilter(val) {
  const map = {
    1: '补税放行',
    2: '补证放行',
    3: '退运',
    4: '移送缉私',
    5: '补证补税放行',
    6: '处罚后放行',
    7: '没收',
    8: '移交法规',
    9: '改单放行',
    10: '删单',
    11: '正常放行',
    12: '其他'
  }

  return map[val]
}

// 存放类型
export function storeType(val) {
  const map = {
    1: '重柜',
    2: '吉柜',
    3: '散货',
    4: '其他',
  }
  return map[val]
}

// 堆场电子图对照表
export function mapFilter(val) {
  const prefix = 'cont_map_'
  const map = {
    5184: 'jiangkou_mt',
    5189: 'xingang_mt',
    5182: 'lanshi_mt',
    5153: 'rongqi_mt',
    51541: 'bejiaoyiqi_mt',
    51542: 'bejiaoerqi_mt',
    5158: 'leliu_mt',
    5112: 'jiujiang_mt',
    5113: 'beicuan_mt',
    5114: 'pingzhou_mt',
    5119: 'sanshangang_mt',
    5183: 'xinan_mt',
    5194: 'sanshuigang_mt',
    5181: 'zhujiang_mt',
    5138: 'shichu_mt'
  }
  return `${prefix}${map[val]}`
}

// 三山码头海关监控平面图
export function sanshangangMonitorFilter(val) {
  const map = {
    1: '重柜出卡口云台',
    2: '进出卡口云台',
    3: '查验平台车场云台',
    4: '出卡口2',
    5: '出卡口1',
    6: '查验平台5云台',
    7: '出卡口1云台',
    8: '堆场1平台',
    9: 'H986操作室云台',
    10: '堆场2云台',
    11: 'H986出口云台',
    12: '查验平台4云台',
    13: '查验平台3云台',
    14: '查验平台11云台',
    15: '查验平台10云台',
    16: '查验平台9云台',
    17: '查验平台8云台',
    18: '查验平台7云台',
    19: '报关厅云台',
    20: '查验平台1云台',
    21: '查验平台6云台',
    22: '查验平台冷库云台',
    23: '武警备勤室云台',
    24: '查验平台2云台',
    25: '堆场2云台',
    26: '工作人员出入云台',
    27: '堆场3云台',
    28: '山边危品区2云台',
    29: '山边危品区2云台',
    30: '固废查验场7云台',
    31: '固废查验场4云台',
    32: '固废查验场3云台',
    33: '固废查验场2云台',
    34: '固废查验场5云台',
    35: '固废查验场1云台',
    36: '查验场出入云台',
    37: '检验处理区域2',
    38: '堆场冷冻区云台',
    39: '船边2云台',
    40: '地磅',
    41: '桥边云台',
    42: '地磅室云台',
    43: '检验处理区域1',
    44: '固废查验场8云台',
    45: '固废查验场6云台',
    46: '固废查验场9云台',
    47: '固废查验场10云台',
    48: '固废查验场11云台',
    49: '固废查验场12云台',
    50: '固废查验场13云台',
    51: '固废查验场14云台',
    52: '固废查验场15云台',
    53: '油库云台',
    54: '雨棚查货场云台',
    55: '雨棚查货场5',
    56: '雨棚查货场4',
    57: '雨棚查货场3',
    58: '雨棚查货场2',
    59: '雨棚查货场1',
    60: '仓库4云台',
    61: '仓库3云台',
    62: '仓库2云台',
    63: '仓库门口云台',
    64: '仓库1云台',
    65: '船边1云台',
    66: '暂扣仓库云台',
    67: '中心查验场1云台',
    68: '中心查验场云台',
    69: '检疫处理区域4',
    70: '检疫处理区域3',
    71: '中心查验场2云台'
  }

  return map[val]
}

export function reportStatusFilter(val) {
  const map = {
    1: '已完成',
    2: '未完成',
    3: '无可补贴费用',
    4: '生成报表失败'
  }

  return map[val]
}

export function isValidityFilter(val) {
  const map = {
    1: '待确认',
    2: '确认无效',
    3: '已确认',
    4: '已删除'
  }

  return map[val]
}

export function warningLeFilter(val) {
  const map = {
    1: '吉柜移动到重柜堆场区位',
    2: '重柜移动到吉柜堆场区位'
  }

  return map[val]
}

export function warningIeFilter(val) {
  const map = {
    1: '进口柜移动到出口堆场区位',
    2: '出口柜移动到进口堆场区位'
  }

  return map[val]
}


export function confirmStatusFilter(val) {
  const map = {
    1: '查验有问题',
    2: '查验无问题'
  }

  return map[val]
}


export function dealStatusFilter(val) {
  const map = {
    1: '未处理',
    2: '待审核',
    3: '审核通过',
    4: '审核不过',
  }

  return map[val]
}
