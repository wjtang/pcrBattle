// 港口代码对照表
export const portCode = [
  {
    label: '禅城区',
    options: [
      {label: '滘口港', value: '5184'},
      {label: '新港', value: '5189'},
      {label: '澜石港', value: '5182'}
    ],
  },
  {
    label: '顺德区',
    options: [
      {label: '容奇港', value: '5153'},
      {label: '北滘港一期', value: '	51541'},
      {label: '北滘港二期', value: '	51542'},
      {label: '勒流港', value: '5158'}
    ],
  },
  {
    label: '南海区',
    options: [
      {label: '九江港', value: '	5112'},
      {label: '北村港', value: '	5113'},
      {label: '平洲港', value: '	5114'},
      {label: '三山港', value: '	5119'}
    ],
  },
  {
    label: '三水区',
    options: [
      {label: '西南码头', value: '	5183'},
      {label: '三水港', value: '5194'}
    ],
  },
  {
    label: '高明区',
    options: [
      {label: '珠江码头', value: '	5181'},
      {label: '食出码头', value: '	5138'}
    ]
  }
]
// 港口代码对照表
export const portCodeDisabled = [
  {
    label: '禅城区',
    options: [
      {label: '滘口港', value: 5184, disabled: true},
      {label: '新港', value: 5189, disabled: true},
      {label: '澜石港', value: 5182, disabled: true}
    ],
  },
  {
    label: '顺德区',
    options: [
      {label: '容奇港', value: 5153, disabled: true},
      {label: '北滘港一期', value: 51541, disabled: true},
      {label: '北滘港二期', value: 51542, disabled: true},
      {label: '勒流港', value: 5158, disabled: true}
    ],
  },
  {
    label: '南海区',
    options: [
      {label: '九江港', value: 5112, disabled: true},
      {label: '北村港', value: 5113, disabled: true},
      {label: '平洲港', value: 5114, disabled: true},
      {label: '三山港', value: 5119}
    ],
  },
  {
    label: '三水区',
    options: [
      {label: '西南码头', value: 5183, disabled: true},
      {label: '三水港', value: 5194, disabled: true}
    ],
  },
  {
    label: '高明区',
    options: [
      {label: '珠江码头', value: 5181, disabled: true},
      {label: '食出码头', value: 5138, disabled: true}
    ]
  }
]

// 集装箱位置
export const locations = [
  {value: 'OBV', label: 'OBV-船上位置'},
  {value: 'NGI', label: 'NGI-闸口入场位置'},
  {value: 'NGO', label: 'NGO-闸口出场位置'},
  {value: 'THA', label: 'THA-拖车停泊处'},
  {value: 'MLO', label: 'MLO-失踪箱位置'},
  {value: 'YAR', label: 'YAR-堆场'},
  {value: 'CFS', label: 'CFS-交接库'},
  {value: 'CIP', label: 'CIP-海关验货台'},
  {value: 'CRS', label: 'CRS-修理站'},
  {value: 'OSD', label: 'OSD-码头外堆场'}
]

// 集装箱作业类型
export const containerActType = [
  {value: 'CI', label: 'CI-更改箱号'},
  {value: 'CL', label: 'CL-取消装船'},
  {value: 'CO', label: 'CO-更改箱主'},
  {value: 'CP', label: 'CP-更改卸货港'},
  {value: 'CS', label: 'CS-更改箱状态'},
  {value: 'CV', label: 'CV-更改航次'},
  {value: 'DG', label: 'DG-码头外堆场交箱'},
  {value: 'DP', label: 'DP-码头外堆场提箱'},
  {value: 'DT', label: 'DT-集装箱扣留'},
  {value: 'FG', label: 'FG-CFS回场'},
  {value: 'FP', label: 'FP-CFS装拆'},
  {value: 'GI', label: 'GI-闸口交箱'},
  {value: 'GO', label: 'GO-闸口提箱'},
  {value: 'IG', label: 'IG-关检交箱'},
  {value: 'IP', label: 'IP-关检提箱'},
  {value: 'MC', label: 'MC-失踪箱申报'},
  {value: 'MD', label: 'MD-失踪箱删除'},
  {value: 'RG', label: 'RG-修理站交箱'},
  {value: 'RP', label: 'RP-修理站提箱'},
  {value: 'RT', label: 'RT-集装箱放行'},
  {value: 'VD', label: 'VD-卸船'},
  {value: 'VL', label: 'VL-装船'},
  {value: 'YM', label: 'YM-场内搬移'},
  {value: 'YS', label: 'YS-位置更改'},
  {value: 'HR', label: 'HR-海关放行'}
]

// 集装箱状态
export const containerStatus = [
  {value: 'EM', label: 'EM-空箱'},
  {value: 'IF', label: 'IF-入口重箱'},
  {value: 'IM', label: 'IM-入口空箱'},
  {value: 'XF', label: 'XF-出口重箱'},
  {value: 'XM', label: 'XM-出口空箱'},
  {value: 'TF', label: 'TF-中转入口重箱'},
  {value: 'TM', label: 'TM-中转入口空箱'},
  {value: 'OF', label: 'OF-中转出口重箱'},
  {value: 'OM', label: 'OM-中转出口空箱'},
  {value: 'RE', label: 'RE-船上捣载'},
  {value: 'SH', label: 'SH-船上搬移'},
  {value: 'XI', label: 'XI-入口转出口'},
  {value: 'XW', label: 'XW-取消出口'}
]

// 散货作业类型
export const bulkActType = [
  {value: 'FP', label: 'FP-装拆'},
  {value: 'GI', label: 'GI-入闸'},
  {value: 'GO', label: 'GO-出闸'},
  {value: 'WI', label: 'WI-入仓'},
  {value: 'WO', label: 'WO-出仓'},
  {value: 'VD', label: 'VD-卸船'},
  {value: 'VL', label: 'VL-装船'},
  {value: 'YM', label: 'YM-搬移'}
]

// 散货包装类型
export const bulkPackType = [
  {value: '1', label: '1-木箱'},
  {value: '2', label: '2-纸箱'},
  {value: '3', label: '3-桶装'},
  {value: '4', label: '4-散装'},
  {value: '5', label: '5-托盘'},
  {value: '6', label: '6-包'},
  {value: '7', label: '7-其他'}
]

// 集装箱类型
export const containerType = [
  {value: 'GP', label: 'GP-干货箱'},
  {value: 'GH(HC/HQ)', label: 'GH(HC/HQ)-干货高箱'},
  {value: 'HT', label: 'HT-挂衣箱'},
  {value: 'OT', label: 'OT-开顶箱'},
  {value: 'RF', label: 'RF-冷冻箱'},
  {value: 'RH', label: 'RH-冷高箱'},
  {value: 'TK', label: 'TK-油罐箱'},
  {value: 'FR', label: 'FR-框架箱'}
]

// 查验准备操作类型
export const chkReadyType = [
  {value: 'LF', label: 'LF-吊装'},
  {value: 'MV', label: 'MV-移位'},
  {value: 'WI', label: 'WI-入仓'},
  {value: 'WO', label: 'WO-出仓'}
]

// 重吉
export const leFlags = [
  {value: 'L', label: 'L-重'},
  {value: 'E', label: 'E-吉'}
]

// 进出口标记
export const ieFlags = [
  {value: 'I', label: 'I-进口'},
  {value: 'E', label: 'E-出口'},
  {value: 'U', label: 'U-未指定'},
  {value:'',  label:'全部'}
]

// 集装箱尺寸
export const sizeIds = [
  {value: '20', label: '20英尺'},
  {value: '40', label: '40英尺'}
  // { value: '45', label: '45英尺' }
]


// 查验结果
export const resType = [
  {value: 0, label: '异常'},
  {value: 1, label: '正常'}
]

// 查验来源
export const checkSource = [
  {value: 'CUS', label: 'CUS-海关'},
  {value: 'CIQ', label: 'CIQ-海关'},
  {value: 'CUS2', label: 'CUS2-海关补充'}
]

// 审核状态
export const auditStatus = [
  {value: '', label: '全部'},
  {value: '0', label: '未确认'},
  {value: '1', label: '已审核'},
  {value: '2', label: '退回'}
]

// 审核状态
export const isValiditys = [
  {value: '1', label: '待确认'},
  {value: '2', label: '确认无效'},
  {value: '3', label: '已确认'},
  {value: '4', label: '已删除'}
]
