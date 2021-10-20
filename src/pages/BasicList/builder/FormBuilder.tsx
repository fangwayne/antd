//import React from 'react';
import { Form, Input } from 'antd';

const FormBuilder = (data: PageApi.Datum[] | undefined) => {
  return (data || []).map((field) => {
    return (
      <Form.Item name={field.key} label={field.title}>
        <Input />
      </Form.Item>
    );
  });
};

export default FormBuilder;
