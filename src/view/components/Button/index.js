/*
 * @Author: Zep
 * @Date: 2018-06-06 10:13:17
 * @Last Modified by: Zep
 * @Last Modified time: 2018-06-13 11:58:27
 */

const editButton = (vm, h, curRow, index) => {
  return h('Button', {
    props: {
      type: curRow.editting ? 'success' : 'primary',
      loading: curRow.saving
    },
    style: {
      margin: '0 5px'
    },
    on: {
      'click': () => {
        if (!curRow.editting) {
          vm.edit(curRow, index)
        } else {
          vm.edittingStore[index].saving = true
          vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
          let edittingRow = vm.edittingStore[index]
          edittingRow.editting = false
          edittingRow.saving = false
          vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
          vm.$emit('inpiut', vm.handleBackdata(vm.thisTableData))
          vm.$emit('on-change', vm.handleBackdata(vm.thisTableData), index)
        }
      }
    }
  }, curRow.editting ? '保存' : '编辑')
}

const deleteButton = (vm, h, curRow, index) => {
  return h('Poptip', {
    props: {
      confirm: true,
      title: '您确定要删除这条数据吗?',
      transfer: true
    },
    on: {
      'on-ok' () {
        vm.thisTableData.splice(index, 1)
        vm.edittingStore = JSON.parse(JSON.stringify(vm.thisTableData))
        vm.$emit('input', vm.handleBackdata(vm.thisTableData))
        vm.$emit('on-delete', vm.handleBackdata(vm.thisTableData), index)
      }
    }
  }, [
    h('Button', {
      styel: {
        margin: '0 5px'
      },
      props: {
        type: 'error',
        placement: 'top'
      }
    }, '删除')
  ])
}

const incellEditBtn = (vm, h, param) => {
  if (vm.hoverShow) {
    return h('div', {
      'class': {
        'show-edit-btn': vm.hoverShow
      }
    }, [
      h('Button', {
        props: {
          type: 'text',
          icon: 'edit'
        },
        on: {
          'click' (event) {
            vm.edittingStore[param.index].edittingCell[param.column.key] = true
            vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
          }
        }
      })
    ])
  } else {
    return h('Button', {
      props: {
        type: 'text',
        icon: 'edit'
      },
      on: {
        'click' (event) {
          vm.edittingStore[param.index].edittingCell[param.column.key] = true
          vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        }
      }
    })
  }
}

const saveIncellEditBtn = (vm, h, param) => {
  return h('Button', {
    props: {
      type: 'text',
      icon: 'checkmark'
    },
    on: {
      'click' (event) {
        vm.edittingStore[param.index].edittingCell[param.column.key] = false
        vm.thisTableData = JSON.parse(JSON.stringify(vm.edittingStore))
        vm.$emit('input', vm.handleBackdata(vm.thisTableData))
        vm.$emit('on-cell-change', vm.handleBackdata(vm.thisTableData), param.index, param.column.key)
      }
    }
  })
}

const cellInput = (vm, h, param, item) => {
  return h('Input', {
    props: {
      type: 'text',
      value: vm.edittingStore[param.index][item.key]
    },
    on: {
      'on-change' (event) {
        let key = item.key
        vm.edittingStore[param.index][key] = event.target.value
      }
    }
  })
}

export default {
  editButton,
  deleteButton,
  incellEditBtn,
  saveIncellEditBtn,
  cellInput
}
