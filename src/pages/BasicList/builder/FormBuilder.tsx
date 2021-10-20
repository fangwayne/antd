import React from 'react'
//import {Form} from 'antd'


const FormBuilder = (data: any) =>{
  return (data || []).map((field)=>{
    return field.data

  })
};

export default FormBuilder;