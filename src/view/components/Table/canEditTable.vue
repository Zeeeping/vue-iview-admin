<template>
  <Table :ref='refs' :columns='columnsList' :data='thisTableData' border disabled-hover></Table>
</template>

<script>
import Button from '_view/components/Button'

export default {
  name: 'canEditTable',
  // mixins: [],
  components: {},
  props: {
    refs: String,
    columnsList: Array,
    value: Array,
    url: String,
    editIncell: {
      type: Boolean,
      default: false
    },
    hoverShow: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      columns: [],
      thisTableData: [],
      edittingStore: []
    }
  },
  computed: {},
  methods: {
    init () {
      let vm = this
      let editableCell = this.columnsList.filter(item => {
        if (item.editable && item.editable === true) return item
      })
      let cloneData = JSON.parse(JSON.stringify(this.value))
      let res = []
      res = cloneData.map((item, index) => {
        let isEditting = false
        if (this.thisTableData[index]) {
          if (this.thisTableData[index].editting) {
            isEditting = true
          } else {
            for (const cell in this.thisTableData[index].editableCell) {
              if (this.thisTableData[index].editableCell.hasOwnProperty(cell)) {
                if (this.thisTableData[index].editableCell[cell] === true) isEditting = true
              }
            }
          }
        }
        if (isEditting) {
          return this.thisTableData[index]
        } else {
          this.$set(item, 'editting', false)
          let edittingCell = {}
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
            let curRow = this.thisTableData[param.index]
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
                      span: '22'
                    }
                  }, [
                    !curRow.edittingCell[param.column.key] ? h('span', curRow[item.key]) : Button.cellInput(this, h, param, item)
                  ]),
                  h('Col', {
                    props: {
                      span: '2'
                    }
                  }, [
                    curRow.edittingCell[param.column.key] ? Button.saveIncellEditBtn(this, h, param, item) : Button.incellEditBtn(this, h, param)
                  ])
                ])
              } else {
                return h('span', curRow[item.key])
              }
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
            let curRow = this.thisTableData[param.index]
            let children = []
            item.handle.forEach(item => {
              if (item === 'edit') {
                children.push(Button.editButton(this, h, curRow, param.index))
              } else if (item === 'delete') {
                children.push(Button.deleteButton(this, h, curRow, param.index))
              }
            })
            return h('div', children)
          }
        }
      })
    },
    handleBackdata (data) {
      let cloneData = JSON.parse(JSON.stringify(data))
      cloneData.forEach(item => {
        delete item.editting
        delete item.edittingCell
        delete item.saving
      })
      return cloneData
    }
  },
  created () {
    this.init()
  },
  mounted () {},
  watch: {}
}
</script>

<style lang="less">
.show-edit-btn {
  display: none;
  margin-left: -10px;
}
.ivu-table-cell:hover .show-edit-btn {
  display: inline-block;
}
</style>
