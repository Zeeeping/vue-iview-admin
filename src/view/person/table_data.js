/*
 * @Author: Zep
 * @Date: 2018-06-06 16:10:37
 * @Last Modified by: Zep
 * @Last Modified time: 2018-06-13 15:26:02
 */
const testCol = [
  {
    title: '序号',
    type: 'index',
    width: 80,
    align: 'center'
  },
  {
    title: '姓名',
    align: 'center',
    key: 'name',
    type: 'text',
    width: 300
  },
  {
    title: '性别',
    align: 'center',
    key: 'sex',
    render: (h, params) => {
      // console.log(params)
      return h('i-switch', {
        props: {
          value: params.row.sex === '男'
        }
      }, [
        <span slot="open">男</span>,
        <span slot="close">女</span>
      ])
    }
  },
  {
    title: '岗位',
    align: 'center',
    width: 300,
    key: 'work'
  },
  {
    title: '操作',
    align: 'center',
    width: 200,
    key: 'handle',
    handle: ['edit', 'delete']
  }
]

const testCell = [
  {
    id: 'E03746',
    name: 'Zep',
    sex: '男',
    work: '前端开发'
  },
  {
    id: 'E03747',
    name: 'Lison',
    sex: '男',
    work: '前端开发'
  },
  {
    id: 'E03748',
    name: 'lisa',
    sex: '女',
    work: '程序员鼓励师'
  }
]

const tableCol = [
  {
    title: '序号',
    type: 'index',
    align: 'center',
    width: 60
  },
  {
    title: '编号',
    align: 'center',
    key: 'id',
    width: 180,
    editable: true
  },
  {
    title: '用户名',
    align: 'center',
    key: 'name',
    width: 150,
    render: (h, params) => {
      return h('div', [
        h('Icon', {
          props: {
            type: 'person'
          },
          style: {
            marginRight: '5px'
          }
        }),
        h('strong', params.row.name)
      ])
    },
    editable: true
  },
  {
    title: '部门编号',
    align: 'center',
    key: 'departId',
    width: 120,
    editable: true
  },
  {
    title: '电子邮件地址',
    align: 'center',
    key: 'emailAddress',
    width: 220,
    editable: true
  },
  {
    title: '密码永不过期',
    align: 'center',
    key: 'neverExpire',
    width: 120,
    render: (h, params) => {
      return h('i-switch', {
        props: {
          value: params.row.neverExpire
        }
      }, [
        <span slot="open">是</span>,
        <span slot="close">否</span>
      ])
    }
  },
  {
    title: '登录后改变密码',
    align: 'center',
    key: 'changePsw',
    width: 130,
    render: (h, params) => {
      return h('i-switch', {
        props: {
          value: params.row.changePsw
        }
      }, [
        <span slot="open">是</span>,
        <span slot="close">否</span>
      ])
    }
  },
  {
    title: '密码过期时间',
    align: 'center',
    key: 'expireTime',
    width: 170,
    render: (h, params) => {
      return h('DatePicker', {
        props: {
          type: 'date',
          value: params.row.expireTime
        }
      })
    }
  },
  {
    title: '密码',
    align: 'center',
    key: 'password',
    width: 100
  },
  {
    title: '身份证号',
    align: 'center',
    key: 'signatureCode',
    width: 200,
    editable: true
  },
  {
    title: '部门名称',
    align: 'center',
    key: 'departName',
    width: 100,
    editable: true
  },
  {
    title: '职务代码',
    align: 'center',
    key: 'staffCode',
    width: 100,
    editable: true
  },
  {
    title: '操作',
    align: 'center',
    key: 'handle',
    handle: ['edit', 'delete'],
    width: 200
  }
]

const tableCell = [
  {
    id: '13727023752',
    name: 'Zep',
    departId: 'E03746',
    emailAddress: 'zp49516591@163.com',
    neverExpire: true,
    changePsw: true,
    expireTime: '2019-01-01',
    password: '****',
    signatureCode: '441800199201012020',
    departName: '前端研发部',
    staffCode: 'FE123'
  }
]

export default {
  testCol,
  testCell,
  tableCol,
  tableCell
}
