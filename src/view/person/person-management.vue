<template>
  <div class="person-management">
    <div class="btn-group">
      <Button type="primary" @click="add">新增</Button>
    </div>
    <Table border :loading="loading" :columns="columnsList" :data="thisTableData"></Table>
  </div>
</template>
<script>
import Button from '../components/Button'
import tableData from './table_data.js'
import { getAll } from '@/api/person'

export default {
  name: 'person-management',
  // mixins: [],
  components: {},
  // props: {},
  data () {
    return {
      columnsList: [
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
              },
              on: {
                change: (value) => {
                  // 保证数据有效更新
                  this.edittingStore[params.index].changePsw = value
                  this.thisTableData = [...this.edittingStore]
                }
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
      ],
      thisTableData: [],
      edittingStore: [],
      loading: false,
      editIncell: false
    }
  },
  computed: {},
  methods: {
    getData () {
      let data = tableData.tableCell
      // this.columnsList = tableData.tableCol
      this.loading = true
      getAll().then(res => {
        data = res
        this.loading = false
        this.init(data)
      }, err => {
        data = tableData.tableCell
        this.loading = false
        this.init(data)
        return new Error(err)
      })
    },
    init (data) {
      let vm = this

      // 过滤可以编辑的纵列
      let editableCell = tableData.tableCol.filter(item => {
        if (item.editable && item.editable === true) return item
      })

      // 获得源数据
      let cloneData = JSON.parse(JSON.stringify(data))
      let res = []
      res = cloneData.map((item, index) => {
        let isEditting = false
        if (this.thisTableData[index]) {
          if (this.thisTableData[index].editting) isEditting = true
          else {
            for (const cell in this.thisTableData[index].edittingCell) {
              if (this.thisTableData[index].edittingCell[cell] === true) isEditting = true
            }
          }
        }
        if (isEditting) return this.thisTableData[index]
        else {
          // 设置源数据的编辑状态为false
          this.$set(item, 'editting', false)
          let edittingCell = {}
          // 可以编辑的纵列
          editableCell.forEach(item => {
            edittingCell[item.key] = false
          })
          this.$set(item, 'edittingCell', edittingCell)
          return item
        }
      })
      this.thisTableData = res
      this.edittingStore = JSON.parse(JSON.stringify(this.thisTableData))
      this.columnsList.forEach(item => {
        if (item.editable) {
          item.render = (h, param) => {
            let curRow = this.edittingStore[param.index]
            if (!curRow.editting) {
              if (this.editIncell) {
                return h('Row', {
                  props: {
                    type: 'flex',
                    align: 'middle',
                    justify: 'center'
                  }
                }, [
                  h('Col', {
                    props: {
                      span: '20'
                    }
                  }, [
                    !curRow.edittingCell[param.column.key] ? h('span', curRow[item.key]) : Button.cellInput(this, h, param, item)
                  ]),
                  h('Col', {
                    props: {
                      span: '4'
                    }
                  }, [
                    curRow.edittingCell[param.column.key] ? Button.saveIncellEditBtn(this, h, param) : Button.incellEditBtn(this, h, param)
                  ])
                ])
              } else return h('span', curRow[item.key])
            } else {
              return h('Input', {
                props: {
                  type: 'text',
                  value: curRow[item.key]
                },
                on: {
                  'on-change' (event) {
                    let key = param.column.key
                    vm.edittingStore[param.index][key] = event.target.value
                  }
                }
              })
            }
          }
        }
        if (item.handle) {
          item.render = (h, param) => {
            let curRowData = this.thisTableData[param.index]
            let children = []
            item.handle.forEach(item => {
              if (item === 'edit') children.push(Button.editButton(this, h, curRowData, param.index))
              else if (item === 'delete') children.push(Button.deleteButton(this, h, curRowData, param.index))
            })
            return children
          }
        }
      })
    },
    handleBackdata (data) {
      let cloneData = JSON.parse(JSON.stringify(data))
      cloneData.forEach(item => {
        // delete item.editting
        // delete item.edittingCell
        // delete item.saving
      })
      return cloneData
    },
    add () {
      let addCol = {}
      let col = tableData.tableCol
      Object.keys(col).forEach(item => {
        if (col[item].key) addCol[col[item].key] = ''
      })
      this.edittingStore.push(addCol)
      let len = this.edittingStore.length - 1
      this.edit(this.edittingStore[len], len)
    },
    edit (curRow, index) {
      if (curRow.edittingCell) {
        for (const name in curRow.edittingCell) {
          if (curRow.edittingCell.hasOwnProperty(name)) {
            curRow.edittingCell[name] = false
            this.edittingStore[index].edittingCell[name] = false
          }
        }
      }
      this.edittingStore[index].editting = true
      this.thisTableData = JSON.parse(JSON.stringify(this.edittingStore))
    }
  },
  created () {
    this.getData()
  },
  mounted () {},
  watch: {
  }
}
</script>

<style>
  .person-management {
    padding: 16px;
  }
  .btn-group {
    padding-bottom: 16px;
    text-align: right;
  }
</style>
