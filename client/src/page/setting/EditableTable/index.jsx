/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Table } from 'antd'
import EditableRow from './EditableRow'
import EditableCell from './EditableCell'
import { columns, defaultDataSource } from './tableDefault'
import './index.css'

const EditableTable = (props, ref) => {
  const [dataSource, setDataSource] = useState(defaultDataSource)

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };

  const handleSave = (row) => {
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, { ...item, ...row });
    setDataSource(newData);
  }

  const tableColumn = columns.map(col => {
    if (!col.editable) {
      return col
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
      }),
    }
  })

  useImperativeHandle(ref, () => {
    return {
      data: dataSource,
      setData: setDataSource,
    }
  }, [dataSource, setDataSource])

  return (
    <Table
      components={components}
      rowClassName={() => 'editable-row'}
      bordered
      dataSource={dataSource}
      columns={tableColumn}
      pagination={false}
    />
  )
}

export default forwardRef(EditableTable)