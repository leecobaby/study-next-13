import { mock, Random } from 'mockjs'

export const data = mock({
  'list|1-10': [{
    'id|+1': 1,
    'name|1': [Random.cname(), Random.cname(), Random.cname(), Random.cname()],
    'value|1-100.1-10': 1,
    'number|1-100.2': 1,
    'boolean|1': true,
    'object|2': {
      '310000': '上海市',
      '320000': '江苏省',
      '330000': '浙江省',
      '340000': '安徽省'
    },
    'array|1': ['AMD', 'CMD', 'UMD'],
  }]
})
