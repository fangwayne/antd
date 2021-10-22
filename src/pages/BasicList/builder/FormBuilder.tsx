//import React from 'react';
import { Form, Input, DatePicker, Switch, TreeSelect } from 'antd';
//import TreeSelect from 'rc-tree-select';

const FormBuilder = (data: PageApi.Datum[] | undefined) => {
  return (data || []).map((field) => {
    switch (field.type) {
      case 'text':
        return (
          <Form.Item name={field.key} label={field.title} key={field.key}>
            <Input disabled={field.disabled} />
          </Form.Item>
        );
      case 'datetime':
        return (
          <Form.Item name={field.key} label={field.title} key={field.key}>
            <DatePicker showTime disabled={field.disabled} />
          </Form.Item>
        );
      case 'tree':
        return (
          <Form.Item name={field.key} label={field.title} key={field.key}>
            <TreeSelect treeData={field.data} disabled={field.disabled} />
          </Form.Item>
        );
      case 'switch':
        return (
          <Form.Item name={field.key} label={field.title} key={field.key}>
            <Switch
              //checkedChildren="开启" unCheckedChildren="关闭" defaultChecked
              //onChange={onChange}
              disabled={field.disabled}
            />
          </Form.Item>
        );
      default:
        return null;
    }
  });
};

export default FormBuilder;
