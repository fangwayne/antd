import { useEffect } from 'react';
import { Modal as AntdModal, Form } from 'antd';
import { useRequest } from 'umi';
import FormBuilder from '../builder/FormBuilder';
import ActionBuilder from '../builder/ActionBuilder';
import moment from 'moment';

const Modal = ({
  modalVisible,
  handleModal,
  modalUri,
}: {
  modalVisible: boolean;
  handleModal: () => void;
  modalUri: string;
}) => {
  const [form] = Form.useForm();
  const init = useRequest<{ data: PageApi.Data }>(`${modalUri}`);

  useEffect(() => {
    if (modalVisible) {
      init.run();
    }
  }, [modalVisible]);

  const adaptor = (data: PageApi.Data) => {
    if (data?.layout?.tabs && data?.dataSource) {
      const result = {};
      data?.layout?.tabs.forEach((tab) => {
        tab.data.forEach((field) => {
          switch (field.type) {
            case 'datetime':
              result[field.key] = moment(data.dataSource[field.key]);
              break;
            default:
              result[field.key] = data.dataSource[field.key];
              break;
          }
        });
      });
      return result;
    }
  };

  useEffect(() => {
    if (init.data) {
      //form.setFieldsValue(init.data?.dataSource);
      form.setFieldsValue(
        //{
        // ...init.data.dataSource,
        // create_time: moment("2020-10-22T15:38:51+08:00"),
        // or
        // "username": "admin0",
        // "id": 206,
        // "display_name": "",
        // "create_time": moment("2020-10-22T15:38:51+08:00"),
        // "update_time": moment("2020-10-31T13:28:21+08:00"),
        // "status": 1,
        // "groups": [53]
        // }
        adaptor(init?.data),
      );
    }
  }, [init.data]);

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  return (
    <div>
      <AntdModal
        title={init.data?.page.title}
        visible={modalVisible}
        //  onOk={handleOk}
        onCancel={handleModal}
        footer={ActionBuilder(init.data?.layout.actions[0].data)}
      >
        <Form {...layout} form={form}>
          {FormBuilder(init.data?.layout?.tabs[0]?.data)}
        </Form>
      </AntdModal>
    </div>
  );
};
export default Modal;
